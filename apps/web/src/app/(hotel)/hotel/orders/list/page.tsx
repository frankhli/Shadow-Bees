'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Search,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react'

const orders = [
  { id: 'ORD-2024-001', guest: 'John Smith', flag: '🇺🇸', room: '豪华大床房', checkIn: '2024-03-15', nights: 3, amount: 2400, status: 'confirmed', source: 'Booking' },
  { id: 'ORD-2024-002', guest: '田中太郎', flag: '🇯🇵', room: '标准双床房', checkIn: '2024-03-16', nights: 2, amount: 1200, status: 'pending', source: 'Agoda' },
  { id: 'ORD-2024-003', guest: 'Marie Dubois', flag: '🇫🇷', room: '家庭套房', checkIn: '2024-03-10', nights: 5, amount: 6500, status: 'confirmed', source: 'Expedia' },
  { id: 'ORD-2024-004', guest: 'Hans Mueller', flag: '🇩🇪', room: '豪华大床房', checkIn: '2024-03-12', nights: 1, amount: 800, status: 'checked_in', source: 'Direct' },
  { id: 'ORD-2024-005', guest: 'Pedro Garcia', flag: '🇪🇸', room: '标准双床房', checkIn: '2024-03-18', nights: 4, amount: 2400, status: 'confirmed', source: 'Booking' },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  confirmed: { label: '已确认', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  pending: { label: '待确认', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  checked_in: { label: '已入住', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  checked_out: { label: '已退房', color: 'bg-slate-700 text-slate-400 border-slate-600' },
}

export default function OrdersListPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="订单管理"
        description="查看和管理所有预订订单"
      />

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Calendar className="w-4 h-4 mr-2" />
            日期筛选
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Filter className="w-4 h-4 mr-2" />
            状态筛选
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Search className="w-4 h-4 mr-2" />
            搜索订单
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
        </div>
      </div>

      {/* 订单列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">全部订单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">订单号</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">客人</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">房型</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">入住日期</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">来源</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">金额</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">状态</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">操作</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="py-4 px-4 text-slate-500 text-sm">{order.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span>{order.flag}</span>
                        <span className="text-white">{order.guest}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{order.room}</td>
                    <td className="py-4 px-4 text-slate-400">
                      {order.checkIn}
                      <span className="text-slate-600 ml-1">({order.nights}晚)</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                        {order.source}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-emerald-400 font-medium">¥{order.amount}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={statusConfig[order.status].color}>
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
