'use client'

import { useEffect, useState, useCallback } from 'react'

// 断点定义 (与 Tailwind 默认断点一致)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    
    const updateMatch = () => setMatches(media.matches)
    updateMatch()
    
    media.addEventListener('change', updateMatch)
    return () => media.removeEventListener('change', updateMatch)
  }, [query])
  
  return matches
}

// 移动端检测
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.md - 1}px)`)
}

// 平板检测
export function useIsTablet(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`)
}

// 桌面检测
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.lg}px)`)
}

// 大屏幕检测
export function useIsLargeScreen(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.xl}px)`)
}

// 触摸设备检测
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  
  return isTouch
}

// 视口尺寸
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return viewport
}

// 滚动位置
export function useScrollPosition() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleScroll = () => {
      setScroll({ x: window.scrollX, y: window.scrollY })
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return scroll
}

// 滚动方向
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY) {
        setDirection('down')
      } else if (currentScrollY < lastScrollY) {
        setDirection('up')
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  
  return direction
}

// 屏幕方向
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  
  useEffect(() => {
    const handleOrientation = () => {
      const isLandscape = window.matchMedia('(orientation: landscape)').matches
      setOrientation(isLandscape ? 'landscape' : 'portrait')
    }
    
    handleOrientation()
    window.addEventListener('orientationchange', handleOrientation)
    return () => window.removeEventListener('orientationchange', handleOrientation)
  }, [])
  
  return orientation
}

// 安全的 SSR window 访问
export function useSafeWindow() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return {
    isClient,
    window: isClient ? window : null,
  }
}
