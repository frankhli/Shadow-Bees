'use client'

import { cn } from '@/lib/utils'

type StatusType = 
  | 'success' | 'warning' | 'error' | 'info' 
  | 'pending' | 'confirmed' | 'cancelled' 
  | 'active' | 'inactive' | 'draft' | 'ended' | 'paused'

interface StatusBadgeProps {
  status: StatusType
  children: React.ReactNode
  className?: string
}

const statusStyles: Record<StatusType, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  active: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  draft: 'bg-slate-600/10 text-slate-400 border-slate-600/20',
  ended: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  paused: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

const statusLabels: Record<StatusType, string> = {
  success: '成功',
  warning: '警告',
  error: '错误',
  info: '信息',
  pending: '待确认',
  confirmed: '已确认',
  cancelled: '已取消',
  active: '进行中',
  inactive: '已结束',
  draft: '草稿',
  ended: '已结束',
  paused: '已暂停',
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      statusStyles[status],
      className
    )}>
      {children || statusLabels[status]}
    </span>
  )
}
