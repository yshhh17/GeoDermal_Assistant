from fastapi import APIRouter
from ...schemas.inputs import AnalyzeRequest
from typing import Dict, Any
from ...services.geocode import geocode_place
from ...services.clients import open_meteo, openaq

router = APIRouter()

@router.post("/analyze")
async def analyze(payload: AnalyzeRequest) -> Dict[str, Any]:
    """
    Day 1 analyze stub returning mock env_report, risks, recommendations, and explanations.
    This is a safe placeholder to let frontend and later backend pieces integrate.
    """

    geocode_result = await geocode_place(payload.destination)
    if geocode_result:
        lat = geocode_result["lat"]
        lon = geocode_result["lon"]
        coords = {"lat": lat, "lon": lon, "display_name": geocode_result["display_name"]}
    else:
        lat = lon = None
        coords = {"lat": lat, "lon": lon, "display_name": geocode_result["location not found"]}

    env_report = {
        "coords": coords
    }

    # fetch weather + UV
    if lat is not None and lon is not None:
        weather = await open_meteo.fetch_weather_and_uv(lat, lon)
        if weather:
            env_report.update({
                "temperature_c": weather.get("temperature_c"),
                "humidity": weather.get("humidity"),
                "uv_index": weather.get("uv_index"),
                "raw_weather": weather.get("raw")
            })
        else:
            env_report.update({"note_weather": "unavailable"})

        # fetch nearby AQ measurements
        aqi = await openaq.fetch_aqi_nearby(lat, lon)
        if aqi:
            env_report.update({
                "aqi": aqi.get("aqi"),
                "pm2_5": aqi.get("pm25"),
                "pm10": aqi.get("pm10")
            })
        else:
            env_report.update({"note_aqi": "unavailable"})
    else:
        env_report.update({"note": "coords missing; cannot fetch external data"})

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
            "AQI of 120 and humidity of 40% increase dryness and irritation risk.",
            "UV index is moderate-high; sunscreen recommended."
        ]
    }

    return {
        "request": payload.dict(),
        "env_report": env_report,
        "risks": risks,
        "recommendations": recommendations,
        "explanations": explanations,
        "confidence": "low (mock data)"
    }
