# 跳海Global C端架构设计 v1.0

> 🏗️ 架构设计文档 | 跳海Global入境游酒店预订平台
> 
> 日期: 2026-03-16 | 版本: v1.0 | 状态: 初稿

---

## 1. 概述

### 1.1 项目背景
- **项目名**: 跳海Global (Tiaohai Global)
- **定位**: 入境游酒店预订平台，服务外国游客
- **目标市场**: 144小时免签政策下的国际游客
- **核心差异化**: Honest Facility Checklist - 让外国游客提前知道酒店的真实设施（西式马桶、电梯、英语前台等）

### 1.2 现状分析

#### 当前技术栈
| 层级 | 技术 | 状态 |
|------|------|------|
| 前端 | Next.js 14 + React 18 + TypeScript | ✅ 已存在 |
| 后端 | NestJS + TypeScript | ✅ 已存在 |
| 数据库 | PostgreSQL + Prisma ORM | ✅ 已存在 |
| 国际化 | next-intl | ✅ 已存在 |
| 地图 | Mapbox GL JS | ✅ 已存在 |
| 支付 | Stripe | ✅ 已存在 |

#### 当前问题
1. **硬编码数据**: 所有酒店数据是mock数据，存储在代码中
2. **假图片**: 使用Unsplash的随机图片，不是真实酒店图片
3. **数据联动不真实**: 搜索、筛选都是前端过滤，没有真实API调用
4. **多语言不完整**: 只有基础文案翻译，没有内容级翻译

### 1.3 设计目标

