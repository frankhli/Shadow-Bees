# 价格明细与取消政策UI设计

## 任务背景
hospitality_expert验收指出价格透明度不足，缺少税费明细和取消政策

## 设计目标
参考Booking.com标准，提供透明的价格展示和清晰的取消政策

---

## 1. 价格显示组件

### 1.1 设计原则
- **透明优先**：用户第一眼看到的就是最终支付价格
- **明细可展开**：点击可查看详细价格构成
- **税费明确**：显示税费占比，避免结账时 surprises

### 1.2 价格展示层级

```
┌─────────────────────────────────────┐
│  $128        ← 基础房价/晚          │
│  /night                             │
├─────────────────────────────────────┤
│  $384 total                         │ ← 总价（突出显示）
│  $128 × 3 nights                    │
│  + $56 taxes & fees                 │
│  ─────────────────────────────────  │
│  = $384                             │
└─────────────────────────────────────┘
```

### 1.3 视觉规范

**主价格（每晚）**
- 字体：24px Bold
- 颜色：Gray 900
- 位置：卡片右下角

**总价**
- 字体：14px Semibold
- 颜色：Gray 600
- 下划线：dashed，hover显示tooltip

**税费提示**
- 字体：12px Regular
- 颜色：Gray 500
- 图标：InfoCircle

---

## 2. 取消政策Badge

### 2.1 政策类型

| 类型 | 颜色 | 图标 | 文案 |
|------|------|------|------|
| **Free cancellation** | Emerald 500 | CheckCircle | Free cancellation |
| **Flexible** | Blue 500 | CalendarCheck | Flexible cancellation |
| **Moderate** | Amber 500 | Clock | Moderate cancellation |
| **Strict** | Rose 500 | Lock | Strict cancellation |
| **Non-refundable** | Gray 500 | XCircle | Non-refundable |

### 2.2 Badge组件设计

```
Small (卡片内使用):
┌──────────────────────────┐
│ 🟢 Free cancellation     │
└──────────────────────────┘
背景: bg-emerald-50
文字: text-emerald-700
边框: border-emerald-200
圆角: rounded-full
内边距: px-2 py-0.5

Medium (详情页使用):
┌──────────────────────────┐
│ 🟢 Free cancellation     │
│ Cancel anytime before    │
│ check-in for full refund │
└──────────────────────────┘
```

---

## 3. 取消政策详情弹窗

### 3.1 弹窗触发
- 点击取消政策Badge
- 点击"View details"链接

### 3.2 弹窗内容结构

```
┌─────────────────────────────────────────┐
│  Cancellation Policy              ✕    │
├─────────────────────────────────────────┤
│                                         │
│  🟢 Free cancellation                   │
│  ─────────────────────────────────────  │
│                                         │
│  Full refund if cancelled before:       │
│  January 14, 2026 (11:59 PM)            │
│                                         │
│  [Time visualization bar]               │
│  Now ━━━━━━━●━━━━━━━━━━━━ Check-in      │
│             ↑                           │
│         Cancel deadline                 │
│                                         │
│  After deadline:                        │
│  • First night charged                  │
│  • Remaining nights refunded            │
│                                         │
│  [View full policy]                     │
│                                         │
└─────────────────────────────────────────┘
```

### 3.3 时间可视化设计

```
Linear风格时间条:
┌─────────────────────────────────────────┐
│ Booked    Free Cancel    Partial    No  │
│   ●━━━━━━━━━━━━━━●━━━━━━━━━━●━━━━━━●   │
│  Today      Jan 14        Jan 15   Jan  │
│                           Check-in      │
└─────────────────────────────────────────┘

颜色编码:
- Free cancel: Emerald
- Partial refund: Amber  
- No refund: Rose
```

---

## 4. 酒店卡片价格区改造

### 4.1 当前结构
```
┌─────────────────────────────────────┐
│                                     │
│  [Image]                            │
│                                     │
├─────────────────────────────────────┤
│  District, City          ★ 4.8      │
│  Hotel Name                         │
│                                     │
│  [设施标签]                          │
│                                     │
│                    $128/night       │ ← 仅显示每晚价格
└─────────────────────────────────────┘
```

### 4.2 新结构
```
┌─────────────────────────────────────┐
│  🏷️ Verified Foreign Guest          │
│                                     │
│  [Image]                            │
│                                     │
├─────────────────────────────────────┤
│  District, City          ★ 4.8 (28) │
│  Hotel Name                         │
│                                     │
│  [设施标签]                          │
│                                     │
│  🟢 Free cancellation               │ ← 取消政策Badge
│                                     │
│  $128      $384 total               │ ← 价格明细
│  /night    incl. taxes              │
│            ━━━━━━━━━━━━━━           │ ← 下划线提示可展开
└─────────────────────────────────────┘
```

