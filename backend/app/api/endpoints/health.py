from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime
import os
import logging
from ...config import settings
from app.db.session import get_db

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    health_status = {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "services": {}
    }
    
    # Check database connectivity
    try: 
        db.execute(text("SELECT 1"))
        health_status["services"]["database"] = "connected"
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        health_status["services"]["database"] = "disconnected"
        health_status["status"] = "degraded"
    
    # Check Groq API key availability
    if settings.GROQ_API_KEY:
        health_status["services"]["groq_api"] = "configured"
    else:
        health_status["services"]["groq_api"] = "not_configured"
        health_status["status"] = "degraded"
    
    # Check other API keys
    if settings.OPEN_METEO_BASE:
        health_status["services"]["weather_api"] = "configured"
    else:
        health_status["services"]["weather_api"] = "not_configured"
    
    if settings.OPENAQ_BASE:
        health_status["services"]["air_quality_api"] = "configured"
    else:
        health_status["services"]["air_quality_api"] = "not_configured"
    
    return health_status