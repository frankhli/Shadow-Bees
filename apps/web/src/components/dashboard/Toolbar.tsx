'use client'

import { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolbarProps {
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  onFilter?: () => void
  onAdd?: () => void
  addLabel?: string
  children?: ReactNode
  className?: string
}

export function Toolbar({
  searchPlaceholder = '搜索...',
  onSearch,
  onFilter,
  onAdd,
  addLabel = '新增',
  children,
  className,
}: ToolbarProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4 mb-6', className)}>
      {/* Search */}
      {onSearch && (
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}

      {/* Custom Children */}
      {children}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onFilter && (
          <Button
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={onFilter}
          >
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
        )}
        {onAdd && (
          <Button
            className="bg-cyan-600 hover:bg-cyan-700"
            onClick={onAdd}
          >
            <Plus className="w-4 h-4 mr-2" />
            {addLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
