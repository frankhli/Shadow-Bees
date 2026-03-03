'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Copy, CheckCircle, ImageIcon } from 'lucide-react'

export default function XiaohongshuPage() {
  const [input, setInput] = useState('')
  const [generated, setGenerated] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGenerated(`🌸 藏在胡同里的宝藏民宿，步行5分钟到故宫！

来北京一定要住一次四合院！这家民宿真的太绝了～

📍位置：东城区核心胡同，步行可达：
- 故宫 5分钟
- 天安门 10分钟  
- 王府井 15分钟

🏠房间：传统四合院改造，现代设施齐全
✅独立卫浴 ✅空调暖气 ✅免费WiFi
✅房东超nice，会给旅游攻略

💰价格：人均200+，性价比超高！

📸拍照点：院内红墙、天井、老北京门楼

#北京民宿 #四合院 #故宫周边 #北京旅游 #胡同民宿`)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="小红书种草文案"
        description="AI生成小红书风格推广文案"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-lg">📝</span>
              房源亮点
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="输入房源亮点，例如：\n- 位置：胡同四合院、近故宫\n- 特色：老北京风格、独立小院\n- 设施：投影、浴缸、智能家居\n- 服务：房东攻略、接机服务"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button 
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              onClick={handleGenerate}
              disabled={isGenerating || !input}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  AI创作中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  生成小红书文案
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-lg">📱</span>
              生成结果
            </CardTitle>
            {generated && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleCopy}
                className="text-slate-400 hover:text-white"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {generated ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans">{generated}</pre>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">#北京民宿</Badge>
                  <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">#四合院</Badge>
                  <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">#故宫周边</Badge>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>输入房源亮点后生成文案</p>
                <p className="text-sm mt-1">AI将为您创作小红书风格内容</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
