import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  MousePointer,
  ExternalLink,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from 'lucide-react'

const mockStats = {
  totalClicks: 234,
  byPlatform: {
    booking: 156,
    airbnb: 78,
  },
  byDate: [
    { date: '02-20', clicks: 12 },
    { date: '02-21', clicks: 18 },
    { date: '02-22', clicks: 25 },
    { date: '02-23', clicks: 15 },
    { date: '02-24', clicks: 32 },
    { date: '02-25', clicks: 28 },
    { date: '02-26', clicks: 22 },
  ],
  recentClicks: [
    { id: '1', platform: 'booking', time: '10分钟前', source: '酒店详情页' },
    { id: '2', platform: 'airbnb', time: '25分钟前', source: '搜索结果' },
    { id: '3', platform: 'booking', time: '1小时前', source: '首页推荐' },
    { id: '4', platform: 'booking', time: '2小时前', source: '酒店详情页' },
  ],
}

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
    <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
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
        <span className="text-gray-500 text-sm ml-1">vs 上周</span>
      </div>
    </div>
  )
}

export function Analytics() {
  const [dateRange, setDateRange] = useState('7d')

  const totalBooking = mockStats.byPlatform.booking
  const totalAirbnb = mockStats.byPlatform.airbnb
  const estimatedBookings = Math.round(mockStats.totalClicks * 0.035)
  const estimatedRevenue = estimatedBookings * 85

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">数据洞察</h2>
          <p className="text-gray-400 text-sm mt-1">查看导流效果和客户行为分析</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-cyan focus:outline-none"
          >
            <option value="7d">近7天</option>
            <option value="30d">近30天</option>
            <option value="90d">近90天</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white text-sm hover:border-neon-cyan transition-colors">
            <Download size={16} />
            导出报告
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="总点击数"
          value={mockStats.totalClicks.toString()}
          change="+12%"
          changeType="up"
          icon={MousePointer}
          color="bg-neon-cyan/20"
        />
        <StatCard
          title="Booking.com"
          value={totalBooking.toString()}
          change="+8%"
          changeType="up"
          icon={ExternalLink}
          color="bg-blue-500/20"
        />
        <StatCard
          title="Airbnb"
          value={totalAirbnb.toString()}
          change="+15%"
          changeType="up"
          icon={ExternalLink}
          color="bg-rose-500/20"
        />
        <StatCard
          title="预估收入"
          value={`$${estimatedRevenue}`}
          change="+20%"
          changeType="up"
          icon={DollarSign}
          color="bg-emerald-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 平台分布 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">平台分布</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-white">Booking.com</span>
                </span>
                <span className="text-white font-medium">{totalBooking} 次</span>
              </div>
              <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalBooking / mockStats.totalClicks) * 100}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                占比 {Math.round((totalBooking / mockStats.totalClicks) * 100)}%
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-white">Airbnb</span>
                </span>
                <span className="text-white font-medium">{totalAirbnb} 次</span>
              </div>
              <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalAirbnb / mockStats.totalClicks) * 100}%` }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                占比 {Math.round((totalAirbnb / mockStats.totalClicks) * 100)}%
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-600">
            <h4 className="text-sm text-gray-400 mb-3">转化漏斗</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">页面访问</span>
                <span className="text-white">1,240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">点击预订</span>
                <span className="text-white">234 ({Math.round(234/1240*100)}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">预估成交</span>
                <span className="text-emerald-400">{estimatedBookings} ({Math.round(estimatedBookings/234*100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 趋势图 */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-dark-600 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">点击趋势</h3>
          
          <div className="h-64 flex items-end gap-3">
            {mockStats.byDate.map((day, index) => {
              const maxClicks = Math.max(...mockStats.byDate.map(d => d.clicks))
              const height = (day.clicks / maxClicks) * 100
              
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full bg-gradient-to-t from-neon-cyan/20 to-neon-cyan/60 rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-700 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.clicks} 次点击
                    </div>
                  </motion.div>
                  <span className="text-xs text-gray-500">{day.date}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 最近点击 */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">最近点击</h3>
        <div className="space-y-3">
          {mockStats.recentClicks.map((click) => (
            <div
              key={click.id}
              className="flex items-center justify-between p-4 bg-dark-900 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-xs ${
                  click.platform === 'booking' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {click.platform === 'booking' ? 'Booking.com' : 'Airbnb'}
                </div>
                <div>
                  <p className="text-white text-sm">{click.source}</p>
                  <p className="text-gray-500 text-xs">{click.time}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">UTM: tiaohai</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
