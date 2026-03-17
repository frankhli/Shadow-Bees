# SearchBox 设计对比

## 视觉对比

### Before (旧版搜索框)
```
┌────────────────────────────────────────────────────────────┐
│ Where              Check In    Check Out    Guests  │ 🔍  │
│ Search dest...     Add date    Add date     2 guest │     │
└────────────────────────────────────────────────────────────┘
背景: 白色卡片 (bg-white)
圆角: rounded-2xl
阴影: shadow-xl
按钮: 纯色 bg-rose-500
```

### After (新版 - Hero 变体)
```
┌─────────────────────────────────────────────────────────────────┐
│ 🔍 Where          📅 Dates             👥 Guests      │ Search │
│ Search...         Jan 1 - Jan 5        2 guests       │   🔍   │
├─────────────────────────────────────────────────────────────────┤
│ Must-have: 🚽 Western Toilet 🛗 Elevator 🇬🇧 English 🛂 Visa │
└─────────────────────────────────────────────────────────────────┘
背景: 深色 (bg-gray-900)
文字: 白色
圆角: rounded-full (桌面端)
按钮: 渐变 bg-gradient-to-r from-rose-500 to-rose-600
```

## Airbnb 风格参考

### 设计元素
1. **悬浮搜索框**: 位于 Hero 区域底部，负 margin 上移
2. **分段式布局**: 三个字段使用分隔线区分
3. **点击展开**: 点击后展开下拉选择器
4. **设施筛选**: 底部快速筛选标签

### 交互参考
| Airbnb | SearchBox | 状态 |
|--------|-----------|------|
| 深色背景 | 深色背景 | ✅ |
| 圆角药丸形 | rounded-full | ✅ |
| 字段分隔线 | border-r | ✅ |
| 红色搜索按钮 | 玫瑰红渐变 | ✅ |
| 悬停高亮 | hover:bg-gray-800 | ✅ |

## Booking.com 移动端参考

### 移动端布局
```
┌─────────────────┐
│ 📍 Where to?    │
│ Shanghai        │
├─────────────────┤
│ 📅 Dates        │
│ Jan 1 - Jan 5   │
├─────────────────┤
│ 👥 Guests       │
│ 2 guests        │
├─────────────────┤
│    SEARCH       │
└─────────────────┘
```

### 实现状态
- [x] 移动端垂直堆叠
- [x] 全宽搜索按钮
- [x] 点击展开选择器
- [ ] 日历组件（待升级）

## 截图位置

### 桌面端 Hero 区域
```
位置: 首页顶部，Hero 区域底部
预期效果:
- 深色搜索框悬浮在渐变背景上
- 三个字段水平排列
- 红色搜索按钮右对齐
- 底部设施筛选标签
```

### 移动端
```
位置: 首页 Hero 下方
预期效果:
- 全宽搜索框
- 垂直堆叠字段
- 底部全宽搜索按钮
```

### 日期选择弹窗
```
触发: 点击 Dates 字段
内容:
- Check In 日期选择
- Check Out 日期选择
- Clear / Apply 按钮
```

### 客人选择弹窗
```
触发: 点击 Guests 字段
内容:
- Adults 数量调节
- 增减按钮
- Done 按钮
```

## 截图获取方式

由于环境限制，无法直接截图。验证方式：

1. **本地启动开发服务器**
   ```bash
   cd /home/node/workspace-host/tiaohai-global/apps/web
   npm run dev
   ```

2. **访问首页**
   - 桌面端: http://localhost:3000
   - 移动端: 使用浏览器 DevTools 模拟

3. **截图保存位置**
   ```
   /docs/transform/iteration1/screenshots/
   ├── desktop-hero.png
   ├── mobile-hero.png
   ├── date-picker.png
   └── guest-picker.png
   ```
