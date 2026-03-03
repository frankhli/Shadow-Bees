'use client'

import { useState } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { AnimatedStatCard } from '@/components/dashboard/AnimatedStatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { useToast } from '@/stores/toastStore'
import { 
  PlusCircle, 
  Ticket, 
  DollarSign, 
  Star,
  Calendar,
  Clock,
  Users,
  MapPin,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Edit3,
  BarChart3,
  Zap,
  Sun,
  CheckCircle2,
  AlertCircle,
  Timer
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

// 主题色 - Venue端使用橙色
const THEME_COLOR = '#FFB800'

// 收入趋势数据
const revenueData = [
  { date: '周一', revenue: 1200 },
  { date: '周二', revenue: 1800 },
  { date: '周三', revenue: 2100 },
  { date: '周四', revenue: 1650 },
  { date: '周五', revenue: 2400 },
  { date: '周六', revenue: 3200 },
  { date: '周日', revenue: 2800 },
]

// 统计卡片数据
const statsData = [
  { title: '今日活动', value: 3, suffix: '场', trend: 0, trendLabel: '2个已满员', color: '#FFB800', icon: Calendar },
  { title: '今日预订', value: 24, suffix: '人', trend: 33, color: '#FFB800', icon: Ticket },
  { title: '本月收入', value: 8650, prefix: '¥', trend: 12, color: '#00E396', icon: DollarSign },
  { title: '店铺评分', value: 4.8, suffix: '分', trend: 5, color: '#A855F7', icon: Star, decimals: 1 },
]

// 进行中的活动
const activeActivities = [
  {
    id: 1,
    title: '老北京茶馆品茗体验',
    time: '14:00 - 16:00',
    schedule: '每日',
    price: 168,
    capacity: 12,
    booked: 10,
    status: 'active',
    image: '🍵',
  },
  {
    id: 2,
    title: '京剧脸谱绘制工作坊',
    time: '10:00 - 12:00',
    schedule: '周末',
    price: 288,
    capacity: 8,
    booked: 8,
    status: 'full',
    image: '🎭',
  },
  {
    id: 3,
    title: '老北京糖画体验',
    time: '16:00 - 18:00',
    schedule: '每日',
    price: 88,
    capacity: 15,
    booked: 6,
    status: 'active',
    image: '🍭',
  },
]

// 最新预订
const recentBookings = [
  { id: 1, name: 'John Smith', activity: '茶馆品茗', time: '10分钟前', people: 2, amount: 336, nationality: '美国' },
  { id: 2, name: 'Emma Wilson', activity: '脸谱绘制', time: '30分钟前', people: 4, amount: 1152, nationality: '英国' },
  { id: 3, name: 'Marco Rossi', activity: '茶馆品茗', time: '1小时前', people: 1, amount: 168, nationality: '意大利' },
  { id: 4, name: 'Yuki Tanaka', activity: '糖画体验', time: '2小时前', people: 3, amount: 264, nationality: '日本' },
]

// 快速统计数据
const quickStats = [
  { label: '今日核销', value: 18, total: 24, color: '#00E396' },
  { label: '待核销', value: 6, total: 24, color: '#FFB800' },
  { label: '取消/退款', value: 0, total: 24, color: '#FF4757' },
]

const nationalityFlags: Record<string, string> = {
  美国: '🇺🇸',
  英国: '🇬🇧',
  意大利: '🇮🇹',
  日本: '🇯🇵',
  法国: '🇫🇷',
  德国: '🇩🇪',
}

export default function VenueDashboard() {
  const toast = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('数据已刷新')
    }, 1000)
  }

  const handleCreateActivity = () => {
    toast.success('进入活动创建页面')
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">店铺概览</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-400" />
              实时经营数据监控 · 2024年3月1日
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton 
              color={THEME_COLOR}
              variant="outline"
              onClick={handleRefresh}
              icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
            >
              刷新
            </GlowButton>
            <GlowButton 
              color={THEME_COLOR}
              onClick={handleCreateActivity}
              icon={<PlusCircle className="w-4 h-4" />}
            >
              新建活动
            </GlowButton>
          </div>
        </div>
      </FadeIn>

      {/* 统计卡片 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StaggerItem key={stat.title}>
            <AnimatedStatCard
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              trend={stat.trend}
              trendLabel={stat.trendLabel}
              icon={stat.icon}
              color={stat.color}
              delay={index * 0.1}
              decimals={stat.decimals || 0}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 两栏布局：活动 + 预订 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 进行中的活动 */}
        <FadeIn delay={0.4}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <Zap className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">进行中的活动</h2>
                  <p className="text-sm text-slate-400">共 {activeActivities.length} 个活动</p>
                </div>
              </div>
              <GlowButton 
                color={THEME_COLOR}
                variant="ghost"
                size="sm"
                onClick={() => toast.info('查看全部活动')}
              >
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </GlowButton>
            </div>

            <div className="space-y-4">
              {activeActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group cursor-pointer border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    {/* 活动图标 */}
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl">
                      {activity.image}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">{activity.title}</h3>
                        {activity.status === 'full' ? (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400">
                            已满员
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                            可预订
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {activity.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {activity.schedule}
                        </span>
                      </div>

                      {/* 预订进度 */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">预订进度</span>
                            <span className={activity.status === 'full' ? 'text-red-400' : 'text-emerald-400'}>
                              {activity.booked}/{activity.capacity}
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(activity.booked / activity.capacity) * 100}%` }}
                              transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ 
                                background: activity.status === 'full' ? '#FF4757' : THEME_COLOR 
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-white font-medium">¥{activity.price}</span>
                      </div>
                    </div>

                    {/* 编辑按钮 */}
                    <GlowButton
                      color="#8B9AAF"
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e?.stopPropagation()
                        toast.info('编辑活动')
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </GlowButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* 最新预订 */}
        <FadeIn delay={0.5}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <Ticket className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">最新预订</h2>
                  <p className="text-sm text-slate-400">实时订单动态</p>
                </div>
              </div>
              <GlowButton 
                color={THEME_COLOR}
                variant="ghost"
                size="sm"
                onClick={() => toast.info('查看全部预订')}
              >
                全部预订
                <ChevronRight className="w-4 h-4 ml-1" />
              </GlowButton>
            </div>

            <div className="space-y-3">
              {recentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{nationalityFlags[booking.nationality]}</span>
                    <div>
                      <p className="text-white font-medium">{booking.name}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>{booking.activity}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {booking.people}人
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">¥{booking.amount}</p>
                    <p className="text-xs text-slate-500">{booking.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 三栏布局：今日核销 + 收入趋势 + 快捷操作 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 今日核销统计 */}
        <FadeIn delay={0.6}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">今日核销</h2>
                <p className="text-sm text-slate-400">共 {statsData[1].value} 人预订</p>
              </div>
            </div>

            <div className="space-y-6">
              {quickStats.map((stat, index) => (
                <div key={stat.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                    <span className="text-white font-medium">
                      {stat.value} <span className="text-slate-500 text-sm">/ {stat.total}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stat.value / stat.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">核销率</span>
                <span className="text-2xl font-bold text-emerald-400">75%</span>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* 收入趋势 */}
        <FadeIn delay={0.7}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <BarChart3 className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">收入趋势</h2>
                  <p className="text-sm text-slate-400">本周收入统计</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15%
                </p>
              </div>
            </div>
            <RevenueChart data={revenueData} color={THEME_COLOR} />
          </GlassCard>
        </FadeIn>

        {/* 快捷操作 */}
        <FadeIn delay={0.8}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <Sparkles className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <h2 className="text-lg font-semibold text-white">快捷操作</h2>
            </div>

            <div className="space-y-3">
              <GlowButton 
                color={THEME_COLOR}
                className="w-full justify-start"
                onClick={handleCreateActivity}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                创建新活动
              </GlowButton>
              <GlowButton 
                color="#00F0FF"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('查看核销二维码')}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                核销二维码
              </GlowButton>
              <GlowButton 
                color="#A855F7"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('查看数据分析')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                数据分析
              </GlowButton>
              <GlowButton 
                color="#00E396"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('进入AI定价')}
              >
                <Zap className="w-4 h-4 mr-2" />
                AI定价助手
              </GlowButton>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  )
}
