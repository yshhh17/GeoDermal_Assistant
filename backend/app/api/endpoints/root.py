from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def root():
    return {
        "message": "Welcome to GeoDermal API",
        "version": "1.0.0",
        "description": "AI-powered environmental skin & hair analysis for travelers.  Get personalized risk assessments and recommendations based on your destination's climate, air quality, and water conditions.",
        "features": [
            "Real-time environmental data analysis",
            "AI-powered risk assessment using Groq LLM",
            "Personalized skincare and haircare recommendations",
            "Support for multiple skin and hair types",
            "Coverage across major Indian cities"
        ],
        "endpoints":  {
            "analyze": {
                "method": "POST",
                "path": "/api/analyze",
                "description": "Get environmental analysis and personalized recommendations"
            },
            "health": {
                "method": "GET",
                "path": "/api/health",
                "description": "Check API health and service status"
            },
            "stats": {
                "method": "GET",
                "path": "/api/stats",
                "description": "View usage statistics and insights"
            },
            "docs": {
                "method": "GET",
                "path": "/docs",
                "description": "Interactive API documentation (Swagger UI)"
            },
            "redoc": {
                "method":  "GET",
                "path":  "/redoc",
                "description": "Alternative API documentation (ReDoc)"
            }
        },
        "tech_stack": {
            "framework": "FastAPI",
            "database": "PostgreSQL",
            "ai_model": "Groq (openai/gpt-oss-20b)",
            "deployment": "Render"
        },
        "contact": {
            "github": "https://github.com/yshhh17/GeoDermal_Assistant",
            "author": "Yash Tiwari",
            "email": "yshhh173@gmail.com"
        },
        "documentation": {
            "swagger": "/docs",
            "redoc":  "/redoc",
            "openapi_schema": "/openapi.json"
        }
    }