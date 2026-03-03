import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const stats = [
  {
    title: '入驻酒店',
    value: '128',
    change: '+12',
    changeType: 'up',
    icon: Building2,
    color: 'bg-neon-cyan/20',
  },
  {
    title: '注册用户',
    value: '3,842',
    change: '+256',
    changeType: 'up',
    icon: Users,
    color: 'bg-neon-purple/20',
  },
  {
    title: '本月订单',
    value: '1,256',
    change: '+89',
    changeType: 'up',
    icon: ShoppingCart,
    color: 'bg-emerald-500/20',
  },
  {
    title: '平台收入',
    value: '¥128,450',
    change: '+12.5%',
    changeType: 'up',
    icon: DollarSign,
    color: 'bg-amber-500/20',
  },
]

const revenueData = [
  { date: '02-20', revenue: 12000 },
  { date: '02-21', revenue: 15000 },
  { date: '02-22', revenue: 18000 },
  { date: '02-23', revenue: 14000 },
  { date: '02-24', revenue: 22000 },
  { date: '02-25', revenue: 25000 },
  { date: '02-26', revenue: 21000 },
]

const recentAlerts = [
  { id: 1, type: 'warning', message: '3家酒店待审核', time: '10分钟前' },
  { id: 2, type: 'error', message: '5笔提现申请待处理', time: '30分钟前' },
  { id: 3, type: 'success', message: '昨日订单全部结算完成', time: '2小时前' },
  { id: 4, type: 'info', message: 'AI客服回答质量下降', time: '3小时前' },
]

export function Dashboard() {
  const [dateRange, setDateRange] = useState('7d')

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">运营概览</h2>
          <p className="text-gray-400 mt-1">实时监控平台运营数据</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none"
        >
          <option value="24h">近24小时</option>
          <option value="7d">近7天</option>
          <option value="30d">近30天</option>
        </select>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl border border-dark-600 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {stat.changeType === 'up' ? (
                  <TrendingUp size={16} className="text-emerald-400" />
                ) : (
                  <TrendingDown size={16} className="text-red-400" />
                )}
                <span className={stat.changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-1">vs 上期</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 收入趋势图 */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">收入趋势</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A324A" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151B2B',
                    border: '1px solid #2A324A',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#A855F7"
                  strokeWidth={2}
                  dot={{ fill: '#A855F7' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 运营动态 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">运营动态</h3>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-4 bg-dark-900 rounded-lg border-l-4"
                style={{
                  borderLeftColor:
                    alert.type === 'error' ? '#EF4444' :
                    alert.type === 'warning' ? '#F59E0B' :
                    alert.type === 'success' ? '#10B981' : '#00D9FF'
                }}
              >
                {alert.type === 'error' && <AlertCircle size={18} className="text-red-400 mt-0.5" />}
                {alert.type === 'warning' && <Clock size={18} className="text-amber-400 mt-0.5" />}
                {alert.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 mt-0.5" />}
                {alert.type === 'info' && <TrendingUp size={18} className="text-neon-cyan mt-0.5" />}
                <div className="flex-1">
                  <p className="text-white text-sm">{alert.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部数据 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 热门酒店排行 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">热门酒店 TOP 5</h3>
          <div className="space-y-4">
            {[
              { name: '胡同里精品酒店', orders: 45, revenue: 20250 },
              { name: '上海外滩酒店', orders: 38, revenue: 45600 },
              { name: '西安古城客栈', orders: 32, revenue: 19200 },
              { name: '成都宽窄巷子民宿', orders: 28, revenue: 16800 },
              { name: '杭州西湖度假酒店', orders: 25, revenue: 37500 },
            ].map((hotel, index) => (
              <div key={hotel.name} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-dark-700 flex items-center justify-center text-sm text-gray-400">
                    {index + 1}
                  </span>
                  <span className="text-white">{hotel.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{hotel.orders}单</p>
                  <p className="text-gray-500 text-xs">¥{hotel.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 转化率漏斗 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">转化漏斗</h3>
          <div className="space-y-6">
            {[
              { label: '页面访问', value: 12580, percent: 100, color: 'bg-neon-cyan' },
              { label: '查看酒店详情', value: 6240, percent: 50, color: 'bg-neon-purple' },
              { label: '点击预订', value: 1256, percent: 20, color: 'bg-emerald-500' },
              { label: '完成支付', value: 890, percent: 14, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{item.label}</span>
                  <span className="text-white">{item.value.toLocaleString()} ({item.percent}%)</span>
                </div>
                <div className="h-4 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
