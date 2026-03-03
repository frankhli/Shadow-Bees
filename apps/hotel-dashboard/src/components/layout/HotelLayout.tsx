import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarDays,
  ShoppingCart,
  MessageSquare,
  Sparkles,
  BarChart3,
  Settings,
  Menu,
  X,
  Bell,
  ChevronRight,
  ChevronDown,
  LogOut,
  Hotel,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// 导航配置
interface NavChild {
  label: string
  path: string
}

interface NavItem {
  id: string
  icon: React.ComponentType<{ size?: number }>
  label: string
  path: string
  children?: NavChild[]
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: '数据中心',
    path: '/',
  },
  {
    id: 'hotel',
    icon: Building2,
    label: '酒店管理',
    path: '/hotel',
    children: [
      { label: '基本信息', path: '/hotel/info' },
      { label: '房型管理', path: '/hotel/rooms' },
      { label: '房态日历', path: '/hotel/calendar' },
    ],
  },
  {
    id: 'orders',
    icon: ShoppingCart,
    label: '订单中心',
    path: '/orders',
  },
  {
    id: 'ai',
    icon: MessageSquare,
    label: 'AI 客服',
    path: '/ai/chat',
  },
  {
    id: 'marketing',
    icon: Sparkles,
    label: '营销工具',
    path: '/marketing',
    children: [
      { label: '内容生成', path: '/marketing/content' },
      { label: '数据洞察', path: '/marketing/analytics' },
    ],
  },
  {
    id: 'settings',
    icon: Settings,
    label: '系统设置',
    path: '/settings',
  },
]

export function HotelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['hotel', 'marketing'])
  const location = useLocation()

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 侧边栏 */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="bg-dark-800 border-r border-dark-600 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-dark-600">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <Hotel className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                <div className="font-bold text-white">Tiohai</div>
                <div className="text-xs text-gray-400">酒店管理系统</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 导航 */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedMenus.includes(item.id)
            const isMenuActive = isActive(item.path)

            return (
              <div key={item.id}>
                {/* 父菜单 */}
                <button
                  onClick={() => hasChildren ? toggleMenu(item.id) : null}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${isMenuActive && !hasChildren
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                    }
                  `}
                >
                  {hasChildren ? (
                    <>
                      <Icon size={20} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 text-left text-sm font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className="flex items-center gap-3 w-full"
                    >
                      <Icon size={20} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  )}
                </button>

                {/* 子菜单 */}
                <AnimatePresence>
                  {hasChildren && isExpanded && sidebarOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-4 mt-1 space-y-1"
                    >
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `
                            flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                            ${isActive
                              ? 'bg-neon-cyan/10 text-neon-cyan'
                              : 'text-gray-500 hover:bg-dark-700 hover:text-gray-300'
                            }
                          `}
                        >
                          <ChevronRight size={14} />
                          {child.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* 底部：收起按钮 */}
        <div className="p-3 border-t border-dark-600">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部栏 */}
        <header className="h-16 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">
              {navItems.find(item => 
                item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
              )?.label || '酒店管理'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* 通知 */}
            <button className="relative p-2 rounded-lg text-gray-400 hover:bg-dark-700 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full" />
            </button>

            {/* 用户菜单 */}
            <div className="flex items-center gap-3 pl-4 border-l border-dark-600">
              <div className="text-right">
                <div className="text-sm font-medium text-white">胡同里精品酒店</div>
                <div className="text-xs text-gray-400">ID: HT-2024-001</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-white font-medium">胡</span>
              </div>
              <button className="text-gray-400 hover:text-white">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* 内容区 */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
