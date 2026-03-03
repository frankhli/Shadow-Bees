from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings
from app.core.database import db
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    hotel_name: str

@router.post("/login")
async def login(req: LoginRequest):
    # Mock login for now - just check email exists
    user = db.query_one(
        "SELECT id, email, role FROM users WHERE email = %s",
        (req.email,)
    )
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create JWT
    token = jwt.encode(
        {
            "sub": str(user["id"]),
            "email": user["email"],
            "role": user["role"],
            "exp": datetime.utcnow() + timedelta(hours=settings.jwt_expires_hours)
        },
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["id"]),
            "email": user["email"],
            "role": user["role"]
        }
    }

@router.post("/register")
async def register(req: RegisterRequest):
    # Check if email exists
    existing = db.query_one(
        "SELECT id FROM users WHERE email = %s",
        (req.email,)
    )
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user (mock password hash for now)
    hashed = pwd_context.hash(req.password)
    
    user_result = db.execute(
        """INSERT INTO users (email, password, role) 
           VALUES (%s, %s, 'HOTEL_OWNER') RETURNING id""",
        (req.email, hashed)
    )
    
    # Get the created user
    user = db.query_one(
        "SELECT id FROM users WHERE email = %s",
        (req.email,)
    )
    
    # Create hotel
    db.execute(
        """INSERT INTO hotels (user_id, name, city, address, status)
           VALUES (%s, %s, 'Beijing', 'TBD', 'PENDING')""",
        (user["id"], req.hotel_name)
    )
    
    return {
        "message": "Registration successful",
        "user_id": str(user["id"])
    }
