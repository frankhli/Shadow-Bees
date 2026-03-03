'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  showBack?: boolean
}

export function PageHeader({ title, description, children, showBack = false }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-2">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      {description && (
        <p className="text-slate-400 ml-0">{description}</p>
      )}
      {children && (
        <div className="mt-4">{children}</div>
      )}
    </div>
  )
}
