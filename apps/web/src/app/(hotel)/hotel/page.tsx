'use client'

import { useState, useEffect } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { AnimatedStatCard } from '@/components/dashboard/AnimatedStatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { useToast } from '@/stores/toastStore'
import { 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MessageCircle,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  Zap,
  Target,
  RefreshCw,
  Clock,
  ChevronRight,
  Bot,
  Bell,
  CheckCircle2,
  Globe
} from 'lucide-react'
import { motion } from 'framer-motion'

// 模拟数据 - 7天收益趋势
const revenueData = [
  { date: '02-20', revenue: 4200 },
  { date: '02-21', revenue: 5100 },
  { date: '02-22', revenue: 4800 },
  { date: '02-23', revenue: 6200 },
  { date: '02-24', revenue: 5800 },
  { date: '02-25', revenue: 7200 },
  { date: '02-26', revenue: 8450 },
]

// 统计卡片数据
const statsData = [
  { title: '今日收入', value: 8450, prefix: '¥', trend: 12, color: '#00F0FF', icon: DollarSign },
  { title: '入住率', value: 87, suffix: '%', trend: 5, color: '#00E396', icon: Users },
  { title: '新订单', value: 12, trend: 33, color: '#FFB800', icon: Calendar },
  { title: 'AI会话', value: 24, trend: -8, trendLabel: '待处理 3', color: '#A855F7', icon: MessageCircle },
]

// 订单数据
const recentOrders = [
  { id: 'ORD001', guest: 'John Smith', nationality: 'US', lang: 'EN', amount: 2400, status: 'confirmed', time: '10分钟前' },
  { id: 'ORD002', guest: 'Maria Garcia', nationality: 'ES', lang: 'ES', amount: 1800, status: 'pending', time: '25分钟前' },
  { id: 'ORD003', guest: 'Pierre Dubois', nationality: 'FR', lang: 'FR', amount: 3200, status: 'confirmed', time: '1小时前' },
  { id: 'ORD004', guest: '田中太郎', nationality: 'JP', lang: 'JA', amount: 2800, status: 'confirmed', time: '2小时前' },
  { id: 'ORD005', guest: 'Hans Mueller', nationality: 'DE', lang: 'DE', amount: 1950, status: 'confirmed', time: '3小时前' },
]

const nationalityFlags: Record<string, string> = {
  US: '🇺🇸',
  ES: '🇪🇸',
  FR: '🇫🇷',
  DE: '🇩🇪',
  JP: '🇯🇵',
}

// AI建议
const aiSuggestions = [
  {
    id: 1,
    type: 'pricing',
    priority: 'high',
    icon: TrendingUp,
    color: '#00E396',
    title: '调价机会',
    message: '明日工体演唱会，周边酒店已涨价20%，建议跟进',
    action: '一键调价',
  },
  {
    id: 2,
    type: 'service',
    priority: 'high',
    icon: MessageCircle,
    color: '#FFB800',
    title: '客服提醒',
    message: '3条英文咨询AI置信度低，建议人工介入',
    action: '立即处理',
  },
  {
    id: 3,
    type: 'inventory',
    priority: 'medium',
    icon: AlertTriangle,
    color: '#FF4757',
    title: '库存预警',
    message: '本周末Direct池仅剩2间，建议从OTA池调配',
    action: '调整库存',
  },
]

