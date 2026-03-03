'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell, DataTableHead } from '@/components/dashboard/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, XCircle, Clock, AlertCircle, Languages, FileText, History, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'

// 审核统计数据
const reviewStats = {
  pending: 12,
  approved: 156,
  rejected: 8,
  total: 176,
}

// 待审核内容
const pendingReviews = [
  { 
    id: 1, 
    event: '故宫深度游', 
    category: '历史文化',
    zh: '专业讲解，深入浅出，带您领略故宫六百年历史沧桑。我们的导游将为您详细解读每一座宫殿背后的故事，让您在游览中感受中华文明的博大精深。', 
    translations: {
      en: { text: 'Professional and insightful guide, taking you through 600 years of Forbidden City history. Our guide will explain the stories behind each palace, letting you feel the profound Chinese civilization.', status: 'pending' },
      ja: { text: 'プロフェッショナルで洞察に満ちたガイドが、紫禁城600年の歴史を案内します。各宫殿の背後にある物語を詳しく解説し、中華文明の奥深さを感じさせます。', status: 'pending' },
      ko: { text: '전문적이고 통찰력 있는 가이드가 자금성 600년 역사를 안내합니다. 각 궁전 뒤에 있는 이야기를 자세히 설명하며 중화문명의 깊이를 느끼게 합니다.', status: 'pending' },
      th: { text: 'ไกด์ที่เป็นมืออาชีพและมีความรู้ลึกซึ้ง พาคุณผ่านประวัติศาสตร์ 600 ปีของพระราชวังต้องห้าม ไกด์ของเราจะอธิบายเรื่องราวเบื้องหลังแต่ละพระราชวัง', status: 'pending' },
    },
    aiScore: 92,
    submitTime: '2024-03-01 14:30',
    submitter: '张小明',
  },
  { 
    id: 2, 
    event: '胡同美食之旅', 
    category: '美食体验',
    zh: '品尝地道老北京小吃，从炸酱面到豆汁儿，从驴打滚到艾窝窝，一站式体验最正宗的北京味道。', 
    translations: {
      en: { text: 'Taste authentic Beijing snacks, from Zhajiang noodles to Douzhi, from Ludagun to Aiwowo. One-stop experience of the most authentic Beijing flavors.', status: 'pending' },
      ja: { text: '本場の北京スナックを堪能し、炸醤麺から豆汁まで、驢打滾から艾窩窩まで、最も本物の北京の味を一站式で体験できます。', status: 'pending' },
      ko: { text: '정통 베이징 스낵을 맛보고, 짜장멘부터 두즈까지, 루다군부터 아이워워까지 가장 정통적인 베이징 맛을 원스톱으로 경험하세요.', status: 'ai-generated' },
      th: { text: 'ลิ้มรสอาหารว่างปักกิ่งแท้ๆ จากบะหมี่จ่าเจียงไปจนถึงโดวจื้อ จากลู่ต๋ากุ้นไปจนถึงไอวอวอ สัมผัสรสชาติปักกิ่งแท้ๆ แบบครบวงจร', status: 'pending' },
    },
    aiScore: 88,
    submitTime: '2024-03-01 11:20',
    submitter: '李小红',
  },
  { 
    id: 3, 
    event: '长城徒步探险', 
    category: '户外探险',
    zh: '挑战自我，攀登世界七大奇迹之一。专业向导带队，安全有保障。', 
    translations: {
      en: { text: 'Challenge yourself and climb one of the Seven Wonders of the World. Led by professional guides with safety guaranteed.', status: 'pending' },
      ja: { text: '自分自身に挑戦し、世界七不思議の一つを登ります。プロのガイドが案内し、安全が保証されています。', status: 'pending' },
      ko: { text: '자신에게 도전하고 세계 7대 불가사의 중 하나를 등반하세요. 전문 가이드가 인솔하여 안전이 보장됩니다.', status: 'pending' },
      th: { text: 'ท้าทายตัวเองและปีนเขาหนึ่งในเจ็ดสิ่งมหัศจรรย์ของโลก นำโดยไกด์มืออาชีพพร้อมการรับประกันความปลอดภัย', status: 'pending' },
    },
    aiScore: 95,
    submitTime: '2024-03-01 09:45',
    submitter: '王大伟',
  },
]

