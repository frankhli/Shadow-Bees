'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock } from 'lucide-react'

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', level: '母语', certified: true },
  { code: 'en', name: 'English', flag: '🇺🇸', level: '专业级', certified: true },
  { code: 'ja', name: '日本語', flag: '🇯🇵', level: '高级', certified: true },
  { code: 'es', name: 'Español', flag: '🇪🇸', level: '中级', certified: false },
  { code: 'fr', name: 'Français', flag: '🇫🇷', level: '中级', certified: false },
]

export default function LanguageSkillsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="语言能力认证"
        description="管理您的语言技能和服务能力"
      />

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">语言认证状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {languages.map((lang) => (
              <div 
                key={lang.code} 
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <p className="text-white font-medium">{lang.name}</p>
                    <p className="text-sm text-slate-400">{lang.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {lang.certified ? (
                    <>
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        已认证
                      </Badge>
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                        查看证书
                      </Button>
                    </>
                  ) : (
                    <>
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        <Clock className="w-3 h-3 mr-1" />
                        待认证
                      </Badge>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        申请认证
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
