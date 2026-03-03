import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react'
import { useState } from 'react'

const mockOrders = [
  {
    id: 'ORD-2024-001',
    type: 'hotel',
    itemName: '胡同里精品酒店 - 豪华大床房',
    customer: 'John Smith',
    total: 1280,
    status: 'confirmed',
    createdAt: '2024-03-15 10:30',
    hotelName: '胡同里精品酒店',
  },
  {
    id: 'ORD-2024-002',
    type: 'guide',
    itemName: '北京半日深度游',
    customer: 'Emma Wilson',
    total: 600,
    status: 'pending',
    createdAt: '2024-03-15 09:15',
    guideName: '李明',
  },
  {
    id: 'ORD-2024-003',
    type: 'hotel',
    itemName: '上海外滩酒店 - 江景套房',
    customer: '田中健太',
    total: 3200,
    status: 'cancelled',
    createdAt: '2024-03-15 08:45',
    hotelName: '上海外滩酒店',
  },
  {
    id: 'ORD-2024-004',
    type: 'guide',
    itemName: '上海美食探索之旅',
    customer: 'Marie Dubois',
    total: 800,
    status: 'confirmed',
    createdAt: '2024-03-15 07:20',
    guideName: 'Sarah Zhang',
  },
]

const stats = [
  { icon: ShoppingCart, label: '今日订单', value: '156', change: '+12%' },
  { icon: TrendingUp, label: '今日GMV', value: '¥89,420', change: '+18%' },
  { icon: Clock, label: '待处理', value: '23', change: '-5%' },
  { icon: AlertCircle, label: '异常订单', value: '2', change: '0%' },
]

export function OrderMonitoring() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">订单监控</h2>
          <p className="text-gray-400 text-sm mt-1">实时监控平台订单状态</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-dark-800 rounded-xl border border-dark-600 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                <stat.icon size={20} className="text-neon-cyan" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-xs ${stat.change.startsWith('+') ? 'text-emerald-400' : stat.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-500">vs 昨日</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="搜索订单号、客户姓名..."
            className="w-full bg-dark-800 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          {['all', 'hotel', 'guide', 'pending', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === f
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-dark-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? '全部' : f === 'hotel' ? '酒店' : f === 'guide' ? '导游' : f === 'pending' ? '待处理' : '已取消'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">订单号</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">类型</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">产品</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">客户</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">金额</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">状态</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">创建时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {mockOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-dark-700/50 transition-colors"
              >
                <td className="py-4 px-4 font-mono text-sm text-neon-cyan">{order.id}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.type === 'hotel'
                      ? 'bg-neon-cyan/20 text-neon-cyan'
                      : 'bg-neon-purple/20 text-neon-purple'
                  }`}>
                    {order.type === 'hotel' ? '酒店' : '导游'}
                  </span>
                </td>
                <td className="py-4 px-4 text-white">{order.itemName}</td>
                <td className="py-4 px-4 text-gray-300">{order.customer}</td>
                <td className="py-4 px-4 text-white font-medium">¥{order.total}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'confirmed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : order.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {order.status === 'confirmed' ? '已确认' : order.status === 'pending' ? '待处理' : '已取消'}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-400 text-sm">{order.createdAt}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
