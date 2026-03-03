'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Star, Globe, Award } from 'lucide-react'
import { useState } from 'react'

interface Language {
  code: string
  name: string
  flag: string
  level: 'native' | 'fluent' | 'conversational' | 'basic'
  levelLabel: string
  proficiency: number
  isVerified: boolean
  certificates?: string[]
}

const languagesData: Language[] = [
  {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    level: 'native',
    levelLabel: '母语',
    proficiency: 100,
    isVerified: true,
  },
  {
    code: 'en',
    name: '英语',
    flag: '🇺🇸',
    level: 'fluent',
    levelLabel: '流利',
    proficiency: 90,
    isVerified: true,
    certificates: ['TEM-8', 'TOEFL 110'],
  },
  {
    code: 'ja',
    name: '日语',
    flag: '🇯🇵',
    level: 'conversational',
    levelLabel: '日常交流',
    proficiency: 70,
    isVerified: true,
    certificates: ['JLPT N2'],
  },
  {
    code: 'es',
    name: '西班牙语',
    flag: '🇪🇸',
    level: 'basic',
    levelLabel: '基础',
    proficiency: 40,
    isVerified: false,
  },
]

const availableLanguages = [
  { code: 'fr', name: '法语', flag: '🇫🇷' },
  { code: 'de', name: '德语', flag: '🇩🇪' },
  { code: 'ko', name: '韩语', flag: '🇰🇷' },
  { code: 'ru', name: '俄语', flag: '🇷🇺' },
  { code: 'it', name: '意大利语', flag: '🇮🇹' },
]

export default function GuideLanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>(languagesData)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'native': return 'text-emerald-400'
      case 'fluent': return 'text-blue-400'
      case 'conversational': return 'text-yellow-400'
      case 'basic': return 'text-slate-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="语言能力"
        description="管理和展示您的语言技能"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 已掌握语言 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">我的语言</h3>
            <Button className="bg-green-600 hover:bg-green-700">
              <Globe className="w-4 h-4 mr-2" />
              添加语言
            </Button>
          </div>

          <div className="grid gap-4">
            {languages.map((lang) => (
              <Card key={lang.code} className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{lang.flag}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-semibold text-white">{lang.name}</span>
                          {lang.isVerified && (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              已认证
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${getLevelColor(lang.level)}`}>
                            {lang.levelLabel}
                          </span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-400">熟练度 {lang.proficiency}%</span>
                        </div>
                        {lang.certificates && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {lang.certificates.map((cert) => (
                              <Badge 
                                key={cert}
                                variant="outline"
                                className="bg-slate-800 border-slate-700 text-slate-300 text-xs"
                              >
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-32">
                      <Progress value={lang.proficiency} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 游客评价 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                语言服务评价
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-slate-300">John Smith</span>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">"Excellent English skills, very professional guide!"</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇯🇵</span>
                    <span className="text-slate-300">田中太郎</span>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">"日本語が上手で、説明もわかりやすかったです。"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">语言统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-white">{languages.length}</p>
                <p className="text-slate-400">掌握语言</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">流利及以上</span>
                  <span className="text-emerald-400">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">日常交流</span>
                  <span className="text-yellow-400">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">基础水平</span>
                  <span className="text-slate-400">1</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">推荐学习</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-400">
                根据平台游客来源，推荐学习以下语言：
              </p>
              {availableLanguages.slice(0, 3).map((lang) => (
                <div 
                  key={lang.code}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-slate-300">{lang.name}</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                    添加
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">认证优势</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 space-y-2">
              <p>✓ 提升游客信任度</p>
              <p>✓ 获得更多订单推荐</p>
              <p>✓ 解锁高级服务标签</p>
              <p>✓ 提高搜索排名</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
