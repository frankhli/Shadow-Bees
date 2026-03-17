# 跳海Global 技术审计报告 v1.0

**审计日期**: 2026-03-16  
**审计人**: Archie (架构师)  
**项目版本**: v1.0.0  

---

## 执行摘要

本次审计涵盖跳海Global项目的前端(Next.js)、后端(NestJS)及数据库配置。项目目前处于**Demo/MVP阶段**，存在较多技术债务，建议在正式投产前进行系统性整改。

| 维度 | 评级 | 说明 |
|------|------|------|
| 代码质量 | ⚠️ 中风险 | 大量mock数据，组件过大 |
| 性能 | ⚠️ 中风险 | 图片未优化，bundle待分析 |
| 架构 | ⚠️ 中风险 | 数据层混乱，职责不清 |
| 安全 | ⚠️ 中风险 | 依赖Demo模式运行 |
| 可维护性 | ⚠️ 中风险 | 技术债务较多 |

---

## 1. 代码质量问题

### 1.1 【高】前端页面文件过大

**问题描述**: 
- `/apps/web/src/app/[locale]/page.tsx` 共 **835行**
- 单文件包含：页面布局、状态管理、数据获取、UI渲染、模态框逻辑

**影响**:
- 代码难以维护
- 团队协作冲突率高
- 测试困难

**整改建议**:
```typescript
// 建议拆分结构
app/[locale]/
├── page.tsx              # 50行以内，仅组装
├── components/
│   ├── HeroSection.tsx   # Hero区域
│   ├── SearchBox.tsx     # 搜索框
│   ├── CategoryFilter.tsx # 分类筛选
│   ├── HotelGrid.tsx     # 酒店网格
│   └── DatePickerModal.tsx # 日期选择弹窗
├── hooks/
│   └── useHostels.ts     # 数据获取hook
└── types/
    └── hostel.ts         # 类型定义
```

**优先级**: P0 | **预计工时**: 1-2天

---

### 1.2 【高】Mock数据占比过高

**问题描述**:
- `/apps/api/src/mock-data/` 目录共 **4,675行** 代码
- 包含：hostels.mock.ts(562行)、experiences.mock.ts(640行)、social.mock.ts(672行)
- API服务大量依赖mock数据而非真实数据库

**代码示例**:
```typescript
// hotels.service.ts - 混合使用mock
@Injectable()
export class HotelsService {
  private prisma: any
  constructor() {
    this.prisma = mockPrisma  // ❌ 使用mock而非真实Prisma
  }
}
```

**影响**:
- 无法投产
- 数据一致性差
- 测试无意义

**整改建议**:
1. 创建真实的数据库连接
2. 使用Prisma Client而非mockPrisma
3. Mock数据仅用于单元测试

**优先级**: P0 | **预计工时**: 3-5天

---

### 1.3 【中】类型定义分散且不统一

**问题描述**:
- 前端定义一套类型：`Hostel`, `HonestFacility`, `ForeignFriendly`
- 后端定义另一套类型：`CreateHotelDto`
- 数据库又有不同字段命名

**示例**:
```typescript
// frontend
interface Hostel {
  pricePerNight: number    // 前端叫这个
  foreignFriendly?: ForeignFriendly
}

// backend DTO
class CreateHotelDto {
  basePrice: number         // 后端叫这个
  hasForeignGuestLicense: boolean  // 又不一样
}
```

**整改建议**:
1. 创建共享的`packages/types`包
2. 前后端共用同一套类型定义
3. 使用Prisma生成类型作为Single Source of Truth

**优先级**: P1 | **预计工时**: 1-2天

---

### 1.4 【中】重复代码片段

**问题描述**:
- 多个Dashboard组件重复实现`StatCard`, `DataTable`
- `/apps/admin` 和 `/apps/hotel-dashboard` 有大量相似组件
- 地图相关组件逻辑重复

**整改建议**:
1. 创建`packages/ui`共享组件库
2. 提取通用组件：`StatCard`, `DataTable`, `PageHeader`
3. 统一Dashboard布局组件

**优先级**: P1 | **预计工时**: 2-3天

---

## 2. 性能问题

### 2.1 【高】图片未优化

**问题描述**:
- 使用Unsplash外链图片，无尺寸控制
- 无懒加载实现
- 无Next.js Image组件优化

**代码示例**:
```tsx
// ❌ 当前做法
<Image
  src="https://images.unsplash.com/photo-xxx?w=1920&q=80"
  alt="..."
  fill
/>

// ✅ 应该使用
<Image
  src={optimizedUrl}
  alt="..."
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  loading="lazy"
/>
```

