'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore, type Order } from '@/stores/platformStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { ExportButton } from '@/components/ExportButton'
import { formatOrdersForExport } from '@/lib/export-utils'
import { 
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  DollarSign,
  Search,
  Building2,
  Users,
  FileText,
  History,
  Eye,
  Wallet,
  CheckCircle,
  Building
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#A855F7'

export default function AdminRefundsPage() {
  const toast = useToast()
  const { orders, updateOrder, addTransaction } = usePlatformStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)

  // 退款中订单
  const refundingOrders = orders.filter(o => o.status === 'refunding')
  // 已退款订单
  const refundedOrders = orders.filter(o => o.status === 'refunded')
  // 所有退款相关
  const allRefundOrders = [...refundingOrders, ...refundedOrders]

  // 统计
  const stats = {
    pendingCount: refundingOrders.length,
    totalRefunded: refundedOrders.reduce((sum, o) => sum + (o.refundAmount || o.amount), 0),
    refundCount: refundedOrders.length,
    approvalRate: allRefundOrders.length > 0 
      ? Math.round((refundedOrders.length / allRefundOrders.length) * 100) 
      : 0,
  }

  // 筛选
  const filteredOrders = allRefundOrders.filter(o => 
    searchQuery === '' || 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Building2 className="w-4 h-4 text-cyan-400" />
      case 'guide':
        return <Users className="w-4 h-4 text-emerald-400" />
      case 'venue':
        return <Building className="w-4 h-4 text-yellow-400" />
      default:
        return <DollarSign className="w-4 h-4 text-slate-400" />
    }
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'refunding':
        return <Badge className="bg-yellow-500/20 text-yellow-400">待审核</Badge>
      case 'refunded':
        return <Badge className="bg-emerald-500/20 text-emerald-400">已退款</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400">{status}</Badge>
    }
  }

  // 批准退款
  const handleApprove = async (orderId: string) => {
    setProcessingId(orderId)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const order = orders.find(o => o.id === orderId)
      if (!order) return

      // 更新订单状态
      updateOrder(orderId, { 
        status: 'refunded',
        refundProcessedAt: new Date().toISOString()
      })

      // 添加退款交易记录
      addTransaction({
        type: 'refund',
        amount: -(order.refundAmount || order.amount),
        description: `退款审批通过 - ${order.title}`,
        relatedId: orderId,
        userId: order.userId,
        userName: order.userName,
        currency: 'CNY',
        status: 'completed'
      })

      toast.success('退款已批准', '款项将原路退回给客户')
      setShowDetailDialog(false)
    } catch (error) {
      toast.error('审批失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 拒绝退款
  const handleReject = async (orderId: string) => {
    if (!rejectReason.trim()) {
      toast.warning('请输入拒绝原因')
      return
    }

    setProcessingId(orderId)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 更新订单状态回退
      updateOrder(orderId, { 
        status: 'confirmed',
        refundRejectedReason: rejectReason
      })

      toast.success('退款已拒绝', `原因：${rejectReason}`)
      setShowRejectDialog(false)
      setShowDetailDialog(false)
      setRejectReason('')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="退款审核"
            description="处理客户退款申请"
          />
          <ExportButton 
            data={formatOrdersForExport(allRefundOrders)}
            filename="refund_records"
            color={THEME_COLOR}
          />
        </div>
      </FadeIn>

      {/* 统计卡片 */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">待审核</p>
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
                <p className="text-2xl font-bold text-white">{stats.refundCount}</p>
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
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <CheckCircle2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">通过率</p>
                <p className="text-2xl font-bold text-white">{stats.approvalRate}%</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 退款列表 */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">退款申请列表</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索订单号/客人姓名"
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
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white/5">
                          {getTypeIcon(order.type)}
                        </div>
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
                          <Wallet className="w-3.5 h-3.5" />
                          <span className="text-red-400">
                            ¥{(order.refundAmount || order.amount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="text-xs">商户</span>
                          <span className="text-white">{order.providerName}</span>
                        </div>
                      </div>
                      {order.refundReason && (
                        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          原因: {order.refundReason}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <GlowButton
                        color="#8B9AAF"
                        size="sm"
                        variant="outline"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowDetailDialog(true)
                        }}
                      >
                        查看
                      </GlowButton>
                      {order.status === 'refunding' && (
                        <>
                          <GlowButton
                            color="#EF4444"
                            size="sm"
                            variant="outline"
                            icon={<XCircle className="w-4 h-4" />}
                            disabled={processingId === order.id}
                            onClick={() => {
                              setSelectedOrder(order)
                              setShowRejectDialog(true)
                            }}
                          >
                            拒绝
                          </GlowButton>
                          <GlowButton
                            color="#00E396"
                            size="sm"
                            icon={<CheckCircle className="w-4 h-4" />}
                            disabled={processingId === order.id}
                            onClick={() => handleApprove(order.id)}
                          >
                            批准
                          </GlowButton>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <RotateCcw className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-white text-lg">暂无退款申请</p>
                <p className="text-slate-500">当前没有待处理的退款申请</p>
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>退款详情</DialogTitle>
            <DialogDescription className="text-slate-400">
              查看退款申请详细信息
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">订单号</p>
                  <p className="text-white font-mono text-sm">{selectedOrder.id}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">状态</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">活动/服务</p>
                <p className="text-white">{selectedOrder.title}</p>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">客户</p>
                <p className="text-white">{selectedOrder.userName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">订单金额</p>
                  <p className="text-white">¥{selectedOrder.amount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">退款金额</p>
                  <p className="text-red-400 font-bold">
                    ¥{(selectedOrder.refundAmount || selectedOrder.amount).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {selectedOrder.refundReason && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">退款原因</p>
                  <p className="text-white">{selectedOrder.refundReason}</p>
                </div>
              )}

              {selectedOrder.status === 'refunding' && (
                <div className="flex gap-2 pt-2">
                  <GlowButton
                    color="#EF4444"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRejectDialog(true)}
                  >
                    拒绝
                  </GlowButton>
                  <GlowButton
                    color="#00E396"
                    className="flex-1"
                    disabled={processingId === selectedOrder.id}
                    onClick={() => handleApprove(selectedOrder.id)}
                  >
                    {processingId === selectedOrder.id ? '处理中...' : '批准退款'}
                  </GlowButton>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 拒绝弹窗 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>拒绝退款</DialogTitle>
            <DialogDescription className="text-slate-400">
              请输入拒绝原因
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-slate-400 text-sm">拒绝原因</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="请说明拒绝退款的原因..."
                className="mt-1 bg-white/5 border-white/10 text-white placeholder-slate-500"
              />
            </div>
            <div className="flex gap-2">
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowRejectDialog(false)
                  setRejectReason('')
                }}
              >
                取消
              </GlowButton>
              <GlowButton
                color="#EF4444"
                className="flex-1"
                disabled={processingId === selectedOrder?.id}
                onClick={() => selectedOrder && handleReject(selectedOrder.id)}
              >
                {processingId === selectedOrder?.id ? '处理中...' : '确认拒绝'}
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
