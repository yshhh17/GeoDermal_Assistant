from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from .api.endpoints.analyze import router as analyze_router

load_dotenv()

class Settings(BaseSettings):
    APP_NAME: str = "GeoDermal-Backend"

settings = Settings()

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}

app.include_router(analyze_router, prefix="/api")
