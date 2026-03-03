'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Sparkles,
  MessageCircle,
  DollarSign,
  Globe,
  Star,
  Wallet,
  Settings,
} from 'lucide-react'

// 导游端导航 - 中文操作 + 服务外国游客
const guideNavItems = [
  {
    id: 'overview',
    icon: LayoutDashboard,
    label: '工作台',
    path: '/guide',
  },
  // AI内容：中文编辑 + 五语介绍（合并语言能力）
  {
    id: 'ai-content',
    icon: Sparkles,
    label: 'AI内容',
    path: '/guide/ai-profile',
    children: [
      { label: '中文介绍编辑', path: '/guide/ai-profile/bio' },
      { label: '五语介绍管理', path: '/guide/ai-profile/translations' },
      { label: '路线文案生成', path: '/guide/ai-profile/routes' },
      { label: '语言能力认证', path: '/guide/languages' },
    ],
  },
  // AI客服：实时翻译
  {
    id: 'ai-service',
    icon: MessageCircle,
    label: 'AI客服',
    path: '/guide/ai-service',
    children: [
      { label: '实时翻译对话', path: '/guide/ai-service/chat' },
      { label: '常用语库', path: '/guide/ai-service/phrases' },
      { label: '对话记录', path: '/guide/ai-service/history' },
    ],
  },
  // AI定价：多币种
  {
    id: 'ai-pricing',
    icon: DollarSign,
    label: 'AI定价',
    path: '/guide/ai-pricing',
    children: [
      { label: '智能报价', path: '/guide/ai-pricing/quote' },
      { label: '多币种定价', path: '/guide/ai-pricing/currency' },
      { label: '打包服务', path: '/guide/ai-pricing/bundle' },
    ],
  },
  {
    id: 'schedule',
    icon: Calendar,
    label: '排班管理',
    path: '/guide/schedule',
    children: [
      { label: '我的日程', path: '/guide/schedule/calendar' },
      { label: '可预约时段', path: '/guide/schedule/availability' },
    ],
  },
  {
    id: 'orders',
    icon: MapPin,
    label: '服务订单',
    path: '/guide/orders',
    children: [
      { label: '待服务', path: '/guide/orders/pending' },
      { label: '进行中', path: '/guide/orders/active' },
      { label: '已完成', path: '/guide/orders/completed' },
    ],
  },

  {
    id: 'reviews',
    icon: Star,
    label: '客户评价',
    path: '/guide/reviews',
  },
  {
    id: 'earnings',
    icon: Wallet,
    label: '收入明细',
    path: '/guide/earnings',
  },

  {
    id: 'settings',
    icon: Settings,
    label: '个人设置',
    path: '/guide/settings',
  },
]

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        title="导游工作台"
        subtitle="Guide Dashboard · 中文服务 六语沟通"
        themeColor="green"
        themeBg="bg-green-600"
        navItems={guideNavItems}
        userName="张导游"
        userRole="金牌导游"
      />
      <main className="flex-1 overflow-auto bg-slate-950">
        {children}
      </main>
    </div>
  )
}
