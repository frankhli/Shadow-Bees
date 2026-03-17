# 跳海Global - C端UI设计文档 V1

**设计师**: Ivan (UI Designer)  
**日期**: 2026-03-16  
**项目**: 跳海Global 入境游酒店预订平台  
**目标用户**: 外国游客（欧美日西德）  
**风格定位**: 现代、简洁、专业、有跳海品牌调性

---

## 一、设计系统 (Design System)

### 1.1 颜色系统

#### 品牌色 (Brand Colors)
```
主色 (Primary):       #0D7377 (深海青 - 代表跳海的海洋基因)
主色深 (Primary Dark): #084749
主色浅 (Primary Light): #E8F4F4

辅色 (Secondary):      #FF6B6B (珊瑚红 - 活力、年轻)
辅色浅 (Secondary Light): #FFF0F0

强调色 (Accent):       #FFB347 (暖橙 - 用于价格、CTA)
```

#### 中性色 (Neutral Colors)
```
黑色:    #1A1A2E (标题、主要文字)
深灰:    #4A4A68 (次要文字)
中灰:    #8A8AA3 (辅助文字、图标)
浅灰:    #E8E8EF (边框、分割线)
背景灰:  #F5F5FA (页面背景、卡片背景)
纯白:    #FFFFFF (卡片、输入框背景)
```

#### 语义色 (Semantic Colors)
```
成功: #10B981
警告: #F59E0B
错误: #EF4444
信息: #3B82F6
```

### 1.2 字体系统

#### 字体选择
- **标题字体**: Inter (现代、清晰、国际化)
- **正文字体**: Inter
- **中文回退**: PingFang SC, Microsoft YaHei
- **日文回退**: Hiragino Sans, Yu Gothic

#### 字体层级
```
Display 1:    48px / 600 / -0.02em  (Hero大标题)
Display 2:    36px / 600 / -0.01em  (页面标题)

Heading 1:    28px / 600 / -0.01em  (区块标题)
Heading 2:    22px / 600 / 0        (卡片标题)
Heading 3:    18px / 600 / 0        (小节标题)

Body Large:   16px / 400 / 0.01em   (正文强调)
Body:         14px / 400 / 0.01em   (正文)

Caption:      12px / 400 / 0.02em   (辅助文字)
Overline:     11px / 600 / 0.05em   (标签、小标题)
```

### 1.3 间距系统

```
基础单位: 4px

xs:   4px
sm:   8px
md:   12px
lg:   16px
xl:   24px
2xl:  32px
3xl:  48px
4xl:  64px
5xl:  96px
```

#### 页面边距
- 桌面端: 64px (两侧)
- 平板端: 32px
- 移动端: 16px

### 1.4 圆角系统

```
sm:   4px  (按钮、输入框、小标签)
md:   8px  (卡片、图片)
lg:   12px (大卡片、模态框)
xl:   16px (Hero图片、特色区块)
full: 9999px (圆形元素)
```

### 1.5 阴影系统

```
sm:   0 1px 2px rgba(0,0,0,0.05)
md:   0 4px 12px rgba(0,0,0,0.08)
lg:   0 12px 40px rgba(0,0,0,0.12)
```

---

## 二、首页设计 (Homepage)

