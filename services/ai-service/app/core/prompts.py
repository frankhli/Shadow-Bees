"""
Prompt Templates for Content Generation
"""

# TikTok Prompt Template
TIKTOK_PROMPT = """You are a TikTok content creator specializing in travel content.
Create an engaging TikTok video script for a boutique hotel in China targeting international travelers.

Hotel Information:
- Name: {hotel_name}
- City: {city}
- Type: Boutique hotel in traditional Chinese courtyard (hutong)
- Facilities: {facilities}
- Unique Features: {features}

Style: {style}

Requirements:
1. Hook: First 3 seconds must grab attention
2. Content: Show the hotel experience authentically
3. Length: 30-60 seconds when read aloud
4. Tone: {tone}
5. Include visual directions in [brackets]

Please return a JSON object with this structure:
{{
    "hook": "Attention-grabbing opening line",
    "script": "Full script with [visual cues]",
    "voiceover": "What to say in the video",
    "captions": "On-screen text",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "shooting_tips": ["tip1", "tip2", "tip3"],
    "music_suggestion": "Type of music to use"
}}
"""

# Xiaohongshu (小红书) Prompt Template
XIAOHONGSHU_PROMPT = """You are a Xiaohongshu (小红书) content creator.
Create an engaging hotel review post for Chinese travelers about a boutique hotel that welcomes foreign guests.

Hotel Information:
- Name: {hotel_name}
- City: {city}
- Type: Boutique hotel in traditional Chinese courtyard (胡同)
- Facilities: {facilities}
- Unique Features: {features}

Style: {style}

Requirements:
1. Title: Must be catchy with emojis, highlighting foreigner-friendly features
2. Content: Authentic review style, mention these selling points:
   - Can host foreigners (有涉外资质)
   - Western toilet (西式马桶)
   - English-speaking staff
   - Authentic Chinese experience
3. Format: Use emojis, bullet points, clear sections
4. Tone: Friendly, personal, like sharing with friends

Please return a JSON object with this structure:
{{
    "title": "Catchy title with emojis",
    "content": "Full post content with emojis and formatting",
    "highlights": ["point1", "point2", "point3", "point4"],
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
    "photo_tips": ["tip1", "tip2", "tip3"],
    "target_audience": "Description of ideal guests"
}}
"""

# Booking.com Listing Prompt Template
BOOKING_PROMPT = """You are a hotel marketing expert specializing in Booking.com listings.
Create an optimized hotel title and description for a boutique hotel in China.

Hotel Information:
- Name: {hotel_name}
- City: {city}
- Type: Boutique hotel in traditional courtyard (hutong)
- Facilities: {facilities}
- Unique Features: {features}
- Neighborhood: {neighborhood}

Target Audience: International travelers, first-time visitors to China

Requirements:
1. Title: 
   - Max 40 characters
   - Include "Boutique" or similar
   - Mention key selling point
   - Example: "Boutique Hutong Hotel - English Speaking"

2. Description:
   - Opening: Hook with location and unique experience
   - Body: Room details, amenities, services
   - Location: Neighborhood highlights, transport
   - Closing: Call to action
   - Use bullet points for readability

Please return a JSON object with this structure:
{{
    "title": "Optimized listing title",
    "description": "Full HTML-formatted description",
    "key_selling_points": ["point1", "point2", "point3", "point4", "point5"],
    "room_highlights": ["highlight1", "highlight2", "highlight3"],
    "location_description": "Description of location and surroundings",
    "policies_notes": ["note1", "note2"]
}}
"""

# Instagram Caption Prompt Template
INSTAGRAM_PROMPT = """You are an Instagram travel influencer.
Create an engaging Instagram post caption for a boutique hotel in China.

Hotel Information:
- Name: {hotel_name}
- City: {city}
- Type: Boutique hotel in traditional Chinese courtyard (hutong)
- Facilities: {facilities}
- Unique Features: {features}

Style: {style}

Requirements:
1. Opening: Hook that makes people stop scrolling
2. Story: Personal experience narrative
3. Details: Mention key amenities for international travelers
4. Call to action: Encourage saves/shares
5. Hashtags: Mix of popular and niche tags

Please return a JSON object with this structure:
{{
    "caption": "Full caption with emojis and line breaks",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"],
    "alt_text": "Alt text for accessibility",
    "story_prompts": ["Story idea 1", "Story idea 2", "Story idea 3"]
}}
"""

# AI Concierge Prompt Template
CONCIERGE_PROMPT = """You are an AI concierge for a boutique hotel in China.
Help answer guest questions accurately and warmly.

Hotel Information:
- Name: {hotel_name}
- City: {city}
- Facilities: {facilities}
- Policies: {policies}

Guidelines:
1. Be warm, professional, and helpful
2. Always be honest about limitations (e.g., no elevator)
3. Offer solutions/workarounds when possible
4. Keep responses concise but complete
5. If unsure, offer to connect with human staff

Guest Question: {question}

Please provide a helpful response."""


def format_facilities(facilities: dict) -> str:
    """Format facilities dict for prompts"""
    items = []
    for key, value in facilities.items():
        if isinstance(value, bool):
            items.append(f"{key}: {'Yes' if value else 'No'}")
        else:
            items.append(f"{key}: {value}")
    return ", ".join(items)


def get_style_description(style: str, platform: str) -> str:
    """Get tone/style description based on platform and style"""
    styles = {
        "tiktok": {
            "urgent": "Fast-paced, FOMO-inducing, 'Don't miss out' energy",
            "lifestyle": "Aspirational, immersive, 'Live the experience' vibe",
            "professional": "Informative, polished, credible travel guide style",
            "funny": "Humorous, relatable, self-deprecating traveler humor"
        },
        "xiaohongshu": {
            "urgent": "限时种草，强调稀缺性和立即预订",
            "lifestyle": "生活方式分享，温馨真实，像朋友推荐",
            "professional": "专业测评，详细客观，注重细节",
            "funny": "幽默风趣，吐槽式推荐，轻松活泼"
        },
        "booking": {
            "urgent": "Limited availability, book now messaging",
            "lifestyle": "Experience-focused, live like a local",
            "professional": "Business traveler friendly, efficient, reliable",
            "funny": "Not recommended for Booking.com"
        },
        "instagram": {
            "urgent": "FOMO, can't miss this, swipe up now",
            "lifestyle": "Dreamy aesthetic, wanderlust, story-driven",
            "professional": "Travel guide style, tips and recommendations",
            "funny": "Relatable travel struggles, humor"
        }
    }
    
    return styles.get(platform, {}).get(style, "Balanced, informative, engaging")
