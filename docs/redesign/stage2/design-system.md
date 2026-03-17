# 跳海Global 视觉设计规范 V1.0

> 项目代号：TIAOHAI-REDESIGN-002  
> 版本：1.0  
> 日期：2026-03-15  
> 设计师：Ivan

---

## 1. 设计方向

### 1.1 设计目标
- **专业感**：参考Booking.com的权威感，让用户放心预订
- **高级感**：参考Linear的精致细节，提升品牌调性
- **温暖感**：参考Airbnb的人情味，传达旅行愉悦

### 1.2 设计语言
- **清晰**：信息层级明确，减少认知负担
- **留白**：内容呼吸，不拥挤
- **克制**：少即是多，避免过度设计

---

## 2. 颜色系统

### 2.1 主色调（Brand Colors）

```
Primary Blue
- 500: #0066FF (主色，CTA按钮)
- 600: #0052CC (悬停状态)
- 700: #003D99 (按下状态)
- 400: #3385FF (禁用状态)
- 50:  #F0F6FF (背景强调)
```

**使用场景：**
- 主要CTA按钮（预订、搜索）
- 价格标签
- 链接文字
- 选中状态
- 品牌标识

### 2.2 中性色（Neutral Scale）

```
Gray Scale
- 950: #0F172A (主要文字 - 标题)
- 900: #1E293B (正文)
- 700: #334155 (次要文字)
- 500: #64748B (辅助文字、标签)
- 400: #94A3B8 (占位符、禁用)
- 300: #CBD5E1 (分割线)
- 200: #E2E8F0 (边框)
- 100: #F1F5F9 (卡片背景)
- 50:  #F8FAFC (页面背景)
```

**使用场景：**
- 标题/正文层级
- 边框和分割线
- 卡片背景
- 表单占位符

### 2.3 语义色（Semantic Colors）

```
Success (成功)
- 500: #10B981
- 50:  #ECFDF5

Warning (警告)
- 500: #F59E0B
- 50:  #FFFBEB

Error (错误)
- 500: #EF4444
- 50:  #FEF2F2

Info (信息)
- 500: #3B82F6
- 50:  #EFF6FF
```

**使用场景：**
- 表单验证反馈
- 系统通知
- 价格变动提示
- 库存状态

### 2.4 辅助色（Accent Colors）

```
Accent Teal (特色强调)
- 500: #14B8A6
- 用于：特价标签、会员标识

Accent Coral (温暖强调)
- 500: #FF6B6B
- 用于：促销标签、热门推荐

Accent Purple (品牌延展)
- 500: #8B5CF6
- 用于：VIP等级、特殊功能
```

---

## 3. 字体规范

### 3.1 字体家族

```
主字体（中文）：
- 标题：PingFang SC (苹方)
- 正文：PingFang SC
- 备用：Microsoft YaHei, Noto Sans SC

西文字体：
- 标题：Inter, -apple-system
- 正文：Inter, system-ui
- 备用：SF Pro Text, Segoe UI

代码/数字：
- Inter, SF Mono, monospace
```

### 3.2 字体层级（Typography Scale）

| 层级 | 大小 | 行高 | 字重 | 字间距 | 使用场景 |
|------|------|------|------|--------|----------|
| **H1** | 36px | 44px | 700 | -0.02em | 首页大标题 |
| **H2** | 28px | 36px | 600 | -0.015em | 页面标题 |
| **H3** | 24px | 32px | 600 | -0.01em | 区块标题 |
| **H4** | 20px | 28px | 600 | -0.005em | 卡片标题 |
| **H5** | 18px | 26px | 600 | 0 | 小标题 |
| **Body Large** | 18px | 28px | 400 | 0 | 引导文字 |
| **Body** | 16px | 26px | 400 | 0 | 正文 |
| **Body Small** | 14px | 22px | 400 | 0 | 描述文字 |
| **Caption** | 12px | 18px | 500 | 0.02em | 标签、辅助信息 |
| **Overline** | 11px | 16px | 600 | 0.05em | 分类标签（大写） |

### 3.3 字体使用规则

**标题规范：**
- H1-H3 使用深色（Gray-950）
- H4-H5 可适当使用主色（Primary-500）强调

**正文规范：**
- 主要正文：Gray-900
- 次要文字：Gray-700
- 辅助/禁用：Gray-500/400

**特殊规范：**
- 价格：Inter, font-weight 700, Primary-500
- 折扣价：Gray-500, text-decoration: line-through
- 标签：Uppercase, letter-spacing 0.05em

---

## 4. 间距系统

