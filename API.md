# Tiaohai Global API Documentation

Base URL: `http://localhost:3001/api/v1`

---

## 🔐 Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "GUEST"
  }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "GUEST"
}
```

---

## 🏨 Hotels

### List Hotels
```http
GET /hotels?city=Beijing&page=1
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Hutong Boutique Hotel",
      "nameEn": "Hutong Boutique Hotel",
      "city": "Beijing",
      "address": "东城区南锣鼓巷12号",
      "facilities": { "elevator": false, "wifi": true },
      "basePrice": 450,
      "roomTypes": [...]
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  }
}
```

### Get Hotel Details
```http
GET /hotels/:id
```

### Create Hotel (Protected)
```http
POST /hotels
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Hotel Name",
  "nameEn": "English Name",
  "city": "Beijing",
  "address": "Full address",
  "licenseNo": "京特旅字第20240001号",
  "facilities": { "elevator": true, "wifi": true },
  "basePrice": 450
}
```

---

## 📦 Orders

### Create Order
```http
POST /orders
Content-Type: application/json

{
  "guestId": "uuid",
  "guestNationality": "US",
  "orderType": "ACCOMMODATION_ONLY",
  "hotelId": "uuid",
  "roomTypeId": "uuid",
  "checkIn": "2024-03-15",
  "checkOut": "2024-03-17",
  "nights": 2,
  "roomPriceTotal": 170,
  "currency": "USD"
}
```

**Response:**
```json
{
  "id": "uuid",
  "orderNo": "TH202403150001",
  "totalAmount": 170,
  "platformFee": 25.5,
  "paymentStatus": "PENDING",
  "status": "CONFIRMED"
}
```

### List Orders (Protected)
```http
GET /orders?hotelId=uuid&status=CONFIRMED
Authorization: Bearer {token}
```

### Get Order Details (Protected)
```http
GET /orders/:id
Authorization: Bearer {token}
```

### Cancel Order (Protected)
```http
POST /orders/:id/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Guest request"
}
```

---

## 💳 Payments

### Create Payment Intent (Protected)
```http
POST /payments/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "uuid"
}
```

**Response:**
```json
{
  "clientSecret": "pi_123456_secret_789",
  "paymentIntentId": "pi_123456"
}
```

### Confirm Payment (Protected)
```http
POST /payments/confirm
Authorization: Bearer {token}
Content-Type: application/json

{
  "paymentIntentId": "pi_123456"
}
```

### Refund Payment (Protected)
```http
POST /payments/refund
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "uuid",
  "amount": 50  // Optional: partial refund
}
```

### Stripe Webhook
```http
POST /payments/webhook
Stripe-Signature: {signature}

{...stripe webhook payload...}
```

---

## 📦 Inventory

### Get Availability (Protected)
```http
GET /inventory/:hotelId?roomTypeId=uuid&startDate=2024-03-01&endDate=2024-03-31
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "date": "2024-03-01",
    "ota": 3,
    "direct": 2,
    "lastSynced": "2024-02-25T10:30:00Z"
  }
]
```

### Update Inventory (Protected)
```http
POST /inventory/:hotelId/update
Authorization: Bearer {token}
Content-Type: application/json

{
  "roomTypeId": "uuid",
  "date": "2024-03-15",
  "availability": { "ota": 3, "direct": 2 }
}
```

### Get Sync History (Protected)
```http
GET /inventory/:hotelId/sync-history?limit=50
Authorization: Bearer {token}
```

---

## 🤖 AI Service

Base URL: `http://localhost:3002/api/v1/ai`

### Chat (HTTP)
```http
POST /api/v1/ai/chat
Content-Type: application/json

{
  "message": "Is there an elevator?",
  "sessionId": "session_123",
  "guestId": "uuid",
  "hotelId": "uuid",
  "language": "en"
}
```

**Response:**
```json
{
  "response": "Our hotel is a traditional building without an elevator. However, we offer 24/7 luggage assistance...",
  "intent": "facility",
  "confidenceScore": 0.95,
  "escalatedToHuman": false,
  "sources": ["Hotel Facilities Doc"]
}
```

### Chat (WebSocket)
```javascript
const ws = new WebSocket('ws://localhost:3002/api/v1/ai/chat/stream')

ws.onopen = () => {
  ws.send(JSON.stringify({
    text: "Is there an elevator?",
    sessionId: "session_123",
    hotelId: "uuid",
    language: "en"
  }))
}

ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // data.type: 'chunk' | 'done' | 'error'
  // data.content: string (for chunks)
}
```

### Get Conversation History
```http
GET /api/v1/ai/conversations/:sessionId
```

### Get Pending Escalations
```http
GET /api/v1/ai/escalations
```

### Human Takeover
```http
POST /api/v1/ai/takeover/:sessionId
Content-Type: application/json

{
  "agentId": "agent_uuid"
}
```

---

## 🔗 Webhooks

### Cloudbeds Webhook
```http
POST /api/v1/webhooks/cloudbeds
X-Cloudbeds-Signature: {signature}

{
  "event_type": "reservation_created",
  "property_id": "12345",
  "reservation": {...}
}
```

### Generic PMS Webhook
```http
POST /api/v1/webhooks/pms/:provider

{...provider specific payload...}
```

---

## 🎯 Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Server Error |

---

## 🔒 Authentication Header

All protected endpoints require:
```
Authorization: Bearer {access_token}
```

---

## 📊 Rate Limits

- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- AI endpoints: 60 requests/minute

---

## 🌍 Environments

| Environment | URL |
|-------------|-----|
| Local | http://localhost:3001/api/v1 |
| Staging | https://api-staging.tiaohai.com/api/v1 |
| Production | https://api.tiaohai.com/api/v1 |