### 4.3 价格展开状态
```
┌─────────────────────────────────────┐
│  ...                                │
│  $128      ┌─────────────────────┐  │
│  /night    │ $384 total          │  │
│            │ ━━━━━━━━━━━━━━━━━━━ │  │
│            │ $128 × 3 nights     │  │
│            │ $384                │  │
│            │ Cleaning fee   $48  │  │
│            │ Service fee    $32  │  │
│            │ Taxes          $56  │  │
│            │ ─────────────────── │  │
│            │ Total          $540 │  │
│            └─────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 5. 酒店详情页价格区

### 5.1 价格卡片设计

```
┌─────────────────────────────────────────┐
│  Price Summary                          │
├─────────────────────────────────────────┤
│                                         │
│  $128 × 3 nights          $384          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Cleaning fee              $48          │
│  Service fee               $32          │
│  Occupancy taxes           $56          │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Total before taxes       $464          │
│  Taxes & fees              $76          │
│                                         │
│  ════════════════════════════════════   │
│                                         │
│  Total                    $540          │
│  Includes taxes & fees                  │
│                                         │
└─────────────────────────────────────────┘
```

### 5.2 取消政策区

```
┌─────────────────────────────────────────┐
│  Cancellation Policy                    │
├─────────────────────────────────────────┤
│                                         │
│  🟢 Free cancellation                   │
│  Cancel before Jan 14 for full refund   │
│                                         │
│  [Timeline visualization]               │
│                                         │
│  [View full policy details]             │
│                                         │
└─────────────────────────────────────────┘
```

---

## 6. 设计规范

### 6.1 颜色系统

```css
/* 取消政策颜色 */
--cancellation-free: #10B981;      /* Emerald 500 */
--cancellation-flexible: #3B82F6;   /* Blue 500 */
--cancellation-moderate: #F59E0B;   /* Amber 500 */
--cancellation-strict: #F43F5E;     /* Rose 500 */
--cancellation-nonrefund: #6B7280;  /* Gray 500 */

/* 价格颜色 */
--price-primary: #111827;           /* Gray 900 */
--price-secondary: #4B5563;         /* Gray 600 */
--price-tertiary: #6B7280;          /* Gray 500 */
--taxes-fees: #9CA3AF;              /* Gray 400 */
```

### 6.2 字体层级

```
价格主显示:    24px / font-bold    / Gray 900
每晚标注:      14px / font-normal  / Gray 500
总价:          14px / font-semibold/ Gray 600
税费明细:      12px / font-normal  / Gray 500
政策标题:      14px / font-semibold/ 政策色
政策描述:      13px / font-normal  / Gray 600
```

### 6.3 间距

```
价格区内边距:  16px
价格项间距:    12px
明细行间距:    8px
政策Badge边距: 8px (上下)
```

---

## 7. 响应式设计

### 7.1 移动端适配

```
价格区堆叠:
┌─────────────────────┐
│ $128/night          │
│ $384 total          │ ← 下一行显示
│ incl. taxes & fees  │
├─────────────────────┤
│ 🟢 Free cancellation│
└─────────────────────┘
```

### 7.2 价格明细展开

移动端使用Bottom Sheet而非Popover:
```
┌──────────────────────────┐
│        ───────           │ ← 拖动指示
│  Price Breakdown         │
├──────────────────────────┤
│                          │
│  (价格明细内容)           │
│                          │
│  [Close]                 │
└──────────────────────────┘
```

---

## 8. 交互状态

### 8.1 Hover状态

| 元素 | Hover效果 |
|------|----------|
| 总价下划线 | 颜色加深，显示tooltip "Click to see breakdown" |
| 取消政策Badge | 背景色加深，cursor pointer |
| 价格明细项 | 轻微背景高亮 |

### 8.2 点击交互

```
价格总价点击:
  ↓
显示Popover/Modal
  ↓
显示完整价格明细
  ↓
点击外部或关闭按钮隐藏

取消政策Badge点击:
  ↓
显示政策详情Modal
  ↓
显示时间线和退款规则
  ↓
点击外部或关闭按钮隐藏
```

---

## 9. 参考来源

### 9.1 Booking.com价格展示
- 每晚价格突出显示
- 总价和税费明确标注
- 价格明细可展开查看

### 9.2 Airbnb取消政策
- 五级政策体系（Flexible到Strict）
- 颜色编码区分
- 时间线可视化

### 9.3 Linear设计风格
- 简洁的时间线设计
- 清晰的视觉层级
- 克制的色彩使用

---

## 10. 实现清单

### 组件清单
- [ ] PriceDisplay - 价格显示组件
- [ ] PriceBreakdown - 价格明细弹窗
- [ ] CancellationBadge - 取消政策Badge
- [ ] CancellationModal - 取消政策详情弹窗
- [ ] TimelineVisualization - 时间线可视化

### 集成位置
- [ ] HotelCard - 酒店卡片价格区改造
- [ ] HotelDetailPage - 详情页价格卡片
- [ ] BookingSummary - 预订汇总页

---

*设计: Ivan (UI Designer)*
*日期: 2026-03-16*
*版本: v1.0*
