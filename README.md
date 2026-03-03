# Tiaohai Global - AI-Native Inbound Travel OS

> 🌍 Connecting foreign travelers with authentic Chinese experiences through AI-powered concierge

---

## ⚡ 快速启动

```bash
cd tiaohai-global
./quick-start.sh
```

访问 http://localhost:3000 | [详细指南](./START.md)

## 📋 Project Overview

**Tiaohai Global** (跳海Living) is a three-sided marketplace platform:
- **B1**: Boutique hotels & hostels (with foreign guest license)
- **B2**: Local certified guides
- **B3**: Cultural experience stores
- **C**: Foreign independent travelers

### Core Value Proposition
- **AI Concierge**: 24/7 multilingual support (English, Spanish, French, German)
- **Cultural Bridge**: Honest information about Chinese customs and facilities
- **Visa-Free Ready**: Optimized for 144-hour visa-free transit policy

---

## 🏗️ Architecture

```
tiaohai-global/
├── apps/
│   ├── web/           # Next.js 14 Frontend (App Router)
│   ├── api/           # NestJS Backend API
│   └── ai/            # Fastify AI Service (LangChain + OpenAI)
├── packages/
│   └── database/      # Prisma ORM + PostgreSQL Schema
└── docker-compose.yml # Local development stack
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | NestJS, Node.js 20, Prisma ORM |
| Database | PostgreSQL 15 (PostGIS), Redis |
| AI | OpenAI GPT-4o, LangChain.js, Pinecone (vector DB) |
| Payment | Stripe Connect (International + Auto-split) |
| Search | Meilisearch (Multilingual hotel search) |
| Maps | Mapbox GL JS |

---

## 🚀 Getting Started

### Prerequisites
- Docker Desktop (用于 PostgreSQL, Redis, Meilisearch)
- VPN（推荐，用于 npm 依赖安装加速）

> **注意**: 项目自带 Node.js v20.11.0，无需在系统安装 Node

---

## ⚡ 最快启动方式（推荐）

```bash
cd tiaohai-global

# 一键启动所有服务（首次使用）
./launch.sh

# 或快速启动（已安装过依赖）
./quick-start.sh
```

访问地址：
- 🌐 **前端**: http://localhost:3000
- 🔌 **API**: http://localhost:3001/api/v1
- 🤖 **AI**: http://localhost:3002 (Mock 模式，无需配置)

按 `Ctrl+C` 停止所有服务。

---

## 🔧 手动配置（可选）

如需真实 AI 功能或支付功能，请配置环境变量：

```bash
# 1. 复制环境模板
cp .env.example .env

# 2. 编辑 .env 填入你的 API Keys
OPENAI_API_KEY="sk-你的key"        # 真实 AI 功能
STRIPE_SECRET_KEY="sk_你的key"     # 支付功能
```

---

## 📦 完整安装步骤

```bash
# 1. 安装依赖
npm install

# 2. 启动基础设施
docker-compose up -d

# 3. 生成 Prisma Client
npm run db:generate

# 4. 运行数据库迁移
npm run db:migrate

# 5. 导入示例数据
npm run db:seed

