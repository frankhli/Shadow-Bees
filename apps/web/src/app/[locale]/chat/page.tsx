'use client'

import { useEffect, useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Send, 
  MoreVertical, 
  Phone, 
  Video,
  Check,
  CheckCheck,
  Search,
  Plus
} from 'lucide-react'

interface Conversation {
  id: string
  type: 'direct' | 'group' | 'event' | 'room_share'
  title?: string
  participants: {
    id: string
    name: string
    role?: string
  }[]
  lastMessage?: {
    content: string
    createdAt: string
    senderId: string
  }
  unreadCount: number
}

interface Message {
  id: string
  senderId: string
  content: string
  contentType: string
  createdAt: string
  isDeleted: boolean
}

interface User {
  id: string
  name: string
}

interface MeResponse {
  user: User
}

export default function ChatPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('chat')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser) {
      fetchConversations()
    }
  }, [currentUser])

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/me`)
      const data: MeResponse = await res.json()
      setCurrentUser(data.user)
    } catch (error) {
      console.error('Failed to fetch current user:', error)
    }
  }

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id)
      // Mark as read
      markAsRead(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchConversations = async () => {
    if (!currentUser) return
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/chat/conversations?userId=${currentUser.id}`)
      const data = await res.json()
      setConversations(data)
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
      setConversations([])
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/chat/conversations/${conversationId}/messages`)
      const data = await res.json()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      setMessages([])
    }
  }

  const markAsRead = async (conversationId: string) => {
    if (!currentUser) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/chat/conversations/${conversationId}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      })
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !currentUser) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          senderId: currentUser.id,
          content: newMessage,
          contentType: 'text'
        })
      })

      if (res.ok) {
        setNewMessage('')
        fetchMessages(selectedConversation.id)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getConversationName = (conv: Conversation) => {
    if (conv.title) return conv.title
    const otherParticipant = conv.participants.find(p => p.id !== currentUser?.id)
    return otherParticipant?.name || 'Unknown'
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 1000 * 60 * 60 * 24 && now.getDate() === date.getDate()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    if (diff < 1000 * 60 * 60 * 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short' })
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const filteredConversations = conversations.filter(conv =>
    getConversationName(conv).toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
          <span className="font-bold text-lg hidden lg:block">Tiaohai</span>
        </Link>
        <h1 className="font-semibold">{t('title')}</h1>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button className="w-full" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              {t('newChat')}
            </Button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 ${
                  selectedConversation?.id === conv.id ? 'bg-cyan-50' : ''
                }`}
              >
                <Avatar className="flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-purple-100 text-cyan-700">
                    {getInitials(getConversationName(conv))}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">
                      {getConversationName(conv)}
                    </span>
                    {conv.lastMessage && (
                      <span className="text-xs text-gray-400">
                        {formatTime(conv.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">
                      {currentUser && conv.lastMessage?.senderId === currentUser.id && 'You: '}
                      {conv.lastMessage?.content}
                    </p>
                    {conv.unreadCount > 0 && (
                      <Badge className="bg-cyan-500 text-white text-xs px-2 py-0.5">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-purple-100 text-cyan-700 text-sm">
                    {getInitials(getConversationName(selectedConversation))}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{getConversationName(selectedConversation)}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.type === 'direct' ? t('online') : `${selectedConversation.participants.length} ${t('members')}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => {
                const isMe = currentUser ? msg.senderId === currentUser.id : false
                const showAvatar = index === 0 || messages[index - 1].senderId !== msg.senderId

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                      {showAvatar && !isMe ? (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-gray-200 text-xs">
                            {getInitials(selectedConversation.participants.find(p => p.id === msg.senderId)?.name || '?')}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-8 flex-shrink-0" />
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isMe
                            ? 'bg-cyan-500 text-white rounded-br-none'
                            : 'bg-white border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <div className={`text-xs mt-1 ${isMe ? 'text-cyan-100' : 'text-gray-400'}`}>
                          {formatTime(msg.createdAt)}
                          {isMe && (
                            <CheckCheck className="inline w-3 h-3 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={t('typeMessage')}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">{t('selectConversation')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
