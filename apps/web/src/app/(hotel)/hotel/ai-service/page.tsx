'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Globe,
  ArrowRight
} from 'lucide-react'

// Mock 对话数据
const conversations = [
  {
    id: 'CONV001',
    guest: { name: 'John Smith', nationality: 'US', language: 'en' },
    lastMessage: 'Do you have elevator in the hotel?',
    translatedMessage: '酒店有电梯吗？',
    status: 'ai_handling',
    confidence: 0.92,
    time: '2分钟前',
    unread: true,
  },
  {
    id: 'CONV002',
    guest: { name: 'Maria Garcia', nationality: 'ES', language: 'es' },
    lastMessage: '¿Cuál es el horario de check-in?',
    translatedMessage: '入住时间是什么时候？',
    status: 'human_needed',
    confidence: 0.45,
    time: '5分钟前',
    unread: true,
  },
  {
    id: 'CONV003',
    guest: { name: 'Pierre Dubois', nationality: 'FR', language: 'fr' },
    lastMessage: 'Je voudrais annuler ma réservation',
    translatedMessage: '我想取消我的预订',
    status: 'ai_handling',
    confidence: 0.88,
    time: '10分钟前',
    unread: false,
  },
  {
    id: 'CONV004',
    guest: { name: '田中太郎', nationality: 'JP', language: 'ja' },
    lastMessage: '朝食は付いていますか？',
    translatedMessage: '包含早餐吗？',
    status: 'resolved',
    confidence: 0.95,
    time: '30分钟前',
    unread: false,
  },
]

const stats = {
  totalToday: 24,
  aiResolved: 18,
  humanHandled: 4,
  pending: 2,
  avgResponseTime: '12秒',
}

export default function AIServicePage() {
  const [selectedTab, setSelectedTab] = useState('all')

  const filteredConversations = conversations.filter((conv) => {
    if (selectedTab === 'all') return true
    if (selectedTab === 'human_needed') return conv.status === 'human_needed'
    if (selectedTab === 'ai_handling') return conv.status === 'ai_handling'
    if (selectedTab === 'resolved') return conv.status === 'resolved'
    return true
  })

  const getStatusBadge = (status: string, confidence: number) => {
    switch (status) {
      case 'ai_handling':
        return confidence > 0.8 
          ? <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">AI处理中</Badge>
          : <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">AI处理中</Badge>
      case 'human_needed':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">需人工</Badge>
      case 'resolved':
        return <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20">已解决</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="AI智能客服"
        description="实时监控AI客服状态，处理需要人工介入的对话"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">今日对话</p>
                <p className="text-2xl font-bold text-white">{stats.totalToday}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">AI解决</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.aiResolved}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 mt-1">{Math.round((stats.aiResolved / stats.totalToday) * 100)}% 解决率</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">需人工</p>
                <p className="text-2xl font-bold text-orange-400">{stats.humanHandled + stats.pending}</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-xs text-slate-500 mt-1">待处理: {stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">平均响应</p>
                <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 对话列表 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <Tabs defaultValue="all" onValueChange={setSelectedTab}>
                <TabsList className="bg-slate-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
                    全部
                  </TabsTrigger>
                  <TabsTrigger value="human_needed" className="data-[state=active]:bg-slate-700">
                    需人工
                    {stats.pending > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                        {stats.pending}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="ai_handling" className="data-[state=active]:bg-slate-700">
                    AI处理中
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="data-[state=active]:bg-slate-700">
                    已解决
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      conv.unread ? 'bg-cyan-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {conv.guest.nationality === 'US' && '🇺🇸'}
                          {conv.guest.nationality === 'ES' && '🇪🇸'}
                          {conv.guest.nationality === 'FR' && '🇫🇷'}
                          {conv.guest.nationality === 'JP' && '🇯🇵'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{conv.guest.name}</span>
                            <span className="text-xs text-slate-500">[{conv.guest.language.toUpperCase()}]</span>
                            {conv.unread && (
                              <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                            )}
                          </div>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-slate-400 italic">"{conv.lastMessage}"</p>
                            <p className="text-sm text-cyan-400">→ {conv.translatedMessage}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(conv.status, conv.confidence)}
                        <p className="text-xs text-slate-500 mt-1">{conv.time}</p>
                        {conv.status === 'ai_handling' && (
                          <p className={`text-xs mt-1 ${conv.confidence > 0.8 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                            置信度 {Math.round(conv.confidence * 100)}%
                          </p>
                        )}
                      </div>
                    </div>
                    {conv.status === 'human_needed' && (
                      <div className="mt-3 flex justify-end">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          立即接管
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：快捷操作和知识库 */}
        <div className="space-y-6">
          {/* 快捷操作 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快捷操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800">
                <Globe className="w-4 h-4 mr-2" />
                查看多语言FAQ
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                标记AI回答错误
              </Button>
            </CardContent>
          </Card>

          {/* 常用语 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">常用语（自动翻译）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                '感谢您的预订，我们期待您的到来',
                '酒店提供24小时热水和免费WiFi',
                '退房时间为中午12点',
                '如需帮助请随时联系我们',
              ].map((phrase, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-800 rounded-lg text-sm text-slate-300 cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  {phrase}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
