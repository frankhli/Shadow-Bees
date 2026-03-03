'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Clock, Copy, Check, Calendar } from 'lucide-react'
import { useState } from 'react'

const weekDays = [
  { id: 'mon', name: '周一', short: '一' },
  { id: 'tue', name: '周二', short: '二' },
  { id: 'wed', name: '周三', short: '三' },
  { id: 'thu', name: '周四', short: '四' },
  { id: 'fri', name: '周五', short: '五' },
  { id: 'sat', name: '周六', short: '六' },
  { id: 'sun', name: '周日', short: '日' },
]

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]

export default function GuideScheduleAvailabilityPage() {
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    mon: ['09:00', '10:00', '14:00', '15:00'],
    tue: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    wed: ['09:00', '10:00', '14:00', '15:00'],
    thu: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    fri: ['09:00', '10:00', '14:00', '15:00'],
    sat: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    sun: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
  })

  const [copied, setCopied] = useState(false)

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const currentSlots = prev[day] || []
      if (currentSlots.includes(time)) {
        return { ...prev, [day]: currentSlots.filter(t => t !== time) }
      } else {
        return { ...prev, [day]: [...currentSlots, time].sort() }
      }
    })
  }

  const copySchedule = () => {
    const scheduleText = weekDays.map(day => {
      const slots = availability[day.id] || []
      return `${day.name}: ${slots.length > 0 ? slots.join(', ') : '休息'}`
    }).join('\n')
    navigator.clipboard.writeText(scheduleText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="可预约时段"
        description="设置您每周的可预约时间"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 时段设置 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                每周可约时段
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-700 text-slate-300"
                onClick={copySchedule}
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? '已复制' : '复制日程'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weekDays.map((day) => (
                  <div key={day.id} className="flex items-start gap-4">
                    <div className="w-16 pt-2">
                      <span className="text-white font-medium">{day.name}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((time) => {
                          const isAvailable = (availability[day.id] || []).includes(time)
                          return (
                            <button
                              key={time}
                              onClick={() => toggleTimeSlot(day.id, time)}
                              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                isAvailable
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-slate-800 text-slate-500 border border-slate-700 hover:border-slate-600'
                              }`}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧设置 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快速设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">工作日默认</p>
                  <p className="text-xs text-slate-500">周一至周五 9:00-17:00</p>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                  应用
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">周末全天</p>
                  <p className="text-xs text-slate-500">周六周日 8:00-18:00</p>
                </div>
                <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                  应用
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">全部清空</p>
                  <p className="text-xs text-slate-500">重置所有时段</p>
                </div>
                <Button size="sm" variant="outline" className="border-red-500/50 text-red-400">
                  清空
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">高级设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">自动接受预订</p>
                  <p className="text-xs text-slate-500">无需确认直接接受</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">提前预订限制</p>
                  <p className="text-xs text-slate-500">至少提前24小时</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300">最大每日服务</p>
                  <p className="text-xs text-slate-500">每天最多2单</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">本周概览</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weekDays.slice(0, 3).map((day) => (
                  <div key={day.id} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-300 text-sm">{day.name}</span>
                    <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 text-xs">
                      {(availability[day.id] || []).length} 个时段
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300">
                <Calendar className="w-4 h-4 mr-2" />
                查看完整日历
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
