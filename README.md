# GeoDermal

AI-powered environmental risk analysis for travelers, with skin and hair care guidance based on destination weather, air quality, and water quality.

Live web app: https://geo-dermal-assistant.vercel.app/

## What it does

- Collects destination environmental signals (temperature, humidity, UV, AQI/PM2.5, water quality)
- Scores potential skin/hair risks using an LLM-backed analysis flow
- Returns tailored recommendations based on user profile and trip duration
- Persists reports for usage statistics and trend analysis

## Monorepo apps

- `backend/` — FastAPI + SQLAlchemy + Alembic + PostgreSQL
- `frontend/` — React + Vite web client
- `mobile/` — React Native (Expo) mobile client

## Tech stack

- Backend: FastAPI, SQLAlchemy, Alembic, PostgreSQL, SlowAPI
- Frontend: React, Vite, Tailwind CSS, Axios
- Mobile: Expo, React Native, Axios
- External data: Open-Meteo APIs + local water-quality dataset

## Quick start (Docker)

### 1) Create root `.env`

In the project root, create `.env` (used by `docker-compose.yml`):

```env
DB_PASSWORD=change_me
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
SOURCE_VERSION=1.0.0
OPEN_METEO_BASE=https://api.open-meteo.com/v1
OPENAQ_BASE=https://air-quality-api.open-meteo.com/v1
GEOCODE_BASE_URL=https://nominatim.openstreetmap.org
HTTP_TIMEOUT=10
APP_NAME=GeoDermal API
```

### 2) Create backend `.env`

```bash
cp backend/.env.example backend/.env
```

Then ensure `backend/.env` includes:

```env
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql+psycopg2://geodermal:<DB_PASSWORD>@db:5432/geodermal
GROQ_API_KEY=your_groq_api_key
SOURCE_VERSION=1.0.0
```

### 3) Start services

```bash
docker compose up --build
```

### 4) Run migrations

```bash
docker compose exec backend alembic upgrade head
```

### Access

- Web: http://localhost:3000
- API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Manual local setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Update `.env` with at least:

```env
DATABASE_URL=postgresql+psycopg2://<user>:<password>@localhost:5432/geodermal
GROQ_API_KEY=your_groq_api_key
SOURCE_VERSION=1.0.0
FRONTEND_URL=http://localhost:5173
```

Run migrations and start API:

```bash
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Frontend (web)

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
```

### Mobile (Expo)

```bash
cd mobile
npm install
cp .env.example .env
```

Set `EXPO_PUBLIC_API_URL` in `mobile/.env`, then start:

```bash
npm run start
```

For physical devices, use your machine LAN IP (not `localhost`).

## API

### `POST /api/analyze`

Request body:

```json
{
  "destination": "Mumbai",
  "home_city": "Delhi",
  "duration_category": "2-7d",
  "month_or_season": "December",
  "concern": "skin",
  "skin_type": "dry"
}
```

Allowed enum fields:

- `duration_category`: `<48h`, `2-7d`, `1-4w`, `relocation`
- `concern`: `skin` or `hair`
- `skin_type` (optional): `dry`, `oily`, `normal`, `combination`, `sensitive`
- `hair_type` (optional): `straight`, `wavy`, `curly`, `coily`

Example:

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

### Other endpoints

- `GET /api/health` — service health and dependency status
- `GET /api/stats` — aggregate usage statistics
- `GET /docs` — Swagger UI

### Rate limits

- `POST /api/analyze`: `10/hour` per IP
- `GET /api/stats`: `30/hour` per IP

## Project structure

```text
GeoDermal/
├── backend/
│   ├── alembic/
│   ├── app/
│   │   ├── api/endpoints/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   └── package.json
├── mobile/
│   ├── src/
│   └── package.json
├── data/
├── docker-compose.yml
└── README.md
```

## License

MIT

