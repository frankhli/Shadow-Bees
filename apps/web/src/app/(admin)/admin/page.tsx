'use client'

import { useState } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { AnimatedStatCard } from '@/components/dashboard/AnimatedStatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { useToast } from '@/stores/toastStore'
import { 
  Building2, 
  Users, 
  MapPin, 
  DollarSign,
  Shield,
  Globe,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

// 主题色 - Admin端使用紫色
const THEME_COLOR = '#A855F7'

// 收入趋势数据
const revenueData = [
  { date: '周一', revenue: 15800 },
  { date: '周二', revenue: 18200 },
  { date: '周三', revenue: 21500 },
  { date: '周四', revenue: 19800 },
  { date: '周五', revenue: 25600 },
  { date: '周六', revenue: 32400 },
  { date: '周日', revenue: 28900 },
]

// 统计卡片数据
const statsData = [
  { title: '注册酒店', value: 128, suffix: '家', trend: 8, trendLabel: '待审核 12', color: '#00F0FF', icon: Building2 },
  { title: '认证导游', value: 86, suffix: '人', trend: 12, trendLabel: '在线 24', color: '#00E396', icon: Users },
  { title: '体验店', value: 45, suffix: '家', trend: 5, trendLabel: '活动 128', color: '#FFB800', icon: MapPin },
  { title: '平台收入', value: 128450, prefix: '¥', suffix: '', trend: 15, color: '#A855F7', icon: DollarSign },
]

// 待审核列表
const pendingReviews = [
  { id: 1, type: 'hotel', name: '悦榕庄精品酒店', city: '北京', submitTime: '2小时前', status: 'pending' },
  { id: 2, type: 'guide', name: '李导游', languages: '中英日', city: '上海', submitTime: '3小时前', status: 'pending' },
  { id: 3, type: 'venue', name: '故宫文创体验店', city: '北京', submitTime: '5小时前', status: 'pending' },
  { id: 4, type: 'hotel', name: '西湖度假村', city: '杭州', submitTime: '昨天', status: 'pending' },
]

// 用户增长数据
const userGrowthData = [
  { date: '周一', users: 120 },
  { date: '周二', users: 145 },
  { date: '周三', users: 138 },
  { date: '周四', users: 162 },
  { date: '周五', users: 188 },
  { date: '周六', users: 215 },
  { date: '周日', users: 198 },
]

// 收入分布
const revenueDistribution = [
  { source: '酒店预订', amount: 85400, percent: 66.4 },
  { source: '导游服务', amount: 28400, percent: 22.1 },
  { source: '体验活动', amount: 14650, percent: 11.4 },
]

// 系统健康度
const systemHealth = [
  { name: 'API服务', status: 'healthy', uptime: '99.9%' },
  { name: '数据库', status: 'healthy', uptime: '99.99%' },
  { name: 'AI服务', status: 'warning', uptime: '98.5%' },
  { name: '支付服务', status: 'healthy', uptime: '99.9%' },
]

export default function AdminDashboard() {
  const toast = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTab, setSelectedTab] = useState('all')

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('数据已刷新', '平台数据已更新至最新状态')
    }, 1000)
  }

  const handleApprove = (id: number, name: string) => {
    toast.success('审核通过', `${name} 已通过审核`)
  }

  const handleReject = (id: number, name: string) => {
    toast.warning('已拒绝', `${name} 的审核申请已拒绝`)
  }

  const filteredReviews = selectedTab === 'all' 
    ? pendingReviews 
    : pendingReviews.filter(r => r.type === selectedTab)

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">平台概览</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              实时监控平台运营数据 · 全局监管中心
            </p>
          </div>
          <div className="flex gap-3">
            <GlowButton 
              color={THEME_COLOR}
              variant="outline"
              onClick={handleRefresh}
              icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
            >
              刷新数据
            </GlowButton>
            <GlowButton 
              color={THEME_COLOR}
              onClick={() => toast.info('生成报表')}
              icon={<BarChart3 className="w-4 h-4" />}
            >
              生成报表
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
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 两栏布局：收入趋势 + 待审核 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 收入趋势 */}
        <FadeIn delay={0.4} className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <TrendingUp className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">平台收入趋势</h2>
                  <p className="text-sm text-slate-400">本周收入统计</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-400">本周总收</p>
                  <p className="text-xl font-bold font-mono" style={{ color: THEME_COLOR }}>
                    ¥162,200
                  </p>
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
            </div>
            <RevenueChart data={revenueData} color={THEME_COLOR} />
          </GlassCard>
        </FadeIn>

        {/* 收入分布 */}
        <FadeIn delay={0.5}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <PieChart className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">收入分布</h2>
                <p className="text-sm text-slate-400">按业务类型</p>
              </div>
            </div>

            <div className="space-y-4">
              {revenueDistribution.map((item, index) => (
                <motion.div
                  key={item.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm">{item.source}</span>
                    <div className="text-right">
                      <span className="text-white font-medium">¥{item.amount.toLocaleString()}</span>
                      <span className="text-slate-500 text-sm ml-2">({item.percent}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ 
                        background: index === 0 ? '#00F0FF' : index === 1 ? '#00E396' : '#FFB800'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">总佣金收入</span>
                <span className="text-2xl font-bold" style={{ color: THEME_COLOR }}>
                  ¥{statsData[3].value.toLocaleString()}
                </span>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 两栏布局：待审核 + 系统健康 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 待审核列表 */}
        <FadeIn delay={0.6}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <Shield className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">待审核</h2>
                  <p className="text-sm text-slate-400">共 {pendingReviews.length} 条待处理</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: '全部' },
                  { key: 'hotel', label: '酒店' },
                  { key: 'guide', label: '导游' },
                  { key: 'venue', label: '体验店' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                      selectedTab === tab.key
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        review.type === 'hotel' ? 'bg-cyan-500/20' :
                        review.type === 'guide' ? 'bg-emerald-500/20' :
                        'bg-amber-500/20'
                      }`}>
                        {review.type === 'hotel' ? <Building2 className="w-5 h-5 text-cyan-400" /> :
                         review.type === 'guide' ? <Users className="w-5 h-5 text-emerald-400" /> :
                         <MapPin className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{review.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span>{review.city}</span>
                          <span>·</span>
                          <Clock className="w-3 h-3" />
                          <span>{review.submitTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GlowButton
                        color="#00E396"
                        size="sm"
                        onClick={() => handleApprove(review.id, review.name)}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        通过
                      </GlowButton>
                      <GlowButton
                        color="#FF4757"
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(review.id, review.name)}
                      >
                        拒绝
                      </GlowButton>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </FadeIn>

        {/* 系统健康 */}
        <FadeIn delay={0.7}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <Zap className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">系统健康</h2>
                  <p className="text-sm text-slate-400">服务运行状态</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400">
                运行正常
              </Badge>
            </div>

            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'healthy' ? 'bg-emerald-400' : 'bg-yellow-400'
                    }`}>
                      {service.status === 'healthy' && (
                        <span className="block w-full h-full rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <span className="text-white">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${
                      service.status === 'healthy' ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>
                      {service.status === 'healthy' ? '正常' : '警告'}
                    </span>
                    <span className="text-slate-500 text-sm">{service.uptime}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                  <p className="text-xs text-slate-500">平均可用性</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">45ms</p>
                  <p className="text-xs text-slate-500">平均响应</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-xs text-slate-500">异常事件</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 快捷操作区 */}
      <FadeIn delay={0.8}>
        <div className="flex flex-wrap gap-4">
          <GlowButton 
            color={THEME_COLOR}
            onClick={() => toast.info('查看详细数据')}
            icon={<BarChart3 className="w-4 h-4" />}
          >
            数据分析
          </GlowButton>
          <GlowButton 
            color="#00F0FF"
            variant="outline"
            onClick={() => toast.info('进入AI监管中心')}
            icon={<Sparkles className="w-4 h-4" />}
          >
            AI监管中心
          </GlowButton>
          <GlowButton 
            color="#00E396"
            variant="outline"
            onClick={() => toast.info('查看财务报表')}
            icon={<DollarSign className="w-4 h-4" />}
          >
            财务报表
          </GlowButton>
          <GlowButton 
            color="#FFB800"
            variant="outline"
            onClick={() => toast.info('查看用户管理')}
            icon={<Users className="w-4 h-4" />}
          >
            用户管理
          </GlowButton>
        </div>
      </FadeIn>
    </div>
  )
}
