'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Clock, 
  Sparkles,
  Save,
  RefreshCw,
  Lightbulb,
  Target,
  BarChart3,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'

// 活动定价策略数据
const pricingStrategies = [
  {
    id: 1,
    name: '工作日基础定价',
    description: '周一至周五基础价格策略',
    basePrice: 128,
    suggestedPrice: 138,
    minPrice: 98,
    maxPrice: 168,
    status: 'active',
    confidence: 92,
    trend: 'up',
    applyDays: ['周一', '周二', '周三', '周四', '周五']
  },
  {
    id: 2,
    name: '周末溢价策略',
    description: '周六周日高峰时段溢价',
    basePrice: 168,
    suggestedPrice: 198,
    minPrice: 148,
    maxPrice: 258,
    status: 'active',
    confidence: 88,
    trend: 'up',
    applyDays: ['周六', '周日']
  },
  {
    id: 3,
    name: '淡季促销策略',
    description: '淡季期间吸引客流优惠定价',
    basePrice: 98,
    suggestedPrice: 88,
    minPrice: 68,
    maxPrice: 128,
    status: 'draft',
    confidence: 85,
    trend: 'down',
    applyDays: ['全年适用']
  },
  {
    id: 4,
    name: '节假日特供策略',
    description: '法定节假日特殊定价',
    basePrice: 198,
    suggestedPrice: 268,
    minPrice: 168,
    maxPrice: 388,
    status: 'active',
    confidence: 90,
    trend: 'up',
    applyDays: ['节假日']
  }
]

// 活动列表数据
const activities = [
  { id: 1, name: '老北京茶馆品茗体验', currentPrice: 168, aiSuggested: 188, bookings: 45, capacity: 60 },
  { id: 2, name: '京剧脸谱绘制工作坊', currentPrice: 268, aiSuggested: 298, bookings: 32, capacity: 40 },
  { id: 3, name: '胡同摄影 walks', currentPrice: 198, aiSuggested: 178, bookings: 28, capacity: 50 },
  { id: 4, name: '传统书法体验课', currentPrice: 158, aiSuggested: 168, bookings: 38, capacity: 45 },
]

// 定价因子数据
const pricingFactors = [
  { name: '季节性需求', impact: 'high', weight: 25, enabled: true },
  { name: '竞争对手价格', impact: 'medium', weight: 20, enabled: true },
  { name: '历史预订数据', impact: 'high', weight: 30, enabled: true },
  { name: '当地活动/节日', impact: 'medium', weight: 15, enabled: true },
  { name: '天气因素', impact: 'low', weight: 10, enabled: false },
]

