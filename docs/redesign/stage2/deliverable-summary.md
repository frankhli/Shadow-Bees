# 跳海Global C端网站重设计 - Stage 2 交付文档

**任务ID**: TIAOHAI-REDESIGN-002  
**设计师**: Diana (UX Designer)  
**交付日期**: 2026-03-15  
**预计开发时间**: 3天 (配合Stage 1开发计划)

---

## 📦 交付物清单

### 1. 设计系统文档
**文件**: `design-system.md`
- 完整的色彩系统 (Primary/Neutral/Semantic)
- 字体系统规范
- 间距和圆角系统
- 阴影和动效规范
- 组件设计规范

### 2. 线框图 (Wireframes)
**位置**: `wireframes/`

| 文件 | 内容 | 预览方式 |
|------|------|----------|
| `home-wireframe.html` | 首页完整线框图 | 浏览器打开 |
| `hotels-wireframe.html` | 酒店列表页 | 浏览器打开 |
| `detail-wireframe.html` | 酒店详情页 | 浏览器打开 |
| `checkout-wireframe.html` | 预订流程 | 浏览器打开 |

### 3. Figma设计稿 (规划中)
**状态**: 当前阶段提供线框图，Figma设计稿后续补充

---

## 🎯 设计目标达成情况

### 设计目标
- [x] **专业OTA级视觉**: 参考Booking/Airbnb设计规范
- [x] **不再像Demo**: 详细的组件规范和交互说明
- [x] **诚实设施突出**: 核心差异化在设计中得到强化
- [x] **完整页面覆盖**: 首页、列表、详情、预订流程

### 具体改进

#### 1. 首页 (Homepage)
**改进前**:
- 渐变背景缺乏质感
- 搜索框不够突出
- 信息层次不清晰

**改进后**:
- Hero区域使用高质量图片+暗色遮罩
- 搜索框悬浮设计，视觉焦点明确
- 144小时免签标签突出展示
- 卡片展示诚实设施预览

#### 2. 酒店列表 (Hotels List)
**改进前**:
- 筛选器过于简单
- 卡片信息密度低
- 缺少动效

**改进后**:
- 筛选器重设计，支持移动端抽屉
- 卡片展示完整诚实设施状态
- 添加hover动效 (translateY + scale)

#### 3. 酒店详情 (Hotel Detail)
**改进前**:
- 图片展示不够专业
- 诚实设施清单不够突出
- 预订卡片不够醒目

**改进后**:
- 2列图片画廊布局
- 诚实设施清单使用绿色背景突出
- 预订卡片sticky定位
- 快速验证3列展示

#### 4. 预订流程 (Checkout)
**改进前**:
- 步骤不清晰
- 表单过于密集
- 缺少安全信任元素

**改进后**:
- 顶部步骤指示器
- 表单分组设计
- 订单摘要始终可见
- 取消政策明确展示

---

## 🎨 核心设计亮点

### 1. 诚实设施清单 (Honest Facility Checklist)
这是跳海的核心差异化，设计中做了特别强化：

```
设计要点:
- 绿色渐变背景 (emerald-50 to teal-50)
- 2x2 网格布局展示4个关键设施
- 图标 + 名称 + 描述的三层信息
- "为什么这很重要" 说明卡片
- 快速验证区域 (预订卡片中)
```

### 2. 搜索体验优化
```
改进点:
- 悬浮在Hero下方 (-mt-24)
- 圆角更大 (rounded-3xl)
- 阴影更强 (shadow-2xl)
- 输入区域hover效果
- 清晰的标签 (Where/Check In/Check Out/Who)
```

### 3. 卡片动效系统
```css
/* Hover动效 */
.hotel-card {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hotel-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hotel-card:hover .image {
  transform: scale(1.05);
}
```

### 4. 移动端适配
```
响应式断点:
- sm: 640px - 酒店卡片2列
- md: 768px - 导航完整显示
- lg: 1024px - 详情页两栏布局
- xl: 1280px - 酒店卡片4列
```

---

## 📝 开发注意事项

### 1. 图片处理
```tsx
// 推荐实现
<Image
  src={hotelImage}
  alt={hotelName}
  fill
  className="object-cover transition-transform duration-300 group-hover:scale-105"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  loading="lazy"
/>
```

### 2. 颜色变量更新
需要更新 `tailwind.config.ts`:
```js
colors: {
  primary: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',  // 主色
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  }
}
```

### 3. 组件优先级
**P0 - 必须先完成**:
1. Hero区域重设计
2. 搜索框组件
3. 酒店卡片组件
4. 诚实设施清单组件

**P1 - 尽快完成**:
1. 筛选器组件
2. 预订卡片组件
3. 步骤指示器

**P2 - 可以后续**:
1. 动效系统
2. 骨架屏
3. 图片懒加载优化

---

## 🔗 相关文件

### 设计文件
```
/home/node/workspace-host/tiaohai-global/docs/redesign/stage2/
├── design-system.md              # 设计系统文档
├── wireframes/
│   ├── home-wireframe.html       # 首页线框图
│   ├── hotels-wireframe.html     # 列表页线框图  
│   ├── detail-wireframe.html     # 详情页线框图
│   └── checkout-wireframe.html   # 预订流程线框图
└── design-figma.md               # Figma链接 (本文件)
```

### 开发相关
```
/home/node/workspace-host/tiaohai-global/
├── apps/web/src/app/[locale]/
│   ├── page.tsx                  # 首页 (需修改)
│   ├── hotels/
│   │   └── page.tsx              # 列表页 (需修改)
│   └── hotels/[id]/
│       └── page.tsx              # 详情页 (需修改)
└── apps/web/src/components/      # 组件目录
```

---

## 🔄 下一步行动

### 立即行动
1. [ ] PM确认设计方向
2. [ ] 开发团队评估工作量
3. [ ] 确定P0/P1/P2优先级

### 本周完成
1. [ ] 开始Stage 1开发 (首页 + 搜索)
2. [ ] 准备Figma高保真设计稿
3. [ ] 准备设计素材 (图片资源)

### 后续计划
1. [ ] 用户测试验证
2. [ ] 根据反馈迭代
3. [ ] 完善动效系统

---

## 📞 联系方式

如有设计相关问题，请联系：
- **设计师**: Diana (UX Designer)
- **协调人**: 小贝
- **决策人**: Frank

---

**交付确认**:
- [x] 设计系统文档
- [x] 首页线框图
- [x] 列表页线框图
- [x] 详情页线框图
- [x] 预订流程线框图
- [ ] Figma高保真设计稿 (后续补充)

**签字**: Diana 🎨  
**日期**: 2026-03-15
