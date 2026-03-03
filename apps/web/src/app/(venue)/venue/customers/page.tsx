'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  Calendar,
  Star,
  ArrowUpRight
} from 'lucide-react'
import { useState } from 'react'

interface Customer {
  id: string
  name: string
  email: string
  nationality: string
  flag: string
  visits: number
  totalSpent: number
  lastVisit: string
  rating: number
  tags: string[]
}

const customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    nationality: '美国',
    flag: '🇺🇸',
    visits: 3,
    totalSpent: 894,
    lastVisit: '2024-03-15',
    rating: 5,
    tags: ['回头客', '推荐朋友'],
  },
  {
    id: 'CUST-002',
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    nationality: '法国',
    flag: '🇫🇷',
    visits: 2,
    totalSpent: 596,
    lastVisit: '2024-03-12',
    rating: 5,
    tags: ['好评'],
  },
  {
    id: 'CUST-003',
    name: '田中太郎',
    email: 'tanaka@email.jp',
    nationality: '日本',
    flag: '🇯🇵',
    visits: 1,
    totalSpent: 398,
    lastVisit: '2024-03-14',
    rating: 4,
    tags: ['首次到访'],
  },
  {
    id: 'CUST-004',
    name: 'Hans Mueller',
    email: 'hans.mueller@email.de',
    nationality: '德国',
    flag: '🇩🇪',
    visits: 2,
    totalSpent: 596,
    lastVisit: '2024-03-14',
    rating: 5,
    tags: ['回头客'],
  },
  {
    id: 'CUST-005',
    name: 'Pedro Garcia',
    email: 'pedro.garcia@email.es',
    nationality: '西班牙',
    flag: '🇪🇸',
    visits: 1,
    totalSpent: 198,
    lastVisit: '2024-03-13',
    rating: 4,
    tags: ['首次到访'],
  },
]

const nationalityStats = [
  { country: '美国', flag: '🇺🇸', count: 32, percentage: 37 },
  { country: '法国', flag: '🇫🇷', count: 18, percentage: 21 },
  { country: '日本', flag: '🇯🇵', count: 15, percentage: 17 },
  { country: '德国', flag: '🇩🇪', count: 12, percentage: 14 },
  { country: '西班牙', flag: '🇪🇸', count: 9, percentage: 11 },
]

export default function VenueCustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nationality.includes(searchTerm)
  )

  return (
    <div className="p-8">
      <PageHeader
        title="顾客管理"
        description="查看和管理店铺顾客"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">86</p>
                <p className="text-sm text-slate-400">总顾客数</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">24</p>
                <p className="text-sm text-slate-400">本月新客</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">18</p>
                <p className="text-sm text-slate-400">回头客</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">4.8</p>
                <p className="text-sm text-slate-400">平均评分</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 顾客列表 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">顾客列表</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <Input 
                  placeholder="搜索顾客..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64 bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <div 
                    key={customer.id}
                    className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{customer.flag}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{customer.name}</span>
                            <span className="text-xs text-slate-500">{customer.nationality}</span>
                          </div>
                          <p className="text-sm text-slate-400">{customer.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {customer.tags.map((tag) => (
                              <Badge 
                                key={tag}
                                variant="outline"
                                className="bg-slate-700 border-slate-600 text-slate-300 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= customer.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-slate-400">到店 {customer.visits} 次</p>
                        <p className="text-sm text-emerald-400">消费 ¥{customer.totalSpent}</p>
                        <p className="text-xs text-slate-500">最近到店: {customer.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 国籍分布 */}
        <div>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">顾客国籍分布</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nationalityStats.map((stat) => (
                <div key={stat.country} className="flex items-center gap-3">
                  <span className="text-xl">{stat.flag}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{stat.country}</span>
                      <span className="text-slate-400">{stat.count}人 ({stat.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white text-base">顾客洞察</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 font-medium mb-1">回头客占比</p>
                <p className="text-2xl font-bold text-orange-400">21%</p>
                <p className="text-slate-500 text-xs mt-1">高于行业平均水平</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 font-medium mb-1">平均消费</p>
                <p className="text-2xl font-bold text-emerald-400">¥536</p>
                <p className="text-slate-500 text-xs mt-1">每位顾客</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
