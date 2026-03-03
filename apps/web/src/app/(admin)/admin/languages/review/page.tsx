'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle } from 'lucide-react'

export default function LanguagesReviewPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="五语内容审核"
        description="审核多语言内容质量"
      />

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">待审核内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: '北京故宫介绍 - 英文版', source: 'AI生成', status: 'pending' },
              { title: '胡同游览路线 - 日文版', source: '人工翻译', status: 'approved' },
              { title: '烤鸭推荐 - 法文版', source: 'AI生成', status: 'rejected' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.source}</p>
                </div>
                {item.status === 'approved' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : item.status === 'rejected' ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">待审核</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
