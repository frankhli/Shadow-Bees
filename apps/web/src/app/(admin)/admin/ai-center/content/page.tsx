'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Sparkles,
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
  MessageSquare,
  Image as ImageIcon,
  Video
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ContentReviewPage() {
  const reviewItems = [
    {
      id: 1,
      type: '酒店描述',
      content: '豪华海景套房，配备顶级设施，尽享无敌海景...',
      status: 'pending',
      aiScore: 92,
      createdAt: '2024-01-15 14:30',
      author: 'AI生成器',
      language: '中文'
    },
    {
      id: 2,
      type: '房型介绍',
      content: 'Standard Room with city view, comfortable bed...',
      status: 'approved',
      aiScore: 88,
      createdAt: '2024-01-15 13:45',
      author: 'AI生成器',
      language: '英文'
    },
    {
      id: 3,
      type: '周边推荐',
      content: '附近有大量餐厅和购物中心，交通便利...',
      status: 'rejected',
      aiScore: 65,
      createdAt: '2024-01-15 12:20',
      author: 'AI生成器',
      language: '中文'
    },
    {
      id: 4,
      type: '设施说明',
      content: 'Free WiFi, swimming pool, gym access...',
      status: 'pending',
      aiScore: 95,
      createdAt: '2024-01-15 11:15',
      author: 'AI生成器',
      language: '英文'
    },
    {
      id: 5,
      type: '促销文案',
      content: '限时特惠，预订即享8折优惠，含双人早餐...',
      status: 'approved',
      aiScore: 90,
      createdAt: '2024-01-15 10:30',
      author: 'AI生成器',
      language: '中文'
    }
  ]

  const contentStats = [
    { type: '酒店描述', count: 456, accuracy: 94 },
    { type: '房型介绍', count: 328, accuracy: 91 },
    { type: '促销文案', count: 215, accuracy: 96 },
    { type: '周边推荐', count: 189, accuracy: 87 },
    { type: '设施说明', count: 267, accuracy: 93 }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">已通过</Badge>
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">已拒绝</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">待审核</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="内容生成审核"
        description="审核和管理AI生成的酒店内容"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="待审核"
          value="23"
          trend="+5 今日"
          trendUp={false}
          icon={Clock}
          iconColor="bg-yellow-500"
        />
        <StatCard
          title="今日已审核"
          value="156"
          trend="+12% 较昨日"
          trendUp={true}
          icon={CheckCircle2}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="平均AI评分"
          value="89.4"
          trend="+2.1% 优化"
          trendUp={true}
          icon={Sparkles}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="人工修改率"
          value="8.2%"
          trend="-1.5% 改善"
          trendUp={true}
          icon={TrendingUp}
          iconColor="bg-blue-500"
        />
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="review" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="review" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Eye className="w-4 h-4 mr-2" />
            内容审核
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            生成统计
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Settings className="w-4 h-4 mr-2" />
            审核设置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          {/* 筛选工具栏 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="搜索内容..." 
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="内容类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="description">酒店描述</SelectItem>
                    <SelectItem value="room">房型介绍</SelectItem>
                    <SelectItem value="promo">促销文案</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[120px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="approved">已通过</SelectItem>
                    <SelectItem value="rejected">已拒绝</SelectItem>
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

          {/* 审核列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  待审核内容列表
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  导出报告
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviewItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-slate-500">{item.language}</span>
                        {getStatusBadge(item.status)}
                      </div>
                      <span className="text-xs text-slate-500">{item.createdAt}</span>
                    </div>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{item.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">AI评分</span>
                          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.aiScore >= 90 ? 'bg-emerald-500' : 
                                item.aiScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${item.aiScore}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            item.aiScore >= 90 ? 'text-emerald-400' : 
                            item.aiScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {item.aiScore}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">生成于 {item.createdAt}</span>
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

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 内容类型分布 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  内容类型分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentStats.map((stat) => (
                    <div key={stat.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">{stat.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 text-sm">{stat.count} 条</span>
                          <span className={`text-sm font-medium ${
                            stat.accuracy >= 90 ? 'text-emerald-400' : 'text-yellow-400'
                          }`}>
                            {stat.accuracy}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 rounded-full transition-all"
                          style={{ width: `${(stat.count / 500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 生成质量趋势 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  生成质量趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-2xl font-bold text-emerald-400">94.2%</p>
                      <p className="text-xs text-slate-400 mt-1">平均准确率</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">2.3s</p>
                      <p className="text-xs text-slate-400 mt-1">平均生成时间</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">1,455</p>
                      <p className="text-xs text-slate-400 mt-1">本月生成量</p>
                    </div>
                  </div>
                  <div className="h-48 bg-slate-800/30 rounded-lg flex items-end justify-around p-4">
                    {[65, 72, 78, 85, 82, 88, 91, 89, 94, 92, 95, 94].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="w-8 bg-purple-500/60 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${value * 2}px` }}
                        />
                        <span className="text-xs text-slate-500">{index + 1}月</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 多模态内容统计 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-400" />
                多模态内容统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">文本内容</p>
                      <p className="text-xs text-slate-400">Text Content</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">总生成量</span>
                      <span className="text-white">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">通过率</span>
                      <span className="text-emerald-400">94.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">平均长度</span>
                      <span className="text-white">186 字</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">图片描述</p>
                      <p className="text-xs text-slate-400">Image Caption</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">总生成量</span>
                      <span className="text-white">856</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">通过率</span>
                      <span className="text-emerald-400">91.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">平均长度</span>
                      <span className="text-white">45 字</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Video className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">视频脚本</p>
                      <p className="text-xs text-slate-400">Video Script</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">总生成量</span>
                      <span className="text-white">124</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">通过率</span>
                      <span className="text-emerald-400">88.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">平均长度</span>
                      <span className="text-white">320 字</span>
                    </div>
                  </div>
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
                审核规则配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">自动通过阈值</h4>
                <p className="text-slate-400 text-sm mb-4">AI评分高于此值的内容将自动通过审核</p>
                <div className="flex items-center gap-4">
                  <Progress value={85} className="flex-1 h-3" />
                  <span className="text-white font-medium w-12">85</span>
                </div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">人工审核阈值</h4>
                <p className="text-slate-400 text-sm mb-4">AI评分低于此值的内容将标记为需要人工审核</p>
                <div className="flex items-center gap-4">
                  <Progress value={70} className="flex-1 h-3" />
                  <span className="text-white font-medium w-12">70</span>
                </div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">敏感词过滤</h4>
                <p className="text-slate-400 text-sm mb-4">启用敏感词检测和自动拦截</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">检测级别</span>
                  <Select defaultValue="strict">
                    <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="strict">严格</SelectItem>
                      <SelectItem value="normal">普通</SelectItem>
                      <SelectItem value="loose">宽松</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
