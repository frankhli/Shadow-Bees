'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/StatCard'
import { 
  Sparkles, 
  MessageCircle, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react'

export default function AICenterPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI监管中心"
        description="监控AI服务质量和内容审核"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="内容生成量"
          value="1,248"
          trend="+12% 本周"
          trendUp={true}
          icon={Sparkles}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="AI客服解决率"
          value="82.4%"
          trend="+3.2% 优化"
          trendUp={true}
          icon={CheckCircle2}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="翻译准确率"
          value="94.8%"
          trend="稳定"
          trendUp={true}
          icon={Globe}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="待审核内容"
          value="23"
          subtitle="需人工确认"
          icon={AlertTriangle}
          iconColor="bg-orange-500"
        />
      </div>

      {/* 监控面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI内容生成监控
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">今日生成</span>
              <span className="text-white font-medium">156 条</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">人工修改率</span>
              <span className="text-emerald-400 font-medium">8.2%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">平均生成时间</span>
              <span className="text-white font-medium">2.3秒</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              AI客服质检
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">今日对话量</span>
              <span className="text-white font-medium">342 轮</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">转人工率</span>
              <span className="text-yellow-400 font-medium">12.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-300">平均响应时间</span>
              <span className="text-white font-medium">1.8秒</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
