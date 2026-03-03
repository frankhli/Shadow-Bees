/**
 * AI 功能 Demo 模式
 * 纯前端模拟 AI 响应，无需后端服务器
 * 
 * 功能：
 * - 模拟 AI 定价建议
 * - 模拟 AI 翻译
 * - 模拟 AI 内容生成
 * - 模拟 AI 客服响应
 */

export interface AIResponse {
  content: string
  confidence: number
  suggestions?: string[]
}

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// AI 定价建议
export async function mockAIPricingSuggestion(
  currentPrice: number,
  marketData: { avgPrice: number; demand: 'high' | 'medium' | 'low' }
): Promise<AIResponse> {
  await delay(1000 + Math.random() * 1000)
  
  const suggestions: Record<string, { price: number; reason: string }> = {
    high: {
      price: Math.round(currentPrice * 1.15),
      reason: '市场需求旺盛，建议适当提价以提高收益'
    },
    medium: {
      price: currentPrice,
      reason: '市场价格稳定，建议维持当前价格'
    },
    low: {
      price: Math.round(currentPrice * 0.9),
      reason: '市场需求较低，建议降价促销吸引更多订单'
    }
  }
  
  const suggestion = suggestions[marketData.demand]
  
  return {
    content: `建议价格：¥${suggestion.price}\n\n${suggestion.reason}\n\n当前市场价：¥${marketData.avgPrice}\n您的价格：¥${currentPrice}`,
    confidence: 0.85 + Math.random() * 0.1,
    suggestions: [
      `调整至 ¥${suggestion.price}`,
      '保持当前价格',
      `设置早鸟优惠 ¥${Math.round(suggestion.price * 0.9)}`
    ]
  }
}

// AI 翻译
export async function mockAITranslate(
  text: string,
  targetLang: string
): Promise<AIResponse> {
  await delay(500 + Math.random() * 500)
  
  // 模拟翻译结果
  const translations: Record<string, Record<string, string>> = {
    'en': {
      '欢迎光临': 'Welcome',
      '谢谢': 'Thank you',
      '再见': 'Goodbye',
      '酒店': 'Hotel',
      '导游': 'Tour Guide',
      '体验': 'Experience',
    },
    'ja': {
      '欢迎光临': 'ようこそ',
      '谢谢': 'ありがとう',
      '再见': 'さようなら',
      '酒店': 'ホテル',
      '导游': 'ガイド',
      '体验': '体験',
    },
    'es': {
      '欢迎光临': 'Bienvenido',
      '谢谢': 'Gracias',
      '再见': 'Adiós',
      '酒店': 'Hotel',
      '导游': 'Guía',
      '体验': 'Experiencia',
    }
  }
  
  const langMap = translations[targetLang] || translations['en']
  const translated = langMap[text] || `[${targetLang}] ${text}`
  
  return {
    content: translated,
    confidence: 0.92,
    suggestions: Object.values(langMap).slice(0, 3)
  }
}

// AI 内容生成
export async function mockAIGenerateContent(
  type: 'title' | 'description' | 'reply',
  context: string
): Promise<AIResponse> {
  await delay(1500 + Math.random() * 1000)
  
  const templates: Record<string, string[]> = {
    title: [
      `探索${context}的奇妙之旅`,
      `${context} - 不容错过的体验`,
      `深入了解${context}的文化魅力`,
    ],
    description: [
      `欢迎来到${context}，这里将为您带来难忘的体验。我们的专业团队致力于为您提供最优质的服务。`,
      `${context}是一个充满魅力的地方。无论您是第一次来访还是再次光临，都能发现新的惊喜。`,
      `在${context}，您将体验到独特的文化氛围。我们期待为您创造美好的回忆。`,
    ],
    reply: [
      '感谢您的评价！我们会继续努力提供更好的服务。期待您的再次光临！',
      '非常感谢您的反馈！您的满意是我们最大的动力。',
      '感谢您的支持与鼓励！我们会继续改进，为您带来更好的体验。',
    ]
  }
  
  const options = templates[type] || templates.description
  const content = options[Math.floor(Math.random() * options.length)]
  
  return {
    content,
    confidence: 0.88,
    suggestions: options.filter(o => o !== content).slice(0, 2)
  }
}

// AI 客服响应
export async function mockAIChatResponse(
  userMessage: string,
  history: { role: 'user' | 'ai'; content: string }[]
): Promise<AIResponse> {
  await delay(800 + Math.random() * 700)
  
  // 简单的关键词匹配
  const responses: { keywords: string[]; response: string }[] = [
    {
      keywords: ['价格', '多少钱', '费用'],
      response: '我们的价格根据季节和房型有所不同。标准间平日价格为¥500起，周末¥600起。建议您查看具体日期的实时价格。'
    },
    {
      keywords: ['预订', '预约', '订房'],
      response: '您可以通过我们的网站或APP直接预订。如需协助，我也可以帮您转接人工客服。'
    },
    {
      keywords: ['取消', '退款'],
      response: '根据我们的取消政策，入住前24小时取消可全额退款。如需取消预订，请提供您的订单号。'
    },
    {
      keywords: ['位置', '地址', '在哪里'],
      response: '我们位于北京市中心，交通便利。具体地址：北京市东城区南锣鼓巷12号。距离地铁2号线步行5分钟。'
    },
    {
      keywords: ['设施', '服务', '包含'],
      response: '我们提供免费WiFi、早餐、健身房、停车场等设施。房间内配备空调、电视、迷你吧等。'
    }
  ]
  
  const matched = responses.find(r => 
    r.keywords.some(k => userMessage.includes(k))
  )
  
  const content = matched?.response || 
    '感谢您的咨询！我已经记录了您的问题，稍后会有专人为您解答。或者您可以拨打我们的客服热线：010-12345678'
  
  return {
    content,
    confidence: matched ? 0.9 : 0.7,
    suggestions: matched ? ['了解更多', '转人工', '预订'] : ['转人工客服', '查看常见问题']
  }
}

// AI 数据分析
export async function mockAIAnalytics(
  dataType: 'revenue' | 'orders' | 'reviews'
): Promise<AIResponse> {
  await delay(2000)
  
  const insights: Record<string, string> = {
    revenue: '根据数据分析，您的收入在过去30天增长了15%。主要增长来源是周末订单。建议增加周末促销活动以进一步提高收益。',
    orders: '您的订单转化率约为3.2%，略高于行业平均水平。美国游客的订单占比最高（35%），其次是日本（28%）。',
    reviews: '您近期收到了12条评价，平均评分4.8分。游客最常提到的是"服务热情"和"位置便利"。建议继续保持服务质量。'
  }
  
  return {
    content: insights[dataType],
    confidence: 0.85,
    suggestions: ['查看详细报表', '导出分析结果', '设置数据提醒']
  }
}

// AI 智能助手 Hook
export function useMockAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callAI = async <T extends (...args: any[]) => Promise<AIResponse>>(
    fn: T,
    ...args: Parameters<T>
  ): Promise<AIResponse | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fn(...args)
      return result
    } catch (err) {
      setError('AI 服务暂时不可用，请稍后重试')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { callAI, loading, error }
}

// React Hook
import { useState } from 'react'
