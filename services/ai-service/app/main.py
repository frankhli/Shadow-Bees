"""
Tiaohai AI Service - Content Generation & Concierge
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import content
from app.core.config import settings

app = FastAPI(
    title="Tiaohai AI Service",
    description="AI-powered content generation and concierge service",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(content.router, prefix="/ai", tags=["content"])

@app.get("/")
async def root():
    mode = "openai" if settings.OPENAI_API_KEY else "mock"
    return {
        "name": "Tiaohai AI Service",
        "version": "1.0.0",
        "status": "running",
        "mode": mode,
        "model": settings.OPENAI_MODEL if settings.OPENAI_API_KEY else None,
        "endpoints": [
            "/ai/generate/content",
            "/ai/generate/content/stream",
            "/ai/chat/concierge",
            "/ai/templates"
        ]
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "openai_configured": bool(settings.OPENAI_API_KEY)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=5000, reload=True)
