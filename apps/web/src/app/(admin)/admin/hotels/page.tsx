'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 重定向到详细列表页
export default function AdminHotelsRedirectPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/admin/hotels/list')
  }, [router])
  
  return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="text-slate-400">正在跳转到酒店列表...</div>
    </div>
  )
}
