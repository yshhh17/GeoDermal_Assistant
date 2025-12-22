from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ... schemas.inputs import AnalyzeRequest
from typing import Dict, Any
from ... services.geocode import geocode_place
from ...services.clients import open_meteo, openaq
from ...services.aqi_calculator import calculate_aqi_from_pm25
from ... services.data_quality import check_data_quality, validate_env_data
from ... db.session import get_db
from ...models.report import Report
from ...config import settings
import logging
from ...services.clients.water_quality import lookup_water_quality
from ...services.llm_service import analyze_with_llm

logger = logging.getLogger(__name__)
router = APIRouter(
    prefix="/api",
    tags=["analysis"]
)

@router.post("/analyze")
async def analyze(payload: AnalyzeRequest, db: Session = Depends(get_db)) -> Dict[str, Any]: 
    """
    Analyze destination and provide skin/hair care recommendations.
    Saves each analysis to database for model training.
    """
    
    # Step 1: Geocode destination
    geocode_result = await geocode_place(payload.destination)
    if geocode_result: 
        lat = geocode_result["lat"]
        lon = geocode_result["lon"]
        coords = {
            "lat": lat,
            "lon":  lon,
            "display_name": geocode_result["display_name"]
        }
    else: 
        lat = lon = None
        coords = {
            "lat": None,
            "lon": None,
            "display_name": "location not found"
        }

    env_report = {"coords": coords}

    # Step 2: Fetch weather + UV
    if lat is not None and lon is not None: 
        weather = await open_meteo.fetch_weather_and_uv(lat, lon)
        if weather:
            env_report. update({
                "temperature_c": weather.get("temperature_c"),
                "humidity":  weather.get("humidity"),
                "uv_index": weather.get("uv_index")
            })

        # Step 3: Fetch nearby AQ measurements
        aqi_data = await openaq.fetch_aqi_nearby(lat, lon)
        if aqi_data:
            env_report.update({
                "aqi": aqi_data.get("us_aqi"),
                "pm25": aqi_data.get("pm2_5"),
                "pm10": aqi_data.get("pm10"),
                "NO2": aqi_data.get("nitrogen_dioxide"),
                "O3": aqi_data.get("ozone")
            })
        
        # Step 4: Calculate AQI from PM2.5 if API didn't provide it
        if env_report.get("aqi") is None and env_report.get("pm25") is not None:
            calculated_aqi = calculate_aqi_from_pm25(env_report["pm25"])
            if calculated_aqi: 
                env_report["aqi"] = calculated_aqi

        # Step 4.5: Lookup water quality data
    water_quality = None
    if lat is not None and lon is not None:
        water_quality = lookup_water_quality(
            city=payload.destination,
            lat=lat,
            lon=lon,
            max_distance_km=100.0
        )
        
        if water_quality: 
            env_report.update({
                "water_hardness":  water_quality.get("hardness_mg_l"),
                "water_ph": water_quality.get("ph"),
                "water_tds": water_quality.get("tds_mg_l"),
                "water_chlorine": water_quality.get("chlorine_mg_l"),
                "water_source":  water_quality.get("source_type"),
                "water_match_type": water_quality.get("match_type"),
                "water_distance_km": water_quality.get("distance_km")
            })
            logger.info(f"Water quality data:  {water_quality.get('match_type')} match for {payload.destination}")
        else:
            logger.warning(f"No water quality data found for {payload.destination}")

    # Step 5: Validate and clean environmental data
    env_report = validate_env_data(env_report)
    
    # Step 6: Check data quality
    is_mock_data, missing_fields, confidence = check_data_quality(env_report)

    # Step 7: Analyze with Groq LLM
    try:
        logger.info("Starting LLM-based risk analysis...")
        
        llm_result = analyze_with_llm(
            env_data=env_report,
            user_profile={
                'concern': payload.concern,
                'skin_type':  payload.skin_type,
                'hair_type': payload.hair_type,
                'duration_category': payload.duration_category
            }
        )
        
        risks = llm_result. get('risks', {})
        recommendations = llm_result.get('recommendations', [])
        explanations = llm_result.get('explanations', {
            'why': [
                f"Environmental analysis completed for {payload.destination}",
                f"Risk assessment based on current conditions",
                "Recommendations tailored to your profile"
            ]
        })
        
        logger.info(f"Risk analysis complete.  Risks: {risks}")
        
    except Exception as e:
        logger.error(f"Risk analysis failed: {e}")
        # If everything fails, return basic response
        risks = {"error": "Unable to calculate risks"}
        recommendations = ["Please try again later"]
        explanations = {"why": ["Analysis service temporarily unavailable"]}

    # Step 8: Save to database
    try:
        report = Report(
            source_version=settings.SOURCE_VERSION,
            destination=payload.destination,
            home_city=payload.home_city,
            duration_category=payload.duration_category,
            month_or_season=payload.month_or_season,
            concern=payload.concern,
            skin_type=payload.skin_type,
            hair_type=payload.hair_type,
            destination_lat=coords. get("lat"),
            destination_lon=coords.get("lon"),
            destination_display_name=coords.get("display_name"),
            temperature_c=env_report.get("temperature_c"),
            humidity=env_report.get("humidity"),
            uv_index=env_report.get("uv_index"),
            pm25=env_report.get("pm25"),
            pm10=env_report.get("pm10"),
            no2=env_report.get("NO2"),
            o3=env_report. get("O3"),
            aqi=env_report.get("aqi"),
            water_hardness=env_report.get("water_hardness"),
            water_ph=env_report.get("water_ph"),
            water_tds=env_report.get("water_tds"),
            water_chlorine=env_report. get("water_chlorine"),
            risks=risks,
            is_mock_data=is_mock_data,
            missing_fields=missing_fields if missing_fields else None,
            confidence=confidence
        )
        
        db.add(report)
        db.commit()
        db.refresh(report)
        
        logger.info(f"Saved report {report.id} to database")
        
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to save report to database: {e}")
        # Continue even if DB save fails

    # Step 9: Return response
    return {
        "request": payload. dict(),
        "env_report": env_report,
        "risks": risks,
        "recommendations":  recommendations,
        "explanations":  explanations,
        "confidence":  confidence,
        "data_quality":  {
            "is_mock_data": is_mock_data,
            "missing_fields": missing_fields
        }
    }