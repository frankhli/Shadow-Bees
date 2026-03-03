'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, MapPin, Clock, Plus, Edit } from 'lucide-react'
import { useState } from 'react'

interface Route {
  id: string
  name: string
  duration: string
  spots: string[]
  description: string
  highlights: string[]
}

const defaultRoutes: Route[] = [
  {
    id: '1',
    name: '皇城精华游',
    duration: '4小时',
    spots: ['天安门广场', '故宫博物院', '景山公园'],
    description: '深度游览明清皇家建筑群，感受千年帝王之气',
    highlights: ['故宫深度讲解', '景山俯瞰全景', '皇家建筑文化'],
  },
  {
    id: '2',
    name: '胡同生活游',
    duration: '3小时',
    spots: ['南锣鼓巷', '什刹海', '烟袋斜街'],
    description: '走进老北京胡同，体验地道的市井生活',
    highlights: ['胡同漫步', '四合院探访', '地道小吃'],
  },
]

export default function GuideAIProfileRoutesPage() {
  const [routes, setRoutes] = useState<Route[]>(defaultRoutes)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="路线文案生成"
        description="创建特色游览路线，AI生成多语言介绍"
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            新建路线
          </Button>
        </div>
        <Button 
          variant="outline" 
          className="border-green-500 text-green-400"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? 'AI生成中...' : 'AI推荐路线'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{route.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {route.spots.length}个景点
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-slate-300 mb-4">{route.description}</p>

              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">游览景点:</p>
                <div className="flex flex-wrap gap-2">
                  {route.spots.map((spot) => (
                    <Badge 
                      key={spot}
                      variant="outline"
                      className="bg-slate-800 border-slate-700 text-slate-300"
                    >
                      {spot}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">路线亮点:</p>
                <div className="flex flex-wrap gap-2">
                  {route.highlights.map((highlight) => (
                    <Badge 
                      key={highlight}
                      className="bg-green-500/20 text-green-400 border-green-500/30"
                    >
                      ✨ {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleGenerate}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  生成五语文案
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-slate-700 text-slate-300"
                >
                  编辑详情
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 添加新路线卡片 */}
        <Card className="bg-slate-900 border-slate-800 border-dashed border-slate-700">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 mb-4">创建新的游览路线</p>
            <Button className="bg-green-600 hover:bg-green-700">
              开始创建
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
