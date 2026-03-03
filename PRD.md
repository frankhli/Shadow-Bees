# Tiaohai Global - 产品需求文档 (PRD)

## 1. 产品定位

### 1.1 一句话描述
**AI驱动的入境游酒店服务平台** - 帮助国内精品酒店通过AI内容生成和多语言客服，高效获取和服务海外游客。

### 1.2 核心模式
```
轻前端（展示+导流）+ 重后端（AI SaaS工具）

游客端：聚合展示酒店AI官网，AI客服咨询，导流至Booking/Airbnb
酒店端：中文Dashboard，AI内容生成，社媒自动回复，定价建议
```

### 1.3 商业模式
| 收入来源 | 占比 | 说明 |
|---------|------|------|
| 酒店SaaS订阅 | 50% | ¥299/月/酒店，AI工具使用费 |
| Booking联盟佣金 | 30% | 导流预订抽成4% |
| 导游服务抽成 | 15% | 自建导游预订抽成20% |
| 增值服务费 | 5% | 额外内容生成、数据分析等 |

---

## 2. 用户画像

### 2.1 海外游客（C端）
- **地域**：欧美（美/英/德/法/西）+ 日本
- **语言**：英语（默认）、西/法/德/日语
- **痛点**：
  - 不知道酒店是否适合外国人（电梯/马桶/英语）
  - 对中国酒店设施信息不对称
  - 预订前有问题得不到及时回复（时差）

### 2.2 国内酒店（B端）
- **类型**：精品酒店/民宿，有涉外资质
- **痛点**：
  - 不会写英文Listing
  - 没时间回复海外游客咨询
  - 不懂海外社媒运营（TikTok/Instagram）
  - 不会动态定价

---

## 3. 技术架构

### 3.1 总体架构

