'use client'

import { ReactNode, useState, useCallback, memo, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronRight,
  User,
  Building2,
  type LucideIcon,
} from 'lucide-react'

// 导航项类型定义
interface NavChild {
  label: string
  path: string
  children?: NavChild[]
}

interface NavItem {
  id: string
  icon: LucideIcon
  label: string
  path: string
  children?: NavChild[]
}

interface SidebarProps {
  title: string
  subtitle: string
  themeColor: string
  themeBg: string
  navItems: NavItem[]
  userName: string
  userRole: string
  userAvatar?: ReactNode
  logo?: ReactNode
  collapsed?: boolean
}

// 主题色映射
const themeColors: Record<string, { primary: string; bg: string; border: string; hover: string }> = {
  cyan: {
    primary: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    hover: 'hover:bg-cyan-500/5',
  },
  purple: {
    primary: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    hover: 'hover:bg-purple-500/5',
  },
  green: {
    primary: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    hover: 'hover:bg-green-500/5',
  },
  orange: {
    primary: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    hover: 'hover:bg-orange-500/5',
  },
}

// 记忆化子菜单项组件
const NavChildItem = memo(function NavChildItem({
  child,
  itemId,
  theme,
  isActive,
  expandedChildNav,
  setExpandedChildNav,
}: {
  child: NavChild
  itemId: string
  theme: { primary: string; bg: string; border: string; hover: string }
  isActive: (path: string) => boolean
  expandedChildNav: string | null
  setExpandedChildNav: (id: string | null) => void
}) {
  const hasGrandChildren = child.children && child.children.length > 0
  const isChildExpanded = expandedChildNav === `${itemId}-${child.label}`
  const childActive = isActive(child.path)

  const handleChildToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedChildNav(isChildExpanded ? null : `${itemId}-${child.label}`)
  }, [isChildExpanded, itemId, child.label, setExpandedChildNav])

  return (
    <div key={child.path}>
      {hasGrandChildren ? (
        <button
          onClick={handleChildToggle}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-lg transition-colors ${
            childActive
              ? `${theme.primary} ${theme.bg}`
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <span>{child.label}</span>
          <ChevronRight
            size={14}
            className={`transition-transform duration-200 ${isChildExpanded ? 'rotate-90' : ''}`}
          />
        </button>
      ) : (
        <Link
          href={child.path}
          className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
            childActive
              ? `${theme.primary} ${theme.bg}`
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          {child.label}
        </Link>
      )}

      {/* 三级菜单 - 使用CSS transition代替framer-motion */}
      {hasGrandChildren && (
        <div
          className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
            isChildExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {child.children!.map((grandChild) => (
            <Link
              key={grandChild.path}
              href={grandChild.path}
              className={`block px-4 py-1.5 text-xs rounded-lg transition-colors ${
                isActive(grandChild.path)
                  ? `${theme.primary} ${theme.bg}`
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {grandChild.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})

// 记忆化主导航项组件
const NavItemComponent = memo(function NavItemComponent({
  item,
  theme,
  collapsed,
  expandedNav,
  setExpandedNav,
  isActive,
}: {
  item: NavItem
  theme: { primary: string; bg: string; border: string; hover: string }
  collapsed: boolean
  expandedNav: string | null
  setExpandedNav: (id: string | null) => void
  isActive: (path: string, item?: NavItem) => boolean
}) {
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedNav === item.id
  const itemActive = isActive(item.path, item)

  const handleToggle = useCallback(() => {
    if (!collapsed) {
      setExpandedNav(isExpanded ? null : item.id)
    }
  }, [collapsed, isExpanded, item.id, setExpandedNav])

  const [expandedChildNav, setExpandedChildNav] = useState<string | null>(null)

  return (
    <div key={item.id}>
      {/* 主菜单项 */}
      {hasChildren ? (
        <button
          onClick={handleToggle}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg transition-all ${
            itemActive
              ? `${theme.bg} ${theme.primary} border-l-2 border-current`
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
          title={collapsed ? item.label : undefined}
        >
          <Icon size={20} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              <ChevronRight
                size={16}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              />
            </>
          )}
        </button>
      ) : (
        <Link
          href={item.path}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg transition-all ${
            itemActive
              ? `${theme.bg} ${theme.primary} border-l-2 border-current`
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
          title={collapsed ? item.label : undefined}
        >
          <Icon size={20} />
          {!collapsed && (
            <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
          )}
        </Link>
      )}

      {/* 子菜单 - 使用CSS transition代替framer-motion */}
      {hasChildren && !collapsed && (
        <div
          className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {item.children!.map((child) => (
            <NavChildItem
              key={child.path}
              child={child}
              itemId={item.id}
              theme={theme}
              isActive={isActive}
              expandedChildNav={expandedChildNav}
              setExpandedChildNav={setExpandedChildNav}
            />
          ))}
        </div>
      )}
    </div>
  )
})

export function Sidebar({
  title,
  subtitle,
  themeColor,
  themeBg,
  navItems,
  userName,
  userRole,
  userAvatar,
  logo,
  collapsed = false,
}: SidebarProps) {
  const pathname = usePathname()
  const [expandedNav, setExpandedNav] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const theme = themeColors[themeColor] || themeColors.cyan

  // Prevent hydration mismatch - render simplified placeholder on server
  if (!mounted) {
    return (
      <aside
        className={`${collapsed ? 'w-20' : 'w-64'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 h-screen`}
      >
        <div className={`h-[72px] border-b border-slate-800 flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} ${themeBg}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center`}>
              <Building2 className={`w-6 h-6 ${theme.primary}`} />
            </div>
            {!collapsed && <span className="text-white font-bold text-lg">{title}</span>}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400">
                <item.icon className="w-5 h-5" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </div>
            ))}
          </div>
        </div>
      </aside>
    )
  }

  // 检查路径是否激活 - 使用useCallback优化
  const isActive = useCallback((path: string, item?: NavItem) => {
    if (path === '/') {
      return pathname === '/'
    }
    // 如果有子菜单，只有完全匹配才高亮
    if (item?.children && item.children.length > 0) {
      return pathname === path
    }
    // 检查路径层级
    const pathParts = path.split('/').filter(Boolean)
    if (pathParts.length === 1) {
      // 一级路径如 /hotel，只有完全匹配才高亮
      return pathname === path
    }
    // 其他：完全匹配或者是子路径
    return pathname === path || pathname.startsWith(path + '/')
  }, [pathname])

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 h-screen`}
    >
      {/* Logo区域 */}
      <div className={`h-[72px] border-b border-slate-800 flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} ${themeBg}`}>
        {logo || (
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center`}>
              <Building2 className={`w-6 h-6 ${theme.primary}`} />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">{title}</h1>
                <p className="text-xs text-slate-400">{subtitle}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            theme={theme}
            collapsed={collapsed}
            expandedNav={expandedNav}
            setExpandedNav={setExpandedNav}
            isActive={isActive}
          />
        ))}
      </nav>

      {/* 用户信息 */}
      <Link
        href="/settings"
        className={`mx-3 mb-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 hover:bg-slate-800 transition-all group ${collapsed ? 'flex justify-center' : ''}`}
      >
        <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
          <div className={`w-10 h-10 rounded-full ${theme.bg} flex items-center justify-center flex-shrink-0`}>
            {userAvatar || <User size={20} className={theme.primary} />}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{userName}</div>
                <div className="text-xs text-slate-400">{userRole}</div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
            </>
          )}
        </div>
      </Link>
    </aside>
  )
}
