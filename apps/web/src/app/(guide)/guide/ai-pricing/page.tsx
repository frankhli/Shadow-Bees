'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Calculator, Coins, Package } from 'lucide-react'
import Link from 'next/link'

export default function GuideAIPricingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI服务定价"
        description="智能定价策略，多币种自动换算"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/guide/ai-pricing/quote">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">智能报价</h3>
                  <p className="text-sm text-slate-400">AI生成服务报价方案</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-pricing/currency">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">多币种定价</h3>
                  <p className="text-sm text-slate-400">支持多种货币定价</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-pricing/bundle">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">打包服务</h3>
                  <p className="text-sm text-slate-400">创建服务套餐组合</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            定价概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥800</p>
              <p className="text-sm text-slate-400">半日导览</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥1,500</p>
              <p className="text-sm text-slate-400">全日导览</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥3,000</p>
              <p className="text-sm text-slate-400">VIP定制</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-400">5</p>
              <p className="text-sm text-slate-400">支持币种</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
