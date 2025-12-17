import httpx
from typing import Optional, Dict, Any
from ...config import settings
import asyncio
import logging

logger = logging.getLogger(__name__)
BASE = str(settings.OPENAQ_BASE).rstrip("/")

async def _get_with_retries(client: httpx.AsyncClient, url: str, params: Dict[str, Any], retries: int = 2, delay: float = 0.5):
    last_exc = None
    for attempt in range(retries + 1):
        try:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            return resp.json()
        except Exception as exc:
            last_exc = exc
            if attempt < retries:
                await asyncio.sleep(delay * (attempt + 1))
            else:
                raise last_exc

async def fetch_aqi_nearby(lat: float, lon: float) -> Optional[Dict[str, Any]]:
    """
    Fetch air quality data using Open-Meteo Air Quality API. 
    This can easily be swapped with another provider (WAQI, OpenAQ, etc.)
    
    Returns normalized dict: 
    {
      "aqi": int | None,
      "pm25":  float | None,
      "pm10": float | None
    }
    """
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": "us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone"  # Exact params from working URL
    }
    url = f"{BASE}/air-quality"
    timeout = settings.HTTP_TIMEOUT
    headers = {"User-Agent": f"{settings.APP_NAME} (dev)"}
    
    async with httpx.AsyncClient(timeout=timeout, headers=headers) as client:
        try:
            data = await _get_with_retries(client, url, params)
            logger.info(f"AQI API raw response for ({lat}, {lon}): {data}")
            
            current = data.get("current", {})

            result = {
                "us_aqi": current.get("us_aqi"),
                "pm2_5": current.get("pm2_5"),
                "pm10": current.get("pm10"),
                "nitrogen_dioxide": current.get("nitrogen_dioxide"),
                "ozone": current.get("ozone")
            }
            logger.info(f"Normalized AQI data: {result}")
            return result
            
        except Exception as e:
            logger.error(f"Error fetching AQI for ({lat}, {lon}): {e}")
            return None