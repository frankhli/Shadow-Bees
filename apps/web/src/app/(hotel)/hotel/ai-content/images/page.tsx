'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Sparkles, Download, CheckCircle } from 'lucide-react'

export default function ImageOptimizationPage() {
  const [uploaded, setUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const handleUpload = () => {
    setUploaded(true)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setDone(true)
    }, 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="图片AI优化"
        description="AI优化房源图片，提升OTA转化率"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 上传区 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">上传图片</CardTitle>
          </CardHeader>
          <CardContent>
            {!uploaded ? (
              <div 
                onClick={handleUpload}
                className="border-2 border-dashed border-slate-700 rounded-xl p-12 text-center cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/50 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                <p className="text-white font-medium mb-1">点击或拖拽上传</p>
                <p className="text-sm text-slate-500">支持 JPG、PNG 格式</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">🏨</span>
                </div>
                {processing && (
                  <div className="flex items-center justify-center gap-2 text-cyan-400">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI优化中...</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 优化结果 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              AI优化
            </CardTitle>
          </CardHeader>
          <CardContent>
            {done ? (
              <div className="space-y-4">
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl">🏨</span>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      已优化
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">智能调光</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400">已应用</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">色彩增强</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400">已应用</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">构图优化</span>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400">已应用</Badge>
                  </div>
                </div>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Download className="w-4 h-4 mr-2" />
                  下载优化后图片
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>上传图片后AI将自动优化</p>
                <p className="text-sm mt-1">智能调光 · 色彩增强 · 构图优化</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
