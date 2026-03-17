# 价格明细与取消政策UI - 实现指导

## 概述
本文档提供价格明细与取消政策UI组件的具体实现指导，基于设计稿 `pricing-cancellation-ui.html`。

---

## 组件清单

### 1. PriceDisplay 组件

```typescript
// components/price-display.tsx
import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PriceDisplayProps {
  pricePerNight: number;
  nights: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  currency?: string;
}

export function PriceDisplay({
  pricePerNight,
  nights,
  cleaningFee = 0,
  serviceFee = 0,
  taxes = 0,
  currency = '$'
}: PriceDisplayProps) {
  const subtotal = pricePerNight * nights;
  const total = subtotal + cleaningFee + serviceFee + taxes;

  return (
    <div className="text-right">
      <div className="flex items-baseline justify-end gap-1">
        <span className="text-2xl font-bold text-gray-900">
          {currency}{pricePerNight}
        </span>
        <span className="text-sm text-gray-500">/night</span>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-sm font-medium text-gray-600 mt-0.5 underline decoration-dashed underline-offset-4 cursor-help">
              {currency}{total} total
            </p>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-64 p-4">
            <PriceBreakdown
              pricePerNight={pricePerNight}
              nights={nights}
              cleaningFee={cleaningFee}
              serviceFee={serviceFee}
              taxes={taxes}
              currency={currency}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <p className="text-xs text-gray-400">includes taxes & fees</p>
    </div>
  );
}

// 价格明细展开组件
function PriceBreakdown({ pricePerNight, nights, cleaningFee, serviceFee, taxes, currency }: PriceDisplayProps) {
  const subtotal = pricePerNight * nights;
  const total = subtotal + cleaningFee + serviceFee + taxes;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-gray-600">
        <span>{currency}{pricePerNight} × {nights} nights</span>
        <span>{currency}{subtotal}</span>
      </div>
      {cleaningFee > 0 && (
        <div className="flex justify-between text-gray-600">
          <span>Cleaning fee</span>
          <span>{currency}{cleaningFee}</span>
        </div>
      )}
      {serviceFee > 0 && (
        <div className="flex justify-between text-gray-600">
          <span>Service fee</span>
          <span>{currency}{serviceFee}</span>
        </div>
      )}
      {taxes > 0 && (
        <div className="flex justify-between text-gray-600">
          <span>Occupancy taxes</span>
          <span>{currency}{taxes}</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>{currency}{total}</span>
      </div>
    </div>
  );
}
```

---

### 2. CancellationBadge 组件

```typescript
// components/cancellation-badge.tsx
import React from 'react';
import { CheckCircle, CalendarCheck, Clock, Lock, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CancellationPolicy = 'free' | 'flexible' | 'moderate' | 'strict' | 'non_refundable';

interface CancellationBadgeProps {
  policy: CancellationPolicy;
  deadline?: Date;
  checkInDate?: Date;
}

const policyConfig = {
  free: {
    label: 'Free cancellation',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    hoverBg: 'hover:bg-emerald-100',
    icon: CheckCircle,
    description: 'Full refund before check-in',
  },
  flexible: {
    label: 'Flexible',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    hoverBg: 'hover:bg-blue-100',
    icon: CalendarCheck,
    description: 'Cancel 24h before for full refund',
  },
  moderate: {
    label: 'Moderate',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    hoverBg: 'hover:bg-amber-100',
    icon: Clock,
    description: 'Cancel 5 days before for full refund',
  },
  strict: {
    label: 'Strict',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    hoverBg: 'hover:bg-rose-100',
    icon: Lock,
    description: 'Cancel 30 days before for 50% refund',
  },
  non_refundable: {
    label: 'Non-refundable',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    hoverBg: 'hover:bg-gray-200',
    icon: XCircle,
    description: 'No refund after booking',
  },
};

export function CancellationBadge({ policy, deadline, checkInDate }: CancellationBadgeProps) {
  const config = policyConfig[policy];
  const Icon = config.icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 
            ${config.bgColor} ${config.textColor} ${config.hoverBg}
            text-xs font-medium rounded-full 
            transition-colors cursor-pointer
          `}
        >
          <Icon className="w-3.5 h-3.5" />
          {config.label}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancellation Policy</DialogTitle>
        </DialogHeader>
        <CancellationPolicyDetails 
          policy={policy} 
          deadline={deadline} 
          checkInDate={checkInDate} 
        />
      </DialogContent>
    </Dialog>
  );
}

