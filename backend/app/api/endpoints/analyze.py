from fastapi import APIRouter
from ...schemas.inputs import AnalyzeRequest
from typing import Dict, Any
from ...services.geocode import geocode_place

router = APIRouter()

@router.post("/analyze")
async def analyze(payload: AnalyzeRequest) -> Dict[str, Any]:
    """
    Day 1 analyze stub returning mock env_report, risks, recommendations, and explanations.
    This is a safe placeholder to let frontend and later backend pieces integrate.
    """

    geocode_result = await geocode_place(payload.destination)
    if geocode_result:
        coords = {"lat": geocode_result["lat"], "lon": geocode_result["lon"], "display_name": geocode_result["display_name"]}
    else:
        coords = {"lat": None, "lon": None, "display_name": None}

    env_report = {
        "coords": coords,
        "aqi": 120,
        "pm25": 65,
        "humidity": 40,
        "temperature_c": 30,
        "uv_index": 7,
        "water_hardness_estimated_ppm": 180
    }

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
