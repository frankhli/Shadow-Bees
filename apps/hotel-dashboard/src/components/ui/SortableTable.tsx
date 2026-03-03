/**
 * 可排序表格组件 - 参考 shadow-bees 改造
 */

import { useState, useMemo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react'

export type SortDirection = 'asc' | 'desc' | null

export interface SortConfig<T> {
  key: keyof T | string
  direction: SortDirection
}

export interface Column<T> {
  key: keyof T | string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (row: T, index: number) => ReactNode
  sorter?: (a: T, b: T) => number
}

interface SortableTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  loadingRows?: number
  emptyMessage?: string
  onRowClick?: (row: T, index: number) => void
  rowClassName?: (row: T, index: number) => string
  defaultSort?: SortConfig<T>
  rowKey: keyof T | ((row: T) => string)
}

export function SortableTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  loadingRows = 5,
  emptyMessage = '暂无数据',
  onRowClick,
  rowClassName,
  defaultSort,
  rowKey,
}: SortableTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>(defaultSort)

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return

    const key = column.key
    let direction: SortDirection = 'asc'

    if (sortConfig?.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc'
      } else if (sortConfig.direction === 'desc') {
        direction = null
      }
    }

    setSortConfig(direction ? { key, direction } : undefined)
  }

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null

    if (sortConfig?.key !== column.key || !sortConfig.direction) {
      return <ArrowUpDown size={14} className="text-gray-600 opacity-0 group-hover:opacity-50 transition-opacity" />
    }

    return sortConfig.direction === 'asc'
      ? <ChevronUp size={14} className="text-neon-cyan" />
      : <ChevronDown size={14} className="text-neon-cyan" />
  }

  const sortedData = useMemo(() => {
    if (!sortConfig || !sortConfig.direction) return data

    const { key, direction } = sortConfig
    const column = columns.find(c => c.key === key)

    return [...data].sort((a, b) => {
      let comparison = 0

      if (column?.sorter) {
        comparison = column.sorter(a, b)
      } else {
        const aVal = a[key as keyof T]
        const bVal = b[key as keyof T]

        if (aVal === null || aVal === undefined) return 1
        if (bVal === null || bVal === undefined) return -1

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal, 'zh-CN')
        } else if (aVal instanceof Date && bVal instanceof Date) {
          comparison = aVal.getTime() - bVal.getTime()
        } else {
          comparison = String(aVal).localeCompare(String(bVal), 'zh-CN')
        }
      }

      return direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortConfig, columns])

  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    return String(row[rowKey] ?? index)
  }

  // 加载状态
  if (loading) {
    return (
      <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-900">
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)} className="py-3 px-4">
                    <div className="h-3.5 bg-dark-600 rounded w-16 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {Array.from({ length: loadingRows }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={String(col.key)} className="py-4 px-4">
                      <div className={`h-4 bg-dark-600 rounded animate-pulse ${colIdx === 0 ? 'w-24' : 'w-16'}`} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // 空状态
  if (data.length === 0) {
    return (
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-12">
        <div className="text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`
                    py-3 px-4 text-left text-xs font-medium text-gray-400
                    ${column.sortable ? 'cursor-pointer hover:text-white group' : ''}
                    ${column.align === 'center' ? 'text-center' : ''}
                    ${column.align === 'right' ? 'text-right' : ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className={`
                    flex items-center gap-1
                    ${column.align === 'center' ? 'justify-center' : ''}
                    ${column.align === 'right' ? 'justify-end' : ''}
                  `}>
                    {column.title}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {sortedData.map((row, index) => (
              <motion.tr
                key={getRowKey(row, index)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`
                  hover:bg-dark-700 transition-colors
                  ${onRowClick ? 'cursor-pointer' : ''}
                  ${rowClassName ? rowClassName(row, index) : ''}
                `}
                onClick={() => onRowClick?.(row, index)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`
                      py-4 px-4 text-sm text-gray-300
                      ${column.align === 'center' ? 'text-center' : ''}
                      ${column.align === 'right' ? 'text-right' : ''}
                    `}
                  >
                    {column.render
                      ? column.render(row, index)
                      : String(row[column.key as keyof T] ?? '-')
                    }
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
