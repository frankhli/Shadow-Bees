# Tiaohai Global - 开发执行清单

> **目标**: 4周内跑通MVP，支持1家酒店完整流程  
> **原则**: 先跑通英文，再扩展多语言；先做手动，再自动化

---

## Week 1: 基础设施 + 酒店入驻

### Day 1-2: 项目初始化
- [ ] 1.1 初始化 monorepo 结构 (turborepo)
  ```bash
  npx create-turbo@latest tiaohai-global
  ```
- [ ] 1.2 创建 apps/web (Next.js 14)
  - [ ] 配置 Tailwind + shadcn/ui
  - [ ] 配置 next-i18n (预留多语言)
- [ ] 1.3 创建 apps/api (NestJS)
  - [ ] 基础项目结构
  - [ ] 配置 Prisma
- [ ] 1.4 创建 services/ai-service (Python FastAPI)
  - [ ] 基础项目结构
  - [ ] 配置 OpenAI SDK

### Day 3-4: 数据库设计
- [ ] 2.1 设计完整 Schema
  - [ ] Hotel 表
  - [ ] User 表 (酒店 owner)
  - [ ] RoomType 表
  - [ ] Order 表 (仅导游)
  - [ ] AIConversation 表
  - [ ] ContentGeneration 表
- [ ] 2.2 配置 PostgreSQL (本地 Docker)
  ```bash
  docker-compose up -d postgres redis
  ```
- [ ] 2.3 运行初始 Migration
  ```bash
  npx prisma migrate dev
  ```
- [ ] 2.4 创建 Seed 数据 (1家测试酒店)

### Day 5-7: 酒店入驻流程
- [ ] 3.1 酒店注册 API
  - [ ] POST /api/v1/auth/register
  - [ ] POST /api/v1/auth/login
  - [ ] JWT 鉴权
- [ ] 3.2 酒店信息录入 API
  - [ ] POST /api/v1/hotels (创建酒店)
  - [ ] PUT /api/v1/hotels/:id (更新)
  - [ ] 图片上传 (AWS S3 或本地)
- [ ] 3.3 酒店 Dashboard 基础页面
  - [ ] 登录页
  - [ ] 酒店信息设置页 (表单)
  - [ ] 简单的 Dashboard 首页

**Week 1 交付物:**
- [ ] 可运行的酒店入驻流程
- [ ] 1家测试酒店数据
- [ ] 酒店可登录 Dashboard 录入信息

---

## Week 2: 前端多语言 + 酒店展示

### Day 1: i18n 多语言支持 ✅
- [x] 1.1 配置 next-intl
  - [x] 5种语言支持 (en/es/fr/de/ja)
  - [x] LanguageSwitcher 组件
  - [x] 翻译文件结构

### Day 2: 酒店展示页面 ✅
- [x] 2.1 酒店列表页 (/hotels)
  - [x] 搜索组件 (城市/日期/人数)
  - [x] 酒店卡片网格
  - [x] 诚实设施标签 (elevator/wifi/westernToilet)
- [x] 2.2 酒店详情页 (/hotels/[id])
  - [x] 图片占位 + 酒店信息
  - [x] 诚实标签卡片 (What You Should Know)
  - [x] 设施详情展示
  - [x] Booking.com/Airbnb 导流按钮
  - [x] AI Concierge 浮窗组件
  - [x] 多语言支持 (5种语言)

### Day 3-4: AI内容生成服务 ✅
- [x] 3.1 Python AI服务基础
  - [x] FastAPI 项目结构
  - [x] OpenAI API 封装 (`app/core/openai_client.py`)
  - [x] 流式响应 SSE (`/ai/generate/content/stream`)
- [x] 3.2 TikTok 文案生成
  - [x] Prompt 工程 (`app/core/prompts.py`)
  - [x] API: `POST /ai/generate/content` (platform=tiktok)
  - [x] 返回: hook, script, voiceover, captions, hashtags, shooting_tips
- [x] 3.3 小红书文案生成
  - [x] Prompt 工程 (中文优化)
  - [x] API: `POST /ai/generate/content` (platform=xiaohongshu)
  - [x] 返回: title, content, highlights, hashtags, photo_tips
