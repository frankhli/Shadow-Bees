#!/bin/bash
cd "$(dirname "$0")"
export PATH="$HOME/.local/bin:$PATH"
source venv/bin/activate 2>/dev/null || echo "No venv, using system Python"
python -m uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
