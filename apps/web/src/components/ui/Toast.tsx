'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore } from '@/stores/toastStore'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  error: <XCircle className="w-5 h-5 text-red-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
}

const borderColors = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  warning: 'border-amber-500/30',
  info: 'border-blue-500/30',
}

export function ToastContainer() {
  const { toasts, remove } = useToastStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch - render empty placeholder on server
  if (!mounted) {
    return <div className="fixed top-4 right-4 z-[9999] pointer-events-none" />
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ 
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            className={`
              pointer-events-auto
              flex items-start gap-3 p-4 rounded-xl 
              bg-gradient-to-br from-[#141B2D] to-[#0B0F19]
              border ${borderColors[toast.type]}
              shadow-[0_8px_32px_rgba(0,0,0,0.4)]
              min-w-[320px] max-w-[420px]
            `}
          >
            <div className="flex-shrink-0 mt-0.5">
              {icons[toast.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-sm">{toast.title}</p>
              {toast.message && (
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => remove(toast.id)}
              className="flex-shrink-0 text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