// 审核历史
const reviewHistory = [
  { id: 101, event: '京剧体验课程', action: 'approved', reviewer: '管理员A', time: '2024-03-01 10:30', note: '翻译准确，表达自然' },
  { id: 102, event: '茶艺文化体验', action: 'rejected', reviewer: '管理员A', time: '2024-03-01 09:15', note: '日语翻译有误，需重新翻译' },
  { id: 103, event: '书法工作坊', action: 'approved', reviewer: '管理员B', time: '2024-02-29 16:45', note: '质量良好' },
  { id: 104, event: '太极拳晨练', action: 'approved', reviewer: '管理员A', time: '2024-02-29 14:20', note: '通过' },
]

const languageNames: Record<string, string> = {
  en: '英语',
  ja: '日语',
  ko: '韩语',
  th: '泰语',
}

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  ja: '🇯🇵',
  ko: '🇰🇷',
  th: '🇹🇭',
}

export default function VenueReviewPage() {
  const [selectedTab, setSelectedTab] = useState('pending')
  const [selectedReview, setSelectedReview] = useState<typeof pendingReviews[0] | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [expandedLangs, setExpandedLangs] = useState<Record<number, boolean>>({})
  const [reviews, setReviews] = useState(pendingReviews)

  const handleApprove = (reviewId: number) => {
    alert(`已通过 ID: ${reviewId} 的翻译审核`)
    setReviews(reviews.filter(r => r.id !== reviewId))
    setShowDetailDialog(false)
  }

  const handleReject = (reviewId: number) => {
    if (!rejectReason.trim()) {
      alert('请输入拒绝原因')
      return
    }
    alert(`已拒绝 ID: ${reviewId} 的翻译审核，原因：${rejectReason}`)
    setReviews(reviews.filter(r => r.id !== reviewId))
    setRejectReason('')
    setShowRejectDialog(false)
    setShowDetailDialog(false)
  }

  const toggleLangExpand = (reviewId: number) => {
    setExpandedLangs(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  return (
    <div className="p-8">
      <PageHeader
        title="翻译审核"
        description="审核体验活动的多语言内容质量"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="待审核"
          value={reviewStats.pending}
          subtitle="条内容"
          icon={Clock}
          iconColor="bg-yellow-500"
        />
        <StatCard
          title="已通过"
          value={reviewStats.approved}
          subtitle="条内容"
          icon={CheckCircle}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="已拒绝"
          value={reviewStats.rejected}
          subtitle="条内容"
          icon={XCircle}
          iconColor="bg-red-500"
        />
        <StatCard
          title="审核率"
          value={`${Math.round((reviewStats.approved + reviewStats.rejected) / reviewStats.total * 100)}%`}
          subtitle="已审核占比"
          icon={Languages}
          iconColor="bg-blue-500"
        />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-slate-800 mb-6">
          <TabsTrigger value="pending" className="data-[state=active]:bg-slate-700">
            待审核 ({reviews.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
            审核历史
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-slate-700">
            质量分析
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  {/* 头部信息 */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-white">{review.event}</h3>
                        <Badge variant="outline" className="border-slate-700 text-slate-400">
                          {review.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500">
                        提交人: {review.submitter} · {review.submitTime} · AI评分: {review.aiScore}分
                      </p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">待审核</Badge>
                  </div>

                  {/* 中文原文 */}
                  <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🇨🇳</span>
                      <span className="text-sm font-medium text-slate-400">中文原文</span>
                    </div>
                    <p className="text-white">{review.zh}</p>
                  </div>

                  {/* 翻译预览 - 可展开 */}
                  <div className="mb-4">
                    <button
                      onClick={() => toggleLangExpand(review.id)}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {expandedLangs[review.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      查看全部翻译 ({Object.keys(review.translations).length} 种语言)
                    </button>
                    
                    {expandedLangs[review.id] && (
                      <div className="mt-3 space-y-3">
                        {Object.entries(review.translations).map(([lang, data]) => (
                          <div key={lang} className="p-3 bg-slate-800/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span>{languageFlags[lang]}</span>
                              <span className="text-sm text-slate-400">{languageNames[lang]}</span>
                              {data.status === 'ai-generated' && (
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">AI生成</Badge>
                              )}
                            </div>
                            <p className="text-slate-300 text-sm">{data.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleApprove(review.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      通过
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-slate-700 text-slate-300 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => {
                        setSelectedReview(review)
                        setShowRejectDialog(true)
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      拒绝
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-slate-400"
                      onClick={() => {
                        setSelectedReview(review)
                        setShowDetailDialog(true)
                      }}
                    >
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="text-white text-lg">暂无待审核内容</p>
                <p className="text-slate-500">所有翻译内容已审核完毕</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">审核历史记录</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable>
                <DataTableHeader>
                  <tr>
                    <DataTableHead>活动名称</DataTableHead>
                    <DataTableHead>审核结果</DataTableHead>
                    <DataTableHead>审核人</DataTableHead>
                    <DataTableHead>审核时间</DataTableHead>
                    <DataTableHead>备注</DataTableHead>
                  </tr>
                </DataTableHeader>
                <DataTableBody>
                  {reviewHistory.map((record) => (
                    <DataTableRow key={record.id}>
                      <DataTableCell>{record.event}</DataTableCell>
                      <DataTableCell>
                        <Badge className={record.action === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                          {record.action === 'approved' ? '已通过' : '已拒绝'}
                        </Badge>
                      </DataTableCell>
                      <DataTableCell>{record.reviewer}</DataTableCell>
                      <DataTableCell>{record.time}</DataTableCell>
                      <DataTableCell>{record.note}</DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTableBody>
              </DataTable>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">翻译质量分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: '优秀 (90-100分)', count: 45, color: 'bg-emerald-500' },
                    { label: '良好 (80-89分)', count: 78, color: 'bg-blue-500' },
                    { label: '一般 (70-79分)', count: 28, color: 'bg-yellow-500' },
                    { label: '需改进 (<70分)', count: 5, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white">{item.count} 条</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${(item.count / 156) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">语言审核统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { lang: '英语', total: 156, pending: 3 },
                    { lang: '日语', total: 142, pending: 4 },
                    { lang: '韩语', total: 128, pending: 2 },
                    { lang: '泰语', total: 98, pending: 3 },
                  ].map((item) => (
                    <div key={item.lang} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400" />
                        <span className="text-white">{item.lang}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">总计 {item.total}</span>
                        {item.pending > 0 && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">待审 {item.pending}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">常见问题类型</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { type: '术语不准确', count: 12, example: '"胡同"翻译为"Hutong"而非音译' },
                    { type: '文化表达不当', count: 8, example: '"老字号"翻译需加解释' },
                    { type: '语法错误', count: 5, example: '日语助词使用错误' },
                  ].map((item) => (
                    <div key={item.type} className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-medium">{item.type}</span>
                      </div>
                      <p className="text-2xl font-bold text-white mb-2">{item.count} 次</p>
                      <p className="text-sm text-slate-500">{item.example}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 拒绝原因弹窗 */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>拒绝审核</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-slate-400">请说明拒绝原因，帮助提交者改进：</p>
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="请输入拒绝原因，如：日语翻译不准确，请重新翻译..."
              className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>取消</Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => selectedReview && handleReject(selectedReview.id)}
              >
                确认拒绝
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>翻译详情</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6 mt-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">活动: {selectedReview.event}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🇨🇳</span>
                  <span className="font-medium text-white">中文原文</span>
                </div>
                <p className="text-white">{selectedReview.zh}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-400">多语言翻译:</p>
                {Object.entries(selectedReview.translations).map(([lang, data]) => (
                  <div key={lang} className="p-4 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{languageFlags[lang]}</span>
                      <span className="font-medium text-white">{languageNames[lang]}</span>
                      {data.status === 'ai-generated' && (
                        <Badge className="bg-blue-500/20 text-blue-400">AI生成</Badge>
                      )}
                    </div>
                    <p className="text-slate-300">{data.text}</p>
                  </div>
                ))}
              </div>

              <DialogFooter className="flex gap-2">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>关闭</Button>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleApprove(selectedReview.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  通过
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  拒绝
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
