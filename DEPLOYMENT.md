# Tiaohai Global - Deployment Guide

> 💡 **本地开发？** 查看 [START.md](./START.md) 一键启动指南

## 🚀 Deployment Overview

### Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vercel    │────▶│   Railway   │────▶│  AWS RDS    │
│  (Next.js)  │     │  (NestJS)   │     │(PostgreSQL) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Edge Network        Redis Cache         S3 Storage
```

---

## 📋 Prerequisites

- Vercel account
- Railway account (or Render/ Fly.io)
- AWS account (for RDS and S3)
- Stripe account (Live mode)
- OpenAI API key
- Pinecone account (optional, for RAG)
- Mapbox account
- Domain name (tiaohai.com)

---

## 1️⃣ Database Setup (AWS RDS)

### Create PostgreSQL Instance
```bash
# Using AWS CLI
aws rds create-db-instance \
  --db-instance-identifier tiaohai-production \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --engine-version 15.4 \
  --allocated-storage 20 \
  --master-username tiaohai_admin \
  --master-user-password YOUR_STRONG_PASSWORD \
  --vpc-security-group-ids sg-xxxxxx \
  --availability-zone us-east-1a

# Enable PostGIS extension after creation
psql -h your-rds-endpoint -U tiaohai_admin -d tiaohai -c "CREATE EXTENSION postgis;"
```

### Environment Variable
```
DATABASE_URL="postgresql://tiaohai_admin:PASSWORD@your-rds-endpoint:5432/tiaohai?schema=public"
```

---

## 2️⃣ Backend Deployment (Railway)

### Deploy Steps

1. **Connect Repository**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and link project
   railway login
   railway link
   ```

2. **Configure Environment Variables**
   ```bash
   railway variables set DATABASE_URL="postgresql://..."
   railway variables set JWT_SECRET="your-super-secret-key"
   railway variables set STRIPE_SECRET_KEY="sk_live_..."
   railway variables set OPENAI_API_KEY="sk-..."
   railway variables set FRONTEND_URL="https://tiaohai.com"
   ```

3. **Deploy**
   ```bash
   cd apps/api
   railway up
   ```

### Dockerfile (Optional)
```dockerfile
# apps/api/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]
```

---

## 3️⃣ Frontend Deployment (Vercel)

### Deploy Steps

1. **Connect Repository**
   - Import project from GitHub
   - Root directory: `apps/web`

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: next build
   Output Directory: .next
   ```

3. **Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://api.tiaohai.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   NEXT_PUBLIC_MAPBOX_TOKEN=pk...
   ```

4. **Deploy**
   ```bash
   cd apps/web
   vercel --prod
   ```

---

## 4️⃣ AI Service Deployment

### Option A: Railway (Recommended)
```bash
cd apps/ai
railway up
```

### Option B: Fly.io
```bash
cd apps/ai
fly launch
fly deploy
```

### Environment Variables
```
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
DATABASE_URL=postgresql://...
FRONTEND_URL=https://tiaohai.com
```

---

## 5️⃣ Redis (Upstash)

1. Create Upstash account
2. Create new Redis database
3. Copy Redis URL:
   ```
   REDIS_URL="redis://default:password@your-upstash-endpoint:6379"
   ```

---

## 6️⃣ Stripe Configuration

### Live Mode Setup

1. **Activate Account**
   - Complete Stripe onboarding
   - Enable Connect for platform

2. **Webhooks**
   ```
   Endpoint: https://api.tiaohai.com/api/v1/payments/webhook
   Events:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - charge.refunded
   ```

3. **Connected Accounts**
   - Enable Express accounts
   - Set platform fee (15%)

---

## 7️⃣ Domain Configuration

### DNS Records
```
Type    Name              Value                          TTL
A       @                 76.76.21.21 (Vercel)           3600
A       www               76.76.21.21                    3600
CNAME   api               your-railway-app.up.railway.app 3600
CNAME   ai                your-fly-app.fly.dev           3600
```

### SSL Certificates
- Vercel: Automatic
- Railway: Automatic
- Custom domain: Use Cloudflare

---

## 8️⃣ Monitoring & Logging

### Sentry Setup
```bash
# Install Sentry
npm install @sentry/nextjs @sentry/nestjs

# Configure in apps/web/sentry.client.config.js
# Configure in apps/api/src/sentry.interceptor.ts
```

### Log Aggregation (Datadog)
```bash
# Install Datadog agent
DD_API_KEY=xxx bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

---

## 🔒 Security Checklist

- [ ] Enable AWS RDS encryption at rest
- [ ] Use strong passwords for all services
- [ ] Enable 2FA on all accounts
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable Stripe webhook signature verification
- [ ] Use HTTPS only (HSTS)
- [ ] Encrypt passport numbers (AES-256)
- [ ] Set up automated security scans

---

## 📊 Scaling Strategy

### Horizontal Scaling
```yaml
# Railway auto-scaling
replicas:
  min: 2
  max: 10
  targetCPU: 70%
```

### Database Scaling
- Start: db.t3.medium (2 vCPU, 4GB RAM)
- Scale to: db.r5.xlarge for production
- Enable read replicas for high traffic

### CDN (Cloudflare)
```
# Enable for static assets
Cache Rules:
- _next/static/*: Cache for 1 year
- images/*: Cache for 30 days
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: railway/cli@latest
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
      - run: railway up
```

---

## 🚨 Post-Deployment Verification

### Smoke Tests
```bash
# Health checks
curl https://api.tiaohai.com/health
curl https://ai.tiaohai.com/health

# Test booking flow
curl -X POST https://api.tiaohai.com/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Test AI chat
curl -X POST https://ai.tiaohai.com/api/v1/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "sessionId": "test"}'
```

### Monitoring Alerts
- API response time > 500ms
- Error rate > 1%
- Database connections > 80%
- AI service down

---

## 💰 Cost Estimates

| Service | Monthly Cost |
|---------|-------------|
| Vercel Pro | $20 |
| Railway (API) | $50-100 |
| Railway (AI) | $30-50 |
| AWS RDS | $50-100 |
| Upstash Redis | $10 |
| Stripe Fees | 2.9% + $0.30 per transaction |
| OpenAI API | $50-200 (depending on usage) |
| Sentry | $26 |
| **Total** | **~$250-550/month** |

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Docs](https://docs.railway.app/)
- [AWS RDS Best Practices](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html)
- [Stripe Connect Guide](https://stripe.com/docs/connect)
