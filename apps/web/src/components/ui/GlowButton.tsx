'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  color?: string
  variant?: 'filled' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: (e?: React.MouseEvent) => void
  disabled?: boolean
  icon?: ReactNode
}

export function GlowButton({ 
  children, 
  color = '#00F0FF',
  variant = 'filled',
  size = 'md',
  className,
  onClick,
  disabled = false,
  icon
}: GlowButtonProps) {
  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }

  const variants = {
    filled: {
      background: color,
      color: '#0A0E1A',
      borderColor: 'transparent',
    },
    outline: {
      background: 'transparent',
      color: color,
      borderColor: `${color}40`,
    },
    ghost: {
      background: 'transparent',
      color: color,
      borderColor: 'transparent',
    },
  }

  const style = variants[variant]

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-all duration-300",
        "border",
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        background: style.background,
        color: style.color,
        borderColor: style.borderColor,
        boxShadow: variant === 'filled' 
          ? `0 0 20px ${color}40, 0 4px 10px rgba(0,0,0,0.3)`
          : `0 0 10px ${color}10`,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = variant === 'filled'
            ? `0 0 30px ${color}60, 0 0 60px ${color}30, 0 4px 15px rgba(0,0,0,0.4)`
            : `0 0 20px ${color}30, inset 0 0 20px ${color}10`
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = variant === 'filled'
          ? `0 0 20px ${color}40, 0 4px 10px rgba(0,0,0,0.3)`
          : `0 0 10px ${color}10`
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
