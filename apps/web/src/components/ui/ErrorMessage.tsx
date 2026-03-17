'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AlertTriangle, CheckCircle, Info, XCircle, X, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useState } from 'react'

interface ErrorMessageProps {
  error?: Error | string | null
  errorCode?: string
  onDismiss?: () => void
  className?: string
  retry?: () => void
  showIcon?: boolean
  variant?: 'inline' | 'banner' | 'toast'
}

// 友好的错误消息映射
const ERROR_CODE_MAP: Record<string, { en: string; zh: string }> = {
  'NETWORK_ERROR': {
    en: 'Connection failed. Please check your internet and try again.',
    zh: '连接失败，请检查网络后重试',
  },
  'TIMEOUT': {
    en: 'Request timed out. Please try again.',
    zh: '请求超时，请重试',
  },
  'UNAUTHORIZED': {
    en: 'Please sign in to continue.',
    zh: '请先登录以继续',
  },
  'FORBIDDEN': {
    en: "You don't have permission to do this.",
    zh: '您没有权限执行此操作',
  },
  'NOT_FOUND': {
    en: 'The requested content was not found.',
    zh: '未找到请求的内容',
  },
  'SERVER_ERROR': {
    en: 'Something went wrong on our end. Please try again later.',
    zh: '服务器出现问题，请稍后重试',
  },
  'VALIDATION_ERROR': {
    en: 'Please check your input and try again.',
    zh: '请检查输入信息后重试',
  },
  'PAYMENT_FAILED': {
    en: 'Payment could not be processed. Please try a different method.',
    zh: '支付处理失败，请尝试其他支付方式',
  },
  'RATE_LIMIT': {
    en: 'Too many requests. Please wait a moment.',
    zh: '请求过于频繁，请稍后再试',
  },
}

// 从错误对象提取友好消息
function getFriendlyErrorMessage(error: Error | string | null | undefined, locale: string): string {
  if (!error) return ''
  
  const errorMessage = typeof error === 'string' ? error : error.message
  
  // 检查是否是已知的错误代码
  const errorKey = Object.keys(ERROR_CODE_MAP).find(key => 
    errorMessage.toUpperCase().includes(key)
  )
  
  if (errorKey) {
    return locale === 'zh' ? ERROR_CODE_MAP[errorKey].zh : ERROR_CODE_MAP[errorKey].en
  }
  
  // 常见HTTP状态码映射
  if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
    return locale === 'zh' ? ERROR_CODE_MAP.UNAUTHORIZED.zh : ERROR_CODE_MAP.UNAUTHORIZED.en
  }
  if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
    return locale === 'zh' ? ERROR_CODE_MAP.FORBIDDEN.zh : ERROR_CODE_MAP.FORBIDDEN.en
  }
  if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
    return locale === 'zh' ? ERROR_CODE_MAP.NOT_FOUND.zh : ERROR_CODE_MAP.NOT_FOUND.en
  }
  if (errorMessage.includes('500') || errorMessage.includes('Server Error')) {
    return locale === 'zh' ? ERROR_CODE_MAP.SERVER_ERROR.zh : ERROR_CODE_MAP.SERVER_ERROR.en
  }
  if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
    return locale === 'zh' ? ERROR_CODE_MAP.TIMEOUT.zh : ERROR_CODE_MAP.TIMEOUT.en
  }
  if (errorMessage.includes('network') || errorMessage.includes('Network')) {
    return locale === 'zh' ? ERROR_CODE_MAP.NETWORK_ERROR.zh : ERROR_CODE_MAP.NETWORK_ERROR.en
  }
  
  // 默认消息
  return locale === 'zh' 
    ? '发生错误，请重试或联系客服'
    : 'Something went wrong. Please try again or contact support.'
}

export function ErrorMessage({
  error,
  errorCode,
  onDismiss,
  className,
  retry,
  showIcon = true,
  variant = 'banner',
}: ErrorMessageProps) {
  const t = useTranslations('common')
  const [locale, setLocale] = useState('en')
  
  useEffect(() => {
    // Detect locale from document or localStorage
    const htmlLang = document.documentElement.lang
    if (htmlLang) {
      setLocale(htmlLang.startsWith('zh') ? 'zh' : 'en')
    }
  }, [])
  
  if (!error) return null
  
  const message = getFriendlyErrorMessage(error, locale)
  const isNetworkError = message.toLowerCase().includes('network') || 
                         message.toLowerCase().includes('connection') ||
                         message.toLowerCase().includes('timeout')

  const variants = {
    inline: 'rounded-lg p-3 text-sm',
    banner: 'rounded-xl p-4',
    toast: 'rounded-xl p-4 shadow-lg',
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={errorCode || 'error'}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'relative overflow-hidden',
          'bg-gradient-to-r from-red-500/10 to-orange-500/10',
          'border border-red-500/20',
          variants[variant],
          className
        )}
        role="alert"
        aria-live="polite"
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <div className="relative flex items-start gap-3">
          {showIcon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {isNetworkError ? (
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
            </motion.div>
          )}
          
          <div className="flex-1 min-w-0">
            <motion.p
              className="text-sm font-medium text-red-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {locale === 'zh' ? '出错了' : 'Oops!'}
            </motion.p>
            
            <motion.p
              className="text-sm text-slate-300 mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              {message}
            </motion.p>
            
            {retry && (
              <motion.button
                onClick={retry}
                className="mt-3 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: 3 }}
              >
                {locale === 'zh' ? '重试' : 'Try Again'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.button>
            )}
          </div>
          
          {onDismiss && (
            <motion.button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label={locale === 'zh' ? '关闭' : 'Dismiss'}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Success message component
interface SuccessMessageProps {
  message: string
  onDismiss?: () => void
  className?: string
  showIcon?: boolean
  autoDismiss?: boolean
  dismissDelay?: number
}

export function SuccessMessage({
  message,
  onDismiss,
  className,
  showIcon = true,
  autoDismiss = false,
  dismissDelay = 5000,
}: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onDismiss?.(), 300)
      }, dismissDelay)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, dismissDelay, onDismiss])
  
  if (!isVisible) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'relative overflow-hidden rounded-xl p-4',
          'bg-gradient-to-r from-emerald-500/10 to-green-500/10',
          'border border-emerald-500/20',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="relative flex items-start gap-3">
          {showIcon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            </motion.div>
          )}
          
          <div className="flex-1">
            <p className="text-sm text-emerald-200">{message}</p>
          </div>
          
          {onDismiss && (
            <motion.button
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => onDismiss(), 300)
              }}
              className="flex-shrink-0 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
        
        {/* Progress bar for auto-dismiss */}
        {autoDismiss && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-emerald-500/50"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: dismissDelay / 1000, ease: 'linear' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Info message component
interface InfoMessageProps {
  title?: string
  message: string
  className?: string
  showIcon?: boolean
}

export function InfoMessage({ title, message, className, showIcon = true }: InfoMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20',
        className
      )}
      role="note"
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        )}
        <div>
          {title && <p className="text-sm font-medium text-blue-200">{title}</p>}
          <p className="text-sm text-slate-300">{message}</p>
        </div>
      </div>
    </motion.div>
  )
}

// Form field error
interface FieldErrorProps {
  error?: string
  className?: string
}

export function FieldError({ error, className }: FieldErrorProps) {
  if (!error) return null
  
  return (
    <motion.p
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={cn(
        'text-sm text-red-400 flex items-center gap-1.5 mt-1.5',
        className
      )}
    >
      <AlertCircle className="w-3.5 h-3.5" />
      {error}
    </motion.p>
  )
}
