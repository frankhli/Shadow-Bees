# 任务文档：i18n专项诊断

## 任务ID
TIAOHAI-I18N-DIAGNOSIS-001

## 前置任务
阶段2已完成，但发现语言切换问题（切换ES/FR/DE显示英文）

## 核心问题
**现象：** 切换语言后，页面仍显示英文，不是对应语言
**已排除：** 翻译文件存在（覆盖率94-98%）
**需定位：** 为什么翻译文件存在但显示英文

## 可能原因（需要验证）
1. **fallback机制** - 翻译缺失时自动回退到英文
2. **动态数据未翻译** - API返回英文数据
3. **组件未接入i18n** - 某些组件直接写死英文
4. **路由问题** - [locale]路由配置有问题

## 诊断方法

### 方法1：代码审查
- 检查next-intl配置（middleware.ts, i18n.ts）
- 检查[locale]路由是否正确传递语言参数
- 检查组件是否正确使用t()函数

### 方法2：运行时调试
- 启动本地开发服务器
- 切换ES/FR/DE语言
- 检查浏览器Network，看是否加载对应语言文件
- 检查Console是否有i18n相关错误

### 方法3：对比分析
- 日语为什么相对正常？
- 英/西/法/德有什么共同问题？

## 具体诊断步骤

1. **检查配置文件**
   - apps/web/middleware.ts
   - apps/web/i18n.ts
   - apps/web/next.config.js

2. **检查关键页面**
   - apps/web/src/app/[locale]/page.tsx
   - apps/web/src/app/[locale]/hotels/page.tsx
   - apps/web/src/app/[locale]/layout.tsx

3. **检查组件**
   - 检查Hero组件是否使用t()
   - 检查HotelCard组件是否使用t()
   - 检查Search组件是否使用t()

4. **运行时测试**
   - 启动dev服务器
   - 访问/es、/fr、/de
   - 对比实际显示vs预期

## 产出要求

**必须产出：**
1. 问题根因分析（为什么显示英文）
2. 具体问题清单（文件+行号+问题描述）
3. 修复方案（优先级排序）
4. 修复工作量估算

## 参与Agent
- **architect** — 技术方案、代码审查
- **dev_alex** — 代码审查、运行时调试
- **multilingual_auditor** — 验证翻译完整性、语言适配

## 产出文件位置
```
/home/node/workspace-host/tiaohai-global/docs/redesign/
├── i18n-diagnosis/
│   ├── root-cause.md (根因分析)
│   ├── problem-list.md (问题清单)
│   ├── solution.md (修复方案)
│   └── effort-estimate.md (工作量估算)
```

## 时间要求
6小时内完成诊断

## 下一步
诊断完成后 → 进入阶段3（开发实施，优先修复i18n问题）

---
*任务创建：小贝*  
*创建时间：2026-03-15 10:46 UTC*  
*优先级：P0（阻塞后续开发）*
