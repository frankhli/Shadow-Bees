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
  Calendar,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Search,
  QrCode,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  MapPin,
  Phone,
  CheckSquare,
  Timer
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const THEME_COLOR = '#FFB800'

export default function TodayBookingsPage() {
  const toast = useToast()
  const { orders, updateOrder } = usePlatformStore()
  const [searchCode, setSearchCode] = useState('')
  const [showCheckInDialog, setShowCheckInDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // 今日订单 - 使用store数据，筛选venue类型且是今天的
  const today = new Date().toISOString().split('T')[0]
  const todayOrders = orders.filter(o => 
    o.type === 'venue' && o.serviceDate === today && o.status !== 'cancelled'
  )

  // 核销状态统计
  const stats = {
    total: todayOrders.length,
    checkedIn: todayOrders.filter(o => o.status === 'completed').length,
    pending: todayOrders.filter(o => o.status === 'confirmed').length,
    revenue: todayOrders.reduce((sum, o) => sum + o.netAmount, 0),
  }

  // 核销率
  const checkInRate = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0

  // 处理核销
  const handleCheckIn = async (orderId: string) => {
    setProcessingId(orderId)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      updateOrder(orderId, { 
        status: 'completed',
        completedAt: new Date().toISOString()
      })
      toast.success('核销成功', '预订已完成核销')
    } catch (error) {
      toast.error('核销失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 批量核销
  const handleBatchCheckIn = async () => {
    const pendingOrders = todayOrders.filter(o => o.status === 'confirmed')
    if (pendingOrders.length === 0) {
      toast.info('没有待核销的预订')
      return
    }

    for (const order of pendingOrders) {
      await handleCheckIn(order.id)
    }
    toast.success('批量核销完成', `共核销 ${pendingOrders.length} 个预订`)
  }

  // 扫码核销
  const handleScanCheckIn = () => {
    if (!searchCode.trim()) {
      toast.warning('请输入核销码')
      return
    }

    const order = todayOrders.find(o => o.id === searchCode || o.id.includes(searchCode))
    if (!order) {
      toast.error('未找到匹配的预订')
      return
    }

    if (order.status === 'completed') {
      toast.warning('该预订已核销')
      return
    }

    setSelectedOrder(order)
    setShowCheckInDialog(true)
  }

  // 搜索筛选
  const filteredOrders = searchCode 
    ? todayOrders.filter(o => 
        o.id.toLowerCase().includes(searchCode.toLowerCase()) ||
        o.userName.toLowerCase().includes(searchCode.toLowerCase())
      )
    : todayOrders

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="今日预订"
            description={`${today} 的预订核销管理`}
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
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">今日预订</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">已核销</p>
                <p className="text-2xl font-bold text-white">{stats.checkedIn}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Timer className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">待核销</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <DollarSign className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">预计收入</p>
                <p className="text-2xl font-bold font-mono" style={{ color: THEME_COLOR }}>
                  ¥{stats.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 核销率进度条 */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">今日核销进度</span>
            <span className="text-emerald-400 font-bold">{checkInRate}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${checkInRate}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
            />
          </div>
          <p className="text-slate-500 text-sm mt-2">
            已核销 {stats.checkedIn} / {stats.total} 个预订
          </p>
        </GlassCard>
      </FadeIn>

      {/* 核销操作区 */}
      <FadeIn delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 扫码核销 */}
          <GlassCard className="p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <QrCode className="w-5 h-5" style={{ color: THEME_COLOR }} />
              扫码/输入核销
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="输入预订号或扫码"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
              />
              <GlowButton
                color={THEME_COLOR}
                onClick={handleScanCheckIn}
              >
                核销
              </GlowButton>
            </div>
          </GlassCard>

          {/* 批量操作 */}
          <GlassCard className="p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <CheckSquare className="w-5 h-5" style={{ color: THEME_COLOR }} />
              批量核销
            </h3>
            <GlowButton
              color={THEME_COLOR}
              variant="outline"
              className="w-full"
              onClick={handleBatchCheckIn}
              disabled={stats.pending === 0}
            >
              一键核销全部待核销订单 ({stats.pending})
            </GlowButton>
          </GlassCard>
        </div>
      </FadeIn>

      {/* 预订列表 */}
      <FadeIn delay={0.4}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">预订列表</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="搜索预订号/客人姓名"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-medium">{order.title}</h3>
                        <Badge className={
                          order.status === 'completed' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }>
                          {order.status === 'completed' ? '已核销' : '待核销'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-xs">预订号</span>
                          <span className="text-white font-mono">{order.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span>{order.userName} · {order.guests}人</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{order.serviceDate} {order.bookingDate}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: THEME_COLOR }}>
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>¥{order.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {order.status === 'confirmed' && (
                        <GlowButton
                          color="#00E396"
                          size="sm"
                          disabled={processingId === order.id}
                          onClick={() => handleCheckIn(order.id)}
                          icon={processingId === order.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        >
                          核销
                        </GlowButton>
                      )}
                      {order.status === 'completed' && (
                        <span className="text-emerald-400 text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          已完成
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-white text-lg">暂无今日预订</p>
                <p className="text-slate-500">今天还没有预订订单</p>
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 核销确认弹窗 */}
      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>确认核销</DialogTitle>
            <DialogDescription className="text-slate-400">
              请确认以下预订信息
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">预订号</p>
                <p className="text-white font-mono">{selectedOrder.id}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">活动</p>
                <p className="text-white">{selectedOrder.title}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">客人</p>
                <p className="text-white">{selectedOrder.userName} · {selectedOrder.guests}人</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">金额</p>
                <p className="text-2xl font-bold" style={{ color: THEME_COLOR }}>
                  ¥{selectedOrder.amount.toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <GlowButton
                  color="#8B9AAF"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCheckInDialog(false)}
                >
                  取消
                </GlowButton>
                <GlowButton
                  color="#00E396"
                  className="flex-1"
                  onClick={() => {
                    handleCheckIn(selectedOrder.id)
                    setShowCheckInDialog(false)
                  }}
                >
                  确认核销
                </GlowButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
