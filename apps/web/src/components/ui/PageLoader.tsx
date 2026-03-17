'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface PageLoaderProps {
  text?: string
  fullScreen?: boolean
}

export function PageLoader({ text, fullScreen = false }: PageLoaderProps) {
  const t = useTranslations('common')
  const displayText = text || t('loading')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const dotVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.5,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15,
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const Wrapper = fullScreen ? motion.div : motion.div
  const wrapperProps = fullScreen
    ? {
        className: 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        className: 'flex flex-col items-center justify-center py-12',
      }

  return (
    <Wrapper {...wrapperProps}>
      {/* Logo/Brand mark */}
      <motion.div
        className="mb-8 relative"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-slate-900"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        
        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-500/30"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-500/20"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: '0.3s' }}
        />
      </motion.div>

      {/* Loading dots */}
      <motion.div
        className="flex items-center gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-cyan-500"
            variants={dotVariants}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              },
            }}
          />
        ))}
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-slate-400 text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {displayText}
      </motion.p>

      {/* Progress bar */}
      <motion.div
        className="mt-4 w-48 h-1 bg-slate-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
          initial={{ width: '0%' }}
          animate={{ 
            width: ['0%', '40%', '60%', '80%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </Wrapper>
  )
}

// Skeleton loader for cards
interface CardSkeletonProps {
  count?: number
  className?: string
}

export function CardSkeleton({ count = 3, className }: CardSkeletonProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-slate-800/50 rounded-2xl p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Image skeleton */}
          <div className="h-48 bg-slate-700/50 rounded-xl animate-pulse" />
          
          {/* Title skeleton */}
          <div className="h-6 bg-slate-700/50 rounded w-3/4 animate-pulse" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-700/50 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-700/50 rounded w-2/3 animate-pulse" />
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 bg-slate-700/50 rounded-xl w-1/3 animate-pulse" />
        </motion.div>
      ))}
    </div>
  )
}

// Content shimmer loader
export function ContentShimmer({ lines = 5 }: { lines?: number }) {
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-slate-800 rounded"
          style={{ width: `${Math.random() * 30 + 70}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
