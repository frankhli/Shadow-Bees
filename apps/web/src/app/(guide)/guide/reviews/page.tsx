'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { ExportButton } from '@/components/ExportButton'
import { formatReviewsForExport } from '@/lib/export-utils'
import { Star, ThumbsUp, MessageSquare, TrendingUp, Filter, Send } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#00E396'

interface Review {
  id: string
  guestName: string
  flag: string
  nationality: string
  rating: number
  date: string
  serviceType: string
  content: string
  tags: string[]
  reply?: string
  helpful: number
}

const defaultReviews: Review[] = [
  {
    id: 'REV-001',
    guestName: 'John Smith',
    flag: '🇺🇸',
    nationality: '美国',
    rating: 5,
    date: '2024-03-10',
    serviceType: '故宫深度游',
    content: 'Amazing tour! The guide was very knowledgeable about Ming and Qing history. Highly recommend!',
    tags: ['专业', '热情', '推荐'],
    helpful: 12,
  },
  {
    id: 'REV-002',
    guestName: '田中太郎',
    flag: '🇯🇵',
    nationality: '日本',
    rating: 5,
    date: '2024-03-08',
    serviceType: '长城一日游',
    content: '非常棒的体验！导游很贴心，考虑到我们有老人，安排的节奏很慢。景色太美了！',
    tags: ['贴心', '周到'],
    helpful: 8,
  },
  {
    id: 'REV-003',
    guestName: 'Marie Dupont',
    flag: '🇫🇷',
    nationality: '法国',
    serviceType: '胡同美食游',
    rating: 4,
    date: '2024-03-05',
    content: 'Great food tour! Tried many local snacks. Would love more vegetarian options next time.',
    tags: ['美食', '有趣'],
    helpful: 5,
  },
  {
    id: 'REV-004',
    guestName: 'Hans Mueller',
    flag: '🇩🇪',
    nationality: '德国',
    serviceType: '798艺术区',
    rating: 5,
    date: '2024-03-01',
    content: 'Excellent art tour! The guide knows a lot about contemporary Chinese art. Very professional.',
    tags: ['专业', '艺术'],
    helpful: 3,
  },
]

export default function GuideReviewsPage() {
  const toast = useToast()
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('guide_reviews')
      return saved ? JSON.parse(saved) : defaultReviews
    }
    return defaultReviews
  })
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [sending, setSending] = useState(false)
  const [filter, setFilter] = useState<'all' | 'replied' | 'unreplied'>('all')

  const saveReviews = (newReviews: Review[]) => {
    localStorage.setItem('guide_reviews', JSON.stringify(newReviews))
    setReviews(newReviews)
  }

  const handleReply = (review: Review) => {
    setSelectedReview(review)
    setReplyContent(review.reply || '')
    setShowReplyDialog(true)
  }

  const submitReply = async () => {
    if (!replyContent.trim()) {
      toast.warning('请输入回复内容')
      return
    }
    if (!selectedReview) return

    setSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const newReviews = reviews.map(r => 
        r.id === selectedReview.id 
          ? { ...r, reply: replyContent }
          : r
      )
      saveReviews(newReviews)
      
      toast.success('回复已提交', '您的回复已公开显示')
      setShowReplyDialog(false)
      setReplyContent('')
      setSelectedReview(null)
    } catch (error) {
      toast.error('提交失败', '请稍后重试')
    } finally {
      setSending(false)
    }
  }

  const handleHelpful = (reviewId: string) => {
    toast.success('感谢您的反馈')
  }

  const filteredReviews = reviews.filter(r => {
    if (filter === 'replied') return !!r.reply
    if (filter === 'unreplied') return !r.reply
    return true
  })

  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    fiveStar: Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100),
    replied: reviews.filter(r => !!r.reply).length,
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="客户评价"
            description="查看和管理客户对您的评价"
          />
          <div className="flex gap-2">
            {(['all', 'replied', 'unreplied'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  filter === f
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f === 'all' && `全部 (${stats.total})`}
                {f === 'replied' && `已回复 (${stats.replied})`}
                {f === 'unreplied' && `待回复 (${stats.total - stats.replied})`}
              </button>
            ))}
            <ExportButton 
              data={formatReviewsForExport(filteredReviews)}
              filename="guide_reviews"
              color={THEME_COLOR}
            />
          </div>
        </div>
      </FadeIn>

      {/* 评分概览 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-6 text-center">
            <p className="text-4xl font-bold" style={{ color: THEME_COLOR }}>{stats.average}</p>
            <div className="flex justify-center gap-1 my-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.floor(parseFloat(stats.average)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
              ))}
            </div>
            <p className="text-sm text-slate-400">综合评分</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-6 text-center">
            <p className="text-4xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-slate-400 mt-2">总评价数</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-6 text-center">
            <p className="text-4xl font-bold text-emerald-400">{stats.fiveStar}%</p>
            <p className="text-sm text-slate-400 mt-2">五星好评率</p>
          </GlassCard>
        </StaggerItem>
        <StaggerItem>
          <GlassCard className="p-6 text-center">
            <p className="text-4xl font-bold text-blue-400">{stats.replied}</p>
            <p className="text-sm text-slate-400 mt-2">已回复</p>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 评价列表 */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-white/[0.03] rounded-xl border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 flex items-center justify-center text-2xl">
                      {review.flag}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium">{review.guestName}</h3>
                          <p className="text-slate-400 text-sm">{review.nationality} · {review.serviceType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`w-4 h-4 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                            ))}
                          </div>
                          <span className="text-slate-500 text-sm">{review.date}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 mb-3">{review.content}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {review.tags.map(tag => (
                          <Badge key={tag} className="bg-emerald-500/10 text-emerald-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* 回复内容 */}
                      {review.reply && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-3">
                          <p className="text-emerald-400 text-sm font-medium mb-1">您的回复：</p>
                          <p className="text-slate-300 text-sm">{review.reply}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <button 
                          className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                          onClick={() => handleHelpful(review.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          有用 ({review.helpful})
                        </button>
                        <GlowButton
                          size="sm"
                          variant="outline"
                          color={THEME_COLOR}
                          icon={<MessageSquare className="w-3.5 h-3.5" />}
                          onClick={() => handleReply(review)}
                        >
                          {review.reply ? '修改回复' : '回复'}
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredReviews.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-white text-lg">暂无评价</p>
                <p className="text-slate-500">还没有符合条件的评价</p>
              </div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* 回复弹窗 */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>回复评价</DialogTitle>
            <DialogDescription className="text-slate-400">
              {selectedReview && `回复 ${selectedReview.guestName} 的评价`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedReview && (
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">评价内容</p>
                <p className="text-white text-sm mt-1">{selectedReview.content}</p>
              </div>
            )}
            <div>
              <label className="text-slate-400 text-sm">您的回复</label>
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="感谢客户的评价..."
                className="mt-1 bg-white/5 border-white/10 text-white placeholder-slate-500 min-h-[120px]"
              />
            </div>
            <div className="flex gap-2">
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                className="flex-1"
                onClick={() => setShowReplyDialog(false)}
              >
                取消
              </GlowButton>
              <GlowButton
                color={THEME_COLOR}
                className="flex-1"
                disabled={sending}
                onClick={submitReply}
                icon={<Send className="w-4 h-4" />}
              >
                {sending ? '提交中...' : '提交回复'}
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
