"""
LLM Service using Groq (FREE, no credit card needed!)
Analyzes environmental data and generates risk scores + recommendations.
"""

from groq import Groq
import json
import os
import logging

logger = logging.getLogger(__name__)

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_with_llm(env_data: dict, user_profile: dict) -> dict:
    """
    Use Groq LLM to analyze environmental data and generate:
    - Risk scores (1-10)
    - Recommendations
    - Explanations
    """

    concern = user_profile.get("concern", "skin")

    if concern == "skin":
        risk_focus = "dryness, acne, irritation, uv_damage, pigmentation"
        risk_schema = """
        "dryness": 0,
        "acne": 0,
        "irritation": 0,
        "uv_damage": 0,
        "pigmentation": 0
        """
    else:
        risk_focus = "hairfall, dandruff"
        risk_schema = """
        "hairfall": 0,
        "dandruff": 0
        """

    prompt = f"""
You are an expert dermatologist specializing in environmental skin and hair care.

Environmental Data:
- Location: {env_data.get('city', 'Unknown')}
- Temperature: {env_data.get('temperature_c')} °C
- Humidity: {env_data.get('humidity')} %
- Air Quality (PM2.5): {env_data.get('pm25')} µg/m³
- AQI: {env_data.get('aqi')}
- UV Index: {env_data.get('uv_index')}
- Water Hardness: {env_data.get('water_hardness')} ppm
- Water pH: {env_data.get('water_ph')}

User Profile:
- Concern: {concern}
- Skin Type: {user_profile.get('skin_type', 'N/A')}
- Hair Type: {user_profile.get('hair_type', 'N/A')}
- Duration: {user_profile.get('duration_category', 'short')}

Task:
Analyze the conditions and provide risk assessment for: {risk_focus}

Respond with ONLY valid JSON in this exact format:
{{
  "risks": {{
    {risk_schema}
  }},
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3",
    "Recommendation 4",
    "Recommendation 5",
    "Recommendation 6",
    "Recommendation 7",
    "Recommendation 8"
  ],
  "explanations": {{
    "why": [
      "Reason 1",
      "Reason 2",
      "Reason 3"
    ]
  }}
}}

Risk scores must be integers between 1 and 10.
Output ONLY JSON. No markdown.
"""

    try:
        logger.info("Calling Groq LLM...")

        response = client.chat.completions.create(
            model=os.getenv("GROQ_MODEL", "llama-3.1-70b-versatile"),
            messages=[
                {
                    "role": "system",
                    "content": "You are a dermatologist. Always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=1200,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        result = json.loads(content)

        if "risks" not in result or "recommendations" not in result:
            raise ValueError("Missing required fields")

        # Normalize risk scores
        for k, v in result["risks"].items():
            try:
                v = int(round(float(v)))
                result["risks"][k] = max(1, min(10, v))
            except Exception:
                result["risks"][k] = 5

        return result

    except Exception as e:
        logger.error(f"LLM failed: {e}")
        return get_fallback_analysis(env_data, user_profile)


def get_fallback_analysis(env_data: dict, user_profile: dict) -> dict:
    logger.info("Using fallback heuristic analysis")

    concern = user_profile.get("concern", "skin")

    if concern == "skin":
        humidity = env_data.get("humidity", 50)
        pm25 = env_data.get("pm25", 50)
        uv_index = env_data.get("uv_index", 5)
        water_hardness = env_data.get("water_hardness", 150)
        skin_type = user_profile.get("skin_type", "normal")

        dryness = 5 + (3 if humidity < 30 else 1 if humidity < 50 else 0)
        dryness += 1 if pm25 > 100 else 0
        dryness += 2 if skin_type == "dry" else -2 if skin_type == "oily" else 0
        dryness = max(1, min(10, dryness))

        acne = 5 + (2 if humidity > 70 else 0)
        acne += 1 if pm25 > 100 else 0
        acne += 2 if skin_type == "oily" else -2 if skin_type == "dry" else 0
        acne = max(1, min(10, acne))

        irritation = 5
        irritation += 2 if pm25 > 150 else 0
        irritation += 1 if water_hardness > 250 else 0
        irritation += 2 if skin_type == "sensitive" else 0
        irritation = max(1, min(10, irritation))

        uv_damage = 5 + (4 if uv_index >= 8 else 2 if uv_index >= 6 else 1 if uv_index >= 3 else 0)
        uv_damage += 1 if skin_type == "sensitive" else 0
        uv_damage = max(1, min(10, uv_damage))

        pigmentation = 5
        pigmentation += 2 if uv_index >= 8 else 0
        pigmentation += 1 if pm25 > 150 else 0
        pigmentation += 1 if skin_type == "sensitive" else 0
        pigmentation = max(1, min(10, pigmentation))

        risks = {
            "dryness": dryness,
            "acne": acne,
            "irritation": irritation,
            "uv_damage": uv_damage,
            "pigmentation": pigmentation
        }

        recommendations = [
            "Use a moisturizer suitable for your skin type",
            "Apply SPF 30+ sunscreen daily",
            "Cleanse gently twice a day",
            "Drink plenty of water",
            "Avoid touching your face",
            "Use antioxidant-based skincare",
            "Keep routine minimal while traveling",
            "Carry travel-sized products"
        ]

    else:
        humidity = env_data.get("humidity", 50)
        pm25 = env_data.get("pm25", 50)
        water_hardness = env_data.get("water_hardness", 150)

        hairfall = 5 + (3 if water_hardness > 300 else 1 if water_hardness > 200 else 0)
        hairfall += 1 if pm25 > 100 else 0
        hairfall = max(1, min(10, hairfall))

        dandruff = 5 + (3 if humidity < 30 else 1 if humidity < 50 else 0)
        dandruff += 2 if water_hardness > 250 else 0
        dandruff = max(1, min(10, dandruff))

        risks = {
            "hairfall": hairfall,
            "dandruff": dandruff
        }

        recommendations = [
            "Use sulfate-free shampoo",
            "Condition mid-lengths and ends",
            "Wash hair 2–3 times a week",
            "Avoid heat styling",
            "Use wide-tooth comb",
            "Use clarifying shampoo if water is hard",
            "Apply leave-in conditioner",
            "Carry dry shampoo"
        ]

    return {
        "risks": risks,
        "recommendations": recommendations,
        "explanations": {
            "why": [
                "Environmental factors were analyzed",
                "Risks calculated using dermatology heuristics",
                "Advice tailored to travel conditions"
            ]
        }
    }
