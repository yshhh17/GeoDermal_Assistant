import httpx
import asyncio
from typing import Optional, Dict, Any
from ...config import settings

BASE = str(settings.OPEN_METEO_BASE).rstrip("/")

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

async def fetch_weather_and_uv(lat:  float, lon: float) -> Optional[Dict[str, Any]]:
    """
    Query Open-Meteo for current weather data only.
    Returns normalized dict with current conditions. 
    """
    params = {
        "latitude": lat,
        "longitude":  lon,
        "current":  "temperature_2m,relative_humidity_2m",
        "daily": "uv_index_max",
        "timezone": "auto"
    }
    url = f"{BASE}/forecast"
    timeout = settings.HTTP_TIMEOUT
    headers = {"User-Agent": f"{settings.APP_NAME} (dev)"}
    
    async with httpx.AsyncClient(timeout=timeout, headers=headers) as client:
        try:
            data = await _get_with_retries(client, url, params)
            current = data.get("current", {})
            daily = data.get("daily", {})
            uv_index = None
            if daily and "uv_index_max" in daily and len(daily["uv_index_max"]) > 0:
                uv_index = daily["uv_index_max"][0]

            print(uv_index)
            
            return {
                "temperature_c":  current.get("temperature_2m"),
                "humidity": current.get("relative_humidity_2m"),
                "uv_index": uv_index
            }
        except Exception: 
            return None