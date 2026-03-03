'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Calendar, Coins, Tag } from 'lucide-react'
import Link from 'next/link'

export default function VenueAIPricingPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI动态定价"
        description="智能定价策略，多币种自动换算"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/venue/ai-pricing/activity">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">活动定价策略</h3>
                  <p className="text-sm text-slate-400">AI建议最优定价</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/venue/ai-pricing/currency">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">多币种设置</h3>
                  <p className="text-sm text-slate-400">支持多种货币定价</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/venue/ai-pricing/promotions">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Tag className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">早鸟与团体</h3>
                  <p className="text-sm text-slate-400">设置促销活动</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            定价概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥128</p>
              <p className="text-sm text-slate-400">单人体验</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥358</p>
              <p className="text-sm text-slate-400">双人套餐</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">¥888</p>
              <p className="text-sm text-slate-400">团体(6人)</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-orange-400">5</p>
              <p className="text-sm text-slate-400">支持币种</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