**整改建议**:
1. 接入CDN或图片优化服务
2. 配置Next.js Image域名白名单
3. 实现图片懒加载
4. 考虑使用占位图提升LCP

**优先级**: P1 | **预计工时**: 1-2天

---

### 2.2 【中】Mapbox地图加载阻塞

**问题描述**:
- Mapbox组件在客户端动态加载
- 但loading状态简单，无骨架屏
- 首次交互延迟高

**整改建议**:
1. 添加更精致的加载骨架屏
2. 考虑静态地图作为fallback
3. 延迟加载非首屏地图

**优先级**: P2 | **预计工时**: 0.5天

---

### 2.3 【中】Bundle大小未分析

**问题描述**:
- 未配置Bundle Analyzer
- 未知各页面实际加载大小
- 可能存在重复依赖

**整改建议**:
1. 添加 `@next/bundle-analyzer`
2. 分析各路由bundle大小
3. 优化大型依赖（如recharts, mapbox-gl）

**优先级**: P2 | **预计工时**: 0.5天

---

## 3. 架构问题

### 3.1 【高】数据层架构混乱

**问题描述**:
- `auth.service.ts` 使用真实Prisma Client
- `hotels.service.ts` 使用 `mockPrisma`
- 数据库模型`@tiaohai/database`存在但未被充分利用

**架构问题**:
```
┌─────────────────────────────────────────┐
│  AuthService ──────> 真实Prisma        │
│  HotelService ─────> mockPrisma  ❌     │
│  MockDataService ──> 本地mock数据       │
└─────────────────────────────────────────┘
```

**整改建议**:
```
┌─────────────────────────────────────────┐
│  所有Service ──────> Repository层      │
│  Repository ───────> Prisma Client     │
│  Prisma ───────────> PostgreSQL        │
└─────────────────────────────────────────┘
```

**优先级**: P0 | **预计工时**: 5-7天

---

### 3.2 【中】API路由设计不一致

**问题描述**:
- 真实API: `/api/v1/hotels`
- Mock API: `/api/v1/mock/hostels`
- 混合使用导致路由混乱

**整改建议**:
1. 统一使用 `/api/v1/{resource}` 格式
2. 通过环境变量控制数据模式（mock/real）
3. 移除mock路由前缀

**优先级**: P1 | **预计工时**: 1天

---

### 3.3 【中】状态管理分散

**问题描述**:
- 使用Zustand（userStore.ts, platformStore.ts, toastStore.ts）
- 但AuthContext又是React Context实现
- 状态管理策略不统一

**整改建议**:
1. 统一使用Zustand
2. Context仅用于依赖注入
3. 分离全局状态与本地状态

**优先级**: P2 | **预计工时**: 1-2天

---

## 4. 技术债务

### 4.1 【高】硬编码敏感信息

**问题描述**:
- `docker-compose.yml` 中密码明文：`tiaohai123`
- Mapbox token可能未配置时为空
- Meilisearch master key硬编码

**整改建议**:
1. 使用环境变量管理所有敏感配置
2. 添加`.env.example`模板
3. 配置密钥管理服务（如AWS Secrets Manager）

**优先级**: P0 | **预计工时**: 0.5天

---

### 4.2 【高】AI功能使用假数据

**问题描述**:
- `/apps/web/src/lib/mock-ai.ts` 提供模拟AI响应
- 实际未接入任何AI服务（OpenAI/Claude等）
- 用户看到的AI回复是预设模板

**代码示例**:
```typescript
// mock-ai.ts
const responses = [
  { keywords: ['价格'], response: '标准间¥500起...' },  // ❌ 硬编码
]
```

**整改建议**:
1. 接入真实AI服务
2. 保留mock用于开发和测试
3. 添加AI响应缓存机制

**优先级**: P1 | **预计工时**: 3-5天

---

### 4.3 【中】环境配置不完整

**问题描述**:
- 缺少 `.env.example` 文件
- 部分配置硬编码在代码中
- 开发/生产环境配置不明确

**整改建议**:
1. 创建完整的`.env.example`
2. 使用配置验证库（如`zod`）
3. 区分开发/测试/生产环境配置

**优先级**: P1 | **预计工时**: 0.5天

---

## 5. 可维护性问题

### 5.1 【中】缺乏自动化测试

**问题描述**:
- 无单元测试
- 无集成测试
- 无E2E测试

**整改建议**:
1. 配置Jest + React Testing Library
2. 为关键业务逻辑添加单元测试
3. 配置Playwright进行E2E测试
4. 目标覆盖率：核心业务 ≥ 80%

**优先级**: P1 | **预计工时**: 5-7天（持续）

