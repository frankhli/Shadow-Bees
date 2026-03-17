'use client'

import React, { useState, useCallback } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Lock } from 'lucide-react'

export type BookingButtonState = 
  | 'idle'        // 初始状态
  | 'checking'    // 检查库存中
  | 'available'   // 可用，可以预订
  | 'unavailable' // 不可用
  | 'booking'     // 预订处理中
  | 'success'     // 预订成功
  | 'error'       // 预订失败

interface BookingButtonProps {
  state?: BookingButtonState
  price?: number
  currency?: string
  nights?: number
  disabled?: boolean
  onClick?: () => void | Promise<void>
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * BookingButton - 预订按钮组件（带状态管理）
 * BUG-010修复：预订按钮状态管理
 * 
 * 状态流转：
 * idle → checking → available → booking → success/error
 *                    ↓
 *              unavailable
 */
export function BookingButton({
  state: initialState = 'idle',
  price,
  currency = '$',
  nights = 1,
  disabled = false,
  onClick,
  className = '',
  size = 'lg',
}: BookingButtonProps) {
  const [state, setState] = useState<BookingButtonState>(initialState)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // 模拟检查库存
  const checkAvailability = useCallback(async () => {
    setState('checking')
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 90%概率可用
      const isAvailable = Math.random() > 0.1
      
      if (isAvailable) {
        setState('available')
      } else {
        setState('unavailable')
        setErrorMessage('Sorry, this room is no longer available for the selected dates.')
      }
    } catch (error) {
      setState('error')
      setErrorMessage('Failed to check availability. Please try again.')
    }
  }, [])

  // 处理点击
  const handleClick = async () => {
    if (disabled || state === 'booking' || state === 'checking') return

    // 如果还没检查过，先检查
    if (state === 'idle') {
      await checkAvailability()
      return
    }

    // 如果不可用，重试检查
    if (state === 'unavailable' || state === 'error') {
      await checkAvailability()
      return
    }

    // 开始预订流程
    if (state === 'available' || state === 'success') {
      setState('booking')
      setErrorMessage(null)
      
      try {
        await onClick?.()
        setState('success')
      } catch (error) {
        setState('error')
        setErrorMessage('Booking failed. Please try again.')
      }
    }
  }

  // 按钮尺寸
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // 状态对应的UI
  const stateConfig: Record<BookingButtonState, {
    text: string
    icon: React.ReactNode
    bgColor: string
    textColor: string
    hoverBg: string
  }> = {
    idle: {
      text: price ? `Book for ${currency}${price}` : 'Check Availability',
      icon: <Lock className="w-5 h-5" />,
      bgColor: 'bg-[#00F0FF]',
      textColor: 'text-white',
      hoverBg: 'hover:bg-[#00D0DD]',
    },
    checking: {
      text: 'Checking availability...',
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
      bgColor: 'bg-gray-400',
      textColor: 'text-white',
      hoverBg: '',
    },
    available: {
      text: price ? `Book now · ${currency}${price} total` : 'Book now',
      icon: <Lock className="w-5 h-5" />,
      bgColor: 'bg-[#00F0FF]',
      textColor: 'text-white',
      hoverBg: 'hover:bg-[#00D0DD]',
    },
    unavailable: {
      text: 'Not available',
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-gray-300',
      textColor: 'text-gray-400',
      hoverBg: 'hover:bg-gray-400',
    },
    booking: {
      text: 'Processing...',
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
      bgColor: 'bg-[#00F0FF]',
      textColor: 'text-white',
      hoverBg: '',
    },
    success: {
      text: 'Booked!',
      icon: <CheckCircle2 className="w-5 h-5" />,
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      hoverBg: 'hover:bg-green-600',
    },
    error: {
      text: 'Try again',
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      hoverBg: 'hover:bg-red-600',
    },
  }

  const config = stateConfig[state]
  const isDisabled = disabled || state === 'checking' || state === 'booking'

  return (
    <div className="w-full">
      {/* 按钮 */}
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`
          w-full ${sizeClasses[size]} rounded-xl font-semibold
          flex items-center justify-center gap-2
          transition-all duration-200
          ${config.bgColor} ${config.textColor} ${config.hoverBg}
          ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-[0.98]'}
          ${className}
        `}
      >
        {config.icon}
        {config.text}
      </button>

      {/* 状态提示 */}
      {state === 'unavailable' && errorMessage && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">{errorMessage}</p>
        </div>
      )}

      {state === 'error' && errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {state === 'success' && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-700">
            <p className="font-medium">Booking successful!</p>
            <p>Check your email for confirmation.</p>
          </div>
        </div>
      )}

      {state === 'available' && nights > 0 && price && (
        <div className="mt-3 text-center text-sm text-gray-400">
          You won't be charged yet · Free cancellation
        </div>
      )}
    </div>
  )
}

export default BookingButton
