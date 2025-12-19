"""
Training Data Collection Script
Generates diverse input combinations and calls /api/analyze to build training dataset.    

RESPECTS API RATE LIMITS:   
- Nominatim:    1 request/second (strict)
- Open-Meteo:  ~10k/day (soft, monitored)
"""

import asyncio
import httpx
import argparse
from typing import List, Dict, Any
import random
from datetime import datetime
import sys
from pathlib import Path
import time
import json

# Add parent directory to path
sys.path.append(str(Path(__file__).resolve().parents[2]))

from backend.app. config import settings

# ============================================================================
# RATE LIMITING CONFIGURATION
# ============================================================================

# Nominatim requires 1 second between requests
# We add buffer to be safe
REQUEST_DELAY = 1.2  # seconds between requests

# Batch processing (sequential, not parallel, due to rate limits)
BATCH_SIZE = 1  # Process one at a time

# Maximum retries for failed requests
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

# ============================================================================
# DATA DEFINITIONS
# ============================================================================

CITIES_TIER1 = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Kochi"
]

CITIES_TIER2 = [
    "Surat", "Chandigarh", "Indore", "Nagpur", "Patna",
    "Lucknow", "Coimbatore", "Vadodara", "Ludhiana", "Agra"
]

CITIES_TIER3 = [
    "Bhopal", "Visakhapatnam", "Nashik", "Varanasi", "Madurai",
    "Rajkot", "Goa", "Amritsar", "Guwahati", "Thiruvananthapuram"
]

ALL_CITIES = CITIES_TIER1 + CITIES_TIER2 + CITIES_TIER3

MONTHS = ["January", "March", "May", "June", "August", "October", "December"]
MONTHS_KEY = ["March", "June", "October", "December"]

CONCERNS = ["skin", "hair"]

SKIN_TYPES = ["dry", "oily", "normal", "combination", "sensitive"]
SKIN_TYPES_COMMON = ["dry", "oily", "normal"]

HAIR_TYPES = ["straight", "wavy", "curly", "coily"]
HAIR_TYPES_COMMON = ["straight", "wavy", "curly"]

DURATIONS = ["<48h", "2-7d", "1-4w", "relocation"]
DURATIONS_COMMON = ["2-7d", "1-4w"]

HOME_CITIES = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Pune", "Hyderabad"]


# ============================================================================
# SAMPLING STRATEGIES
# ============================================================================

