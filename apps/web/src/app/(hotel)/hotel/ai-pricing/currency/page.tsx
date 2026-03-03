'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  Euro, 
  JapaneseYen, 
  RefreshCw,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

const currencies = [
  { code: 'CNY', name: '人民币', symbol: '¥', rate: 1.0, isBase: true },
  { code: 'USD', name: '美元', symbol: '$', rate: 0.139, change: +0.2 },
  { code: 'EUR', name: '欧元', symbol: '€', rate: 0.128, change: -0.1 },
  { code: 'JPY', name: '日元', symbol: '¥', rate: 20.85, change: +0.5 },
  { code: 'GBP', name: '英镑', symbol: '£', rate: 0.109, change: 0 },
]

export default function CurrencyPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="汇率与多币种"
        description="管理多币种定价和汇率设置"
      />

      {/* 汇率概览 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {currencies.map((curr) => (
          <Card key={curr.code} className={`bg-slate-900 border-slate-800 ${curr.isBase ? 'ring-2 ring-cyan-500/50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">{curr.code}</span>
                {curr.isBase && <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">基准</Badge>}
              </div>
              <p className="text-2xl font-bold text-white">{curr.symbol}{curr.rate}</p>
              {!curr.isBase && curr.change !== undefined && (
                <p className={`text-xs mt-1 ${curr.change > 0 ? 'text-emerald-400' : curr.change < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                  {curr.change > 0 ? '+' : ''}{curr.change}%
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 多币种定价 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">多币种房价示例</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
              <p className="text-sm text-slate-400 mb-1">豪华大床房 - 基准价</p>
              <p className="text-3xl font-bold text-white">¥580</p>
            </div>
            <div className="space-y-2">
              {currencies.filter(c => !c.isBase).map((curr) => (
                <div key={curr.code} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 w-12">{curr.code}</span>
                    <span className="text-white font-medium">{curr.symbol}{Math.round(580 * curr.rate)}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500/50" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 设置 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">汇率设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">自动更新汇率</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">已启用</Badge>
              </div>
              <p className="text-sm text-slate-500">每小时自动同步央行汇率</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">汇率缓冲</span>
                <span className="text-white">+2%</span>
              </div>
              <p className="text-sm text-slate-500">防范汇率波动风险</p>
            </div>
            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              立即更新汇率
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
