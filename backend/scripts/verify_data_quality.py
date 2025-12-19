"""
Verify collected training data quality and coverage.
"""

import sys
from pathlib import Path
from collections import Counter
from sqlalchemy import func

sys.path.append(str(Path(__file__).resolve().parents[2]))

from backend.app.db.session import SessionLocal
from backend.app.models. report import Report


def analyze_coverage():
    """Analyze training data coverage and quality."""
    
    db = SessionLocal()
    
    try:
        # Total records
        total = db.query(Report).count()
        print(f"""
╔══════════════════════════════════════════════════════════════╗
║          TRAINING DATA QUALITY REPORT                        ║
╚══════════════════════════════════════════════════════════════╝

📊 Dataset Size: {total} records
""")
        
        if total == 0:
            print("❌ No data found in database!")
            return
        
        # Data quality metrics
        real_data = db.query(Report).filter(Report.is_mock_data == False).count()
        high_conf = db.query(Report).filter(Report.confidence == "high").count()
        
        print(f"""
📈 Data Quality: 
  Real data (not mock):      {real_data} ({real_data/total*100:.1f}%)
  High confidence:            {high_conf} ({high_conf/total*100:.1f}%)
""")
        
        # Coverage by dimension
        print("🌍 Coverage by City:")
        cities = db.query(Report. destination, func.count(Report.id)).group_by(Report.destination).all()
        for city, count in sorted(cities, key=lambda x: x[1], reverse=True)[:10]:
            print(f"   {city:20s} {count:4d} records")
        if len(cities) > 10:
            print(f"   ...  and {len(cities) - 10} more cities")
        
        print(f"\n📅 Coverage by Month:")
        months = db. query(Report.month_or_season, func.count(Report.id)).group_by(Report.month_or_season).all()
        for month, count in sorted(months, key=lambda x: x[1], reverse=True):
            print(f"   {month:15s} {count:4d} records")
        
        print(f"\n🎯 Coverage by Concern:")
        concerns = db.query(Report.concern, func.count(Report.id)).group_by(Report.concern).all()
        for concern, count in concerns:
            print(f"   {concern:10s} {count:4d} records ({count/total*100:.1f}%)")
        
        print(f"\n👤 Coverage by Skin Type:")
        skin_types = db.query(Report.skin_type, func.count(Report.id)).filter(
            Report.skin_type. isnot(None)
        ).group_by(Report.skin_type).all()
        for skin_type, count in sorted(skin_types, key=lambda x: x[1], reverse=True):
            print(f"   {skin_type:15s} {count:4d} records")
        
        print(f"\n💇 Coverage by Hair Type:")
        hair_types = db.query(Report.hair_type, func.count(Report.id)).filter(
            Report.hair_type. isnot(None)
        ).group_by(Report.hair_type).all()
        for hair_type, count in sorted(hair_types, key=lambda x: x[1], reverse=True):
            print(f"   {hair_type:15s} {count:4d} records")
        
        # Environmental data completeness
        print(f"\n🌡️  Environmental Data Completeness:")
        
        fields = [
            ("temperature_c", "Temperature"),
            ("humidity", "Humidity"),
            ("uv_index", "UV Index"),
            ("pm25", "PM2.5"),
            ("aqi", "AQI"),
            ("water_hardness", "Water Hardness"),
            ("water_ph", "Water pH"),
        ]
        
        for field, label in fields:
            non_null = db.query(Report).filter(getattr(Report, field).isnot(None)).count()
            print(f"   {label:20s} {non_null:4d}/{total} ({non_null/total*100:.1f}%)")
        
        # Missing fields analysis
        print(f"\n⚠️  Records with Missing Data:")
        has_missing = db.query(Report).filter(Report.missing_fields.isnot(None)).count()
        print(f"   Records with missing fields: {has_missing} ({has_missing/total*100:.1f}%)")
        
        print(f"\n✅ Data quality verification complete!\n")
        
    finally: 
        db.close()


if __name__ == "__main__": 
    analyze_coverage()