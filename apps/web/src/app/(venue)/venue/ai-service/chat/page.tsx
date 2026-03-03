'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Send, 
  Languages, 
  User, 
  Clock, 
  CheckCircle2, 
  Globe,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  Search,
  Filter,
  ArrowLeft,
  Star,
  AlertCircle,
  CheckCheck,
  Volume2,
  Type,
  Copy,
  ThumbsUp,
  ThumbsDown,
  X
} from 'lucide-react'
import { useState } from 'react'

interface ChatMessage {
  id: string
  sender: 'customer' | 'venue' | 'system'
  content: string
  translatedContent?: string
  language: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  avatar?: string
}

interface ChatSession {
  id: string
  customerName: string
  customerAvatar?: string
  language: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  status: 'active' | 'closed' | 'pending'
  topic: string
}

const mockSessions: ChatSession[] = [
  {
    id: '1',
    customerName: 'John Smith',
    language: 'English',
    lastMessage: 'What time does the activity start tomorrow?',
    timestamp: '10:23',
    unreadCount: 2,
    status: 'active',
    topic: 'Activity Inquiry'
  },
  {
    id: '2',
    customerName: '田中太郎',
    language: 'Japanese',
    lastMessage: '予約をキャンセルしたいです',
    timestamp: '09:45',
    unreadCount: 0,
    status: 'active',
    topic: 'Cancellation'
  },
  {
    id: '3',
    customerName: 'Pierre Dubois',
    language: 'French',
    lastMessage: 'Merci beaucoup pour votre aide!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    status: 'closed',
    topic: 'Thank You'
  },
  {
    id: '4',
    customerName: 'Maria Garcia',
    language: 'Spanish',
    lastMessage: '¿Hay descuento para grupos?',
    timestamp: 'Yesterday',
    unreadCount: 1,
    status: 'pending',
    topic: 'Group Discount'
  },
  {
    id: '5',
    customerName: 'Kim Min-jae',
    language: 'Korean',
    lastMessage: '위치가 어디인가요?',
    timestamp: '2 days ago',
    unreadCount: 0,
    status: 'closed',
    topic: 'Location Inquiry'
  }
]

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'system',
    content: 'Customer John Smith joined the chat',
    language: 'System',
    timestamp: '10:20',
    status: 'read'
  },
  {
    id: '2',
    sender: 'customer',
    content: 'Hello! I am interested in your cooking class activity.',
    translatedContent: '你好！我对你们的烹饪课活动很感兴趣。',
    language: 'English',
    timestamp: '10:21',
    status: 'read'
  },
  {
    id: '3',
    sender: 'venue',
    content: '您好！欢迎咨询我们的烹饪课。请问您想了解哪方面的信息呢？',
    translatedContent: 'Hello! Welcome to our cooking class. What information would you like to know?',
    language: 'Chinese',
    timestamp: '10:22',
    status: 'read'
  },
  {
    id: '4',
    sender: 'customer',
    content: 'What time does the activity start tomorrow?',
    translatedContent: '明天的活动什么时候开始？',
    language: 'English',
    timestamp: '10:23',
    status: 'read'
  },
  {
    id: '5',
    sender: 'customer',
    content: 'And how long does it usually take?',
    translatedContent: '通常需要多长时间？',
    language: 'English',
    timestamp: '10:23',
    status: 'delivered'
  }
]

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' }
]

const quickReplies = [
  '活动上午10点开始，持续约3小时',
  '我们支持团体预约，10人以上有优惠',
  '取消预约请提前24小时通知',
  '地址：北京市朝阳区...',
  '价格包含所有材料和设备',
  '建议穿着舒适的休闲服装'
]

