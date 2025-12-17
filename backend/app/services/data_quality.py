"""
Data quality checks and confidence scoring. 
"""
from typing import Dict, Any, List, Tuple

def check_data_quality(env_report: Dict[str, Any]) -> Tuple[bool, List[str], str]:
    """
    Check data quality and return flags. 
    
    Args:
        env_report: Environmental report dictionary from /api/analyze
        
    Returns:
        Tuple of (is_mock_data, missing_fields, confidence)
        - is_mock_data: True if critical fields are missing
        - missing_fields: List of missing field names
        - confidence: "high", "medium", or "low"
    """
    # Critical environmental fields for model training
    critical_fields = [
        "temperature_c",
        "humidity",
        "uv_index",
        "pm25",
        "aqi"
    ]
    
    # Optional but important fields
    optional_fields = [
        "pm10",
        "NO2",
        "O3"
    ]
    
    missing_fields = []
    missing_critical = []
    
    # Check critical fields
    for field in critical_fields:
        value = env_report.get(field)
        if value is None: 
            missing_fields.append(field)
            missing_critical.append(field)
    
    # Check optional fields
    for field in optional_fields: 
        value = env_report. get(field)
        if value is None:
            missing_fields.append(field)
    
    # Determine is_mock_data flag
    # If ANY critical field is missing, mark as mock data
    is_mock_data = len(missing_critical) > 0
    
    # Calculate confidence
    if len(missing_critical) == 0 and len(missing_fields) == 0:
        confidence = "high"
    elif len(missing_critical) == 0 and len(missing_fields) <= 2:
        confidence = "medium"
    else:
        confidence = "low"
    
    return is_mock_data, missing_fields, confidence


def validate_env_data(env_report: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate and clean environmental data.
    Apply basic sanity checks and fix obvious errors.
    
    Args:
        env_report: Environmental report dictionary
        
    Returns:
        Cleaned env_report dictionary
    """
    cleaned = env_report.copy()
    
    # Temperature sanity check (-50°C to 60°C for Earth surface)
    if cleaned.get("temperature_c") is not None:
        temp = cleaned["temperature_c"]
        if temp < -50 or temp > 60:
            cleaned["temperature_c"] = None
    
    # Humidity should be 0-100%
    if cleaned.get("humidity") is not None:
        humidity = cleaned["humidity"]
        if humidity < 0 or humidity > 100:
            cleaned["humidity"] = None
    
    # UV index should be 0-15 (can go higher in extreme cases)
    if cleaned.get("uv_index") is not None:
        uv = cleaned["uv_index"]
        if uv < 0 or uv > 20:
            cleaned["uv_index"] = None
    
    # PM2.5 and PM10 should be non-negative
    for field in ["pm25", "pm10"]:
        if cleaned. get(field) is not None and cleaned[field] < 0:
            cleaned[field] = None
    
    # AQI should be 0-500
    if cleaned.get("aqi") is not None:
        aqi = cleaned["aqi"]
        if aqi < 0 or aqi > 500:
            cleaned["aqi"] = None
    
    return cleaned