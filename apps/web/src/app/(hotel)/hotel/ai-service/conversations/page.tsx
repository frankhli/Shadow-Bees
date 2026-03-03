'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Globe, Clock, ArrowRight } from 'lucide-react'

const conversations = [
  { id: 1, guest: 'John Smith', flag: '🇺🇸', lang: 'English', preview: 'Is breakfast included in the room rate?', time: '10:23', status: 'resolved', confidence: 95 },
  { id: 2, guest: '田中太郎', flag: '🇯🇵', lang: '日本語', preview: 'チェックイン時間を早められますか？', time: '09:45', status: 'ai_handling', confidence: 88 },
  { id: 3, guest: 'Marie Dubois', flag: '🇫🇷', lang: 'Français', preview: 'Pouvez-vous recommander des restaurants ?', time: 'Yesterday', status: 'human_takeover', confidence: 45 },
  { id: 4, guest: 'Hans Mueller', flag: '🇩🇪', lang: 'Deutsch', preview: 'Ist eine späte Anreise möglich?', time: 'Yesterday', status: 'resolved', confidence: 92 },
]

export default function ConversationsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="对话记录"
        description="查看AI客服与客人的历史对话"
      />

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">最近对话</CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-slate-700 text-slate-300">全部</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-400">AI处理</Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-400">人工接管</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {conversations.map((chat) => (
              <div 
                key={chat.id}
                className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{chat.flag}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium">{chat.guest}</span>
                      <Badge variant="outline" className="bg-slate-700 text-slate-300 text-xs">
                        {chat.lang}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 truncate max-w-md">{chat.preview}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    {chat.status === 'human_takeover' && (
                      <Badge className="bg-orange-500/20 text-orange-400 mb-1">
                        人工接管
                      </Badge>
                    )}
                    {chat.status === 'ai_handling' && (
                      <Badge className="bg-cyan-500/20 text-cyan-400 mb-1">
                        AI处理中
                      </Badge>
                    )}
                    {chat.status === 'resolved' && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 mb-1">
                        已解决
                      </Badge>
                    )}
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chat.time} · 置信度 {chat.confidence}%
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
