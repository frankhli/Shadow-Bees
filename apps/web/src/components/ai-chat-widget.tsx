'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  X, 
  Send, 
  User,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Headphones
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatWidgetProps {
  hotelId?: string
  hotelName?: string
}

const QUICK_QUESTIONS = {
  zh: ['144h免签', '酒店设施', '取消政策', '入住须知'],
  en: ['144h Visa-Free', 'Facilities', 'Cancellation', 'Check-in']
}

// 规则类型定义
interface ChatRule {
  id: string
  keywords: string[]
  response: string
}

// 从规则库加载规则（生产环境应从API或文件加载）
const RULES: ChatRule[] = [
  {
    id: 'visa',
    keywords: ['visa', '签证', '144', '免签', 'visa-free', 'transit'],
    response: `🌍 144-Hour Visa-Free Transit Policy / 144小时过境免签政策

✅ Eligibility / 适用条件:
• Hold valid international travel documents
• From 53 visa-free countries (US/UK/Canada/Australia/Germany/France, etc.)
• Have onward ticket departing within 144 hours
• Enter through designated ports

📍 Applicable Areas / 适用城市:
• Beijing-Tianjin-Hebei region
• Yangtze River Delta (Shanghai, Jiangsu, Zhejiang)
• Pearl River Delta (Guangzhou, Shenzhen, etc.)
• Other: Chengdu, Xiamen, Xi'an, Kunming

⏰ Time Calculation / 时间计算:
144 hours (6 days) from midnight after entry

💡 Tip: Perfect for short trips! Visit the Great Wall, Forbidden City, or enjoy Shanghai's skyline without visa hassle.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'facilities',
    keywords: ['elevator', 'lift', '楼梯', 'toilet', 'bathroom', '厕所', 'shower', 'wifi', '设施', 'breakfast', '早餐', 'facility', 'amenities', 'internet', 'network', '网络'],
    response: `🏨 Hotel Facilities / 酒店设施

📶 Internet / 网络:
✅ Free WiFi throughout the hotel
✅ No password needed for lobby access
✅ Stable connection in all rooms

🍽️ Breakfast / 早餐:
✅ Included (Chinese & Western buffet)
⏰ Hours: 06:30 - 10:00
📍 Location: Hotel restaurant (usually 2F)

🛏️ Room Facilities / 客房设施:
✅ A/C & Heating
✅ 24-hour hot water
✅ Hair dryer & electric kettle
✅ Toiletries & slippers
✅ In-room safe

📋 Other Services / 其他服务:
✅ 24-hour front desk
✅ Luggage storage
✅ Laundry service (fee applies)

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'booking',
    keywords: ['book', '预订', '订房', 'check', '入住', 'reservation', 'availability', 'room', '房间'],
    response: `📋 Booking Information / 预订须知

📝 How to Book / 如何预订:
1. Select your dates and room type
2. Click "Book Now" to check availability
3. Complete guest information
4. Choose payment method (Demo mode)

✅ What's Included / 费用包含:
• Room accommodation
• Breakfast (if specified)
• Free WiFi
• Local taxes

⚠️ Important Notes / 重要提示:
• Passport required at check-in
• Check-in: Usually after 14:00
• Check-out: Usually before 12:00
• Early check-in subject to availability

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'pricing',
    keywords: ['price', 'cost', '多少钱', '价格', 'payment', '支付', 'fee', '费用', 'money', 'charge', 'refund', '退款'],
    response: `💰 Pricing & Payment / 价格与支付

💳 Payment Methods / 支付方式:
✅ International credit cards (VISA/Mastercard)
✅ PayPal
✅ Alipay (for Chinese users)
✅ WeChat Pay

💵 Price Breakdown / 价格构成:
• Room rate (per night)
• Cleaning fee (if applicable)
• Service fee (platform fee)
• Local taxes

⚠️ Demo Mode Notice:
Currently in demonstration mode. No actual payment will be processed. For real booking, you'll be redirected to Booking.com or Airbnb.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'cancellation',
    keywords: ['cancel', 'refund', '取消', '退款', 'policy', '政策', 'change', '改期', 'modify', '修改'],
    response: `📋 Cancellation Policy / 取消政策

🕐 Free Cancellation / 免费取消:
• 24+ hours before check-in → Full refund
• Within 24 hours → First night charged

💰 Refund Process / 退款流程:
• Refund to original payment method
• Processing time: 3-10 business days
• No refund for no-shows

⚠️ Non-Refundable Bookings:
Some special rates may be non-refundable. This will be clearly marked during booking.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'foreigner',
    keywords: ['foreigner', '外宾', '外国人', 'passport', 'foreign', '护照', 'international', '国际'],
    response: `✅ Foreign Guest Information / 外宾接待

📋 Requirements / 入住要求:
• Valid passport required
• Visa or visa-free entry proof
• Registration completed within 24 hours

🗣️ Language Support / 语言支持:
• Basic English at front desk
• AI translation available
• English signage in common areas

💳 Payment / 支付:
• International credit cards accepted
• Cash (RMB) accepted
• Foreign currency exchange nearby

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`
  },
  {
    id: 'human',
    keywords: ['human', 'agent', '人工', '客服', 'support', 'help', 'contact', '联系', 'phone', '电话'],
    response: `👤 Transferring to Human Agent / 转接人工客服

Your request has been forwarded to our support team.

⏰ Response Time / 响应时间:
• Live chat: Usually within 5 minutes
• Email: Within 24 hours

📧 Contact / 联系方式:
• Email: support@tiaohai.global
• WeChat: tiaohai_support

⚠️ Note: This is a Beta version. Human agents are available during business hours (9:00-18:00 CST).`
  }
]

const DEFAULT_RESPONSE = `👋 Thanks for your message!

I'm Tiaohai AI Assistant (Beta version). I can help you with:

• 🌍 144-hour visa-free transit policy
• 🏨 Hotel facilities & amenities  
• 📋 Booking procedures
• 💰 Pricing & payment questions
• 📋 Cancellation policies
• ✅ Foreign guest requirements

Please select a quick question below or type your question directly.

---
💬 Beta version. Contact support@tiaohai.global for urgent matters.`

// Local storage key for chat history
const CHAT_HISTORY_KEY = 'tiaohai_chat_history'

export function AIChatWidget({ hotelId, hotelName }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEscalated, setIsEscalated] = useState(false)
  const [showHumanPrompt, setShowHumanPrompt] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CHAT_HISTORY_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })))
      } catch (e) {
        console.error('Failed to load chat history')
      }
    }
  }, [])

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-20))) // Keep last 20 messages
    }
  }, [messages])

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = `👋 Welcome to Tiaohai Global!

我是您的AI助手（Beta版），可以帮您解答：
• 🌍 144小时过境免签政策
• 🏨 酒店设施与入住须知  
• 📋 预订流程与修改
• 💰 价格与支付方式
• 📋 取消与退款政策
• ✅ 外宾入住要求

请选择下方快捷问题或直接输入您的问题。`
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date()
        }
      ])
    }
  }, [isOpen, messages.length])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isExpanded])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Get last message for preview
  const lastMessage = messages[messages.length - 1]
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()
  const lastAssistantMessage = messages.filter(m => m.role === 'assistant' && m.id !== 'welcome').pop()

  // Get response based on rule matching
  const getMockResponse = useCallback((message: string): { content: string; escalated?: boolean } => {
    const lowerMsg = message.toLowerCase()
    
    // 遍历所有规则，查找匹配项
    for (const rule of RULES) {
      if (rule.keywords.some(keyword => lowerMsg.includes(keyword.toLowerCase()))) {
        // 人工客服特殊处理
        if (rule.id === 'human') {
          setIsEscalated(true)
          setShowHumanPrompt(true)
          return { content: rule.response, escalated: true }
        }
        return { content: rule.response }
      }
    }
    
    return { content: DEFAULT_RESPONSE }
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = getMockResponse(userMessage.content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      // Show unread indicator when chat is collapsed
      if (!isExpanded) {
        setHasUnread(true)
      }
    }, 800 + Math.random() * 600)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  const handleEscalateToHuman = () => {
    setIsEscalated(true)
    setShowHumanPrompt(true)
    const escalationMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '人工客服功能即将推出',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, escalationMessage])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  // Collapsed preview mode
  if (isOpen && !isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Recent conversation preview */}
        {lastMessage && (
          <div 
            onClick={() => {
              setIsExpanded(true)
              setHasUnread(false)
            }}
            className="bg-white rounded-2xl shadow-xl p-4 mb-2 max-w-[320px] cursor-pointer hover:shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85A71] to-[#C94A5F] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-gray-900">AI Concierge</span>
                  <Badge variant="secondary" className="text-[10px] bg-[#FFF3CD] text-[#856404] px-1.5 py-0">
                    Beta
                  </Badge>
                  {hasUnread && (
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {lastAssistantMessage?.content.slice(0, 80) || lastMessage.content.slice(0, 80)}...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {lastMessage && formatTime(lastMessage.timestamp)}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Collapsed chat button */}
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full shadow-lg px-4 py-2 text-sm text-gray-600">
            Continue chatting...
          </div>
          <Button
            onClick={() => setIsExpanded(true)}
            className="h-14 w-14 rounded-full bg-[#E85A71] hover:bg-[#C94A5F] shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
            size="icon"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    )
  }

  // Floating button mode (closed)
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <div className="bg-gray-900 text-white text-sm rounded-full px-4 py-2 shadow-lg animate-in fade-in slide-in-from-bottom-2 mb-2">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI全程陪伴您的旅程
          </span>
        </div>
        
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-br from-[#E85A71] to-[#C94A5F] hover:from-[#D54A61] hover:to-[#B93A4F] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
          size="icon"
          title="AI Concierge (Beta)"
          aria-label="AI Concierge (Beta)"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7 text-white group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#E85A71]" />
          </div>
        </Button>
      </div>
    )
  }

  // Full expanded chat mode
  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[650px] bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#E9ECEF] bg-gradient-to-r from-[#E85A71] to-[#C94A5F] text-white shrink-0">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 -ml-2 sm:hidden text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white text-base block leading-tight">
                AI Concierge
              </span>
              <span className="text-xs text-white/70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Online • 24/7 Support
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 text-[13px] font-medium h-8 px-2"
            onClick={handleEscalateToHuman}
          >
            <Headphones className="w-4 h-4 mr-1" />
            Human
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-white/20 hidden sm:flex"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white hover:bg-white/20 hidden sm:flex"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Hotel Context Banner */}
      {hotelName && (
        <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center gap-2">
          <span className="text-xs text-blue-600">
            💬 Chatting about: <span className="font-medium">{hotelName}</span>
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex animate-in fade-in slide-in-from-bottom-2 duration-200",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E85A71] to-[#C94A5F] flex items-center justify-center mr-2 shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={cn(
              "max-w-[85%] sm:max-w-[80%]",
              message.role === 'user' 
                ? 'bg-[#E85A71] text-white rounded-2xl rounded-br-md' 
                : 'bg-white text-[#212529] rounded-2xl rounded-bl-md shadow-sm'
            )}>
              <div className="px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
              <div className={cn(
                "px-4 pb-2 text-[11px]",
                message.role === 'user' 
                  ? 'text-white/70 text-left' 
                  : 'text-[#ADB5BD] text-right'
              )}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E85A71] to-[#C94A5F] flex items-center justify-center mr-2 shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 bg-[#ADB5BD] rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-[#ADB5BD] rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-[#ADB5BD] rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}

        {showHumanPrompt && (
          <div className="flex justify-center animate-in fade-in duration-200">
            <div className="bg-[#FFF0F2] border border-[#E85A71]/20 rounded-xl px-4 py-3 flex items-center gap-2 max-w-[90%]">
              <div className="w-2 h-2 bg-[#E85A71] rounded-full animate-pulse shrink-0" />
              <span className="text-[13px] text-[#E85A71]">
                人工客服功能即将推出
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-3 bg-white border-t border-[#E9ECEF]">
        <p className="text-xs text-gray-400 mb-2">Quick questions / 快捷问题:</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.en.map((q) => (
            <button
              key={q}
              onClick={() => handleQuickQuestion(q)}
              className="text-[12px] bg-gray-100 border-0 text-gray-600 px-3 py-1.5 rounded-full hover:bg-[#FFF0F2] hover:text-[#E85A71] transition-colors duration-150"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-[#E9ECEF] shrink-0">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask anything about your trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 h-11 bg-gray-100 border-0 rounded-full px-4 text-sm focus-visible:ring-[#E85A71] focus-visible:ring-2"
          />
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="h-11 w-11 rounded-full bg-[#E85A71] hover:bg-[#C94A5F] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            size="icon"
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
        <p className="text-[11px] text-[#ADB5BD] text-center mt-2">
          Beta version • support@tiaohai.global
        </p>
      </div>
    </div>
  )
}