'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore, type Transaction } from '@/stores/platformStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { ExportButton } from '@/components/ExportButton'
import { formatEarningsForExport } from '@/lib/export-utils'
import { 
  Wallet, 
  TrendingUp, 
  Calendar,
  ArrowUpRight,
  CreditCard,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const THEME_COLOR = '#00E396'

export default function GuideEarningsPage() {
  const toast = useToast()
  const { transactions, addTransaction, orders } = usePlatformStore()
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'alipay'>('bank')
  const [processing, setProcessing] = useState(false)

  // 导游相关订单 (type === 'guide')
  const guideOrders = orders.filter(o => o.type === 'guide')
  const completedOrders = guideOrders.filter(o => o.status === 'completed')
  
  // 收入统计
  const totalIncome = completedOrders.reduce((sum, o) => sum + o.amount, 0)
  const platformFee = completedOrders.reduce((sum, o) => sum + o.platformFee, 0)
  const netIncome = totalIncome - platformFee

  // 已提现
  const withdrawn = transactions
    .filter(t => t.type === 'withdrawal' && t.userId === 'guide1' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  // 可提现余额
  const availableBalance = netIncome - withdrawn

  // 提现中
  const pendingWithdrawals = transactions.filter(
    t => t.type === 'withdrawal' && t.userId === 'guide1' && t.status === 'pending'
  )

  // 提现记录
  const withdrawalHistory = transactions.filter(
    t => t.type === 'withdrawal' && t.userId === 'guide1'
  )

  // 处理提现
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.warning('请输入有效金额')
      return
    }
    if (amount < 100) {
      toast.warning('最低提现金额为¥100')
      return
    }
    if (amount > availableBalance) {
      toast.warning('余额不足')
      return
    }

    setProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addTransaction({
        type: 'withdrawal',
        amount: -amount,
        description: `提现至${withdrawMethod === 'bank' ? '银行卡' : '支付宝'}`,
        userId: 'guide1',
        userName: 'Current Guide',
        currency: 'CNY',
        status: 'pending'
      })

      toast.success('提现申请已提交', '预计1-3个工作日到账')
      setShowWithdrawDialog(false)
      setWithdrawAmount('')
    } catch (error) {
      toast.error('提现失败', '请稍后重试')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="收入明细"
            description="查看您的服务收入与提现"
          />
          <ExportButton 
            data={formatEarningsForExport(withdrawalHistory)}
            filename="guide_earnings"
            color={THEME_COLOR}
          />
        </div>
      </FadeIn>

      {/* 统计卡片 */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <Wallet className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">累计收入</p>
                <p className="text-2xl font-bold text-white">¥{totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">实际到账</p>
                <p className="text-2xl font-bold text-emerald-400">¥{netIncome.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Calendar className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">可提现</p>
                <p className="text-2xl font-bold text-yellow-400">¥{availableBalance.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <ArrowUpRight className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">本月增长</p>
                <p className="text-2xl font-bold text-blue-400">+23.5%</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：收入与提现 */}
        <FadeIn delay={0.2} className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <Tabs defaultValue="earnings" className="w-full">
              <TabsList className="bg-white/5 mb-6">
                <TabsTrigger value="earnings" className="data-[state=active]:bg-white/10">收入明细</TabsTrigger>
                <TabsTrigger value="withdrawals" className="data-[state=active]:bg-white/10">提现记录</TabsTrigger>
              </TabsList>

              <TabsContent value="earnings">
                <div className="space-y-3">
                  {completedOrders.slice(0, 5).map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl"
                    >
                      <div>
                        <p className="text-white font-medium">{order.title}</p>
                        <p className="text-slate-400 text-sm">{order.userName} · {order.completedAt?.split('T')[0]}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-semibold">+¥{order.netAmount.toLocaleString()}</p>
                        <p className="text-slate-500 text-xs">平台费 -¥{order.platformFee}</p>
                      </div>
                    </motion.div>
                  ))}
                  {completedOrders.length === 0 && (
                    <p className="text-slate-500 text-center py-8">暂无收入记录</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="withdrawals">
                <div className="space-y-3">
                  {withdrawalHistory.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        {tx.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : tx.status === 'pending' ? (
                          <Clock className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        )}
                        <div>
                          <p className="text-white font-medium">{tx.description}</p>
                          <p className="text-slate-400 text-sm">{tx.createdAt?.split('T')[0]}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">-¥{Math.abs(tx.amount).toLocaleString()}</p>
                        <Badge className={
                          tx.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {tx.status === 'completed' ? '已完成' : tx.status === 'pending' ? '处理中' : '失败'}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  {withdrawalHistory.length === 0 && (
                    <p className="text-slate-500 text-center py-8">暂无提现记录</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </GlassCard>
        </FadeIn>

        {/* 右侧：提现操作 */}
        <FadeIn delay={0.3}>
          <GlassCard className="p-6 space-y-6">
            <div>
              <h3 className="text-white font-medium mb-4">账户余额</h3>
              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-slate-400 text-sm">可提现金额</p>
                <p className="text-3xl font-bold" style={{ color: THEME_COLOR }}>
                  ¥{availableBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <GlowButton
                color={THEME_COLOR}
                className="w-full"
                icon={<Wallet className="w-4 h-4" />}
                onClick={() => setShowWithdrawDialog(true)}
                disabled={availableBalance < 100}
              >
                申请提现
              </GlowButton>
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                className="w-full"
                icon={<Download className="w-4 h-4" />}
              >
                下载收入证明
              </GlowButton>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium mb-3">结算说明</h4>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• 服务完成后7天自动结算</li>
                <li>• 平台服务费为订单金额的10%</li>
                <li>• 提现申请后1-3个工作日到账</li>
                <li>• 最低提现金额为¥100</li>
              </ul>
            </div>

            {pendingWithdrawals.length > 0 && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  有 {pendingWithdrawals.length} 笔提现正在处理中
                </p>
              </div>
            )}
          </GlassCard>
        </FadeIn>
      </div>

      {/* 提现弹窗 */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>申请提现</DialogTitle>
            <DialogDescription className="text-slate-400">
              将收入提现至您的账户
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-slate-400 text-sm">可提现金额</p>
              <p className="text-2xl font-bold" style={{ color: THEME_COLOR }}>
                ¥{availableBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="text-slate-400 text-sm">提现金额</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="最低¥100"
                min={100}
                max={availableBalance}
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm">提现方式</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => setWithdrawMethod('bank')}
                  className={`p-3 rounded-lg border flex items-center gap-2 transition-colors ${
                    withdrawMethod === 'bank' 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span className="text-sm">银行卡</span>
                </button>
                <button
                  onClick={() => setWithdrawMethod('alipay')}
                  className={`p-3 rounded-lg border flex items-center gap-2 transition-colors ${
                    withdrawMethod === 'alipay' 
                      ? 'border-emerald-500 bg-emerald-500/10' 
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">支付宝</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                className="flex-1"
                onClick={() => setShowWithdrawDialog(false)}
              >
                取消
              </GlowButton>
              <GlowButton
                color={THEME_COLOR}
                className="flex-1"
                disabled={processing}
                onClick={handleWithdraw}
              >
                {processing ? '处理中...' : '确认提现'}
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
