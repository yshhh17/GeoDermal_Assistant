"""
LLM Service using Groq API (FREE, no credit card needed!)
Analyzes environmental data and generates risk scores + recommendations. 
"""

from groq import Groq
import json
import os
import logging
from ..config import settings

logger = logging.getLogger(__name__)

# Initialize Groq client
client = Groq(api_key=settings.GROQ_API_KEY)


def analyze_with_llm(env_data:  dict, user_profile: dict) -> dict:
    """
    Use Groq LLM to analyze environmental data and generate: 
    - Risk scores (1-10)
    - Recommendations
    - Explanations
    
    Args:
        env_data: Environmental data (temp, humidity, PM2.5, etc.)
        user_profile: User info (concern, skin_type, hair_type, duration)
    
    Returns:
        dict with risks, recommendations, explanations
    """
    
    # Determine which risks to focus on
    if user_profile['concern'] == 'skin': 
        risk_focus = "dryness, acne, irritation, uv_damage, pigmentation"
        risk_template = '"dryness":  5, "acne": 5, "irritation": 5, "uv_damage": 5, "pigmentation": 5'
    else:
        risk_focus = "hairfall, dandruff"
        risk_template = '"hairfall": 5, "dandruff": 5'
    
    # Build smart prompt
    prompt = f"""You are an expert dermatologist specializing in environmental skin and hair care. 

**Environmental Data:**
- Location: {env_data. get('city', 'Unknown')}
- Temperature: {env_data.get('temperature_c')}°C
- Humidity: {env_data.get('humidity')}%
- Air Quality (PM2.5): {env_data.get('pm25')} µg/m³
- AQI: {env_data. get('aqi')}
- UV Index: {env_data.get('uv_index')}
- Water Hardness: {env_data.get('water_hardness')} ppm
- Water pH: {env_data.get('water_ph')}

**User Profile:**
- Concern: {user_profile['concern']}
- Skin Type: {user_profile. get('skin_type', 'N/A')}
- Hair Type: {user_profile.get('hair_type', 'N/A')}
- Duration: {user_profile.get('duration_category')}

**Task:**
Analyze the conditions and provide risk assessment for: {risk_focus}

Respond with ONLY valid JSON in this exact format:
{{
  "risks": {{
    {risk_template}
  }},
  "recommendations": [
    "Specific recommendation 1",
    "Specific recommendation 2",
    "Specific recommendation 3",
    "Specific recommendation 4",
    "Specific recommendation 5",
    "Specific recommendation 6",
    "Specific recommendation 7",
    "Specific recommendation 8"
  ],
  "explanations": {{
    "why":  [
      "Brief explanation about the environmental conditions",
      "Brief explanation about the main risk factors",
      "Brief explanation about why these recommendations help"
    ]
  }}
}}

**Risk Score Guidelines (1-10 scale):**
- 1-3: Low risk (minimal concern, basic care sufficient)
- 4-6: Moderate risk (some precautions recommended)
- 7-10: High risk (significant precautions essential)

**Consider these factors:**
- Low humidity (<30%) increases dryness significantly
- High PM2.5 (>100) causes irritation and acne
- High UV (>7) requires strong sun protection
- Hard water (>250ppm) affects hair and skin barrier
- Combine multiple factors for accurate assessment

**Recommendation Guidelines:**
- Be specific with product types (not brand names)
- Make them actionable for travelers
- Prioritize by severity
- Include both preventive and treatment advice
- Consider the duration of stay

Output ONLY the JSON, no markdown formatting."""

    try:
        logger.info("Calling Groq LLM for analysis...")
        
        # Call Groq API
        response = client.chat.completions. create(
            model=os.getenv("GROQ_MODEL", "openai/gpt-oss-20b"),
            messages=[
                {
                    "role": "system",
                    "content": "You are a dermatologist providing environmental skin/hair care analysis. Always respond with valid JSON only, no markdown formatting."
                },
                {
                    "role":  "user",
                    "content": prompt
                }
            ],
            temperature=0.3,  # Lower = more consistent
            max_tokens=1500,
            response_format={"type": "json_object"}  # Force JSON output
        )
        
        # Extract content
        content = response.choices[0].message.content
        logger.info(f"Groq response received: {len(content)} characters")
        
        # Parse JSON
        result = json.loads(content)
        
        # Validate structure
        if 'risks' not in result or 'recommendations' not in result: 
            logger.warning("LLM response missing required fields, using fallback")
            return get_fallback_analysis(env_data, user_profile)
        
        # Ensure risks are integers and within 1-10 range
        if 'risks' in result:
            for key in result['risks']:
                try:
                    result['risks'][key] = int(round(float(result['risks'][key])))
                    # Clamp to 1-10 range
                    result['risks'][key] = max(1, min(10, result['risks'][key]))
                except (ValueError, TypeError):
                    logger.warning(f"Invalid risk value for {key}, using default")
                    result['risks'][key] = 5
        
        # Ensure we have explanations
        if 'explanations' not in result:
            result['explanations'] = {
                'why': [
                    f"Analysis based on {env_data.get('city', 'location')} environmental conditions",
                    f"Risk assessment considers temperature, humidity, and air quality",
                    "Recommendations tailored to your profile and travel duration"
                ]
            }
        
        logger.info(f"LLM analysis successful.  Risks: {result['risks']}")
        return result
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse LLM JSON response: {e}")
        logger.error(f"Response content: {content if 'content' in locals() else 'N/A'}")
        return get_fallback_analysis(env_data, user_profile)
        
    except Exception as e: 
        logger.error(f"LLM Error: {e}")
        return get_fallback_analysis(env_data, user_profile)


