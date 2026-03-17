'use client'

import React, { useState, useEffect } from 'react'
import { format, addDays, isBefore, isAfter, isSameDay } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Check } from 'lucide-react'

interface DateRange {
  checkIn: Date | null
  checkOut: Date | null
}

interface DatePickerProps {
  initialCheckIn?: Date | null
  initialCheckOut?: Date | null
  minDate?: Date
  maxDate?: Date
  maxNights?: number
  onChange?: (range: DateRange) => void
  onConfirm?: (range: DateRange) => void
  onCancel?: () => void
}

/**
 * DatePicker - 增强日期选择器组件
 * BUG-011修复：日期选择器限制
 * 
 * 限制包括：
 * 1. 不能选择过去日期
 * 2. 最大入住天数限制
 * 3. 离店必须晚于入住
 * 4. 清晰的日期范围显示
 */
export function DatePicker({
  initialCheckIn = null,
  initialCheckOut = null,
  minDate = new Date(),
  maxDate,
  maxNights = 30,
  onChange,
  onConfirm,
  onCancel,
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [checkIn, setCheckIn] = useState<Date | null>(initialCheckIn)
  const [checkOut, setCheckOut] = useState<Date | null>(initialCheckOut)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  // 同步外部props
  useEffect(() => {
    setCheckIn(initialCheckIn)
    setCheckOut(initialCheckOut)
  }, [initialCheckIn, initialCheckOut])

  // 获取日历天数
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (Date | null)[] = []
    
    // 填充前置空白
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  // 判断日期是否可选择
  const isDateSelectable = (date: Date): boolean => {
    // 不能选择过去日期
    if (isBefore(date, minDate) && !isSameDay(date, minDate)) {
      return false
    }
    
    // 不能超过最大日期
    if (maxDate && isAfter(date, maxDate)) {
      return false
    }
    
    // 如果有入住日期，检查最大天数限制
    if (checkIn && !checkOut) {
      const nights = Math.ceil((date.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      if (nights > maxNights) {
        return false
      }
    }
    
    return true
  }

  // 判断日期是否在选中范围内
  const isInRange = (date: Date): boolean => {
    if (!checkIn || !checkOut) return false
    return (isAfter(date, checkIn) || isSameDay(date, checkIn)) && 
           (isBefore(date, checkOut) || isSameDay(date, checkOut))
  }

  // 判断是否是hover范围
  const isInHoverRange = (date: Date): boolean => {
    if (!checkIn || checkOut || !hoverDate) return false
    return (isAfter(date, checkIn) || isSameDay(date, checkIn)) && 
           (isBefore(date, hoverDate) || isSameDay(date, hoverDate))
  }

  // 处理日期点击
  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date)) return

    if (!checkIn || (checkIn && checkOut)) {
      // 选择入住日期
      setCheckIn(date)
      setCheckOut(null)
      onChange?.({ checkIn: date, checkOut: null })
    } else if (checkIn && !checkOut) {
      // 选择离店日期
      if (isBefore(date, checkIn) || isSameDay(date, checkIn)) {
        // 如果点击的日期早于或等于入住日期，重新选择入住
        setCheckIn(date)
        setCheckOut(null)
        onChange?.({ checkIn: date, checkOut: null })
      } else {
        const nights = Math.ceil((date.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        if (nights <= maxNights) {
          setCheckOut(date)
          onChange?.({ checkIn, checkOut: date })
        }
      }
    }
  }

  // 计算住宿天数
  const getNights = (): number => {
    if (!checkIn || !checkOut) return 0
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  // 快捷选择
  const quickSelects = [
    { label: 'Tonight', checkIn: new Date(), checkOut: addDays(new Date(), 1) },
    { label: 'Tomorrow', checkIn: addDays(new Date(), 1), checkOut: addDays(new Date(), 2) },
    { label: 'Next Weekend', checkIn: addDays(new Date(), 5), checkOut: addDays(new Date(), 7) },
  ]

  const nights = getNights()
  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  return (
    <div className="bg-[#141B2D] rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Select Dates</h3>
          {onCancel && (
            <button onClick={onCancel} className="p-2 hover:bg-[#252D4A] rounded-full">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 日期显示 */}
        <div className="flex items-center gap-4">
          <div className="flex-1 p-3 bg-[#1E2746] rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Check-in</p>
            <p className="font-semibold">
              {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select date'}
            </p>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex-1 p-3 bg-[#1E2746] rounded-xl">
            <p className="text-xs text-gray-400 mb-1">Check-out</p>
            <p className="font-semibold">
              {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select date'}
            </p>
          </div>
        </div>

        {/* 住宿天数 */}
        {nights > 0 && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F0FF]/10 text-[#00D0DD] rounded-full text-sm font-medium">
              <CalendarIcon className="w-4 h-4" />
              {nights} night{nights > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* 快捷选择 */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {quickSelects.map((quick) => (
            <button
              key={quick.label}
              onClick={() => {
                setCheckIn(quick.checkIn)
                setCheckOut(quick.checkOut)
                onChange?.({ checkIn: quick.checkIn, checkOut: quick.checkOut })
              }}
              className="px-4 py-2 bg-[#252D4A] hover:bg-[#2D3655] rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            >
              {quick.label}
            </button>
          ))}
        </div>
      </div>

      {/* 日历 */}
      <div className="p-4">
        {/* 月份导航 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-[#252D4A] rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-[#252D4A] rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 星期标题 */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 日期网格 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />
            }

            const isSelectable = isDateSelectable(date)
            const isSelectedIn = checkIn && isSameDay(date, checkIn)
            const isSelectedOut = checkOut && isSameDay(date, checkOut)
            const isRange = isInRange(date)
            const isHover = isInHoverRange(date)
            const isToday = isSameDay(date, new Date())

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoverDate(date)}
                onMouseLeave={() => setHoverDate(null)}
                disabled={!isSelectable}
                className={`
                  aspect-square flex items-center justify-center text-sm rounded-lg relative
                  ${!isSelectable ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-[#252D4A]'}
                  ${isSelectedIn ? 'bg-[#00F0FF] text-white hover:bg-[#00D0DD] rounded-r-none' : ''}
                  ${isSelectedOut ? 'bg-[#00F0FF] text-white hover:bg-[#00D0DD] rounded-l-none' : ''}
                  ${isRange && !isSelectedIn && !isSelectedOut ? 'bg-[#00F0FF]/10 text-[#00D0DD]' : ''}
                  ${isHover && !isRange ? 'bg-[#00F0FF]/10' : ''}
                  ${isToday && !isSelectedIn && !isSelectedOut ? 'font-bold text-[#00F0FF]' : ''}
                `}
              >
                {date.getDate()}
                {isToday && !isSelectedIn && !isSelectedOut && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00F0FF] rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 限制提示 */}
      <div className="px-4 pb-4">
        <div className="text-xs text-gray-400 space-y-1">
          <p>• Minimum stay: 1 night</p>
          <p>• Maximum stay: {maxNights} nights</p>
          <p>• Cannot select past dates</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex gap-3">
        <button
          onClick={() => {
            setCheckIn(null)
            setCheckOut(null)
            onChange?.({ checkIn: null, checkOut: null })
          }}
          className="flex-1 py-3 border border-gray-300 rounded-xl font-medium hover:bg-[#1E2746] transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => onConfirm?.({ checkIn, checkOut })}
          disabled={!checkIn || !checkOut}
          className="flex-1 py-3 bg-[#00F0FF] text-white rounded-xl font-medium hover:bg-[#00D0DD] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Confirm
        </button>
      </div>
    </div>
  )
}

export default DatePicker