export default function AIServiceChatPage() {
  const [selectedSession, setSelectedSession] = useState<string>('1')
  const [inputMessage, setInputMessage] = useState('')
  const [showTranslation, setShowTranslation] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'closed'>('all')

  const filteredSessions = mockSessions.filter(session => {
    if (activeTab === 'all') return true
    return session.status === activeTab
  })

  const currentSession = mockSessions.find(s => s.id === selectedSession)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">进行中</Badge>
      case 'pending':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">待回复</Badge>
      case 'closed':
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">已结束</Badge>
      default:
        return null
    }
  }

  const getLanguageBadge = (language: string) => {
    const lang = supportedLanguages.find(l => l.name === language)
    return (
      <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
        <Globe className="w-3 h-3 mr-1" />
        {lang?.flag} {language}
      </Badge>
    )
  }

  return (
    <div className="p-8 h-[calc(100vh-4rem)]">
      <PageHeader
        title="实时翻译客服"
        description="与全球游客实时沟通，AI自动翻译"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-6rem)]">
        {/* Left Sidebar - Chat List */}
        <Card className="bg-slate-900 border-slate-800 lg:col-span-1 flex flex-col h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-orange-400" />
                会话列表
              </CardTitle>
              <Badge className="bg-orange-500/20 text-orange-400">
                {mockSessions.filter(s => s.unreadCount > 0).length} 未读
              </Badge>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索会话..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <Button variant="outline" size="icon" className="border-slate-700 text-slate-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              {(['all', 'active', 'closed'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'border-slate-700 text-slate-400 hover:text-white'}
                >
                  {tab === 'all' && '全部'}
                  {tab === 'active' && '进行中'}
                  {tab === 'closed' && '已结束'}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-1 px-4 pb-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSession === session.id
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : 'bg-slate-800/50 hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
                      {session.customerName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm truncate">
                          {session.customerName}
                        </span>
                        <span className="text-xs text-slate-500">{session.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getLanguageBadge(session.language)}
                      </div>
                      <p className="text-slate-400 text-xs mt-1 truncate">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{session.topic}</span>
                        <div className="flex items-center gap-2">
                          {session.unreadCount > 0 && (
                            <Badge className="bg-orange-500 text-white text-xs px-1.5 py-0">
                              {session.unreadCount}
                            </Badge>
                          )}
                          {getStatusBadge(session.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Chat Area */}
        <Card className="bg-slate-900 border-slate-800 lg:col-span-2 flex flex-col h-full">
          {currentSession ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                      {currentSession.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{currentSession.customerName}</span>
                        {getLanguageBadge(currentSession.language)}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          在线
                        </span>
                        <span className="text-xs text-slate-400">{currentSession.topic}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="border-slate-700 text-slate-400 hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-slate-700 text-slate-400 hover:text-white">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-slate-700 text-slate-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div key={message.id} className={`flex ${
                      message.sender === 'venue' ? 'justify-end' : 'justify-start'
                    }`}>
                      {message.sender === 'customer' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm mr-2">
                          J
                        </div>
                      )}
                      <div className={`max-w-[70%] ${
                        message.sender === 'venue' ? 'items-end' : 'items-start'
                      }`}>
                        {message.sender === 'system' ? (
                          <div className="flex items-center justify-center my-2">
                            <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                              {message.content}
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className={`p-3 rounded-2xl ${
                              message.sender === 'venue'
                                ? 'bg-orange-500 text-white rounded-br-md'
                                : 'bg-slate-800 text-white rounded-bl-md'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                            {showTranslation && message.translatedContent && (
                              <div className={`mt-1 p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 ${
                                message.sender === 'venue' ? 'text-right' : 'text-left'
                              }`}>
                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                  <Languages className="w-3 h-3" />
                                  {message.translatedContent}
                                </p>
                              </div>
                            )}
                            <div className={`flex items-center gap-1 mt-1 ${
                              message.sender === 'venue' ? 'justify-end' : 'justify-start'
                            }`}>
                              <span className="text-xs text-slate-500">{message.timestamp}</span>
                              {message.sender === 'venue' && (
                                <CheckCheck className="w-3 h-3 text-emerald-400" />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <span className="text-xs text-slate-500 whitespace-nowrap">快捷回复:</span>
                  {quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(reply)}
                      className="border-slate-700 text-slate-300 text-xs whitespace-nowrap hover:bg-slate-800 hover:text-white"
                    >
                      {reply.length > 12 ? reply.slice(0, 12) + '...' : reply}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <CardContent className="pt-0 pb-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="输入消息..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-full px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    发送
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 px-2">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTranslation}
                        onChange={(e) => setShowTranslation(e.target.checked)}
                        className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-xs text-slate-400">显示翻译</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs h-7">
                      <Volume2 className="w-3 h-3 mr-1" />
                      语音播报
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs h-7">
                      <Copy className="w-3 h-3 mr-1" />
                      复制原文
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400">选择一个会话开始聊天</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-xs text-slate-400">今日会话</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2.3m</p>
                <p className="text-xs text-slate-400">平均响应</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-xs text-slate-400">支持语言</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-xs text-slate-400">满意度</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
