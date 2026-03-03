'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LanguagesCulturalPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="文化适配审核"
        description="确保内容符合目标文化习惯"
      />

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">文化适配检查清单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { item: '节日习俗表述', status: '通过' },
              { item: '颜色象征意义', status: '通过' },
              { item: '数字文化禁忌', status: '需调整' },
              { item: '餐饮礼仪描述', status: '通过' },
              { item: '宗教敏感内容', status: '通过' },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">{check.item}</span>
                <span className={check.status === '通过' ? 'text-emerald-400' : 'text-yellow-400'}>
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