### 4.1 基础间距（Spacing Scale）

```
Base Unit: 4px

4:   4px   (xs)
8:   8px   (sm)
12:  12px  (md)
16:  16px  (base)
20:  20px  
24:  24px  (lg)
32:  32px  (xl)
40:  40px  
48:  48px  (2xl)
64:  64px  (3xl)
80:  80px  (4xl)
96:  96px  (5xl)
```

### 4.2 间距应用

| 场景 | 内边距 | 外边距 |
|------|--------|--------|
| 页面容器 | 24px (mobile) / 48px (desktop) | - |
| 卡片 | 16-24px | 16px |
| 按钮 | 12px 24px | - |
| 表单输入框 | 12px 16px | 16px |
| 列表项 | 16px | 0 |
| 区块间隔 | - | 64-96px |

---

## 5. 圆角规范

```
Border Radius Scale

0:   0px     (无圆角 - 分割线)
4:   4px     (小 - 按钮、标签)
8:   8px     (中 - 输入框、小卡片)
12:  12px    (大 - 卡片、图片)
16:  16px    (特大 - 大卡片、模态框)
24:  24px    (超大 - 首页模块)
9999: 9999px (全圆 - Pill按钮、头像)
```

---

## 6. 阴影规范

```
Shadow Scale

xs:   0 1px 2px 0 rgb(0 0 0 / 0.05)
sm:   0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
md:   0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
lg:   0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
xl:   0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
```

**使用场景：**
- `xs`: 按钮默认状态
- `sm`: 输入框聚焦状态
- `md`: 卡片默认
- `lg`: 卡片悬停、下拉菜单
- `xl`: 模态框、弹层

---

## 7. 图片风格

### 7.1 Unsplash 图库选型指南

**搜索关键词（中文/英文）：**

| 场景 | 推荐关键词 | 风格说明 |
|------|------------|----------|
| 酒店外观 | luxury hotel, boutique hotel exterior | 建筑摄影，黄金时刻光线 |
| 客房内景 | hotel room interior, luxury bedroom | 整洁明亮，自然光 |
| 度假酒店 | resort, beach resort, pool villa | 热带风情，蓝色调 |
| 商务酒店 | business hotel, modern hotel lobby | 现代简约，商务氛围 |
| 特色民宿 | boutique accommodation, cozy room | 温暖人情味 |
| 城市景观 | city skyline, urban night view | 高清夜景 |
| 美食 | hotel breakfast, restaurant dining | 精致摆盘，暖色调 |
| 设施 | hotel gym, spa, swimming pool | 高端设施展示 |

### 7.2 图片处理规范

**尺寸比例：**
- 酒店封面图：16:9 (1920×1080)
- 客房图片：4:3 (800×600)
- 缩略图：1:1 (400×400)
- 头像：1:1 (200×200)

**处理规则：**
- 圆角：12px（封面图）/ 8px（缩略图）
- 暗角：如需叠加文字，添加渐变遮罩
  ```css
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%);
  ```
- 滤镜：轻微提高饱和度（+10%），增加对比度（+5%）

### 7.3 图片质量要求

- 分辨率：最低 1920px 宽度
- 格式：WebP（优先），JPEG（备用）
- 压缩：质量 80-85%，文件 < 500KB
- 加载：Lazy loading，渐进式加载

---

## 8. 组件规范

### 8.1 按钮（Button）

#### 主按钮（Primary Button）

```
尺寸：高度 48px，内边距 12px 24px
圆角：8px
字体：16px / 600字重
颜色：
  - 默认：bg-#0066FF, text-white
  - 悬停：bg-#0052CC, shadow-sm
  - 按下：bg-#003D99
  - 禁用：bg-#3385FF, opacity-0.5
```

#### 次按钮（Secondary Button）

```
尺寸：高度 48px，内边距 12px 24px
圆角：8px
字体：16px / 600字重
颜色：
  - 默认：bg-white, border-#E2E8F0, text-#0066FF
  - 悬停：bg-#F0F6FF
  - 按下：bg-#E2E8F0
```

#### 文字按钮（Text Button）

```
尺寸：高度 auto，内边距 8px 12px
字体：16px / 500字重
颜色：
  - 默认：text-#0066FF
  - 悬停：underline, bg-#F0F6FF
```

#### 图标按钮（Icon Button）

```
尺寸：40px × 40px
圆角：8px
图标尺寸：20px
颜色：同主按钮或次按钮
```

### 8.2 卡片（Card）

#### 酒店卡片（Hotel Card）

