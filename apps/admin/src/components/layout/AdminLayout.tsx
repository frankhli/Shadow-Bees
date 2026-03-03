import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  Building2,
  Users,
  ShoppingCart,
  DollarSign,
  Brain,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Shield,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  id: string
  icon: React.ComponentType<{ size?: number }>
  label: string
  path: string
  children?: { label: string; path: string }[]
  badge?: number
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: '运营概览',
    path: '/',
  },
  {
    id: 'hotels',
    icon: Building2,
    label: '酒店管理',
    path: '/hotels',
    children: [
      { label: '酒店列表', path: '/hotels' },
      { label: '待审核', path: '/hotels/pending' },
    ],
    badge: 3,
  },
  {
    id: 'users',
    icon: Users,
    label: '用户管理',
    path: '/users',
    children: [
      { label: '游客', path: '/users/guests' },
      { label: '酒店业主', path: '/users/owners' },
      { label: '导游', path: '/users/guides' },
    ],
  },
  {
    id: 'orders',
    icon: ShoppingCart,
    label: '订单监控',
    path: '/orders',
    badge: 5,
  },
  {
    id: 'finance',
    icon: DollarSign,
    label: '财务结算',
    path: '/finance',
    children: [
      { label: '收入概览', path: '/finance' },
      { label: '酒店结算', path: '/finance/settlement' },
      { label: '提现审核', path: '/finance/withdrawal' },
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    label: 'AI 中心',
    path: '/ai',
    children: [
      { label: '知识库', path: '/ai/knowledge' },
      { label: '质量监控', path: '/ai/quality' },
      { label: '训练数据', path: '/ai/training' },
    ],
  },
  {
    id: 'settings',
    icon: Settings,
    label: '系统设置',
    path: '/settings',
  },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['hotels', 'users', 'finance', 'ai'])
  const location = useLocation()

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* 侧边栏 */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 72 }}
        className="bg-dark-800 border-r border-dark-600 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-dark-600">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3"
              >
                <div className="font-bold text-white">Tiohai Admin</div>
                <div className="text-xs text-gray-400">运营管理后台</div>
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
            const isActive = location.pathname.startsWith(item.path) || location.pathname === item.path

            return (
              <div key={item.id}>
                <button
                  onClick={() => hasChildren ? toggleMenu(item.id) : null}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative
                    ${isActive && !hasChildren
                      ? 'bg-neon-purple/10 text-neon-purple border border-neon-purple/30'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                    }
                  `}
                >
                  {hasChildren ? (
                    <>
                      <Icon size={20} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex-1 text-left text-sm font-medium"
                            >
                              {item.label}
                            </motion.span>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-neon-red text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                              <ChevronDown size={16} />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={item.path} className="flex items-center gap-3 w-full">
                      <Icon size={20} />
                      <AnimatePresence>
                        {sidebarOpen && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm font-medium flex-1 text-left"
                            >
                              {item.label}
                            </motion.span>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-neon-red text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  )}
                </button>

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
                            block px-3 py-2 rounded-lg text-sm transition-all
                            ${isActive
                              ? 'bg-neon-purple/10 text-neon-purple'
                              : 'text-gray-500 hover:bg-dark-700 hover:text-gray-300'
                            }
                          `}
                        >
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

        {/* 底部 */}
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
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="搜索酒店、订单、用户..."
                className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-purple focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-dark-600">
              <div className="text-right">
                <div className="text-sm font-medium text-white">管理员</div>
                <div className="text-xs text-gray-400">admin@tiohai.com</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
              <button className="text-gray-400 hover:text-white">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