- [x] 3.4 Booking Listing 优化
  - [x] Prompt 工程
  - [x] API: `POST /ai/generate/content` (platform=booking)
  - [x] 返回: title, description, key_selling_points, room_highlights
- [x] 3.5 AI Concierge 聊天
  - [x] API: `POST /ai/chat/concierge`
  - [x] 智能回复 + fallback 机制
- [x] 3.6 模板管理
  - [x] API: `GET /ai/templates`
- [x] 3.7 Dashboard 内容生成页面
  - [x] Platform 选择 (TikTok/小红书/Instagram/Booking)
  - [x] Style 选择 (Lifestyle/Urgent/Professional/Funny)
  - [x] 生成按钮 + Loading 状态
  - [x] 展示生成结果 (按平台格式化)

### Day 11-12: 酒店 Dashboard 内容生成功能
- [ ] 5.1 内容生成页面 UI
  - [ ] 选择平台 (TikTok/小红书/Booking)
  - [ ] 选择风格 (紧迫/生活方式/专业)
  - [ ] 生成按钮 + Loading 状态
- [ ] 5.2 调用 AI 服务 API
  - [ ] 集成后端 API
  - [ ] 展示生成结果
  - [ ] 一键复制功能
- [ ] 5.3 保存生成历史
  - [ ] 数据库记录
  - [ ] 历史列表页面

### Day 13-14: TikTok Bot 基础
- [ ] 6.1 TikTok Webhook 接收
  - [ ] 配置 TikTok Developer 账号
  - [ ] Webhook 验证
  - [ ] 接收评论事件
- [ ] 6.2 自动回复逻辑
  - [ ] 简单回复 (固定模板)
  - [ ] 调用 AI 生成回复
  - [ ] 回复 + 导流链接
- [ ] 6.3 酒店 Dashboard 配置
  - [ ] 绑定 TikTok 账号 (手动输入ID先)
  - [ ] 查看收到的评论
  - [ ] 查看自动回复记录

**Week 2 交付物:**
- [ ] 酒店可生成 TikTok/小红书文案
- [ ] TikTok 评论自动回复 (基础版)
- [ ] AI 服务可独立运行

---

## Week 3: 游客端 + AI客服

### Day 15-17: 游客端页面
- [ ] 7.1 首页 (Landing Page)
  - [ ] Hero Section (SEO优化)
  - [ ] 搜索框 (城市 + 日期 + 设施筛选)
  - [ ] 信任标识
- [ ] 7.2 酒店列表页 (/search)
  - [ ] 地图视图 (Mapbox)
  - [ ] 酒店卡片列表
  - [ ] 筛选器 (设施标签)
- [ ] 7.3 酒店详情页 (/hotels/[slug])
  - [ ] 图片 Gallery
  - [ ] 诚实设施标签 (硬编码样式)
  - [ ] 导流按钮 (Booking/Airbnb)

### Day 18-19: AI客服 (核心)
- [ ] 8.1 AI Concierge 服务
  - [ ] System Prompt 设计 (英文)
  - [ ] RAG 知识库 (简单版：直接传酒店信息)
  - [ ] 流式响应 SSE
  - [ ] API: POST /api/v1/ai/chat
- [ ] 8.2 前端聊天组件
  - [ ] 右下角浮窗 UI
  - [ ] 消息列表
  - [ ] 输入框 + 发送
  - [ ] 流式展示 AI 回复
- [ ] 8.3 对话记录存储
  - [ ] 保存到数据库
  - [ ] 关联酒店

### Day 20-21: 酒店客服管理
- [ ] 9.1 Dashboard 对话列表
  - [ ] 查看所有对话
  - [ ] 筛选：未读/已处理/低置信度
- [ ] 9.2 人工接管功能
  - [ ] "接管" 按钮
  - [ ] 接管后 AI 暂停回复
  - [ ] 酒店回复消息
- [ ] 9.3 通知机制
  - [ ] 新消息邮件通知 (简单版)
  - [ ] 低置信度高亮提醒

**Week 3 交付物:**
- [ ] 游客可浏览酒店并聊天
- [ ] AI 客服可回答设施问题
- [ ] 酒店可查看并接管对话

---

## Week 4: 导游服务 + 优化上线

### Day 22-23: 导游服务 (简化版)
- [ ] 10.1 导游数据模型
  - [ ] Guide 表
  - [ ] 导游注册 API (简化，先后台录入)
