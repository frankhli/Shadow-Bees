'use client'

import { useState } from 'react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { AnimatedStatCard } from '@/components/dashboard/AnimatedStatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { useToast } from '@/stores/toastStore'
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Clock,
  MapPin,
  Navigation,
  MessageSquare,
  Phone,
  CheckCircle2,
  Play,
  Sun,
  Moon,
  ChevronRight,
  RefreshCw,
  Users,
  Award,
  Globe,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Timer,
  CheckSquare
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

// 主题色 - Guide端使用绿色
const THEME_COLOR = '#00E396'

// 收入趋势数据
const revenueData = [
  { date: '周一', revenue: 800 },
  { date: '周二', revenue: 1200 },
  { date: '周三', revenue: 600 },
  { date: '周四', revenue: 1400 },
  { date: '周五', revenue: 1800 },
  { date: '周六', revenue: 2400 },
  { date: '周日', revenue: 2100 },
]

// 统计卡片数据
const statsData = [
  { title: '今日服务', value: 2, suffix: '场', trend: 0, color: '#00E396', icon: Calendar },
  { title: '本周收入', value: 2400, prefix: '¥', trend: 15, color: '#00E396', icon: DollarSign },
  { title: '客户评分', value: 4.9, suffix: '分', trend: 2, color: '#FFB800', icon: Star },
  { title: '本月时长', value: 156, suffix: 'h', trend: 8, color: '#A855F7', icon: Clock },
]

// 今日行程
const todaySchedule = [
  {
    id: 1,
    title: '胡同文化深度游',
    time: '09:00 - 12:00',
    location: '南锣鼓巷 → 什刹海 → 恭王府',
    guests: 4,
    nationality: '美国',
    status: 'ongoing',
    progress: 65,
    type: '文化体验',
    earnings: 800,
  },
  {
    id: 2,
    title: '什刹海夜游',
    time: '19:00 - 21:00',
    location: '什刹海酒吧街 → 银锭桥 → 烟袋斜街',
    guests: 2,
    nationality: '法国',
    status: 'upcoming',
    progress: 0,
    type: '夜游',
    earnings: 600,
  },
]

// 本周订单
const weeklyOrders = [
  { id: 'G001', guest: 'John Smith', nationality: '美国', date: '今天', amount: 800, status: 'completed' },
  { id: 'G002', guest: 'Marie Dupont', nationality: '法国', date: '今天', amount: 600, status: 'confirmed' },
  { id: 'G003', guest: '田中健太', nationality: '日本', date: '昨天', amount: 1200, status: 'completed' },
  { id: 'G004', guest: 'Hans Schmidt', nationality: '德国', date: '昨天', amount: 900, status: 'completed' },
]

const nationalityFlags: Record<string, string> = {
  美国: '🇺🇸',
  法国: '🇫🇷',
  日本: '🇯🇵',
  德国: '🇩🇪',
  英国: '🇬🇧',
  西班牙: '🇪🇸',
}