```
结构：
┌─────────────────────────────┐
│  [图片 16:9, 圆角12px]        │
│  ★★★★★ 标签                  │
├─────────────────────────────┤
│  酒店名称 (H4)                 │
│  📍位置信息 (Caption)          │
│  ⭐评分 9.2 · 1,234条评价      │
│                              │
│  ¥888起/晚          [查看]   │
└─────────────────────────────┘

样式：
- 宽度：自适应，最小 280px
- 背景：white
- 圆角：12px
- 阴影：shadow-md (悬停时 shadow-lg)
- 内边距：图片无内边距，内容区 16px
- 悬停：translateY(-4px)，过渡 200ms ease-out
```

#### 搜索卡片（Search Card）

```
结构：
┌───────────────────────────────────────┐
│  🏨 目的地                              │
│  ┌─────────────────────────────────┐  │
│  │ 请输入城市或酒店名称              │  │
│  └─────────────────────────────────┘  │
├───────────────────────────────────────┤
│  📅 入住日期    →    📅 退房日期       │
├───────────────────────────────────────┤
│  👥 房客                                  │
│  ┌─────────────────────────────────┐  │
│  │ 2成人 · 0儿童                   │  │
│  └─────────────────────────────────┘  │
├───────────────────────────────────────┤
│  [      🔍 搜索酒店       ]            │
└───────────────────────────────────────┘

样式：
- 背景：white
- 圆角：16px
- 阴影：shadow-lg
- 内边距：24px
- 输入框：边框 #E2E8F0，聚焦边框 #0066FF
```

### 8.3 表单组件

#### 输入框（Input）

```
尺寸：高度 48px，内边距 12px 16px
圆角：8px
边框：1px solid #E2E8F0
背景：white
字体：16px

状态：
- 默认：border-#E2E8F0
- 聚焦：border-#0066FF, shadow-sm (0 0 0 3px rgba(0,102,255,0.1))
- 错误：border-#EF4444
- 禁用：bg-#F1F5F9, text-#94A3B8
```

#### 下拉选择（Select）

```
样式同输入框，右侧添加下拉箭头图标
下拉菜单：
- 圆角：8px
- 阴影：shadow-lg
- 选项高度：44px
- 选项悬停：bg-#F0F6FF
- 选中项：bg-#0066FF, text-white
```

#### 日期选择（Date Picker）

```
输入框样式同 Input
日历面板：
- 圆角：12px
- 阴影：shadow-xl
- 头部：#0066FF 背景，白色文字
- 选中日期：bg-#0066FF
- 范围选中：bg-#F0F6FF
- 悬停日期：bg-#F0F6FF
```

### 8.4 标签（Tag）

```
尺寸：高度 24px，内边距 4px 12px
圆角：9999px (pill shape)
字体：12px / 500字重

类型：
- 默认：bg-#F1F5F9, text-#64748B
- 品牌：bg-#F0F6FF, text-#0066FF
- 成功：bg-#ECFDF5, text-#10B981
- 警告：bg-#FFFBEB, text-#F59E0B
- 促销：bg-#FF6B6B, text-white
```

### 8.5 导航（Navigation）

#### 顶部导航（Header）

```
高度：72px
背景：white
阴影：0 1px 0 0 #E2E8F0 (底部边框)
内容：
- 左侧：Logo (高度 32px)
- 中间：导航链接（间距 32px）
- 右侧：语言切换、货币、登录/注册

链接样式：
- 默认：text-#64748B
- 悬停：text-#0066FF
- 当前页：text-#0066FF, font-weight-600
```

#### 底部导航（Footer）

```
背景：#0F172A (Gray-950)
文字：#94A3B8 (Gray-400)
链接悬停：white
内边距：64px 48px

结构：
- 上部：多列链接
- 下部：版权信息、社交媒体图标
```

### 8.6 评分组件

```
星星评分：
- 尺寸：16px
- 填充：#F59E0B (琥珀色)
- 空白：#E2E8F0

分数显示：
- 背景：#0066FF
- 文字：white, 14px, bold
- 圆角：4px
- 内边距：4px 8px

评价数量：
- 颜色：#64748B
- 字体：14px
```

### 8.7 加载状态

```
骨架屏（Skeleton）：
- 背景：linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)
- 动画：shimmer 1.5s infinite
- 圆角：同对应组件

加载指示器：
- 尺寸：24px (按钮内) / 48px (页面)
- 颜色：#0066FF
- 动画：旋转 1s linear infinite
```

---

## 9. 页面布局规范

### 9.1 栅格系统

