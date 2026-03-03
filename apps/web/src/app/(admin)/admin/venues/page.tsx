'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Toolbar } from '@/components/dashboard/Toolbar'
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableHead,
} from '@/components/dashboard/DataTable'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star } from 'lucide-react'

const venues = [
  { 
    id: 1, 
    name: '老北京茶馆', 
    city: '北京',
    type: '茶文化体验',
    activities: 5,
    status: 'active', 
    rating: 4.8,
    revenue: '¥45,200' 
  },
  { 
    id: 2, 
    name: '京剧脸谱艺术馆', 
    city: '北京',
    type: '手工艺体验',
    activities: 3,
    status: 'active', 
    rating: 4.9,
    revenue: '¥32,800' 
  },
  { 
    id: 3, 
    name: '胡同美食探索', 
    city: '北京',
    type: '美食体验',
    activities: 4,
    status: 'pending', 
    rating: 0,
    revenue: '-' 
  },
  { 
    id: 4, 
    name: '西安兵马俑工坊', 
    city: '西安',
    type: '文化体验',
    activities: 2,
    status: 'active', 
    rating: 4.7,
    revenue: '¥28,600' 
  },
]

export default function AdminVenuesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="体验店管理"
        description="管理平台所有体验店"
      />

      <Toolbar
        searchPlaceholder="搜索体验店名称..."
        onAdd={() => console.log('新增体验店')}
        addLabel="新增体验店"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-white">45</p>
              <p className="text-sm text-slate-400">体验店总数</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-emerald-400">38</p>
              <p className="text-sm text-slate-400">营业中</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-yellow-400">7</p>
              <p className="text-sm text-slate-400">待审核</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-yellow-400">4.8</p>
              <p className="text-sm text-slate-400">平均评分</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <DataTable>
          <DataTableHeader>
            <tr>
              <DataTableHead>体验店</DataTableHead>
              <DataTableHead>城市</DataTableHead>
              <DataTableHead>类型</DataTableHead>
              <DataTableHead>活动数</DataTableHead>
              <DataTableHead>状态</DataTableHead>
              <DataTableHead>评分</DataTableHead>
              <DataTableHead>收入</DataTableHead>
              <DataTableHead align="center">操作</DataTableHead>
            </tr>
          </DataTableHeader>
          <DataTableBody>
            {venues.map((venue) => (
              <DataTableRow key={venue.id}>
                <DataTableCell>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <span className="font-medium text-white">{venue.name}</span>
                  </div>
                </DataTableCell>
                <DataTableCell>{venue.city}</DataTableCell>
                <DataTableCell>
                  <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
                    {venue.type}
                  </Badge>
                </DataTableCell>
                <DataTableCell>{venue.activities}个</DataTableCell>
                <DataTableCell>
                  <StatusBadge status={venue.status as any}>
                    {venue.status === 'active' ? '营业中' : venue.status === 'pending' ? '待审核' : '暂停'}
                  </StatusBadge>
                </DataTableCell>
                <DataTableCell>
                  {venue.rating > 0 ? (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {venue.rating}
                    </span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </DataTableCell>
                <DataTableCell>{venue.revenue}</DataTableCell>
                <DataTableCell align="center">
                  <Button variant="ghost" size="sm" className="text-purple-400">
                    管理
                  </Button>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </div>
    </div>
  )
}

// 简单Card组件
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl ${className}`}>
      {children}
    </div>
  )
}
