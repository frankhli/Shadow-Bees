'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, CheckCircle, AlertTriangle } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', total: 1245, reviewed: 1230 },
  { code: 'es', name: 'Español', flag: '🇪🇸', total: 980, reviewed: 875 },
  { code: 'fr', name: 'Français', flag: '🇫🇷', total: 920, reviewed: 820 },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', total: 850, reviewed: 720 },
  { code: 'ja', name: '日本語', flag: '🇯🇵', total: 890, reviewed: 850 },
]

export default function AdminLanguagesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="多语言管理"
        description="五语内容审核与质量管理"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                语言审核进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.code} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p className="text-white font-medium">{lang.name}</p>
                        <p className="text-sm text-slate-400">{lang.reviewed} / {lang.total} 已审核</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: `${(lang.reviewed / lang.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400">{Math.round((lang.reviewed / lang.total) * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">待处理事项</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300">待审核内容</span>
                </div>
                <span className="text-yellow-400 font-medium">420</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">已通过</span>
                </div>
                <span className="text-emerald-400 font-medium">4,495</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">翻译质量评分</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">准确性</span>
                  <span className="text-emerald-400">96%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">流畅度</span>
                  <span className="text-emerald-400">94%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">文化适配</span>
                  <span className="text-yellow-400">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
