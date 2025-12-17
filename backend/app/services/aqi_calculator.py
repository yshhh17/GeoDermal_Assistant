"""
EPA AQI (Air Quality Index) Calculator
Based on US EPA standard:  https://www.airnow.gov/aqi/aqi-calculator-concentration/
"""

def calculate_aqi_from_pm25(pm25: float) -> int:
    """
    Calculate AQI from PM2.5 concentration (µg/m³) using EPA breakpoints.
    
    Args:
        pm25: PM2.5 concentration in µg/m³
        
    Returns:
        AQI value (0-500+)
    """
    if pm25 is None:
        return None
    
    # EPA AQI breakpoints for PM2.5 (24-hour average)
    # Format: (C_low, C_high, AQI_low, AQI_high)
    breakpoints = [
        (0.0, 12.0, 0, 50),       # Good
        (12.1, 35.4, 51, 100),    # Moderate
        (35.5, 55.4, 101, 150),   # Unhealthy for Sensitive Groups
        (55.5, 150.4, 151, 200),  # Unhealthy
        (150.5, 250.4, 201, 300), # Very Unhealthy
        (250.5, 350.4, 301, 400), # Hazardous
        (350.5, 500.4, 401, 500), # Hazardous
    ]
    
    # Find the appropriate breakpoint
    for c_low, c_high, aqi_low, aqi_high in breakpoints:
        if c_low <= pm25 <= c_high:
            # Linear interpolation formula
            aqi = ((aqi_high - aqi_low) / (c_high - c_low)) * (pm25 - c_low) + aqi_low
            return round(aqi)
    
    # If PM2.5 is above 500. 4, return 500+ (hazardous)
    if pm25 > 500.4:
        return 500
    
    # If PM2.5 is negative (invalid), return None
    return None


def get_aqi_category(aqi: int) -> str:
    """
    Get AQI category label from AQI value.
    
    Args:
        aqi: AQI value
        
    Returns:
        Category string
    """
    if aqi is None:
        return "Unknown"
    elif aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi <= 200:
        return "Unhealthy"
    elif aqi <= 300:
        return "Very Unhealthy"
    else: 
        return "Hazardous"