'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Users,
  Star,
  MessageSquare,
  FileText
} from 'lucide-react'

interface CompletedOrder {
  id: string
  guestName: string
  nationality: string
  flag: string
  serviceType: string
  date: string
  duration: string
  guests: number
  amount: number
  rating?: number
  review?: string
  hasReview: boolean
}

const completedOrders: CompletedOrder[] = [
  {
    id: 'ORD-2024-003',
    guestName: 'Marie Dupont',
    nationality: '法国',
    flag: '🇫🇷',
    serviceType: '胡同美食游',
    date: '2024-03-10',
    duration: '3小时',
    guests: 2,
    amount: 800,
    rating: 5,
    review: '非常棒的体验！导游很专业，推荐了很多地道的北京小吃。',
    hasReview: true,
  },
  {
    id: 'ORD-2024-004',
    guestName: 'Hans Mueller',
    nationality: '德国',
    flag: '🇩🇪',
    serviceType: '798艺术区',
    date: '2024-03-12',
    duration: '3小时',
    guests: 1,
    amount: 600,
    rating: 4,
    hasReview: true,
  },
  {
    id: 'ORD-2024-008',
    guestName: 'Lucas Brown',
    nationality: '澳大利亚',
    flag: '🇦🇺',
    serviceType: '天坛+颐和园',
    date: '2024-03-08',
    duration: '6小时',
    guests: 3,
    amount: 2400,
    hasReview: false,
  },
]

export default function GuideOrdersCompletedPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="已完成服务"
        description={`共完成 ${completedOrders.length} 个服务`}
      />

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">24</p>
                <p className="text-sm text-slate-400">本月完成</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">4.9</p>
                <p className="text-sm text-slate-400">平均评分</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">¥18,400</p>
                <p className="text-sm text-slate-400">本月收入</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 订单列表 */}
      <div className="space-y-4">
        {completedOrders.map((order) => (
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
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      已完成
                    </Badge>
                  </div>

                  <h3 className="text-xl text-white font-semibold mb-2">{order.serviceType}</h3>

                  <div className="flex items-center gap-6 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {order.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {order.guests}人
                    </span>
                  </div>

                  {order.hasReview && (
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-400">客户评价:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (order.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {order.review && (
                        <p className="text-sm text-slate-300">"{order.review}"</p>
                      )}
                    </div>
                  )}

                  {!order.hasReview && (
                    <div className="flex items-center gap-2 text-sm text-yellow-400">
                      <span>⏳</span>
                      <span>等待客户评价...</span>
                    </div>
                  )}
                </div>

                <div className="text-right ml-6">
                  <p className="text-2xl font-bold text-emerald-400">¥{order.amount}</p>
                  <p className="text-xs text-slate-500 mb-4">{order.id}</p>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                      <FileText className="w-4 h-4 mr-1" />
                      查看详情
                    </Button>
                    {!order.hasReview && (
                      <Button size="sm" variant="outline" className="border-yellow-500/50 text-yellow-400">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        提醒评价
                      </Button>
                    )}
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
