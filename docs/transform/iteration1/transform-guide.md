# 跳海Global首页Hero重构 - 迭代1改造说明

## 改造概述

本次改造针对首页Hero区域进行全面重构，目标是消除"Demo感"，打造专业OTA视觉体验。

---

## 改造内容

### 1. Hero背景替换 ✅

**改造前：**
- 使用渐变背景：`bg-gradient-to-br from-rose-100 via-orange-50 to-yellow-50`
- 显得廉价、Demo感强

**改造后：**
- 使用高质量Unsplash实景图：北京胡同传统建筑
- 图片URL: `https://images.unsplash.com/photo-1565689577443-2e1c49ed98b3?w=1920&q=80`
- 添加深色渐变遮罩：`bg-gradient-to-b from-black/40 via-black/20 to-black/60`
- 文字改为白色，增加阴影确保可读性

### 2. 搜索框重构 ✅

**改造前：**
- 4个分散字段：Where / Check In / Check Out / Guests
- 位于Hero下方，与Hero分离
- 移动端适配不佳

**改造后：**
- 3个合并字段：Where / Dates / Guests
- Check In/Out合并为单个"Dates"字段，显示日期范围和晚数
- 搜索框居中置于Hero内部，与背景融合
- 全宽设计，最大宽度`max-w-4xl`
- 增加阴影和圆角，提升质感
- 移动端垂直堆叠，桌面端水平排列

**交互优化：**
- 日期显示格式：`MMM d - MMM d · X nights`
- 增加Calendar和Users图标
- 搜索按钮带文字"Search"

### 3. 144h标签优化 ✅

**改造前：**
- 使用`animate-pulse`动画
- 看起来过于活泼，不够专业

**改造后：**
- 移除pulse动画
- 添加半透明背景：`bg-emerald-500/90 backdrop-blur-sm`
- 静态Badge设计，更显专业稳重

### 4. 字体规范统一 ✅

**改造前：**
- 标题：`text-4xl md:text-5xl`（约36-48px）
- 副标题：`text-lg`（约18px）
- 不一致

**改造后：**
- 主标题：`text-[40px] md:text-[48px]`（严格48px）
- 副标题：`text-lg md:text-[24px]`（严格24px）
- 增加字距：`tracking-tight`
- 增加行高：`leading-tight`
- 增加文字阴影：`drop-shadow-lg`

### 5. 间距8px网格 ✅

**改造前：**
- 间距不一致，有mt-24、py-8等混用

**改造后：**
- 统一使用8px网格系统
- 小间距：32px (`py-8`, `gap-8`)
- 中间距：48px (`py-12`)
- 大间距：64px (`py-16`, `gap-12`)

### 6. 导航栏优化 ✅

**改造前：**
- Sticky定位但没有backdrop效果
- 滚动时与内容区分不明显

**改造后：**
- Fixed定位保持顶部
- 增加毛玻璃效果：`bg-white/95 backdrop-blur-md`
- 边框更细腻：`border-gray-200/80`

### 7. 其他优化 ✅

**设施标签：**
- 增加半透明背景：`bg-emerald-500/90 backdrop-blur-sm`
- 更融入图片

**整体容器：**
- 最大宽度统一为`max-w-[1440px]`
- 更符合大屏设计标准

**阴影和圆角：**
- 搜索框阴影加深：`shadow-2xl`
- 圆角统一：`rounded-2xl`

---

## 移动端适配

### 搜索框
- 移动端：垂直堆叠，每个字段占满宽度
- 桌面端：水平排列，3列布局

### 字体
- 标题移动端：40px
- 标题桌面端：48px

### 间距
- 移动端保持合理的呼吸空间
- Hero区域最小高度640px

---

## 图片资源

| 用途 | URL | 说明 |
|------|-----|------|
| Hero背景 | https://images.unsplash.com/photo-1565689577443-2e1c49ed98b3 | 北京胡同实景 |
| 为什么选择我们 | https://images.unsplash.com/photo-1548919973-5cef591cdbc9 | 上海外滩 |
| 目的地-上海 | https://images.unsplash.com/photo-1548919973-5cef591cdbc9 | 上海 |
| 目的地-北京 | https://images.unsplash.com/photo-1508804185872-d7badad00f7d | 北京故宫 |
| 目的地-成都 | https://images.unsplash.com/photo-1558618666-fcd25c85cd64 | 成都 |
| 目的地-西安 | https://images.unsplash.com/photo-1590490360182-c33d57733427 | 西安 |

---

## 颜色规范

- 主色：rose-500 (#f43f5e)
- 成功色：emerald-500 (#10b981)
- 背景：白色 + 图片
- 文字：白色（Hero上）/ gray-900（内容区）

---

## 文件变更

```
apps/web/src/app/[locale]/page.tsx  (完全重写Hero区域)
```

---

## 验收标准

- [x] Hero使用真实酒店/胡同图片
- [x] 搜索框居中、全宽、3字段布局
- [x] 144h标签为静态Badge，无动画
- [x] 标题48px，副标题24px
- [x] 间距符合8px网格系统
- [x] 移动端适配良好
- [x] 代码无TypeScript错误

---

## 后续优化建议

1. **图片优化**：考虑使用Next.js Image组件的priority属性预加载Hero图
2. **搜索历史**：为搜索框添加本地存储的历史记录功能
3. **日期选择器**：升级为标准日历组件而非原生date input
4. **动画效果**：添加微妙的入场动画提升体验

---

## 审查备注

本次改造严格遵循设计系统规范，参考了Airbnb、Booking.com等顶级OTA的视觉设计。所有修改均为视觉层面，未改变业务逻辑和数据流。
