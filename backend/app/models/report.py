from sqlalchemy import Column, String, Float, Integer, Boolean, DateTime, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid
from .. db.base import Base

class Report(Base):
    __tablename__ = "reports"
    
    # Primary key & metadata
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    source_version = Column(String(50), nullable=False)
    
    # User inputs
    destination = Column(String(255), nullable=False, index=True)
    home_city = Column(String(255), nullable=False)
    duration_category = Column(String(20), nullable=False)
    month_or_season = Column(String(50), nullable=False)
    concern = Column(String(10), nullable=False, index=True)
    skin_type = Column(String(20), nullable=True)
    hair_type = Column(String(20), nullable=True)
    
    # Geocoding results
    destination_lat = Column(Float, nullable=True)
    destination_lon = Column(Float, nullable=True)
    destination_display_name = Column(String, nullable=True)
    
    # Environmental features (normalized from APIs)
    temperature_c = Column(Float, nullable=True)
    humidity = Column(Integer, nullable=True)
    uv_index = Column(Float, nullable=True)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    no2 = Column(Float, nullable=True)
    o3 = Column(Float, nullable=True)
    aqi = Column(Integer, nullable=True)
    
    # Water quality (to be added later)
    water_hardness = Column(Integer, nullable=True)
    water_ph = Column(Float, nullable=True)
    water_tds = Column(Integer, nullable=True)
    water_chlorine = Column(Float, nullable=True)
    
    # Risk labels (heuristic outputs for training)
    risks = Column(JSONB, nullable=False)
    
    # Data quality flags
    is_mock_data = Column(Boolean, default=False, nullable=False, index=True)
    missing_fields = Column(JSONB, nullable=True)  # List of field names that are missing
    confidence = Column(String(20), nullable=True)
    
    # Optional:  user tracking for future auth
    user_id = Column(UUID(as_uuid=True), nullable=True)
    
    # Constraints
    __table_args__ = (
        CheckConstraint("concern IN ('skin', 'hair')", name="valid_concern"),
    )
    
    def __repr__(self):
        return f"<Report(id={self.id}, destination={self.destination}, concern={self.concern}, created_at={self.created_at})>"