from pydantic_settings import BaseSettings
from pydantic import AnyUrl

class Settings(BaseSettings):
    APP_NAME: str = "GEODermal - Backend"
    OWM_API_KEY: str | None = None
    AQI_API_KEY: str | None = None
    GEOCODE_BASE_URL: AnyUrl = "https://nominatim.openstreetmap.org"
    # general httpx timeout seconds
    HTTP_TIMEOUT: int = 10

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()