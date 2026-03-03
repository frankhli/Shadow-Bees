'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Users,
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
  Headphones,
  MessageSquare,
  Star,
  Zap,
  Bot,
  User
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ServiceQualityPage() {
  const conversationList = [
    {
      id: 1,
      sessionId: 'CONV-20240115-001',
      customer: '张先生',
      type: '预订咨询',
      status: 'completed',
      satisfaction: 5,
      aiResolved: true,
      duration: '4分32秒',
      messages: 12,
      createdAt: '2024-01-15 14:30',
      tags: ['价格咨询', '房型推荐']
    },
    {
      id: 2,
      sessionId: 'CONV-20240115-002',
      customer: 'Ms. Smith',
      type: '取消订单',
      status: 'transferred',
      satisfaction: 4,
      aiResolved: false,
      duration: '8分15秒',
      messages: 24,
      createdAt: '2024-01-15 14:15',
      tags: ['订单取消', '退款咨询']
    },
    {
      id: 3,
      sessionId: 'CONV-20240115-003',
      customer: '李女士',
      type: '设施咨询',
      status: 'completed',
      satisfaction: 5,
      aiResolved: true,
      duration: '2分45秒',
      messages: 8,
      createdAt: '2024-01-15 13:50',
      tags: ['泳池', '健身房']
    },
    {
      id: 4,
      sessionId: 'CONV-20240115-004',
      customer: 'Mr. Johnson',
      type: '投诉反馈',
      status: 'transferred',
      satisfaction: 2,
      aiResolved: false,
      duration: '15分20秒',
      messages: 42,
      createdAt: '2024-01-15 13:25',
      tags: ['服务质量', '投诉']
    },
    {
      id: 5,
      sessionId: 'CONV-20240115-005',
      customer: '王女士',
      type: '会员咨询',
      status: 'completed',
      satisfaction: 5,
      aiResolved: true,
      duration: '3分18秒',
      messages: 10,
      createdAt: '2024-01-15 13:00',
      tags: ['会员权益', '积分']
    }
  ]

  const qualityMetrics = [
    { metric: '响应速度', score: 94, target: 90, trend: '+2%' },
    { metric: '解答准确率', score: 91, target: 85, trend: '+3%' },
    { metric: '礼貌用语', score: 98, target: 95, trend: '+1%' },
    { metric: '问题解决率', score: 87, target: 85, trend: '+4%' },
    { metric: '客户满意度', score: 4.6, target: 4.5, trend: '+0.2' }
  ]

  const topicDistribution = [
    { topic: '预订咨询', count: 342, percentage: 35 },
    { topic: '订单修改', count: 186, percentage: 19 },
    { topic: '设施咨询', count: 142, percentage: 15 },
    { topic: '投诉建议', count: 98, percentage: 10 },
    { topic: '会员服务', count: 124, percentage: 13 },
    { topic: '其他', count: 78, percentage: 8 }
  ]

  const getStatusBadge = (status: string, aiResolved: boolean) => {
    if (status === 'completed' && aiResolved) {
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">AI解决</Badge>
    } else if (status === 'transferred') {
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">转人工</Badge>
    } else if (status === 'completed' && !aiResolved) {
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">人工处理</Badge>
    }
    return <Badge className="bg-slate-500/20 text-slate-400">进行中</Badge>
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="p-8">
      <PageHeader
        title="客服对话质检"
        description="监控AI客服对话质量和客户满意度"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="今日对话量"
          value="342"
          trend="+8% 较昨日"
          trendUp={true}
          icon={MessageCircle}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="AI解决率"
          value="82.4%"
          trend="+3.2% 优化"
          trendUp={true}
          icon={Bot}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="平均响应时间"
          value="1.8s"
          trend="-0.3s 提升"
          trendUp={true}
          icon={Zap}
          iconColor="bg-yellow-500"
        />
        <StatCard
          title="客户满意度"
          value="4.6/5"
          trend="+0.2 提升"
          trendUp={true}
          icon={Star}
          iconColor="bg-pink-500"
        />
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="conversations" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            对话质检
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            质量分析
          </TabsTrigger>
          <TabsTrigger value="topics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Filter className="w-4 h-4 mr-2" />
            话题分布
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-6">
          {/* 筛选工具栏 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="搜索会话ID或客户..." 
                    className="pl-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="对话类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="booking">预订咨询</SelectItem>
                    <SelectItem value="modify">订单修改</SelectItem>
                    <SelectItem value="facility">设施咨询</SelectItem>
                    <SelectItem value="complaint">投诉反馈</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[120px] bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="解决状态" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="ai">AI解决</SelectItem>
                    <SelectItem value="human">转人工</SelectItem>
                    <SelectItem value="ongoing">进行中</SelectItem>
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

          {/* 对话列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-purple-400" />
                  对话质检列表
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  导出质检报告
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversationList.map((conv) => (
                  <div 
                    key={conv.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{conv.customer}</span>
                            <span className="text-xs text-slate-500">{conv.sessionId}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                              {conv.type}
                            </Badge>
                            {getStatusBadge(conv.status, conv.aiResolved)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(conv.satisfaction)}
                        <p className="text-xs text-slate-500 mt-1">{conv.createdAt}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="text-slate-400">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {conv.duration}
                      </span>
                      <span className="text-slate-400">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        {conv.messages} 条消息
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {conv.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
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
                          查看详情
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 质量评分 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  质量评分指标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {qualityMetrics.map((metric) => (
                    <div key={metric.metric} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{metric.metric}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-sm">目标: {metric.target}{metric.metric === '客户满意度' ? '' : '%'}</span>
                          <span className={`text-sm font-medium ${
                            (metric.metric === '客户满意度' ? metric.score >= metric.target : metric.score >= metric.target) 
                              ? 'text-emerald-400' : 'text-yellow-400'
                          }`}>
                            {metric.score}{metric.metric === '客户满意度' ? '' : '%'}
                          </span>
                          <span className="text-xs text-emerald-400">{metric.trend}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            (metric.metric === '客户满意度' ? metric.score >= metric.target : metric.score >= metric.target)
                              ? 'bg-emerald-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${metric.metric === '客户满意度' ? (metric.score / 5) * 100 : metric.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 质检统计 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  今日质检统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-emerald-400">156</p>
                    <p className="text-xs text-slate-400 mt-1">已质检对话</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-400">128</p>
                    <p className="text-xs text-slate-400 mt-1">AI解决</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-orange-400">28</p>
                    <p className="text-xs text-slate-400 mt-1">转人工</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-yellow-400">23</p>
                    <p className="text-xs text-slate-400 mt-1">待质检</p>
                  </div>
                </div>
                <div className="h-40 bg-slate-800/30 rounded-lg flex items-center justify-center">
                  <div className="flex items-end gap-2 h-32 px-4">
                    {[45, 52, 48, 60, 55, 68, 72, 65, 58, 75, 70, 78].map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-purple-500/60 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${value}px` }}
                        />
                        <span className="text-xs text-slate-500">{index + 1}时</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 质检详情 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-400" />
                质检问题分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">响应超时</span>
                    <Badge className="bg-red-500/20 text-red-400">12</Badge>
                  </div>
                  <Progress value={12} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 3.5%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">回答不准确</span>
                    <Badge className="bg-orange-500/20 text-orange-400">8</Badge>
                  </div>
                  <Progress value={8} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 2.3%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">语气不当</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">5</Badge>
                  </div>
                  <Progress value={5} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 1.5%</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">未识别意图</span>
                    <Badge className="bg-blue-500/20 text-blue-400">18</Badge>
                  </div>
                  <Progress value={18} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">占比 5.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                客户咨询话题分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topicDistribution.map((topic) => (
                  <div key={topic.topic} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">{topic.topic}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm">{topic.count} 次</span>
                        <span className="text-purple-400 font-medium">{topic.percentage}%</span>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${topic.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