```
┌─────────────────────────────────────────────────────────────┐
│  前端层                                                      │
│  ├── 游客端 (tiaohai.com)                                    │
│  │   ├── Next.js 14 (App Router)                            │
│  │   ├── 多语言: EN/ES/FR/DE/JA (默认EN)                      │
│  │   ├── Vercel Edge (全球CDN)                               │
│  │   └── 功能: 搜索/酒店详情/AI聊天(UI)                       │
│  │                                                          │
│  └── 酒店Dashboard (tiaohai.com/hotel)                       │
│      ├── Next.js 14                                          │
│      ├── 固定中文                                           │
│      └── 功能: 内容生成/客服管理/定价建议/数据分析            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  API层 (香港部署)                                            │
│  ├── API Gateway (Kong/Nginx)                               │
│  ├── Core API (NestJS + Node.js 20)                         │
│  │   ├── 酒店管理 (/hotels)                                  │
│  │   ├── 订单管理 (/orders) - 仅导游订单                     │
│  │   ├── 定价服务 (/pricing) - 建议+预留自动                 │
│  │   └── 用户管理 (/auth)                                    │
│  │                                                          │
│  └── Webhook服务 (Node.js)                                  │
│      ├── TikTok Bot                                         │
│      ├── Instagram Bot                                      │
│      └── WhatsApp Business API                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  AI服务层 (Python FastAPI)                                   │
│  ├── Content Generator                                      │
│  │   ├── TikTok文案生成 (EN/ES/FR/DE/JA)                     │
│  │   ├── Instagram文案生成                                   │
│  │   ├── 小红书文案生成 (中文)                               │
│  │   └── Booking Listing优化                                 │
│  │                                                          │
│  └── AI Concierge                                           │
│      ├── 多语言对话 (GPT-4o)                                 │
│      ├── RAG检索 (酒店知识库)                                │
│      ├── 意图识别                                           │
│      └── 转人工机制                                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  数据层                                                      │
│  ├── PostgreSQL 15 (香港RDS)                                │
│  ├── Redis (缓存/队列)                                      │
│  └── 向量数据库 (Pinecone)                                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 部署拓扑
| 组件 | 部署位置 | 理由 |
|------|---------|------|
| 游客Web | Vercel Edge (全球) | SEO + 全球访问速度 |
| 酒店Dashboard | Vercel (香港节点) | 国内访问稳定 |
| API服务 | 香港 ECS/Railway | OpenAI访问顺畅 |
| AI服务 | 香港 ECS | 流式响应低延迟 |
| 数据库 | 香港 RDS | 数据合规 + 两边访问OK |

### 3.3 技术栈选型
| 层级 | 技术 | 理由 |
|------|------|------|
| 前端 | Next.js 14 + Tailwind + shadcn/ui | SSR必需、开发效率 |
| 后端 | NestJS + TypeScript | 模块化、类型安全 |
| AI | Python FastAPI + OpenAI SDK | AI生态成熟、流式输出 |
| 数据库 | PostgreSQL 15 + Prisma | PostGIS + JSONB |
| 缓存 | Redis | 会话 + 限流 + 队列 |
| 搜索 | Meilisearch | 多语言 typo容忍 |

---

## 4. 功能模块

### 4.1 游客端功能

#### 4.1.1 首页 (Landing Page)
- SEO优化的Landing页
- 搜索框：城市 + 日期 + 设施筛选（电梯/西式马桶等）
- 信任标识：144小时免签、AI Concierge

#### 4.1.2 搜索列表页 (/search)
- 地图视图 + 列表视图
- 筛选器：设施标签（有电梯/西式马桶/英语前台）
- 酒店卡片：首图、诚实标签、价格（同步Booking实时价）

#### 4.1.3 酒店AI官网页 (/hotels/[slug])
- 大图Gallery
- **诚实设施清单**（核心差异化）：
  ```
  ✅ Western Toilet
  ❌ No Elevator (but free luggage carry)
  ✅ English-speaking staff
  ⚠️ 5min walk from subway (with luggage)
  ```
- AI Concierge浮窗
- 导流按钮：[Check on Booking.com] [Check on Airbnb]

#### 4.1.4 AI聊天功能
- 游客无需登录，直接聊天
- 多语言自动识别
- 上下文记住当前浏览的酒店
- 低置信度转人工通知酒店

### 4.2 酒店Dashboard功能

#### 4.2.1 AI内容生成
| 平台 | 语言 | 功能 |
|------|------|------|
| TikTok | EN/ES/FR/DE/JA | 15-60秒视频脚本 + 标签 |
| Instagram | EN/ES/FR/DE/JA | Caption + Hashtags |
| 小红书 | 中文 | 种草笔记 + 标题 |
| Booking.com | EN | Listing标题+描述优化 |

#### 4.2.2 社媒自动回复
- 绑定TikTok/Instagram账号
- Webhook接收评论/私信
- AI自动生成简短回复 + 导流链接

#### 4.2.3 AI客服管理
- 查看所有AI对话记录
- 人工接管按钮
- 低置信度对话高亮
- WhatsApp Business集成

#### 4.2.4 定价建议（预留自动）
- AI分析市场数据，生成定价建议
- 显示：当前价 → 建议价 → 原因
- 操作：采纳/忽略
- Phase 2：一键同步到Booking（需授权）
- Phase 3：高置信度自动调价

### 4.3 AI服务核心能力

#### 4.3.1 多语言System Prompt
- 每种语言独立Prompt文件
- 动态加载，易扩展

#### 4.3.2 RAG知识库
- 酒店信息向量化存储
- 游客提问时检索相关上下文

#### 4.3.3 意图识别
```
pricing → 价格咨询 → 查询实时价格
facility → 设施咨询 → RAG检索回答
booking → 预订意向 → 导流至Booking
emergency → 紧急情况 → 立即转人工
```

---

## 5. 数据模型（核心）

### 5.1 酒店表
```prisma
model Hotel {
  id                String   @id @default(uuid())
  name              String                    // 中文名
  city              String
  address           String
  lat               Float?
  lng               Float?
  nameI18n          Json     @default("{}")  // {"en": "...", "es": "..."}
  descI18n          Json     @default("{}")
  aiSummaryI18n     Json     @default("{}")
  facilities        Json     // {elevator: true, ...}
  hasForeignLicense Boolean  @default(false)
  bookingComId      String?
  airbnbId          String?
  basePrice         Decimal
  stripeAccountId   String?  // 预留
  status            HotelStatus @default(PENDING)
  ownerId           String
}
```

### 5.2 定价建议表
```prisma
model PricingSuggestion {
  id               String   @id @default(uuid())
  hotelId          String
  currentPrice     Decimal
  suggestedPrice   Decimal
  confidence       Decimal
  factors          Json
  status           SuggestionStatus @default(PENDING)
  appliedVia       ApplyMethod?     // MANUAL/AUTO/API（预留）
  expiresAt        DateTime
}
```

### 5.3 AI对话记录
```prisma
model AIConversation {
  id          String   @id @default(uuid())
  sessionId   String
  hotelId     String
  message     String
  response    String
  lang        String   // en/es/fr/de/ja
  intent      String?
  confidence  Decimal?
  escalated   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

---

## 6. 多语言策略

### 6.1 Phase 1 语言列表
| 语言码 | 语言 | 默认 | 状态 |
|--------|------|------|------|
| en | English | ✅ 默认 | P0 |
| es | Español | | P0 |
| fr | Français | | P0 |
| de | Deutsch | | P0 |
| ja | 日本語 | | P0 |

### 6.2 实现方式
- 前端：Next.js路由 `/en/hotels`, `/es/hotels`
- 后端：Accept-Language头或lang参数
- 数据库：JSONB存储多语言
- AI Prompt：文件系统 `prompts/en.txt` 等

---

## 7. MVP范围

### 7.1 P0（必须实现）
- [ ] 酒店入驻流程
- [ ] 酒店Dashboard（中文）
- [ ] AI内容生成（TikTok/小红书）
- [ ] TikTok Bot自动回复
- [ ] 游客端英文（单语言先跑通）
- [ ] 酒店AI官网页
- [ ] AI客服（英文）
- [ ] 导游服务（简化版）

### 7.2 Phase 2（3个月后）
- [ ] 多语言（西/法/德/日）
- [ ] Instagram/Facebook Bot
- [ ] WhatsApp Business集成
- [ ] 定价建议自动同步

### 7.3 Phase 3（6个月后）
- [ ] PMS对接（Cloudbeds）
- [ ] 自动定价
- [ ] 体验店模块

---

## 8. 成功指标

### 8.1 业务指标
| 指标 | 目标值 |
|------|--------|
| 酒店入驻数 | 50家 |
| 酒店续费率 | >70% |
| 官网页UV | 1000/月/酒店 |
| AI对话转化率 | >15% |
| 导流预订率 | >5% |

### 8.2 技术指标
| 指标 | 目标值 |
|------|--------|
| API响应时间 | P99 < 500ms |
| AI响应时间 | < 2秒（首字） |
| 前端首屏 | < 1.5秒 |
| 系统可用性 | > 99.5% |

---

**文档版本**: 1.0  
**最后更新**: 2026-02-26
