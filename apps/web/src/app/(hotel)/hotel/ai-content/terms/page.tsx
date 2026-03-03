'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Trash2 } from 'lucide-react'

const terms = [
  { id: 1, zh: '胡同', en: 'Hutong', es: 'Hutong', fr: 'Hutong', ja: '胡同', category: '地标' },
  { id: 2, zh: '四合院', en: 'Siheyuan', es: 'Siheyuan', fr: 'Cour carrée', ja: '四合院', category: '建筑' },
  { id: 3, zh: '故宫', en: 'Forbidden City', es: 'Ciudad Prohibida', fr: 'Cité interdite', ja: '紫禁城', category: '景点' },
  { id: 4, zh: '长城', en: 'Great Wall', es: 'Gran Muralla', fr: 'Grande Muraille', ja: '万里の長城', category: '景点' },
  { id: 5, zh: '天坛', en: 'Temple of Heaven', es: 'Templo del Cielo', fr: 'Temple du Ciel', ja: '天壇', category: '景点' },
]

export default function TermsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="术语库"
        description="管理多语言专业术语和翻译标准"
      />

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            placeholder="搜索术语..."
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          添加术语
        </Button>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">核心术语对照表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">分类</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">中文</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">English</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Español</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Français</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">日本語</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">操作</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term) => (
                  <tr key={term.id} className="border-b border-slate-800/50">
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">
                        {term.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{term.zh}</td>
                    <td className="py-3 px-4 text-slate-300">{term.en}</td>
                    <td className="py-3 px-4 text-slate-300">{term.es}</td>
                    <td className="py-3 px-4 text-slate-300">{term.fr}</td>
                    <td className="py-3 px-4 text-slate-300">{term.ja}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
