'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useState } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  hoverEffect?: boolean
  onClick?: () => void
}

export function GlassCard({ 
  children, 
  className,
  glowColor = 'rgba(0, 240, 255, 0.1)',
  hoverEffect = true,
  onClick
}: GlassCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseClassName = cn(
    "relative rounded-xl overflow-hidden",
    "bg-gradient-to-br from-[#141B2D]/90 to-[#0B0F19]/90",
    "backdrop-blur-xl",
    "border border-white/10",
    "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
    hoverEffect && "transition-shadow duration-300",
    onClick && "cursor-pointer",
    className
  )

  // 服务端渲染时返回静态div
  if (!mounted) {
    return (
      <div 
        className={baseClassName}
        style={{
          boxShadow: hoverEffect ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${glowColor}` : undefined
        }}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      whileHover={hoverEffect ? { 
        y: -4,
        transition: { duration: 0.2 }
      } : undefined}
      onClick={onClick}
      className={baseClassName}
      style={{
        boxShadow: hoverEffect ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${glowColor}` : undefined
      }}
    >
      {children}
    </motion.div>
  )
}

// 带顶部光效的卡片
interface GlowCardProps {
  children: ReactNode
  className?: string
  accentColor?: string
  delay?: number
}

export function GlowCard({ 
  children, 
  className,
  accentColor = '#00F0FF',
  delay = 0
}: GlowCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const baseClassName = cn(
    "relative rounded-xl overflow-hidden p-6",
    "bg-gradient-to-br from-[#141B2D]/90 to-[#0B0F19]/90",
    "backdrop-blur-xl",
    "border border-white/10",
    "transition-shadow duration-300",
    className
  )

  if (!mounted) {
    return (
      <div className={baseClassName}>
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: accentColor }}
        />
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        y: -4,
        boxShadow: `0 20px 40px ${accentColor}15, 0 0 0 1px ${accentColor}30`,
      }}
      className={baseClassName}
    >
      {/* 顶部色条 */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      />
      {children}
    </motion.div>
  )
}
