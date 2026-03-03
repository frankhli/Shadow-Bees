'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { AnimatedNumber } from '@/components/animations/AnimatedNumber'
import { cn } from '@/lib/utils'

interface AnimatedStatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  trend?: number
  trendLabel?: string
  icon: LucideIcon
  color: string
  delay?: number
  decimals?: number
}

export function AnimatedStatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendLabel,
  icon: Icon,
  color,
  delay = 0,
  decimals = 0,
}: AnimatedStatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isPositive = trend && trend > 0
  const isNegative = trend && trend < 0

  const baseClassName = "relative rounded-xl overflow-hidden p-6 cursor-default group"
  const baseStyle = {
    background: 'linear-gradient(135deg, rgba(20, 27, 45, 0.9) 0%, rgba(11, 15, 25, 0.9) 100%)',
    border: `1px solid ${color}30`,
  }

  // 服务端渲染时返回静态卡片
  if (!mounted) {
    return (
      <div className={baseClassName} style={baseStyle}>
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: color }}
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-sm font-medium">{title}</span>
            <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
              <Icon size={20} style={{ color }} />
            </div>
          </div>
          <div className="text-3xl font-bold font-mono mb-2" style={{ color }}>
            {prefix}{value}{suffix}
          </div>
          {trend !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              isPositive ? 'text-emerald-400' : 
              isNegative ? 'text-red-400' : 
              'text-slate-400'
            )}>
              {isPositive && <TrendingUp size={12} />}
              {isNegative && <TrendingDown size={12} />}
              <span>
                {isPositive ? '+' : ''}{trend}%
                {trendLabel && <span className="text-slate-500 ml-1">{trendLabel}</span>}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={baseClassName}
      style={baseStyle}
    >
      {/* 顶部色条 */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 origin-left"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      />

      {/* 悬停光效 */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, ${color}15, transparent 40%)`,
        }}
      />

      <div className="relative">
        {/* 标题和图标 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400 text-sm font-medium">{title}</span>
          <div 
            className="p-2 rounded-lg"
            style={{ background: `${color}15` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
        </div>

        {/* 数值 */}
        <div 
          className="text-3xl font-bold font-mono mb-2"
          style={{ color }}
        >
          <AnimatedNumber 
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={2}
          />
        </div>

        {/* 趋势 */}
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs",
            isPositive ? 'text-emerald-400' : 
            isNegative ? 'text-red-400' : 
            'text-slate-400'
          )}>
            {isPositive && <TrendingUp size={12} />}
            {isNegative && <TrendingDown size={12} />}
            <span>
              {isPositive ? '+' : ''}{trend}%
              {trendLabel && <span className="text-slate-500 ml-1">{trendLabel}</span>}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
