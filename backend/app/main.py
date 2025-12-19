from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from .api.endpoints.analyze import router as analyze_router
from .config import settings
from .db.base import Base
from .db.session import engine, get_db
from sqlalchemy.orm import Session
import logging
from .services.clients.water_quality import load_water_quality_data

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title=settings.APP_NAME)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    logger.info("Loading water quality data into database...")
    load_water_quality_data()
    logger.info("application startup complete!!")

@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}

app.include_router(analyze_router, prefix="/api")
