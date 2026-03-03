'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Copy, CheckCircle, Globe, RefreshCw } from 'lucide-react'

export default function OTAContentPage() {
  const [input, setInput] = useState('')
  const [generated, setGenerated] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    // 模拟AI生成
    setTimeout(() => {
      setGenerated([
        '【胡同深处的四合院民宿】体验正宗老北京生活。步行可达故宫、天安门。独立卫浴，空调暖气，免费WiFi。房东会英语，可提供旅游建议。',
        '【Hutong Courtyard B&B】Authentic Beijing living in historic hutong. Walk to Forbidden City. Private bath, AC, WiFi. English-speaking host.',
        '【Casa de Huéspedes Hutong】Vive como un local en Pekín. Cerca de la Ciudad Prohibida. Baño privado, WiFi. Anfitrión habla inglés.',
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = (index: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="OTA房源描述"
        description="AI生成OTA平台房源描述，一键同步五语"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入区 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-lg">✏️</span>
              房源信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="输入您的房源亮点...\n例如：四合院民宿、近故宫、独立卫浴、房东会英语"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                onClick={handleGenerate}
                disabled={isGenerating || !input}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    AI生成中...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    生成描述
                  </span>
                )}
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-300">
                <Globe className="w-4 h-4 mr-2" />
                五语同步
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 生成结果 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              生成结果
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generated.length > 0 ? (
              <div className="space-y-4">
                {generated.map((text, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                        {index === 0 ? '🇨🇳 中文' : index === 1 ? '🇺🇸 English' : '🇪🇸 Español'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-slate-400 hover:text-white"
                        onClick={() => handleCopy(index, text)}
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-slate-300 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>输入房源信息后点击生成</p>
                <p className="text-sm mt-1">AI将为您生成专业OTA描述</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
