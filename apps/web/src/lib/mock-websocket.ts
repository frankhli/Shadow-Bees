/**
 * 模拟 WebSocket 功能
 * 纯前端实现，无需后端服务器
 * 
 * 功能：
 * - 模拟实时消息推送
 * - 跨标签页通信（使用 localStorage）
 * - 消息持久化
 */

export interface Message {
  id: string
  type: 'order' | 'review' | 'system' | 'chat'
  title: string
  content: string
  timestamp: number
  read: boolean
  sender?: string
  avatar?: string
}

class MockWebSocket extends EventTarget {
  private messageInterval: NodeJS.Timeout | null = null
  private connected = false
  private messageListeners: ((msg: Message) => void)[] = []

  connect() {
    this.connected = true
    console.log('[MockWebSocket] Connected')
    
    // 启动模拟消息推送
    this.startMockMessages()
    
    // 监听其他标签页的消息
    window.addEventListener('storage', this.handleStorageEvent)
    
    return this
  }

  disconnect() {
    this.connected = false
    if (this.messageInterval) {
      clearInterval(this.messageInterval)
    }
    window.removeEventListener('storage', this.handleStorageEvent)
    console.log('[MockWebSocket] Disconnected')
  }

  private handleStorageEvent = (e: StorageEvent) => {
    if (e.key === 'broadcast_message' && e.newValue) {
      const message = JSON.parse(e.newValue)
      this.dispatchMessage(message)
    }
  }

  private startMockMessages() {
    // 每30-60秒随机发送一条模拟消息
    const sendRandomMessage = () => {
      if (!this.connected) return
      
      const mockMessages: Omit<Message, 'id' | 'timestamp' | 'read'>[] = [
        {
          type: 'order',
          title: '新订单提醒',
          content: '收到来自 John Smith 的新预订',
        },
        {
          type: 'review',
          title: '新评价',
          content: '您收到一条五星好评',
        },
        {
          type: 'system',
          title: '系统通知',
          content: '您的账户余额已更新',
        },
      ]
      
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)]
      const message: Message = {
        ...randomMsg,
        id: `msg_${Date.now()}`,
        timestamp: Date.now(),
        read: false,
      }
      
      this.receiveMessage(message)
      
      // 随机间隔 30-60 秒
      const nextInterval = 30000 + Math.random() * 30000
      this.messageInterval = setTimeout(sendRandomMessage, nextInterval)
    }
    
    // 首次延迟5秒后发送
    setTimeout(sendRandomMessage, 5000)
  }

  // 发送消息（广播到其他标签页）
  send(message: Partial<Message>) {
    const fullMessage: Message = {
      id: `msg_${Date.now()}`,
      type: 'chat',
      title: '',
      content: '',
      timestamp: Date.now(),
      read: false,
      ...message,
    }
    
    // 使用 localStorage 广播消息
    localStorage.setItem('broadcast_message', JSON.stringify(fullMessage))
    localStorage.removeItem('broadcast_message')
    
    // 同时触发本地事件
    this.dispatchMessage(fullMessage)
    
    return fullMessage
  }

  // 接收消息
  private receiveMessage(message: Message) {
    // 保存到消息历史
    const history = this.getMessageHistory()
    history.unshift(message)
    localStorage.setItem('message_history', JSON.stringify(history.slice(0, 100)))
    
    this.dispatchMessage(message)
  }

  private dispatchMessage(message: Message) {
    this.messageListeners.forEach(listener => listener(message))
    this.dispatchEvent(new CustomEvent('message', { detail: message }))
  }

  onMessage(callback: (msg: Message) => void) {
    this.messageListeners.push(callback)
    return () => {
      const index = this.messageListeners.indexOf(callback)
      if (index > -1) this.messageListeners.splice(index, 1)
    }
  }

  getMessageHistory(): Message[] {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('message_history')
    return saved ? JSON.parse(saved) : []
  }

  markAsRead(messageId: string) {
    const history = this.getMessageHistory()
    const updated = history.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    )
    localStorage.setItem('message_history', JSON.stringify(updated))
  }

  getUnreadCount(): number {
    return this.getMessageHistory().filter(msg => !msg.read).length
  }
}

// 单例模式
let instance: MockWebSocket | null = null

export function getMockWebSocket(): MockWebSocket {
  if (!instance) {
    instance = new MockWebSocket()
  }
  return instance
}

// 初始化连接
export function initMockWebSocket(): MockWebSocket {
  return getMockWebSocket().connect()
}

// 断开连接
export function disconnectMockWebSocket() {
  if (instance) {
    instance.disconnect()
    instance = null
  }
}
