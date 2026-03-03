'use client'

import { Link } from '@/navigation'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { 
  Calendar, 
  User, 
  BookOpen, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard/guide', icon: User, label: 'profile' },
  { href: '/dashboard/guide/schedule', icon: Calendar, label: 'schedule' },
  { href: '/dashboard/guide/orders', icon: BookOpen, label: 'orders' },
  { href: '/dashboard/guide/messages', icon: MessageSquare, label: 'messages' },
  { href: '/dashboard/guide/settings', icon: Settings, label: 'settings' },
]

export default function GuideDashboardLayout({ 
  children,
  params: { locale }
}: { 
  children: React.ReactNode
  params: { locale: string }
}) {
  const t = useTranslations('guideDashboard')
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex-shrink-0" />
              <span className={`font-bold text-lg transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                Tiaohai
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-cyan-50 text-cyan-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className={`transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                    {t(item.label)}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-gray-200">
            <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:hidden'}`}>
                {t('logout')}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600">导游端</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center text-sm font-medium">
              G
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