### 2.1 整体布局

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                         │
│  [Logo]  [Explore ▼]  [Saved]  [Messages]  [EN ▼]  [Sign In]   │
├─────────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │     "Discover China's Hidden Gems"                      │   │
│  │                                                         │   │
│  │     Authentic stays curated by locals,                │   │
│  │     designed for global travelers                     │   │
│  │                                                         │   │
│  │     ┌─────────────────────────────────────────────┐    │   │
│  │     │  📍 Where to?      📅 Dates      👥 Guests │    │   │
│  │     │  Search destinations...                      │    │   │
│  │     └─────────────────────────────────────────────┘    │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│  FEATURED DESTINATIONS                                          │
│  "Explore Top Cities"                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  Beijing │ │ Shanghai │ │ Shenzhen │ │ Chengdu  │ │Guangzhou│ │
│  │  [Img]   │ │  [Img]   │ │  [Img]   │ │  [Img]   │ │ [Img]  │ │
│  │  2,340   │ │  3,120   │ │  1,890   │ │  1,456   │ │ 2,234  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  FEATURED LISTINGS                                              │
│  "Trending Stays This Week"                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │  [Hotel Img] │ │  [Hotel Img] │ │  [Hotel Img] │            │
│  │  ★ 4.92     │ │  ★ 4.88     │ │  ★ 4.95     │            │
│  │  Hotel Name  │ │  Hotel Name  │ │  Hotel Name  │            │
│  │  Beijing     │ │  Shanghai    │ │  Chengdu     │            │
│  │  $89/night   │ │  $120/night  │ │  $65/night   │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
├─────────────────────────────────────────────────────────────────┤
│  WHY TIAOHAI                                                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │   🏠    │ │   🌐    │ │   💬    │ │   ✓     │               │
│  │Curated  │ │Local    │ │24/7     │ │Verified │               │
│  │Stays    │ │Experts  │ │Support  │ │Hosts    │               │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘               │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
│  [About] [Support] [Hosting] [Policies]  [Social Icons]        │
│  © 2026 Tiaohai Global                                          │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Hero区域详解

**视觉描述：**
- **背景**: 全宽Hero图片，展示北京胡同或上海外滩夜景，使用Unsplash高质量图
- **蒙层**: 底部渐变遮罩 (transparent → rgba(0,0,0,0.4))，确保文字可读性
- **高度**: 70vh (桌面), 50vh (移动)

**内容：**
- 主标题: "Discover China's Hidden Gems" (Display 1, 白色)
- 副标题: "Authentic stays curated by locals, designed for global travelers" (Body Large, 白色80%透明度)

**搜索框设计：**
```
┌────────────────────────────────────────────────────────────────┐
│  📍  Where are you going?      │  📅  Add dates    │  🔍      │
│  Search destinations...        │                   │ Search   │
└────────────────────────────────────────────────────────────────┘
背景: 白色
圆角: 16px
阴影: lg
高度: 72px
内边距: 16px

悬停状态:
- 搜索按钮背景从 #0D7377 → #084749
- 整体阴影加深
```

### 2.3 热门城市区块

**城市卡片设计：**
```
┌─────────────────┐
│                 │
│   [City Image]  │
│                 │
│   ┌───────────┐ │
│   │ City Name │ │
│   │ X stays   │ │
│   └───────────┘ │
└─────────────────┘

图片: 240px × 320px
圆角: 12px
对象适配: cover

文字叠加:
- 位置: 底部
- 背景: linear-gradient(transparent, rgba(0,0,0,0.6))
- 内边距: 16px
- 城市名: 18px 白色 600
- 房源数: 14px 白色 80%

悬停效果:
- 图片放大 1.05x
- 阴影: lg
- 过渡: 300ms ease
```

