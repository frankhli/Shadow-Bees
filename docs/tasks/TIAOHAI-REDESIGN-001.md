# 任务文档：跳海Global游客端改造评估

## 任务ID
TIAOHAI-REDESIGN-001

## 任务来源
Frank需求：验证22-Agent工作流闭环

## 项目背景
**跳海Global** (tiaohai-global) - AI驱动的入境游酒店服务平台

### 现状问题
游客端网站(https://tiaohai.com)已上线但体验差：
1. **界面丑陋** - 看起来像Demo，有假图片
2. **语言硬编码** - 切换语言不完全，只有日语相对完整
3. **Mock数据** - 部分数据是API层生成的假数据
4. **整体感觉假** - 不像真实可用的产品

### 核心功能（已实现）
- ✅ AI内容自动生成 + 海外社媒分发
- ✅ 7×24小时AI多语言客服（EN/ES/FR/DE/JA）
- ✅ 酒店/青旅/导游/体验店展示
- ✅ 跳转Booking或直接预订（比Booking便宜）
- ✅ 5种语言切换（但适配不完整）

## 本次任务目标
评估当前游客端现状，输出改造方案（PRD级别）

**注意：** 本次任务只到PRD/设计阶段，不实际开发，不部署生产环境

## 阶段1：需求共创（并行评审）

### 参与Agent
- **pm_mike** (产品经理) - 梳理用户体验痛点，定义改造范围
- **hospitality_expert** (酒店专家) - 评估酒店展示是否符合行业惯例
- **legal_expert** (法务) - 审核多语言内容的合规风险
- **multilingual_auditor** (多语言审核) - 评估5种语言实际覆盖率

### 评审维度

#### pm_mike 负责：用户体验评估
- 当前网站用户旅程分析
- 与Booking/Airbnb的竞品对比
- 改造优先级排序（界面 vs 功能 vs 内容）
- 改造范围定义（首页/详情页/预订流程/其他）

#### hospitality_expert 负责：行业适配评估
- 酒店信息展示是否完整（设施、政策、位置）
- 青旅特色是否突出（社交氛围、活动等）
- 预订流程是否符合入境游客习惯
- 与OTA平台的差异化是否清晰

#### legal_expert 负责：合规风险评估
- 多语言用户协议/隐私政策是否齐全
- 不同国家（欧盟GDPR等）的数据合规
- 预订取消政策是否清晰合规
- 图片版权风险提示

#### multilingual_auditor 负责：语言完整性评估
- 5种语言（EN/ES/FR/DE/JA）的实际覆盖率
- 硬编码问题定位和统计
- 翻译质量评估
- i18n技术方案建议

## 产出要求

每个Agent需在2小时内完成评估，输出：
1. 当前现状分析（问题清单）
2. 改造建议（优先级排序）
3. 风险提醒（如有）

## 质量门禁
**必须4方都确认后，才能进入阶段2（设计评审）**

## 文件位置
- 任务文档：`/home/node/workspace-host/tiaohai-global/docs/tasks/TIAOHAI-REDESIGN-001.md`
- 代码仓库：`/home/node/workspace-host/tiaohai-global/`
- 产出目录：`/home/node/workspace-host/tiaohai-global/docs/redesign/`

## 下一步
阶段2：设计评审（ designer + ui_designer + product_manager + architect）

---
*任务创建：小贝*  
*创建时间：2026-03-15 10:05 UTC*  
*标签：#需求评审 #工作流测试*
