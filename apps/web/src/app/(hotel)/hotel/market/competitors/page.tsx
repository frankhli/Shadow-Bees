'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Plus, Bell } from 'lucide-react'

const competitors = [
  { name: '胡同精品客栈', distance: '0.5km', price: 520, change: -15, trend: 'down', occupancy: 85 },
  { name: '四合院酒店', distance: '0.8km', price: 680, change: 0, trend: 'same', occupancy: 78 },
  { name: '皇家驿栈', distance: '1.2km', price: 780, change: 20, trend: 'up', occupancy: 92 },
  { name: '京韵民宿', distance: '0.3km', price: 480, change: -8, trend: 'down', occupancy: 65 },
]

const myHotel = { price: 580, occupancy: 82 }

export default function CompetitorsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="竞品监控"
        description="实时监控周边竞品酒店价格和入住率"
      />

      {/* 我的酒店 */}
      <Card className="bg-cyan-500/10 border-cyan-500/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-cyan-400 mb-1">我的酒店</p>
              <h2 className="text-2xl font-bold text-white">北京四合院精品酒店</h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">¥{myHotel.price}</p>
              <p className="text-sm text-slate-400">今日均价 · 入住率 {myHotel.occupancy}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 竞品列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">周边竞品</CardTitle>
          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
            <Plus className="w-4 h-4 mr-2" />
            添加竞品
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.map((hotel) => (
              <div 
                key={hotel.name}
                className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-medium">{hotel.name}</h3>
                    <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                      {hotel.distance}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">入住率 {hotel.occupancy}%</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">¥{hotel.price}</span>
                    <div className={`flex items-center ${
                      hotel.trend === 'down' ? 'text-emerald-400' : 
                      hotel.trend === 'up' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {hotel.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      ) : hotel.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : null}
                      <span className="text-sm">
                        {hotel.change > 0 ? '+' : ''}{hotel.change}%
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-400 mt-1">
                    <Bell className="w-3 h-3 mr-1" />
                    价格提醒
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
