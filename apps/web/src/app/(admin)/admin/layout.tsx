'use client'

import { ReactNode } from 'react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCircle,
  MapPin,
  Shield,
  BarChart3,
  Sparkles,
  Globe,
  DollarSign,
  Settings,
  Bell,
} from 'lucide-react'

// 管理端导航 - 全局监管 + 多语言内容审核
const adminNavItems = [
  {
    id: 'overview',
    icon: LayoutDashboard,
    label: '平台概览',
    path: '/admin',
  },
  {
    id: 'users',
    icon: UserCircle,
    label: '用户管理',
    path: '/admin/users',
  },
  {
    id: 'hotels',
    icon: Building2,
    label: '酒店管理',
    path: '/admin/hotels',
    children: [
      { label: '酒店列表', path: '/admin/hotels/list' },
      { label: '入驻审核', path: '/admin/hotels/audit' },
      { label: '涉外资质', path: '/admin/hotels/foreign-license' },
    ],
  },
  {
    id: 'guides',
    icon: Users,
    label: '导游管理',
    path: '/admin/guides',
    children: [
      { label: '导游列表', path: '/admin/guides/list' },
      { label: '认证审核', path: '/admin/guides/audit' },
    ],
  },
  {
    id: 'venues',
    icon: MapPin,
    label: '体验店管理',
    path: '/admin/venues',
  },
  // 多语言内容监管中心
  {
    id: 'languages',
    icon: Globe,
    label: '多语言内容监管',
    path: '/admin/languages',
    children: [
      { label: '五语内容审核', path: '/admin/languages/review' },
      { label: '翻译质量检测', path: '/admin/languages/quality' },
      { label: '文化适配审核', path: '/admin/languages/cultural' },
      { label: '术语标准化', path: '/admin/languages/terms' },
    ],
  },
  // AI全局监管
  {
    id: 'ai-center',
    icon: Sparkles,
    label: 'AI监管中心',
    path: '/admin/ai-center',
    children: [
      { label: '内容生成审核', path: '/admin/ai-center/content' },
      { label: '客服对话质检', path: '/admin/ai-center/service' },
      { label: '实时翻译监控', path: '/admin/ai-center/translation' },
      { label: 'AI训练数据', path: '/admin/ai-center/training' },
    ],
  },
  {
    id: 'finance',
    icon: DollarSign,
    label: '财务管理',
    path: '/admin/finance',
    children: [
      { label: '佣金结算', path: '/admin/finance/commission' },
      { label: '退款审核', path: '/admin/finance/refunds' },
      { label: '多币种对账', path: '/admin/finance/currency' },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: '数据分析',
    path: '/admin/analytics',
  },
  {
    id: 'audit',
    icon: Shield,
    label: '审核中心',
    path: '/admin/audit',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: '消息推送',
    path: '/admin/notifications',
  },
  {
    id: 'settings',
    icon: Settings,
    label: '系统设置',
    path: '/admin/settings',
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar
        title="超级管理后台"
        subtitle="Admin Dashboard · 全局监管"
        themeColor="purple"
        themeBg="bg-purple-700"
        navItems={adminNavItems}
        userName="超级管理员"
        userRole="平台运营"
      />
      <main className="flex-1 overflow-auto bg-slate-950">
        {children}
      </main>
    </div>
  )
}
