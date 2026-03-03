"""
AI Service Configuration
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # OpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
    
    # Service
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    
    # Content Generation
    MAX_TOKENS = 2000
    TEMPERATURE = 0.7

settings = Settings()