---

### 5.2 【中】代码规范未统一

**问题描述**:
- ESLint配置存在但未严格执行
- 代码风格不一致（引号、分号等）
- 缺少Prettier配置

**整改建议**:
1. 统一ESLint规则
2. 添加Prettier配置
3. 配置git hooks自动格式化
4. CI中增加代码检查

**优先级**: P2 | **预计工时**: 0.5天

---

### 5.3 【低】文档缺失

**问题描述**:
- API文档缺失
- 架构文档缺失
- 部署文档缺失

**整改建议**:
1. 使用Swagger/OpenAPI生成API文档
2. 编写架构决策记录(ADR)
3. 完善README和部署指南

**优先级**: P2 | **预计工时**: 2-3天

---

## 6. 数据库设计评估

### 6.1 当前设计

```sql
-- 基础表结构合理
users (id, email, password, role, status)
hotels (id, user_id, name, city, address, facilities, photos)
```

### 6.2 建议优化

**缺少的表**:
- `rooms` - 房型独立表（目前JSONB嵌套）
- `bookings` - 预订订单表
- `reviews` - 评价表
- `payments` - 支付记录表
- `guides` - 导游表
- `experiences` - 体验产品表

**字段建议**:
```sql
-- 建议添加
ALTER TABLE hotels ADD COLUMN search_vector tsvector;  -- 全文搜索
ALTER TABLE hotels ADD COLUMN deleted_at TIMESTAMP;     -- 软删除
CREATE INDEX idx_hotels_city ON hotels(city);          -- 城市索引
CREATE INDEX idx_hotels_location ON hotels USING gist(  -- 地理位置索引
  ll_to_earth(lat, lng)
);
```

---

## 7. 改进建议优先级汇总

### P0 - 投产前必须完成（1-2周）

| 序号 | 问题 | 预计工时 | 负责人建议 |
|------|------|----------|------------|
| 1 | 替换mock数据为真实数据库 | 5-7天 | Backend |
| 2 | 修复硬编码敏感信息 | 0.5天 | DevOps |
| 3 | 拆分超大型组件 | 1-2天 | Frontend |
| 4 | 统一类型定义 | 1-2天 | Fullstack |

### P1 - 高优先级（2-4周）

| 序号 | 问题 | 预计工时 | 负责人建议 |
|------|------|----------|------------|
| 5 | 接入真实AI服务 | 3-5天 | Backend |
| 6 | 图片优化 | 1-2天 | Frontend |
| 7 | 统一API路由 | 1天 | Backend |
| 8 | 提取共享组件库 | 2-3天 | Frontend |
| 9 | 配置测试框架 | 5-7天 | Fullstack |
| 10 | 完善环境配置 | 0.5天 | DevOps |

### P2 - 中优先级（后续迭代）

| 序号 | 问题 | 预计工时 | 负责人建议 |
|------|------|----------|------------|
| 11 | 统一状态管理 | 1-2天 | Frontend |
| 12 | 地图加载优化 | 0.5天 | Frontend |
| 13 | Bundle分析 | 0.5天 | Frontend |
| 14 | 代码规范统一 | 0.5天 | Fullstack |
| 15 | 完善文档 | 2-3天 | Tech Lead |

---

## 8. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
|  mock数据导致无法投产 | 高 | 高 | 立即启动真实数据库迁移 |
| 敏感信息泄露 | 中 | 高 | 清理硬编码密钥，启用密钥管理 |
| 性能问题影响用户体验 | 中 | 中 | 优先进行图片和bundle优化 |
| 代码难以维护 | 高 | 中 | 组件拆分，建立代码规范 |

---

## 9. 结论与建议

### 总体评价

跳海Global项目目前处于**功能演示阶段**，代码结构能够支撑MVP展示，但距离生产环境有较大差距。

### 投产建议

**不建议当前版本直接投产**。建议完成以下核心整改后再考虑上线：

1. ✅ 移除所有mock数据，接入真实数据库
2. ✅ 清理所有硬编码敏感信息
3. ✅ 建立基础测试覆盖
4. ✅ 完成性能优化（图片、bundle）

### 技术债务偿还计划

建议采用**"追赶式"**偿还策略：

- **第1-2周**: P0问题全部解决
- **第3-4周**: P1问题逐步解决
- **持续迭代**: P2问题在后续sprint中处理

### 资源建议

- 需要1名资深Backend工程师专注数据层重构
- 需要1名Frontend工程师专注组件拆分和优化
- 建议引入DevOps角色管理部署和配置

---

**报告完成** | Archie 🏗️ | 2026-03-16
