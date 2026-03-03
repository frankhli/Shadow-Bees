"""
Content Generation API using OpenAI GPT-4
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import json

from app.core.openai_client import openai_client
from app.core.prompts import (
    TIKTOK_PROMPT, XIAOHONGSHU_PROMPT, BOOKING_PROMPT, INSTAGRAM_PROMPT,
    format_facilities, get_style_description
)

router = APIRouter()


class ContentGenerateRequest(BaseModel):
    hotel_name: str
    city: str
    facilities: Optional[Dict[str, Any]] = None
    features: Optional[str] = ""
    neighborhood: Optional[str] = ""
    platform: str  # tiktok, xiaohongshu, instagram, booking
    style: Optional[str] = "lifestyle"  # urgent, lifestyle, professional, funny
    language: Optional[str] = "en"  # en, es, fr, de, ja, zh


class ContentGenerateResponse(BaseModel):
    platform: str
    language: str
    style: str
    content: Dict[str, Any]
    raw_response: Optional[str] = None


# Fallback mock templates (used when OpenAI fails)
MOCK_TEMPLATES = {
    "tiktok": {
        "en": {
            "hook": "POV: You found a hidden gem in {city} 🏮✨",
            "script": "[Show courtyard entrance] This is {hotel_name} in {city}!\\n[Room tour] Traditional hutong vibes + modern comfort\\n[Show bathroom] Western toilet + clean rooms\\n[Staff interaction] They speak English!\\n[Neighborhood walk] 5 min to subway",
            "voiceover": "Found this amazing boutique hotel in {city}! No elevator but free luggage carry. Perfect for experiencing real China!",
            "captions": "Hidden gem in {city} 🏮 | Boutique hotel | English speaking staff",
            "hashtags": ["#{city}", "#chinatravel", "#boutiquehotel", "#hutong", "#travel"],
            "shooting_tips": ["Film courtyard at golden hour", "Show room amenities", "Capture staff interaction"],
            "music_suggestion": "Upbeat Chinese traditional instrumental mixed with modern beats"
        }
    },
    "xiaohongshu": {
        "zh": {
            "title": "🏨 {city}胡同里的隐藏宝藏酒店",
            "content": "藏在{city}胡同里的宝藏酒店！🏮\\n\\n✨ 亮点：\\n- 可接待外宾（有涉外资质）\\n- 西式马桶，外国朋友友好\\n- 免费搬行李（虽然无电梯）\\n- 5分钟到地铁站\\n- 前台英语沟通无障碍\\n\\n💰 价格：300-500/晚\\n📍 位置：{city}市中心\\n\\n#酒店种草 #{city}酒店 #入境游 #外国人来中国",
            "highlights": ["可接待外宾", "西式马桶", "免费搬行李", "英语前台"],
            "hashtags": ["#{city}酒店", "#酒店种草", "#入境游", "#外国人来中国", "#胡同生活"],
            "photo_tips": ["拍四合院天井", "房间细节", "周边胡同"],
            "target_audience": "想体验地道北京胡同文化的外国朋友"
        }
    }
}


@router.post("/generate/content", response_model=ContentGenerateResponse)
async def generate_content(request: ContentGenerateRequest):
    """
    Generate marketing content for different platforms using GPT-4
    """
    try:
        # Format facilities
        facilities_str = format_facilities(request.facilities or {})
        
        # Get style description
        tone = get_style_description(request.style, request.platform)
        
        # Select prompt template
        prompt_templates = {
            "tiktok": TIKTOK_PROMPT,
            "xiaohongshu": XIAOHONGSHU_PROMPT,
            "booking": BOOKING_PROMPT,
            "instagram": INSTAGRAM_PROMPT
        }
        
        if request.platform not in prompt_templates:
            raise HTTPException(status_code=400, detail=f"Unsupported platform: {request.platform}")
        
        prompt = prompt_templates[request.platform].format(
            hotel_name=request.hotel_name,
            city=request.city,
            facilities=facilities_str,
            features=request.features or "Traditional Chinese courtyard hotel with modern amenities",
            style=request.style,
            tone=tone,
            neighborhood=request.neighborhood or f"Traditional hutong area in {request.city}"
        )
        
        # Call OpenAI API
        messages = [
            {"role": "system", "content": "You are an expert travel content creator. Always respond with valid JSON."},
            {"role": "user", "content": prompt}
        ]
        
        content = await openai_client.generate_json(messages, temperature=0.7)
        
        return ContentGenerateResponse(
            platform=request.platform,
            language=request.language,
            style=request.style,
            content=content
        )
        
    except Exception as e:
        # Fallback to mock data if OpenAI fails
        print(f"OpenAI error, using mock data: {str(e)}")
        mock_data = get_mock_response(request)
        return ContentGenerateResponse(
            platform=request.platform,
            language=request.language,
            style=request.style,
            content=mock_data,
            raw_response=str(e)
        )


def get_mock_response(request: ContentGenerateRequest) -> Dict[str, Any]:
    """Get mock response when OpenAI fails"""
    platform = request.platform
    
    if platform == "tiktok":
        return {
            "hook": f"POV: You found a hidden gem in {request.city} 🏮✨",
            "script": f"[Show courtyard] Welcome to {request.hotel_name}!\\n[Room tour] Traditional meets modern\\n[Bathroom] Western toilet ✅\\n[Staff] English speaking!",
            "voiceover": f"Found this amazing hotel in {request.city}! Perfect for experiencing authentic China.",
            "captions": f"Hidden gem in {request.city} 🏮",
            "hashtags": [f"#{request.city.lower()}", "#chinatravel", "#boutiquehotel", "#hutong"],
            "shooting_tips": ["Film during golden hour", "Show room details", "Capture neighborhood"],
            "music_suggestion": "Upbeat traditional Chinese instrumental"
        }
    
    elif platform == "xiaohongshu":
        return {
            "title": f"🏨 {request.city}胡同里的宝藏酒店",
            "content": f"藏在{request.city}胡同里的宝藏酒店！🏮\\n\\n✨ 亮点：\\n- 可接待外宾\\n- 西式马桶\\n- 免费搬行李\\n- 英语前台\\n\\n💰 300-500/晚\\n📍 {request.city}市中心",
            "highlights": ["可接待外宾", "西式马桶", "免费搬行李", "英语前台"],
            "hashtags": [f"#{request.city}酒店", "#酒店种草", "#入境游", "#外国人来中国"],
            "photo_tips": ["拍四合院", "房间细节", "周边胡同"],
            "target_audience": "想体验地道胡同文化的外国朋友"
        }
    
    elif platform == "booking":
        return {
            "title": f"Boutique Hutong Hotel - {request.city}",
            "description": f"Located in the heart of {request.city}'s historic hutong area, our boutique hotel offers an authentic Chinese experience with modern amenities. English-speaking staff, Western-style bathrooms, free WiFi.",
            "key_selling_points": ["English-speaking staff", "Western bathroom", "Free WiFi", "Central location", "Authentic hutong experience"],
            "room_highlights": ["Traditional courtyard view", "Modern amenities", "Comfortable beds"],
            "location_description": f"Located in traditional hutong area, 5-minute walk to subway station",
            "policies_notes": ["No elevator - free luggage assistance provided", "Check-in: 2:00 PM"]
        }
    
    elif platform == "instagram":
        return {
            "caption": f"Found this hidden gem in {request.city}! 🏮✨\\n\\nAuthentic hutong experience with modern comforts. English-speaking staff ✅ Western bathroom ✅ Perfect location ✅\\n\\nWho's adding this to their China travel bucket list? 🇨🇳",
            "hashtags": [f"#{request.city.lower()}", "#chinatravel", "#boutiquehotel", "#hutong", "#travelgram", "#hotel", "#travel", "#china"],
            "alt_text": f"Boutique hotel in {request.city} traditional hutong courtyard",
            "story_prompts": ["Room tour", "Morning coffee in courtyard", "Neighborhood walk"]
        }
    
    return {"error": "Platform not supported in mock mode"}


@router.post("/generate/content/stream")
async def generate_content_stream(request: ContentGenerateRequest):
    """
    Generate content with streaming response (SSE)
    """
    async def event_generator():
        try:
            facilities_str = format_facilities(request.facilities or {})
            tone = get_style_description(request.style, request.platform)
            
            prompt_templates = {
                "tiktok": TIKTOK_PROMPT,
                "xiaohongshu": XIAOHONGSHU_PROMPT,
                "booking": BOOKING_PROMPT,
                "instagram": INSTAGRAM_PROMPT
            }
            
            prompt = prompt_templates.get(request.platform, TIKTOK_PROMPT).format(
                hotel_name=request.hotel_name,
                city=request.city,
                facilities=facilities_str,
                features=request.features or "Traditional Chinese courtyard hotel",
                style=request.style,
                tone=tone,
                neighborhood=request.neighborhood or f"Traditional hutong area"
            )
            
            messages = [
                {"role": "system", "content": "You are an expert travel content creator. Generate creative content."},
                {"role": "user", "content": prompt}
            ]
            
            # Stream the response
            async for chunk in openai_client.generate_content_stream(messages):
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
            
            yield f"data: {json.dumps({'done': True})}\n\n"
            
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
    
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )


@router.get("/templates")
async def get_templates():
    """Get supported platforms and templates"""
    return {
        "platforms": [
            {
                "id": "tiktok",
                "name": "TikTok",
                "description": "Short-form video scripts",
                "supports_streaming": True
            },
            {
                "id": "xiaohongshu", 
                "name": "小红书",
                "description": "Chinese lifestyle platform posts",
                "supports_streaming": True
            },
            {
                "id": "instagram",
                "name": "Instagram", 
                "description": "Photo captions and stories",
                "supports_streaming": True
            },
            {
                "id": "booking",
                "name": "Booking.com",
                "description": "Hotel listing optimization",
                "supports_streaming": False
            }
        ],
        "styles": [
            {"id": "urgent", "name": "Urgent/FOMO", "description": "Create urgency and scarcity"},
            {"id": "lifestyle", "name": "Lifestyle", "description": "Aspirational, experience-focused"},
            {"id": "professional", "name": "Professional", "description": "Informative, credible"},
            {"id": "funny", "name": "Funny", "description": "Humorous, relatable"}
        ],
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "es", "name": "Español"},
            {"code": "fr", "name": "Français"},
            {"code": "de", "name": "Deutsch"},
            {"code": "ja", "name": "日本語"},
            {"code": "zh", "name": "中文"}
        ]
    }


@router.post("/chat/concierge")
async def chat_concierge(request: dict):
    """
    AI Concierge chat endpoint
    """
    try:
        from app.core.prompts import CONCIERGE_PROMPT
        
        question = request.get("question", "")
        hotel_info = request.get("hotel", {})
        
        prompt = CONCIERGE_PROMPT.format(
            hotel_name=hotel_info.get("name", "our hotel"),
            city=hotel_info.get("city", "Beijing"),
            facilities=format_facilities(hotel_info.get("facilities", {})),
            policies=hotel_info.get("policies", "Check-in: 2:00 PM, Check-out: 12:00 PM"),
            question=question
        )
        
        messages = [
            {"role": "system", "content": "You are a helpful hotel concierge."},
            {"role": "user", "content": prompt}
        ]
        
        response = await openai_client.generate_content(messages, temperature=0.8)
        
        return {
            "response": response,
            "question": question,
            "type": "concierge"
        }
        
    except Exception as e:
        # Fallback responses
        fallbacks = {
            "elevator": "No, our hotel doesn't have an elevator as it's a traditional 2-story courtyard house. However, we offer FREE luggage carrying service! Rooms 101-103 are on the ground floor if you prefer.",
            "wifi": "Yes, we have free high-speed WiFi throughout the hotel. The password will be provided at check-in.",
            "toilet": "Yes! All rooms have Western-style toilets with heated seats and bidet spray.",
            "checkin": "Check-in is from 2:00 PM, but you can drop off luggage earlier. Late check-in is available with advance notice.",
            "location": "We're in the heart of the hutong area, about 5 minutes walk from the subway station."
        }
        
        question_lower = question.lower()
        for key, response in fallbacks.items():
            if key in question_lower:
                return {"response": response, "question": question, "type": "concierge"}
        
        return {
            "response": "That's a great question! Let me help you with that. Could you provide a bit more detail so I can give you the most accurate information?",
            "question": question,
            "type": "concierge"
        }
