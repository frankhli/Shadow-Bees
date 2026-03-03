'use client'

import { useEffect } from 'react'
import { usePlatformStore } from '@/stores/platformStore'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initializeMockData = usePlatformStore((state) => state.initializeMockData)
  const recalculateStats = usePlatformStore((state) => state.recalculateStats)

  useEffect(() => {
    // 初始化 Mock 数据
    initializeMockData()
    recalculateStats()
  }, [initializeMockData, recalculateStats])

  return <>{children}</>
}
