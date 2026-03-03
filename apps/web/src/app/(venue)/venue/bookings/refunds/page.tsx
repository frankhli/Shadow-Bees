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
  RotateCcw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Search,
  Eye
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#FFB800'

export default function VenueRefundsPage() {
  const toast = useToast()
  const { orders, updateOrder, addTransaction } = usePlatformStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [refundReason, setRefundReason] = useState('')
  const [refundAmount, setRefundAmount] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'processed'>('pending')

  // Venue相关订单
  const venueOrders = orders.filter(o => o.type === 'venue')

  // 退款统计
  const stats = {
    totalRequests: venueOrders.filter(o => o.status === 'refunding' || o.status === 'refunded').length,
    pendingCount: venueOrders.filter(o => o.status === 'refunding').length,
    approvedCount: venueOrders.filter(o => o.status === 'refunded').length,
    totalRefunded: venueOrders
      .filter(o => o.status === 'refunded')
      .reduce((sum, o) => sum + o.amount, 0),
  }

  // 可申请退款的订单 (已确认但未完成)
  const refundableOrders = venueOrders.filter(o => 
    (o.status === 'confirmed' || o.status === 'pending')
  )

  // 退款中/已退款订单
  const refundOrders = venueOrders.filter(o => 
    o.status === 'refunding' || o.status === 'refunded'
  )

  const filteredRefunds = refundOrders.filter(o => 
    searchTerm === '' || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 申请退款
  const handleRequestRefund = (order: Order) => {
    setSelectedOrder(order)
    setRefundAmount(order.amount.toString())
    setShowRefundDialog(true)
  }

  const submitRefund = async () => {
    if (!selectedOrder) return
    if (!refundReason.trim()) {
      toast.warning('请输入退款原因')
      return
    }

    setProcessingId(selectedOrder.id)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 更新订单状态为退款中
      updateOrder(selectedOrder.id, { 
        status: 'refunding',
        refundReason: refundReason,
        refundAmount: parseFloat(refundAmount) || selectedOrder.amount
      })

      // 添加退款交易记录
      addTransaction({
        type: 'refund',
        amount: -(parseFloat(refundAmount) || selectedOrder.amount),
        description: `退款申请 - ${selectedOrder.title}`,
        relatedId: selectedOrder.id,
        userId: selectedOrder.userId,
        userName: selectedOrder.userName,
        currency: 'CNY',
        status: 'pending'
      })

      toast.success('退款申请已提交', '等待平台审核处理')
      setShowRefundDialog(false)
      setRefundReason('')
      setRefundAmount('')
    } catch (error) {
      toast.error('申请失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'refunding':
        return <Badge className="bg-yellow-500/20 text-yellow-400">退款中</Badge>
      case 'refunded':
        return <Badge className="bg-emerald-500/20 text-emerald-400">已退款</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400">{status}</Badge>
    }
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="退款管理"
            description="处理客户退款申请"
          />
        </div>
      </FadeIn>

      {/* 统计卡片 */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <RotateCcw className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">退款申请</p>
                <p className="text-2xl font-bold text-white">{stats.totalRequests}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">待处理</p>
                <p className="text-2xl font-bold text-white">{stats.pendingCount}</p>
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
                <p className="text-slate-400 text-sm">已退款</p>
                <p className="text-2xl font-bold text-white">{stats.approvedCount}</p>
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
                <p className="text-slate-400 text-sm">退款总额</p>
                <p className="text-2xl font-bold" style={{ color: THEME_COLOR }}>
                  ¥{stats.totalRefunded.toLocaleString()}
                </p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 可申请退款的订单 */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-6">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            可申请退款的订单
          </h3>
          <div className="space-y-3">
            {refundableOrders.length === 0 ? (
              <p className="text-slate-500 text-center py-4">没有可申请退款的订单</p>
            ) : (
              refundableOrders.slice(0, 3).map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{order.title}</p>
                    <p className="text-slate-400 text-sm">
                      {order.userName} · ¥{order.amount.toLocaleString()}
                    </p>
                  </div>
                  <GlowButton
                    color="#FFB800"
                    size="sm"
                    variant="outline"
                    onClick={() => handleRequestRefund(order)}
                  >
                    申请退款
                  </GlowButton>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 退款记录 */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">退款记录</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索订单号/客人姓名"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
            />
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredRefunds.map((order, index) => (
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
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-xs">订单号</span>
                          <span className="text-white font-mono">{order.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-3.5 h-3.5" />
                          <span>{order.userName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{order.serviceDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-400">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>¥{(order.refundAmount || order.amount).toLocaleString()}</span>
                        </div>
                      </div>
                      {order.refundReason && (
                        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          原因: {order.refundReason}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredRefunds.length === 0 && (
              <div className="text-center py-12">
                <RotateCcw className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-white text-lg">暂无退款记录</p>
                <p className="text-slate-500">还没有退款申请</p>
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 申请退款弹窗 */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>申请退款</DialogTitle>
            <DialogDescription className="text-slate-400">
              提交退款申请，平台将在24小时内审核处理
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">订单号</p>
                <p className="text-white font-mono">{selectedOrder.id}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">订单金额</p>
                <p className="text-white">¥{selectedOrder.amount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">退款金额</label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  max={selectedOrder.amount}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/20"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm">退款原因</label>
                <Textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="请详细说明退款原因"
                  className="mt-1 bg-white/5 border-white/10 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-2">
                <GlowButton
                  color="#8B9AAF"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowRefundDialog(false)}
                >
                  取消
                </GlowButton>
                <GlowButton
                  color="#FFB800"
                  className="flex-1"
                  disabled={processingId === selectedOrder.id}
                  onClick={submitRefund}
                >
                  {processingId === selectedOrder.id ? '提交中...' : '提交申请'}
                </GlowButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
