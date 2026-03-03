'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Globe } from 'lucide-react'

const translations = [
  { id: 1, key: 'hotel_name', zh: '北京四合院精品酒店', en: 'Beijing Courtyard Boutique Hotel', es: 'Hotel Boutique Courtyard de Pekín', fr: 'Hôtel Boutique Courtyard de Pékin', ja: '北京四合院ブティックホテル', status: 'approved' },
  { id: 2, key: 'description', zh: '体验正宗老北京生活', en: 'Experience authentic old Beijing life', es: 'Experimente la auténtica vida antigua de Pekín', fr: 'Vivez la vie authentique du vieux Pékin', ja: '本場の老北京ライフを体験', status: 'approved' },
  { id: 3, key: 'amenity_wifi', zh: '免费WiFi', en: 'Free WiFi', es: 'WiFi gratuito', fr: 'WiFi gratuit', ja: '無料WiFi', status: 'approved' },
  { id: 4, key: 'amenity_breakfast', zh: '免费早餐', en: 'Free Breakfast', es: 'Desayuno gratis', fr: 'Petit-déjeuner gratuit', ja: '無料朝食', status: 'pending' },
]

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', status: 'completed' },
  { code: 'en', name: 'English', flag: '🇺🇸', status: 'completed' },
  { code: 'es', name: 'Español', flag: '🇪🇸', status: 'completed' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', status: 'completed' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', status: 'completed' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', status: 'pending' },
]

export default function TranslationsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="多语言翻译管理"
        description="管理酒店信息的多语言版本"
      />

      {/* 语言进度 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            翻译进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  lang.status === 'completed' 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-white">{lang.name}</span>
                {lang.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 翻译列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">翻译内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">中文</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">English</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Español</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">状态</th>
                </tr>
              </thead>
              <tbody>
                {translations.map((t) => (
                  <tr key={t.id} className="border-b border-slate-800/50">
                    <td className="py-3 px-4 text-white">{t.zh}</td>
                    <td className="py-3 px-4 text-slate-300">{t.en}</td>
                    <td className="py-3 px-4 text-slate-300">{t.es}</td>
                    <td className="py-3 px-4">
                      {t.status === 'approved' ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400">已通过</Badge>
                      ) : (
                        <Badge className="bg-yellow-500/20 text-yellow-400">待审核</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
