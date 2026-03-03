'use client'

import { useState } from 'react'
import { Download, FileSpreadsheet, FileJson, Loader2 } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'
import { useToast } from '@/stores/toastStore'
import { exportData, ExportFormat } from '@/lib/export-utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ExportButtonProps {
  data: Record<string, any>[]
  filename?: string
  disabled?: boolean
  color?: string
  variant?: 'filled' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ExportButton({
  data,
  filename = 'export',
  disabled = false,
  color = '#8B9AAF',
  variant = 'outline',
  size = 'sm',
  className,
}: ExportButtonProps) {
  const toast = useToast()
  const [exporting, setExporting] = useState(false)

  const handleExport = async (format: ExportFormat) => {
    if (data.length === 0) {
      toast.warning('没有可导出的数据')
      return
    }

    setExporting(true)
    try {
      const success = exportData(data, {
        format,
        filename: `${filename}_${new Date().toISOString().split('T')[0]}.${format}`,
      })
      
      if (success) {
        toast.success('导出成功', `已下载 ${format.toUpperCase()} 文件`)
      } else {
        toast.error('导出失败', '请稍后重试')
      }
    } catch (error) {
      toast.error('导出失败', '请稍后重试')
    } finally {
      setExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GlowButton
          color={color}
          variant={variant}
          size={size}
          disabled={disabled || exporting}
          className={className}
          icon={exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        >
          {exporting ? '导出中...' : '导出'}
        </GlowButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#141B2D] border-white/10">
        <DropdownMenuItem
          onClick={() => handleExport('csv')}
          className="text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-400" />
          导出为 CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport('json')}
          className="text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
        >
          <FileJson className="w-4 h-4 mr-2 text-blue-400" />
          导出为 JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
