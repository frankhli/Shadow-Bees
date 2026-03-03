import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Bot,
  User,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCircle,
} from 'lucide-react'

interface ChatSession {
  id: string
  guestName: string
  lastMessage: string
  unread: number
  status: 'ai' | 'human' | 'resolved'
  updatedAt: string
}

const mockSessions: ChatSession[] = [
  {
    id: '1',
    guestName: 'John Smith',
    lastMessage: '请问有电梯吗？我带了很大的行李箱。',
    unread: 1,
    status: 'ai',
    updatedAt: '2分钟前',
  },
  {
    id: '2',
    guestName: 'Emma Wilson',
    lastMessage: '附近有什么好吃的餐厅推荐吗？',
    unread: 0,
    status: 'ai',
    updatedAt: '15分钟前',
  },
  {
    id: '3',
    guestName: 'Michael Brown',
    lastMessage: '我已经到门口了，怎么进去？',
    unread: 2,
    status: 'human',
    updatedAt: '1小时前',
  },
]

const mockMessages = [
  { id: 1, role: 'user', content: '请问有电梯吗？', time: '14:30' },
  { id: 2, role: 'ai', content: '您好！我们酒店没有电梯，但是提供免费的行李搬运服务。如果您需要，我们可以安排工作人员帮您把行李搬到房间。', time: '14:31' },
  { id: 3, role: 'user', content: '那太好了，我带了两个大箱子。', time: '14:32' },
]

export function AIChat() {
  const [activeSession, setActiveSession] = useState<string>('1')
  const [input, setInput] = useState('')
  const [isHumanMode, setIsHumanMode] = useState(false)

  return (
    <div className="space-y-6 h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">AI 客服中心</h2>
          <p className="text-gray-400 text-sm mt-1">查看 AI 与客人的对话，必要时接管回复</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">当前模式：</span>
          <button
            onClick={() => setIsHumanMode(!isHumanMode)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${isHumanMode 
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' 
                : 'bg-dark-700 text-gray-400 border border-dark-600'
              }
            `}
          >
            {isHumanMode ? <UserCircle size={16} /> : <Bot size={16} />}
            {isHumanMode ? '人工模式' : 'AI 模式'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* 会话列表 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
          <div className="p-4 border-b border-dark-600">
            <h3 className="font-semibold text-white">会话列表</h3>
            <div className="flex gap-2 mt-2">
              <span className="px-2 py-0.5 bg-neon-cyan/20 text-neon-cyan text-xs rounded-full">
                进行中 3
              </span>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                需人工 1
              </span>
            </div>
          </div>
          <div className="divide-y divide-dark-600 overflow-y-auto max-h-[calc(100%-80px)]">
            {mockSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={`
                  w-full p-4 text-left transition-colors
                  ${activeSession === session.id ? 'bg-dark-700' : 'hover:bg-dark-700/50'}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                      <span className="text-white font-medium">{session.guestName[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{session.guestName}</p>
                      <p className="text-sm text-gray-400 truncate max-w-[180px]">{session.lastMessage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{session.updatedAt}</p>
                    {session.unread > 0 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-neon-cyan text-dark-900 text-xs rounded-full font-medium">
                        {session.unread}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {session.status === 'ai' && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <Bot size={12} /> AI处理中
                    </span>
                  )}
                  {session.status === 'human' && (
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <AlertCircle size={12} /> 需人工
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 聊天区域 */}
        <div className="lg:col-span-2 bg-dark-800 rounded-xl border border-dark-600 flex flex-col">
          {/* 头部 */}
          <div className="p-4 border-b border-dark-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-white font-medium">J</span>
              </div>
              <div>
                <p className="font-medium text-white">John Smith</p>
                <p className="text-xs text-gray-400">订单: TH202403150001</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors">
                标记需人工
              </button>
              <button className="px-3 py-1.5 text-sm bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors">
                查看订单
              </button>
            </div>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-neon-purple' : 'bg-dark-700'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-neon-cyan text-dark-900' 
                      : 'bg-dark-700 text-white'
                  }`}>
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-dark-900/60' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 输入框 */}
          <div className="p-4 border-t border-dark-600">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isHumanMode ? "输入回复..." : "AI正在处理中，点击接管以回复..."}
                disabled={!isHumanMode}
                className="flex-1 px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none disabled:opacity-50"
              />
              <button
                disabled={!isHumanMode || !input.trim()}
                className="p-2 bg-neon-cyan text-dark-900 rounded-lg hover:bg-neon-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
            {!isHumanMode && (
              <p className="text-xs text-gray-500 mt-2">
                AI 正在自动回复客人问题，如需要人工介入请点击右上角"人工模式"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
