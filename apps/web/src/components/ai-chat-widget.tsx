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
  ChevronLeft
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
  zh: ['144小时免签', '酒店设施', '预订流程', '取消政策', '外宾入住', '人工客服'],
  en: ['144h Visa-Free', 'Facilities', 'How to Book', 'Cancellation', 'Foreign Guests', 'Human Agent']
}

export function AIChatWidget({ hotelId, hotelName }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEscalated, setIsEscalated] = useState(false)
  const [showHumanPrompt, setShowHumanPrompt] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = `👋 Welcome to Tiaohai Global!

我是您的AI助手（Beta版本），可以帮您解答：
• 🌍 144小时过境免签政策
• 🏨 酒店设施与入住须知  
• 📋 预订流程与修改
• 💰 价格与支付方式
• 📋 取消与退款政策
• ✅ 外宾入住要求

请选择下方快捷问题或直接输入您的问题。`,
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
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Detailed rule-based responses
  const RULE_RESPONSES = {
    visa: `🌍 144-Hour Visa-Free Transit Policy / 144小时过境免签政策

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    facilities: (hotelName?: string) => `🏨 Hotel Facilities / 酒店设施${hotelName ? ` - ${hotelName}` : ''}

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    booking: `📋 Booking Information / 预订须知

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    pricing: `💰 Pricing & Payment / 价格与支付

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    cancellation: `📋 Cancellation Policy / 取消政策

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    foreigner: `✅ Foreign Guest Information / 外宾接待

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
💬 Beta version. Contact support@tiaohai.global for urgent matters.`,

    human: `👤 Transferring to Human Agent / 转接人工客服

Your request has been forwarded to our support team.

⏰ Response Time / 响应时间:
• Live chat: Usually within 5 minutes
• Email: Within 24 hours

📧 Contact / 联系方式:
• Email: support@tiaohai.global
• WeChat: tiaohai_support

⚠️ Note: This is a Beta version. Human agents are available during business hours (9:00-18:00 CST).`,

    default: `👋 Thanks for your message!

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
  }

  // Get mock response based on message content
  const getMockResponse = useCallback((message: string): { content: string; escalated?: boolean } => {
    const lowerMsg = message.toLowerCase()
    
    // Visa related
    if (lowerMsg.includes('visa') || lowerMsg.includes('签证') || lowerMsg.includes('144') || lowerMsg.includes('免签')) {
      return { content: RULE_RESPONSES.visa }
    }
    
    // Foreigner related
    if (lowerMsg.includes('foreigner') || lowerMsg.includes('外宾') || lowerMsg.includes('外国人') || lowerMsg.includes('passport')) {
      return { content: RULE_RESPONSES.foreigner }
    }
    
    // Facilities related
    if (lowerMsg.includes('elevator') || lowerMsg.includes('lift') || lowerMsg.includes('楼梯') || 
        lowerMsg.includes('toilet') || lowerMsg.includes('bathroom') || lowerMsg.includes('厕所') ||
        lowerMsg.includes('shower') || lowerMsg.includes('wifi') || lowerMsg.includes('设施') ||
        lowerMsg.includes('breakfast') || lowerMsg.includes('早餐') || lowerMsg.includes('facility')) {
      return { content: RULE_RESPONSES.facilities(hotelName) }
    }
    
    // Booking related
    if (lowerMsg.includes('book') || lowerMsg.includes('预订') || lowerMsg.includes('订房') ||
        lowerMsg.includes('check') || lowerMsg.includes('入住') || lowerMsg.includes('reservation')) {
      return { content: RULE_RESPONSES.booking }
    }
    
    // Pricing related
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('多少钱') || 
        lowerMsg.includes('价格') || lowerMsg.includes('payment') || lowerMsg.includes('支付') ||
        lowerMsg.includes('fee') || lowerMsg.includes('费用')) {
      return { content: RULE_RESPONSES.pricing }
    }
    
    // Cancellation related
    if (lowerMsg.includes('cancel') || lowerMsg.includes('refund') || lowerMsg.includes('取消') || 
        lowerMsg.includes('退款')) {
      return { content: RULE_RESPONSES.cancellation }
    }
    
    // Human agent request
    if (lowerMsg.includes('human') || lowerMsg.includes('agent') || lowerMsg.includes('人工') || 
        lowerMsg.includes('客服') || lowerMsg.includes('support') || lowerMsg.includes('help')) {
      setIsEscalated(true)
      setShowHumanPrompt(true)
      return { content: RULE_RESPONSES.human, escalated: true }
    }
    
    return { content: RULE_RESPONSES.default }
  }, [hotelName])

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
      content: t('aiChat.humanAgentConnecting'),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, escalationMessage])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#E85A71] hover:bg-[#C94A5F] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
        size="icon"
        aria-label={t('aiChat.openChat')}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-[#E9ECEF] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 -ml-2 sm:hidden"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="w-5 h-5 text-[#212529]" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#212529] text-base">
              AI Helper
            </span>
            <Badge 
              variant="secondary" 
              className="bg-[#FFF3CD] text-[#856404] text-[11px] font-semibold px-2 py-0.5 border-0 hover:bg-[#FFF3CD]"
            >
              Beta
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#E85A71] hover:bg-[#FFF0F2] text-[13px] font-medium h-8 px-2"
            onClick={handleEscalateToHuman}
          >
            <User className="w-4 h-4 mr-1" />
            Human
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hidden sm:flex"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5 text-[#6C757D]" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex animate-in fade-in slide-in-from-bottom-2 duration-200",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div className={cn(
              "max-w-[85%] sm:max-w-[80%]",
              message.role === 'user' 
                ? 'bg-[#E85A71] text-white rounded-2xl rounded-br-md' 
                : 'bg-[#F8F9FA] text-[#212529] rounded-2xl rounded-bl-md'
            )}>
              <div className="px-4 py-3 text-sm leading-relaxed">
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
            <div className="bg-[#F8F9FA] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
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
                {t('aiChat.humanAgentConnecting')}
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-3 bg-white border-t border-[#E9ECEF]">
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.en.map((q) => (
            <button
              key={q}
              onClick={() => handleQuickQuestion(q.toLowerCase())}
              className="text-[13px] bg-white border border-[#E9ECEF] text-[#6C757D] px-3 py-1.5 rounded-full hover:bg-[#FFF0F2] hover:border-[#E85A71] hover:text-[#E85A71] transition-colors duration-150"
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
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 h-11 bg-[#F8F9FA] border-[#E9ECEF] rounded-full px-4 text-sm focus-visible:ring-[#E85A71] focus-visible:ring-2 focus-visible:border-[#E85A71]"
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
