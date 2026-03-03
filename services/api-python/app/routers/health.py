from fastapi import APIRouter, HTTPException
from app.core.database import db

router = APIRouter()

@router.get("/health")
async def health_check():
    try:
        # Test database connection
        result = db.query_one("SELECT 1 as connected")
        return {
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