```
Desktop (≥1280px): 12列，间距 24px
Tablet (768-1279px): 8列，间距 20px
Mobile (<768px): 4列，间距 16px

最大宽度：1440px
容器内边距：48px (桌面) / 24px (移动)
```

### 9.2 断点设置

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 9.3 页面结构

```
首页布局：
┌─────────────────────────────┐
│         Header              │  72px
├─────────────────────────────┤
│                             │
│    Hero + Search Card       │  500-600px
│                             │
├─────────────────────────────┤
│      Popular Destinations   │  400px
├─────────────────────────────┤
│      Featured Hotels        │  600px
├─────────────────────────────┤
│      Why Choose Us          │  400px
├─────────────────────────────┤
│      Testimonials           │  400px
├─────────────────────────────┤
│         Footer              │  300px
└─────────────────────────────┘
```

---

## 10. 动效规范

### 10.1 过渡时间

```
即时反馈：100ms
标准过渡：200ms
入场动画：300ms
页面切换：400ms
```

### 10.2 缓动函数

```
默认：cubic-bezier(0.4, 0, 0.2, 1)
入场：cubic-bezier(0, 0, 0.2, 1)
出场：cubic-bezier(0.4, 0, 1, 1)
弹性：cubic-bezier(0.34, 1.56, 0.64, 1)
```

### 10.3 常见动效

| 场景 | 效果 | 参数 |
|------|------|------|
| 按钮悬停 | 背景色变化 + 轻微上移 | translateY(-1px), 200ms |
| 卡片悬停 | 上浮 + 阴影增强 | translateY(-4px), shadow-lg, 200ms |
| 页面加载 | 淡入 + 上移 | opacity 0→1, translateY(20px→0), 400ms |
| 模态框 | 淡入 + 缩放 | opacity 0→1, scale(0.95→1), 200ms |
| 下拉菜单 | 淡入 + 下落 | opacity 0→1, translateY(-10px→0), 200ms |
| 骨架屏 | 闪烁动画 | shimmer, 1.5s infinite |

---

## 11. 图标规范

### 11.1 图标库

```
主图标库：Lucide React (或 Heroicons)
图标尺寸：
- xs: 12px
- sm: 16px
- md: 20px
- lg: 24px
- xl: 32px
```

### 11.2 常用图标映射

| 场景 | 图标名称 |
|------|----------|
| 搜索 | Search |
| 位置 | MapPin |
| 日历 | Calendar |
| 用户 | User |
| 收藏 | Heart |
| 分享 | Share2 |
| 评分 | Star |
| 筛选 | SlidersHorizontal |
| 箭头 | ChevronRight / ChevronDown |
| 成功 | CheckCircle |
| 错误 | XCircle |
| 警告 | AlertTriangle |
| 信息 | Info |

---

## 12. 设计原则检查清单

### 一致性检查
- [ ] 所有按钮使用统一的圆角和高度
- [ ] 颜色只使用规范中的色值
- [ ] 间距遵循 4px 网格系统
- [ ] 字体层级清晰可辨

### 可访问性检查
- [ ] 文字与背景对比度 ≥ 4.5:1
- [ ] 交互元素最小点击区域 44×44px
- [ ] 图片都有 alt 文本
- [ ] 支持键盘导航

### 视觉层次检查
- [ ] 重要内容视觉权重更高
- [ ] 留白充足，不拥挤
- [ ] 视觉流向自然（F型或Z型）

### 品牌调性检查
- [ ] 配色传达专业可信感
- [ ] 细节精致，无廉价感
- [ ] 图片风格统一高质量

---

## 13. 参考资源

### 设计参考
- Linear.app - 精致细节、动效
- Vercel.com - 技术感、排版
- Booking.com - 专业感、信息架构
- Airbnb.com - 温暖感、图片运用

### 工具资源
- Unsplash.com - 高质量图片
- Lucide.dev - 图标库
- Tailwind CSS - 设计系统实现
- Figma - 设计工具

---

## 附录：Token 命名规范

```css
/* 颜色 */
--color-primary-500: #0066FF;
--color-neutral-950: #0F172A;
--color-success-500: #10B981;

/* 间距 */
--space-4: 4px;
--space-8: 8px;
--space-16: 16px;

/* 字体 */
--font-sans: 'Inter', 'PingFang SC', sans-serif;
--text-h1: 700 36px/44px var(--font-sans);

/* 圆角 */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;

/* 阴影 */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

---

*文档完成时间：2026-03-15 10:45 UTC*  
*下一步：设计稿制作 → 组件库开发 → 前端实现*
