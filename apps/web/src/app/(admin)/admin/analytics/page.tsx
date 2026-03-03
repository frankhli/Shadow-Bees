'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign,
  Globe,
  MapPin,
  Star
} from 'lucide-react'

const platformStats = {
  totalHotels: 128,
  totalGuides: 86,
  totalVenues: 45,
  totalRevenue: 2845600,
  monthlyGrowth: 23,
}

const nationalityData = [
  { country: '美国', flag: '🇺🇸', users: 2450, percentage: 32 },
  { country: '法国', flag: '🇫🇷', users: 1680, percentage: 22 },
  { country: '日本', flag: '🇯🇵', users: 1220, percentage: 16 },
  { country: '德国', flag: '🇩🇪', users: 980, percentage: 13 },
  { country: '西班牙', flag: '🇪🇸', users: 760, percentage: 10 },
  { country: '其他', flag: '🌍', users: 530, percentage: 7 },
]

const topCities = [
  { city: '北京', hotels: 45, guides: 32, bookings: 1250 },
  { city: '上海', hotels: 38, guides: 24, bookings: 980 },
  { city: '西安', hotels: 22, guides: 18, bookings: 650 },
  { city: '成都', hotels: 18, guides: 12, bookings: 480 },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="数据分析"
        description="平台整体运营数据分析"
      />

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{platformStats.totalHotels}</p>
                <p className="text-sm text-slate-400">注册酒店</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12 本月新增</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{platformStats.totalGuides}</p>
                <p className="text-sm text-slate-400">认证导游</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8 本月新增</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{platformStats.totalVenues}</p>
                <p className="text-sm text-slate-400">体验店</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+5 本月新增</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">¥{(platformStats.totalRevenue / 10000).toFixed(1)}万</p>
                <p className="text-sm text-slate-400">平台总收入</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+{platformStats.monthlyGrowth}% 较上月</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 用户国籍分布 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              用户国籍分布
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nationalityData.map((data) => (
              <div key={data.country} className="flex items-center gap-3">
                <span className="text-2xl">{data.flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{data.country}</span>
                    <span className="text-slate-400">{data.users}人 ({data.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 热门城市 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              热门城市排行
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCities.map((city, index) => (
                <div key={city.city} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{city.city}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                      <span>{city.hotels}家酒店</span>
                      <span>{city.guides}位导游</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-purple-400">{city.bookings}</p>
                    <p className="text-xs text-slate-500">订单</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 平台评分 */}
      <Card className="bg-slate-900 border-slate-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-purple-400" />
            平台服务质量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">4.8</p>
              <p className="text-sm text-slate-400 mt-1">酒店平均评分</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-400">4.9</p>
              <p className="text-sm text-slate-400 mt-1">导游平均评分</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-400">96%</p>
              <p className="text-sm text-slate-400 mt-1">订单完成率</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-blue-400">12分钟</p>
              <p className="text-sm text-slate-400 mt-1">平均响应时间</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
