'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Shield,
  Clock,
  Plane,
  FileQuestion,
  MapPin,
  Hotel,
  Utensils,
  ChevronDown,
  ChevronUp,
  Globe
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  category?: 'visa' | 'facility' | 'location' | 'culture' | 'general'
}

interface QuickQuestion {
  id: string
  category: 'visa' | 'facility' | 'location' | 'culture'
  icon: React.ReactNode
  question: string
  translation: string
}

interface ForeignGuestAIChatProps {
  // 控制
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  
  // 自定义
  apiEndpoint?: string
  initialMessages?: Message[]
  quickQuestions?: QuickQuestion[]
  
  // 事件监听
  onMessageSend?: (message: string) => void
  onMessageReceive?: (message: string) => void
  
  // 样式
  position?: 'bottom-right' | 'bottom-left' | 'inline'
  className?: string
}

/**
 * ForeignGuestAIChat - 专为外宾设计的AI客服组件
 * 集成144小时免签政策知识库
 * 支持多语言实时翻译
 */
export function ForeignGuestAIChat({
  isOpen: controlledOpen,
  onOpenChange,
  apiEndpoint,
  initialMessages = [],
  quickQuestions: customQuestions,
  onMessageSend,
  onMessageReceive,
  position = 'bottom-right',
  className,
}: ForeignGuestAIChatProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [isOpenInternal, setIsOpenInternal] = useState(false)
  const isOpen = controlledOpen !== undefined ? controlledOpen : isOpenInternal
  const setIsOpen = (open: boolean) => {
    setIsOpenInternal(open)
    onOpenChange?.(open)
  }
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 144小时免签政策知识库
  const visaKnowledgeBase = {
    '144h': {
      en: `The 144-hour visa-free transit policy allows citizens of 53 countries to transit through designated Chinese cities without a visa for up to 144 hours (6 days).`,
      es: `La política de tránsito sin visa de 144 horas permite a ciudadanos de 53 países transitar por ciudades designadas de China sin visa por hasta 144 horas (6 días).`,
      fr: `La politique de transit sans visa de 144 heures permet aux citoyens de 53 pays de transiter par des villes chinoises désignées sans visa pendant jusqu'à 144 heures (6 jours).`,
      de: `Die 144-Stunden-Visum-freie Transitpolitik erlaubt Bürgern von 53 Ländern, für bis zu 144 Stunden (6 Tage) durch ausgewiesene chinesische Städte zu transitieren.`,
      ja: `144時間ビザなしトランジット政策により、53カ国の国民は中国の指定都市を最大144時間（6日間）ビザなしで通過できます。`,
    },
    'eligible_countries': {
      en: `Eligible countries include: USA, Canada, UK, Australia, New Zealand, Japan, South Korea, Singapore, and most EU countries (Germany, France, Italy, Spain, etc.).`,
      es: `Países elegibles incluyen: EE.UU., Canadá, Reino Unido, Australia, Nueva Zelanda, Japón, Corea del Sur, Singapur y la mayoría de países de la UE.`,
      fr: `Les pays éligibles incluent : USA, Canada, Royaume-Uni, Australie, Nouvelle-Zélande, Japon, Corée du Sud, Singapour et la plupart des pays de l'UE.`,
      de: `Berechtigte Länder umfassen: USA, Kanada, UK, Australien, Neuseeland, Japan, Südkorea, Singapur und die meisten EU-Länder.`,
      ja: `対象国には：米国、カナダ、英国、オーストラリア、ニュージーランド、日本、韓国、シンガポール、およびほとんどのEU諸国が含まれます。`,
    },
    'requirements': {
      en: `Requirements: 1) Valid passport with 3+ months validity, 2) Confirmed onward ticket to a third country, 3) Hotel booking in the transit city, 4) Complete the arrival card on the plane.`,
      es: `Requisitos: 1) Pasaporte válido con 3+ meses de validez, 2) Boleto confirmado a un tercer país, 3) Reserva de hotel en la ciudad de tránsito, 4) Completar la tarjeta de llegada.`,
      fr: `Exigences: 1) Passeport valide avec 3+ mois de validité, 2) Billet confirmé vers un troisième pays, 3) Réservation d'hôtel, 4) Remplir la fiche d'arrivée.`,
      de: `Anforderungen: 1) Gültiger Reisepass mit 3+ Monaten Gültigkeit, 2) Bestätigtes Weiterflugticket, 3) Hotelbuchung, 4) Ankunftskarte ausfüllen.`,
      ja: `必要書類：1) 残存3か月以上の有効パスポート、2) 第三国への確定航空券、3) トランジット都市のホテル予約、4) 機内で到着カード記入。`,
    },
    'cities': {
      en: `Major cities offering 144h visa-free: Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu, Xi'an, Hangzhou, Nanjing, and more. You can move freely within the province/region.`,
      es: `Principales ciudades: Beijing, Shanghái, Cantón, Shenzhen, Chengdu, Xi'an, Hangzhou, Nanjing. Puede moverse libremente dentro de la provincia.`,
      fr: `Principales villes: Pékin, Shanghai, Canton, Shenzhen, Chengdu, Xi'an, Hangzhou, Nankin. Vous pouvez circuler librement dans la province.`,
      de: `Hauptstädte: Peking, Shanghai, Guangzhou, Shenzhen, Chengdu, Xi'an, Hangzhou, Nanjing. Sie können sich frei in der Provinz bewegen.`,
      ja: `主要都市：北京、上海、広州、深セン、成都、西安、杭州、南京など。州/地域内を自由に移動できます。`,
    },
    'calculator': {
      en: `To calculate: Your allowed stay = Arrival date + 144 hours. For example, arriving March 1st at 10:00 AM, you must depart by March 7th at 10:00 AM.`,
      es: `Cálculo: Fecha de llegada + 144 horas. Ejemplo: llegando el 1 de marzo a las 10:00, debe partir antes del 7 de marzo a las 10:00.`,
      fr: `Calcul: Date d'arrivée + 144 heures. Exemple: arrivée le 1er mars à 10h00, départ avant le 7 mars à 10h00.`,
      de: `Berechnung: Ankunftsdatum + 144 Stunden. Beispiel: Ankunft am 1. März um 10:00, Abflug vor dem 7. März um 10:00.`,
      ja: `計算方法：到着日時 + 144時間。例：3月1日10:00到着の場合、3月7日10:00までに出国が必要。`,
    },
  }

  // 预设快捷问题
  const defaultQuickQuestions: QuickQuestion[] = [
    {
      id: 'visa-1',
      category: 'visa',
      icon: <Clock className="w-4 h-4" />,
      question: 'What is the 144-hour visa-free policy?',
      translation: t('aiChat.questions.144hPolicy') || '144小时免签政策是什么？',
    },
    {
      id: 'visa-2',
      category: 'visa',
      icon: <Shield className="w-4 h-4" />,
      question: 'Do I qualify for visa-free transit?',
      translation: t('aiChat.questions.qualify') || '我有资格免签吗？',
    },
    {
      id: 'visa-3',
      category: 'visa',
      icon: <FileQuestion className="w-4 h-4" />,
      question: 'What documents do I need?',
      translation: t('aiChat.questions.documents') || '需要什么文件？',
    },
    {
      id: 'location-1',
      category: 'location',
      icon: <MapPin className="w-4 h-4" />,
      question: 'Which cities offer 144h visa-free?',
      translation: t('aiChat.questions.cities') || '哪些城市提供144小时免签？',
    },
    {
      id: 'facility-1',
      category: 'facility',
      icon: <Hotel className="w-4 h-4" />,
      question: 'Does this hotel have Western toilet?',
      translation: t('aiChat.questions.westernToilet') || '这家酒店有西式马桶吗？',
    },
    {
      id: 'culture-1',
      category: 'culture',
      icon: <Utensils className="w-4 h-4" />,
      question: 'What should I know about hutongs?',
      translation: t('aiChat.questions.hutongs') || '关于胡同应该知道什么？',
    },
  ]

  // 使用自定义或默认快捷问题
  const quickQuestions = customQuestions || defaultQuickQuestions

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 打开时聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // 生成回复
  const generateResponse = useCallback((userMessage: string): { content: string; category: string } => {
    const lowerMsg = userMessage.toLowerCase()
    const lang = locale as keyof typeof visaKnowledgeBase['144h'] || 'en'

    // 144h政策相关问题
    if (lowerMsg.includes('144') || lowerMsg.includes('visa') || lowerMsg.includes('free') || lowerMsg.includes('transit')) {
      if (lowerMsg.includes('qualify') || lowerMsg.includes('eligible') || lowerMsg.includes('country')) {
        return {
          content: visaKnowledgeBase.eligible_countries[lang] || visaKnowledgeBase.eligible_countries.en,
          category: 'visa'
        }
      }
      if (lowerMsg.includes('document') || lowerMsg.includes('need') || lowerMsg.includes('requirement')) {
        return {
          content: visaKnowledgeBase.requirements[lang] || visaKnowledgeBase.requirements.en,
          category: 'visa'
        }
      }
      if (lowerMsg.includes('city') || lowerMsg.includes('where') || lowerMsg.includes('beijing') || lowerMsg.includes('shanghai')) {
        return {
          content: visaKnowledgeBase.cities[lang] || visaKnowledgeBase.cities.en,
          category: 'visa'
        }
      }
      if (lowerMsg.includes('calculate') || lowerMsg.includes('time') || lowerMsg.includes('hour') || lowerMsg.includes('when')) {
        return {
          content: visaKnowledgeBase.calculator[lang] || visaKnowledgeBase.calculator.en,
          category: 'visa'
        }
      }
      return {
        content: visaKnowledgeBase['144h'][lang] || visaKnowledgeBase['144h'].en,
        category: 'visa'
      }
    }

    // 设施相关问题
    if (lowerMsg.includes('toilet') || lowerMsg.includes('bathroom') || lowerMsg.includes('elevator') || lowerMsg.includes('lift') || lowerMsg.includes('wifi')) {
      if (lowerMsg.includes('western') || lowerMsg.includes('toilet')) {
        return {
          content: t('aiChat.responses.westernToilet') || 'Most hotels we list have Western-style toilets. You can filter by "Western Toilet" in search to ensure your stay has this facility.',
          category: 'facility'
        }
      }
      if (lowerMsg.includes('elevator') || lowerMsg.includes('lift')) {
        return {
          content: t('aiChat.responses.elevator') || 'Many traditional courtyard hotels (hutongs) don\'t have elevators due to historic building restrictions. We clearly mark this on each listing.',
          category: 'facility'
        }
      }
      if (lowerMsg.includes('wifi') || lowerMsg.includes('internet')) {
        return {
          content: t('aiChat.responses.wifi') || 'All hotels listed offer free WiFi. Speed may vary in traditional buildings with thick walls.',
          category: 'facility'
        }
      }
    }

    // 位置相关问题
    if (lowerMsg.includes('subway') || lowerMsg.includes('metro') || lowerMsg.includes('transport') || lowerMsg.includes('airport')) {
      return {
        content: t('aiChat.responses.transport') || 'Most hotels are within 10 minutes walk of subway stations. We provide detailed directions in Chinese and English for taxi drivers.',
        category: 'location'
      }
    }

    // 文化相关问题
    if (lowerMsg.includes('hutong') || lowerMsg.includes('culture') || lowerMsg.includes('traditional') || lowerMsg.includes('food')) {
      if (lowerMsg.includes('hutong')) {
        return {
          content: t('aiChat.responses.hutong') || 'Hutongs are traditional Beijing alleyways with courtyard houses. They offer authentic local experience but may have narrow lanes and stairs instead of elevators.',
          category: 'culture'
        }
      }
      if (lowerMsg.includes('food') || lowerMsg.includes('eat')) {
        return {
          content: t('aiChat.responses.food') || 'Chinese breakfast is typically included: congee, baozi, youtiao. Let us know if you have dietary restrictions - we can advise hotels in advance.',
          category: 'culture'
        }
      }
    }

    // 默认回复
    return {
      content: t('aiChat.responses.default') || `Thank you for your question! I'm here to help with:

• 144-hour visa-free transit policy
• Hotel facilities (Western toilet, elevator, WiFi)
• Transportation and locations
• Cultural tips for your stay

Please ask me anything about these topics, or contact our human support at support@tiaohai.com for complex inquiries.`,
      category: 'general'
    }
  }, [locale, t])

  // 发送消息
  const handleSend = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInputMessage('')
    setIsLoading(true)
    setShowQuickQuestions(false)

    // 触发消息发送事件
    onMessageSend?.(userMsg.content)

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(userMsg.content)
    
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      category: response.category as any,
    }

    setMessages(prev => [...prev, assistantMsg])
    setIsLoading(false)

    // 触发消息接收事件
    onMessageReceive?.(assistantMsg.content)
  }, [inputMessage, isLoading, generateResponse, onMessageSend, onMessageReceive])

  // 点击快捷问题
  const handleQuickQuestion = (question: QuickQuestion) => {
    setInputMessage(question.question)
    // 自动发送
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  // 键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'inline': 'relative',
    }

    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`${positionClasses[position]} z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00F0FF] to-[#00D0DD] text-[#0A0E1A] rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 ${className}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">{t('aiChat.button') || 'Ask AI'}</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </button>
    )
  }

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'inline': 'relative',
  }

  return (
    <div className={`${positionClasses[position]} z-50 w-96 max-w-[calc(100vw-2rem)] ${className}`}>
      {/* Chat Window */}
      <div className="bg-[#141B2D] rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#141B2D]/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{t('aiChat.title') || 'AI Concierge'}</h3>
                <p className="text-xs text-white/80">{t('aiChat.subtitle') || '144h Visa & Travel Help'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-[#141B2D]/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#1E2746]">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-violet-600" />
              </div>
              <h4 className="font-semibold text-gray-200 mb-2">
                {t('aiChat.welcome.title') || 'Welcome to Tiaohai!'}
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                {t('aiChat.welcome.description') || 'I can help you with 144-hour visa-free transit, hotel facilities, and travel tips for China.'}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-violet-600">
                <Shield className="w-4 h-4" />
                <span>144h Visa Support Available</span>
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-[#00F0FF] text-white' 
                  : 'bg-violet-100 text-violet-600'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                message.role === 'user'
                  ? 'bg-[#00F0FF] text-white rounded-br-none'
                  : 'bg-[#141B2D] border border-gray-200 text-gray-200 rounded-bl-none shadow-sm'
              }`}>
                {message.category === 'visa' && message.role === 'assistant' && (
                  <div className="flex items-center gap-1 mb-1 text-violet-600 text-xs font-medium">
                    <Shield className="w-3 h-3" />
                    <span>144h Visa Info</span>
                  </div>
                )}
                <div className="whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-[#00F0FF]' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#141B2D] border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-violet-500" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {showQuickQuestions && messages.length === 0 && (
          <div className="border-t border-gray-200 p-3 bg-[#141B2D]">
            <button
              onClick={() => setShowQuickQuestions(!showQuickQuestions)}
              className="flex items-center justify-between w-full text-sm text-gray-400 mb-2 hover:text-gray-200"
            >
              <span className="font-medium">{t('aiChat.quickQuestions') || 'Quick Questions'}</span>
              {showQuickQuestions ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q)}
                  className="flex items-center gap-2 px-3 py-2 text-left text-sm bg-[#1E2746] hover:bg-violet-50 rounded-lg transition-colors group"
                >
                  <span className="text-gray-400 group-hover:text-violet-500">{q.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-300 truncate">{q.question}</div>
                    <div className="text-xs text-gray-400 truncate">{q.translation}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-3 bg-[#141B2D]">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('aiChat.inputPlaceholder') || 'Ask about 144h visa, hotels...'}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-violet-500 text-white rounded-full hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            {t('aiChat.poweredBy') || 'AI Assistant • 144h Visa Expert'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForeignGuestAIChat
