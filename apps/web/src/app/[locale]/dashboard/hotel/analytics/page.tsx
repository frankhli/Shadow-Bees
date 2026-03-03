'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MousePointer, TrendingUp, ExternalLink, DollarSign, Lightbulb } from 'lucide-react'

// Mock analytics data
const mockStats = {
  totalClicks: 234,
  byPlatform: {
    booking: 156,
    airbnb: 78,
  },
  byDate: {
    '2024-02-20': 12,
    '2024-02-21': 18,
    '2024-02-22': 25,
    '2024-02-23': 15,
    '2024-02-24': 32,
    '2024-02-25': 28,
    '2024-02-26': 22,
  },
  recentClicks: [
    { id: '1', platform: 'booking', clickedAt: '2024-02-26T10:30:00Z', utmSource: 'tiaohai' },
    { id: '2', platform: 'airbnb', clickedAt: '2024-02-26T09:15:00Z', utmSource: 'tiaohai' },
    { id: '3', platform: 'booking', clickedAt: '2024-02-26T08:45:00Z', utmSource: 'google' },
    { id: '4', platform: 'booking', clickedAt: '2024-02-25T22:10:00Z', utmSource: 'tiaohai' },
    { id: '5', platform: 'airbnb', clickedAt: '2024-02-25T20:30:00Z', utmSource: 'instagram' },
  ],
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState(mockStats)

  // Calculate totals
  const totalBookingClicks = stats.byPlatform.booking || 0
  const totalAirbnbClicks = stats.byPlatform.airbnb || 0
  const estimatedConversionRate = 3.5
  const estimatedBookings = Math.round(stats.totalClicks * (estimatedConversionRate / 100))
  const estimatedRevenue = estimatedBookings * 85

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/referral/track?hotelId=eacf2cde-3ad2-432a-9589-35f49a576d60')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.stats.totalClicks > 0) {
            setStats(data.stats)
          }
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }
    fetchStats()
  }, [])

  const getPlatformLabel = (platform: string) => {
    const labels: Record<string, string> = {
      booking: 'Booking.com',
      airbnb: 'Airbnb',
    }
    return labels[platform] || platform
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
            <span className="text-xl font-bold">Tiaohai 商家后台</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/hotel'}>
            返回控制台
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">引流数据分析</h1>
              <p className="text-muted-foreground">追踪Tiaohai列表带来的点击和转化</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">总点击量</span>
                </div>
                <p className="text-3xl font-bold mt-2">{stats.totalClicks}</p>
                <p className="text-xs text-green-600 mt-1">本周 +12%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-muted-foreground">Booking.com</span>
                </div>
                <p className="text-3xl font-bold mt-2">{totalBookingClicks}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  占总量的 {Math.round((totalBookingClicks / stats.totalClicks) * 100)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-rose-500" />
                  <span className="text-sm text-muted-foreground">Airbnb</span>
                </div>
                <p className="text-3xl font-bold mt-2">{totalAirbnbClicks}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  占总量的 {Math.round((totalAirbnbClicks / stats.totalClicks) * 100)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">预估收入</span>
                </div>
                <p className="text-3xl font-bold mt-2">${estimatedRevenue}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {estimatedBookings} 个预估订单 (转化率 3.5%)
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>平台点击分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Badge className="bg-blue-500">Booking.com</Badge>
                      </span>
                      <span className="font-medium">{totalBookingClicks} 次点击</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(totalBookingClicks / stats.totalClicks) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Badge className="bg-rose-500">Airbnb</Badge>
                      </span>
                      <span className="font-medium">{totalAirbnbClicks} 次点击</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${(totalAirbnbClicks / stats.totalClicks) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">近7日趋势</h4>
                  <div className="flex items-end gap-2 h-32">
                    {Object.entries(stats.byDate).map(([date, count]) => (
                      <div key={date} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-primary/20 rounded-t"
                          style={{ height: `${(count as number / 32) * 100}%` }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {date.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Clicks */}
            <Card>
              <CardHeader>
                <CardTitle>最近点击</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.recentClicks.map((click: any) => (
                    <div key={click.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline"
                          className={click.platform === 'booking' ? 'border-blue-500 text-blue-500' : 'border-rose-500 text-rose-500'}
                        >
                          {getPlatformLabel(click.platform)}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium">
                            来源: {click.utmSource || 'tiaohai'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(click.clickedAt).toLocaleString('zh-CN')}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        已点击
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-1"><Lightbulb className="w-4 h-4" /> 小贴士</h4>
                  <p className="text-sm text-muted-foreground">
                    您的Booking.com转化率高于平均水平！建议在Tiaohai列表中添加更多照片以进一步提高转化率。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
