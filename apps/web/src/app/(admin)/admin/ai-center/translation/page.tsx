'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  Languages,
  TrendingUp,
  Filter,
  RefreshCw,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Search,
  Download,
  Settings,
  BarChart3,
  Type,
  MessageSquare,
  Mic,
  FileText,
  ArrowRightLeft,
  Clock,
  Zap
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TranslationMonitorPage() {
  const translationRecords = [
    {
      id: 1,
      sourceLang: 'zh',
      targetLang: 'en',
      sourceText: '豪华海景套房，配备顶级设施',
      translatedText: 'Luxury sea-view suite with top-tier amenities',
      accuracy: 96,
      type: '房型描述',
      engine: 'AI Neural',
      timestamp: '2024-01-15 14:30:25',
      duration: '0.8s',
      confidence: 0.94
    },
    {
      id: 2,
      sourceLang: 'en',
      targetLang: 'ja',
      sourceText: 'Check-in time is 3:00 PM',
      translatedText: 'チェックイン時間は午後3時です',
      accuracy: 98,
      type: '预订信息',
      engine: 'AI Neural',
      timestamp: '2024-01-15 14:28:12',
      duration: '0.6s',
      confidence: 0.97
    },
    {
      id: 3,
      sourceLang: 'zh',
      targetLang: 'ko',
      sourceText: '提供免费早餐和WiFi',
      translatedText: '묣료 아침 식사와 WiFi 제공',
      accuracy: 72,
      type: '设施说明',
      engine: 'AI Neural',
      timestamp: '2024-01-15 14:25:48',
      duration: '1.2s',
      confidence: 0.68
    },
    {
      id: 4,
      sourceLang: 'fr',
      targetLang: 'zh',
      sourceText: 'Chambre double avec vue sur la mer',
      translatedText: '海景双人间',
      accuracy: 94,
      type: '房型描述',
      engine: 'AI Neural',
      timestamp: '2024-01-15 14:22:15',
      duration: '0.9s',
      confidence: 0.92
    },
    {
      id: 5,
      sourceLang: 'zh',
      targetLang: 'es',
      sourceText: '包含健身房和游泳池使用权',
      translatedText: 'Incluye acceso al gimnasio y piscina',
      accuracy: 91,
      type: '服务说明',
      engine: 'AI Neural',
      timestamp: '2024-01-15 14:20:33',
      duration: '0.7s',
      confidence: 0.89
    }
  ]

  const languageStats = [
    { lang: '中文', code: 'zh', translations: 3245, accuracy: 94.2, volume: 45 },
    { lang: '英语', code: 'en', translations: 2890, accuracy: 96.5, volume: 40 },
    { lang: '日语', code: 'ja', translations: 1245, accuracy: 92.8, volume: 18 },
    { lang: '韩语', code: 'ko', translations: 890, accuracy: 89.5, volume: 12 },
    { lang: '法语', code: 'fr', translations: 567, accuracy: 93.2, volume: 8 },
    { lang: '德语', code: 'de', translations: 423, accuracy: 91.8, volume: 6 },
    { lang: '西班牙语', code: 'es', translations: 378, accuracy: 90.5, volume: 5 },
    { lang: '泰语', code: 'th', translations: 234, accuracy: 87.3, volume: 3 }
  ]

  const translationTypes = [
    { type: '房型描述', count: 1245, accuracy: 94.5 },
    { type: '设施说明', count: 980, accuracy: 93.2 },
    { type: '预订信息', count: 1456, accuracy: 96.8 },
    { type: '服务条款', count: 567, accuracy: 95.5 },
    { type: '客户对话', count: 2345, accuracy: 91.2 },
    { type: '营销文案', count: 890, accuracy: 89.5 }
  ]

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-emerald-400'
    if (accuracy >= 85) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getAccuracyBg = (accuracy: number) => {
    if (accuracy >= 95) return 'bg-emerald-500'
    if (accuracy >= 85) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="p-8">
      <PageHeader
        title="实时翻译监控"
        description="监控AI翻译服务质量和多语言支持情况"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="今日翻译量"
          value="9,284"
          trend="+15% 较昨日"
          trendUp={true}
          icon={Languages}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="平均准确率"
          value="94.8%"
          trend="+1.2% 优化"
          trendUp={true}
          icon={CheckCircle2}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="平均响应时间"
          value="0.8s"
          trend="-0.2s 提升"
          trendUp={true}
          icon={Zap}
          iconColor="bg-yellow-500"
        />
        <StatCard
          title="支持语言"
          value="28"
          subtitle="覆盖全球主要市场"
          icon={Globe}
          iconColor="bg-blue-500"
        />
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="records" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="records" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Type className="w-4 h-4 mr-2" />
            翻译记录
          </TabsTrigger>
          <TabsTrigger value="languages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            语言统计
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            性能分析
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            翻译设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-6">
          {/* 筛选工具栏 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="搜索翻译内容..." 
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[130px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="源语言" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">英语</SelectItem>
                    <SelectItem value="ja">日语</SelectItem>
                    <SelectItem value="ko">韩语</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[130px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="目标语言" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="en">英语</SelectItem>
                    <SelectItem value="ja">日语</SelectItem>
                    <SelectItem value="ko">韩语</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Filter className="w-4 h-4 mr-2" />
                  筛选
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  刷新
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 翻译记录列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                  实时翻译记录
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  导出记录
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {translationRecords.map((record) => (
                  <div 
                    key={record.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                          {record.type}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-slate-700 text-slate-300">{record.sourceLang.toUpperCase()}</Badge>
                          <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                          <Badge className="bg-purple-500/20 text-purple-400">{record.targetLang.toUpperCase()}</Badge>
                        </div>
                        <span className="text-xs text-slate-500">{record.engine}</span>
                      </div>
                      <span className="text-xs text-slate-500">{record.timestamp}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">原文</p>
                        <p className="text-slate-300 text-sm">{record.sourceText}</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">译文</p>
                        <p className="text-purple-300 text-sm">{record.translatedText}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">准确率</span>
                          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${getAccuracyBg(record.accuracy)}`}
                              style={{ width: `${record.accuracy}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${getAccuracyColor(record.accuracy)}`}>
                            {record.accuracy}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-xs text-slate-400">{record.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">置信度</span>
                          <span className="text-xs text-slate-300">{(record.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          <Eye className="w-4 h-4 mr-1" />
                          详情
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 语言分布 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-400" />
                  语言使用分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {languageStats.map((lang) => (
                    <div key={lang.code} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">{lang.lang}</span>
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {lang.code.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 text-sm">{lang.translations.toLocaleString()} 次</span>
                          <span className={`text-sm font-medium ${
                            lang.accuracy >= 95 ? 'text-emerald-400' : 
                            lang.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {lang.accuracy}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{ width: `${lang.volume}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 翻译类型分布 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  内容类型统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {translationTypes.map((type) => (
                    <div key={type.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{type.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 text-sm">{type.count.toLocaleString()} 条</span>
                          <span className={`text-sm font-medium ${
                            type.accuracy >= 95 ? 'text-emerald-400' : 
                            type.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {type.accuracy}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${(type.count / 2500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 热门语言对 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                热门语言对
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { from: '中文', to: '英语', count: 1245, accuracy: 95.2 },
                  { from: '英语', to: '中文', count: 980, accuracy: 94.8 },
                  { from: '中文', to: '日语', count: 567, accuracy: 92.5 },
                  { from: '日语', to: '中文', count: 432, accuracy: 91.8 },
                  { from: '英语', to: '日语', count: 345, accuracy: 93.2 },
                  { from: '中文', to: '韩语', count: 298, accuracy: 89.5 },
                  { from: '韩语', to: '中文', count: 234, accuracy: 88.2 },
                  { from: '法语', to: '中文', count: 189, accuracy: 92.1 }
                ].map((pair, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge className="bg-slate-700 text-slate-300">{pair.from}</Badge>
                      <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                      <Badge className="bg-purple-500/20 text-purple-400">{pair.to}</Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white">{pair.count}</p>
                      <p className="text-xs text-slate-400">翻译次数</p>
                    </div>
                    <div className="mt-2 text-center">
                      <span className={`text-sm font-medium ${
                        pair.accuracy >= 95 ? 'text-emerald-400' : 
                        pair.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {pair.accuracy}% 准确率
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 性能指标 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  性能指标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">平均响应时间</span>
                      <span className="text-emerald-400 font-medium">0.82s</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-slate-500 mt-2">目标: 1.0s</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">系统可用性</span>
                      <span className="text-emerald-400 font-medium">99.98%</span>
                    </div>
                    <Progress value={99.98} className="h-2" />
                    <p className="text-xs text-slate-500 mt-2">目标: 99.9%</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">并发处理能力</span>
                      <span className="text-purple-400 font-medium">2,450/s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-slate-500 mt-2">峰值: 3,000/s</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 24小时趋势 */}
            <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  24小时翻译趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-around p-4">
                  {[
                    { hour: '00', volume: 180, accuracy: 94 },
                    { hour: '02', volume: 120, accuracy: 95 },
                    { hour: '04', volume: 90, accuracy: 95 },
                    { hour: '06', volume: 150, accuracy: 94 },
                    { hour: '08', volume: 320, accuracy: 93 },
                    { hour: '10', volume: 480, accuracy: 94 },
                    { hour: '12', volume: 520, accuracy: 95 },
                    { hour: '14', volume: 580, accuracy: 95 },
                    { hour: '16', volume: 450, accuracy: 94 },
                    { hour: '18', volume: 420, accuracy: 94 },
                    { hour: '20', volume: 380, accuracy: 93 },
                    { hour: '22', volume: 250, accuracy: 94 }
                  ].map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className="relative w-full flex items-end justify-center gap-1 h-48">
                        <div 
                          className="w-3 bg-purple-500/60 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${(data.volume / 600) * 100}%` }}
                        />
                        <div 
                          className="w-3 bg-emerald-500/60 rounded-t transition-all hover:bg-emerald-500"
                          style={{ height: `${data.accuracy * 0.4}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{data.hour}:00</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded" />
                    <span className="text-sm text-slate-400">翻译量</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded" />
                    <span className="text-sm text-slate-400">准确率</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 错误分析 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-400" />
                翻译质量分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">术语错误</span>
                    <Badge className="bg-red-500/20 text-red-400">23</Badge>
                  </div>
                  <Progress value={23} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 0.25%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">语法错误</span>
                    <Badge className="bg-orange-500/20 text-orange-400">18</Badge>
                  </div>
                  <Progress value={18} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 0.19%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">语境偏差</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">45</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 0.48%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">格式错误</span>
                    <Badge className="bg-blue-500/20 text-blue-400">12</Badge>
                  </div>
                  <Progress value={12} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 0.13%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                翻译引擎设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">翻译引擎选择</h4>
                  <p className="text-slate-400 text-sm mb-4">选择默认使用的AI翻译引擎</p>
                  <Select defaultValue="neural">
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="neural">AI Neural (推荐)</SelectItem>
                      <SelectItem value="transformer">Transformer V3</SelectItem>
                      <SelectItem value="legacy">Legacy Engine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">术语库管理</h4>
                  <p className="text-slate-400 text-sm mb-4">配置专业术语和自定义翻译</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">已启用术语库</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">8 个</Badge>
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">质量阈值设置</h4>
                  <p className="text-slate-400 text-sm mb-4">设置翻译质量告警阈值</p>
                  <div className="flex items-center gap-4">
                    <Progress value={85} className="flex-1 h-3" />
                    <span className="text-white font-medium w-12">85%</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">自动语言检测</h4>
                  <p className="text-slate-400 text-sm mb-4">自动识别源语言</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">检测准确率</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">98.5%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
