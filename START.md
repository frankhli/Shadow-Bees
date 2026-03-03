# 🚀 Tiaohai Global - 启动指南

## 快速开始（30秒启动）

```bash
cd tiaohai-global

# 方式1: 首次使用或长时间未使用
./launch.sh

# 方式2: 日常开发（更快）
./quick-start.sh
```

启动后访问：
- 🌐 **前端**: http://localhost:3000
- 🔌 **API**: http://localhost:3001/api/v1
- 🤖 **AI**: http://localhost:3002

---

## 启动脚本说明

### launch.sh - 完整启动
**适用场景**：首次使用、依赖有变化、环境损坏

**功能**：
- ✅ 自动启动 Docker 数据库
- ✅ 自动安装/修复 npm 依赖
- ✅ 生成 Prisma Client
- ✅ 运行数据库迁移
- ✅ 并行启动所有服务

**耗时**：2-5 分钟（首次）

### quick-start.sh - 快速启动
**适用场景**：日常开发、依赖已安装

**功能**：
- ✅ 启动 Docker 数据库
- ✅ 直接启动所有服务（跳过依赖检查）

**耗时**：10-30 秒

---

## 环境要求

### 必须
- Docker Desktop（运行 PostgreSQL, Redis, Meilisearch）
- VPN（推荐，加速 npm 安装）

### 不需要
- ❌ 系统安装 Node.js（项目自带 v20.11.0）
- ❌ 配置 OpenAI Key（默认 Mock 模式）
- ❌ 配置 Stripe Key（默认模拟支付）

---

## 端口占用

默认使用以下端口：

| 服务 | 端口 |
|------|------|
| Web 前端 | 3000 |
| API 服务 | 3001 |
| AI 服务 | 3002 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| Meilisearch | 7700 |

如端口被占用，先终止占用进程：
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
lsof -ti:3002 | xargs kill -9
```

---

## 常见问题

### Q: 启动时报错 "Cannot find module"
A: 使用 `./launch.sh` 重新安装依赖

### Q: AI 服务返回 "[MOCK]"
A: 这是正常的 Mock 模式。如需真实 AI，在 `.env` 中设置 `OPENAI_API_KEY`

### Q: 如何查看服务日志？
A: 启动脚本使用 concurrently 运行，日志会显示在终端，带颜色区分不同服务：
- `[API]` 蓝色 - API 服务
- `[WEB]` 绿色 - Web 前端
- `[AI]` 黄色 - AI 服务

### Q: 如何单独启动某个服务？
A: 
```bash
cd apps/api && npm run start:dev   # 只启动 API
cd apps/web && npm run dev         # 只启动 Web
cd apps/ai && npm run dev          # 只启动 AI
```

### Q: 数据库在哪里？
A: 使用 Docker 运行，数据保存在 Docker Volume 中，重启不会丢失。

如需重置数据库：
```bash
docker-compose down -v
docker-compose up -d
```

---

## 下一步

1. **访问前端**: http://localhost:3000
2. **查看 API 文档**: http://localhost:3001/api/v1/health
3. **详细指南**: 查看 [QUICKSTART.md](./QUICKSTART.md)
4. **完整文档**: 查看 [README.md](./README.md)

---

## 🎨 B端后台访问

项目包含四个B端后台，共用 localhost:3000 端口：

| 端 | 访问路径 | 用户类型 | 主题色 |
|------|---------|---------|--------|
| 酒店端 | http://localhost:3000/hotel | 国内酒店 | 🔵 青色 |
| 管理后台 | http://localhost:3000/admin | 平台运营 | 🟣 紫色 |
| 导游端 | http://localhost:3000/guide | 认证导游 | 🟢 绿色 |
| 体验店端 | http://localhost:3000/venue | 体验店店主 | 🟠 橙色 |

> 注：当前为UI框架，数据需连接后端API后展示
