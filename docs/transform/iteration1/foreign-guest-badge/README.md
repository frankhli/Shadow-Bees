# 外宾资质认证标识设计文档

## 📋 任务概述

根据 hospitality_expert 验收反馈，设计并交付"Verified Foreign Guest License"外宾接待资质认证标识系统。

**验收问题**：酒店卡片和详情页缺少"外宾接待资质"官方认证标识，影响用户信任度。

---

## 🎯 交付物清单

| 交付物 | 路径 | 说明 |
|--------|------|------|
| 设计系统文档 | `design-system.html` | 完整设计规范 + 视觉参考 |
| Badge组件 | `ForeignGuestBadge.tsx` | React组件，3种认证类型 |
| 弹窗组件 | `CertificationModal.tsx` | 资质说明弹窗 |
| 使用示例 | `examples.tsx` | 5种使用场景示例 |
| 本说明文档 | `README.md` | 快速接入指南 |

---

## 🎨 设计规范

### 认证类型

| 类型 | 颜色 | 图标 | 文字 | 说明 |
|------|------|------|------|------|
| **official** | Blue #3B82F6 | ShieldCheck | Verified Foreign Guest | 官方认证（已公安报备） |
| **verified** | Emerald #10B981 | BadgeCheck | Accepts Foreigners | 平台验证 |
| **self_reported** | Gray #6B7280 | Globe | Foreign Guest OK | 商家自报 |

### 尺寸规格

| 尺寸 | 高度 | 内边距 | 字号 | 图标 | 适用场景 |
|------|------|--------|------|------|----------|
| sm | 24px | px-2 py-1 | 12px | 12px | 酒店卡片缩略图 |
| md | 24px | px-2.5 py-1 | 12px | 14px | 列表项（默认） |
| lg | 32px | px-3 py-1.5 | 14px | 16px | 详情页标题旁 |

### 阴影效果
```css
box-shadow: 0 2px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1);
```

---

## 🚀 快速接入

### 1. 安装依赖

```bash
# 已依赖的库
npm install lucide-react

# 确保项目中已存在
# - @/components/ui/dialog
# - @/components/ui/button
# - @/lib/utils (cn函数)
```

### 2. 复制组件

将以下文件复制到项目组件目录：
```
src/components/foreign-guest/
├── ForeignGuestBadge.tsx    # 徽章组件
├── CertificationModal.tsx   # 弹窗组件
└── index.ts                 # 导出文件
```

### 3. 在 HotelCard 中使用

```tsx
import { useState } from 'react';
import { ForeignGuestBadge } from '@/components/foreign-guest/ForeignGuestBadge';
import { CertificationModal } from '@/components/foreign-guest/CertificationModal';

export function HotelCard({ hotel }) {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <>
      <div className="relative aspect-square rounded-xl overflow-hidden">
        {/* 图片 */}
        <img src={hotel.image} alt={hotel.name} />
        
        {/* 认证徽章 - 左上角 */}
        <div className="absolute top-3 left-3">
          <ForeignGuestBadge
            certification={{
              acceptsForeignGuests: true,
              certificationType: 'official',
              policeRegistration: true,
            }}
            size="sm"
            onClick={() => setShowCertModal(true)}
          />
        </div>
      </div>

      {/* 资质说明弹窗 */}
      <CertificationModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        hotelName={hotel.name}
        certification={hotel.certification}
      />
    </>
  );
}
```

### 4. 在 Hero 区添加信任标识

```tsx
<div className="flex items-center justify-center gap-4">
  {/* 144小时免签标识 */}
  <div className="inline-flex items-center gap-2 px-4 py-2 
                  bg-emerald-500/90 backdrop-blur-sm rounded-full 
                  text-white text-sm font-medium">
    <Globe className="w-4 h-4" />
    <span>144-hour Visa-Free Transit</span>
  </div>

  {/* 外宾资质认证标识 */}
  <div className="inline-flex items-center gap-2 px-4 py-2 
                  bg-blue-500/90 backdrop-blur-sm rounded-full 
                  text-white text-sm font-medium">
    <ShieldCheck className="w-4 h-4" />
    <span>Verified Foreign Guest License</span>
  </div>
</div>
```

---

## 📱 使用场景

### 场景1：酒店卡片（Hotel Card）
- **位置**：图片左上角
- **尺寸**：sm
- **交互**：点击打开弹窗
- **并列**：可与 Superhost badge 并列

### 场景2：酒店详情页（Hotel Detail）
- **位置**：标题下方，与评分、位置并列
- **尺寸**：lg
- **交互**：点击打开弹窗

### 场景3：Hero区信任标识
- **位置**：主标题上方
- **样式**：与 144h Visa-Free 徽章并列
- **目的**：建立首屏信任感

### 场景4：搜索结果列表
- **位置**：缩略图左上角
- **尺寸**：sm

### 场景5：内联信息展示
- **组件**：`<InlineCertificationInfo />`
- **用途**：详情页信息区、预订确认页

---

## 🔧 Props API

### ForeignGuestBadge

```typescript
interface ForeignGuestBadgeProps {
  certification: {
    acceptsForeignGuests: boolean;     // 是否接待外宾
    certificationType: 'official' | 'verified' | 'self_reported';
    policeRegistration: boolean;       // 是否已公安报备
  };
  size?: 'sm' | 'md' | 'lg';           // 尺寸，默认 'md'
  onClick?: () => void;                // 点击回调（可选）
  className?: string;                  // 额外类名
  showPoliceReg?: boolean;             // 显示公安报备标识，默认 true
}
```

### CertificationModal

```typescript
interface CertificationModalProps {
  isOpen: boolean;                     // 弹窗显示状态
  onClose: () => void;                 // 关闭回调
  hotelName: string;                   // 酒店名称
  certification: CertificationConfig;  // 认证配置
}
```

---

## ✅ 验收检查清单

- [x] Badge组件设计（盾牌图标+文字）
- [x] 3种认证类型样式（official/verified/self_reported）
- [x] 3种尺寸变体（sm/md/lg）
- [x] 酒店卡片集成示例
- [x] 酒店详情页集成示例
- [x] 资质说明弹窗设计
- [x] Hero区信任标识设计
- [x] 设计规范文档
- [x] React组件代码
- [x] 使用示例代码

---

## 📚 参考设计

- **Airbnb** - Superhost badge 设计
- **Booking.com** - Genius badge 设计
- **Linear** - 徽章组件设计

---

## 📝 更新日志

### v1.0.0 (2026-03-16)
- 初始设计交付
- 完成Badge组件3种类型
- 完成资质说明弹窗
- 完成5种使用场景示例

---

**设计负责人**: Ivan (UI Designer)  
**交付日期**: 2026-03-16  
**状态**: 待开发接入
