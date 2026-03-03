'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Globe,
  TrendingUp
} from 'lucide-react'

const chatStats = {
  active: 12,
  waiting: 3,
  resolved: 156,
  avgResponse: '2.3分钟',
  satisfaction: '96%'
}

const activeChats = [
  { id: 1, guest: 'John Smith', flag: '🇺🇸', lang: 'English', status: 'active', waitTime: '1分钟', topic: '预订咨询' },
  { id: 2, guest: '田中太郎', flag: '🇯🇵', lang: '日本語', status: 'waiting', waitTime: '5分钟', topic: '房型询问' },
  { id: 3, guest: 'Marie Dubois', flag: '🇫🇷', lang: 'Français', status: 'low_confidence', waitTime: '3分钟', topic: '价格协商' },
]

export default function AIServiceDashboardPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="客服监控台"
        description="实时监控AI客服对话状态"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400">{chatStats.active}</p>
                <p className="text-xs text-slate-400">进行中</p>
              </div>
              <MessageCircle className="w-8 h-8 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-400">{chatStats.waiting}</p>
                <p className="text-xs text-slate-400">待处理</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-400">{chatStats.resolved}</p>
                <p className="text-xs text-slate-400">今日解决</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{chatStats.avgResponse}</p>
                <p className="text-xs text-slate-400">平均响应</p>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-cyan-400">{chatStats.satisfaction}</p>
                <p className="text-xs text-slate-400">满意度</p>
              </div>
              <Users className="w-8 h-8 text-cyan-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 活跃对话列表 */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">实时对话</CardTitle>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                <Globe className="w-4 h-4 mr-2" />
                全局接管
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{chat.flag}</span>
                      <div>
                        <p className="text-white font-medium">{chat.guest}</p>
                        <p className="text-xs text-slate-400">{chat.lang} · {chat.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {chat.status === 'low_confidence' && (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          AI置信度低
                        </Badge>
                      )}
                      {chat.status === 'waiting' && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          等待中 {chat.waitTime}
                        </Badge>
                      )}
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                        查看
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">语言分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🇺🇸 English</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🇯🇵 日本語</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🇫🇷 Français</span>
                  <span className="text-white">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🇪🇸 Español</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">🇩🇪 Deutsch</span>
                  <span className="text-white">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">AI性能</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">翻译准确率</span>
                <span className="text-emerald-400">96.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">意图识别率</span>
                <span className="text-emerald-400">92.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">人工接管率</span>
                <span className="text-yellow-400">8.7%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
