# SearchBox 搜索组件

## 概述

SearchBox 是跳海Global的核心搜索组件，参考 Airbnb 和 Booking.com 的设计风格，提供统一的搜索体验。

## 功能特性

### 1. 字段合并
- **Where**: 目的地搜索，支持热门城市快速选择
- **Dates**: Check In/Out 日期选择，合并显示
- **Guests**: 客人数量选择（1-16人）

### 2. 视觉设计
- **Hero 变体**: 深色背景 + 白色文字，适用于首页 Hero 区域
- **Sticky 变体**: 白色背景 + 阴影，适用于滚动后的导航栏
- **Default 变体**: 标准卡片样式

### 3. 交互优化
- 点击字段展开对应的下拉选择器
- 日期选择器防止无效日期（checkout < checkin）
- 客人数量增减按钮带限制
- 点击外部区域自动关闭弹窗

### 4. 按钮设计
- 红色渐变 CTA 按钮
- 仅在所有必填字段填写后才可点击
- 悬停时轻微放大效果

### 5. 响应式
- 桌面端：水平排列，三个字段 + 搜索按钮
- 移动端：垂直堆叠，底部全宽搜索按钮

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'hero' \| 'sticky' \| 'default'` | `'default'` | 组件视觉变体 |
| `className` | `string` | `''` | 自定义类名 |
| `onSearch` | `(params: SearchParams) => void` | `undefined` | 搜索回调函数 |

## SearchParams 接口

```typescript
interface SearchParams {
  location: string      // 搜索地点
  checkIn: Date | null  // 入住日期
  checkOut: Date | null // 退房日期
  guests: number        // 客人数
}
```

## 使用示例

### 基础用法
```tsx
import SearchBox from '@/components/search/SearchBox'

// Hero 变体 - 首页使用
<SearchBox variant="hero" />

// Sticky 变体 - 滚动导航
<SearchBox variant="sticky" />

// 默认变体
<SearchBox />
```

### 自定义回调
```tsx
import SearchBox, { SearchParams } from '@/components/search/SearchBox'

const handleSearch = (params: SearchParams) => {
  console.log('搜索参数:', params)
  // 执行搜索逻辑
}

<SearchBox variant="hero" onSearch={handleSearch} />
```

## 设施筛选

组件内置了针对外国旅客的设施筛选选项：

| 筛选项 | ID | 图标 |
|--------|-----|------|
| Western Toilet | `western_toilet` | 🚽 |
| Elevator | `elevator` | 🛗 |
| English Staff | `english_staff` | 🇬🇧 |
| Visa Help | `visa_assistance` | 🛂 |
| Card Payment | `international_payment` | 💳 |

## 样式说明

### Hero 变体
- 背景: `bg-gray-900`
- 文字: 白色
- 边框: 半透明灰色
- 搜索按钮: 玫瑰红渐变

### 响应式断点
- `md:` (768px): 桌面端水平布局
- 移动端: 垂直堆叠布局

## 文件位置

```
/home/node/workspace-host/tiaohai-global/apps/web/src/components/search/SearchBox.tsx
```

## 依赖

- `lucide-react`: 图标库
- `date-fns`: 日期格式化
- `next/navigation`: 路由导航

## 更新记录

### v1.0.0 (2026-03-16)
- 初始版本发布
- 实现三个字段合并
- 支持日期选择弹窗
- 支持客人数量选择
- 设施筛选功能
- 响应式布局
