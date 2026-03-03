'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  Database, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Filter,
  RefreshCw,
  Eye,
  Play,
  Search,
  Pause,
  Download,
  Settings,
  BarChart3,
  Brain,
  Layers,
  FileText,
  Tag,
  Zap,
  Cpu,
  HardDrive,
  Trash2,
  Edit,
  Plus
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TrainingDataPage() {
  const datasets = [
    {
      id: 1,
      name: '酒店描述训练集',
      type: '文本生成',
      records: 45000,
      size: '128 MB',
      status: 'active',
      lastUpdated: '2024-01-15',
      accuracy: 94.5,
      language: '多语言'
    },
    {
      id: 2,
      name: '客服对话语料',
      type: '对话模型',
      records: 125000,
      size: '356 MB',
      status: 'active',
      lastUpdated: '2024-01-14',
      accuracy: 92.8,
      language: '多语言'
    },
    {
      id: 3,
      name: '翻译对照数据',
      type: '翻译模型',
      records: 89000,
      size: '245 MB',
      status: 'processing',
      lastUpdated: '2024-01-15',
      accuracy: 96.2,
      language: '28种语言'
    },
    {
      id: 4,
      name: '意图识别数据',
      type: '分类模型',
      records: 32000,
      size: '89 MB',
      status: 'active',
      lastUpdated: '2024-01-13',
      accuracy: 91.5,
      language: '中文/英文'
    },
    {
      id: 5,
      name: '情感分析语料',
      type: '分类模型',
      records: 56000,
      size: '156 MB',
      status: 'error',
      lastUpdated: '2024-01-10',
      accuracy: 88.3,
      language: '多语言'
    }
  ]

  const trainingJobs = [
    {
      id: 1,
      name: 'GPT-客服模型-v3.2',
      dataset: '客服对话语料',
      progress: 78,
      status: 'running',
      startedAt: '2024-01-15 08:30',
      eta: '2小时15分',
      epoch: '12/15'
    },
    {
      id: 2,
      name: '翻译模型-优化版',
      dataset: '翻译对照数据',
      progress: 100,
      status: 'completed',
      startedAt: '2024-01-14 10:00',
      completedAt: '2024-01-15 02:30',
      epoch: '20/20'
    },
    {
      id: 3,
      name: '内容生成模型-v2.1',
      dataset: '酒店描述训练集',
      progress: 0,
      status: 'queued',
      startedAt: '-',
      eta: '等待中',
      epoch: '0/10'
    }
  ]

  const modelVersions = [
    {
      version: 'v3.2.1',
      name: '客服AI-稳定版',
      status: 'production',
      accuracy: 94.5,
      latency: '1.2s',
      deployedAt: '2024-01-10',
      usage: 3420
    },
    {
      version: 'v3.2.0-beta',
      name: '客服AI-测试版',
      status: 'staging',
      accuracy: 95.2,
      latency: '1.1s',
      deployedAt: '2024-01-14',
      usage: 156
    },
    {
      version: 'v2.1.8',
      name: '翻译AI-生产版',
      status: 'production',
      accuracy: 96.8,
      latency: '0.8s',
      deployedAt: '2024-01-05',
      usage: 5680
    },
    {
      version: 'v2.0.5',
      name: '内容生成-生产版',
      status: 'production',
      accuracy: 92.5,
      latency: '2.1s',
      deployedAt: '2023-12-28',
      usage: 2890
    }
  ]

  const dataQuality = [
    { type: '标注准确', count: 145230, percentage: 94.5 },
    { type: '待审核', count: 4520, percentage: 2.9 },
    { type: '需修正', count: 2340, percentage: 1.5 },
    { type: '已废弃', count: 1560, percentage: 1.1 }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">使用中</Badge>
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">处理中</Badge>
      case 'error':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">异常</Badge>
      case 'running':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">训练中</Badge>
      case 'completed':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">已完成</Badge>
      case 'queued':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">队列中</Badge>
      case 'production':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">生产环境</Badge>
      case 'staging':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">测试环境</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400">未知</Badge>
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="AI训练数据管理"
        description="管理AI模型训练数据集和训练任务"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="训练数据集"
          value="12"
          trend="+2 本周新增"
          trendUp={true}
          icon={Database}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="数据记录数"
          value="347K"
          trend="+15% 较上月"
          trendUp={true}
          icon={Layers}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="数据质量分"
          value="94.5%"
          trend="+1.2% 优化"
          trendUp={true}
          icon={CheckCircle2}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="训练中任务"
          value="3"
          subtitle="1个等待中"
          icon={Brain}
          iconColor="bg-yellow-500"
        />
      </div>

      {/* 主内容区 */}
      <Tabs defaultValue="datasets" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="datasets" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Database className="w-4 h-4 mr-2" />
            数据集
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Play className="w-4 h-4 mr-2" />
            训练任务
          </TabsTrigger>
          <TabsTrigger value="models" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Cpu className="w-4 h-4 mr-2" />
            模型版本
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            数据质量
          </TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-6">
          {/* 操作工具栏 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="搜索数据集..." 
                      className="pl-10 bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="数据类型" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="text">文本生成</SelectItem>
                      <SelectItem value="dialogue">对话模型</SelectItem>
                      <SelectItem value="translation">翻译模型</SelectItem>
                      <SelectItem value="classification">分类模型</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Filter className="w-4 h-4 mr-2" />
                    筛选
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Upload className="w-4 h-4 mr-2" />
                    导入数据
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    新建数据集
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 数据集列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  训练数据集列表
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  导出清单
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset) => (
                  <div 
                    key={dataset.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Database className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{dataset.name}</span>
                            {getStatusBadge(dataset.status)}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                              {dataset.type}
                            </Badge>
                            <span className="text-xs text-slate-500">{dataset.language}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{dataset.records.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">条记录</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-2 bg-slate-800 rounded">
                        <p className="text-slate-400 text-xs">数据大小</p>
                        <p className="text-white text-sm font-medium">{dataset.size}</p>
                      </div>
                      <div className="text-center p-2 bg-slate-800 rounded">
                        <p className="text-slate-400 text-xs">数据质量</p>
                        <p className={`text-sm font-medium ${
                          dataset.accuracy >= 95 ? 'text-emerald-400' : 
                          dataset.accuracy >= 90 ? 'text-yellow-400' : 'text-red-400'
                        }`}>{dataset.accuracy}%</p>
                      </div>
                      <div className="text-center p-2 bg-slate-800 rounded">
                        <p className="text-slate-400 text-xs">最后更新</p>
                        <p className="text-white text-sm font-medium">{dataset.lastUpdated}</p>
                      </div>
                      <div className="text-center p-2 bg-slate-800 rounded">
                        <p className="text-slate-400 text-xs">状态</p>
                        <p className="text-white text-sm font-medium capitalize">{dataset.status}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        <Play className="w-4 h-4 mr-1" />
                        训练
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          {/* 训练任务列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  训练任务队列
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  新建训练任务
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{job.name}</span>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-slate-400 text-sm">数据集: {job.dataset}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{job.epoch}</p>
                        <p className="text-xs text-slate-500">训练轮次</p>
                      </div>
                    </div>

                    {job.status !== 'queued' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400 text-sm">训练进度</span>
                          <span className="text-purple-400 font-medium">{job.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">
                          <Clock className="w-4 h-4 inline mr-1" />
                          开始: {job.startedAt}
                        </span>
                        {job.eta && (
                          <span className="text-slate-400">
                            <Zap className="w-4 h-4 inline mr-1" />
                            {job.status === 'running' ? '预计剩余: ' : '耗时: '}
                            {job.eta}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {job.status === 'running' && (
                          <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                            <Pause className="w-4 h-4 mr-1" />
                            暂停
                          </Button>
                        )}
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

          {/* 训练资源监控 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-purple-400" />
                训练资源监控
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      GPU 使用率
                    </span>
                    <span className="text-purple-400 font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">4x NVIDIA A100</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 flex items-center gap-2">
                      <HardDrive className="w-4 h-4" />
                      内存使用
                    </span>
                    <span className="text-yellow-400 font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">128 GB / 256 GB</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      存储空间
                    </span>
                    <span className="text-emerald-400 font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-slate-500 mt-2">450 GB / 1 TB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          {/* 模型版本列表 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  模型版本管理
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  部署新版本
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelVersions.map((model) => (
                  <div 
                    key={model.version} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Brain className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{model.name}</span>
                            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                              {model.version}
                            </Badge>
                            {getStatusBadge(model.status)}
                          </div>
                          <p className="text-slate-400 text-sm mt-1">部署于 {model.deployedAt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{model.usage.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">今日调用</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-slate-800 rounded">
                        <p className="text-emerald-400 font-medium">{model.accuracy}%</p>
                        <p className="text-slate-400 text-xs">准确率</p>
                      </div>
                      <div className="text-center p-3 bg-slate-800 rounded">
                        <p className="text-purple-400 font-medium">{model.latency}</p>
                        <p className="text-slate-400 text-xs">平均延迟</p>
                      </div>
                      <div className="text-center p-3 bg-slate-800 rounded">
                        <p className="text-blue-400 font-medium">{model.status === 'production' ? '生产' : '测试'}</p>
                        <p className="text-slate-400 text-xs">环境</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        <Eye className="w-4 h-4 mr-1" />
                        查看详情
                      </Button>
                      {model.status === 'staging' && (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          上线
                        </Button>
                      )}
                      {model.status === 'production' && (
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                          <Pause className="w-4 h-4 mr-1" />
                          下线
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 数据质量分布 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  数据质量分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataQuality.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{item.type}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-400 text-sm">{item.count.toLocaleString()} 条</span>
                          <span className={`text-sm font-medium ${
                            item.type === '标注准确' ? 'text-emerald-400' :
                            item.type === '待审核' ? 'text-yellow-400' :
                            item.type === '需修正' ? 'text-orange-400' : 'text-red-400'
                          }`}>{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            item.type === '标注准确' ? 'bg-emerald-500' :
                            item.type === '待审核' ? 'bg-yellow-500' :
                            item.type === '需修正' ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.percentage * 5}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 质量趋势 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  质量趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-emerald-400">94.5%</p>
                      <p className="text-xs text-slate-400 mt-1">整体准确率</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-purple-400">2.8%</p>
                      <p className="text-xs text-slate-400 mt-1">待审核比例</p>
                    </div>
                  </div>
                  <div className="h-40 bg-slate-800/30 rounded-lg flex items-end justify-around p-4">
                    {[88, 90, 89, 91, 92, 93, 92, 94, 93, 94, 95, 94.5].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div 
                          className="w-full bg-purple-500/60 rounded-t transition-all hover:bg-purple-500"
                          style={{ height: `${value * 1.5}px` }}
                        />
                        <span className="text-xs text-slate-500">{index + 1}月</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 数据标注任务 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-400" />
                  数据标注任务
                </CardTitle>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  新建标注任务
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">待标注</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400">1,245</Badge>
                  </div>
                  <Progress value={25} className="h-2 mb-2" />
                  <p className="text-xs text-slate-500">3个标注员进行中</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">审核中</span>
                    <Badge className="bg-blue-500/20 text-blue-400">456</Badge>
                  </div>
                  <Progress value={45} className="h-2 mb-2" />
                  <p className="text-xs text-slate-500">2个审核员审核中</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-300">已完成</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">3,280</Badge>
                  </div>
                  <Progress value={100} className="h-2 mb-2" />
                  <p className="text-xs text-slate-500">今日新增 156 条</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
