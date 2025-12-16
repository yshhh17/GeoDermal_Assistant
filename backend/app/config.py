from pydantic_settings import BaseSettings
from pydantic import AnyUrl

class Settings(BaseSettings):
    APP_NAME: str = "GEODermal - Backend"
    OPEN_METEO_BASE: AnyUrl = "https://api.open-meteo.com/v1"
    OPENAQ_BASE: AnyUrl = "https://air-quality-api.open-meteo.com/v1"
    GEOCODE_BASE_URL: AnyUrl = "https://nominatim.openstreetmap.org"
    # general httpx timeout seconds
    HTTP_TIMEOUT: int = 10

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()