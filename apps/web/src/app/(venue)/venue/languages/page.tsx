'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Languages,
  Sparkles,
  Edit
} from 'lucide-react'
import { useState } from 'react'

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', status: 'published', completion: 100 },
  { code: 'en', name: 'English', flag: '🇺🇸', status: 'published', completion: 100 },
  { code: 'ja', name: '日本語', flag: '🇯🇵', status: 'review', completion: 95 },
  { code: 'ko', name: '한국어', flag: '🇰🇷', status: 'draft', completion: 60 },
  { code: 'es', name: 'Español', flag: '🇪🇸', status: 'draft', completion: 40 },
]

const recentTranslations = [
  { id: 1, content: '老北京茶馆品茗体验', type: '活动标题', languages: 3, date: '2024-03-15' },
  { id: 2, content: '京剧脸谱绘制工作坊', type: '活动标题', languages: 5, date: '2024-03-14' },
  { id: 3, content: '胡同文化深度游', type: '路线介绍', languages: 4, date: '2024-03-12' },
]

export default function VenueLanguagesPage() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="p-8">
      <PageHeader
        title="多语言内容"
        description="管理店铺的多语言内容"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-sm text-slate-400">支持语言</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Languages className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">2</p>
                <p className="text-sm text-slate-400">已发布</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">1</p>
                <p className="text-sm text-slate-400">审核中</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-400">2</p>
                <p className="text-sm text-slate-400">草稿</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 语言状态 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-400" />
                语言进度
              </CardTitle>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Sparkles className="w-4 h-4 mr-2" />
                AI一键翻译
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.code} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <span className="font-medium text-white">{lang.name}</span>
                        {lang.status === 'published' && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            已发布
                          </Badge>
                        )}
                        {lang.status === 'review' && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            审核中
                          </Badge>
                        )}
                        {lang.status === 'draft' && (
                          <Badge className="bg-slate-700 text-slate-400">
                            草稿
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">{lang.completion}%</span>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={lang.completion} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 最近翻译 */}
          <Card className="bg-slate-900 border-slate-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white">最近翻译</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTranslations.map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 bg-slate-800/50 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{item.content}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                        <span>{item.type}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
                      {item.languages} 种语言
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Sparkles className="w-4 h-4 mr-2" />
                批量翻译
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                导入翻译
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                导出文件
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">翻译提示</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-400 space-y-2">
              <p>• 中文修改后会触发重新翻译</p>
              <p>• AI翻译准确率约 95%</p>
              <p>• 重要内容建议人工审核</p>
              <p>• 专业术语可添加到术语库</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
