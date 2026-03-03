'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  escalated?: boolean
}

interface AIChatProps {
  hotelId?: string
  hotelName?: string
}

export function AIChat({ hotelId, hotelName }: AIChatProps) {
  const t = useTranslations()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: hotelName 
        ? t('aiChat.welcome.withHotel', { hotelName })
        : t('aiChat.welcome.default'),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEscalated, setIsEscalated] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sessionId = useRef(`session_${Date.now()}`)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input,
            sessionId: sessionId.current,
            hotelId,
            language: 'en',
          }),
        }
      )

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        escalated: data.escalatedToHuman,
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (data.escalatedToHuman) {
        setIsEscalated(true)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t('aiChat.errorMessage'),
        timestamp: new Date(),
        escalated: true,
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsEscalated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    t('aiChat.quickQuestions.elevator'),
    t('aiChat.quickQuestions.forbiddenCity'),
    t('aiChat.quickQuestions.airportPickup'),
    t('aiChat.quickQuestions.breakfast'),
    t('aiChat.quickQuestions.checkIn'),
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <CardTitle className="text-base">{t('aiChat.title')}</CardTitle>
          </div>
          {isEscalated && (
            <Badge variant="secondary" className="text-xs">
              {t('aiChat.humanAgentNotified')}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {t('aiChat.subtitle')}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="h-64 overflow-y-auto space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                } ${message.escalated ? 'border border-yellow-500/30' : ''}`}
              >
                {message.content}
                {message.escalated && (
                  <div className="mt-1 text-xs text-yellow-500">
                    {t('aiChat.humanReplyTime')}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg px-3 py-2">
                <span className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setInput(q)
              }}
              className="text-xs bg-secondary/50 hover:bg-secondary px-2 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder={t('aiChat.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            →
          </Button>
        </div>

        {/* Cultural Tips */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          <p className="font-medium mb-1">{t('aiChat.travelTips.title')}</p>
          <ul className="space-y-1">
            <li>{t('aiChat.travelTips.tapWater')}</li>
            <li>{t('aiChat.travelTips.toiletPaper')}</li>
            <li>{t('aiChat.travelTips.wechat')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
