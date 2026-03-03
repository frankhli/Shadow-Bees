'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LanguagesQualityPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="翻译质量检测"
        description="自动化质量评估与改进建议"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">质量评分</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['English', 'Español', 'Français', 'Deutsch', '日本語'].map((lang, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slate-300">{lang}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${90 + Math.random() * 8}%` }} />
                  </div>
                  <span className="text-emerald-400 text-sm">{(90 + Math.random() * 8).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">改进建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <p className="text-sm text-yellow-200">日文版：建议使用更正式的敬语</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <p className="text-sm text-blue-200">德文版：名词大小写需统一</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
