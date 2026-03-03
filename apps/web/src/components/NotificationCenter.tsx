'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCircle, X, MessageSquare, ShoppingCart, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowButton } from './ui/GlowButton'
import { getMockWebSocket, Message, initMockWebSocket } from '@/lib/mock-websocket'
import { useToast } from '@/stores/toastStore'

export function NotificationCenter() {
  const toast = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 初始化 WebSocket
    const ws = initMockWebSocket()
    
    // 加载历史消息
    setMessages(ws.getMessageHistory())
    setUnreadCount(ws.getUnreadCount())
    
    // 监听新消息
    const unsubscribe = ws.onMessage((msg) => {
      setMessages(prev => [msg, ...prev])
      setUnreadCount(count => count + 1)
      toast.info(msg.title, msg.content)
    })
    
    return () => {
      unsubscribe()
    }
  }, [])

  const markAllAsRead = () => {
    const ws = getMockWebSocket()
    messages.forEach(msg => {
      if (!msg.read) ws.markAsRead(msg.id)
    })
    setUnreadCount(0)
    setMessages(prev => prev.map(m => ({ ...m, read: true })))
  }

  const getIcon = (type: Message['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-emerald-400" />
      case 'review':
        return <Star className="w-4 h-4 text-yellow-400" />
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-blue-400" />
      default:
        return <Bell className="w-4 h-4 text-slate-400" />
    }
  }

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <div className="relative">
      {/* 通知按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* 通知面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 bg-[#141B2D] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-medium">通知中心</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    全部已读
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">暂无通知</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {messages.slice(0, 10).map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                          !msg.read ? 'bg-white/[0.02]' : ''
                        }`}
                        onClick={() => {
                          getMockWebSocket().markAsRead(msg.id)
                          setMessages(prev => 
                            prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
                          )
                          setUnreadCount(prev => Math.max(0, prev - 1))
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">{getIcon(msg.type)}</div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${msg.read ? 'text-slate-300' : 'text-white'}`}>
                              {msg.title}
                            </p>
                            <p className="text-slate-400 text-sm truncate">{msg.content}</p>
                            <p className="text-slate-500 text-xs mt-1">{formatTime(msg.timestamp)}</p>
                          </div>
                          {!msg.read && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {messages.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <GlowButton
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    查看全部通知
                  </GlowButton>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
