'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Ticket, 
  Calendar, 
  User, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MapPin,
  Users,
  DollarSign,
  FileText,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  Download,
  Printer,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Edit3,
  Trash2,
  Eye,
  CheckCheck,
  Clock3,
  CalendarDays,
  Bell
} from 'lucide-react'
import { useState } from 'react'

interface BookingInquiry {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  activityName: string
  inquiryType: 'new_booking' | 'modify' | 'cancel' | 'inquiry'
  status: 'pending' | 'processing' | 'resolved' | 'closed'
  priority: 'high' | 'medium' | 'low'
  createdAt: string
  updatedAt: string
  message: string
  language: string
  groupSize?: number
  preferredDate?: string
  budget?: string
  aiSuggestion?: string
  tags: string[]
}

interface ActivityOption {
  id: string
  name: string
  price: number
  duration: string
  maxCapacity: number
  availableDates: string[]
}

const mockInquiries: BookingInquiry[] = [
  {
    id: 'BQ001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '+1-555-0123',
    activityName: '传统茶艺体验',
    inquiryType: 'new_booking',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15 10:30',
    updatedAt: '2024-01-15 10:30',
    message: 'I would like to book the tea ceremony experience for 4 people on January 20th. Is it available?',
    language: 'English',
    groupSize: 4,
    preferredDate: '2024-01-20',
    budget: '$200-300',
    aiSuggestion: '客户想预约1月20日的茶艺体验，4人。该时段有空位，建议提供团体优惠。',
    tags: ['团体预约', '英语客户']
  },
  {
    id: 'BQ002',
    customerName: '田中花子',
    customerEmail: 'hanako.tanaka@email.jp',
    customerPhone: '+81-90-1234-5678',
    activityName: '书法工作坊',
    inquiryType: 'modify',
    status: 'processing',
    priority: 'medium',
    createdAt: '2024-01-14 16:45',
    updatedAt: '2024-01-15 09:20',
    message: '予約の時間を変更したいです。午後2時から午前10時に変更可能でしょうか？',
    language: 'Japanese',
    groupSize: 2,
    preferredDate: '2024-01-18',
    aiSuggestion: '客户希望将预约从下午2点改为上午10点。需要检查该时段的可用性。',
    tags: ['改期', '日语客户']
  },
  {
    id: 'BQ003',
    customerName: 'Pierre Martin',
    customerEmail: 'pierre.martin@email.fr',
    customerPhone: '+33-6-12-34-56-78',
    activityName: '烹饪课程',
    inquiryType: 'inquiry',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-13 14:20',
    updatedAt: '2024-01-14 11:00',
    message: 'Quels plats allons-nous apprendre à cuisiner? Y a-t-il des options végétariennes?',
    language: 'French',
    aiSuggestion: '客户询问课程内容，关心是否有素食选项。建议发送详细菜单。',
    tags: ['咨询', '素食需求', '法语客户']
  },
  {
    id: 'BQ004',
    customerName: 'Kim Min-jae',
    customerEmail: 'minjae.kim@email.kr',
    customerPhone: '+82-10-9876-5432',
    activityName: '传统茶艺体验',
    inquiryType: 'cancel',
    status: 'closed',
    priority: 'high',
    createdAt: '2024-01-12 09:15',
    updatedAt: '2024-01-12 15:30',
    message: '개인적인 사정으로 예약을 취소해야 합니다. 환불 정책은 어떻게 되나요?',
    language: 'Korean',
    aiSuggestion: '客户因个人原因需要取消预约，询问退款政策。',
    tags: ['取消', '退款', '韩语客户']
  },
  {
    id: 'BQ005',
    customerName: 'Maria Rodriguez',
    customerEmail: 'maria.r@email.es',
    customerPhone: '+34-612-345-678',
    activityName: '陶艺制作',
    inquiryType: 'new_booking',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-01-15 08:00',
    updatedAt: '2024-01-15 08:00',
    message: '¿Tienen descuento para grupos? Somos 8 personas.',
    language: 'Spanish',
    groupSize: 8,
    preferredDate: '2024-01-25',
    budget: '€300-400',
    aiSuggestion: '8人团体咨询陶艺课程，询问团体折扣。8人可享受15%折扣。',
    tags: ['团体预约', '折扣咨询', '西班牙语客户']
  }
]

