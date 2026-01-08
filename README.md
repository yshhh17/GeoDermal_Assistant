# GeoDermal Assistant

AI-powered environmental analysis for travelers.  Get personalized skin and hair care recommendations based on your destination's climate, air quality, and water conditions.

**Live App:** https://geo-dermal-assistant.vercel.app/

## Overview

GeoDermal Assistant analyzes environmental factors at your travel destination and provides: 
- Risk scores (1-10 scale) for skin/hair conditions
- Personalized product recommendations
- AI-powered analysis using real-time environmental data
- Tailored advice based on trip duration and personal care type

## Tech Stack

### Frontend
- React 18 + Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Deployed on Vercel

### Backend
- FastAPI + Python 3.9+
- PostgreSQL with SQLAlchemy ORM
- Groq LLM for AI analysis
- Rate limiting with SlowAPI
- Deployed on Render

### External APIs
- Open-Meteo (weather & UV data)
- OpenAQ (air quality data)
- Custom water quality dataset for 30+ Indian cities

## Quick Start

### Using Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/yshhh17/GeoDermal_Assistant.git
cd GeoDermal_Assistant

# Create .env file
cp .env.example .env
# Edit .env with your GROQ_API_KEY and database credentials

# Start all services
docker-compose up --build

# Run migrations
docker-compose exec backend alembic upgrade head

```

### Access:

    Frontend: http://localhost:3000
    Backend API: http://localhost:8000
    API Docs: http://localhost:8000/docs

## Manual Setup

### Backend
- cd backend
- python -m venv .venv
- source .venv/bin/activate  # Windows: .venv\Scripts\activate
- pip install -r requirements.txt

### Configure .env file
- cp .env.example.env
### Add your GROQ_API_KEY and DATABASE_URL

### Run migrations
- alembic upgrade head

### Start server
- uvicorn app.main:app --reload --port 8000

### Frontend
- cd frontend
- npm install

### Configure environment
- echo "VITE_API_URL=http://localhost:8000" > .env

### Start dev server
- npm run dev

## API Usage
- Analyze Destination

- POST /api/analyze
```bash

curl -X POST "https://your-api-url.com/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Mumbai",
    "home_city":  "Delhi",
    "duration_category": "2-7d",
    "month_or_season": "December",
    "concern": "skin",
    "skin_type": "dry"
  }'

```
### Parameters:
  - destination (required): City to analyze
  - home_city (required): Your current city
  - duration_category (required): "<48h", "2-7d", "1-4w", or "relocation"
  - month_or_season (required): Travel time (e.g., "December", "Summer")
  - concern (required): "skin" or "hair"
  - skin_type (optional): "dry", "oily", "normal", "combination", "sensitive"
  - hair_type (optional): "straight", "wavy", "curly", "coily"



### Response includes:
   - Environmental data (temperature, humidity, UV, AQI, PM2.5)
   - Risk scores for specific conditions
   - Personalized recommendations
   - Confidence level

### Other Endpoints
  - GET /api/health - Check API status
  - GET /api/stats - View usage statistics
  - GET /docs - Interactive API documentatio

## Rate Limits
  - Analysis endpoint: 10 requests/hour per IP
  - Statistics endpoint: 30 requests/hour per IP

### Rate limit headers included in responses:

    X-RateLimit-Limit
    X-RateLimit-Remaining
    X-RateLimit-Reset

## Project Structure
```GeoDermal_Assistant/
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/endpoints/    # Route handlers
│   │   ├── core/             # Rate limiting, config
│   │   ├── db/               # Database setup
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic & API clients
│   │   └── main.py           # FastAPI app
│   ├── requirements. txt
│   └── . env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── data/                     # Water quality dataset
├── docker-compose.yml
└── README. md
```

## Key Features
  - Multi-step analysis flow
  - Real-time environmental data display
  - Interactive risk score visualization
  - Responsive design (mobile, tablet, desktop)
  - Client-side routing with React Router
  - Error handling and loading states

## API Integration
- The app communicates with the backend via src/services/api.js:
```
import api from './services/api';

// Analyze destination
const response = await api.post('/api/analyze', {
  destination: 'Mumbai',
  home_city: 'Delhi',
  duration_category: '2-7d',
  month_or_season: 'December',
  concern: 'skin',
  skin_type: 'dry'
});
```

## Deployment
### Vercel (Automatic)
 - Connect GitHub repository to Vercel
 - Set environment variable: VITE_API_URL
 - Deploy automatically on push to main

## Pages

  - / - Landing page with hero and features
  - /analyze - Multi-step analysis flow
  - /results - Display analysis results
  -  /about - About the project
   - /how-it-works - Detailed explanation
   - /privacy - Privacy policy
   - /contact - Contact form

## Contributing

  -Fork the repository
   - Create a feature branch
   - Make your changes
   - Test thoroughly
   - Submit a pull request

## License

- MIT License
- Contact

### Author: Yash Tiwari
- Email: yshhh173@gmail.com
- GitHub: @yshhh17

