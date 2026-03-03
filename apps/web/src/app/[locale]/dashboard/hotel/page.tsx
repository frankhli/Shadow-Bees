'use client'
import { Link } from "@/navigation"
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, BarChart3 } from 'lucide-react'

// Mock data
const hotelData = {
  name: '胡同精品酒店',
  status: 'active',
  totalRooms: 8,
  todayBookings: 3,
  todayRevenue: 255,
  occupancyRate: 62,
}

const orders = [
  { id: 'TH202403150001', guest: 'John Smith', checkIn: '2024-03-15', nights: 2, amount: 170, status: 'confirmed' },
  { id: 'TH202403150002', guest: 'Emma Wilson', checkIn: '2024-03-16', nights: 3, amount: 255, status: 'confirmed' },
  { id: 'TH202403140001', guest: 'Michael Brown', checkIn: '2024-03-14', nights: 1, amount: 85, status: 'completed' },
]

const aiConversations = [
  { id: '1', guest: 'John Smith', message: 'Is there an elevator?', status: 'resolved', aiHandled: true },
  { id: '2', guest: 'Sarah Lee', message: 'How to get from airport?', status: 'escalated', aiHandled: false },
  { id: '3', guest: 'David Chen', message: 'Breakfast included?', status: 'pending', aiHandled: true },
]

// 状态标签映射
const statusLabels: Record<string, string> = {
  confirmed: '已确认',
  completed: '已完成',
  resolved: '已解决',
  escalated: '需人工',
  pending: '待处理',
}

export default function HotelDashboardPage() {
  const [activeTab, setActiveTab] = useState('calendar')

  // Generate calendar days
  const generateCalendar = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('zh-CN', { month: 'short' }),
        available: Math.floor(Math.random() * 5) + 1,
        total: 8,
        bookings: Math.floor(Math.random() * 3),
      })
    }
    return days
  }

  const calendarDays = generateCalendar()

  // 星期名称
  const dayNames = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
              <span className="text-xl font-bold">Tiaohai 商家后台</span>
            </div>
            <span className="text-muted-foreground">|</span>
            <span className="font-medium">{hotelData.name}</span>
            <Badge className="bg-green-500/20 text-green-400">营业中</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/hotel/content" className="text-sm text-primary hover:underline flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> AI内容生成
            </Link>
            <Link href="/dashboard/hotel/analytics" className="text-sm text-primary hover:underline flex items-center gap-1">
              <BarChart3 className="w-4 h-4" /> 数据分析
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              查看公开页面
            </Link>
            <Button variant="outline" size="sm">设置</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">总房间数</p>
              <p className="text-3xl font-bold">{hotelData.totalRooms}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">今日预订</p>
              <p className="text-3xl font-bold">{hotelData.todayBookings}</p>
              <p className="text-xs text-muted-foreground">较昨日 +1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">今日收入</p>
              <p className="text-3xl font-bold">¥{hotelData.todayRevenue}</p>
              <p className="text-xs text-muted-foreground">USD</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">入住率</p>
              <p className="text-3xl font-bold">{hotelData.occupancyRate}%</p>
              <p className="text-xs text-muted-foreground">本月</p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'calendar', label: '日历' },
            { id: 'orders', label: '订单' },
            { id: 'ai-chat', label: 'AI对话' },
            { id: 'finance', label: '财务' },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>房态日历</CardTitle>
                <div className="flex gap-2 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    可订
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    紧张
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    满房
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    周{day}
                  </div>
                ))}
                {calendarDays.map((day) => (
                  <div
                    key={day.date}
                    className={`border rounded-lg p-2 min-h-[80px] cursor-pointer hover:border-primary transition-colors ${
                      day.available === 0 ? 'bg-red-500/10' :
                      day.available <= 2 ? 'bg-yellow-500/10' :
                      'bg-green-500/5'
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">{day.month}</div>
                    <div className="font-bold">{day.day}</div>
                    <div className="text-xs mt-1">
                      {day.available > 0 ? (
                        <span className={day.available <= 2 ? 'text-yellow-500' : 'text-green-500'}>
                          剩{day.available}间
                        </span>
                      ) : (
                        <span className="text-red-500">满房</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders View */}
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>近期订单</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground border-b">
                    <th className="pb-3">订单号</th>
                    <th className="pb-3">客人</th>
                    <th className="pb-3">入住</th>
                    <th className="pb-3">晚数</th>
                    <th className="pb-3">金额</th>
                    <th className="pb-3">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.guest}</td>
                      <td className="py-3">{order.checkIn}</td>
                      <td className="py-3">{order.nights}</td>
                      <td className="py-3">¥{order.amount}</td>
                      <td className="py-3">
                        <Badge variant={order.status === 'confirmed' ? 'default' : 'secondary'}>
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* AI Conversations */}
        {activeTab === 'ai-chat' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI对话</CardTitle>
                <Badge variant="secondary">
                  {aiConversations.filter(c => c.status === 'escalated').length} 条需关注
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiConversations.map((chat) => (
                  <div key={chat.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{chat.guest}</span>
                        {!chat.aiHandled && (
                          <Badge variant="destructive">需人工</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-1">&quot;{chat.message}&quot;</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>处理: {chat.aiHandled ? 'AI' : '人工'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        chat.status === 'resolved' ? 'secondary' :
                        chat.status === 'escalated' ? 'destructive' :
                        'default'
                      }>
                        {statusLabels[chat.status] || chat.status}
                      </Badge>
                      {chat.status === 'escalated' && (
                        <Button size="sm" className="mt-2">接管</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Finance View */}
        {activeTab === 'finance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>本月收入</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">¥8,450</p>
                <p className="text-sm text-muted-foreground">扣除15%平台费后</p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium">结算周期</p>
                  <p className="text-sm text-muted-foreground">下次结算: ¥2,980 (T+7)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>交易记录</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{order.guest}</p>
                        <p className="text-muted-foreground">{order.checkIn}</p>
                      </div>
                      <p className="font-medium">¥{order.amount * 0.85}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
