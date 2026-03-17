'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import { 
  Menu, 
  X, 
  Home, 
  Search, 
  User, 
  MessageCircle,
  Heart,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile, useScrollDirection } from '@/hooks/useResponsive'

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection()
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isMobile) return null

  const navItems = [
    { href: '/', icon: Home, label: t('home') || 'Home' },
    { href: '/hotels', icon: Search, label: t('hotels') || 'Hotels' },
    { href: '/saved', icon: Heart, label: t('saved') || 'Saved' },
    { href: '/orders', icon: Calendar, label: t('orders') || 'Orders' },
    { href: '/profile', icon: User, label: t('profile') || 'Profile' },
  ]

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800',
          className
        )}
        initial={{ y: 0 }}
        animate={{ 
          y: scrollDirection === 'down' && !isOpen ? -100 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-cyan-400">tiaohai</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors tap-target"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              className="fixed top-14 left-0 right-0 bottom-0 bg-slate-900 z-50 overflow-y-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl transition-all tap-target',
                          isActive 
                            ? 'bg-cyan-500/20 text-cyan-400' 
                            : 'text-slate-300 hover:bg-slate-800'
                        )}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-lg font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
                            layoutId="activeIndicator"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}

                <div className="pt-4 border-t border-slate-800">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      href="/login"
                      className="flex items-center gap-4 p-4 rounded-xl text-slate-300 hover:bg-slate-800 transition-colors tap-target"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-lg font-medium">{t('login') || 'Login'}</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Mobile Bottom Navigation Bar
export function MobileBottomNav() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection()

  if (!isMobile) return null

  const navItems = [
    { href: '/', icon: Home, label: t('home') || 'Home' },
    { href: '/hotels', icon: Search, label: t('hotels') || 'Explore' },
    { href: '/saved', icon: Heart, label: t('saved') || 'Saved' },
    { href: '/orders', icon: Calendar, label: t('orders') || 'Trips' },
    { href: '/profile', icon: User, label: t('profile') || 'Profile' },
  ]

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 safe-area-inset"
      initial={{ y: 0 }}
      animate={{ 
        y: scrollDirection === 'down' ? 100 : 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full tap-target transition-colors',
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                    layoutId="bottomNavIndicator"
                  />
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
