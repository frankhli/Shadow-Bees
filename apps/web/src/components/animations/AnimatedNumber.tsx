'use client'

import { useEffect, useState } from 'react'
import { useSpring, useTransform, motion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedNumber({ 
  value, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  duration = 1.5,
  className = ''
}: AnimatedNumberProps) {
  const [mounted, setMounted] = useState(false)
  const spring = useSpring(0, { 
    duration: duration * 1000, 
    bounce: 0 
  })
  
  const display = useTransform(spring, (current) => {
    if (decimals > 0) {
      return current.toFixed(decimals)
    }
    return Math.round(current).toLocaleString()
  })

  useEffect(() => {
    setMounted(true)
    spring.set(value)
  }, [value, spring])

  // 服务端渲染时显示静态数值
  if (!mounted) {
    return (
      <span className={`tabular-nums ${className}`}>
        {prefix}
        {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
        {suffix}
      </span>
    )
  }

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}
