'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react'

const forecast = [
  { date: '03-15', day: '周五', occupancy: 95, price: 580, trend: 'up', reason: '演唱会' },
  { date: '03-16', day: '周六', occupancy: 98, price: 620, trend: 'up', reason: '展会+周末' },
  { date: '03-17', day: '周日', occupancy: 85, price: 520, trend: 'down', reason: '展会结束' },
  { date: '03-18', day: '周一', occupancy: 65, price: 480, trend: 'down', reason: '工作日' },
  { date: '03-19', day: '周二', occupancy: 68, price: 480, trend: 'same', reason: '常态' },
  { date: '03-20', day: '周三', occupancy: 72, price: 490, trend: 'up', reason: '小假期前' },
  { date: '03-21', day: '周四', occupancy: 88, price: 550, trend: 'up', reason: '清明节前' },
]

export default function ForecastPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="需求预测"
        description="AI预测未来30天入住率和最优价格"
      />

      {/* 概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">预测平均入住率</p>
                <p className="text-3xl font-bold text-white">82%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">建议平均房价</p>
                <p className="text-3xl font-bold text-emerald-400">¥524</p>
              </div>
              <TrendingUp className="w-10 h-10 text-cyan-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">预测收入</p>
                <p className="text-3xl font-bold text-white">¥145,680</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 预测表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">未来7天预测</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {forecast.map((day) => (
              <div key={day.date} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-6">
                  <div className="text-center w-16">
                    <p className="text-white font-medium">{day.date}</p>
                    <p className="text-xs text-slate-500">{day.day}</p>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">入住率</span>
                      <span className={day.occupancy > 90 ? 'text-red-400' : day.occupancy > 70 ? 'text-emerald-400' : 'text-slate-300'}>
                        {day.occupancy}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          day.occupancy > 90 ? 'bg-red-500' : day.occupancy > 70 ? 'bg-emerald-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${day.occupancy}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">¥{day.price}</p>
                    <p className="text-xs text-slate-500">建议价</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-slate-700 text-slate-300">{day.reason}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI说明 */}
      <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
        <div>
          <p className="text-cyan-200 font-medium">AI预测说明</p>
          <p className="text-sm text-slate-400 mt-1">
            预测基于历史数据、周边事件、竞品价格和季节性因素。准确率约85%，建议结合实际经验调整。
          </p>
        </div>
      </div>
    </div>
  )
}
