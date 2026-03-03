'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Copy } from 'lucide-react'

const phrases = [
  { id: 1, zh: '欢迎来到北京！', en: 'Welcome to Beijing!', ja: '北京へようこそ！', category: '问候' },
  { id: 2, zh: '我是您的导游，今天由我为您讲解。', en: 'I am your guide, and I will explain everything to you today.', ja: 'ガイドの者です。今日は私がご案内いたします。', category: '自我介绍' },
  { id: 3, zh: '请跟我来。', en: 'Please follow me.', ja: 'こちらへどうぞ。', category: '引导' },
  { id: 4, zh: '故宫建于明朝，有600年历史。', en: 'The Forbidden City was built in the Ming Dynasty, with a history of 600 years.', ja: '紫禁城は明代に建てられ、600年の歴史があります。', category: '讲解' },
  { id: 5, zh: '您有什么问题吗？', en: 'Do you have any questions?', ja: '何か質問はありますか？', category: '互动' },
]

export default function ServicePhrasesPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="服务用语库"
        description="管理常用的多语言服务用语"
      />

      <div className="flex justify-end mb-6">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          添加用语
        </Button>
      </div>

      <div className="space-y-4">
        {phrases.map((phrase) => (
          <Card key={phrase.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="outline" className="bg-slate-800 text-slate-300">
                  {phrase.category}
                </Badge>
                <Button size="sm" variant="ghost" className="text-slate-400">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-xs text-slate-500">🇨🇳</span>
                  <p className="text-white">{phrase.zh}</p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-xs text-slate-500">🇺🇸</span>
                  <p className="text-slate-300">{phrase.en}</p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <span className="text-xs text-slate-500">🇯🇵</span>
                  <p className="text-slate-300">{phrase.ja}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
