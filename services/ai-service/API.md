# Tiaohai AI Service API Documentation

## Base URL
```
http://localhost:5000
```

## Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "healthy",
  "openai_configured": true
}
```

### Get Templates
```
GET /ai/templates
```

Returns available platforms, styles, and languages.

### Generate Content
```
POST /ai/generate/content
```

Generate marketing content for various platforms.

**Request Body:**
```json
{
  "hotel_name": "Hutong Boutique Hotel",
  "city": "Beijing",
  "facilities": {
    "elevator": false,
    "wifi": true,
    "western_toilet": true,
    "english_staff": true
  },
  "features": "Traditional courtyard with modern amenities",
  "neighborhood": "Historic hutong area, 5min to subway",
  "platform": "tiktok",
  "style": "lifestyle",
  "language": "en"
}
```

**Platforms:**
- `tiktok` - TikTok video scripts
- `xiaohongshu` - 小红书 posts
- `instagram` - Instagram captions
- `booking` - Booking.com listings

**Styles:**
- `urgent` - FOMO, scarcity
- `lifestyle` - Aspirational
- `professional` - Informative
- `funny` - Humorous

**Response (TikTok):**
```json
{
  "platform": "tiktok",
  "language": "en",
  "style": "lifestyle",
  "content": {
    "hook": "POV: You found a hidden gem in Beijing 🏮✨",
    "script": "[Show courtyard] Welcome to Hutong Boutique Hotel!...",
    "voiceover": "Found this amazing hotel in Beijing!...",
    "captions": "Hidden gem in Beijing 🏮",
    "hashtags": ["#beijing", "#chinatravel", "#boutiquehotel"],
    "shooting_tips": ["Film during golden hour", "Show room details"],
    "music_suggestion": "Upbeat traditional Chinese instrumental"
  }
}
```

**Response (Xiaohongshu):**
```json
{
  "platform": "xiaohongshu",
  "language": "zh",
  "style": "lifestyle",
  "content": {
    "title": "🏨 北京胡同里的宝藏酒店",
    "content": "藏在北京胡同里的宝藏酒店！🏮\\n\\n✨ 亮点：...",
    "highlights": ["可接待外宾", "西式马桶", "免费搬行李"],
    "hashtags": ["#北京酒店", "#酒店种草", "#入境游"],
    "photo_tips": ["拍四合院", "房间细节"],
    "target_audience": "想体验地道胡同文化的外国朋友"
  }
}
```

**Response (Booking.com):**
```json
{
  "platform": "booking",
  "language": "en",
  "style": "professional",
  "content": {
    "title": "Boutique Hutong Hotel - Beijing",
    "description": "Located in the heart of Beijing's historic hutong area...",
    "key_selling_points": ["English-speaking staff", "Western bathroom"],
    "room_highlights": ["Traditional courtyard view", "Modern amenities"],
    "location_description": "Located in traditional hutong area...",
    "policies_notes": ["No elevator - free luggage assistance"]
  }
}
```

### Generate Content (Streaming)
```
POST /ai/generate/content/stream
```

Same request body as above, but returns Server-Sent Events (SSE) stream.

**Example:**
```bash
curl -N -X POST http://localhost:5000/ai/generate/content/stream \
  -H "Content-Type: application/json" \
  -d '{
    "hotel_name": "Test Hotel",
    "city": "Beijing",
    "platform": "tiktok",
    "style": "lifestyle"
  }'
```

### AI Concierge Chat
```
POST /ai/chat/concierge
```

Chat with AI concierge for hotel questions.

**Request Body:**
```json
{
  "question": "Do you have elevator?",
  "hotel": {
    "name": "Hutong Boutique Hotel",
    "city": "Beijing",
    "facilities": {
      "elevator": false,
      "wifi": true,
      "western_toilet": true
    },
    "policies": "Check-in: 2:00 PM"
  }
}
```

**Response:**
```json
{
  "response": "No, our hotel doesn't have an elevator...",
  "question": "Do you have elevator?",
  "type": "concierge"
}
```

## Error Handling

If OpenAI API fails, the service automatically falls back to mock templates.

```json
{
  "platform": "tiktok",
  "language": "en",
  "content": { ... },
  "raw_response": "OpenAI API error: ..."
}
```

## Environment Variables

```bash
# Required for OpenAI
OPENAI_API_KEY=sk-your-key-here

# Optional
OPENAI_MODEL=gpt-4o-mini  # or gpt-4o
DEBUG=false
```
