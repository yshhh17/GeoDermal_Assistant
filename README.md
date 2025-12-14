# GEODermal - Day 1 Bootstrap

Run dev server:
1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate
4. pip install -r requirements.txt
5. from repo root: uvicorn backend.app.main:app --reload --port 8000

Docs: http://127.0.0.1:8000/docs
Health: http://127.0.0.1:8000/health