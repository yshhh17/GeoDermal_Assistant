# GeoDermal Mobile (React Native + Expo)

This app is a mobile client for GeoDermal that reuses the existing backend in `backend/`.

## Features

- Same core flow as web:
  - Home
  - Analyze (city selection, skin/hair type quiz, duration)
  - Results (environment data, risk scores, recommendations)
  - About, How it works, Contact, Privacy
- Animated transitions and interactive cards/buttons
- Calls existing backend endpoint: `POST /api/analyze`

## Setup

1. Install dependencies:

```bash
cd mobile
npm install
```

2. Configure backend URL:

```bash
cp .env.example .env
```

Set:

```env
EXPO_PUBLIC_API_URL=http://<your-machine-ip>:8000
```

Use your machine LAN IP for physical devices (not `localhost`).

3. Run backend (from project root, if not already running):

```bash
cd backend
# run your existing backend as you already do (uvicorn/docker-compose)
```

4. Start mobile app:

```bash
cd mobile
npm run start
```

Then open in Expo Go (Android/iOS) or emulator.

## Notes

- No backend duplication is created; all operations use your existing backend folder.
- Keep secrets in backend `.env` only. Do not place API keys in mobile env.
