import httpx
from typing import Dict, Any, Optional
from ..config import settings

# Nominatim requires a descriptive user-agent; include app name and optional contact
DEFAULT_HEADERS = {
    "User-Agent": f"{settings.APP_NAME} (contact: iamyashtiwari28@gmail.com)",
    "Accept-Language": "en"
}

async def geocode_place(place: str) -> Optional[Dict[str, Any]]:
    """
    Query Nominatim (OpenStreetMap) to get lat/lon for a place string.
    Returns dict { 'lat': float, 'lon': float, 'display_name': str } or None on failure.
    """
    url = f"{settings.GEOCODE_BASE_URL}/search"
    params = {
        "q": place,
        "format": "jsonv2",
        "limit": 1,
        "addressdetails": 1
    }
    timeout = settings.HTTP_TIMEOUT
    async with httpx.AsyncClient(timeout=timeout, headers=DEFAULT_HEADERS) as client:
        try:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            if not data:
                return None
            top = data[0]
            return {
                "lat": float(top.get("lat")),
                "lon": float(top.get("lon")),
                "display_name": top.get("display_name")
            }
        except Exception:
            # In production, log the exception; for now return None
            return None