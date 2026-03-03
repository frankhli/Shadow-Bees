'use client'

import { cn } from '@/lib/utils'

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingState({ size = 'md', text = '加载中...', className }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className={cn(
        'border-slate-600 border-t-cyan-500 rounded-full animate-spin',
        sizeClasses[size]
      )} />
      {text && (
        <p className="mt-4 text-sm text-slate-400">{text}</p>
      )}
    </div>
  )
}

// 骨架屏组件
interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div className={cn(
      'animate-pulse bg-slate-800 rounded',
      className
    )} style={style} />
  )
}

// 骨架屏卡片
export function SkeletonCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

// 骨架屏表格行
export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-800">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: `${Math.random() * 30 + 20}%` }}
        />
      ))}
    </div>
  )
}
