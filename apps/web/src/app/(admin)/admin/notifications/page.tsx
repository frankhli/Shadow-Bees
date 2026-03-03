'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { 
  Send, 
  Users, 
  Building2,
  MapPin,
  Bell,
  Clock,
  Eye,
  Trash2,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const THEME_COLOR = '#A855F7'

interface Notification {
  id: string
  title: string
  content: string
  target: 'all' | 'hotels' | 'guides' | 'venues'
  sentAt: string
  readCount: number
  totalCount: number
}

const targetOptions = [
  { id: 'all' as const, label: '全部用户', icon: Users, count: 1256 },
  { id: 'hotels' as const, label: '酒店商家', icon: Building2, count: 156 },
  { id: 'guides' as const, label: '导游', icon: Users, count: 234 },
  { id: 'venues' as const, label: '体验店', icon: MapPin, count: 89 },
]

// 从localStorage加载历史
const loadHistory = (): Notification[] => {
  if (typeof window === 'undefined') return []
  const saved = localStorage.getItem('admin_notifications')
  if (saved) {
    return JSON.parse(saved)
  }
  // 默认历史
  return [
    {
      id: 'NOT-001',
      title: '系统维护通知',
      content: '平台将于今晚10点进行系统维护，预计持续2小时',
      target: 'all',
      sentAt: '2024-03-15 09:00',
      readCount: 245,
      totalCount: 1256,
    },
    {
      id: 'NOT-002',
      title: '新功能上线：AI定价助手',
      content: '我们推出了全新的AI定价助手功能，帮助您更好地定价',
      target: 'hotels',
      sentAt: '2024-03-14 10:30',
      readCount: 86,
      totalCount: 156,
    },
    {
      id: 'NOT-003',
      title: '导游服务规范更新',
      content: '请所有导游查看最新服务规范，确保服务质量',
      target: 'guides',
      sentAt: '2024-03-13 14:00',
      readCount: 72,
      totalCount: 234,
    },
  ]
}

export default function AdminNotificationsPage() {
  const toast = useToast()
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'hotels' | 'guides' | 'venues'>('all')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)
  const [history, setHistory] = useState<Notification[]>(loadHistory)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 保存到localStorage
  const saveHistory = (newHistory: Notification[]) => {
    localStorage.setItem('admin_notifications', JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      toast.warning('请填写完整信息')
      return
    }

    setSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const targetOption = targetOptions.find(o => o.id === selectedTarget)
      const newNotification: Notification = {
        id: `NOT-${Date.now()}`,
        title,
        content,
        target: selectedTarget,
        sentAt: new Date().toLocaleString('zh-CN'),
        readCount: 0,
        totalCount: targetOption?.count || 0,
      }

      const newHistory = [newNotification, ...history]
      saveHistory(newHistory)

      toast.success('消息发送成功', `已向${targetOption?.label}发送通知`)
      setTitle('')
      setContent('')
    } catch (error) {
      toast.error('发送失败', '请稍后重试')
    } finally {
      setSending(false)
    }
  }

  const handleDelete = (id: string) => {
    const newHistory = history.filter(n => n.id !== id)
    saveHistory(newHistory)
    toast.success('已删除')
  }

  const getTargetLabel = (target: string) => {
    const option = targetOptions.find(o => o.id === target)
    return option?.label || target
  }

  const getTargetIcon = (target: string) => {
    const option = targetOptions.find(o => o.id === target)
    return option?.icon || Users
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <PageHeader
          title="消息推送"
          description="向平台用户发送通知消息"
        />
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 发送消息 */}
        <FadeIn delay={0.1}>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Send className="w-5 h-5" style={{ color: THEME_COLOR }} />
              发送消息
            </h2>

            {/* 目标用户 */}
            <div className="space-y-3 mb-6">
              <label className="text-sm text-slate-400">目标用户</label>
              <div className="grid grid-cols-2 gap-2">
                {targetOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedTarget(option.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                        selectedTarget === option.id
                          ? 'bg-purple-500/20 border border-purple-500/50 text-white'
                          : 'bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{option.label}</span>
                      <span className="text-xs ml-auto opacity-60">{option.count}人</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 消息标题 */}
            <div className="space-y-2 mb-4">
              <label className="text-sm text-slate-400">消息标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="输入消息标题"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-white/20"
              />
            </div>

            {/* 消息内容 */}
            <div className="space-y-2 mb-6">
              <label className="text-sm text-slate-400">消息内容</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="输入消息内容"
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>

            {/* 发送按钮 */}
            <GlowButton 
              color={THEME_COLOR}
              className="w-full"
              onClick={handleSend}
              disabled={sending || !title.trim() || !content.trim()}
              icon={<Send className="w-4 h-4" />}
            >
              {sending ? '发送中...' : '发送消息'}
            </GlowButton>
          </GlassCard>
        </FadeIn>

        {/* 发送历史 */}
        <FadeIn delay={0.2}>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: THEME_COLOR }} />
              发送历史
              <span className="text-sm font-normal text-slate-500">({history.length})</span>
            </h2>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {history.map((notification, index) => {
                  const TargetIcon = getTargetIcon(notification.target)
                  const readRate = Math.round((notification.readCount / notification.totalCount) * 100)
                  
                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TargetIcon className="w-4 h-4 text-slate-400" />
                          <h3 className="font-medium text-white">{notification.title}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge className="bg-slate-500/20 text-slate-400 text-xs">
                            {getTargetLabel(notification.target)}
                          </Badge>
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3 text-slate-500 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{notification.content}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.sentAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {notification.readCount}/{notification.totalCount} ({readRate}%)
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedNotification(notification)
                            setShowDetailDialog(true)
                          }}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          查看详情
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {history.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-white text-lg">暂无历史记录</p>
                  <p className="text-slate-500">发送的消息将显示在这里</p>
                </div>
              )}
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>消息详情</DialogTitle>
            <DialogDescription className="text-slate-400">
              查看消息发送详情
            </DialogDescription>
          </DialogHeader>
          {selectedNotification && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">标题</p>
                <p className="text-white font-medium">{selectedNotification.title}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-slate-400 text-sm">内容</p>
                <p className="text-white">{selectedNotification.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">目标用户</p>
                  <p className="text-white">{getTargetLabel(selectedNotification.target)}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-slate-400 text-xs">发送时间</p>
                  <p className="text-white">{selectedNotification.sentAt}</p>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-400 text-sm">阅读情况</p>
                  <span className="text-emerald-400 text-sm">
                    {Math.round((selectedNotification.readCount / selectedNotification.totalCount) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedNotification.readCount / selectedNotification.totalCount) * 100}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
                <p className="text-slate-500 text-xs mt-2">
                  {selectedNotification.readCount} / {selectedNotification.totalCount} 人已读
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
