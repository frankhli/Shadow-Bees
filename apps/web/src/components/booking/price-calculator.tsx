'use client'

import React, { useMemo } from 'react'
import { HelpCircle } from 'lucide-react'

export interface PriceBreakdownItem {
  label: string
  amount: number
  type: 'base' | 'fee' | 'tax' | 'discount' | 'total'
  description?: string
  isPerNight?: boolean
}

export interface PriceCalculatorProps {
  roomRate: number
  nights: number
  cleaningFee?: number
  serviceFeeRate?: number
  taxRate?: number
  discount?: number
  currency?: string
  showBreakdown?: boolean
  className?: string
}

/**
 * PriceCalculator - 价格计算组件（高精度）
 * BUG-013修复：价格计算精度问题
 * 
 * 特性：
 * 1. 使用整数分计算避免浮点误差
 * 2. 清晰展示价格明细
 * 3. 支持多币种
 * 4. 显示每项的计算公式
 */
export function PriceCalculator({
  roomRate,
  nights,
  cleaningFee = 0,
  serviceFeeRate = 0.12, // 12%
  taxRate = 0.10, // 10%
  discount = 0,
  currency = '$',
  showBreakdown = true,
  className = '',
}: PriceCalculatorProps) {
  
  // 使用整数分计算避免浮点误差
  const calculateInCents = useMemo(() => {
    // 转换为分（整数）
    const roomRateCents = Math.round(roomRate * 100)
    const cleaningFeeCents = Math.round(cleaningFee * 100)
    const discountCents = Math.round(discount * 100)
    
    // 计算各项（整数运算）
    const subtotalCents = roomRateCents * nights
    const serviceFeeCents = Math.round(subtotalCents * serviceFeeRate)
    const taxCents = Math.round((subtotalCents + cleaningFeeCents + serviceFeeCents) * taxRate)
    
    const totalBeforeDiscount = subtotalCents + cleaningFeeCents + serviceFeeCents + taxCents
    const totalCents = Math.max(0, totalBeforeDiscount - discountCents)
    
    return {
      subtotal: subtotalCents / 100,
      cleaningFee: cleaningFeeCents / 100,
      serviceFee: serviceFeeCents / 100,
      tax: taxCents / 100,
      discount: discountCents / 100,
      total: totalCents / 100,
      averagePerNight: nights > 0 ? totalCents / 100 / nights : 0,
    }
  }, [roomRate, nights, cleaningFee, serviceFeeRate, taxRate, discount])

  const { subtotal, serviceFee, tax, total, averagePerNight } = calculateInCents

  // 格式化金额
  const formatAmount = (amount: number): string => {
    return `${currency}${amount.toFixed(2)}`
  }

  // 明细项目
  const breakdownItems: PriceBreakdownItem[] = [
    {
      label: `Room rate`,
      amount: subtotal,
      type: 'base',
      description: `${formatAmount(roomRate)} × ${nights} nights`,
      isPerNight: false,
    },
    ...(cleaningFee > 0 ? [{
      label: 'Cleaning fee',
      amount: cleaningFee,
      type: 'fee' as const,
      description: 'One-time fee',
    }] : []),
    {
      label: 'Service fee',
      amount: serviceFee,
      type: 'fee',
      description: `${Math.round(serviceFeeRate * 100)}% of room rate`,
    },
    {
      label: 'Taxes',
      amount: tax,
      type: 'tax',
      description: `${Math.round(taxRate * 100)}% VAT`,
    },
    ...(discount > 0 ? [{
      label: 'Discount',
      amount: -discount,
      type: 'discount' as const,
      description: 'Applied promotion',
    }] : []),
    {
      label: 'Total',
      amount: total,
      type: 'total',
    },
  ]

  return (
    <div className={`bg-[#141B2D] rounded-xl ${className}`}>
      {/* 总价显示 */}
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-3xl font-bold text-white">{formatAmount(averagePerNight)}</span>
          <span className="text-gray-400 ml-1">/night</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">{formatAmount(total)} total</p>
          <p className="text-xs text-gray-400">{formatAmount(Math.round(total / nights * 100) / 100)} avg/night</p>
        </div>
      </div>

      {/* 价格明细 */}
      {showBreakdown && (
        <div className="border-t border-gray-200 pt-4 space-y-3">
          {breakdownItems.map((item, index) => {
            const isTotal = item.type === 'total'
            
            return (
              <div 
                key={item.label}
                className={`flex items-start justify-between ${
                  isTotal ? 'pt-3 border-t border-gray-200' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className={`${isTotal ? 'font-semibold text-white' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                    {item.description && !isTotal && (
                      <div className="group relative">
                        <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {item.description}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                        </div>
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  )}
                </div>
                <span className={`font-medium ${
                  item.type === 'discount' 
                    ? 'text-green-600' 
                    : isTotal 
                      ? 'text-lg text-white' 
                      : 'text-gray-300'
                }`}>
                  {item.type === 'discount' ? '-' : ''}{formatAmount(Math.abs(item.amount))}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 价格保证 */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700 text-center">
          Price match guarantee · No hidden fees
        </p>
      </div>
    </div>
  )
}

// 简化的价格显示组件
interface PriceDisplayProps {
  amount: number
  currency?: string
  prefix?: string
  suffix?: string
  className?: string
  originalAmount?: number // 原价（用于显示折扣）
  showDecimal?: boolean
}

export function PriceDisplay({
  amount,
  currency = '$',
  prefix = '',
  suffix = '',
  className = '',
  originalAmount,
  showDecimal = true,
}: PriceDisplayProps) {
  // 使用整数分计算避免浮点误差
  const amountCents = Math.round(amount * 100)
  const displayAmount = amountCents / 100
  
  const format = (value: number) => {
    return showDecimal ? value.toFixed(2) : Math.round(value).toString()
  }

  return (
    <span className={className}>
      {prefix}
      {originalAmount && originalAmount > amount && (
        <span className="line-through text-gray-400 mr-2">
          {currency}{format(originalAmount)}
        </span>
      )}
      <span>{currency}{format(displayAmount)}{suffix}</span>
    </span>
  )
}

export default PriceCalculator