export default function HotelDashboard() {
  const toast = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dismissedSuggestions, setDismissedSuggestions] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('数据已刷新', '经营数据已更新至最新状态')
    }, 1000)
  }

  const handleAction = (action: string) => {
    toast.success(`${action}成功`, '操作已执行')
  }

  const dismissSuggestion = (id: number) => {
    setDismissedSuggestions([...dismissedSuggestions, id])
    toast.info('建议已标记为已读')
  }

  const visibleSuggestions = mounted 
    ? aiSuggestions.filter(s => !dismissedSuggestions.includes(s.id))
    : aiSuggestions // 服务端渲染时显示所有建议

  if (!mounted) {
    return (
      <div className="p-8 space-y-8 min-h-screen">
        {/* 静态占位内容 */}
        <div className="h-8 w-48 bg-slate-800/50 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-32 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-800/50 rounded-xl animate-pulse" />
          <div className="h-96 bg-slate-800/50 rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">经营概览</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              实时监控酒店运营数据 · 今日 2024年3月1日
            </p>
          </div>
          <GlowButton 
            color="#00F0FF" 
            variant="outline"
            onClick={handleRefresh}
            icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
          >
            刷新数据
          </GlowButton>
        </div>
      </FadeIn>

      {/* AI行动建议 */}
      {visibleSuggestions.length > 0 && (
        <FadeIn delay={0.1}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">AI行动建议</h2>
                  <p className="text-sm text-slate-400">基于数据分析的智能推荐</p>
                </div>
                <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                  {visibleSuggestions.length} 条待处理
                </span>
              </div>
              <GlowButton 
                color="#8B9AAF" 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setDismissedSuggestions(aiSuggestions.map(s => s.id))
                  toast.info('全部标记为已读')
                }}
              >
                <Target className="w-4 h-4 mr-1" />
                全部已读
              </GlowButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleSuggestions.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ background: `${item.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white font-medium text-sm">{item.title}</p>
                          {item.priority === 'high' && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400">
                              紧急
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mb-3 leading-relaxed">{item.message}</p>
                        <div className="flex items-center gap-2">
                          <GlowButton 
                            color={item.color} 
                            size="sm"
                            onClick={() => handleAction(item.action)}
                          >
                            {item.action}
                          </GlowButton>
                          <button 
                            onClick={() => dismissSuggestion(item.id)}
                            className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1"
                          >
                            忽略
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        </FadeIn>
      )}

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
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 图表和订单两栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 收益趋势图 */}
        <FadeIn delay={0.4} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">收益趋势</h2>
                <p className="text-sm text-slate-400">近7天收入变化</p>
              </div>
              <div className="flex gap-2">
                {['7天', '30天', '90天'].map((period) => (
                  <button
                    key={period}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <RevenueChart data={revenueData} color="#00F0FF" />
          </GlassCard>
        </FadeIn>

        {/* 最近订单 */}
        <FadeIn delay={0.5}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">最近订单</h2>
                <p className="text-sm text-slate-400">实时预订动态</p>
              </div>
              <GlowButton 
                color="#00F0FF" 
                variant="ghost" 
                size="sm"
                onClick={() => toast.info('跳转到订单管理')}
              >
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </GlowButton>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors group cursor-pointer"
                >
                  <span className="text-2xl">{nationalityFlags[order.nationality]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{order.guest}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Globe className="w-3 h-3" />
                      <span>{order.lang}</span>
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{order.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">¥{order.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'confirmed' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status === 'confirmed' ? '已确认' : '待确认'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 快捷操作区 */}
      <FadeIn delay={0.6}>
        <div className="flex flex-wrap gap-4">
          <GlowButton 
            color="#00F0FF"
            onClick={() => handleAction('AI定价')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            AI生成今日房价
          </GlowButton>
          <GlowButton 
            color="#A855F7"
            variant="outline"
            onClick={() => handleAction('客服')}
            icon={<Bot className="w-4 h-4" />}
          >
            查看AI客服
          </GlowButton>
          <GlowButton 
            color="#00E396"
            variant="outline"
            onClick={() => handleAction('房态')}
            icon={<Calendar className="w-4 h-4" />}
          >
            房态日历
          </GlowButton>
          <GlowButton 
            color="#FFB800"
            variant="outline"
            onClick={() => toast.info('功能开发中')}
            icon={<Bell className="w-4 h-4" />}
          >
            设置提醒
          </GlowButton>
        </div>
      </FadeIn>
    </div>
  )
}