// 政策详情组件
function CancellationPolicyDetails({ policy, deadline, checkInDate }: CancellationBadgeProps) {
  const config = policyConfig[policy];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Policy Badge Large */}
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${config.textColor}`} />
        </div>
        <div>
          <h4 className={`font-semibold ${config.textColor}`}>{config.label}</h4>
          <p className="text-sm text-gray-500">{config.description}</p>
        </div>
      </div>

      {/* Deadline Info */}
      {deadline && (
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-2">Full refund if cancelled before:</p>
          <p className="text-lg font-semibold text-gray-900">
            {deadline.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })} at 11:59 PM
          </p>
        </div>
      )}

      {/* Timeline */}
      {checkInDate && deadline && (
        <CancellationTimeline 
          deadline={deadline} 
          checkInDate={checkInDate} 
        />
      )}

      {/* Policy Rules */}
      <PolicyRules policy={policy} />
    </div>
  );
}
```

---

### 3. CancellationTimeline 组件

```typescript
// components/cancellation-timeline.tsx
import React from 'react';

interface TimelineProps {
  deadline: Date;
  checkInDate: Date;
}

export function CancellationTimeline({ deadline, checkInDate }: TimelineProps) {
  const today = new Date();
  const totalDays = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysToDeadline = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const freePercent = Math.max(0, (daysToDeadline / totalDays) * 100);
  const partialPercent = Math.max(0, ((totalDays - daysToDeadline - 1) / totalDays) * 100);
  const noRefundPercent = Math.max(0, (1 / totalDays) * 100);

  return (
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700 mb-3">Refund timeline</p>
      
      <div className="relative">
        {/* Timeline bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden flex">
          <div 
            className="bg-emerald-500" 
            style={{ width: `${freePercent}%` }}
          />
          <div 
            className="bg-amber-400" 
            style={{ width: `${partialPercent}%` }}
          />
          <div 
            className="bg-rose-400" 
            style={{ width: `${noRefundPercent}%` }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className="text-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1" />
            <span>Today</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-1 ring-2 ring-emerald-200" />
            <span className="font-medium text-emerald-700">
              {deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <p className="text-emerald-600">Full refund</p>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-rose-400 rounded-full mx-auto mb-1" />
            <span>
              {checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <p className="text-rose-600">Check-in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 4. HotelCard 价格区改造

```typescript
// components/hotel-card-updated.tsx
import React from 'react';
import { Star, Bath, ArrowUpDown } from 'lucide-react';
import { PriceDisplay } from './price-display';
import { CancellationBadge } from './cancellation-badge';

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    district: string;
    city: string;
    rating: number;
    reviewCount: number;
    pricePerNight: number;
    images: string[];
    foreignFriendly?: {
      westernToilet?: boolean;
      elevator?: boolean;
      englishStaff?: boolean;
    };
    certifiedForeignGuest?: boolean;
    cancellationPolicy: 'free' | 'flexible' | 'moderate' | 'strict' | 'non_refundable';
    priceBreakdown: {
      cleaningFee?: number;
      serviceFee?: number;
      taxes?: number;
    };
  };
}

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="relative aspect-[4/3]">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        
        {/* Certification Badge */}
        {hotel.certifiedForeignGuest && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Verified Foreign Guest
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Location & Rating */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">{hotel.district}, {hotel.city}</p>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{hotel.name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-medium">{hotel.rating}</span>
            <span className="text-sm text-gray-500">({hotel.reviewCount})</span>
          </div>
        </div>

        {/* Facility Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hotel.foreignFriendly?.westernToilet && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full">
              <Bath className="w-3 h-3" />
              Western Toilet
            </span>
          )}
          {hotel.foreignFriendly?.elevator && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
              <ArrowUpDown className="w-3 h-3" />
              Elevator
            </span>
          )}
        </div>

        {/* Cancellation Badge */}
        <div className="mb-3">
          <CancellationBadge policy={hotel.cancellationPolicy} />
        </div>

        {/* Price Area */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          <PriceDisplay
            pricePerNight={hotel.pricePerNight}
            nights={3} // Should come from search context
            cleaningFee={hotel.priceBreakdown.cleaningFee}
            serviceFee={hotel.priceBreakdown.serviceFee}
            taxes={hotel.priceBreakdown.taxes}
          />
        </div>
      </div>
    </div>
  );
}
```

---

## 数据结构更新

### Hotel 数据模型

```typescript
// types/hotel.ts
interface Hotel {
  id: string;
  name: string;
  
