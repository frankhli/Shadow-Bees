'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Users,
  CheckCircle,
  XCircle,
  MessageCircle
} from 'lucide-react'

interface PendingOrder {
  id: string
  guestName: string
  nationality: string
  flag: string
  serviceType: string
  date: string
  time: string
  duration: string
  guests: number
  amount: number
  specialRequests?: string
  createdAt: string
}

const pendingOrders: PendingOrder[] = [
  {
    id: 'ORD-2024-001',
    guestName: 'John Smith',
    nationality: '美国',
    flag: '🇺🇸',
    serviceType: '故宫深度游',
    date: '2024-03-20',
    time: '09:00',
    duration: '4小时',
    guests: 2,
    amount: 1600,
    specialRequests: '希望重点讲解明清历史',
    createdAt: '10分钟前',
  },
  {
    id: 'ORD-2024-005',
    guestName: 'Pedro Garcia',
    nationality: '西班牙',
    flag: '🇪🇸',
    serviceType: '天坛+颐和园',
    date: '2024-03-18',
    time: '09:00',
    duration: '6小时',
    guests: 3,
    amount: 2400,
    specialRequests: '需要英语讲解',
    createdAt: '30分钟前',
  },
  {
    id: 'ORD-2024-006',
    guestName: 'Emma Wilson',
    nationality: '英国',
    flag: '🇬🇧',
    serviceType: '胡同美食游',
    date: '2024-03-22',
    time: '18:00',
    duration: '3小时',
    guests: 2,
    amount: 800,
    createdAt: '1小时前',
  },
]

export default function GuideOrdersPendingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="待确认订单"
        description={`您有 ${pendingOrders.length} 个新订单待确认`}
      />

      {/* 待确认提醒 */}
      <Card className="bg-yellow-500/10 border-yellow-500/30 mb-6">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-200">
              新订单请在 <strong>2小时内</strong> 确认，超时将自动取消
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 订单列表 */}
      <div className="space-y-4">
        {pendingOrders.map((order) => (
          <Card key={order.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{order.flag}</span>
                    <div>
                      <span className="font-medium text-white text-lg">{order.guestName}</span>
                      <span className="text-slate-500 text-sm ml-2">{order.nationality}</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      待确认
                    </Badge>
                    <span className="text-xs text-slate-500">{order.createdAt}</span>
                  </div>

                  <h3 className="text-xl text-white font-semibold mb-3">{order.serviceType}</h3>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {order.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-slate-500">时长:</span> {order.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {order.guests}人
                    </span>
                  </div>

                  {order.specialRequests && (
                    <div className="p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300">
                      <span className="text-slate-500">特殊需求:</span> {order.specialRequests}
                    </div>
                  )}
                </div>

                <div className="text-right ml-6">
                  <p className="text-2xl font-bold text-emerald-400">¥{order.amount}</p>
                  <p className="text-xs text-slate-500 mb-4">订单号: {order.id}</p>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      接受订单
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                      <XCircle className="w-4 h-4 mr-1" />
                      婉拒
                    </Button>
                    <Button size="sm" variant="ghost" className="text-green-400">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      联系客人
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingOrders.length === 0 && (
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="py-12 text-center">
            <CheckCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">暂无待确认订单</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
