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

logger = logging.getLogger(__name__)
router = APIRouter()

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
                "uv_index": weather. get("uv_index")
            })

        # Step 3: Fetch nearby AQ measurements
        aqi_data = await openaq.fetch_aqi_nearby(lat, lon)
        if aqi_data:
            env_report.update({
                "aqi": aqi_data.get("us_aqi"),
                "pm25": aqi_data.get("pm2_5"),
                "pm10": aqi_data.get("pm10"),
                "NO2": aqi_data.get("no2"),
                "O3": aqi_data.get("o3")
            })
        
        # Step 4: Calculate AQI from PM2.5 if API didn't provide it
        if env_report.get("aqi") is None and env_report.get("pm25") is not None:
            calculated_aqi = calculate_aqi_from_pm25(env_report["pm25"])
            if calculated_aqi: 
                env_report["aqi"] = calculated_aqi

    # Step 5: Validate and clean environmental data
    env_report = validate_env_data(env_report)
    
    # Step 6: Check data quality
    is_mock_data, missing_fields, confidence = check_data_quality(env_report)

    # Step 7: Generate heuristic risks & recommendations (temporary bootstrap labels)
    if payload.concern == "skin":
        risks = {
            "dryness": 7,
            "acne": 3,
            "irritation": 4,
            "uv_damage": 6,
            "pigmentation": 3
        }
        recommendations = [
            "Use a hydrating moisturizer and carry a travel-sized bottle.",
            "Apply broad-spectrum sunscreen SPF 50 when outdoors.",
            "Avoid harsh exfoliants during travel."
        ]
    else: 
        risks = {
            "hairfall": 4,
            "dandruff": 5
        }
        recommendations = [
            "Use a gentle sulfate-free shampoo while traveling.",
            "Rinse hair with soft water where possible; use leave-in conditioner."
        ]

    explanations = {
        "why": [
            f"AQI of {env_report. get('aqi', 'N/A')} and humidity of {env_report.get('humidity', 'N/A')}% affect skin conditions.",
            f"UV index is {env_report.get('uv_index', 'N/A')}; sun protection recommended."
        ]
    }

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
            risks=risks,
            is_mock_data=is_mock_data,
            missing_fields=missing_fields if missing_fields else None,
            confidence=confidence
        )
        
        db. add(report)
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