- [ ] 10.2 导游列表页 (/guides)
  - [ ] 展示导游卡片
  - [ ] 筛选：城市/语言/专长
- [ ] 10.3 导游预订流程
  - [ ] 选择日期/时长
  - [ ] 填写联系信息
  - [ ] 创建订单 (不走支付，先记录)
  - [ ] 通知导游 (邮件/短信)

### Day 24-25: 导流追踪 ✅
- [x] 11.1 导流链接生成
  - [x] 带 UTM 参数 (utm_source, utm_medium, utm_campaign)
  - [x] 点击事件记录 API (`/api/referral/track`)
  - [x] 更新酒店详情页预订按钮
- [x] 11.2 Dashboard 数据展示
  - [x] 导流点击统计页面 (`/dashboard/hotel/analytics`)
  - [x] 平台分布 (Booking.com vs Airbnb)
  - [x] 趋势图表
  - [x] 预估收入计算

### Day 26-28: 优化 & 上线 ✅
- [x] 12.1 性能优化
  - [x] SSG 静态生成 (所有主要页面)
  - [x] 多语言优化
  - [x] 前端构建优化
- [x] 12.2 功能测试 ✅ 全部通过
  - [x] 8个页面 200 OK
  - [x] 4个 API 正常工作
  - [x] AI 内容生成正常
  - [x] 导流追踪正常
- [ ] 12.3 部署 (待进行)
  - [ ] 前端 Vercel
  - [ ] 后端 Railway/Render (香港)
  - [ ] 数据库 Supabase/AWS RDS (香港)
- [ ] 12.4 文档
  - [ ] API 文档
  - [ ] 酒店使用手册

**Week 4 交付物:**
- [ ] 导游服务可预订
- [ ] 基础数据统计
- [ ] 系统部署上线

---

## Phase 2 计划 (第2个月)

### 多语言扩展
- [ ] 西班牙语支持 (es)
- [ ] 法语支持 (fr)
- [ ] 德语支持 (de)
- [ ] 日语支持 (ja)

### 社媒扩展
- [ ] Instagram Bot
- [ ] Facebook Bot
- [ ] WhatsApp Business 集成

### 定价建议增强
- [ ] 市场数据分析
- [ ] 定价建议算法
- [ ] Booking.com API 对接 (一键改价)

---

## 技术债务 & 注意事项

### 必须做的 (MVP前)
- [ ] JWT Secret 环境变量配置
- [ ] 数据库连接字符串环境变量
- [ ] OpenAI API Key 环境变量
- [ ] 错误处理和日志记录
- [ ] 输入验证 (zod)
- [ ] 基础安全防护 (SQL注入/XSS)

### 可以延后 (MVP后)
- [ ] 完整的测试覆盖 (先手动测试)
- [ ] 监控告警 (DataDog/Sentry)
- [ ] CI/CD 流水线 (先手动部署)
- [ ] 缓存优化 (Redis 策略)
- [ ] 数据库索引优化

### 风险点
- [ ] **OpenAI API 可用性** - 准备 fallback 回复
- [ ] **TikTok API 限制** - 先人工测试 webhook
- [ ] **酒店配合度** - 准备详细的 onboarding 指南

---

## 每日站会问题

1. 昨天完成了什么？
2. 今天计划做什么？
3. 有什么阻塞？

---

## Week 1 详细任务分配

| 日期 | 任务 | 负责人 | 产出 |
|------|------|--------|------|
| Day 1 | 项目初始化 | @dev | 可运行的空项目 |
| Day 2 | 数据库设计 | @dev | Schema + Migration |
| Day 3 | Auth API | @dev | 注册/登录接口 |
| Day 4 | Hotel API | @dev | CRUD 接口 |
| Day 5 | Dashboard UI | @dev | 登录页 + 表单 |
| Day 6 | Dashboard UI | @dev | 酒店设置页 |
| Day 7 | 集成测试 | @dev | 端到端流程跑通 |

---

**开始开发前检查:**
- [ ] 所有环境变量已配置
- [ ] 本地 PostgreSQL 运行正常
- [ ] OpenAI API Key 有效
- [ ] Git 仓库已初始化

**Ready? Let's build! 🚀**
