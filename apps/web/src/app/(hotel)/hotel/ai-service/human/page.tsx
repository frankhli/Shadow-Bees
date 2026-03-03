'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Send, User, Bot } from 'lucide-react'

const messages = [
  { id: 1, sender: 'guest', name: 'Marie Dubois', flag: '🇫🇷', text: 'I would like to know if you can arrange a airport pickup for me?', time: '10:23' },
  { id: 2, sender: 'ai', text: '[AI翻译] 客人询问是否可以安排机场接送', time: '10:23' },
  { id: 3, sender: 'ai', text: 'Bonjour! Nous pouvons organiser un transfert aéroport. Le coût est de 280 yuan.', time: '10:24' },
  { id: 4, sender: 'guest', name: 'Marie Dubois', flag: '🇫🇷', text: 'That sounds good. But I have a special request - I am traveling with my elderly mother who needs wheelchair access.', time: '10:25' },
  { id: 5, sender: 'ai', text: '[AI置信度: 45%] 需要人工确认', time: '10:25' },
]

export default function HumanTakeoverPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="人工接管"
        description="处理AI置信度低的复杂对话"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 对话列表 */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">待处理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white font-medium">Marie Dubois</p>
                  <p className="text-xs text-slate-400">特殊需求 · 置信度45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 聊天窗口 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800 h-[600px] flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇫🇷</span>
                  <div>
                    <CardTitle className="text-white">Marie Dubois</CardTitle>
                    <p className="text-xs text-slate-400">Français · AI置信度低</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400">人工处理中</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'guest' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'guest' 
                      ? 'bg-slate-800 text-white' 
                      : msg.sender === 'ai'
                      ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/30'
                      : 'bg-cyan-600 text-white'
                  }`}>
                    {msg.sender === 'guest' && (
                      <p className="text-xs text-slate-400 mb-1">{msg.name}</p>
                    )}
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-slate-500 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t border-slate-800">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="输入中文回复，AI将自动翻译..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
                <Button className="bg-cyan-600 hover:bg-cyan-700 px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
