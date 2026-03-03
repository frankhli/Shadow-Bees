'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore, type Order } from '@/stores/platformStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  MessageCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Navigation,
  Phone,
  DollarSign,
  AlertCircle,
  Filter,
  RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton, ListItemSkeleton } from '@/components/ui/Skeleton'

const THEME_COLOR = '#00E396'

const statusConfig = {
  pending: { label: '待确认', color: 'bg-yellow-500/20 text-yellow-400', icon: AlertCircle },
  confirmed: { label: '已确认', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  active: { label: '进行中', color: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle },
  completed: { label: '已完成', color: 'bg-slate-500/20 text-slate-400', icon: CheckCircle },
  cancelled: { label: '已取消', color: 'bg-red-500/20 text-red-400', icon: XCircle },
}

export default function GuideOrdersPage() {
  const toast = useToast()
  const { orders, updateOrder, isLoading } = usePlatformStore()
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all')
  const [processingId, setProcessingId] = useState<string | null>(null)

  // 筛选订单
  const filteredOrders = orders.filter(o => 
    o.type === 'guide' && (filter === 'all' || o.status === filter)
  )

  // 处理接受订单
  const handleAccept = async (orderId: string) => {
    setProcessingId(orderId)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      updateOrder(orderId, { status: 'confirmed' })
      toast.success('订单已接受', '您已成功接受该订单，请准时提供服务')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 处理拒绝订单
  const handleReject = async (orderId: string) => {
    if (!confirm('确定要拒绝这个订单吗？')) return
    
    setProcessingId(orderId)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      updateOrder(orderId, { status: 'cancelled' })
      toast.warning('订单已拒绝', '该订单已被取消')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 处理完成订单
  const handleComplete = async (orderId: string) => {
    setProcessingId(orderId)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      updateOrder(orderId, { 
        status: 'completed',
        completedAt: new Date().toISOString()
      })
      toast.success('服务已完成', '收入已计入您的账户')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 处理联系客人
  const handleContact = (order: Order) => {
    toast.info('联系客人', `正在拨打 ${order.userName} 的电话...`)
    // 实际项目中这里会打开电话或聊天窗口
  }

  // 处理导航
  const handleNavigate = (order: Order) => {
    toast.info('启动导航', `正在规划前往 ${order.title} 的路线...`)
    // 实际项目中这里会调用地图API
  }

  // 统计
  const stats = {
    pending: filteredOrders.filter(o => o.status === 'pending').length,
    confirmed: filteredOrders.filter(o => o.status === 'confirmed').length,
    active: filteredOrders.filter(o => o.status === 'active').length,
    completed: filteredOrders.filter(o => o.status === 'completed').length,
    totalRevenue: filteredOrders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.netAmount, 0),
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <StatCardSkeleton key={i} />)}
        </div>
        <div className="space-y-3">
          {[1,2,3].map(i => <ListItemSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="服务订单"
            description="管理和跟踪您的所有服务订单"
          />
          <GlowButton 
            color={THEME_COLOR}
            variant="outline"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => toast.success('数据已刷新')}
          >
            刷新
          </GlowButton>
        </div>
      </FadeIn>

      {/* 统计卡片 */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-4" onClick={() => setFilter('pending')}>
            <p className="text-slate-400 text-sm">待确认</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4" onClick={() => setFilter('confirmed')}>
            <p className="text-slate-400 text-sm">已确认</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.confirmed}</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4" onClick={() => setFilter('active')}>
            <p className="text-slate-400 text-sm">进行中</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.active}</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <p className="text-slate-400 text-sm">累计收入</p>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: THEME_COLOR }}>
              ¥{stats.totalRevenue.toLocaleString()}
            </p>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 筛选器 */}
      <FadeIn delay={0.2}>
        <div className="flex gap-2 flex-wrap">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '待确认' },
            { key: 'confirmed', label: '已确认' },
            { key: 'active', label: '进行中' },
            { key: 'completed', label: '已完成' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as Order['status'] | 'all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === item.key
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* 订单列表 */}
      <FadeIn delay={0.3}>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order, index) => {
              const status = statusConfig[order.status as keyof typeof statusConfig]
              const StatusIcon = status?.icon || AlertCircle
              const isProcessing = processingId === order.id

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* 订单信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{order.title}</h3>
                        <Badge className={status?.color || ''}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status?.label || order.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-4 h-4" />
                          <span>{order.userName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-4 h-4" />
                          <span>{order.serviceDate || order.bookingDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-4 h-4" />
                          <span>{order.guests} 人</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: THEME_COLOR }}>
                          <DollarSign className="w-4 h-4" />
                          <span>¥{order.netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2 flex-shrink-0">
                      {order.status === 'pending' && (
                        <>
                          <GlowButton
                            color="#00E396"
                            size="sm"
                            disabled={isProcessing}
                            onClick={() => handleAccept(order.id)}
                            icon={isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                          >
                            接受
                          </GlowButton>
                          <GlowButton
                            color="#FF4757"
                            variant="outline"
                            size="sm"
                            disabled={isProcessing}
                            onClick={() => handleReject(order.id)}
                          >
                            拒绝
                          </GlowButton>
                        </>
                      )}

                      {order.status === 'confirmed' && (
                        <>
                          <GlowButton
                            color="#00E396"
                            variant="outline"
                            size="sm"
                            onClick={() => handleNavigate(order)}
                            icon={<Navigation className="w-4 h-4" />}
                          >
                            导航
                          </GlowButton>
                          <GlowButton
                            color="#8B9AAF"
                            variant="outline"
                            size="sm"
                            onClick={() => handleContact(order)}
                            icon={<Phone className="w-4 h-4" />}
                          >
                            联系
                          </GlowButton>
                        </>
                      )}

                      {order.status === 'active' && (
                        <GlowButton
                          color="#00E396"
                          size="sm"
                          disabled={isProcessing}
                          onClick={() => handleComplete(order.id)}
                          icon={isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        >
                          完成服务
                        </GlowButton>
                      )}

                      {order.status === 'completed' && (
                        <span className="text-slate-500 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          已完成
                        </span>
                      )}

                      {order.status === 'cancelled' && (
                        <span className="text-red-400 text-sm flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          已取消
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-white text-lg">暂无订单</p>
              <p className="text-slate-500">当前筛选条件下没有订单数据</p>
            </div>
          )}
        </div>
      </FadeIn>
    </div>
  )
}

// 统计卡片骨架屏
function StatCardSkeleton() {
  return (
    <div className="p-4 rounded-xl bg-[#141B2D] border border-white/5">
      <div className="h-4 w-16 bg-slate-800 rounded mb-2" />
      <div className="h-8 w-12 bg-slate-800 rounded" />
    </div>
  )
}
