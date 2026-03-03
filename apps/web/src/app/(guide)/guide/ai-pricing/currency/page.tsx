'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Globe, TrendingUp, TrendingDown } from 'lucide-react'

const currencies = [
  { code: 'CNY', name: '人民币', symbol: '¥', rate: 1.0, enabled: true },
  { code: 'USD', name: '美元', symbol: '$', rate: 0.138, enabled: true },
  { code: 'EUR', name: '欧元', symbol: '€', rate: 0.128, enabled: true },
  { code: 'JPY', name: '日元', symbol: '¥', rate: 21.5, enabled: true },
  { code: 'GBP', name: '英镑', symbol: '£', rate: 0.109, enabled: false },
  { code: 'AUD', name: '澳元', symbol: 'A$', rate: 0.212, enabled: false },
]

const basePrice = 400

export default function GuideAIPricingCurrencyPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="多币种定价"
        description="设置服务展示的多币种价格"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 币种设置 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                支持的币种
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currencies.map((currency) => (
                  <div 
                    key={currency.code}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                        <span className="text-xl">{currency.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{currency.name}</p>
                        <p className="text-sm text-slate-400">{currency.code}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">汇率</p>
                        <p className="text-white">1 CNY = {currency.rate} {currency.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">参考价格</p>
                        <p className="text-emerald-400 font-medium">
                          {currency.symbol}{Math.round(basePrice * currency.rate)}
                        </p>
                      </div>
                      <Switch defaultChecked={currency.enabled} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 汇率策略 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">汇率策略</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-slate-300">实时汇率</p>
                  <p className="text-sm text-slate-500">使用实时市场汇率换算</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-slate-300">汇率缓冲</p>
                  <p className="text-sm text-slate-500">+2% 汇率波动保护</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 汇率趋势 */}
        <div>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">今日汇率</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currencies.filter(c => c.enabled).map((currency) => (
                <div key={currency.code} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">{currency.code}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{currency.rate}</span>
                    {currency.code === 'USD' && (
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    )}
                    {currency.code === 'JPY' && (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white text-base">价格示例</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <p className="text-sm text-slate-400 mb-2">4小时导游服务</p>
                <p className="text-3xl font-bold text-white mb-3">¥1,600</p>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-400">$220 USD</p>
                  <p className="text-slate-400">€204 EUR</p>
                  <p className="text-slate-400">¥34,400 JPY</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
