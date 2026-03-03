'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import {
  LayoutDashboard,
  PlusCircle,
  Sparkles,
  MessageCircle,
  DollarSign,
  Globe,
  Ticket,
  Users,
  BarChart3,
  Star,
  Wallet,
  Settings,
} from 'lucide-react'

// 体验店端导航 - 中文管理 + 活动多语言
const venueNavItems = [
  {
    id: 'overview',
    icon: LayoutDashboard,
    label: '店铺概览',
    path: '/venue',
  },
  // AI内容：中文编辑 + 五语活动页
  {
    id: 'ai-content',
    icon: Sparkles,
    label: 'AI内容',
    path: '/venue/ai-content',
    children: [
      { label: '中文活动编辑', path: '/venue/ai-content/editor' },
      { label: '五语活动页面', path: '/venue/ai-content/translations' },
      { label: '社交媒体文案', path: '/venue/ai-content/social' },
      { label: '翻译审核', path: '/venue/ai-content/review' },
    ],
  },
  // AI客服：活动咨询实时翻译
  {
    id: 'ai-service',
    icon: MessageCircle,
    label: 'AI客服',
    path: '/venue/ai-service',
    children: [
      { label: '实时翻译客服', path: '/venue/ai-service/chat' },
      { label: '预约咨询管理', path: '/venue/ai-service/booking' },
    ],
  },
  // AI定价：多币种支持
  {
    id: 'ai-pricing',
    icon: DollarSign,
    label: 'AI定价',
    path: '/venue/ai-pricing',
    children: [
      { label: '活动定价策略', path: '/venue/ai-pricing/activity' },
      { label: '多币种设置', path: '/venue/ai-pricing/currency' },
      { label: '早鸟与团体', path: '/venue/ai-pricing/promotions' },
    ],
  },
  {
    id: 'activities',
    icon: PlusCircle,
    label: '活动管理',
    path: '/venue/activities',
    children: [
      { label: '活动列表', path: '/venue/activities/list' },
      { label: '新建活动', path: '/venue/activities/create' },
      { label: '活动模板', path: '/venue/activities/templates' },
    ],
  },
  {
    id: 'bookings',
    icon: Ticket,
    label: '预订管理',
    path: '/venue/bookings',
    children: [
      { label: '今日预订', path: '/venue/bookings/today' },
      { label: '全部预订', path: '/venue/bookings/all' },
      { label: '退款申请', path: '/venue/bookings/refunds' },
    ],
  },
  {
    id: 'customers',
    icon: Users,
    label: '顾客管理',
    path: '/venue/customers',
  },

  {
    id: 'analytics',
    icon: BarChart3,
    label: '数据分析',
    path: '/venue/analytics',
  },
  {
    id: 'reviews',
    icon: Star,
    label: '评价管理',
    path: '/venue/reviews',
  },
  {
    id: 'earnings',
    icon: Wallet,
    label: '收入结算',
    path: '/venue/earnings',
  },
  {
    id: 'settings',
    icon: Settings,
    label: '店铺设置',
    path: '/venue/settings',
  },
]

export default function VenueLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        title="体验店管理"
        subtitle="Venue Dashboard · 中文管理 六语活动"
        themeColor="orange"
        themeBg="bg-orange-500"
        navItems={venueNavItems}
        userName="店铺管理员"
        userRole="店主"
      />
      <main className="flex-1 overflow-auto bg-slate-950">
        {children}
      </main>
    </div>
  )
}