const activityOptions: ActivityOption[] = [
  { id: '1', name: '传统茶艺体验', price: 168, duration: '2小时', maxCapacity: 12, availableDates: ['2024-01-20', '2024-01-21', '2024-01-22'] },
  { id: '2', name: '书法工作坊', price: 128, duration: '1.5小时', maxCapacity: 8, availableDates: ['2024-01-18', '2024-01-19'] },
  { id: '3', name: '烹饪课程', price: 298, duration: '3小时', maxCapacity: 10, availableDates: ['2024-01-20', '2024-01-23'] },
  { id: '4', name: '陶艺制作', price: 198, duration: '2.5小时', maxCapacity: 6, availableDates: ['2024-01-25', '2024-01-26'] }
]

const inquiryTypeLabels: Record<string, { label: string; color: string }> = {
  new_booking: { label: '新预约', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  modify: { label: '修改预约', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  cancel: { label: '取消预约', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  inquiry: { label: '一般咨询', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' }
}

const statusLabels: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: '待处理', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Clock3 },
  processing: { label: '处理中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: RefreshCw },
  resolved: { label: '已解决', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  closed: { label: '已关闭', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', icon: XCircle }
}

const priorityLabels: Record<string, { label: string; color: string }> = {
  high: { label: '高', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  medium: { label: '中', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
  low: { label: '低', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' }
}

const languageFlags: Record<string, string> = {
  English: '🇺🇸',
  Japanese: '🇯🇵',
  Korean: '🇰🇷',
  French: '🇫🇷',
  Spanish: '🇪🇸',
  German: '🇩🇪'
}

export default function AIServiceBookingPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [showAIReply, setShowAIReply] = useState(true)

  const filteredInquiries = mockInquiries.filter(inquiry => {
    const matchStatus = filterStatus === 'all' || inquiry.status === filterStatus
    const matchType = filterType === 'all' || inquiry.inquiryType === filterType
    const matchSearch = searchQuery === '' || 
      inquiry.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.activityName.includes(searchQuery)
    return matchStatus && matchType && matchSearch
  })

  const stats = {
    total: mockInquiries.length,
    pending: mockInquiries.filter(i => i.status === 'pending').length,
    processing: mockInquiries.filter(i => i.status === 'processing').length,
    resolved: mockInquiries.filter(i => i.status === 'resolved').length,
    today: mockInquiries.filter(i => i.createdAt.includes('2024-01-15')).length
  }

  const getInquiryTypeBadge = (type: string) => {
    const config = inquiryTypeLabels[type]
    return <Badge className={`${config.color} text-xs`}>{config.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const config = statusLabels[status]
    const Icon = config.icon
    return (
      <Badge className={`${config.color} text-xs flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPriorityBadge = (priority: string) => {
    const config = priorityLabels[priority]
    return <Badge variant="outline" className={`${config.color} text-xs`}>{config.label}优先级</Badge>
  }

  return (
    <div className="p-8">
      <PageHeader
        title="预约咨询管理"
        description="处理预约相关咨询，AI智能辅助回复"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-xs text-slate-400">总咨询数</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
                <p className="text-xs text-slate-400">待处理</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
                <p className="text-xs text-slate-400">处理中</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400">{stats.resolved}</p>
                <p className="text-xs text-slate-400">已解决</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-400">{stats.today}</p>
                <p className="text-xs text-slate-400">今日新增</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Inquiry List */}
        <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-400" />
                咨询列表
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  导出
                </Button>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 text-xs">
                  <Printer className="w-3 h-3 mr-1" />
                  打印
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索客户姓名、咨询编号..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
              >
                <option value="all">全部状态</option>
                <option value="pending">待处理</option>
                <option value="processing">处理中</option>
                <option value="resolved">已解决</option>
                <option value="closed">已关闭</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
              >
                <option value="all">全部类型</option>
                <option value="new_booking">新预约</option>
                <option value="modify">修改预约</option>
                <option value="cancel">取消预约</option>
                <option value="inquiry">一般咨询</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${
                    selectedInquiry?.id === inquiry.id
                      ? 'bg-orange-500/10 border-orange-500/50'
                      : 'bg-slate-800/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                        {inquiry.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{inquiry.customerName}</span>
                          <span className="text-lg">{languageFlags[inquiry.language]}</span>
                          {getPriorityBadge(inquiry.priority)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">{inquiry.id}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-400">{inquiry.activityName}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2">{inquiry.message}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {inquiry.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-slate-800 rounded text-slate-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {getInquiryTypeBadge(inquiry.inquiryType)}
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{inquiry.createdAt}</p>
                      {inquiry.groupSize && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                          <Users className="w-3 h-3" />
                          {inquiry.groupSize}人
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right - Detail Panel */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-400" />
              咨询详情
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedInquiry ? (
              <div className="space-y-4">
                {/* Customer Info */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-400" />
                    客户信息
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      {selectedInquiry.customerName}
                      <span className="text-lg">{languageFlags[selectedInquiry.language]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {selectedInquiry.customerEmail}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      {selectedInquiry.customerPhone}
                    </div>
                  </div>
                </div>

                {/* Inquiry Info */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-orange-400" />
                    咨询信息
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">咨询编号</span>
                      <span className="text-white text-sm">{selectedInquiry.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">活动名称</span>
                      <span className="text-white text-sm">{selectedInquiry.activityName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">咨询类型</span>
                      {getInquiryTypeBadge(selectedInquiry.inquiryType)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">当前状态</span>
                      {getStatusBadge(selectedInquiry.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">优先级</span>
                      {getPriorityBadge(selectedInquiry.priority)}
                    </div>
                    {selectedInquiry.groupSize && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">团体人数</span>
                        <span className="text-white text-sm">{selectedInquiry.groupSize}人</span>
                      </div>
                    )}
                    {selectedInquiry.preferredDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">期望日期</span>
                        <span className="text-white text-sm">{selectedInquiry.preferredDate}</span>
                      </div>
                    )}
                    {selectedInquiry.budget && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">预算范围</span>
                        <span className="text-white text-sm">{selectedInquiry.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Suggestion */}
                {selectedInquiry.aiSuggestion && (
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                      <CheckCheck className="w-4 h-4" />
                      AI智能建议
                    </h4>
                    <p className="text-sm text-slate-300">{selectedInquiry.aiSuggestion}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20 text-xs"
                        onClick={() => setReplyMessage(selectedInquiry.aiSuggestion || '')}
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        采用建议
                      </Button>
                    </div>
                  </div>
                )}

                {/* Original Message */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-orange-400" />
                    客户留言
                  </h4>
                  <p className="text-sm text-slate-300 bg-slate-800 p-3 rounded">{selectedInquiry.message}</p>
                </div>

                {/* Reply Area */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Send className="w-4 h-4 text-orange-400" />
                    回复客户
                  </h4>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="输入回复内容..."
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showAIReply}
                        onChange={(e) => setShowAIReply(e.target.checked)}
                        className="rounded border-slate-600 bg-slate-800 text-orange-500"
                      />
                      <span className="text-xs text-slate-400">AI辅助翻译</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 text-xs">
                        保存草稿
                      </Button>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                        <Send className="w-3 h-3 mr-1" />
                        发送回复
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    标记解决
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    转交
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    关闭
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">选择一个咨询查看详情</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Available Activities Reference */}
      <Card className="bg-slate-900 border-slate-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            活动可用性参考
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityOptions.map((activity) => (
              <div key={activity.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                <h4 className="text-white font-medium mb-2">{activity.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>价格</span>
                    <span className="text-orange-400 font-medium">¥{activity.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>时长</span>
                    <span className="text-white">{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>最大容量</span>
                    <span className="text-white">{activity.maxCapacity}人</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <p className="text-xs text-slate-500 mb-1">可预约日期:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.availableDates.map((date, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                          {date.slice(5)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
