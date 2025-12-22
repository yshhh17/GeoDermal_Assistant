from pydantic import BaseModel
from typing import Optional, Literal

class AnalyzeRequest(BaseModel):
    destination: str
    duration_category: Literal["<48h", "2-7d", "1-4w", "relocation"]
    month_or_season: str
    home_city: str
    concern: Literal["skin", "hair"]
    skin_type: Optional[Literal["dry", "oily", "normal", "combination", "sensitive"]] = None
    hair_type: Optional[Literal["straight", "wavy", "curly", "coily"]] = None