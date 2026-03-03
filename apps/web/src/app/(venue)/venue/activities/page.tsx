'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Toolbar } from '@/components/dashboard/Toolbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { PlusCircle, Calendar, Users } from 'lucide-react'

const activities = [
  { 
    id: 1, 
    title: '老北京茶馆品茗体验', 
    duration: '2小时', 
    price: '¥168', 
    maxPeople: 12, 
    status: 'active',
    bookings: 8
  },
  { 
    id: 2, 
    title: '京剧脸谱绘制工作坊', 
    duration: '3小时', 
    price: '¥268', 
    maxPeople: 15, 
    status: 'active',
    bookings: 12
  },
  { 
    id: 3, 
    title: '胡同摄影 walks', 
    duration: '4小时', 
    price: '¥198', 
    maxPeople: 8, 
    status: 'draft',
    bookings: 0
  },
]

export default function VenueActivitiesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="活动管理"
        description="管理您的体验店活动"
      />

      <Toolbar
        searchPlaceholder="搜索活动..."
        onAdd={() => console.log('新建活动')}
        addLabel="新建活动"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-lg">{activity.title}</CardTitle>
                <StatusBadge status={activity.status as any}>
                  {activity.status === 'active' ? '进行中' : '草稿'}
                </StatusBadge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Users className="w-4 h-4" />
                <span>{activity.bookings}/{activity.maxPeople} 人已预订</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xl font-bold text-white">{activity.price}</span>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  管理
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* 添加新活动卡片 */}
        <Card className="bg-slate-900 border-slate-800 border-dashed border-2 cursor-pointer hover:border-orange-500/50 transition-colors">
          <CardContent className="flex flex-col items-center justify-center h-full py-12">
            <PlusCircle className="w-12 h-12 text-slate-600 mb-4" />
            <p className="text-slate-400">创建新活动</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
