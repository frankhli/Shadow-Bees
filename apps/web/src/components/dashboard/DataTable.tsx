'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataTableProps {
  children: ReactNode
  className?: string
}

interface DataTableHeaderProps {
  children: ReactNode
  className?: string
}

interface DataTableRowProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

interface DataTableCellProps {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function DataTable({ children, className }: DataTableProps) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn('w-full text-sm text-left', className)}>
        {children}
      </table>
    </div>
  )
}

export function DataTableHeader({ children, className }: DataTableHeaderProps) {
  return (
    <thead className={cn('bg-slate-800 text-slate-400 uppercase text-xs', className)}>
      {children}
    </thead>
  )
}

export function DataTableBody({ children, className }: DataTableProps) {
  return (
    <tbody className={cn('divide-y divide-slate-800', className)}>
      {children}
    </tbody>
  )
}

export function DataTableRow({ children, className, onClick }: DataTableRowProps) {
  return (
    <tr 
      className={cn(
        'hover:bg-slate-800/50 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function DataTableCell({ children, className, align = 'left' }: DataTableCellProps) {
  return (
    <td className={cn(
      'px-6 py-4 whitespace-nowrap text-slate-300',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}>
      {children}
    </td>
  )
}

export function DataTableHead({ children, className, align = 'left' }: DataTableCellProps) {
  return (
    <th className={cn(
      'px-6 py-3 font-medium',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}>
      {children}
    </th>
  )
}