export default function ActivityPricingPage() {
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'strategies' | 'activities' | 'factors'>('strategies')
  const [aiOptimizing, setAiOptimizing] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const handleAiOptimize = () => {
    setAiOptimizing(true)
    setTimeout(() => setAiOptimizing(false), 2000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/30'
      case 'medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/30'
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30'
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="活动定价策略"
        description="AI智能分析建议最优定价，提升收益与预订率"
        showBack={true}
      />

      {/* 统计概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">平均活动价格</p>
                <p className="text-2xl font-bold text-white">¥198</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">AI建议提升收益</p>
                <p className="text-2xl font-bold text-emerald-400">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">预测准确率</p>
                <p className="text-2xl font-bold text-white">89.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">活跃策略数</p>
                <p className="text-2xl font-bold text-white">3/4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 标签导航 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'strategies', label: '定价策略', icon: Sparkles },
          { id: 'activities', label: '活动定价', icon: Calendar },
          { id: 'factors', label: '定价因子', icon: Target },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧主要内容区域 */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'strategies' && (
            <>
              {/* AI建议卡片 */}
              <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        AI定价建议
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        根据近期预订数据和市场趋势分析，建议您将周末基础价格上调 8-12%，
                        预计可提升收益 ¥3,200/月，同时对预订率影响在可接受范围内。
                      </p>
                      <div className="flex gap-3">
                        <Button 
                          size="sm" 
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={handleAiOptimize}
                          disabled={aiOptimizing}
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          {aiOptimizing ? '分析中...' : '一键应用建议'}
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          查看详细分析
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 策略列表 */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    定价策略列表
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    管理您的AI定价策略规则
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pricingStrategies.map((strategy) => (
                    <div 
                      key={strategy.id} 
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-orange-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            strategy.status === 'active' 
                              ? 'bg-orange-500/20' 
                              : 'bg-slate-700'
                          }`}>
                            {strategy.trend === 'up' ? (
                              <TrendingUp className={`w-5 h-5 ${
                                strategy.status === 'active' ? 'text-orange-400' : 'text-slate-500'
                              }`} />
                            ) : (
                              <TrendingDown className={`w-5 h-5 ${
                                strategy.status === 'active' ? 'text-orange-400' : 'text-slate-500'
                              }`} />
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{strategy.name}</h4>
                            <p className="text-sm text-slate-400">{strategy.description}</p>
                          </div>
                        </div>
                        <Badge className={strategy.status === 'active' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-slate-700 text-slate-400'
                        }>
                          {strategy.status === 'active' ? '已启用' : '草稿'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-2 bg-slate-900/50 rounded">
                          <p className="text-xs text-slate-500 mb-1">基础价格</p>
                          <p className="text-white font-semibold">¥{strategy.basePrice}</p>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 rounded border border-orange-500/20">
                          <p className="text-xs text-orange-400 mb-1">AI建议</p>
                          <p className="text-orange-400 font-semibold">¥{strategy.suggestedPrice}</p>
                        </div>
                        <div className="text-center p-2 bg-slate-900/50 rounded">
                          <p className="text-xs text-slate-500 mb-1">价格区间</p>
                          <p className="text-white font-semibold">¥{strategy.minPrice}-¥{strategy.maxPrice}</p>
                        </div>
                        <div className="text-center p-2 bg-slate-900/50 rounded">
                          <p className="text-xs text-slate-500 mb-1">置信度</p>
                          <p className="text-white font-semibold">{strategy.confidence}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-400">
                            适用: {strategy.applyDays.join('、')}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            编辑
                          </Button>
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            应用建议
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'activities' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  活动定价管理
                </CardTitle>
                <CardDescription className="text-slate-400">
                  查看和管理各活动的AI定价建议
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">{activity.name}</h4>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-400">
                          {activity.bookings}/{activity.capacity} 预订
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 bg-slate-900/50 rounded-lg">
                        <p className="text-xs text-slate-500 mb-1">当前价格</p>
                        <p className="text-xl font-bold text-white">¥{activity.currentPrice}</p>
                      </div>
                      <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <p className="text-xs text-orange-400 mb-1">AI建议价格</p>
                        <p className="text-xl font-bold text-orange-400">¥{activity.aiSuggested}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-lg flex flex-col justify-center">
                        <p className="text-xs text-slate-500 mb-1">预期变化</p>
                        <div className={`flex items-center gap-1 ${
                          activity.aiSuggested > activity.currentPrice ? 'text-emerald-400' : 'text-orange-400'
                        }`}>
                          {activity.aiSuggested > activity.currentPrice ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">
                            {Math.abs(Math.round((activity.aiSuggested - activity.currentPrice) / activity.currentPrice * 100))}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        接受建议
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-slate-700 text-slate-300">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新分析
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'factors' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  定价因子权重配置
                </CardTitle>
                <CardDescription className="text-slate-400">
                  调整影响AI定价决策的各项因子权重
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pricingFactors.map((factor, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Switch 
                          defaultChecked={factor.enabled}
                          className="data-[checked]:bg-orange-500"
                        />
                        <Label className="text-white font-medium">{factor.name}</Label>
                      </div>
                      <Badge variant="outline" className={getImpactColor(factor.impact)}>
                        {factor.impact === 'high' ? '高影响' : factor.impact === 'medium' ? '中影响' : '低影响'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-400 w-12">权重</span>
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500 rounded-full transition-all"
                          style={{ width: `${factor.weight}%` }}
                        />
                      </div>
                      <Input 
                        type="number" 
                        defaultValue={factor.weight}
                        className="w-20 bg-slate-800 border-slate-700 text-white text-center"
                      />
                      <span className="text-slate-400">%</span>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium mb-1">配置提示</p>
                      <p className="text-sm text-slate-400">
                        调整权重后，AI需要 24-48 小时重新学习数据并生成新的定价建议。
                        建议每次只调整 1-2 个因子，观察效果后再继续调整。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快捷操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handleAiOptimize}
                disabled={aiOptimizing}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {aiOptimizing ? 'AI分析中...' : '运行AI优化'}
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新数据
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                <Save className="w-4 h-4 mr-2" />
                保存当前配置
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">定价规则说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  基础定价规则
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  设置活动的最低和最高价格限制，AI建议将在此区间内生成。
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  动态调价
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  AI会根据实时供需情况自动调整价格，调整幅度不会超过设定阈值。
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  竞争分析
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  系统会自动监控周边同类活动价格，确保您的定价具有竞争力。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">最近更新</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2" />
                <div>
                  <p className="text-sm text-white">周末溢价策略已更新</p>
                  <p className="text-xs text-slate-500">2小时前</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                <div>
                  <p className="text-sm text-white">AI成功分析完成</p>
                  <p className="text-xs text-slate-500">5小时前</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                <div>
                  <p className="text-sm text-white">新增定价因子权重</p>
                  <p className="text-xs text-slate-500">1天前</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
