'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Save, Camera } from 'lucide-react'
import { useState } from 'react'

export default function GuideAIProfileBioPage() {
  const [bio, setBio] = useState(`大家好，我是张导游，土生土长的北京人。

从事导游工作已经10年，专精于北京历史文化讲解。我热爱这座城市，希望通过我的讲解，让每一位游客都能感受到老北京独特的魅力。

我的服务特色：
- 深度讲解故宫、天坛等皇家建筑的历史文化
- 带您走进胡同，体验地道的老北京生活
- 推荐最正宗的北京美食
- 提供英语、日语双语服务

期待与您相遇在北京！`)

  const [isGenerating, setIsGenerating] = useState(false)
  const [tags, setTags] = useState(['故宫专家', '胡同通', '美食达人', '双语导游'])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 1500)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="中文介绍编辑"
        description="编辑您的个人介绍，AI将帮您翻译成五语版本"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 编辑区域 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">个人介绍</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-[300px] bg-slate-800 border-slate-700 text-white"
                placeholder="介绍您的从业经验、专业领域、服务特色..."
              />
              
              <div className="flex gap-2">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? 'AI生成中...' : 'AI优化文案'}
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  <Save className="w-4 h-4 mr-2" />
                  保存草稿
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 服务标签 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">服务标签</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="bg-slate-800 border-slate-700 text-slate-300 px-3 py-1 cursor-pointer hover:border-green-500"
                  >
                    {tag}
                  </Badge>
                ))}
                <Badge 
                  variant="outline"
                  className="border-dashed border-slate-600 text-slate-500 cursor-pointer hover:border-green-500"
                >
                  + 添加标签
                </Badge>
              </div>
              <p className="text-xs text-slate-500">标签将帮助游客快速了解您的专业领域</p>
            </CardContent>
          </Card>
        </div>

        {/* 右侧信息 */}
        <div className="space-y-6">
          {/* 头像上传 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">头像</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-32 h-32 rounded-full bg-slate-800 mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-10 h-10 text-slate-600" />
              </div>
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                更换头像
              </Button>
            </CardContent>
          </Card>

          {/* AI优化建议 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                AI优化建议
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 font-medium mb-1">💡 建议添加</p>
                <p className="text-slate-300">添加您的语言能力信息，吸引更多外国游客</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 font-medium mb-1">📝 内容长度</p>
                <p className="text-slate-400">当前字数适中，建议保持在200-300字</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 font-medium mb-1">🏷️ 标签建议</p>
                <p className="text-slate-400">可添加：历史文化、亲子游、摄影</p>
              </div>
            </CardContent>
          </Card>

          {/* 预览 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">预览效果</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-sm text-slate-300 line-clamp-6">{bio}</p>
              </div>
              <Button variant="outline" className="w-full mt-4 border-slate-700 text-slate-300">
                查看五语版本
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
