# GeoDermal Assistant 🌍

AI-powered environmental analysis for travelers. Get personalized skin and hair care recommendations based on your destination's climate, air quality, and water conditions.

## 📊 Current Status

✅ **Backend MVP**: Complete and production-ready  
🚧 **Frontend**: In development (React multi-page app)  
⏳ **Authentication**: Planned for v2.0  
⏳ **Deployment**: Ready to deploy  

## What It Does

GeoDermal API analyzes environmental factors at your travel destination and provides:
- **Risk Scores** (1-10 scale) for skin conditions like dryness, acne, UV damage, or hair concerns like hairfall and dandruff
- **Personalized Recommendations** tailored to your skin/hair type and trip duration
- **AI-Powered Analysis** using Groq LLM for intelligent risk assessment
- **Real-time Data** from multiple environmental APIs

Perfect for travelers who want to prepare their skincare/haircare routine before visiting a new destination.

## Tech Stack

- **Backend Framework**: FastAPI + Python 3.9+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **AI/LLM**: Groq API (default model: openai/gpt-oss-20b, configurable)
- **Rate Limiting**: SlowAPI with in-memory storage (production-ready)
- **External APIs**:
  - Open-Meteo (weather & UV data)
  - OpenAQ (air quality data)
  - OpenStreetMap Nominatim (geocoding)
- **Data Sources**: Custom water quality dataset for major cities

## Setup Instructions

### Prerequisites
- Python 3.9 or higher
- PostgreSQL database
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yshhh17/GeoDermal_Assistant.git
   cd GeoDermal_Assistant
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   Key dependencies include:
   - FastAPI - Web framework
   - SQLAlchemy - Database ORM
   - SlowAPI - Rate limiting
   - Groq SDK - LLM integration
   - Pydantic Settings - Configuration management
   - PostgreSQL drivers (psycopg2)

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your values:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/geodermal
   GROQ_API_KEY=your_groq_api_key_here
   SOURCE_VERSION=1.0.0
   ```

5. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the development server**
   
   From the repository root:
   ```bash
   uvicorn backend.app.main:app --reload --port 8000
   ```

7. **Verify the installation**
   - API Health: http://localhost:8000/api/health
   - Interactive Docs: http://localhost:8000/docs
   - Welcome Page: http://localhost:8000

## API Endpoints

### Main Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Get environmental analysis and personalized recommendations (⚠️ Rate limited: 10 requests/hour per IP) |
| `GET` | `/api/health` | Check API health and service status |
| `GET` | `/api/stats` | View usage statistics and API analytics (Rate limited: 30 requests/hour per IP) |
| `GET` | `/` | Welcome message and API information |
| `GET` | `/docs` | Interactive API documentation (Swagger UI) |

### Example Request

**Analyze a destination for skin care:**

```bash
curl -X POST "http://localhost:8000/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Mumbai",
    "home_city": "Delhi",
    "duration_category": "2-7d",
    "month_or_season": "December",
    "concern": "skin",
    "skin_type": "dry"
  }'