def generate_stratified_samples(target:  int) -> List[Dict[str, Any]]:
    """
    Generate stratified samples ensuring good coverage.    
    
    Strategy:  
    - Priority 1: Tier 1 cities × key months × both concerns × common types (30%)
    - Priority 2: Tier 2 cities × key months × both concerns (20%)
    - Priority 3: All cities × extreme seasons × skin concern (15%)
    - Priority 4: Edge cases (high pollution, hard water, etc.) (10%)
    - Priority 5: Random diverse samples (25%)
    """
    samples = []
    
    # Priority 1: Tier 1 cities × key months × both concerns × common types
    print("📊 Priority 1: Tier 1 cities (major urban centers)...")
    for city in CITIES_TIER1:
        for month in MONTHS_KEY:  
            for concern in CONCERNS:  
                if concern == "skin":
                    for skin_type in SKIN_TYPES_COMMON:
                        samples. append({
                            "destination": city,
                            "duration_category": random.choice(DURATIONS_COMMON),
                            "month_or_season": month,
                            "home_city": random.choice(HOME_CITIES),
                            "concern": concern,
                            "skin_type":  skin_type,
                            "hair_type": None  # Always include both fields
                        })
                else:   # hair
                    for hair_type in HAIR_TYPES_COMMON:
                        samples.append({
                            "destination": city,
                            "duration_category": random.choice(DURATIONS_COMMON),
                            "month_or_season": month,
                            "home_city": random.choice(HOME_CITIES),
                            "concern":  concern,
                            "skin_type": None,  # Always include both fields
                            "hair_type": hair_type
                        })
    
    print(f"   Generated {len(samples)} Priority 1 samples")
    
    # Priority 2: Tier 2 cities × key months × both concerns
    print("📊 Priority 2: Tier 2 cities...")
    priority2_start = len(samples)
    for city in CITIES_TIER2:
        for month in ["March", "June", "December"]:
            for concern in CONCERNS:
                if concern == "skin":
                    samples.append({
                        "destination": city,
                        "duration_category": random.choice(DURATIONS_COMMON),
                        "month_or_season":  month,
                        "home_city": random.choice(HOME_CITIES),
                        "concern": concern,
                        "skin_type": random.choice(SKIN_TYPES_COMMON),
                        "hair_type": None
                    })
                else:  
                    samples.append({
                        "destination": city,
                        "duration_category": random.choice(DURATIONS_COMMON),
                        "month_or_season": month,
                        "home_city": random.choice(HOME_CITIES),
                        "concern": concern,
                        "skin_type": None,
                        "hair_type":  random.choice(HAIR_TYPES_COMMON)
                    })
    
    print(f"   Generated {len(samples) - priority2_start} Priority 2 samples")
    
    # Priority 3: All cities × extreme seasons
    print("📊 Priority 3: All cities × extreme seasons...")
    priority3_start = len(samples)
    for city in ALL_CITIES:
        for month in ["June", "December"]:
            samples.append({
                "destination":  city,
                "duration_category": "2-7d",
                "month_or_season": month,
                "home_city": random. choice(HOME_CITIES),
                "concern": "skin",
                "skin_type": "dry",
                "hair_type":  None
            })
    
    print(f"   Generated {len(samples) - priority3_start} Priority 3 samples")
    
    # Priority 4: Edge cases
    print("📊 Priority 4: Edge cases...")
    priority4_start = len(samples)
    
    # High pollution cities + sensitive skin
    high_pollution_cities = ["Delhi", "Kolkata", "Patna", "Lucknow", "Agra"]
    for city in high_pollution_cities:  
        for month in ["January", "October", "December"]:
            samples.append({
                "destination": city,
                "duration_category": "2-7d",
                "month_or_season": month,
                "home_city": random. choice(HOME_CITIES),
                "concern": "skin",
                "skin_type": "sensitive",
                "hair_type":  None
            })
    
    # Hard water cities + curly hair
    hard_water_cities = ["Chennai", "Jaipur", "Delhi", "Agra"]
    for city in hard_water_cities:
        for month in MONTHS_KEY:
            samples. append({
                "destination": city,
                "duration_category":  "2-7d",
                "month_or_season": month,
                "home_city":  random.choice(HOME_CITIES),
                "concern": "hair",
                "skin_type":  None,
                "hair_type":  "curly"
            })
    
    # Humid coastal cities + oily skin
    humid_cities = ["Mumbai", "Kochi", "Goa", "Kolkata", "Chennai"]
    for city in humid_cities:
        for month in ["June", "August"]:
            samples.append({
                "destination": city,
                "duration_category": "2-7d",
                "month_or_season": month,
                "home_city": random.choice(HOME_CITIES),
                "concern": "skin",
                "skin_type": "oily",
                "hair_type": None
            })
    
    print(f"   Generated {len(samples) - priority4_start} Priority 4 samples")
    
    # Priority 5: Random diverse samples to reach target
    print("📊 Priority 5: Random diverse samples...")
    priority5_start = len(samples)
    
    while len(samples) < target:
        concern = random.choice(CONCERNS)
        samples.append({
            "destination":  random.choice(ALL_CITIES),
            "duration_category":  random.choice(DURATIONS),
            "month_or_season": random.choice(MONTHS),
            "home_city": random.choice(HOME_CITIES),
            "concern": concern,
            "skin_type": random. choice(SKIN_TYPES) if concern == "skin" else None,
            "hair_type":  random.choice(HAIR_TYPES) if concern == "hair" else None
        })
    
    print(f"   Generated {len(samples) - priority5_start} Priority 5 samples")
    
    # Shuffle to avoid sequential patterns
    random.shuffle(samples)
    
    return samples[: target]