def get_fallback_analysis(env_data: dict, user_profile: dict) -> dict:
    """
    Fallback heuristic analysis if LLM fails. 
    Uses simple rule-based logic as backup.
    """
    logger.info("Using fallback heuristic analysis")
    
    concern = user_profile['concern']
    
    if concern == 'skin': 
        # Simple heuristic calculations
        humidity = env_data.get('humidity', 50)
        pm25 = env_data.get('pm25', 50)
        uv_index = env_data. get('uv_index', 5)
        water_hardness = env_data.get('water_hardness', 150)
        skin_type = user_profile.get('skin_type', 'normal')
        
        # Dryness calculation
        dryness = 5
        if humidity < 30:
            dryness += 3
        elif humidity < 50:
            dryness += 1
        if pm25 > 100:
            dryness += 1
        if skin_type == 'dry':
            dryness += 2
        elif skin_type == 'oily':
            dryness -= 2
        dryness = max(1, min(10, dryness))
        
        # Acne calculation
        acne = 5
        if humidity > 70:
            acne += 2
        if pm25 > 100:
            acne += 1
        if skin_type == 'oily':
            acne += 2
        elif skin_type == 'dry': 
            acne -= 2
        acne = max(1, min(10, acne))
        
        # Irritation calculation
        irritation = 5
        if pm25 > 150:
            irritation += 2
        if water_hardness > 250:
            irritation += 1
        if skin_type == 'sensitive':
            irritation += 2
        irritation = max(1, min(10, irritation))
        
        # UV damage calculation
        uv_damage = 5
        if uv_index >= 8:
            uv_damage += 4
        elif uv_index >= 6:
            uv_damage += 2
        elif uv_index >= 3:
            uv_damage += 1
        if skin_type == 'sensitive': 
            uv_damage += 1
        uv_damage = max(1, min(10, uv_damage))
        
        # Pigmentation calculation
        pigmentation = 5
        if uv_index >= 8:
            pigmentation += 2
        if pm25 > 150:
            pigmentation += 1
        if skin_type == 'sensitive':
            pigmentation += 1
        pigmentation = max(1, min(10, pigmentation))
        
        risks = {
            'dryness': dryness,
            'acne': acne,
            'irritation': irritation,
            'uv_damage': uv_damage,
            'pigmentation': pigmentation
        }
        
        recommendations = [
            "Use a moisturizer suitable for your skin type",
            "Apply broad-spectrum SPF 30+ sunscreen daily",
            "Cleanse your face twice daily with a gentle cleanser",
            "Stay hydrated by drinking plenty of water",
            "Avoid touching your face frequently",
            "Use products with antioxidants for pollution protection",
            "Keep your skincare routine simple while traveling",
            "Pack travel-sized products for convenience"
        ]
        
    else:  # hair concern
        humidity = env_data.get('humidity', 50)
        pm25 = env_data.get('pm25', 50)
        water_hardness = env_data. get('water_hardness', 150)
        
        # Hairfall calculation
        hairfall = 5
        if water_hardness > 300:
            hairfall += 3
        elif water_hardness > 200:
            hairfall += 1
        if pm25 > 100:
            hairfall += 1
        hairfall = max(1, min(10, hairfall))
        
        # Dandruff calculation
        dandruff = 5
        if humidity < 30:
            dandruff += 3
        elif humidity < 50:
            dandruff += 1
        if water_hardness > 250:
            dandruff += 2
        dandruff = max(1, min(10, dandruff))
        
        risks = {
            'hairfall': hairfall,
            'dandruff': dandruff
        }
        
        recommendations = [
            "Use a sulfate-free shampoo to protect hair",
            "Apply conditioner to mid-lengths and ends",
            "Limit washing to 2-3 times per week",
            "Use a wide-tooth comb on wet hair",
            "Avoid excessive heat styling",
            "Consider a clarifying shampoo if water is hard",
            "Apply leave-in conditioner for protection",
            "Pack a travel-sized dry shampoo"
        ]
    
    return {
        'risks': risks,
        'recommendations':  recommendations,
        'explanations':  {
            'why': [
                f"Environmental conditions analyzed based on temperature, humidity, and air quality",
                f"Risk scores calculated using dermatological guidelines",
                "Recommendations tailored to your profile and travel duration"
            ]
        }
    }