  // ... existing fields ...
  
  // NEW: Price breakdown
  price: {
    perNight: number;
    currency: string;
    breakdown: {
      cleaningFee: number;
      serviceFee: number;
      taxes: number;
    };
  };
  
  // NEW: Cancellation policy
  cancellationPolicy: {
    type: 'free' | 'flexible' | 'moderate' | 'strict' | 'non_refundable';
    deadline?: string; // ISO date
    description: string;
    rules: {
      beforeDeadline: string;
      afterDeadline: string;
    };
  };
  
  // NEW: Foreign guest certification
  foreignGuestCertification: {
    acceptsForeignGuests: boolean;
    certificationType: 'official' | 'verified' | 'self_reported';
    policeRegistration: boolean;
    documentsNeeded: string[];
  };
}
```

---

## 颜色规范

```css
/* Tailwind CSS classes for cancellation policies */

/* Free Cancellation */
bg-emerald-50 / text-emerald-700 / hover:bg-emerald-100

/* Flexible */
bg-blue-50 / text-blue-700 / hover:bg-blue-100

/* Moderate */
bg-amber-50 / text-amber-700 / hover:bg-amber-100

/* Strict */
bg-rose-50 / text-rose-700 / hover:bg-rose-100

/* Non-refundable */
bg-gray-100 / text-gray-600 / hover:bg-gray-200
```

---

## 响应式适配

### 移动端 (sm以下)

```
酒店卡片价格区:
- 每晚价格和总价垂直堆叠
- 价格明细使用Bottom Sheet而非Tooltip

<div className="mt-3">
  <span className="text-2xl font-bold">$128</span>
  <span className="text-sm text-gray-500">/night</span>
  <p className="text-sm font-medium text-gray-600">$384 total</p>
  <p className="text-xs text-gray-400">includes taxes & fees</p>
</div>
```

### 桌面端 (md以上)

```
酒店卡片价格区:
- 每晚价格和总价水平排列
- 价格明细使用Tooltip/Popover

<div className="text-right">
  <span className="text-2xl font-bold">$128</span>
  <span className="text-sm text-gray-500">/night</span>
  <Tooltip><p>$384 total</p></Tooltip>
</div>
```

---

## 测试要点

1. **价格计算准确性**
   - 验证各费用项计算正确
   - 验证货币符号显示正确
   - 验证税费说明清晰可见

2. **取消政策显示**
   - 验证所有5种政策类型样式正确
   - 验证时间线计算准确
   - 验证截止日期显示正确

3. **交互体验**
   - 验证Tooltip/Modal打开关闭流畅
   - 验证移动端Bottom Sheet体验
   - 验证Hover状态正常

4. **响应式适配**
   - 验证各断点显示正常
   - 验证移动端不显示Tooltip

---

## 交付文件

| 文件 | 路径 |
|------|------|
| 设计文档 | `/docs/transform/iteration1/pricing-cancellation-design.md` |
| HTML设计稿 | `/docs/transform/iteration1/pricing-cancellation-ui.html` |
| 实现指导 | `/docs/transform/iteration1/pricing-cancellation-implementation.md` |

---

*设计: Ivan (UI Designer)*  
*日期: 2026-03-16*  
*版本: v1.0*