```
┌─────────────────────────────────────────────────────────────┐
│                    C端重构目标                               │
├─────────────────────────────────────────────────────────────┤
│ ✅ 去硬编码 - 所有数据从API获取                               │
│ ✅ 真实数据流 - 搜索/筛选走后端API                            │
│ ✅ 多语言完整 - 5种语言: en/es/fr/de/ja                       │
│ ✅ 性能优化 - SSG/ISR混合渲染                                 │
│ ✅ 演示可用 - 数据真实可演示                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. 系统架构设计

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────────┐
│                           客户端层 (Client)                         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Web App    │  │  Mobile Web  │  │   PWA        │             │
│  │  (Next.js)   │  │  (Responsive)│  │ (Future)     │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
└─────────┼─────────────────┼─────────────────┼───────────────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                         CDN / Edge                                  │
│                    (Vercel Edge / Cloudflare)                       │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                        API Gateway                                  │
│              (NestJS + Rate Limit + Auth Middleware)                │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
┌─────────▼─────────┐ ┌─────▼──────┐ ┌────────▼────────┐
│   Public APIs     │ │ Auth APIs  │ │  Admin APIs     │
│  (No auth needed) │ │(JWT Bearer)│ │  (Role-based)   │
└─────────┬─────────┘ └─────┬──────┘ └────────┬────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      Service Layer                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Hotel   │ │  Guide   │ │Experience│ │  Order   │ │  Search  │ │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │ │ Service  │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ │
└───────┼────────────┼────────────┼────────────┼────────────┼───────┘
        │            │            │            │            │
        └────────────┴────────────┴────────────┴────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      Data Layer                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │  PostgreSQL  │  │    Redis     │  │    S3/MinIO  │               │
│  │  (Primary)   │  │   (Cache)    │  │   (Images)   │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 渲染策略

```
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js 渲染策略                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │     SSG      │    │     SSR      │    │     CSR      │     │
│   │ Static Site  │    │ Server-Side  │    │ Client-Side  │     │
│   │ Generation   │    │  Rendering   │    │  Rendering   │     │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │
│          │                   │                   │             │
│          ▼                   ▼                   ▼             │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│   │ / (Home)     │    │ /hotels/[id] │    │ /chat        │     │
│   │ /hotels      │    │ /guides/[id] │    │ /checkout    │     │
│   │ /guides      │    │ /orders/*    │    │ /dashboard/* │     │
│   │ /experiences │    │              │    │              │     │
│   └──────────────┘    └──────────────┘    └──────────────┘     │
│                                                                 │
│   Build时生成           请求时生成            客户端渲染          │
│   + ISR重验证           + 数据动态           + 交互复杂          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 技术选型对比

| 维度 | 方案A: SSR优先 | 方案B: SSG+ISR (推荐) | 方案C: 全CSR |
|------|---------------|----------------------|-------------|
| **首屏性能** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **SEO友好** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **数据实时性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (ISR) | ⭐⭐⭐⭐⭐ |
| **服务器成本** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **开发复杂度** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **演示体验** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**推荐: 方案B (SSG + ISR)**
- 理由: 演示场景下数据变化不频繁，SSG提供更好的首屏体验
- ISR (60s-300s) 保证数据最终一致性

---

## 3. 数据流设计

### 3.1 整体数据流

```
┌─────────────────────────────────────────────────────────────────────┐
│                         数据流架构                                   │
└─────────────────────────────────────────────────────────────────────┘

【列表页数据流 - /hotels】

   ┌──────────┐      ┌──────────────────┐      ┌──────────────┐
   │  Client  │─────▶│  Next.js Server  │─────▶│  API Server  │
   └──────────┘      └──────────────────┘      └──────────────┘
                            │                           │
                            │ 1. fetch hotels (SSR)     │
                            │ 2. cache with ISR         │
                            ▼                           ▼
                      ┌──────────┐              ┌──────────────┐
                      │  Render  │              │  PostgreSQL  │
                      │  HTML    │              └──────────────┘
                      └──────────┘
                            │
                            │ 3. Hydration
                            ▼
                      ┌──────────┐
                      │  React   │
                      │  Interactive
                      └──────────┘

【搜索/筛选数据流】

   User Input ──▶ Client State ──▶ Debounce (300ms) ──▶ API Call
                                                          │
                                                          ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  GET /api/v1/hotels?city=shanghai&facility=western_toilet    │
   └──────────────────────────────────────────────────────────────┘
                                                          │
                                                          ▼
   Loading Skeleton ──▶ Data Update ──▶ Re-render List

【详情页数据流 - /hotels/:id】

   方案: SSR + 客户端缓存
   
   首次访问: Server ──▶ API ──▶ Render ──▶ Client
   后续导航: Client Cache (SWR/React Query) ──▶ Render
```

### 3.2 API调用分层

```typescript
// ┌─────────────────────────────────────────────────────────────┐
// │                    API 调用分层架构                          │
// └─────────────────────────────────────────────────────────────┘

// Layer 1: Components (UI层)
// - 只关心UI状态
// - 不直接调用API
const HotelListPage = () => {
  const { hotels, loading, error } = useHotels(filters)
  // 只处理UI渲染
}

// Layer 2: Custom Hooks (数据层)
// - 封装数据获取逻辑
// - 处理缓存、重试、错误
const useHotels = (filters: HotelFilters) => {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelApi.getHotels(filters),
    staleTime: 60 * 1000, // 1分钟
  })
}

// Layer 3: API Client (网络层)
// - 统一的请求/响应处理
// - 拦截器、错误处理
const hotelApi = {
  getHotels: (filters) => 
    apiClient.get('/hotels', { params: filters }),
  getHotelById: (id) => 
    apiClient.get(`/hotels/${id}`),
}

// Layer 4: HTTP Client (基础层)
// - 底层fetch/axios封装
// - 统一的错误处理
const apiClient = {
  get: (url, config) => {
    // 统一添加baseURL、headers
    // 统一错误处理
    // 统一日志
  }
}
```

---

## 4. API接口规范

### 4.1 RESTful API设计

```
Base URL: /api/v1

┌────────────────────────────────────────────────────────────────────┐
│                        API 端点列表                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  🏨 Hotels (酒店)                                                   │
│  ─────────────────────────────────────────────────────────────    │
│  GET    /hotels              酒店列表 (支持筛选、分页)               │
│  GET    /hotels/featured     精选酒店                              │
│  GET    /hotels/:id          酒店详情                              │
│  GET    /hotels/filters      获取筛选选项                          │
│                                                                    │
│  🧭 Guides (导游)                                                   │
│  ─────────────────────────────────────────────────────────────    │
│  GET    /guides              导游列表                              │
│  GET    /guides/:id          导游详情                              │
│                                                                    │
│  🎉 Experiences (体验)                                              │
│  ─────────────────────────────────────────────────────────────    │
│  GET    /experiences         体验列表                              │
│  GET    /experiences/:id     体验详情                              │
│                                                                    │
│  📦 Orders (订单)                                                   │
│  ─────────────────────────────────────────────────────────────    │
│  GET    /orders              订单列表 (需认证)                      │
│  GET    /orders/:id          订单详情 (需认证)                      │
│  POST   /orders              创建订单 (需认证)                      │
│  POST   /orders/:id/cancel   取消订单 (需认证)                      │
│                                                                    │
│  💬 Chat (AI客服)                                                   │
│  ─────────────────────────────────────────────────────────────    │
│  POST   /chat                发送消息                              │
│  GET    /chat/history        获取历史                              │
│                                                                    │
│  👤 Auth (认证)                                                     │
│  ─────────────────────────────────────────────────────────────    │
│  POST   /auth/login          登录                                  │
│  POST   /auth/register       注册                                  │
│  POST   /auth/logout         登出                                  │
│  GET    /auth/me             当前用户                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 4.2 请求/响应规范

#### 通用响应格式

```typescript
// 成功响应
{
  "data": T,           // 实际数据
  "meta": {            // 元数据（列表分页用）
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}

// 错误响应
{
  "error": {
    "code": "HOTEL_NOT_FOUND",  // 错误码
    "message": "Hotel not found", // 用户友好错误信息
    "details": {}                 // 详细错误（可选）
  }
}
```

#### 酒店列表接口

```typescript
// GET /api/v1/hotels

// Query Parameters:
interface HotelListQuery {
  city?: string              // 城市筛选
  q?: string                 // 搜索关键词
  experienceType?: string    // 体验类型: hutong/historical/food/nature/art/riverside/modern
  facility?: string          // 设施筛选，逗号分隔: western_toilet,elevator,english_staff
  minPrice?: number          // 最低价格
  maxPrice?: number          // 最高价格
  checkIn?: string           // 入住日期 (YYYY-MM-DD)
  checkOut?: string          // 退房日期 (YYYY-MM-DD)
  guests?: number            // 客人数
  page?: number              // 页码 (默认1)
  limit?: number             // 每页数量 (默认20)
  sort?: string              // 排序: price_asc, price_desc, rating_desc, recommended
}

// Response:
interface HotelListResponse {
  data: HotelSummary[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

interface HotelSummary {
  id: string
  name: string
  nameCn: string
  city: string
  district: string
  pricePerNight: number
  currency: string
  rating: number
  reviewCount: number
  images: string[]           // 首图用于列表展示
  badges: string[]           // 标签: ["144h-visa-free", "english-staff", ...]
  
  // 核心差异化字段 - Honest Facility Checklist
  foreignFriendly: {
    englishSpeaking: boolean
    westernToilet: boolean
    elevator: boolean
    visaAssistance: boolean
    internationalPayment: boolean
  }
  
  // 地图坐标
  coordinates: {
    lat: number
    lng: number
  }
  
  // 多语言AI总结（列表页展示）
  aiSummary: string  // 根据用户语言自动返回对应语言
}
```

#### 酒店详情接口

```typescript
// GET /api/v1/hotels/:id

interface HotelDetailResponse {
  id: string
  name: string
  nameCn: string
  city: string
  district: string
  address: string
  description: string
  pricePerNight: number
  cleaningFee?: number
  serviceFee?: number
  currency: string
  rating: number
  reviewCount: number
  images: string[]
  badges: string[]
  
  // 设施
  facilities: Facility[]
  amenities: string[]
  
  // 诚实设施清单 - 核心差异化
  honestFacilities: HonestFacility[]
  foreignFriendly: ForeignFriendly
  
  // 房东信息
  host: {
    name: string
    nameCn: string
    since: number
    languages: string[]
    responseRate: string
    responseTime: string
    bio: string
    avatar?: string
  }
  
  // 房型
  roomTypes: RoomType[]
  
  // 评价
  reviews: Review[]
  
  // 地图坐标
  coordinates: {
    lat: number
    lng: number
  }
  
  // 周边信息
  nearestMetro?: string
  distanceToAttraction?: string
  
  // 规则
  checkInTime: string
  checkOutTime: string
  houseRules: string[]
  cancellationPolicy: string
  
  // 多语言内容
  i18n: {
    [locale: string]: {
      description: string
      houseRules: string[]
      aiSummary: string
      culturalTips: string[]
    }
  }
  
  // 导流链接
  bookingLinks?: {
    bookingCom?: string
    airbnb?: string
    agoda?: string
    ctrip?: string
  }
}

// 多语言内容结构（存储在hotel_i18n表）
interface HotelI18n {
  hotelId: string
  locale: string          // en, es, fr, de, ja
  field: string           // description, houseRules, aiSummary, culturalTips
  content: string
  isAutoTranslated: boolean
  reviewedBy?: string     // null表示机器翻译，有值表示人工审核
}
```

### 4.3 多语言API设计

```
┌────────────────────────────────────────────────────────────────────┐
│                     多语言内容策略                                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  方案: 服务端根据Accept-Language返回对应语言                         │
│                                                                    │
│  实现方式:                                                         │
│  1. HTTP Header: Accept-Language: en,es;q=0.9,fr;q=0.8            │
│  2. 或 Query Param: ?locale=en                                     │
│                                                                    │
│  优先级:                                                           │
│  1. 人工翻译 (reviewed) > 机器翻译 > 默认语言(英文)                  │
│                                                                    │
│  内容级别:                                                         │
│  ┌─────────────────┬─────────────────────────────────────────┐    │
│  │ 内容类型        │ 翻译策略                                 │    │
│  ├─────────────────┼─────────────────────────────────────────┤    │
│  │ 界面文案        │ next-intl JSON 静态翻译                   │    │
│  │ 酒店名称        │ 原名 + 音译(可选)                         │    │
│  │ 酒店描述        │ AI翻译 + 人工审核                        │    │
│  │ 设施标签        │ 预定义多语言词表                          │    │
│  │ 评价内容        │ 原文 + 机器翻译(可选)                     │    │
│  │ AI总结          │ GPT-4实时生成多语言                      │    │
│  │ 文化提示        │ 预写多语言模板                           │    │
│  └─────────────────┴─────────────────────────────────────────┘    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 5. 数据库Schema设计

### 5.1 核心表结构

```sql
-- =============================================
-- 跳海Global C端数据库Schema (简化版)
-- 基于现有Prisma Schema调整
-- =============================================

-- 1. 酒店主表
CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,                    -- 中文名
    name_en VARCHAR(255),                          -- 英文名
    city VARCHAR(50) NOT NULL,
    district VARCHAR(100),
    address TEXT NOT NULL,
    
    -- 坐标
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    
    -- 价格
    base_price DECIMAL(10, 2),
    cleaning_fee DECIMAL(10, 2) DEFAULT 0,
    service_fee DECIMAL(10, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'CNY',
    
    -- 评分
    rating DECIMAL(2, 1) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    
    -- 设施 (JSON格式，便于扩展)
    facilities JSONB DEFAULT '{}',
    -- 示例: {"wifi": true, "western_toilet": true, "elevator": false, "air_con": true}
    
    -- 外宾友好度 (快速筛选用)
    has_english_staff BOOLEAN DEFAULT false,
    has_western_toilet BOOLEAN DEFAULT false,
    has_elevator BOOLEAN DEFAULT false,
    accepts_international_payment BOOLEAN DEFAULT false,
    provides_visa_assistance BOOLEAN DEFAULT false,
    
    -- 状态
    status VARCHAR(20) DEFAULT 'ACTIVE', -- PENDING, ACTIVE, SUSPENDED
    
    -- 图片 (数组)
    images TEXT[],
    
    -- PMS集成
    pms_type VARCHAR(50), -- cloudbeds, siteminder, manual
    pms_config JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- 索引
    CONSTRAINT idx_hotels_city_status 
        UNIQUE (city, status) 
        WHERE status = 'ACTIVE'
);

CREATE INDEX idx_hotels_city ON hotels(city);
CREATE INDEX idx_hotels_status ON hotels(status);
CREATE INDEX idx_hotels_price ON hotels(base_price);
CREATE INDEX idx_hotels_coordinates ON hotels USING GIST (
    point(lng, lat)
) WHERE lat IS NOT NULL AND lng IS NOT NULL;

-- 2. 酒店多语言内容表
CREATE TABLE hotel_i18n (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    locale VARCHAR(5) NOT NULL, -- en, es, fr, de, ja
    
    -- 多语言字段
    description TEXT,
    ai_summary TEXT,
    house_rules TEXT[],
    cultural_tips TEXT[],
    
    -- 翻译质量标记
    is_auto_translated BOOLEAN DEFAULT true,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(hotel_id, locale)
);

CREATE INDEX idx_hotel_i18n_hotel ON hotel_i18n(hotel_id);
CREATE INDEX idx_hotel_i18n_locale ON hotel_i18n(locale);

-- 3. 房型表
CREATE TABLE room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    name_en VARCHAR(100),
    
    -- 库存
    room_count INTEGER NOT NULL DEFAULT 1,
    
    -- 价格
    price_per_night DECIMAL(10, 2) NOT NULL,
    
    -- 配置
    bed_count INTEGER,
    gender_type VARCHAR(10), -- mixed, female, male
    amenities JSONB, -- {toilet_type: "western", air_con: true}
    
    -- 图片
    images TEXT[],
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_room_types_hotel ON room_types(hotel_id);

-- 4. 酒店图片表 (替代images数组，更灵活)
CREATE TABLE hotel_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hotel_images_hotel ON hotel_images(hotel_id);

-- 5. 筛选选项表 (用于快速获取筛选条件)
CREATE TABLE filter_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- experience_type, facility, city
    key VARCHAR(50) NOT NULL,
    label_en VARCHAR(100),
    label_es VARCHAR(100),
    label_fr VARCHAR(100),
    label_de VARCHAR(100),
    label_ja VARCHAR(100),
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- 6. 评价表
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id),
    
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    content_en TEXT, -- 翻译后
    
    -- 诚实设施评价
    facility_ratings JSONB, -- {western_toilet: true, elevator: false}
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_hotel ON reviews(hotel_id);
```

### 5.2 数据库迁移计划

```
当前: mock-data (代码中硬编码)
         │
         ▼
  第一阶段: API直连mock数据
    - 创建API endpoints
    - mock数据移到API层
    - 前端调用真实API
         │
         ▼
  第二阶段: 数据库持久化
    - 创建数据库表
    - 迁移mock数据到数据库
    - API改为查询数据库
         │
         ▼
  第三阶段: 多语言支持
    - 添加hotel_i18n表
    - 翻译关键内容
    - API返回对应语言
```

---

## 6. 前端架构设计

### 6.1 目录结构

```
apps/web/src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # 多语言路由
│   │   ├── page.tsx              # 首页 (SSG)
│   │   ├── layout.tsx            # 根布局
│   │   ├── hotels/
│   │   │   ├── page.tsx          # 酒店列表 (SSG + Client Fetch)
│   │   │   └── [id]/
│   │   │       └── page.tsx      # 酒店详情 (SSR)
│   │   ├── guides/
│   │   ├── experiences/
│   │   ├── checkout/
│   │   └── chat/
│   └── api/                      # API Routes (如果需要)
│
├── components/                   # 组件
│   ├── ui/                       # 基础UI组件 (shadcn)
│   ├── features/                 # 功能组件
│   │   ├── hotels/               # 酒店相关
│   │   ├── search/               # 搜索相关
│   │   └── booking/              # 预订相关
│   └── layout/                   # 布局组件
│
├── hooks/                        # 自定义Hooks
│   ├── api/                      # API Hooks
│   │   ├── useHotels.ts
│   │   ├── useHotelDetail.ts
│   │   └── useSearch.ts
│   └── ui/                       # UI Hooks
│       ├── useDebounce.ts
│       └── useMediaQuery.ts
│
├── lib/                          # 工具函数
│   ├── api/                      # API客户端
│   │   ├── client.ts             # axios/fetch封装
│   │   ├── hotels.ts             # 酒店API
│   │   └── types.ts              # API类型定义
│   ├── i18n/                     # 国际化
│   │   └── config.ts
│   └── utils.ts
│
├── types/                        # 全局类型
│   ├── hotel.ts
│   ├── guide.ts
│   └── api.ts
│
└── styles/                       # 样式
    └── globals.css
```

### 6.2 组件架构

```
┌─────────────────────────────────────────────────────────────────┐
│                      组件分层架构                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Page Components                      │   │
│  │  (SSG/SSR, 数据获取, SEO, Layout)                       │   │
│  │  /hotels/page.tsx, /hotels/[id]/page.tsx                │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                   Feature Components                    │   │
│  │  (业务逻辑, 状态管理, 事件处理)                           │   │
│  │  HotelList, HotelCard, SearchFilters, BookingForm       │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                    UI Components                        │   │
│  │  (纯展示, 无业务逻辑, 可复用)                             │   │
│  │  Button, Card, Badge, Skeleton, Input, Select           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 状态管理

```typescript
// ┌─────────────────────────────────────────────────────────────┐
// │                    状态管理策略                              │
// └─────────────────────────────────────────────────────────────┘

// 1. 服务端状态 (React Query / SWR)
// - API数据
// - 缓存、重试、轮询
const { data: hotels } = useQuery({
  queryKey: ['hotels', filters],
  queryFn: fetchHotels,
})

// 2. 客户端状态 (React Context / Zustand)
// - 用户认证状态
// - 全局UI状态 (主题、语言)
// - 购物车/预订状态

// 3. URL状态 (Search Params)
// - 搜索筛选条件
// - 分页、排序
// - 便于分享和SEO
const [filters, setFilters] = useSearchParams()

// 4. 局部状态 (useState)
// - 组件内部UI状态
// - 表单输入
// - 展开/收起
```

### 6.4 数据获取模式

```typescript
// ┌─────────────────────────────────────────────────────────────┐
// │                   数据获取模式对比                           │
// └─────────────────────────────────────────────────────────────┘

// 模式1: Server Component (推荐用于静态数据)
// 优点: 无JS bundle, SEO友好, 直接访问数据库
// 适用: 酒店列表首页
export default async function HotelsPage() {
  const hotels = await fetchHotels() // 服务端直接调用
  return <HotelList hotels={hotels} />
}

// 模式2: SSG + Client Fetch (推荐用于动态筛选)
// 优点: 快速首屏 + 交互式筛选
// 适用: 酒店列表筛选
export default function HotelsPage() {
  const [filters, setFilters] = useState()
  const { data: hotels } = useHotels(filters) // 客户端获取
  return <HotelList hotels={hotels} />
}

// 模式3: SSR (推荐用于用户特定数据)
// 优点: 用户数据在服务端获取
// 适用: 订单详情、个人中心
export default async function OrderPage({ params }) {
  const order = await fetchOrder(params.id) // 服务端获取
  return <OrderDetail order={order} />
}

// 模式4: ISR (推荐用于半动态数据)
// 优点: 静态性能 + 自动更新
// 适用: 酒店详情页
export const revalidate = 300 // 5分钟重验证

export default async function HotelPage({ params }) {
  const hotel = await fetchHotel(params.id)
  return <HotelDetail hotel={hotel} />
}
```

---

## 7. 性能优化策略

### 7.1 图片优化

```typescript
// 当前问题: 使用Unsplash外部图片，无优化
// 解决方案:

// 1. Next.js Image组件
import Image from 'next/image'

<Image
  src={hotel.images[0]}
  alt={hotel.name}
  width={800}
  height={600}
  priority={isFirst} // 首图优先加载
  placeholder="blur"
  blurDataURL={hotel.blurHash} // 模糊占位
/>

// 2. 图片CDN策略
// 开发/演示: Unsplash (免费)
// 生产: Cloudinary / AWS S3 + CloudFront

// 3. 响应式图片
<Image
  src={hotel.image}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
/>
```

### 7.2 代码分割

```typescript
// 动态导入，减少首屏bundle
const ChinaMap = dynamic(
  () => import('@/components/map/ChinaMap'),
  { 
    ssr: false, // 客户端组件
    loading: () => <Skeleton height={400} />
  }
)

const AIChat = dynamic(
  () => import('@/components/ai/AIChat'),
  { 
    ssr: false,
    loading: () => <ChatSkeleton />
  }
)
```

### 7.3 缓存策略

```typescript
// ┌─────────────────────────────────────────────────────────────┐
// │                    多级缓存策略                              │
// └─────────────────────────────────────────────────────────────┘

// Level 1: CDN Cache (Vercel Edge)
// 静态资源、SSG页面
// Cache-Control: public, max-age=31536000, immutable

// Level 2: API Cache (Redis)
// 酒店列表、筛选选项
// TTL: 5-10分钟

// Level 3: React Query Cache
// 客户端数据缓存
// staleTime: 1分钟

// Level 4: Browser Cache
// 图片、字体
// 长期缓存
```

---

## 8. 实施计划

### 8.1 迭代路线图

```
迭代1 (当前): 基础架构搭建
├── [ ] API层重构
│   ├── 创建RESTful API endpoints
│   ├── mock数据服务化
│   └── 统一响应格式
├── [ ] 前端数据层
│   ├── 创建API client
│   ├── 迁移到React Query
│   └── 统一错误处理
└── [ ] 多语言基础
    ├── 完善翻译文件
    └── API locale支持

迭代2: 数据持久化
├── [ ] 数据库迁移
│   ├── 创建新表结构
│   ├── 迁移mock数据
│   └── 添加索引优化
├── [ ] 酒店数据完整化
│   ├── 真实酒店图片
│   ├── 准确坐标数据
│   └── 多语言内容
└── [ ] 搜索优化
    ├── 后端搜索API
    ├── 筛选联动
    └── 结果缓存

迭代3: 性能优化
├── [ ] 渲染优化
│   ├── ISR配置
│   ├── 图片优化
│   └── 代码分割
├── [ ] 缓存策略
│   ├── Redis缓存
│   ├── CDN配置
│   └── 预加载策略
└── [ ] 监控接入
    ├── 性能监控
    └── 错误追踪
```

### 8.2 当前迭代任务清单

#### 后端任务
- [ ] 创建 `/api/v1/hotels` 列表接口
- [ ] 创建 `/api/v1/hotels/:id` 详情接口
- [ ] 创建 `/api/v1/hotels/filters` 筛选选项接口
- [ ] 统一API响应格式 (data/meta/error)
- [ ] 实现多语言内容返回

#### 前端任务
- [ ] 创建 `lib/api/client.ts` HTTP客户端
- [ ] 创建 `hooks/api/useHotels.ts`
- [ ] 创建 `hooks/api/useHotelDetail.ts`
- [ ] 重构 `/hotels/page.tsx` 使用真实API
- [ ] 重构 `/hotels/[id]/page.tsx` 使用真实API
- [ ] 迁移搜索筛选到后端

#### 数据库任务
- [ ] 创建 `hotel_i18n` 多语言表
- [ ] 创建 `filter_options` 筛选选项表
- [ ] 迁移mock数据到数据库

---

## 9. 风险评估

| 风险 | 概率 | 影响 | 应对策略 |
|------|------|------|----------|
| API响应延迟 | 中 | 高 | 添加Redis缓存、优化查询 |
| 多语言内容缺失 | 高 | 中 | 先用机器翻译，后续人工审核 |
| 图片版权问题 | 低 | 高 | 使用Unsplash免费图片或自制 |
| 数据库性能瓶颈 | 低 | 高 | 早期添加索引、分页优化 |
| SSR水合不匹配 | 中 | 中 | 规范时间戳处理、使用suppressHydrationWarning |

---

## 10. 附录

### A. 现有mock数据结构

```typescript
// 参考: /apps/api/src/mock-data/hostels.mock.ts

interface MockHostel {
  id: string
  name: string           // 中文名
  nameCn: string
  city: string           // 城市
  district: string       // 区县
  address: string
  description: string
  
  // 核心价格
  pricePerNight: number
  cleaningFee?: number
  serviceFee?: number
  currency: string
  
  // 评分
  rating: number
  reviewCount: number
  
  // 图片
  images: string[]
  
  // 设施
  facilities: Facility[]
  amenities: string[]
  
  // 核心差异化: Honest Facility Checklist
  honestFacilities: HonestFacility[]
  foreignFriendly: ForeignFriendly
  
  // 多语言AI总结
  aiSummaryI18n: Record<string, string>
  
  // 房型
  roomTypes: RoomType[]
  
  // 坐标
  coordinates: { lat: number; lng: number }
  
  // 其他...
}
```

### B. API端点对照表

| 当前Mock | 新API | 状态 |
|----------|-------|------|
| GET /mock/hostels | GET /api/v1/hotels | 🔄 迁移中 |
| GET /mock/hostels/featured | GET /api/v1/hotels/featured | 🔄 迁移中 |
| GET /mock/hostels/:id | GET /api/v1/hotels/:id | 🔄 迁移中 |
| GET /mock/hostels/filters | GET /api/v1/hotels/filters | 🔄 迁移中 |
| GET /mock/guides | GET /api/v1/guides | ⏳ 待开发 |
| GET /mock/experiences | GET /api/v1/experiences | ⏳ 待开发 |

### C. 多语言内容字段

| 字段 | 存储位置 | 翻译方式 |
|------|----------|----------|
| UI文案 | messages/*.json | 人工翻译 |
| 酒店描述 | hotel_i18n.description | AI翻译+人工审核 |
| AI总结 | hotel_i18n.ai_summary | GPT-4实时生成 |
| 设施标签 | filter_options | 预定义 |
| 评价内容 | reviews.content_en | 机器翻译(可选) |

---

**文档结束**

> 如有问题或需要澄清，请联系架构师 Archie