def generate_random_samples(target: int) -> List[Dict[str, Any]]:   
    """Generate completely random samples."""
    samples = []
    
    for _ in range(target):
        concern = random.choice(CONCERNS)
        samples.append({
            "destination": random.choice(ALL_CITIES),
            "duration_category": random.choice(DURATIONS),
            "month_or_season": random.choice(MONTHS),
            "home_city": random.choice(HOME_CITIES),
            "concern":  concern,
            "skin_type": random.choice(SKIN_TYPES) if concern == "skin" else None,
            "hair_type": random.choice(HAIR_TYPES) if concern == "hair" else None
        })
    
    return samples


# ============================================================================
# API CALLER WITH RATE LIMITING
# ============================================================================

async def call_analyze_api(client:  httpx.AsyncClient, payload: Dict[str, Any], retry_count: int = 0) -> Dict[str, Any]:  
    """
    Call /api/analyze endpoint with retry logic.
    """
    try:
        response = await client.post(
            "http://localhost:8000/api/analyze",
            json=payload,
            timeout=30.0
        )
        response.raise_for_status()
        return {"success": True, "data": response.json()}
    
    except httpx.HTTPStatusError as e:
        # Capture detailed error response
        error_detail = None
        try:
            error_detail = e.response.json()
        except:
            error_detail = e.response.text
        
        # Print detailed error for debugging
        if e.response.status_code == 422:
            print(f"   🔍 API Validation Error:")
            print(f"      {json.dumps(error_detail, indent=6)}")
        
        if e.response.status_code == 429 and retry_count < MAX_RETRIES:
            # Rate limit hit, wait and retry
            print(f"   ⚠️ Rate limit hit, waiting {RETRY_DELAY}s before retry...")
            await asyncio. sleep(RETRY_DELAY)
            return await call_analyze_api(client, payload, retry_count + 1)
        
        return {
            "success": False, 
            "error": f"HTTP {e.response.status_code}:  {str(e)}", 
            "error_detail": error_detail,
            "payload": payload
        }
    
    except Exception as e:
        if retry_count < MAX_RETRIES:
            print(f"   ⚠️ Error:  {str(e)}, retrying...")
            await asyncio.sleep(RETRY_DELAY)
            return await call_analyze_api(client, payload, retry_count + 1)
        return {"success": False, "error": str(e), "payload": payload}


async def sequential_collect(samples: List[Dict[str, Any]]):
    """
    Collect data SEQUENTIALLY with rate limiting.
    Respects Nominatim's 1 req/sec limit.
    """
    total = len(samples)
    success_count = 0
    error_count = 0
    errors = []
    
    # Calculate estimated time
    estimated_minutes = (total * REQUEST_DELAY) / 60
    
    print(f"\n🚀 Starting data collection:  {total} requests")
    print(f"⏱️  Rate limit: {REQUEST_DELAY}s between requests (Nominatim requirement)")
    print(f"⏱️  Estimated time:  {estimated_minutes:.1f} minutes\n")
    
    start_time = time.time()
    
    async with httpx.AsyncClient() as client:
        for i, payload in enumerate(samples, 1):
            # Progress indicator
            progress = i / total * 100
            elapsed = time.time() - start_time
            avg_time_per_req = elapsed / i if i > 0 else REQUEST_DELAY
            eta_seconds = (total - i) * avg_time_per_req
            eta_minutes = eta_seconds / 60
            
            print(f"📊 [{i}/{total}] ({progress:.1f}%) | ETA: {eta_minutes:.1f} min | {payload['destination']} - {payload['month_or_season']}")
            
            # Make request
            result = await call_analyze_api(client, payload)
            
            if result["success"]:
                success_count += 1
                print(f"   ✅ Success")
            else:
                error_count += 1
                errors.append(result)
                print(f"   ❌ Error: {result['error']}")
            
            # Rate limiting:  wait before next request (except for last one)
            if i < total:   
                await asyncio.sleep(REQUEST_DELAY)
    
    total_time = time.time() - start_time
    
    print(f"\n{'='*60}")
    print(f"✅ Collection Complete!")
    print(f"{'='*60}")
    print(f"Total requests:         {total}")
    print(f"Successful:             {success_count} ({success_count/total*100:.1f}%)")
    print(f"Failed:                {error_count} ({error_count/total*100:.1f}%)")
    print(f"Total time:            {total_time/60:.1f} minutes")
    print(f"Avg time/request:      {total_time/total:.2f} seconds")
    
    if errors:  
        print(f"\n❌ Errors encountered:")
        for err in errors[: 5]:  
            print(f"   - {err['error']}")
            print(f"     Payload: {err['payload']['destination']} / {err['payload']['month_or_season']}")
        if len(errors) > 5:
            print(f"   ... and {len(errors) - 5} more errors")
        
        # Save errors to file
        error_file = Path("collection_errors.json")
        with open(error_file, "w") as f:
            json. dump(errors, f, indent=2)
        print(f"\n📝 Full error log saved to: {error_file}")
    
    return success_count, error_count


# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="Collect training data by calling /api/analyze")
    parser.add_argument("--target", type=int, default=1000, help="Number of records to generate")
    parser.add_argument("--strategy", choices=["stratified", "random"], default="stratified",
                        help="Sampling strategy")
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    
    args = parser. parse_args()
    
    # Set random seed
    random. seed(args.seed)
    
    # Calculate estimated time
    estimated_minutes = (args.target * REQUEST_DELAY) / 60
    estimated_hours = estimated_minutes / 60
    
    print(f"""
╔══════════════════════════════════════════════════════════════╗
║          GEODERMAL TRAINING DATA COLLECTION                  ║
╚══════════════════════════════════════════════════════════════╝

Configuration:
  Target records:       {args.target}
  Sampling strategy:    {args.strategy}
  Rate limit delay:     {REQUEST_DELAY}s per request
  Random seed:          {args.seed}

Coverage:
  Cities:               {len(ALL_CITIES)} (Tier1: {len(CITIES_TIER1)}, Tier2: {len(CITIES_TIER2)}, Tier3: {len(CITIES_TIER3)})
  Months:               {len(MONTHS)}
  Concerns:             {len(CONCERNS)} (skin, hair)
  Skin types:           {len(SKIN_TYPES)}
  Hair types:           {len(HAIR_TYPES)}

⚠️  API RATE LIMITS:  
  Nominatim (geocoding):    1 request/second (STRICT)
  Open-Meteo (weather):     ~10,000/day (soft limit)
  Open-Meteo (air quality): ~10,000/day (soft limit)

⏱️  ESTIMATED TIME:  {estimated_minutes:.1f} minutes ({estimated_hours:.1f} hours)

""")
    
    # Confirm for large collections
    if args.target > 100:
        confirm = input(f"⚠️  This will take ~{estimated_minutes:.0f} minutes. Continue?  [y/N]: ")
        if confirm.lower() != 'y':
            print("❌ Cancelled.")
            return
    
    # Generate samples
    print("🎲 Generating input combinations...")
    if args.strategy == "stratified":  
        samples = generate_stratified_samples(args.target)
    else:
        samples = generate_random_samples(args.target)
    
    print(f"✅ Generated {len(samples)} unique input combinations\n")
    
    # Collect data
    start_time = datetime.now()
    success, errors = asyncio.run(sequential_collect(samples))
    end_time = datetime.now()
    
    duration = (end_time - start_time).total_seconds()
    
    print(f"\n⏱️  Total time: {duration/60:.1f} minutes ({duration:.0f} seconds)")
    print(f"⚡ Throughput: {success/duration:.2f} requests/second")
    print(f"\n✅ Data collection complete!  Check your database.\n")


if __name__ == "__main__":  
    main()