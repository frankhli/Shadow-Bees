'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function GuideScheduleCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(3) // March
  const [currentYear, setCurrentYear] = useState(2024)

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  // Mock events for the calendar
  const events: Record<string, { type: string; title: string; time?: string }> = {
    '2024-03-15': { type: 'booking', title: '故宫深度游', time: '09:00' },
    '2024-03-16': { type: 'booking', title: '长城一日游', time: '08:00' },
    '2024-03-18': { type: 'unavailable', title: '休息' },
    '2024-03-20': { type: 'booking', title: '天坛+颐和园', time: '09:00' },
    '2024-03-22': { type: 'available', title: '可预约' },
    '2024-03-24': { type: 'available', title: '可预约' },
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month - 1, 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth, currentYear)
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear)

  const renderCalendar = () => {
    const days = []
    const weekDays = ['日', '一', '二', '三', '四', '五', '六']

    // Week day headers
    const headers = weekDays.map((day) => (
      <div key={day} className="p-2 text-center text-sm text-slate-400 font-medium">
        {day}
      </div>
    ))

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const event = events[dateStr as keyof typeof events]

      days.push(
        <div 
          key={day} 
          className={`min-h-[100px] p-2 border border-slate-800 ${
            event ? 'bg-slate-800/30' : ''
          }`}
        >
          <div className="text-sm text-slate-400 mb-1">{day}</div>
          {event && (
            <div className={`text-xs p-1 rounded ${
              event.type === 'booking' 
                ? 'bg-blue-500/20 text-blue-400' 
                : event.type === 'unavailable'
                ? 'bg-slate-700 text-slate-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {event.title}
              {event.time && <div className="text-[10px] opacity-70">{event.time}</div>}
            </div>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-7">{headers}</div>
        <div className="grid grid-cols-7">{days}</div>
      </>
    )
  }

  return (
    <div className="p-8">
      <PageHeader
        title="我的日程"
        description="查看您的服务安排"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 日历 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                {currentYear}年 {monthNames[currentMonth - 1]}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-700 text-slate-300"
                  onClick={() => setCurrentMonth(prev => prev > 1 ? prev - 1 : 12)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-700 text-slate-300"
                  onClick={() => setCurrentMonth(prev => prev < 12 ? prev + 1 : 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {renderCalendar()}
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">本月统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">已确认服务</span>
                <span className="text-blue-400 font-bold">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">可预约天数</span>
                <span className="text-emerald-400 font-bold">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">休息天数</span>
                <span className="text-slate-400 font-bold">4</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">即将开始</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">明天 09:00</span>
                </div>
                <p className="text-white font-medium">故宫深度游</p>
                <p className="text-xs text-slate-400">2位客人 · 4小时</p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">3月16日 08:00</span>
                </div>
                <p className="text-white font-medium">长城一日游</p>
                <p className="text-xs text-slate-400">4位客人 · 8小时</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">图例</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500/20 rounded" />
                <span className="text-slate-300">已预订</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500/20 rounded" />
                <span className="text-slate-300">可预约</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-700 rounded" />
                <span className="text-slate-300">休息</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
