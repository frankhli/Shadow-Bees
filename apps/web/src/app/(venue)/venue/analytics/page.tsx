'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Ticket,
  Star,
  Calendar
} from 'lucide-react'

const activityStats = [
  { name: '茶道体验', bookings: 45, revenue: 13410, rating: 4.9 },
  { name: '京剧脸谱绘制', bookings: 32, revenue: 6336, rating: 4.8 },
  { name: '品茗体验', bookings: 28, revenue: 11144, rating: 4.7 },
  { name: '老北京茶馆', bookings: 24, revenue: 4752, rating: 4.9 },
]

const weeklyData = [
  { day: '周一', bookings: 8, revenue: 2384 },
  { day: '周二', bookings: 6, revenue: 1788 },
  { day: '周三', bookings: 12, revenue: 3576 },
  { day: '周四', bookings: 10, revenue: 2980 },
  { day: '周五', bookings: 18, revenue: 5364 },
  { day: '周六', bookings: 24, revenue: 7152 },
  { day: '周日', bookings: 20, revenue: 5960 },
]

const nationalityData = [
  { country: '美国', flag: '🇺🇸', bookings: 32, percentage: 28 },
  { country: '法国', flag: '🇫🇷', bookings: 24, percentage: 21 },
  { country: '日本', flag: '🇯🇵', bookings: 18, percentage: 16 },
  { country: '德国', flag: '🇩🇪', bookings: 15, percentage: 13 },
  { country: '西班牙', flag: '🇪🇸', bookings: 12, percentage: 11 },
  { country: '其他', flag: '🌍', bookings: 13, percentage: 11 },
]

export default function VenueAnalyticsPage() {
  const totalBookings = weeklyData.reduce((sum, d) => sum + d.bookings, 0)
  const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0)
  const avgRating = 4.8

  return (
    <div className="p-8">
      <PageHeader
        title="数据分析"
        description="查看店铺经营数据分析"
      />

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{totalBookings}</p>
                <p className="text-sm text-slate-400">本周预订</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+15% 较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">¥{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-slate-400">本周收入</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+22% 较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">98</p>
                <p className="text-sm text-slate-400">本周访客</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8% 较上周</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">{avgRating}</p>
                <p className="text-sm text-slate-400">平均评分</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-slate-400 text-sm">
              <span>86条评价</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 每日趋势 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">本周预订趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex gap-1">
                    <div 
                      className="flex-1 bg-blue-500/80 rounded-t transition-all hover:bg-blue-400"
                      style={{ height: `${(data.bookings / 30) * 100}px` }}
                      title={`预订: ${data.bookings}`}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs text-slate-400">{data.day}</p>
                    <p className="text-xs text-blue-400">{data.bookings}单</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 国籍分布 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">顾客国籍分布</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nationalityData.map((data) => (
              <div key={data.country} className="flex items-center gap-3">
                <span className="text-xl">{data.flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{data.country}</span>
                    <span className="text-slate-400">{data.bookings}单 ({data.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 活动表现 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">活动表现排行</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityStats.map((activity, index) => (
              <div 
                key={activity.name}
                className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{activity.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    <span className="text-slate-400">
                      <Ticket className="w-3 h-3 inline mr-1" />
                      {activity.bookings}单
                    </span>
                    <span className="text-emerald-400">
                      ¥{activity.revenue.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      {activity.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {index === 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      最热门
                    </Badge>
                  )}
                  {index === 1 && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      推荐
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