```

**Example Response:**
```json
{
  "request": {
    "destination": "Mumbai",
    "home_city": "Delhi",
    "duration_category": "2-7d",
    "month_or_season": "December",
    "concern": "skin",
    "skin_type": "dry"
  },
  "env_report": {
    "coords": {
      "lat": 19.0760,
      "lon": 72.8777,
      "display_name": "Mumbai, Maharashtra, India"
    },
    "temperature_c": 28.5,
    "humidity": 65,
    "uv_index": 7,
    "aqi": 156,
    "pm25": 89.3
  },
  "risks": {
    "dryness": 6,
    "acne": 7,
    "irritation": 5,
    "uv_damage": 8,
    "pigmentation": 6
  },
  "recommendations": [
    "Use a hydrating moisturizer with hyaluronic acid",
    "Apply broad-spectrum SPF 50+ sunscreen every 2-3 hours",
    "Use a gentle, non-foaming cleanser twice daily",
    "Consider an antioxidant serum with vitamin C",
    "Avoid heavy makeup to prevent pore clogging",
    "Keep blotting papers for excess oil control",
    "Stay in shade during peak sun hours (10 AM - 4 PM)",
    "Drink at least 2-3 liters of water daily"
  ],
  "explanations": {
    "why": [
      "High UV index and pollution levels increase skin damage risk",
      "Moderate humidity with high temperatures can cause oil production",
      "Air quality concerns require protective skincare routine"
    ]
  },
  "confidence": "high"
}
```

**Request Parameters:**

- `destination` (required): City name to analyze
- `home_city` (required): Your home city for reference
- `duration_category` (required): Trip length - `"<48h"`, `"2-7d"`, `"1-4w"`, or `"relocation"`
- `month_or_season` (required): When you're traveling (e.g., "December", "Summer")
- `concern` (required): Either `"skin"` or `"hair"`
- `skin_type` (optional): `"dry"`, `"oily"`, `"normal"`, `"combination"`, or `"sensitive"`
- `hair_type` (optional): `"straight"`, `"wavy"`, `"curly"`, or `"coily"`

## Project Structure

```
GeoDermal_Assistant/
├── backend/
│   ├── alembic/              # Database migrations
│   │   └── versions/         # Migration scripts
│   ├── app/
│   │   ├── api/
│   │   │   └── endpoints/    # API route handlers
│   │   │       ├── analyze.py    # Main analysis endpoint
│   │   │       ├── health.py     # Health check endpoint
│   │   │       ├── stats.py      # Statistics endpoint
│   │   │       └── root.py       # Root/welcome endpoint
│   │   ├── core/             # Core application features
│   │   │   └── rate_limiter.py   # Rate limiting configuration
│   │   ├── db/               # Database configuration
│   │   │   ├── session.py    # DB session management
│   │   │   └── base.py       # Base model class
│   │   ├── models/           # SQLAlchemy models
│   │   │   └── report.py     # Report model for storing analyses
│   │   ├── schemas/          # Pydantic schemas
│   │   │   └── inputs.py     # Request/response schemas
│   │   ├── services/         # Business logic
│   │   │   ├── clients/      # External API clients
│   │   │   │   ├── open_meteo.py   # Weather API client
│   │   │   │   ├── openaq.py       # Air quality API client
│   │   │   │   └── water_quality.py # Water data lookup
│   │   │   ├── aqi_calculator.py   # AQI calculation logic
│   │   │   ├── data_quality.py     # Data validation
│   │   │   ├── geocode.py          # Geocoding service
│   │   │   └── llm_service.py      # Groq LLM integration
│   │   ├── config.py         # Application configuration
│   │   └── main.py           # FastAPI app entry point
│   ├── requirements.txt      # Python dependencies
│   ├── alembic.ini          # Alembic configuration
│   └── .env.example         # Environment variables template
├── data/                     # Data files (water quality dataset)
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Environment Variables

The application uses centralized configuration management through Pydantic Settings for type-safe, validated configuration.

See `backend/.env.example` for a complete list of required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `GROQ_API_KEY`: API key from Groq (free tier available)
- `SOURCE_VERSION`: Application version for tracking
- `GROQ_MODEL` (optional): LLM model to use (defaults to "openai/gpt-oss-20b")

**Configuration Features:**
- Uses centralized `settings` configuration (not direct `os.getenv`)
- All API keys managed through Pydantic Settings for validation
- Type-safe configuration with automatic environment variable loading

## 🛡️ API Protection

The API includes built-in protection against abuse:

- **Rate Limiting**: 10 requests/hour per IP on analysis endpoint, 30 requests/hour on stats endpoint
- **Intelligent Error Handling**: Graceful fallbacks for external API failures
- **Data Validation**: Pydantic schemas ensure request data integrity
- **CORS Configuration**: Controlled cross-origin access

Rate limit headers in every response:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Unix timestamp when limit resets

### Testing Rate Limits

To test the rate limiting:

```bash
# Make 11 requests quickly - the 11th should be rate limited
for i in {1..11}; do
  curl -X POST http://localhost:8000/api/analyze \
    -H "Content-Type: application/json" \
    -d '{"destination": "Delhi", "concern": "skin", "skin_type": "dry", "duration_category": "2-7d", "month_or_season": "June"}'
  echo "Request $i"
done
```

Expected response after exceeding limit:
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later."
}
```

## Development

### Running Tests
```bash
# Coming soon - test suite in development
```

### Database Migrations
```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback last migration
alembic downgrade -1
```

### API Documentation
Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Features

✅ Real-time environmental data fetching  
✅ AI-powered risk assessment with Groq LLM  
✅ Personalized recommendations based on user profile  
✅ Support for multiple skin and hair types  
✅ Water quality data for major cities  
✅ Data quality validation and confidence scoring  
✅ Statistics tracking and analytics  
✅ RESTful API with comprehensive documentation  
✅ Rate limiting protection against API abuse  
✅ Type-safe configuration with Pydantic Settings  

## Contributing

This is an MVP project. Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - see LICENSE file for details

## Contact

- **Author**: Yash Tiwari
- **Email**: yshhh173@gmail.com
- **GitHub**: [@yshhh17](https://github.com/yshhh17)