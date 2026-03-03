'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { CalendarGrid } from '@/components/dashboard/CalendarGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Clock, MapPin } from 'lucide-react'
import { format } from 'date-fns'

export default function GuideSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="p-8">
      <PageHeader
        title="排班管理"
        description="设置可预约时段"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarGrid onDateClick={setSelectedDate} />
        </div>

        <div>
          {selectedDate ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {format(selectedDate, 'MM月dd日')} 排班设置
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300">上午时段 (9:00-12:00)</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300">下午时段 (14:00-17:00)</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300">晚间时段 (19:00-21:00)</span>
                  </div>
                  <Switch />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  保存设置
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="py-12 text-center">
                <p className="text-slate-500">点击日期设置排班</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
