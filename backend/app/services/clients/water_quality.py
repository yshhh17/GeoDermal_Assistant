"""
Water quality lookup service for Indian cities. 
Uses static CSV data with nearest-city fallback.
"""

import pandas as pd
from typing import Dict, Any, Optional
from pathlib import Path
import math
import logging

logger = logging.getLogger(__name__)

# Global cache for water quality data
_WATER_DATA:  Optional[pd.DataFrame] = None


def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate distance between two points on Earth (in km).
    Uses Haversine formula. 
    """
    R = 6371  # Earth radius in km
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_lat / 2) ** 2 +
         math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2)
    c = 2 * math. atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


def load_water_quality_data() -> pd.DataFrame:
    """
    Load water quality CSV data into memory.
    Called once at app startup.
    """
    global _WATER_DATA
    
    if _WATER_DATA is not None:
        return _WATER_DATA
    
    csv_path = Path(__file__).resolve().parents[4] / "data" / "raw" / "india_water_quality.csv"
    
    if not csv_path.exists():
        logger.error(f"Water quality CSV not found at {csv_path}")
        return pd.DataFrame()
    
    try:
        _WATER_DATA = pd.read_csv(csv_path)
        logger.info(f"Loaded {len(_WATER_DATA)} cities from water quality database")
        return _WATER_DATA
    except Exception as e: 
        logger.error(f"Failed to load water quality data: {e}")
        return pd.DataFrame()


def lookup_water_quality(
    city: str,
    lat: Optional[float] = None,
    lon: Optional[float] = None,
    max_distance_km: float = 100.0
) -> Optional[Dict[str, Any]]:
    """
    Lookup water quality data for a city.
    
    Strategy:
    1. Try exact city name match (case-insensitive)
    2. If no match and coords provided, find nearest city within max_distance_km
    3. Return None if no match found
    
    Args:
        city: City name (e.g., "Mumbai", "New Delhi")
        lat: Optional latitude for nearest-city fallback
        lon: Optional longitude for nearest-city fallback
        max_distance_km: Maximum distance for nearest-city match
        
    Returns:
        Dict with water quality data or None
        {
            "city": "Mumbai",
            "hardness_mg_l": 120,
            "ph": 7.3,
            "tds_mg_l": 350,
            "chlorine_mg_l": 0.8,
            "source_type": "surface",
            "reliability": "high",
            "match_type": "exact" | "nearest" | "state_avg",
            "distance_km": 0.0 (for nearest matches)
        }
    """
    df = load_water_quality_data()
    
    if df.empty:
        logger.warning("Water quality database is empty")
        return None
    
    # Clean city name (remove common suffixes)
    city_clean = city.lower().strip()
    city_clean = city_clean.replace(" city", "").replace(", india", "")
    
    # Strategy 1: Exact match (case-insensitive)
    exact_match = df[df['city'].str.lower() == city_clean]
    
    if not exact_match.empty:
        row = exact_match.iloc[0]
        return {
            "city": row['city'],
            "state": row['state'],
            "hardness_mg_l": int(row['hardness_mg_l']),
            "ph": float(row['ph']),
            "tds_mg_l": int(row['tds_mg_l']),
            "chlorine_mg_l": float(row['chlorine_mg_l']),
            "source_type": row['source_type'],
            "reliability": row['reliability'],
            "match_type":  "exact",
            "distance_km": 0.0
        }
    
    # Strategy 2: Partial match (e.g., "New Delhi" matches "Delhi")
    partial_match = df[df['city'].str.lower().str.contains(city_clean, na=False)]
    
    if not partial_match.empty:
        row = partial_match.iloc[0]
        return {
            "city":  row['city'],
            "state": row['state'],
            "hardness_mg_l": int(row['hardness_mg_l']),
            "ph": float(row['ph']),
            "tds_mg_l": int(row['tds_mg_l']),
            "chlorine_mg_l": float(row['chlorine_mg_l']),
            "source_type": row['source_type'],
            "reliability": row['reliability'],
            "match_type":  "partial",
            "distance_km": 0.0
        }
    
    # Strategy 3: Nearest city (if coordinates provided)
    if lat is not None and lon is not None: 
        df['distance'] = df.apply(
            lambda row: _haversine_distance(lat, lon, row['lat'], row['lon']),
            axis=1
        )
        
        nearest = df.loc[df['distance'].idxmin()]
        distance = nearest['distance']
        
        if distance <= max_distance_km: 
            logger.info(f"Using nearest city {nearest['city']} ({distance:.1f} km from {city})")
            return {
                "city": nearest['city'],
                "state": nearest['state'],
                "hardness_mg_l": int(nearest['hardness_mg_l']),
                "ph": float(nearest['ph']),
                "tds_mg_l": int(nearest['tds_mg_l']),
                "chlorine_mg_l": float(nearest['chlorine_mg_l']),
                "source_type": nearest['source_type'],
                "reliability": nearest['reliability'],
                "match_type": "nearest",
                "distance_km": round(distance, 1)
            }
    
    logger.warning(f"No water quality data found for {city}")
    return None