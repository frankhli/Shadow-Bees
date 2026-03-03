'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Edit3, Globe, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function VenueAIContentPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI活动营销"
        description="中文编辑，五语同步输出，推广活动到全球"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/venue/ai-content/editor">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">中文活动编辑</h3>
                  <p className="text-sm text-slate-400">编辑活动中文详情</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/venue/ai-content/translations">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">五语活动页面</h3>
                  <p className="text-sm text-slate-400">管理多语言活动页</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/venue/ai-content/social">
          <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">社交媒体文案</h3>
                  <p className="text-sm text-slate-400">生成推广文案</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400" />
            内容生成统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm text-slate-400">活动页面</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-orange-400">60</p>
              <p className="text-sm text-slate-400">五语版本</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">28</p>
              <p className="text-sm text-slate-400">社交文案</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-400">2,456</p>
              <p className="text-sm text-slate-400">累计浏览</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
