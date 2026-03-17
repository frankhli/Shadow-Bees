'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PageTransitionProps {
  children: ReactNode
  className?: string
  mode?: 'fade' | 'slide' | 'scale' | 'slideUp'
}

export function PageTransition({ 
  children, 
  className, 
  mode = 'fade' 
}: PageTransitionProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  }

  const selected = variants[mode]

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={selected.initial}
      animate={selected.animate}
      exit={selected.exit}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Card entrance animation wrapper
interface CardEntranceProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function CardEntrance({
  children,
  className,
  delay = 0,
  direction = 'up',
}: CardEntranceProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for children animations
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
}: StaggerContainerProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger item for use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: StaggerItemProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const variants = {
    up: {
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
    down: {
      hidden: { opacity: 0, y: -30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
    left: {
      hidden: { opacity: 0, x: 30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants[direction]}
    >
      {children}
    </motion.div>
  )
}

// Hover scale animation wrapper
interface HoverScaleProps {
  children: ReactNode
  className?: string
  scale?: number
}

export function HoverScale({ children, className, scale = 1.02 }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  )
}

// Image lazy load with blur effect
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderColor?: string
}

export function LazyImage({ 
  src, 
  alt, 
  className,
  placeholderColor = '#1e293b'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  )
}

// Modal/Dialog animation wrapper
interface ModalAnimationProps {
  children: ReactNode
  isOpen: boolean
  className?: string
  onClose?: () => void
}

export function ModalAnimation({
  children,
  isOpen,
  className,
  onClose,
}: ModalAnimationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div
            className={cn('fixed z-50', className)}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