export default function GuideDashboard() {
  const toast = useToast()
  const [activeSchedule, setActiveSchedule] = useState<number | null>(1)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('数据已刷新')
    }, 1000)
  }

  const handleStartService = (id: number) => {
    toast.success('服务已开始', '导航已启动，请准时到达集合地点')
    setActiveSchedule(id)
  }

  const handleComplete = (id: number) => {
    toast.success('服务已完成', '收入已计入账户')
  }

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">我的工作台</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400" />
              今日工作安排和收入统计 · 2024年3月1日 周五
            </p>
          </div>
          <GlowButton 
            color={THEME_COLOR}
            variant="outline"
            onClick={handleRefresh}
            icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
          >
            刷新数据
          </GlowButton>
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
              icon={stat.icon}
              color={stat.color}
              delay={index * 0.1}
              decimals={stat.title === '客户评分' ? 1 : 0}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 两栏布局：今日行程 + 收入趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 今日行程 */}
        <FadeIn delay={0.4} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                  <Calendar className="w-5 h-5" style={{ color: THEME_COLOR }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">今日行程</h2>
                  <p className="text-sm text-slate-400">共 {todaySchedule.length} 场服务</p>
                </div>
              </div>
              <GlowButton 
                color={THEME_COLOR}
                variant="ghost"
                size="sm"
                onClick={() => toast.info('查看完整日程')}
              >
                查看全部
                <ChevronRight className="w-4 h-4 ml-1" />
              </GlowButton>
            </div>

            <div className="space-y-4">
              {todaySchedule.map((schedule, index) => (
                <motion.div
                  key={schedule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
                    activeSchedule === schedule.id
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                  }`}
                  onClick={() => setActiveSchedule(schedule.id)}
                >
                  {/* 状态指示器 */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ 
                      background: schedule.status === 'ongoing' ? THEME_COLOR : '#6B7280',
                      opacity: activeSchedule === schedule.id ? 1 : 0.5
                    }}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-medium">{schedule.title}</h3>
                        {schedule.status === 'ongoing' && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            进行中
                          </span>
                        )}
                        {schedule.status === 'upcoming' && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700 text-slate-400">
                            待开始
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>{schedule.time}</span>
                          {schedule.status === 'ongoing' && (
                            <span className="text-emerald-400">· 还有 45 分钟结束</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-4 h-4" />
                          <span>{schedule.location}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4" />
                            <span>{schedule.guests} 位游客 · {schedule.nationality}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: THEME_COLOR }}>
                            <DollarSign className="w-4 h-4" />
                            <span>¥{schedule.earnings}</span>
                          </div>
                        </div>
                      </div>

                      {/* 进度条 - 进行中显示 */}
                      {schedule.status === 'ongoing' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">服务进度</span>
                            <span style={{ color: THEME_COLOR }}>{schedule.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${schedule.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full rounded-full"
                              style={{ background: THEME_COLOR }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex flex-col gap-2">
                      {schedule.status === 'ongoing' ? (
                        <>
                          <GlowButton
                            color={THEME_COLOR}
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation()
                              handleComplete(schedule.id)
                            }}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            完成
                          </GlowButton>
                          <GlowButton
                            color="#8B9AAF"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation()
                              toast.info('正在联系游客')
                            }}
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            联系
                          </GlowButton>
                        </>
                      ) : (
                        <>
                          <GlowButton
                            color={THEME_COLOR}
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation()
                              handleStartService(schedule.id)
                            }}
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            导航
                          </GlowButton>
                          <GlowButton
                            color="#8B9AAF"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation()
                              toast.info('查看行程详情')
                            }}
                          >
                            详情
                          </GlowButton>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* 收入趋势 */}
        <FadeIn delay={0.5}>
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">收入趋势</h2>
                <p className="text-sm text-slate-400">本周收入统计</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-mono" style={{ color: THEME_COLOR }}>
                  ¥9,300
                </p>
                <p className="text-xs text-emerald-400 flex items-center justify-end gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +15% 较上周
                </p>
              </div>
            </div>
            <RevenueChart data={revenueData} color={THEME_COLOR} />
          </GlassCard>
        </FadeIn>
      </div>

      {/* 三栏布局：订单统计 + 语言能力 + 快捷操作 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 本周订单 */}
        <FadeIn delay={0.6}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5" style={{ color: THEME_COLOR }} />
                <h2 className="text-lg font-semibold text-white">本周订单</h2>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400">
                4 单完成
              </Badge>
            </div>
            <div className="space-y-3">
              {weeklyOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{nationalityFlags[order.nationality]}</span>
                    <div>
                      <p className="text-white text-sm">{order.guest}</p>
                      <p className="text-xs text-slate-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">¥{order.amount}</p>
                    <span className={`text-xs ${
                      order.status === 'completed' ? 'text-emerald-400' : 'text-yellow-400'
                    }`}>
                      {order.status === 'completed' ? '已完成' : '已确认'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* 语言能力 */}
        <FadeIn delay={0.7}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5" style={{ color: THEME_COLOR }} />
              <h2 className="text-lg font-semibold text-white">语言能力</h2>
            </div>
            <div className="space-y-4">
              {[
                { lang: '中文', level: '母语', percent: 100 },
                { lang: '英语', level: '流利', percent: 95 },
                { lang: '日语', level: '熟练', percent: 80 },
                { lang: '法语', level: '基础', percent: 45 },
              ].map((item, index) => (
                <div key={item.lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">{item.lang}</span>
                    <span className="text-slate-400">{item.level}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: THEME_COLOR }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* 快捷操作 */}
        <FadeIn delay={0.8}>
          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5" style={{ color: THEME_COLOR }} />
              <h2 className="text-lg font-semibold text-white">快捷操作</h2>
            </div>
            <div className="space-y-3">
              <GlowButton 
                color={THEME_COLOR}
                className="w-full justify-start"
                onClick={() => toast.info('进入排班管理')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                管理排班
              </GlowButton>
              <GlowButton 
                color="#00F0FF"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('进入AI客服')}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI客服对话
              </GlowButton>
              <GlowButton 
                color="#FFB800"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('查看收入明细')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                收入明细
              </GlowButton>
              <GlowButton 
                color="#A855F7"
                variant="outline"
                className="w-full justify-start"
                onClick={() => toast.info('编辑个人介绍')}
              >
                <Award className="w-4 h-4 mr-2" />
                编辑介绍
              </GlowButton>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  )
}