**5个城市配置：**
1. **Beijing** - 故宫/胡同 (https://images.unsplash.com/photo-1508804185872-d7badad00f7d)
2. **Shanghai** - 外滩夜景 (https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403)
3. **Shenzhen** - 现代都市 (https://images.unsplash.com/photo-1598135753163-6167c1a1ad65)
4. **Chengdu** - 宽窄巷子 (https://images.unsplash.com/photo-1564603380-8b506d2a9a6a)
5. **Guangzhou** - 珠江夜景 (https://images.unsplash.com/photo-1583489766408-4f74f2f780ef)

### 2.4 导航栏

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo]                     [Explore] [Saved] [Messages] [EN ▼] [Sign In] │
└─────────────────────────────────────────────────────────────────┘

高度: 72px
背景: 透明 (滚动后白色 + md阴影)
Logo: 跳海Logo + "Global" 标签

滚动后状态:
背景: rgba(255,255,255,0.95)
背景模糊: blur(12px)
边框: 1px solid #E8E8EF
```

**语言选择器：**
```
[EN ▼] 点击展开:
├── 🇺🇸 English
├── 🇪🇸 Español  
├── 🇫🇷 Français
├── 🇩🇪 Deutsch
└── 🇯🇵 日本語
```

---

## 三、酒店卡片组件 (Hotel Card)

### 3.1 标准卡片设计

```
┌──────────────────────────────────┐
│                                  │
│    [主图 - 16:10比例]              │
│                                  │
│    ❤️  ← 收藏按钮 (右上角)         │
│                                  │
├──────────────────────────────────┤
│ ★ 4.92                           │
│ Boutique Hutong Courtyard        │
│ Nanluoguxiang, Beijing           │
│                                  │
│ $89 USD / night                  │
│                                  │
└──────────────────────────────────┘

尺寸: 300px × 380px (桌面)
背景: 白色
圆角: 12px
阴影: sm (hover: md)

图片区域:
- 比例: 16:10
- 圆角: 12px (仅顶部)
- 图片轮播: 底部小圆点指示器

文字区域:
- 内边距: 16px
- 评分: 14px, 金色 #FFB347, 左对齐
- 酒店名: 16px, 黑色, 600, 单行省略
- 位置: 14px, 深灰, 单行省略
- 价格: 16px, 黑色, 600
- 单位: 14px, 深灰, 400
```

### 3.2 卡片状态

**默认状态：**
- 阴影: sm
- 图片: 正常

**Hover状态：**
```
- 阴影: md
- 图片: scale(1.03)
- 过渡: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
- 收藏按钮: 透明度 0 → 1
```

**加载状态：**
```
- 骨架屏: 灰色渐变脉冲动画
- 图片: #E8E8EF
- 文字: 3行灰色条
```

### 3.3 收藏按钮

```
位置: 图片右上角, top: 12px, right: 12px
尺寸: 32px × 32px
背景: rgba(0,0,0,0.4)
图标: 心形 ♡
颜色: 白色

Hover:
- 背景: rgba(0,0,0,0.6)
- 图标: 填充红色

已收藏:
- 图标: ♥ 填充 #FF6B6B
- 背景: rgba(255,107,107,0.2)
```

### 3.4 图片轮播指示器

```
位置: 图片底部居中, bottom: 12px
样式: 5个小圆点
大小: 6px
间距: 6px
颜色: rgba(255,255,255,0.5)
当前: 白色

切换动画: 滑动 300ms ease
```

---

## 四、酒店详情页 (Hotel Detail)

### 4.1 页面布局

```
┌─────────────────────────────────────────────────────────────────┐
│  NAVBAR (简化版)                                                │
│  [Logo]  [Search bar]                    [Saved] [Messages] [Profile]│
├─────────────────────────────────────────────────────────────────┤
│  IMAGE GALLERY                                                  │
│  ┌───────────────────────────────┬─────────────┬─────────────┐ │
│  │                               │  [Image 2]  │  [Image 3]  │ │
│  │      [Main Image]             ├─────────────┼─────────────┤ │
│  │                               │  [Image 4]  │  [Image 5]  │ │
│  └───────────────────────────────┴─────────────┴─────────────┘ │
│                                         [Show all photos →]    │
├─────────────────────────────────────────────────────────────────┤
│  MAIN CONTENT                                                   │
│  ┌─────────────────────────────────────┬─────────────────────┐ │
│  │  Boutique Hutong Courtyard          │  BOOKING CARD       │ │
│  │  ★ 4.92 · 128 reviews · Superhost   │                     │ │
│  │                                     │  ┌───────────────┐  │ │
│  │  Nanluoguxiang, Dongcheng District  │  │ $89 / night   │  │ │
│  │  Beijing, China                     │  ├───────────────┤  │ │
│  │                                     │  │ Check-in  │   │  │ │
│  │  ────────────────────────────────   │  │ Check-out │   │  │ │
│  │  ENTIRE COURTYARD · 2 GUESTS        │  │ Guests    │   │  │ │
│  │  1 bedroom · 1 bed · 1 bath         │  │ ▼ 2 guests    │  │ │
│  │                                     │  ├───────────────┤  │ │
│  │  [Icon list: WiFi, Kitchen, AC...]  │  │ [Reserve]     │  │ │
│  │                                     │  │ You won't be    │  │ │
│  │  ────────────────────────────────   │  │ charged yet     │  │ │
│  │  ABOUT THIS PLACE                   │  │                 │  │ │
│  │  Experience authentic Beijing       │  │ Price breakdown │  │ │
│  │  living in this beautifully...      │  │ $89 × 5 nights  │  │ │
│  │  [Show more]                        │  │ Cleaning fee    │  │ │
│  │                                     │  │ Service fee     │  │ │
│  │  ────────────────────────────────   │  │ ─────────────   │  │ │
│  │  WHERE YOU'LL SLEEP                 │  │ Total: $XXX     │  │ │
│  │  [Bedroom Image]                    │  └───────────────┘  │ │
│  │  Bedroom 1 · 1 queen bed            │                     │ │
│  │                                     │                     │ │
│  │  ────────────────────────────────   │                     │ │
│  │  WHAT THIS PLACE OFFERS             │                     │ │
│  │  🛜 WiFi      🍳 Kitchen            │                     │ │
│  │  ❄️ AC        🧺 Washer             │                     │ │
│  │  [Show all 24 amenities]            │                     │ │
│  │                                     │                     │ │
│  │  ──────────────────────────────────┤                     │ │
│  │  REVIEWS                          │                     │ │
│  │  ★ 4.92 · 128 reviews             │                     │ │
│  │  [Rating breakdown]               │                     │ │
│  │  [Review cards...]                │                     │ │
│  └─────────────────────────────────────┴─────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  HOST SECTION                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  [Avatar]  Hosted by Sarah  ·  Superhost  ·  3 years      │ │
│  │                                                           │ │
│  │  Hi, I'm Sarah! I love sharing my family courtyard...     │ │
│  │  Response rate: 100%  ·  Response time: within an hour    │ │
│  │                                                           │ │
│  │  [Contact host]                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│  LOCATION                                                       │
│  [Map placeholder]                                              │
│  Nanluoguxiang, Dongcheng District, Beijing                    │
├─────────────────────────────────────────────────────────────────┤
│  THINGS TO KNOW                                                 │
│  [House rules] [Safety & property] [Cancellation policy]       │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 图片画廊

**布局：**
- 主图: 左侧 50% 宽度, 全高
- 右侧: 2×2 网格, 每张 25% 宽度
- 间距: 8px
- 圆角: 12px (外边框)
- 图片间隙: 8px

**悬停效果：**
```
- 主图: 亮度降低 5%
- 显示 "View" 按钮在中心
- 过渡: 200ms ease
```

**图片数量处理：**
- 1张: 全宽展示
- 2-3张: 50/50 或 60/40 分栏
- 4-5张: 上述标准布局
- 5+张: 显示 "+X more" 覆盖层在最后一张

### 4.3 预订卡片 (Booking Card)

**定位：**
- 桌面: 右侧 sticky, top: 100px
- 宽度: 380px
- 背景: 白色
- 圆角: 16px
- 阴影: lg
- 边框: 1px solid #E8E8EF

**内容结构：**
```
┌────────────────────────────┐
│ $89 USD / night            │
│ ★ 4.92 · 128 reviews       │
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │ CHECK-IN      CHECK-OUT│ │
│ │ 03/20         03/25    │ │
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │ GUESTS              ▼  │ │
│ │ 2 guests               │ │
│ └────────────────────────┘ │
├────────────────────────────┤
│ [    CHECK AVAILABILITY   ]│
│ 或 [      RESERVE         ]│
│ You won't be charged yet   │
├────────────────────────────┤
│ $89 × 5 nights    $445     │
│ Cleaning fee      $30      │
│ Service fee       $52      │
│ ─────────────────────────  │
│ Total before taxes $527    │
└────────────────────────────┘
```

**输入框样式：**
```
边框: 1px solid #8A8AA3
圆角: 8px
高度: 56px
内边距: 12px 16px

Focus状态:
- 边框: 2px solid #0D7377
- 标签上浮动画
```

**预订按钮：**
```
背景: #0D7377 → #084749 (hover)
文字: 白色, 16px, 600
高度: 48px
圆角: 8px
宽度: 100%

Hover:
- 背景加深
- 轻微上移 translateY(-1px)
- 阴影: md
```

### 4.4 评分区块

**评分展示：**
```
★ 4.92 · 128 reviews

分解:
Cleanliness      ████████░░ 4.8
Accuracy         ████████░░ 4.9
Communication    █████████░ 4.9
Location         █████████░ 5.0
Check-in         ████████░░ 4.8
Value            █████████░ 4.9
```

**评价卡片：**
```
┌────────────────────────────────┐
│ [Avatar]  John D.   ·  Jan 2024│
│ 🇺🇸 United States               │
│                                │
│ Amazing stay! Sarah was        │
│ incredibly helpful and the     │
│ location is perfect for...     │
│ [Show more]                    │
│                                │
│ [Helpful]                      │
└────────────────────────────────┘

背景: 白色
圆角: 12px
内边距: 16px
宽度: 50% (两列布局)
```

### 4.5 房东信息区块

```
┌──────────────────────────────────────────────────────┐
│ [Avatar 64px]  Hosted by Sarah                       │
│               Superhost · Joined in 2021             │
├──────────────────────────────────────────────────────┤
│ Sarah is a Superhost · Superhosts are experienced,   │
│ highly rated hosts who are committed to providing    │
│ great stays for guests.                              │
│                                                      │
│ Hi! I'm Sarah, a Beijing native who loves sharing    │
│ our beautiful courtyard house with travelers from    │
│ around the world. I enjoy...                         │
│                                                      │
│ Response rate: 100%                                  │
│ Response time: within an hour                        │
│                                                      │
│ [Contact Host]                                       │
└──────────────────────────────────────────────────────┘

头像: 64px 圆形
边框: 2px solid #0D7377 (如果是Superhost)
背景: #F5F5FA
圆角: 16px
```

---

## 五、组件规范汇总

### 5.1 按钮组件

**Primary Button (CTA):**
```
背景: #0D7377
文字: 白色, 16px, 600
高度: 48px
内边距: 12px 24px
圆角: 8px

Hover: 背景 #084749, translateY(-1px), shadow-md
Active: 背景 #052829, translateY(0)
Disabled: 背景 #E8E8EF, 文字 #8A8AA3
```

**Secondary Button:**
```
背景: 白色
边框: 1px solid #1A1A2E
文字: #1A1A2E, 16px, 600
高度: 48px
圆角: 8px

Hover: 背景 #F5F5FA
```

**Ghost Button:**
```
背景: transparent
文字: #0D7377, 16px, 600
Hover: 背景 #E8F4F4
```

**Icon Button:**
```
尺寸: 40px × 40px
圆角: full (圆形)
背景: 白色
阴影: sm
Hover: 阴影 md, scale(1.05)
```

### 5.2 输入框组件

**Text Input:**
```
高度: 48px
边框: 1px solid #E8E8EF
圆角: 8px
内边距: 12px 16px
字体: 14px
Placeholder: #8A8AA3

Focus: 
- 边框: 2px solid #0D7377
- 阴影: 0 0 0 3px rgba(13,115,119,0.1)

Error:
- 边框: #EF4444
- 错误提示: 12px #EF4444
```

**Search Input:**
```
高度: 56px
圆角: 28px (pill shape)
背景: 白色
阴影: md
左侧图标: Search icon

Focus:
- 阴影: lg
- 边框: 无
```

### 5.3 标签组件

**City Tag:**
```
背景: #F5F5FA
边框: 1px solid #E8E8EF
圆角: 20px (pill)
内边距: 8px 16px
字体: 14px

Hover: 背景 #E8E8EF
Selected: 背景 #0D7377, 文字白色
```

**Amenity Tag:**
```
背景: 白色
边框: 1px solid #E8E8EF
圆角: 8px
内边距: 12px 16px
字体: 14px
图标: 左侧 20px
```

**Price Tag:**
```
背景: #0D7377
文字: 白色
圆角: 4px
内边距: 4px 8px
字体: 12px, 600
```

### 5.4 加载状态

**Skeleton Loading:**
```
背景: linear-gradient(90deg, #E8E8EF 25%, #F5F5FA 50%, #E8E8EF 75%)
背景大小: 200% 100%
动画: shimmer 1.5s infinite
圆角: 4px
```

**Spinner:**
```
尺寸: 24px (small), 32px (medium), 48px (large)
颜色: #0D7377
边框: 3px solid
动画: rotate 1s linear infinite
```

---

## 六、响应式设计

### 6.1 断点系统

```
Mobile:     < 640px
Tablet:     640px - 1024px
Desktop:    1024px - 1440px
Large:      > 1440px
```

### 6.2 首页响应式

**Mobile (< 640px):**
```
- Hero高度: 50vh
- 搜索框: 全宽, 堆叠布局
- 城市卡片: 横向滚动, 卡片宽度 160px
- 酒店卡片: 2列网格, 卡片高度 280px
- 导航: 底部固定Tab栏
```

**Tablet (640px - 1024px):**
```
- Hero高度: 60vh
- 城市卡片: 3列网格
- 酒店卡片: 3列网格
- 导航: 顶部简化版
```

**Desktop (> 1024px):**
```
- 完整布局
- 城市卡片: 5列网格
- 酒店卡片: 4列网格
```

### 6.3 详情页响应式

**Mobile:**
```
- 图片画廊: 横向轮播
- 预订卡片: 固定在底部 (sticky bottom)
- 内容区域: 单栏
- 评价: 单栏
```

**Desktop:**
```
- 图片画廊: 2×3 网格
- 预订卡片: 右侧 sticky
- 内容区域: 主内容 + 侧边栏
- 评价: 双列网格
```

---

## 七、Unsplash图片资源

### 7.1 城市图片

```
Beijing:
- https://images.unsplash.com/photo-1508804185872-d7badad00f7d (故宫)
- https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b (长城)

Shanghai:
- https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403 (外滩夜景)
- https://images.unsplash.com/photo-1548919973-5cef591cdbc9 (陆家嘴)

Shenzhen:
- https://images.unsplash.com/photo-1598135753163-6167c1a1ad65 (平安中心)

Chengdu:
- https://images.unsplash.com/photo-1564603380-8b506d2a9a6a (宽窄巷子)

Guangzhou:
- https://images.unsplash.com/photo-1583489766408-4f74f2f780ef (珠江)
```

### 7.2 酒店图片 (示例)

```
胡同四合院:
- https://images.unsplash.com/photo-1566073771259-6a8506099945 (庭院)
- https://images.unsplash.com/photo-1582719478250-c89cae4dc85b (房间)

现代公寓:
- https://images.unsplash.com/photo-1522708323590-d24dbb6b0267 (客厅)
- https://images.unsplash.com/photo-1502672260266-1c1ef2d93688 (公寓)

江景房:
- https://images.unsplash.com/photo-1618773928121-c32242e63f39 (江景)
```

---

## 八、设计原则总结

### 8.1 视觉层次
1. **重要**: Hero标题 > 酒店名称 > 价格
2. **次要**: 位置 > 评分 > 设施
3. **辅助**: 描述 > 政策 > 房东信息

### 8.2 交互反馈
1. **即时**: 按钮hover、输入框focus
2. **过渡**: 卡片hover 300ms ease
3. **加载**: Skeleton、Spinner
4. **成功**: Toast提示、页面过渡

### 8.3 无障碍考虑
1. 对比度: 文字与背景至少 4.5:1
2. 焦点: 所有可交互元素有清晰focus状态
3. 语义: 正确使用HTML标签
4. 触摸目标: 最小 44px × 44px

---

## 九、待确认事项

1. 品牌Logo是否需要更新
2. 具体功能优先级排序
3. 动效详细需求
4. 暗黑模式支持计划

---

**设计完成时间**: 2026-03-16  
**设计师**: Ivan 🖌️  
**审核状态**: 等待小贝审核
