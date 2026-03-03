'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Trash2, Edit3 } from 'lucide-react'

const initialQA = [
  { id: 1, question: '入住时间是什么时候？', answer: '入住时间为下午2点，退房时间为中午12点。', category: '入住', usage: 156 },
  { id: 2, question: '有免费早餐吗？', answer: '是的，我们提供免费中式早餐，时间为7:00-10:00。', category: '餐饮', usage: 203 },
  { id: 3, question: '可以寄存行李吗？', answer: '当然可以，我们提供免费行李寄存服务。', category: '服务', usage: 89 },
  { id: 4, question: '附近有什么景点？', answer: '步行5分钟可达故宫，10分钟可达天安门和王府井。', category: '周边', usage: 312 },
]

export default function KnowledgePage() {
  const [qaList, setQaList] = useState(initialQA)
  const [search, setSearch] = useState('')

  const filteredQA = qaList.filter(qa => 
    qa.question.includes(search) || qa.answer.includes(search)
  )

  return (
    <div className="p-8">
      <PageHeader
        title="知识库管理"
        description="管理AI客服使用的知识库问答"
      />

      {/* 工具栏 */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            placeholder="搜索问答..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          添加问答
        </Button>
      </div>

      {/* 分类标签 */}
      <div className="flex gap-2 mb-6">
        <Badge className="bg-cyan-500/20 text-cyan-400 cursor-pointer">全部</Badge>
        <Badge variant="outline" className="border-slate-700 text-slate-400 cursor-pointer">入住</Badge>
        <Badge variant="outline" className="border-slate-700 text-slate-400 cursor-pointer">餐饮</Badge>
        <Badge variant="outline" className="border-slate-700 text-slate-400 cursor-pointer">服务</Badge>
        <Badge variant="outline" className="border-slate-700 text-slate-400 cursor-pointer">周边</Badge>
      </div>

      {/* 问答列表 */}
      <div className="space-y-4">
        {filteredQA.map((qa) => (
          <Card key={qa.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                      {qa.category}
                    </Badge>
                    <span className="text-xs text-slate-500">被使用 {qa.usage} 次</span>
                  </div>
                  <h3 className="text-white font-medium mb-2">{qa.question}</h3>
                  <p className="text-slate-400 text-sm">{qa.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
