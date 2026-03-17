# 任务文档：跳海Global游客端(C端)改造设计评审

## 任务ID
TIAOHAI-REDESIGN-002

## 前置任务
TIAOHAI-REDESIGN-001（需求共创）已完成，4方评估已确认

## 本次任务范围（明确边界）
**只改C端网站（游客端 tiaohai.com），其他一律不动**
- ✅ 首页（Hero + 酒店列表）
- ✅ 酒店详情页
- ✅ 预订流程
- ✅ AI客服界面
- ✅ 多语言切换
- ❌ B端后台（hotel-dashboard）— 保持中文，不改
- ❌ 导游端 — 不改
- ❌ 体验店端 — 不改

## 核心问题（来自阶段1评估）
1. **视觉问题** — 看起来像Demo，需要专业OTA级设计
2. **内容问题** — Mock数据假，需要"真实感"的假数据
3. **硬编码问题** — C端存在中文硬编码，需要全部找出并修复

## 阶段2：设计评审（并行）

### 参与Agent
- **designer** — 重新设计首页、酒店详情页、预订流程（解决"看起来像Demo"）
- **ui_designer** — 制定视觉规范（颜色、字体、图片风格、组件库）
- **product_manager** — 确认设计符合PRD需求
- **architect** — 技术方案：找出C端所有硬编码 + i18n修复方案

### 各Agent具体任务

#### designer 负责：
1. 重新设计首页（Hero区域、酒店列表、筛选器）
2. 重新设计酒店详情页（图片展示、设施清单、预订CTA）
3. 重新设计预订流程（日期选择、房型选择、支付）
4. 输出Figma设计稿

#### ui_designer 负责：
1. 制定视觉规范（参考Booking/Airbnb专业感）
2. 定义图片风格（Unsplash图库选型）
3. 定义颜色系统（主色、辅助色、背景色）
4. 定义字体规范（标题、正文、标签）

#### product_manager 负责：
1. 确认设计符合阶段1 PRD需求
2. 确认用户旅程流畅
3. 确认与竞品（Booking）差异化保持
4. 确认功能优先级

#### architect 负责（重点：硬编码排查）：
1. **全面扫描C端代码，找出所有中文硬编码**
   - 扫描路径：apps/web/app/[locale]/*
   - 扫描所有.tsx, .ts文件
   - 列出所有硬编码中文及其位置
2. 制定i18n修复方案
   - 如何提取到翻译文件
   - 如何确保不遗漏
3. 图片加载技术方案
   - Unsplash API接入
   - 图片优化（懒加载、响应式）

### 产出要求

**designer + ui_designer：**
- Figma设计稿链接
- 设计规范文档（颜色、字体、组件）

**architect：**
- 硬编码清单（文件路径 + 代码行 + 建议修复方式）
- i18n技术方案文档
- 图片加载技术方案

**product_manager：**
- 设计评审意见
- 功能确认清单

### 产出文件位置
```
/home/node/workspace-host/tiaohai-global/docs/redesign/
├── stage2/
│   ├── design-figma.md (Figma链接)
│   ├── design-system.md (设计规范)
│   ├── hardcoded-list.md (硬编码清单) ⭐ 重点
│   ├── i18n-solution.md (i18n修复方案)
│   └── design-review.md (产品评审意见)
```

## 质量门禁
**必须4方都确认后，才能进入阶段3（技术方案）**

## 关键验收点
1. 设计不再像Demo，有专业OTA感
2. 硬编码清单完整（C端所有中文硬编码都找出）
3. i18n修复方案可行
4. 产品确认设计符合需求

## 下一步
阶段3：技术方案（dev_alex + engineer + devops）

---
*任务创建：小贝*  
*创建时间：2026-03-15 10:18 UTC*  
*标签：#设计评审 #C端改造 #工作流测试*
