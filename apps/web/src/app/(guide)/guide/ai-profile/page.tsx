'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, User, Globe, Route } from 'lucide-react'
import Link from 'next/link'

export default function GuideAIProfilePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="AI个人品牌"
        description="打造多语言个人品牌，服务全球游客"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/guide/ai-profile/bio">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">中文介绍编辑</h3>
                  <p className="text-sm text-slate-400">编辑您的中文个人简介</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-profile/translations">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">五语介绍管理</h3>
                  <p className="text-sm text-slate-400">管理多语言版本介绍</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guide/ai-profile/routes">
          <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Route className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">路线文案生成</h3>
                  <p className="text-sm text-slate-400">AI生成游览路线文案</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            品牌数据概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">5</p>
              <p className="text-sm text-slate-400">语言版本</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-400">1,234</p>
              <p className="text-sm text-slate-400">资料浏览</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-emerald-400">89%</p>
              <p className="text-sm text-slate-400">好评率</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm text-slate-400">路线方案</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