# 6. 启动所有服务
./quick-start.sh
```

---

## 📊 Database Schema

### Core Entities

```prisma
- User (Guest, Hotel Owner, Guide, Admin)
- Hotel (with foreign guest license verification)
- RoomType (inventory pool: ota + direct)
- Guide (languages, specialties, availability)
- Experience (workshop, dining, tour)
- Order (accommodation/guide/experience bundle)
- AIConversation (chat history + intent classification)
```

### Key Features
- **PostGIS**: Geographic queries for "nearby hotels"
- **JSONB**: Flexible schemas for facilities, inventory pools
- **Full-text search**: pg_trgm for typo-tolerant search

---

## 🎯 P0 Features Implemented

### ✅ Hotel Onboarding
- License upload with OCR verification
- Facility declaration (elevator, western toilet, etc.)
- PMS integration support (Cloudbeds ready)

### ✅ Hotel Discovery
- Map-based search with filters
- AI Concierge badge
- Real-time inventory display

### ✅ AI Concierge (Web)
- GPT-4o powered chat
- Top 10 FAQ handling
- Confidence-based human escalation
- Cultural tips integration

### ✅ Booking Flow
- Guest info collection (passport encrypted)
- Stripe payment integration
- Multi-product bundles (hotel + guide)
- WhatsApp confirmation

### ✅ Hotel Dashboard
- Calendar view with inventory management
- Order management
- AI conversation monitoring
- Revenue reporting

---

## 🔒 Security & Compliance

- **Passport Encryption**: AES-256 for PII
- **GDPR Ready**: Data deletion, export capabilities
- **PCI Compliance**: Stripe handles all card data
- **License Verification**: Manual review + OCR for hotel资质

---

## 🛣️ Roadmap

### Sprint 2 (P1)
- [ ] Cloudbeds API integration (auto inventory sync)
- [ ] Guide scheduling & dispatch algorithm
- [ ] Experience store management
- [ ] WhatsApp Business API integration
- [ ] Multi-language expansion (ES, FR, DE)

### Sprint 3 (P2)
- [ ] Dynamic pricing engine
- [ ] Advanced AI RAG with Pinecone
- [ ] Mobile app for guides
- [ ] Complex commission splits

---

## 📁 Project Structure

```
tiaohai-global/
├── apps/
│   ├── web/                 # Next.js 14 前端
│   ├── api/                 # NestJS 后端 API
│   └── ai/                  # Fastify AI 服务
├── packages/
│   └── database/            # Prisma ORM + PostgreSQL
├── docker-compose.yml       # 基础设施配置
├── launch.sh               # 🔥 一键完整启动脚本
├── quick-start.sh          # ⚡ 一键快速启动脚本
├── .tools/node/            # 项目自带 Node.js v20.11.0
└── README.md

详细结构:
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router
│   │   │   │   ├── page.tsx      # Landing page
│   │   │   │   ├── hotels/       # Hotel list & detail
│   │   │   │   ├── checkout/     # Booking flow
│   │   │   │   ├── partner/      # Hotel registration
│   │   │   │   └── dashboard/    # Hotel dashboard
│   │   │   ├── components/
│   │   │   │   └── ui/           # shadcn/ui components
│   │   │   └── lib/
│   │   │       └── utils.ts      # Utility functions
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── api/
│       ├── src/
│       │   ├── auth/             # JWT authentication
│       │   ├── hotels/           # Hotel CRUD + search
│       │   ├── guides/           # Guide management
│       │   ├── orders/           # Booking + payment
│       │   └── ai/               # AI conversation API
│       └── package.json
│
├── packages/
│   └── database/
│       ├── prisma/
│       │   ├── schema.prisma     # Complete data model
│       │   └── seed.ts           # Sample data
│       └── package.json
│
├── .env.example
├── package.json
└── turbo.json
```

---

## 💡 Development Notes

### AI Mock Mode
项目默认使用 **AI Mock 模式**，无需 OpenAI API Key 即可开发测试 AI 功能：

- ✅ 自动检测 `.env` 中的 `OPENAI_API_KEY`
- ✅ 未配置时自动切换到 Mock 模式
- ✅ 支持多语言预设回复（en/es/fr/de）
- ✅ Mock 回复带 `[MOCK]` 标记便于区分

如需真实 AI，在 `.env` 中添加：
```bash
OPENAI_API_KEY="sk-你的真实key"
```

### Built-in Node.js
项目自带 Node.js v20.11.0，位于 `.tools/node/`：
- 无需系统安装 Node.js
- 避免版本冲突
- 启动脚本自动使用内置 Node

### VPN Support
启动脚本已配置 npm 使用官方源 `https://registry.npmjs.org`，配合 VPN 可加速依赖安装。

---

## 🧪 Testing

```bash
# Run API tests
npm run test --workspace=@tiaohai/api

# Run E2E tests
npm run test:e2e --workspace=@tiaohai/web
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel --prod
```

### API (Railway/Render)
```bash
cd apps/api
railway up
```

### Database (AWS RDS)
- PostgreSQL 15 with PostGIS extension
- Enable automated backups
- Configure connection pooling (PgBouncer)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 💬 Contact

- Website: https://tiaohai.com
- Email: hello@tiaohai.com
- Twitter: @tiaohai

---

<p align="center">
  <sub>Built with ❤️ for authentic travel experiences</sub>
</p>
