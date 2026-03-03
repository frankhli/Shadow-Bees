'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import {
  LayoutDashboard,
  Calendar,
  Radar,
  Sparkles,
  MessageCircle,
  DollarSign,
  Package,
  Settings,
  Globe,
} from 'lucide-react'

// 酒店端导航 - 中文操作 + 五语同步输出
const hotelNavItems = [
  {
    id: 'overview',
    icon: LayoutDashboard,
    label: '经营概览',
    path: '/hotel',
  },
  {
    id: 'calendar',
    icon: Calendar,
    label: '房态日历',
    path: '/hotel/calendar',
  },
  {
    id: 'market',
    icon: Radar,
    label: '市场情报',
    path: '/hotel/market',
    children: [
      { label: '事件日历', path: '/hotel/market/events' },
      { label: '竞品监控', path: '/hotel/market/competitors' },
      { label: '需求预测', path: '/hotel/market/forecast' },
    ],
  },
  // AI内容：中文编辑 + 五语同步输出
  {
    id: 'ai-content',
    icon: Sparkles,
    label: 'AI内容',
    path: '/hotel/ai-content',
    children: [
      { label: 'OTA房源描述', path: '/hotel/ai-content/ota' },
      { label: '小红书种草文案', path: '/hotel/ai-content/xiaohongshu' },
      { label: '图片AI优化', path: '/hotel/ai-content/images' },
      { label: '多语言翻译管理', path: '/hotel/ai-content/translations' },
      { label: '翻译审核', path: '/hotel/ai-content/review' },
      { label: '术语库', path: '/hotel/ai-content/terms' },
    ],
  },
  // AI客服：实时翻译 + 中文处理
  {
    id: 'ai-service',
    icon: MessageCircle,
    label: 'AI客服',
    path: '/hotel/ai-service',
    children: [
      { label: '客服监控台', path: '/hotel/ai-service/dashboard' },
      { label: '多语言对话记录', path: '/hotel/ai-service/conversations' },
      { label: '人工接管工作台', path: '/hotel/ai-service/human' },
      { label: '知识库管理', path: '/hotel/ai-service/knowledge' },
    ],
  },
  // AI定价：支持汇率 + 多币种
  {
    id: 'ai-pricing',
    icon: DollarSign,
    label: 'AI定价',
    path: '/hotel/ai-pricing',
    children: [
      { label: '实时定价策略', path: '/hotel/ai-pricing/realtime' },
      { label: '汇率与多币种', path: '/hotel/ai-pricing/currency' },
      { label: '价格审批', path: '/hotel/ai-pricing/approval' },
      { label: '收益报告', path: '/hotel/ai-pricing/reports' },
    ],
  },
  {
    id: 'orders',
    icon: Package,
    label: '订单与库存',
    path: '/hotel/orders',
    children: [
      { label: '订单管理', path: '/hotel/orders/list' },
      { label: '库存同步', path: '/hotel/orders/inventory' },
      { label: '财务合规', path: '/hotel/orders/finance' },
    ],
  },

  {
    id: 'settings',
    icon: Settings,
    label: '系统设置',
    path: '/hotel/settings',
  },
]

export default function HotelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        title="酒店管理系统"
        subtitle="Hotel Dashboard · 中文操作 六语输出"
        themeColor="cyan"
        themeBg="bg-cyan-600"
        navItems={hotelNavItems}
        userName="酒店管理员"
        userRole="店长"
      />
      <main className="flex-1 overflow-auto bg-slate-950">
        {children}
      </main>
    </div>
  )
}
