# Tiaohai Global 项目文档

## 项目概述
AI-Native Inbound Travel OS - 面向入境游的AI原生旅游操作系统

## 核心用户
- **C端**：国外游客（英/西/法/德/日 六语）
- **B1端**：国内精品酒店（中文操作，六语输出）
- **B2端**：认证导游（中文操作，六语服务）
- **B3端**：文化体验店（中文操作，六语活动）

## 文档目录

| 文档 | 说明 |
|------|------|
| [START.md](./START.md) | 快速启动指南 |
| [QUICKSTART.md](./QUICKSTART.md) | 详细启动说明 |
| [MULTILINGUAL_WORKFLOW.md](./MULTILINGUAL_WORKFLOW.md) | 多语言工作流设计 |
| [FUNCTION_SPEC.md](./FUNCTION_SPEC.md) | 完整功能规格说明 |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) | 开发实施Checklist |

## AI三大核心能力
1. **AI内容生成** - 中文编辑 + 六语同步输出
2. **AI智能客服** - 实时翻译（外文↔中文）
3. **AI动态定价** - 多币种智能定价

## 技术栈
- 前端：Next.js 14 + Tailwind CSS + shadcn/ui
- 后端：NestJS + Prisma
- AI：OpenAI GPT-4o
- 数据库：PostgreSQL + Redis
