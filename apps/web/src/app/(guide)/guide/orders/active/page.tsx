'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users,
  Navigation,
  MessageCircle,
  Phone,
  CheckCircle
} from 'lucide-react'

interface ActiveOrder {
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
  meetingPoint: string
  status: 'not_started' | 'in_progress' | 'near_end'
  phone?: string
}

const activeOrders: ActiveOrder[] = [
  {
    id: 'ORD-2024-002',
    guestName: '田中太郎',
    nationality: '日本',
    flag: '🇯🇵',
    serviceType: '长城一日游',
    date: '2024-03-16',
    time: '08:00',
    duration: '8小时',
    guests: 4,
    amount: 3200,
    meetingPoint: '酒店大堂',
    status: 'in_progress',
    phone: '+81-90-1234-5678',
  },
  {
    id: 'ORD-2024-007',
    guestName: 'Sophie Martin',
    nationality: '法国',
    flag: '🇫🇷',
    serviceType: '故宫深度游',
    date: '2024-03-17',
    time: '09:00',
    duration: '4小时',
    guests: 2,
    amount: 1600,
    meetingPoint: '午门集合点',
    status: 'not_started',
    phone: '+33-6-12-34-56-78',
  },
]

export default function GuideOrdersActivePage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'not_started':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">待开始</Badge>
      case 'in_progress':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">进行中</Badge>
      case 'near_end':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">即将结束</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="进行中服务"
        description={`当前有 ${activeOrders.length} 个进行中服务`}
      />

      {/* 服务提示 */}
      <Card className="bg-blue-500/10 border-blue-500/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200">
              服务进行中，记得准时到达集合点，保持手机畅通
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 订单列表 */}
      <div className="space-y-4">
        {activeOrders.map((order) => (
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
                    {getStatusBadge(order.status)}
                  </div>

                  <h3 className="text-xl text-white font-semibold mb-3">{order.serviceType}</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      {order.time} · {order.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="w-4 h-4" />
                      {order.guests}人
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4" />
                      {order.meetingPoint}
                    </div>
                  </div>

                  {order.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Phone className="w-4 h-4" />
                      {order.phone}
                    </div>
                  )}
                </div>

                <div className="text-right ml-6 space-y-2">
                  <p className="text-2xl font-bold text-emerald-400">¥{order.amount}</p>
                  <p className="text-xs text-slate-500">{order.id}</p>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Navigation className="w-4 h-4 mr-1" />
                      导航
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      联系
                    </Button>
                    <Button size="sm" variant="outline" className="border-emerald-500 text-emerald-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      完成服务
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
