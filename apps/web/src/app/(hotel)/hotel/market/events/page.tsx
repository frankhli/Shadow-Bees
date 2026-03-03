'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, TrendingUp, AlertCircle, Globe, Star } from 'lucide-react'

// 外国游客友好的事件 - 核心差异化数据
const events = [
  { 
    id: 1, 
    name: '春节庙会 - Temple Fair', 
    date: '2025-01-29', 
    endDate: '2025-02-04',
    location: '地坛公园 / Temple of Earth', 
    distance: '3.2km',
    impact: '+45%',
    type: '文化节庆',
    foreignInterest: 'high',
    aiSuggestion: '外国游客激增，建议推出文化体验套餐，涨价30-35%'
  },
  { 
    id: 2, 
    name: '故宫600年特展 - Palace Museum Anniversary', 
    date: '2025-03-15', 
    endDate: '2025-06-15',
    location: '故宫博物院 / Forbidden City', 
    distance: '2.8km',
    impact: '+60%',
    type: '文化展览',
    foreignInterest: 'high',
    aiSuggestion: '国际游客高峰，提前关闭低价房型，推出VIP导览服务'
  },
  { 
    id: 3, 
    name: '北京马拉松 - Beijing Marathon', 
    date: '2025-10-19', 
    endDate: '2025-10-19',
    location: '天安门广场 / Tiananmen Square', 
    distance: '2.5km',
    impact: '+25%',
    type: '体育赛事',
    foreignInterest: 'medium',
    aiSuggestion: '欧美跑者集中入住，提供早起早餐和存包服务'
  },
  { 
    id: 4, 
    name: '798艺术季 - 798 Art Festival', 
    date: '2025-05-01', 
    endDate: '2025-05-07',
    location: '798艺术区 / 798 Art Zone', 
    distance: '8.5km',
    impact: '+30%',
    type: '艺术展览',
    foreignInterest: 'high',
    aiSuggestion: '艺术爱好者集中，提供画廊地图和英文艺术导览'
  },
  { 
    id: 5, 
    name: '长城国际徒步节 - Great Wall Hiking Festival', 
    date: '2025-09-20', 
    endDate: '2025-09-22',
    location: '慕田峪长城 / Mutianyu Great Wall', 
    distance: '65km',
    impact: '+20%',
    type: '户外活动',
    foreignInterest: 'high',
    aiSuggestion: '徒步游客提前一天入住多，推出打包午餐服务'
  },
]

export default function MarketEventsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="事件日历"
        description="外国游客关注的城市大事件及对您酒店的影响预测"
      />

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">18</p>
                <p className="text-sm text-slate-400">未来30天事件</p>
              </div>
              <Calendar className="w-10 h-10 text-cyan-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">+36%</p>
                <p className="text-sm text-slate-400">平均需求提升</p>
              </div>
              <TrendingUp className="w-10 h-10 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-400">12</p>
                <p className="text-sm text-slate-400">高外国游客兴趣</p>
              </div>
              <Globe className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-sm text-slate-400">需关注事件</p>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 事件列表 */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {event.type}
                    </Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      影响 {event.impact}
                    </Badge>
                    {event.foreignInterest === 'high' && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        <Star className="w-3 h-3 mr-1" />
                        外国游客热门
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date} {event.endDate !== event.date && `~ ${event.endDate}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location} · 距您 {event.distance}
                    </span>
                  </div>

                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="text-sm text-cyan-200">
                      <span className="font-medium">AI建议:</span> {event.aiSuggestion}
                    </p>
                  </div>
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 whitespace-nowrap">
                    查看详情
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 whitespace-nowrap">
                    设置提醒
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
