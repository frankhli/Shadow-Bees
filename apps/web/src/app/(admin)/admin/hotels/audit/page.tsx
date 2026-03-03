'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore, useReviewApplications } from '@/stores/platformStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { 
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Building2,
  MapPin,
  Clock,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Filter
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#A855F7'

export default function HotelAuditPage() {
  const toast = useToast()
  const { applications, pendingApplications, approveApplication, rejectApplication } = useReviewApplications()
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  // 筛选申请
  const filteredApps = applications.filter(app => 
    app.type === 'hotel' && (filter === 'all' || app.status === filter)
  )

  // 处理通过
  const handleApprove = async (appId: string) => {
    setProcessingId(appId)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      approveApplication(appId, 'admin1')
      toast.success('审核通过', '酒店已成功入驻平台')
      setShowDetail(false)
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 处理拒绝
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.warning('请输入拒绝原因')
      return
    }
    if (!selectedApp) return

    setProcessingId(selectedApp.id)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      rejectApplication(selectedApp.id, 'admin1', rejectReason)
      toast.success('已拒绝', '拒绝原因已通知申请人')
      setShowRejectDialog(false)
      setShowDetail(false)
      setRejectReason('')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 打开详情
  const openDetail = (app: any) => {
    setSelectedApp(app)
    setShowDetail(true)
  }

  const stats = {
    pending: applications.filter(a => a.type === 'hotel' && a.status === 'pending').length,
    approved: applications.filter(a => a.type === 'hotel' && a.status === 'approved').length,
    rejected: applications.filter(a => a.type === 'hotel' && a.status === 'rejected').length,
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="酒店入驻审核"
            description="审核酒店入驻申请，确保资质合规"
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
      <StaggerContainer className="grid grid-cols-3 gap-4">
        <StaggerItem>
          <GlassCard className="p-4 cursor-pointer" onClick={() => setFilter('pending')}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">待审核</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4 cursor-pointer" onClick={() => setFilter('approved')}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">已通过</p>
                <p className="text-2xl font-bold text-white">{stats.approved}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4 cursor-pointer" onClick={() => setFilter('rejected')}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">已拒绝</p>
                <p className="text-2xl font-bold text-white">{stats.rejected}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 筛选器 */}
      <FadeIn delay={0.2}>
        <div className="flex gap-2">
          {[
            { key: 'pending', label: '待审核' },
            { key: 'approved', label: '已通过' },
            { key: 'rejected', label: '已拒绝' },
            { key: 'all', label: '全部' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as any)}
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

      {/* 申请列表 */}
      <FadeIn delay={0.3}>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">{app.applicantName}</h3>
                        <Badge className={
                          app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-red-500/20 text-red-400'
                        }>
                          {app.status === 'pending' ? '待审核' : app.status === 'approved' ? '已通过' : '已拒绝'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {app.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          提交于 {new Date(app.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <GlowButton
                      color="#8B9AAF"
                      variant="outline"
                      size="sm"
                      onClick={() => openDetail(app)}
                      icon={<Eye className="w-4 h-4" />}
                    >
                      查看详情
                    </GlowButton>
                    
                    {app.status === 'pending' && (
                      <>
                        <GlowButton
                          color="#00E396"
                          size="sm"
                          disabled={processingId === app.id}
                          onClick={() => handleApprove(app.id)}
                          icon={processingId === app.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                        >
                          通过
                        </GlowButton>
                        <GlowButton
                          color="#FF4757"
                          variant="outline"
                          size="sm"
                          disabled={processingId === app.id}
                          onClick={() => {
                            setSelectedApp(app)
                            setShowRejectDialog(true)
                          }}
                        >
                          拒绝
                        </GlowButton>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-white text-lg">暂无申请</p>
              <p className="text-slate-500">当前筛选条件下没有审核申请</p>
            </div>
          )}
        </div>
      </FadeIn>

      {/* 详情弹窗 */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>酒店入驻申请详情</DialogTitle>
            <DialogDescription className="text-slate-400">
              审核酒店资质信息
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">酒店名称</p>
                  <p className="text-white font-medium">{selectedApp.applicantName}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">所在城市</p>
                  <p className="text-white font-medium">{selectedApp.city}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">申请时间</p>
                  <p className="text-white font-medium">
                    {new Date(selectedApp.submittedAt).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">当前状态</p>
                  <Badge className={
                    selectedApp.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    selectedApp.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-red-500/20 text-red-400'
                  }>
                    {selectedApp.status === 'pending' ? '待审核' : selectedApp.status === 'approved' ? '已通过' : '已拒绝'}
                  </Badge>
                </div>
              </div>

              {selectedApp.rejectReason && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">拒绝原因</p>
                  <p className="text-white">{selectedApp.rejectReason}</p>
                </div>
              )}

              {selectedApp.status === 'pending' && (
                <DialogFooter className="gap-2">
                  <GlowButton
                    color="#00E396"
                    onClick={() => handleApprove(selectedApp.id)}
                    disabled={processingId === selectedApp.id}
                    icon={processingId === selectedApp.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  >
                    通过审核
                  </GlowButton>
                  <GlowButton
                    color="#FF4757"
                    variant="outline"
                    onClick={() => setShowRejectDialog(true)}
                    disabled={processingId === selectedApp.id}
                  >
                    拒绝申请
                  </GlowButton>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 拒绝原因弹窗 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>拒绝申请</DialogTitle>
            <DialogDescription className="text-slate-400">
              请说明拒绝原因，将通知申请人
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="请输入拒绝原因..."
              className="bg-white/5 border-white/10 text-white min-h-[100px]"
            />
            <DialogFooter className="gap-2">
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false)
                  setRejectReason('')
                }}
              >
                取消
              </GlowButton>
              <GlowButton
                color="#FF4757"
                onClick={handleReject}
                disabled={processingId === selectedApp?.id}
                icon={processingId === selectedApp?.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              >
                确认拒绝
              </GlowButton>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
