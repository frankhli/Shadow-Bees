'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Sparkles,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react'

interface PriceRecommendation {
  date: string
  currentPrice: number
  aiPrice: number
  change: number
  reason: string
  confidence: number
}

const recommendations: PriceRecommendation[] = [
  { date: '03-15', currentPrice: 480, aiPrice: 580, change: +21, reason: '演唱会期间', confidence: 95 },
  { date: '03-16', currentPrice: 480, aiPrice: 620, change: +29, reason: '展会+周末', confidence: 92 },
  { date: '03-17', currentPrice: 480, aiPrice: 550, change: +15, reason: '展会第二天', confidence: 88 },
  { date: '03-20', currentPrice: 480, aiPrice: 420, change: -12, reason: '工作日淡季', confidence: 75 },
  { date: '03-21', currentPrice: 480, aiPrice: 450, change: -6, reason: '竞品降价', confidence: 70 },
]

export default function RealtimePricingPage() {
  const [applying, setApplying] = useState<string | null>(null)

  const handleApply = (date: string) => {
    setApplying(date)
    setTimeout(() => setApplying(null), 1000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="实时定价策略"
        description="AI基于市场数据实时推荐最优价格"
      />

      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">¥480</p>
              <p className="text-sm text-slate-400 mt-1">当前均价</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">¥524</p>
              <p className="text-sm text-slate-400 mt-1">AI建议均价</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-400">+9%</p>
              <p className="text-sm text-slate-400 mt-1">预期收益提升</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">84%</p>
              <p className="text-sm text-slate-400 mt-1">AI置信度</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 价格建议列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            AI价格建议
          </CardTitle>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新数据
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div 
                key={rec.date}
                className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="text-center w-16">
                    <p className="text-white font-medium">{rec.date}</p>
                    <p className="text-xs text-slate-500">3月</p>
                  </div>
                  <div className="w-px h-12 bg-slate-700" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-slate-400 line-through">¥{rec.currentPrice}</span>
                      <span className="text-2xl font-bold text-emerald-400">¥{rec.aiPrice}</span>
                      <Badge className={rec.change > 0 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-orange-500/20 text-orange-400'
                      }>
                        {rec.change > 0 ? '+' : ''}{rec.change}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">{rec.reason}</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-cyan-400">置信度 {rec.confidence}%</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => handleApply(rec.date)}
                  disabled={applying === rec.date}
                >
                  {applying === rec.date ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    '应用'
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 提示 */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div>
          <p className="text-yellow-200 font-medium">价格审批提醒</p>
          <p className="text-sm text-slate-400 mt-1">
            超过30%的价格变动需要人工审批。您有 2 条待审批的价格调整申请。
          </p>
        </div>
      </div>
    </div>
  )
}
