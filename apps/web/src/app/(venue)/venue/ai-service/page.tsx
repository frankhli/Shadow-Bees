'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Ticket, MessageSquare, Languages } from 'lucide-react'
import Link from 'next/link'

export default function VenueAIServicePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI活动咨询"
        description="实时翻译客服，解答全球游客咨询"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/venue/ai-service/chat">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">实时翻译客服</h3>
                  <p className="text-sm text-slate-400">与外国游客实时沟通</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/venue/ai-service/booking">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">预约咨询管理</h3>
                  <p className="text-sm text-slate-400">处理预约相关咨询</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Languages className="w-5 h-5 text-orange-400" />
              客服统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">今日咨询</span>
                <span className="text-white font-semibold">24 条</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">平均响应时间</span>
                <span className="text-emerald-400 font-semibold">2.3 分钟</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">满意度</span>
                <span className="text-emerald-400 font-semibold">98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">热门咨询问题</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-white text-sm">1. 活动开始时间和持续时间？</p>
                <p className="text-xs text-slate-500 mt-1">询问 32 次</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-white text-sm">2. 是否支持团体预约？</p>
                <p className="text-xs text-slate-500 mt-1">询问 28 次</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-white text-sm">3. 取消预约政策是什么？</p>
                <p className="text-xs text-slate-500 mt-1">询问 18 次</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
