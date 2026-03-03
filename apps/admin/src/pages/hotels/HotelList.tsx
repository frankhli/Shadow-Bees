import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  Eye,
  Edit2,
} from 'lucide-react'

interface Hotel {
  id: string
  name: string
  nameEn: string
  city: string
  ownerName: string
  status: 'active' | 'pending' | 'suspended'
  roomCount: number
  totalOrders: number
  rating: number
  joinDate: string
}

const mockHotels: Hotel[] = [
  {
    id: '1',
    name: '胡同里精品酒店',
    nameEn: 'Hutong Boutique Hotel',
    city: '北京',
    ownerName: '王经理',
    status: 'active',
    roomCount: 10,
    totalOrders: 156,
    rating: 4.8,
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: '上海外滩酒店',
    nameEn: 'The Bund Hotel Shanghai',
    city: '上海',
    ownerName: '李总',
    status: 'active',
    roomCount: 25,
    totalOrders: 342,
    rating: 4.6,
    joinDate: '2024-02-01',
  },
  {
    id: '3',
    name: '西安古城客栈',
    nameEn: 'Xian Ancient City Inn',
    city: '西安',
    ownerName: '张老板',
    status: 'pending',
    roomCount: 8,
    totalOrders: 0,
    rating: 0,
    joinDate: '2024-03-10',
  },
  {
    id: '4',
    name: '成都宽窄巷子民宿',
    nameEn: 'Chengdu Kuanzhai Homestay',
    city: '成都',
    ownerName: '刘经理',
    status: 'suspended',
    roomCount: 6,
    totalOrders: 89,
    rating: 4.2,
    joinDate: '2024-01-20',
  },
]

const statusConfig = {
  active: { label: '运营中', color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle2 },
  pending: { label: '待审核', color: 'bg-amber-500/20 text-amber-400', icon: Clock },
  suspended: { label: '已暂停', color: 'bg-red-500/20 text-red-400', icon: XCircle },
}

export function HotelList() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredHotels = mockHotels.filter(hotel => {
    if (statusFilter !== 'all' && hotel.status !== statusFilter) return false
    if (searchQuery && !hotel.name.includes(searchQuery) && !hotel.city.includes(searchQuery)) return false
    return true
  })

  const stats = {
    total: mockHotels.length,
    active: mockHotels.filter(h => h.status === 'active').length,
    pending: mockHotels.filter(h => h.status === 'pending').length,
    suspended: mockHotels.filter(h => h.status === 'suspended').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">酒店列表</h2>
          <p className="text-gray-400 text-sm mt-1">管理平台所有入驻酒店</p>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Building2 size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">全部酒店</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">运营中</p>
              <p className="text-2xl font-bold text-white">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">待审核</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <XCircle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">已暂停</p>
              <p className="text-2xl font-bold text-white">{stats.suspended}</p>
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
            placeholder="搜索酒店名称或城市..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none"
          >
            <option value="all">全部状态</option>
            <option value="active">运营中</option>
            <option value="pending">待审核</option>
            <option value="suspended">已暂停</option>
          </select>
        </div>
      </div>

      {/* 酒店列表 */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">酒店信息</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">城市</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">负责人</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">状态</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">房间数</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">订单数</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">评分</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {filteredHotels.map((hotel) => {
              const status = statusConfig[hotel.status]
              const StatusIcon = status.icon
              return (
                <motion.tr
                  key={hotel.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-dark-700/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-white">{hotel.name}</p>
                      <p className="text-xs text-gray-500">{hotel.nameEn}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{hotel.city}</td>
                  <td className="py-4 px-4 text-gray-300">{hotel.ownerName}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{hotel.roomCount}</td>
                  <td className="py-4 px-4 text-gray-300">{hotel.totalOrders}</td>
                  <td className="py-4 px-4">
                    {hotel.rating > 0 ? (
                      <span className="text-amber-400">★ {hotel.rating}</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-neon-cyan transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-neon-cyan transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
