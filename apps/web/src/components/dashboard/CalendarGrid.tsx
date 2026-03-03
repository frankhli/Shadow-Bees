'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns'

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
}

interface CalendarGridProps {
  onDateClick?: (date: Date) => void
  renderDayContent?: (date: Date) => React.ReactNode
  className?: string
}

export function CalendarGrid({ onDateClick, renderDayContent, className }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (): CalendarDay[] => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)

    const days: CalendarDay[] = []
    let day = calendarStart

    while (day <= calendarEnd) {
      days.push({
        date: new Date(day),
        isCurrentMonth: isSameMonth(day, monthStart),
        isToday: isSameDay(day, new Date()),
      })
      day = addDays(day, 1)
    }

    return days
  }

  const days = getDaysInMonth()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  const handleDateClick = (date: Date) => {
    console.log('Date clicked:', date)
    setSelectedDate(date)
    if (onDateClick) {
      onDateClick(date)
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  return (
    <div className={cn('bg-slate-900 rounded-xl border border-slate-800 p-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {format(currentMonth, 'yyyy年 MM月')}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-slate-700 hover:bg-slate-800 h-9 w-9"
            onClick={handlePrevMonth}
            type="button"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-slate-700 hover:bg-slate-800 h-9 w-9"
            onClick={handleNextMonth}
            type="button"
          >
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isSelected = selectedDate && isSameDay(day.date, selectedDate)
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day.date)}
              className={cn(
                'min-h-[80px] p-2 rounded-lg border transition-all text-left cursor-pointer select-none',
                'hover:border-cyan-500/50 hover:bg-slate-800',
                day.isCurrentMonth 
                  ? 'bg-slate-800/50 border-slate-800' 
                  : 'bg-slate-900 border-transparent opacity-50',
                day.isToday && 'border-cyan-500/50 bg-cyan-500/5',
                isSelected && 'ring-2 ring-cyan-500 bg-cyan-500/20 border-cyan-500',
              )}
              role="button"
              tabIndex={0}
            >
              <span className={cn(
                'text-sm font-medium block',
                day.isToday ? 'text-cyan-400' : 'text-slate-300',
                !day.isCurrentMonth && 'text-slate-600'
              )}>
                {format(day.date, 'd')}
              </span>
              {renderDayContent && (
                <div className="mt-1 pointer-events-none">
                  {renderDayContent(day.date)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
