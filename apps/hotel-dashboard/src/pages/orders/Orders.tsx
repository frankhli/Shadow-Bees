import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Eye,
  MessageSquare,
} from 'lucide-react'
import { SortableTable, Column } from '../../components/ui/SortableTable'
import { Badge } from '../../components/ui/badge'

interface Order {
  id: string
  orderNo: string
  guestName: string
  guestEmail: string
  checkIn: string
  checkOut: string
  roomType: string
  nights: number
  amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  isDemo?: boolean
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNo: 'TH202403150001',
    guestName: 'John Smith',
    guestEmail: 'john@example.com',
    checkIn: '2024-03-15',
    checkOut: '2024-03-17',
    roomType: '舒适大床房',
    nights: 2,
    amount: 900,
    status: 'confirmed',
    createdAt: '2024-03-10',
    isDemo: true,
  },
  {
    id: '2',
    orderNo: 'TH202403160002',
    guestName: 'Emma Wilson',
    guestEmail: 'emma@example.com',
    checkIn: '2024-03-16',
    checkOut: '2024-03-19',
    roomType: '胡同景观房',
    nights: 3,
    amount: 1740,
    status: 'pending',
    createdAt: '2024-03-11',
    isDemo: true,
  },
  {
    id: '3',
    orderNo: 'TH202403140003',
    guestName: 'Michael Brown',
    guestEmail: 'michael@example.com',
    checkIn: '2024-03-14',
    checkOut: '2024-03-15',
    roomType: '舒适大床房',
    nights: 1,
    amount: 450,
    status: 'completed',
    createdAt: '2024-03-08',
    isDemo: true,
  },
]

const statusConfig = {
  pending: { label: '待确认', color: 'bg-amber-500/20 text-amber-400', icon: Clock },
  confirmed: { label: '已确认', color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle2 },
  completed: { label: '已完成', color: 'bg-gray-500/20 text-gray-400', icon: CheckCircle2 },
  cancelled: { label: '已取消', color: 'bg-red-500/20 text-red-400', icon: XCircle },
}

export function Orders() {
  const [orders] = useState<Order[]>(mockOrders)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false
    if (searchQuery && !order.guestName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !order.orderNo.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const columns: Column<Order>[] = [
    {
      key: 'orderNo',
      title: '订单号',
      render: (row) => (
        <div>
          <div className="font-medium text-white flex items-center gap-2">
            {row.orderNo}
            {row.isDemo && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30">
                演示
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">{row.createdAt}</div>
        </div>
      ),
    },
    {
      key: 'guestName',
      title: '客人信息',
      render: (row) => (
        <div>
          <div className="font-medium text-white">{row.guestName}</div>
          <div className="text-xs text-gray-500">{row.guestEmail}</div>
        </div>
      ),
    },
    {
      key: 'dates',
      title: '入住日期',
      render: (row) => (
        <div className="text-sm">
          <div className="text-white">{row.checkIn}</div>
          <div className="text-gray-500">→ {row.checkOut} ({row.nights}晚)</div>
        </div>
      ),
    },
    {
      key: 'roomType',
      title: '房型',
      render: (row) => (
        <span className="text-sm text-gray-300">{row.roomType}</span>
      ),
    },
    {
      key: 'amount',
      title: '金额',
      align: 'right',
      render: (row) => (
        <div className="text-right">
          <div className="font-medium text-white">¥{row.amount}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      render: (row) => {
        const config = statusConfig[row.status]
        const Icon = config.icon
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.color}`}>
            <Icon size={12} />
            {config.label}
          </span>
        )
      },
    },
    {
      key: 'actions',
      title: '操作',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-neon-cyan transition-colors">
            <Eye size={16} />
          </button>
          {row.status === 'pending' && (
            <>
              <button className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30 transition-colors">
                确认
              </button>
              <button className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30 transition-colors">
                拒绝
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">订单管理</h2>
            <Badge className="bg-[#FFF3CD] text-[#856404]">Beta</Badge>
          </div>
          <p className="text-gray-400 text-sm mt-1">查看和处理所有预订订单</p>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <ShoppingCart size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">全部订单</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">待确认</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">已确认</p>
              <p className="text-2xl font-bold text-white">{stats.confirmed}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">已完成</p>
              <p className="text-2xl font-bold text-white">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选 */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="搜索订单号或客人姓名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-cyan focus:outline-none w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-cyan focus:outline-none"
          >
            <option value="all">全部状态</option>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
      </div>

      {/* 订单列表 */}
      <SortableTable
        data={filteredOrders}
        columns={columns}
        rowKey="id"
      />
    </div>
  )
}
