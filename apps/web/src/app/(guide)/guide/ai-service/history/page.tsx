'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Clock,
  Star,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

interface Conversation {
  id: string
  guestName: string
  nationality: string
  flag: string
  lastMessage: string
  date: string
  messageCount: number
  isRead: boolean
}

const conversations: Conversation[] = [
  {
    id: 'CONV-001',
    guestName: 'Emma Wilson',
    nationality: '英国',
    flag: '🇬🇧',
    lastMessage: '谢谢您的详细讲解，这次旅行很愉快！',
    date: '2024-03-15',
    messageCount: 12,
    isRead: true,
  },
  {
    id: 'CONV-002',
    guestName: 'Marie Dubois',
    nationality: '法国',
    flag: '🇫🇷',
    lastMessage: 'Merci beaucoup pour la tour!',
    date: '2024-03-14',
    messageCount: 8,
    isRead: true,
  },
  {
    id: 'CONV-003',
    guestName: '田中太郎',
    nationality: '日本',
    flag: '🇯🇵',
    lastMessage: '胡同の歴史についてもっと教えてください。',
    date: '2024-03-12',
    messageCount: 15,
    isRead: true,
  },
  {
    id: 'CONV-004',
    guestName: 'Hans Mueller',
    nationality: '德国',
    flag: '🇩🇪',
    lastMessage: 'Can we reschedule to tomorrow?',
    date: '2024-03-10',
    messageCount: 6,
    isRead: true,
  },
  {
    id: 'CONV-005',
    guestName: 'Sofia Rossi',
    nationality: '意大利',
    flag: '🇮🇹',
    lastMessage: 'Grazie mille!',
    date: '2024-03-08',
    messageCount: 4,
    isRead: true,
  },
]

export default function GuideAIServiceHistoryPage() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="p-8">
      <PageHeader
        title="对话历史"
        description="查看所有历史沟通记录"
      />

      {/* 统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">128</p>
                <p className="text-sm text-slate-400">总会话数</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">96%</p>
                <p className="text-sm text-slate-400">AI解决率</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">24</p>
                <p className="text-sm text-slate-400">本月会话</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">4.8</p>
                <p className="text-sm text-slate-400">客户满意度</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 筛选 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: '全部' },
          { id: 'recent', label: '最近7天' },
          { id: 'month', label: '本月' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === item.id
                ? 'bg-green-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 对话列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">历史对话</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conversations.map((conv) => (
              <div 
                key={conv.id}
                className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{conv.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{conv.guestName}</span>
                        <span className="text-xs text-slate-500">{conv.nationality}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1 truncate max-w-md">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-sm text-slate-500">{conv.date}</p>
                      <p className="text-xs text-slate-600">{conv.messageCount} 条消息</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
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
