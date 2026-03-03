'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, History, MessageSquare, Languages } from 'lucide-react'
import Link from 'next/link'

export default function GuideAIServicePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI客户沟通"
        description="实时翻译沟通，无障碍服务外国游客"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/guide/ai-service/chat">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">实时翻译对话</h3>
                  <p className="text-sm text-slate-400">与外国游客实时沟通</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-service/phrases">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">常用语库</h3>
                  <p className="text-sm text-slate-400">快捷回复常用语句</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-service/history">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <History className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">对话记录</h3>
                  <p className="text-sm text-slate-400">查看历史沟通记录</p>
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
              <Languages className="w-5 h-5 text-emerald-400" />
              翻译统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">今日翻译消息</span>
                <span className="text-white font-semibold">48 条</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">服务语言种类</span>
                <span className="text-white font-semibold">5 种</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">翻译准确率</span>
                <span className="text-emerald-400 font-semibold">96%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">最近对话</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">🇺🇸 John Smith</span>
                  <span className="text-slate-500">10分钟前</span>
                </div>
                <p className="text-white text-sm">询问明天故宫游览时间安排...</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">🇯🇵 田中太郎</span>
                  <span className="text-slate-500">1小时前</span>
                </div>
                <p className="text-white text-sm">预订后天长城一日游...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
