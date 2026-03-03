import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Globe,
  ShoppingCart,
  Star,
  MoreHorizontal,
  Eye,
} from 'lucide-react'

interface Guest {
  id: string
  name: string
  email: string
  nationality: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  lastActive: string
}

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    nationality: '美国',
    phone: '+1 555-0123',
    totalOrders: 3,
    totalSpent: 2450,
    joinDate: '2024-01-15',
    lastActive: '2024-03-10',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    nationality: '英国',
    phone: '+44 20 7946 0958',
    totalOrders: 5,
    totalSpent: 4200,
    joinDate: '2023-12-20',
    lastActive: '2024-03-12',
  },
  {
    id: '3',
    name: '佐藤健一',
    email: 'kenichi@example.jp',
    nationality: '日本',
    phone: '+81 90-1234-5678',
    totalOrders: 2,
    totalSpent: 1800,
    joinDate: '2024-02-01',
    lastActive: '2024-03-08',
  },
  {
    id: '4',
    name: 'Pierre Dubois',
    email: 'pierre@example.fr',
    nationality: '法国',
    phone: '+33 1 42 86 82 82',
    totalOrders: 1,
    totalSpent: 950,
    joinDate: '2024-03-05',
    lastActive: '2024-03-05',
  },
]

export function UserGuests() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">游客管理</h2>
          <p className="text-gray-400 text-sm mt-1">管理平台注册用户</p>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Users size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">总用户数</p>
              <p className="text-2xl font-bold text-white">3,842</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <ShoppingCart size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">有订单用户</p>
              <p className="text-2xl font-bold text-white">1,256</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Globe size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">国籍分布</p>
              <p className="text-2xl font-bold text-white">42</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <Star size={20} className="text-neon-purple" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">平均消费</p>
              <p className="text-2xl font-bold text-white">¥1,280</p>
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
            placeholder="搜索姓名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none w-64"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select className="px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none">
            <option value="all">全部国籍</option>
            <option value="us">美国</option>
            <option value="uk">英国</option>
            <option value="jp">日本</option>
            <option value="fr">法国</option>
          </select>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">用户信息</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">国籍</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">联系方式</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">订单数</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">总消费</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">注册时间</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {mockGuests.map((guest) => (
              <motion.tr
                key={guest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-dark-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <span className="text-white font-medium">{guest.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{guest.name}</p>
                      <p className="text-xs text-gray-500">{guest.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 bg-dark-700 rounded text-sm text-gray-300">
                    {guest.nationality}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300 text-sm">{guest.phone}</td>
                <td className="py-4 px-4 text-gray-300">{guest.totalOrders}</td>
                <td className="py-4 px-4 text-white font-medium">¥{guest.totalSpent.toLocaleString()}</td>
                <td className="py-4 px-4 text-gray-400 text-sm">{guest.joinDate}</td>
                <td className="py-4 px-4">
                  <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-neon-purple transition-colors">
                    <Eye size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
