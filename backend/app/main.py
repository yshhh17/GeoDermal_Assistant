from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from .api.endpoints.analyze import router as analyze_router
from .api.endpoints.health import router as health_router
from .api.endpoints.root import router as root_router
from .api.endpoints.stats import router as stats_router
from .config import settings
from .db.base import Base
from .db.session import engine, get_db
from sqlalchemy.orm import Session
import logging
from .services.clients.water_quality import load_water_quality_data
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.rate_limiter import limiter, rate_limit_exceeded_handler


load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="GeoDermal API",
    description="AI-powered environmental skin & hair analysis for travelers",
    version="1.0.0"
)
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

@app.get("/")
async def greeting():
    return {"message": "hello there from server"}

@app.get("/health")
async def health():
    return {"status": "ok", "app": settings.APP_NAME}

app.include_router(analyze_router, prefix="/api", tags=["analysis"])
app.include_router(root_router, prefix="/api", tags=["root"])
app.include_router(stats_router, prefix="/api", tags=["statistics"])
app.include_router(health_router, prefix="/api", tags=["server-health"])
