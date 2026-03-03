'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Send, 
  Globe,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: number
  sender: 'guest' | 'me'
  text: string
  translatedText?: string
  time: string
  flag?: string
  guestName?: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'guest',
    text: 'Hello! I am interested in your hutong tour. Can you tell me more about it?',
    translatedText: '你好！我对你的胡同游览很感兴趣。能告诉我更多详情吗？',
    time: '10:23',
    flag: '🇬🇧',
    guestName: 'Emma Wilson',
  },
  {
    id: 2,
    sender: 'me',
    text: '你好！我们的胡同游览包含南锣鼓巷、什刹海等经典景点，全程约3小时。我会用英语为你讲解老北京的历史文化。',
    translatedText: 'Hello! Our hutong tour includes Nanluoguxiang, Shichahai and other classic spots. It takes about 3 hours. I will explain the history and culture of old Beijing in English.',
    time: '10:25',
  },
  {
    id: 3,
    sender: 'guest',
    text: 'That sounds great! Do you offer hotel pick-up service?',
    translatedText: '听起来很棒！你们提供酒店接送服务吗？',
    time: '10:26',
    flag: '🇬🇧',
    guestName: 'Emma Wilson',
  },
]

export default function GuideAIServiceChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputText, setInputText] = useState('')
  const [translatedPreview, setTranslatedPreview] = useState('')

  const handleSend = () => {
    if (!inputText.trim()) return
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    }
    
    setMessages([...messages, newMessage])
    setInputText('')
    setTranslatedPreview('')
  }

  const handleInputChange = (value: string) => {
    setInputText(value)
    // 模拟AI翻译预览
    if (value.trim()) {
      setTranslatedPreview(`[AI翻译预览] ${value}`)
    } else {
      setTranslatedPreview('')
    }
  }

  return (
    <div className="p-8 h-[calc(100vh-100px)]">
      <PageHeader
        title="实时翻译对话"
        description="与外国游客实时沟通"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* 左侧：对话列表 */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border-slate-800 h-full">
            <CardHeader>
              <CardTitle className="text-white text-base">进行中的对话</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🇬🇧</span>
                  <span className="font-medium text-white">Emma Wilson</span>
                </div>
                <p className="text-xs text-slate-400 truncate">Do you offer hotel pick-up...</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500/20 text-green-400 text-xs">进行中</Badge>
                  <span className="text-xs text-slate-500">2分钟前</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🇫🇷</span>
                  <span className="font-medium text-white">Marie Dubois</span>
                </div>
                <p className="text-xs text-slate-400 truncate">Merci beaucoup pour la tour...</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-slate-700 text-slate-400 text-xs">已结束</Badge>
                  <span className="text-xs text-slate-500">昨天</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：聊天窗口 */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="bg-slate-900 border-slate-800 flex-1 flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <CardTitle className="text-white">Emma Wilson</CardTitle>
                    <p className="text-xs text-slate-400">English · 咨询胡同游览</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    AI辅助中
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* 消息区域 */}
            <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'guest' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[70%] space-y-1`}>
                    {msg.sender === 'guest' && (
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{msg.flag}</span>
                        <span>{msg.guestName}</span>
                        <span>{msg.time}</span>
                      </div>
                    )}
                    
                    {/* 原文 */}
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'guest' 
                        ? 'bg-slate-800 text-white rounded-tl-none' 
                        : 'bg-green-600 text-white rounded-tr-none'
                    }`}>
                      <p>{msg.text}</p>
                    </div>

                    {/* 翻译 */}
                    {msg.translatedText && (
                      <div className={`p-2 rounded text-xs ${
                        msg.sender === 'guest' 
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' 
                          : 'bg-green-500/10 text-green-300 border border-green-500/20'
                      }`}>
                        <div className="flex items-center gap-1 mb-1">
                          <Globe className="w-3 h-3" />
                          <span>AI翻译</span>
                        </div>
                        {msg.translatedText}
                      </div>
                    )}

                    {msg.sender === 'me' && (
                      <div className="text-right text-xs text-slate-500">{msg.time}</div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>

            {/* 输入区域 */}
            <div className="p-4 border-t border-slate-800 space-y-3">
              {/* 翻译预览 */}
              {translatedPreview && (
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-sm text-cyan-300">
                  <div className="flex items-center gap-1 mb-1">
                    <Globe className="w-3 h-3" />
                    <span>AI翻译预览 (English):</span>
                  </div>
                  {translatedPreview}
                </div>
              )}

              <div className="flex gap-2">
                <Textarea 
                  value={inputText}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="输入中文，AI将自动翻译..."
                  className="bg-slate-800 border-slate-700 text-white min-h-[80px]"
                />
                <Button 
                  className="bg-green-600 hover:bg-green-700 px-4 self-end"
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* 快捷回复 */}
              <div className="flex flex-wrap gap-2">
                {['好的，没问题', '请稍等', '很高兴为您服务', '谢谢您的选择'].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => handleInputChange(phrase)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-xs text-slate-300 transition-colors"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
