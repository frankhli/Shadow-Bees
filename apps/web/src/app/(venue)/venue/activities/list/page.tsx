'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { 
  DataTable, 
  DataTableHeader, 
  DataTableBody, 
  DataTableRow, 
  DataTableCell, 
  DataTableHead 
} from '@/components/dashboard/DataTable'
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Download,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react'
import { useState } from 'react'

interface Activity {
  id: string
  title: string
  category: string
  duration: string
  price: number
  maxPeople: number
  bookings: number
  status: 'active' | 'draft' | 'ended' | 'paused'
  rating: number
  location: string
  createdAt: string
  revenue: number
}

const activities: Activity[] = [
  { 
    id: 'ACT001', 
    title: '老北京茶馆品茗体验', 
    category: '文化体验',
    duration: '2小时', 
    price: 168, 
    maxPeople: 12, 
    bookings: 8,
    status: 'active',
    rating: 4.8,
    location: '东城区',
    createdAt: '2024-01-15',
    revenue: 13440
  },
  { 
    id: 'ACT002', 
    title: '京剧脸谱绘制工作坊', 
    category: '手工艺',
    duration: '3小时', 
    price: 268, 
    maxPeople: 15, 
    bookings: 12,
    status: 'active',
    rating: 4.9,
    location: '西城区',
    createdAt: '2024-01-20',
    revenue: 32160
  },
  { 
    id: 'ACT003', 
    title: '胡同摄影 walks', 
    category: '摄影',
    duration: '4小时', 
    price: 198, 
    maxPeople: 8, 
    bookings: 0,
    status: 'draft',
    rating: 0,
    location: '南锣鼓巷',
    createdAt: '2024-02-01',
    revenue: 0
  },
  { 
    id: 'ACT004', 
    title: '传统剪纸艺术体验', 
    category: '手工艺',
    duration: '2小时', 
    price: 128, 
    maxPeople: 20, 
    bookings: 18,
    status: 'active',
    rating: 4.7,
    location: '朝阳区',
    createdAt: '2024-01-10',
    revenue: 23040
  },
  { 
    id: 'ACT005', 
    title: '中式点心制作课程', 
    category: '美食',
    duration: '3小时', 
    price: 298, 
    maxPeople: 10, 
    bookings: 6,
    status: 'paused',
    rating: 4.6,
    location: '海淀区',
    createdAt: '2024-02-05',
    revenue: 17880
  },
  { 
    id: 'ACT006', 
    title: '书法入门体验课', 
    category: '文化体验',
    duration: '1.5小时', 
    price: 98, 
    maxPeople: 15, 
    bookings: 15,
    status: 'ended',
    rating: 4.5,
    location: '东城区',
    createdAt: '2023-12-01',
    revenue: 14700
  },
]

const categoryColors: Record<string, string> = {
  '文化体验': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  '手工艺': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '摄影': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '美食': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function ActivitiesListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = activities.reduce((sum, a) => sum + a.revenue, 0)
  const totalBookings = activities.reduce((sum, a) => sum + a.bookings, 0)
  const activeCount = activities.filter(a => a.status === 'active').length
  const avgRating = activities.filter(a => a.rating > 0).reduce((sum, a) => sum + a.rating, 0) / 
                    activities.filter(a => a.rating > 0).length

  return (
    <div className="p-8">
      <PageHeader
        title="活动列表"
        description="管理您的所有体验店活动"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">活动总数</p>
                <p className="text-2xl font-bold text-white">{activities.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">进行中</p>
                <p className="text-2xl font-bold text-white">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">总预订人数</p>
                <p className="text-2xl font-bold text-white">{totalBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">累计收入</p>
                <p className="text-2xl font-bold text-white">¥{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="搜索活动名称或ID..."
            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">全部状态</option>
            <option value="active">进行中</option>
            <option value="draft">草稿</option>
            <option value="paused">已暂停</option>
            <option value="ended">已结束</option>
          </select>

          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            更多筛选
          </Button>

          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>

        <div className="flex-1" />

        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          新建活动
        </Button>
      </div>

      {/* Activities Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">活动列表</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable>
            <DataTableHeader>
              <tr>
                <DataTableHead>活动信息</DataTableHead>
                <DataTableHead>分类</DataTableHead>
                <DataTableHead>时长/价格</DataTableHead>
                <DataTableHead>预订情况</DataTableHead>
                <DataTableHead>评分</DataTableHead>
                <DataTableHead>收入</DataTableHead>
                <DataTableHead>状态</DataTableHead>
                <DataTableHead align="center">操作</DataTableHead>
              </tr>
            </DataTableHeader>
            <DataTableBody>
              {filteredActivities.map((activity) => (
                <DataTableRow key={activity.id}>
                  <DataTableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{activity.title}</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location} · {activity.id}
                      </span>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <Badge className={categoryColors[activity.category] || 'bg-slate-500/10 text-slate-400'}>
                      {activity.category}
                    </Badge>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {activity.duration}
                      </span>
                      <span className="font-medium text-orange-400">¥{activity.price}</span>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-300">{activity.bookings}/{activity.maxPeople} 人</span>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${(activity.bookings / activity.maxPeople) * 100}%` }}
                        />
                      </div>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    {activity.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{activity.rating}</span>
                      </div>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </DataTableCell>
                  <DataTableCell>
                    <span className="text-emerald-400 font-medium">
                      ¥{activity.revenue.toLocaleString()}
                    </span>
                  </DataTableCell>
                  <DataTableCell>
                    <StatusBadge status={activity.status}>
                      {activity.status === 'active' ? '进行中' : 
                       activity.status === 'draft' ? '草稿' :
                       activity.status === 'paused' ? '已暂停' : '已结束'}
                    </StatusBadge>
                  </DataTableCell>
                  <DataTableCell align="center">
                    <div className="flex items-center justify-center gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-orange-400">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-400">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              显示 {filteredActivities.length} 条，共 {activities.length} 条
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400 px-2">
                第 {currentPage} 页
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-orange-500/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="font-medium text-white">查看日历</p>
              <p className="text-sm text-slate-400">管理活动时间安排</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-orange-500/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">评价管理</p>
              <p className="text-sm text-slate-400">查看和回复用户评价</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800 cursor-pointer hover:border-orange-500/50 transition-colors">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-white">数据分析</p>
              <p className="text-sm text-slate-400">查看活动数据报告</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
