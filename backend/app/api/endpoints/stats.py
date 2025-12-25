from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
import logging
from app.db.session import get_db
from app.models.report import Report
from fastapi import Request, Response
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.core.rate_limiter import limiter

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/stats")
@limiter.limit("30/hour")
async def get_statistics(request: Request,response: Response,db: Session = Depends(get_db)):
    try:
        # Total analyses
        total_analyses = db.query(func.count(Report.id)).scalar() or 0
        
        # Analyses by concern
        concern_stats = db.query(
            Report.concern,
            func.count(Report.id).label('count')
        ).group_by(Report.concern).all()
        
        analyses_by_concern = {
            concern: count for concern, count in concern_stats
        }
        
        # Top destinations (top 10)
        top_destinations = db.query(
            Report.destination,
            func.count(Report.id).label('count')
        ).group_by(Report.destination).order_by(desc('count')).limit(10).all()
        
        top_destinations_list = [
            {"city": dest, "count": count} 
            for dest, count in top_destinations
        ]
        
        # Average risk scores (only for records with risks)
        # Get all reports with non-null risks
        reports_with_risks = db.query(Report).filter(Report.risks.isnot(None)).all()
        
        if reports_with_risks:
            # Calculate averages
            risk_sums = {}
            risk_counts = {}
            
            for report in reports_with_risks:
                if report.risks:
                    for risk_type, value in report.risks. items():
                        if isinstance(value, (int, float)):
                            if risk_type not in risk_sums:
                                risk_sums[risk_type] = 0
                                risk_counts[risk_type] = 0
                            risk_sums[risk_type] += value
                            risk_counts[risk_type] += 1
            
            average_risks = {
                risk_type: round(risk_sums[risk_type] / risk_counts[risk_type], 1)
                for risk_type in risk_sums
            }
        else:
            average_risks = {}
        
        # Recent activity (last 24 hours)
        yesterday = datetime.utcnow() - timedelta(hours=24)
        recent_count = db.query(func.count(Report.id)).filter(
            Report.created_at >= yesterday
        ).scalar() or 0
        
        # Most common skin types
        skin_type_stats = db.query(
            Report.skin_type,
            func.count(Report.id).label('count')
        ).filter(Report.skin_type. isnot(None)).group_by(Report.skin_type).all()
        
        skin_types = {
            skin_type: count for skin_type, count in skin_type_stats
        }
        
        # Most common hair types
        hair_type_stats = db.query(
            Report.hair_type,
            func.count(Report.id).label('count')
        ).filter(Report.hair_type.isnot(None)).group_by(Report.hair_type).all()
        
        hair_types = {
            hair_type: count for hair_type, count in hair_type_stats
        }
        
        # Most common duration categories
        duration_stats = db.query(
            Report.duration_category,
            func.count(Report.id).label('count')
        ).group_by(Report.duration_category).all()
        
        durations = {
            duration: count for duration, count in duration_stats
        }
        
        # Calculate uptime (time since first record)
        first_record = db.query(Report).order_by(Report.created_at.asc()).first()
        if first_record: 
            uptime_seconds = (datetime.utcnow() - first_record.created_at).total_seconds()
            uptime_hours = round(uptime_seconds / 3600, 1)
        else:
            uptime_hours = 0
        
        return {
            "total_analyses": total_analyses,
            "analyses_by_concern": analyses_by_concern,
            "top_destinations": top_destinations_list,
            "average_risks": average_risks,
            "recent_activity": {
                "last_24_hours": recent_count
            },
            "user_profiles": {
                "skin_types": skin_types,
                "hair_types": hair_types
            },
            "trip_durations": durations,
            "uptime_hours": uptime_hours,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
        
    except Exception as e: 
        logger.error(f"Error fetching statistics: {e}")
        return {
            "error": "Unable to fetch statistics",
            "message": str(e),
            "total_analyses": 0
        }