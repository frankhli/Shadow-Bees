'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Globe } from 'lucide-react'

const pendingReviews = [
  { id: 1, zh: '北京四合院精品酒店', en: 'Beijing Courtyard Boutique Hotel', ja: '北京四合院ブティックホテル', status: 'pending', type: '酒店名称' },
  { id: 2, zh: '步行5分钟到故宫', en: '5-minute walk to Forbidden City', ja: '故宮まで徒歩5分', status: 'pending', type: '位置描述' },
  { id: 3, zh: '免费早餐', en: 'Free breakfast', ja: '無料朝食', status: 'approved', type: '设施' },
]

export default function TranslationReviewPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="翻译审核"
        description="审核AI生成的多语言翻译内容"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">12</p>
              <p className="text-sm text-slate-400">待审核</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">156</p>
              <p className="text-sm text-slate-400">已通过</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5</p>
              <p className="text-sm text-slate-400">已拒绝</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            待审核翻译
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingReviews.map((item) => (
              <div key={item.id} className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-slate-700 text-slate-300">
                    {item.type}
                  </Badge>
                  {item.status === 'approved' ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400">已通过</Badge>
                  ) : (
                    <Badge className="bg-yellow-500/20 text-yellow-400">待审核</Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-slate-900 rounded">
                    <span className="text-xs text-slate-500">🇨🇳 中文</span>
                    <p className="text-white">{item.zh}</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded">
                    <span className="text-xs text-slate-500">🇺🇸 English</span>
                    <p className="text-slate-300">{item.en}</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded">
                    <span className="text-xs text-slate-500">🇯🇵 日本語</span>
                    <p className="text-slate-300">{item.ja}</p>
                  </div>
                </div>
                {item.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      通过
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                      <XCircle className="w-4 h-4 mr-1" />
                      拒绝
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
