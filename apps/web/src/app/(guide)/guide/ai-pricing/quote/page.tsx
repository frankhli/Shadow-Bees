'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  TrendingUp,
  Clock,
  Users,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

export default function GuideAIPricingQuotePage() {
  const [basePrice, setBasePrice] = useState(400)
  const [duration, setDuration] = useState(4)
  const [guests, setGuests] = useState(2)
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null)

  const generateQuote = () => {
    setIsGenerating(true)
    setTimeout(() => {
      // AI定价逻辑模拟
      const timeMultiplier = duration <= 3 ? 1 : duration <= 6 ? 1.2 : 1.5
      const guestMultiplier = guests <= 2 ? 1 : guests <= 5 ? 1.3 : 1.5
      const aiSuggestion = Math.round(basePrice * timeMultiplier * guestMultiplier)
      setSuggestedPrice(aiSuggestion)
      setIsGenerating(false)
    }, 1500)
  }

  const factors = [
    { name: '基础时薪', value: `¥${basePrice}/小时`, impact: '基准' },
    { name: '时长系数', value: `${duration}小时`, impact: duration <= 3 ? '标准' : duration <= 6 ? '+20%' : '+50%' },
    { name: '人数系数', value: `${guests}人`, impact: guests <= 2 ? '标准' : guests <= 5 ? '+30%' : '+50%' },
  ]

  return (
    <div className="p-8">
      <PageHeader
        title="智能报价"
        description="AI辅助生成服务报价"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 报价配置 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-400" />
              报价配置
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-300">基础时薪 (¥/小时)</Label>
              <Input 
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <p className="text-xs text-slate-500">根据您的经验和市场行情设置</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">
                <Clock className="w-4 h-4 inline mr-1" />
                服务时长 (小时)
              </Label>
              <Input 
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">
                <Users className="w-4 h-4 inline mr-1" />
                游客人数
              </Label>
              <Input 
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={generateQuote}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  AI计算中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI生成报价建议
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI报价结果 */}
        <div className="space-y-6">
          {suggestedPrice && (
            <Card className="bg-slate-900 border-slate-800 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  AI报价建议
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <p className="text-sm text-slate-400 mb-2">建议报价</p>
                  <p className="text-5xl font-bold text-green-400">¥{suggestedPrice}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    原价 ¥{basePrice * duration} → AI优化后 ¥{suggestedPrice}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-400">定价因素分析:</p>
                  {factors.map((factor, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                      <span className="text-slate-300">{factor.name}</span>
                      <div className="text-right">
                        <span className="text-white mr-2">{factor.value}</span>
                        <Badge variant="outline" className="bg-slate-700 border-slate-600 text-slate-300 text-xs">
                          {factor.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    使用此报价
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
                    自定义调整
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 历史报价 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">最近报价</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { service: '故宫深度游', price: 1600, date: '2024-03-15' },
                { service: '胡同美食游', price: 800, date: '2024-03-12' },
                { service: '长城一日游', price: 3200, date: '2024-03-10' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white">{item.service}</p>
                    <p className="text-xs text-slate-500">{item.date}</p>
                  </div>
                  <p className="text-emerald-400 font-medium">¥{item.price}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
