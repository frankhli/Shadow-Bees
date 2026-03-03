'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp, DollarSign, Calendar } from 'lucide-react'

export default function PricingReportsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="收益报告"
        description="查看AI定价策略带来的收益分析"
      />

      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">本月收入</p>
                <p className="text-2xl font-bold text-white">¥128,450</p>
              </div>
              <DollarSign className="w-10 h-10 text-emerald-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">ADR平均房价</p>
                <p className="text-2xl font-bold text-white">¥524</p>
              </div>
              <TrendingUp className="w-10 h-10 text-cyan-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">入住率</p>
                <p className="text-2xl font-bold text-white">82%</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">RevPAR</p>
                <p className="text-2xl font-bold text-white">¥430</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI收益提升 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white">AI定价收益提升</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-400 font-medium">本月AI定价带来的额外收益</p>
                <p className="text-3xl font-bold text-white mt-1">+¥12,580</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-400 text-lg px-3 py-1">+10.8%</Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-sm text-slate-400">AI调价次数</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">89%</p>
              <p className="text-sm text-slate-400">采纳率</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">¥80</p>
              <p className="text-sm text-slate-400">平均房价提升</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 导出 */}
      <div className="flex justify-end">
        <Button variant="outline" className="border-slate-700 text-slate-300">
          <Download className="w-4 h-4 mr-2" />
          导出详细报告
        </Button>
      </div>
    </div>
  )
}
