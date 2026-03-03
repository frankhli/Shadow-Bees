'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/StatCard'
import { DollarSign, TrendingUp, Wallet, ArrowUpRight } from 'lucide-react'

export default function FinancePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="财务管理"
        description="平台佣金结算与财务统计"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="本月平台收入"
          value="¥128,450"
          trend="+15% 较上月"
          trendUp={true}
          icon={DollarSign}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="待结算金额"
          value="¥45,280"
          subtitle="T+7结算"
          icon={Wallet}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="退款待审核"
          value="12"
          subtitle="¥8,650"
          icon={ArrowUpRight}
          iconColor="bg-orange-500"
        />
        <StatCard
          title="平台佣金率"
          value="15%"
          trend="固定"
          trendUp={true}
          icon={TrendingUp}
          iconColor="bg-purple-500"
        />
      </div>

      {/* 财务统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">收入构成</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">酒店住宿佣金</span>
              <span className="text-white font-medium">¥86,400 (67%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">导游服务佣金</span>
              <span className="text-white font-medium">¥28,960 (23%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">体验店佣金</span>
              <span className="text-white font-medium">¥13,090 (10%)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">多币种收入</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">人民币 (CNY)</span>
              <span className="text-white font-medium">¥86,400</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">美元 (USD)</span>
              <span className="text-white font-medium">$5,850 → ¥42,050</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">欧元 (EUR)</span>
              <span className="text-white font-medium">€2,100 → ¥16,380</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
