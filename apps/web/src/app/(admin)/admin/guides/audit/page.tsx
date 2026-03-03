'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore, type ReviewApplication } from '@/stores/platformStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { 
  UserCheck,
  UserX,
  Eye,
  MapPin,
  Globe,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Shield,
  Briefcase,
  FileText,
  Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#00E396'

export default function GuideAuditPage() {
  const toast = useToast()
  const { reviewApplications: applications, approveApplication, rejectApplication } = usePlatformStore()
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [selectedGuide, setSelectedGuide] = useState<ReviewApplication | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // 筛选导游申请
  const guideApplications = applications.filter(a => a.type === 'guide')
  
  const pendingGuides = guideApplications.filter(a => a.status === 'pending')
  const approvedGuides = guideApplications.filter(a => a.status === 'approved')
  const rejectedGuides = guideApplications.filter(a => a.status === 'rejected')

  // 当前显示的列表
  const displayList = activeTab === 'pending' 
    ? pendingGuides 
    : activeTab === 'approved' 
      ? approvedGuides 
      : rejectedGuides

  // 搜索筛选
  const filteredList = displayList.filter(a =>
    searchQuery === '' ||
    a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 统计
  const stats = {
    pending: pendingGuides.length,
    approved: approvedGuides.length,
    rejected: rejectedGuides.length,
    total: guideApplications.length
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">待审核</Badge>
      case 'approved':
        return <Badge className="bg-emerald-500/20 text-emerald-400">已通过</Badge>
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400">已拒绝</Badge>
      default:
        return null
    }
  }

  // 批准申请
  const handleApprove = async (id: string) => {
    setProcessingId(id)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      approveApplication(id, 'guide')
      toast.success('审核通过', '导游认证申请已通过')
      setShowDetailDialog(false)
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 拒绝申请
  const handleReject = async () => {
    if (!selectedGuide) return
    if (!rejectReason.trim()) {
      toast.warning('请输入拒绝原因')
      return
    }

    setProcessingId(selectedGuide.id)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      rejectApplication(selectedGuide.id, 'guide', rejectReason)
      toast.success('已拒绝', `原因：${rejectReason}`)
      setShowRejectDialog(false)
      setShowDetailDialog(false)
      setRejectReason('')
    } catch (error) {
      toast.error('操作失败', '请稍后重试')
    } finally {
      setProcessingId(null)
    }
  }

  // 查看详情
  const openDetail = (guide: ReviewApplication) => {
    setSelectedGuide(guide)
    setShowDetailDialog(true)
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <PageHeader
          title="导游认证审核"
          description="审核导游入驻申请，管理导游资质认证"
        />
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
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <UserCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">已通过</p>
                <p className="text-2xl font-bold text-white">{stats.approved}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <UserX className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">已拒绝</p>
                <p className="text-2xl font-bold text-white">{stats.rejected}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: `${THEME_COLOR}20` }}>
                <Users className="w-5 h-5" style={{ color: THEME_COLOR }} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">总申请</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 筛选标签 */}
      <FadeIn delay={0.2}>
        <div className="flex gap-2">
          {(['pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === 'pending' && `待审核 (${stats.pending})`}
              {tab === 'approved' && `已通过 (${stats.approved})`}
              {tab === 'rejected' && `已拒绝 (${stats.rejected})`}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* 申请列表 */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">
              {activeTab === 'pending' && '待审核申请'}
              {activeTab === 'approved' && '已通过列表'}
              {activeTab === 'rejected' && '已拒绝列表'}
            </h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索姓名/邮箱"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
            />
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredList.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 flex items-center justify-center text-emerald-400 font-bold text-lg">
                        {guide.name?.charAt(0) || '?'}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-white font-medium">{guide.name || guide.applicantName}</h3>
                          {getStatusBadge(guide.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{guide.city || '未知城市'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Globe className="w-3.5 h-3.5" />
                            <span>{guide.languages?.join(', ') || '中文, 英语'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{guide.experience || '3年'}经验</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Award className="w-3.5 h-3.5" />
                            <span>{guide.certifications?.length || 2}项证书</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <GlowButton
                        color="#8B9AAF"
                        size="sm"
                        variant="outline"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => openDetail(guide)}
                      >
                        详情
                      </GlowButton>
                      {guide.status === 'pending' && (
                        <>
                          <GlowButton
                            color="#EF4444"
                            size="sm"
                            variant="outline"
                            icon={<XCircle className="w-4 h-4" />}
                            disabled={processingId === guide.id}
                            onClick={() => {
                              setSelectedGuide(guide)
                              setShowRejectDialog(true)
                            }}
                          >
                            拒绝
                          </GlowButton>
                          <GlowButton
                            color="#00E396"
                            size="sm"
                            icon={<CheckCircle className="w-4 h-4" />}
                            disabled={processingId === guide.id}
                            onClick={() => handleApprove(guide.id)}
                          >
                            通过
                          </GlowButton>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredList.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-white text-lg">暂无申请</p>
                <p className="text-slate-500">当前没有符合条件的申请</p>
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>导游详情</DialogTitle>
            <DialogDescription className="text-slate-400">
              查看导游申请详细信息
            </DialogDescription>
          </DialogHeader>
          {selectedGuide && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 flex items-center justify-center text-emerald-400 font-bold text-2xl">
                  {selectedGuide.name?.charAt(0) || '?'}
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg">{selectedGuide.name || selectedGuide.applicantName}</h3>
                  {getStatusBadge(selectedGuide.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">邮箱</p>
                  <p className="text-white text-sm">{selectedGuide.email || '-'}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">城市</p>
                  <p className="text-white text-sm">{selectedGuide.city || '未知'}</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">语言能力</p>
                <div className="flex flex-wrap gap-2">
                  {(selectedGuide.languages || ['中文', '英语']).map((lang) => (
                    <Badge key={lang} className="bg-emerald-500/20 text-emerald-400">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">专业证书</p>
                <div className="flex flex-wrap gap-2">
                  {(selectedGuide.certifications || ['国家导游证']).map((cert) => (
                    <Badge key={cert} className="bg-blue-500/20 text-blue-400">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedGuide.bio && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-sm">个人简介</p>
                  <p className="text-white text-sm mt-1">{selectedGuide.bio}</p>
                </div>
              )}

              {selectedGuide.status === 'pending' && (
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
                    disabled={processingId === selectedGuide.id}
                    onClick={() => handleApprove(selectedGuide.id)}
                  >
                    {processingId === selectedGuide.id ? '处理中...' : '通过审核'}
                  </GlowButton>
                </div>
              )}

              {selectedGuide.status === 'rejected' && selectedGuide.rejectReason && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">拒绝原因</p>
                  <p className="text-white text-sm mt-1">{selectedGuide.rejectReason}</p>
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
            <DialogTitle>拒绝申请</DialogTitle>
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
                placeholder="请说明拒绝申请的原因..."
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
                disabled={processingId === selectedGuide?.id}
                onClick={handleReject}
              >
                {processingId === selectedGuide?.id ? '处理中...' : '确认拒绝'}
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
