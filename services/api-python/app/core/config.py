import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://tiaohai:tiaohai123@localhost:5432/tiaohai")
    
    # JWT
    jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret-key")
    jwt_algorithm: str = "HS256"
    jwt_expires_hours: int = 24
    
    # App
    debug: bool = True
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()
