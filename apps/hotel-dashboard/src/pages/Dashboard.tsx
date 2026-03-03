import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

// 统计卡片
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: {
  title: string
  value: string
  change: string
  changeType: 'up' | 'down'
  icon: React.ComponentType<{ size?: number }>
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800 rounded-xl border border-dark-600 p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4">
        {changeType === 'up' ? (
          <ArrowUpRight size={16} className="text-emerald-400" />
        ) : (
          <ArrowDownRight size={16} className="text-red-400" />
        )}
        <span className={changeType === 'up' ? 'text-emerald-400' : 'text-red-400'}>
          {change}
        </span>
        <span className="text-gray-500 text-sm ml-1">vs 上月</span>
      </div>
    </motion.div>
  )
}

// 最近订单
function RecentOrders() {
  const orders = [
    { id: 'ORD-2024-001', guest: 'John Smith', checkIn: '2024-03-15', nights: 2, amount: 170, status: 'confirmed' },
    { id: 'ORD-2024-002', guest: 'Emma Wilson', checkIn: '2024-03-16', nights: 3, amount: 255, status: 'pending' },
    { id: 'ORD-2024-003', guest: 'Michael Brown', checkIn: '2024-03-14', nights: 1, amount: 85, status: 'completed' },
    { id: 'ORD-2024-004', guest: 'Sarah Lee', checkIn: '2024-03-18', nights: 2, amount: 170, status: 'confirmed' },
  ]

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">最近订单</h3>
        <button className="text-neon-cyan text-sm hover:underline">查看全部</button>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-dark-900 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                <span className="text-white font-medium">{order.guest[0]}</span>
              </div>
              <div>
                <p className="text-white font-medium">{order.guest}</p>
                <p className="text-gray-400 text-sm">{order.checkIn} · {order.nights}晚</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">${order.amount}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                order.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {order.status === 'confirmed' ? '已确认' : order.status === 'pending' ? '待确认' : '已完成'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// AI 对话提醒
function AIChatAlerts() {
  const alerts = [
    { id: 1, message: '有客人询问是否有电梯', time: '5分钟前', type: 'question' },
    { id: 2, message: 'AI无法回答关于周边餐厅的问题', time: '15分钟前', type: 'escalate' },
    { id: 3, message: '客人询问入住时间', time: '1小时前', type: 'question' },
  ]

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">AI 客服动态</h3>
        <span className="px-2 py-1 bg-neon-cyan/20 text-neon-cyan text-xs rounded-full">3 条新消息</span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-4 bg-dark-900 rounded-lg border-l-4 border-neon-cyan"
          >
            <MessageSquare size={18} className="text-neon-cyan mt-0.5" />
            <div className="flex-1">
              <p className="text-white text-sm">{alert.message}</p>
              <p className="text-gray-500 text-xs mt-1">{alert.time}</p>
            </div>
            {alert.type === 'escalate' && (
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">需人工</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// 今日房态
function TodayAvailability() {
  const rooms = [
    { type: '大床房', total: 5, available: 2, price: 450 },
    { type: '双床房', total: 3, available: 1, price: 520 },
    { type: '套房', total: 2, available: 0, price: 880 },
  ]

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">今日房态</h3>
        <span className="text-gray-400 text-sm">2024年3月14日</span>
      </div>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.type} className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{room.type}</p>
              <p className="text-gray-400 text-sm">¥{room.price}/晚</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  room.available === 0 ? 'text-red-400' :
                  room.available <= 2 ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>
                  {room.available}
                </span>
                <span className="text-gray-500 text-sm">/{room.total}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                room.available === 0 ? 'bg-red-500' :
                room.available <= 2 ? 'bg-amber-500' :
                'bg-emerald-500'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 欢迎语 */}
      <div>
        <h2 className="text-2xl font-bold text-white">欢迎回来，胡同里精品酒店</h2>
        <p className="text-gray-400 mt-1">今天是 2024年3月14日， here's what's happening today.</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="今日订单"
          value="3"
          change="+12%"
          changeType="up"
          icon={ShoppingCart}
          color="bg-neon-cyan/20"
        />
        <StatCard
          title="今日访客"
          value="128"
          change="+8%"
          changeType="up"
          icon={Eye}
          color="bg-neon-purple/20"
        />
        <StatCard
          title="入住率"
          value="75%"
          change="-5%"
          changeType="down"
          icon={Calendar}
          color="bg-emerald-500/20"
        />
        <StatCard
          title="今日收入"
          value="¥2,340"
          change="+15%"
          changeType="up"
          icon={TrendingUp}
          color="bg-amber-500/20"
        />
      </div>

      {/* 主要内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：最近订单 */}
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        {/* 右侧：AI动态 + 房态 */}
        <div className="space-y-6">
          <AIChatAlerts />
          <TodayAvailability />
        </div>
      </div>
    </div>
  )
}
