'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { ExportButton } from '@/components/ExportButton'
import { formatReviewsForExport } from '@/lib/export-utils'
import { Star, ThumbsUp, MessageSquare, Filter, Send } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#FFB800'

interface Review {
  id: string
  guestName: string
  nationality: string
  flag: string
  rating: number
  content: string
  translatedContent?: string
  date: string
  activity: string
  helpful: number
  reply?: string
}

const defaultReviews: Review[] = [
  {
    id: 'REV-001',
    guestName: 'John Smith',
    nationality: '美国',
    flag: '🇺🇸',
    rating: 5,
    content: 'Amazing tea ceremony experience! The host was very knowledgeable and patient. Highly recommended!',
    translatedContent: ' amazing的茶艺体验！主人知识渊博且耐心。强烈推荐！',
    date: '2024-03-15',
    activity: '茶道体验',
    helpful: 12,
    reply: '感谢John的好评！期待您的再次光临。',
  },
  {
    id: 'REV-002',
    guestName: 'Marie Dupont',
    nationality: '法国',
    flag: '🇫🇷',
    rating: 5,
    content: 'Une expérience authentique et inoubliable. Le thé était excellent et l\'ambiance très chaleureuse.',
    translatedContent: '一次正宗而难忘的体验。茶很棒，氛围非常温馨。',
    date: '2024-03-12',
    activity: '品茗体验',
    helpful: 8,
  },
  {
    id: 'REV-003',
    guestName: '田中太郎',
    nationality: '日本',
    flag: '🇯🇵',
    rating: 4,
    content: '日本にも似たような茶文化がありますが、北京の茶館は独特の雰囲気がありました。',
    translatedContent: '日本也有类似的茶文化，但北京的茶馆有着独特的氛围。',
    date: '2024-03-10',
    activity: '京剧+茶艺',
    helpful: 5,
    reply: 'ありがとうございます！中日茶文化有很多相通之处。',
  },
  {
    id: 'REV-004',
    guestName: 'Hans Mueller',
    nationality: '德国',
    flag: '🇩🇪',
    rating: 5,
    content: 'Perfect for understanding Chinese tea culture. The building itself is also beautiful.',
    translatedContent: '了解中国茶文化的完美选择。建筑本身也很美。',
    date: '2024-03-08',
    activity: '茶道体验',
    helpful: 3,
  },
  {
    id: 'REV-005',
    guestName: 'Pedro Garcia',
    nationality: '西班牙',
    flag: '🇪🇸',
    rating: 4,
    content: 'Muy bonito lugar. El personal es amable y atento. Volveré con mi familia.',
    translatedContent: '很漂亮的地方。工作人员友好细心。会带家人再来。',
    date: '2024-03-05',
    activity: '脸谱绘制',
    helpful: 2,
  },
]

export default function VenueReviewsPage() {
  const toast = useToast()
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('venue_reviews')
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
    localStorage.setItem('venue_reviews', JSON.stringify(newReviews))
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="评价管理"
            description="查看和管理顾客评价"
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
              filename="venue_reviews"
              color={THEME_COLOR}
            />
          </div>
        </div>
      </FadeIn>

      {/* 评分统计 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StaggerItem>
          <GlassCard className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-2">{stats.average}</p>
              <div className="flex justify-center gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(parseFloat(stats.average)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-400">{stats.total} 条评价</p>
            </div>
          </GlassCard>
        </StaggerItem>

        <StaggerItem className="md:col-span-3">
          <GlassCard className="p-6">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(r => r.rating === stars).length
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="w-8 text-slate-400 text-sm">{stars}星</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / stats.total) * 100}%` }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <span className="w-12 text-right text-slate-400 text-sm">{count}</span>
                  </div>
                )
              })}
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 评价列表 */}
      <FadeIn delay={0.2}>
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
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{review.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-white">{review.guestName}</span>
                          <span className="text-slate-500 text-sm">{review.nationality}</span>
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-slate-500 text-sm">{review.date}</span>
                      </div>

                      <div className="mb-3">
                        <Badge className="bg-white/5 text-slate-300 mb-2">
                          {review.activity}
                        </Badge>
                        <p className="text-white">{review.content}</p>
                        {review.translatedContent && (
                          <p className="text-slate-500 text-sm mt-1">
                            AI翻译: {review.translatedContent}
                          </p>
                        )}
                      </div>

                      {/* 回复内容 */}
                      {review.reply && (
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-3">
                          <p className="text-amber-400 text-sm font-medium mb-1">店铺回复：</p>
                          <p className="text-slate-300 text-sm">{review.reply}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button 
                            className="flex items-center gap-1 text-slate-500 hover:text-amber-400 text-sm transition-colors"
                            onClick={() => handleHelpful(review.id)}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            有用 ({review.helpful})
                          </button>
                          {!review.reply && (
                            <Badge className="bg-yellow-500/20 text-yellow-400">
                              待回复
                            </Badge>
                          )}
                        </div>
                        <GlowButton 
                          size="sm"
                          variant={review.reply ? "outline" : "filled"}
                          color={THEME_COLOR}
                          icon={<MessageSquare className="w-4 h-4" />}
                          onClick={() => handleReply(review)}
                        >
                          {review.reply ? '修改回复' : '回复'}
                        </GlowButton>
                      </div>
                    </div>
                  </div>
                </GlassCard>
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
