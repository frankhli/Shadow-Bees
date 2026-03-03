'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Zap, 
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

// Mock 定价数据
const pricingData = {
  basePrice: 480,
  currentPrice: 552,
  aiSuggestedPrice: 580,
  currency: {
    cny: { rate: 1, symbol: '¥' },
    usd: { rate: 0.138, symbol: '$' },
    eur: { rate: 0.128, symbol: '€' },
    jpy: { rate: 21.5, symbol: '¥' },
  },
  factors: {
    inventory: { impact: +0.10, label: '库存紧张 (+10%)' },
    demand: { impact: +0.05, label: '需求上升 (+5%)' },
    events: { impact: +0.10, label: '周末展会 (+10%)' },
    competitor: { impact: 0, label: '竞品持平 (0%)' },
  },
}

export default function AIPricingPage() {
  const [autoPricingEnabled, setAutoPricingEnabled] = useState(false)

  const totalImpact = Object.values(pricingData.factors).reduce((sum, f) => sum + f.impact, 0)
  
  const getPriceInCurrency = (cnyPrice: number, currency: string) => {
    const rate = pricingData.currency[currency as keyof typeof pricingData.currency].rate
    const symbol = pricingData.currency[currency as keyof typeof pricingData.currency].symbol
    return `${symbol}${Math.round(cnyPrice * rate)}`
  }

  return (
    <div className="p-8">
      <PageHeader
        title="AI动态定价"
        description="基于市场数据智能调整价格"
      />

      {/* 开关 */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${autoPricingEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}>
            <Zap className={`w-6 h-6 ${autoPricingEnabled ? 'text-white' : 'text-slate-400'}`} />
          </div>
          <div>
            <h3 className="font-medium text-white">AI自动定价</h3>
            <p className="text-sm text-slate-400">
              {autoPricingEnabled 
                ? 'AI将根据市场情况自动调整价格' 
                : '开启后AI将自动优化您的定价策略'}
            </p>
          </div>
        </div>
        <Switch
          checked={autoPricingEnabled}
          onCheckedChange={setAutoPricingEnabled}
        />
      </div>

      {/* 价格概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="基础价格"
          value={`¥${pricingData.basePrice}`}
          subtitle="每间/每晚"
          icon={DollarSign}
          iconColor="bg-slate-600"
        />
        <StatCard
          title="当前售价"
          value={`¥${pricingData.currentPrice}`}
          trend={`+${Math.round(((pricingData.currentPrice - pricingData.basePrice) / pricingData.basePrice) * 100)}%`}
          trendUp={true}
          icon={TrendingUp}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="AI建议价"
          value={`¥${pricingData.aiSuggestedPrice}`}
          trend={`+${Math.round(((pricingData.aiSuggestedPrice - pricingData.currentPrice) / pricingData.currentPrice) * 100)}%`}
          trendUp={true}
          icon={Zap}
          iconColor="bg-cyan-500"
        />
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">多币种显示</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-white">{getPriceInCurrency(pricingData.currentPrice, 'usd')} USD</p>
                  <p className="text-white">{getPriceInCurrency(pricingData.currentPrice, 'eur')} EUR</p>
                  <p className="text-white">{getPriceInCurrency(pricingData.currentPrice, 'jpy')} JPY</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 定价因素分析 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">AI定价因素分析</CardTitle>
            <CardDescription className="text-slate-400">
              当前价格基于以下因素综合计算
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(pricingData.factors).map(([key, factor]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {factor.impact > 0 ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  ) : factor.impact < 0 ? (
                    <ArrowDownRight className="w-5 h-5 text-red-400" />
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center text-slate-500">-</div>
                  )}
                  <span className="text-slate-300">{factor.label}</span>
                </div>
                <span className={`font-medium ${
                  factor.impact > 0 ? 'text-emerald-400' : 
                  factor.impact < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {factor.impact > 0 ? '+' : ''}{Math.round(factor.impact * 100)}%
                </span>
              </div>
            ))}
            <div className="border-t border-slate-800 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">综合影响</span>
                <span className="text-xl font-bold text-cyan-400">+{Math.round(totalImpact * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI建议和操作 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              AI定价建议
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">建议涨价 ¥{pricingData.aiSuggestedPrice - pricingData.currentPrice}</p>
                  <p className="text-sm text-slate-400 mt-1">
                    理由：本周末有大型展会，周边酒店已涨价15-20%，您的库存仅剩2间，建议跟进市场。
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">当前价格</span>
                <span className="text-white">¥{pricingData.currentPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">建议价格</span>
                <span className="text-cyan-400 font-medium">¥{pricingData.aiSuggestedPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">预计增收</span>
                <span className="text-emerald-400">+¥{(pricingData.aiSuggestedPrice - pricingData.currentPrice) * 2}/晚</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-cyan-600 hover:bg-cyan-700">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                采纳建议
              </Button>
              <Button variant="outline" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
                自定义价格
              </Button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              价格有效期：24小时 · 自动同步至所有渠道
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
