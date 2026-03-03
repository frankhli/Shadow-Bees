# 🚀 Tiaohai Global - Quick Start Guide

## ⚡ 一键启动（推荐）

项目已配置好一键启动脚本，**无需手动安装依赖或配置环境**。

```bash
# 进入项目目录
cd tiaohai-global

# 方式1: 完整启动（首次使用或依赖有变化）
./launch.sh

# 方式2: 快速启动（日常使用，跳过依赖检查）
./quick-start.sh
```

启动后会同时运行三个服务：
- 🌐 **Web 前端**: http://localhost:3000
- 🔌 **API 服务**: http://localhost:3001/api/v1
- 🤖 **AI 服务**: http://localhost:3002 (Mock模式，无需OpenAI Key)

按 `Ctrl+C` 停止所有服务。

---

## 📋 手动启动（高级用户）

如果你需要更精细的控制，可以手动启动各个服务：

### 1. 启动基础设施

```bash
# 启动 PostgreSQL, Redis, Meilisearch
docker-compose up -d

# 验证服务状态
docker-compose ps
```

### 2. 安装依赖

```bash
# 项目使用自带的 Node.js v20.11.0，无需系统安装 Node
npm install

# 安装 concurrently（用于并行启动服务）
npm install concurrently --save-dev
```

### 3. 环境配置

```bash
# 复制环境模板（已有 .env 可跳过）
cp .env.example .env

# 如需真实 AI 功能，设置 OpenAI Key
# OPENAI_API_KEY="sk-你的真实key"
```

### 4. 启动开发服务器

```bash
# 并行启动所有服务
npx concurrently \
  "cd apps/api && npm run start:dev" \
  "cd apps/web && npm run dev" \
  "cd apps/ai && npm run dev"

# 或单独启动
cd apps/api && npm run start:dev  # API: http://localhost:3001
cd apps/web && npm run dev        # Web: http://localhost:3000
cd apps/ai && npm run dev         # AI:  http://localhost:3002
```

---

## 🔧 AI 服务模式

### Mock 模式（默认）
无需 OpenAI API Key，AI 服务返回预设的模拟回复，适合前端开发和演示。

**特点：**
- ✅ 无需配置，开箱即用
- ✅ 支持多语言（en/es/fr/de）
- ✅ 模拟流式输出
- ✅ 标记为 `[MOCK]` 便于区分

### 真实 AI 模式
如需连接真实的 OpenAI GPT-4o：

```bash
# 1. 编辑 .env 文件
OPENAI_API_KEY="sk-你的真实key"

# 2. 重启 AI 服务
```

---

## 🌐 访问应用

| URL | 描述 |
|-----|------|
| http://localhost:3000 | **主站** - 客人端 |
| http://localhost:3000/hotels | 酒店搜索与预订 |
| http://localhost:3000/partner/register | 酒店注册 |
| http://localhost:3000/dashboard/hotel | 酒店管理后台 |
| http://localhost:3001/api/v1 | API 端点 |
| http://localhost:3001/api/v1/health | 健康检查 |

---

## 👤 测试账号

运行 `npm run db:seed` 后会创建以下账号：

```
管理员:
  邮箱: admin@tiaohai.com
  密码: admin123

示例酒店:
  邮箱: hotel@example.com
  密码: hotel123

示例导游:
  邮箱: guide@example.com
  密码: guide123
```

---

## 🛠️ 常用命令

```bash
# 数据库
npm run db:studio      # 打开 Prisma Studio
npm run db:migrate     # 运行迁移
npm run db:reset       # 重置数据库

# 开发
./quick-start.sh       # 快速启动所有服务
./launch.sh            # 完整启动（含依赖安装）

# 构建
npm run build          # 构建所有包
```

---

## ❓ 故障排查

### 端口被占用
```bash
# 终止占用 3000, 3001, 3002 端口的进程
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
lsof -ti:3002 | xargs kill -9
```

### 数据库连接问题
```bash
# 重置数据库容器
docker-compose down -v
docker-compose up -d
```

### AI 服务启动失败
```bash
# 检查日志
cd apps/ai && npm run dev

# 常见问题：esbuild 版本不兼容，已改用 ts-node 运行
```

### 清除缓存
```bash
# 清除 Next.js 缓存
rm -rf apps/web/.next

# 清除 node_modules 重新安装
rm -rf node_modules apps/*/node_modules
./launch.sh
```

---

## 📁 项目结构

```
tiaohai-global/
├── apps/
│   ├── web/           # Next.js 14 前端
│   ├── api/           # NestJS 后端 API
│   └── ai/            # Fastify AI 服务
├── packages/
│   └── database/      # Prisma 数据库模型
├── docker-compose.yml # 基础设施配置
├── launch.sh          # 🔥 一键完整启动
├── quick-start.sh     # ⚡ 一键快速启动
└── README.md
```

---

## 🌟 特性状态

| 特性 | 状态 | 说明 |
|------|------|------|
| 酒店搜索 | ✅ 可用 | 含地图、筛选 |
| 预订流程 | ✅ 可用 | 模拟支付 |
| AI  concierge | ✅ Mock | 无需 OpenAI Key |
| 酒店管理后台 | ✅ 可用 | 完整的 dashboard |
| 真实支付 | ⚠️ 需配置 | 需 Stripe Key |
| 真实 AI | ⚠️ 需配置 | 需 OpenAI Key |

---

## 📞 支持

- 📧 邮箱: hello@tiaohai.com
- 📖 完整文档: README.md
- 🐛 问题反馈: 创建 GitHub Issue

---

## 🎨 B端后台系统

项目包含四个独立的后台管理端，统一使用左侧导航栏设计：

### 访问地址

| 后台 | 地址 | 说明 |
|------|------|------|
| 酒店端 | http://localhost:3000/hotel | 酒店管理房态、订单、定价 |
| 管理后台 | http://localhost:3000/admin | 平台管理酒店/导游/体验店 |
| 导游端 | http://localhost:3000/guide | 导游管理排班、订单、收入 |
| 体验店端 | http://localhost:3000/venue | 体验店管理活动、预订、结算 |

### 设计特点

- **统一风格**：深色主题 + 左侧折叠导航
- **主题色区分**：各端使用不同主题色便于区分
- **响应式**：支持侧边栏收起/展开
- **三级导航**：支持多级菜单展开
