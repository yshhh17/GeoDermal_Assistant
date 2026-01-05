from pydantic_settings import BaseSettings
from pydantic import AnyUrl
from pathlib import Path

class Settings(BaseSettings):
    APP_NAME: str = "GEODermal - Backend"
    OPEN_METEO_BASE: AnyUrl = "https://api.open-meteo.com/v1"
    OPENAQ_BASE: AnyUrl = "https://air-quality-api.open-meteo.com/v1"
    GEOCODE_BASE_URL: AnyUrl = "https://nominatim.openstreetmap.org"
    GROQ_API_KEY: str
    # general httpx timeout seconds
    HTTP_TIMEOUT: int = 10
    DATABASE_URL: str
    SOURCE_VERSION: str
    FRONTEND_URL: str
    class Config:
        # Try multiple locations for .env file
        env_file = str(Path(__file__).parent.parent / ".env")
        env_file_encoding = "utf-8"
        extra = "allow"

settings = Settings()