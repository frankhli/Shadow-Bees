'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import { useToast } from '@/stores/toastStore'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  successText?: string
  icon?: ReactNode
  successIcon?: ReactNode
  type?: 'button' | 'submit' | 'reset'
  showSuccessToast?: boolean
  toastMessage?: string
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  loadingText,
  successText,
  icon,
  successIcon,
  type = 'button',
  showSuccessToast = false,
  toastMessage,
}: AnimatedButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const toast = useToast()

  const isDisabled = disabled || isLoading || loading

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return

    if (onClick) {
      setIsLoading(true)
      try {
        await onClick(e)
        setShowSuccess(true)
        if (showSuccessToast && toastMessage) {
          toast.success(toastMessage)
        }
        setTimeout(() => setShowSuccess(false), 1500)
      } catch (error) {
        // Error handling is done by parent
      } finally {
        setIsLoading(false)
      }
    }
  }

  const variants = {
    primary: 'bg-cyan-500 text-slate-900 hover:bg-cyan-400',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10',
    ghost: 'text-cyan-500 hover:bg-cyan-500/10',
    danger: 'bg-red-500 text-white hover:bg-red-400',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-13 px-8 text-lg',
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-200 overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      initial={false}
    >
      {/* Background ripple effect */}
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={showSuccess ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ borderRadius: '50%', transformOrigin: 'center' }}
      />

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {(isLoading || loading) && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.span>
        )}
        
        {!isLoading && !loading && showSuccess && successIcon && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {successIcon}
          </motion.span>
        )}
        
        {!isLoading && !loading && !showSuccess && icon && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {icon}
          </motion.span>
        )}

        <span>
          {(isLoading || loading) && loadingText 
            ? loadingText 
            : showSuccess && successText 
              ? successText 
              : children}
        </span>
      </span>

      {/* Hover glow effect */}
      {!isDisabled && (
        <motion.span
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: variant === 'primary' 
              ? 'linear-gradient(135deg, rgba(0,240,255,0.3) 0%, transparent 50%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
      )}
    </motion.button>
  )
}

// 点击波纹效果按钮
interface RippleButtonProps extends AnimatedButtonProps {
  rippleColor?: string
}

export function RippleButton({
  rippleColor = 'rgba(255,255,255,0.4)',
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <AnimatedButton {...props} onClick={handleClick} className={cn('relative overflow-hidden', props.className)}>
      {props.children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
          animate={{ width: 400, height: 400, x: -200, y: -200, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </AnimatedButton>
  )
}
