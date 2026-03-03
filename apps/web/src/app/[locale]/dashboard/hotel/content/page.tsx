'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Copy, Check, Sparkles, Music, BookOpen, Camera, Building, AlertTriangle } from 'lucide-react'

// 平台配置 - 名称保持英文（品牌名），描述中文
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  tiktok: Music,
  xiaohongshu: BookOpen,
  instagram: Camera,
  booking: Building,
}

const platforms = [
  { id: 'tiktok', name: 'TikTok', description: '短视频脚本，适合海外年轻人' },
  { id: 'xiaohongshu', name: '小红书', description: '中文生活方式平台' },
  { id: 'instagram', name: 'Instagram', description: '照片配文，面向国际旅客' },
  { id: 'booking', name: 'Booking.com', description: '列表优化，提升预订转化' },
]

// 风格配置 - 中文界面
const styles = [
  { id: 'lifestyle', name: '生活方式', description: '有格调、强调体验感' },
  { id: 'urgent', name: '紧迫/稀缺', description: '制造紧迫感和稀缺性' },
  { id: 'professional', name: '专业', description: '信息丰富、可信度高' },
  { id: 'funny', name: '幽默', description: '轻松幽默、易于共鸣' },
]

export default function ContentGenerationPage() {
  const t = useTranslations()
  const [platform, setPlatform] = useState('tiktok')
  const [style, setStyle] = useState('lifestyle')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const hotelData = {
    name: '胡同精品酒店',
    city: '北京',
    facilities: {
      elevator: false,
      wifi: true,
      western_toilet: true,
      english_staff: true,
      air_con: true,
    }
  }

  const generateContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/ai/generate/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotel_name: hotelData.name,
          city: hotelData.city,
          facilities: hotelData.facilities,
          platform,
          style,
          // 根据平台决定生成语言：小红书用中文，其他用英文（给外国旅客）
          language: platform === 'xiaohongshu' ? 'zh' : 'en',
        }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // TikTok结果展示 - 生成内容是英文（给外国旅客）
  const renderTikTokResult = (content: any) => (
    <div className="space-y-4">
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm font-medium text-amber-800 mb-1">开场白 (Hook)</p>
        <p className="text-lg">{content.hook}</p>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">脚本 (Script)</p>
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">{content.script}</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">配音文案 (Voiceover)</p>
        <p className="p-3 bg-blue-50 rounded-lg">{content.voiceover}</p>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">字幕 (Captions)</p>
        <p>{content.captions}</p>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">标签 (Hashtags)</p>
        <div className="flex flex-wrap gap-2">
          {content.hashtags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">拍摄建议 (Shooting Tips)</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {content.shooting_tips?.map((tip: string, i: number) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 bg-purple-50 rounded-lg">
        <p className="text-sm font-medium text-purple-800 flex items-center gap-1"><Music className="w-4 h-4" /> 音乐建议: {content.music_suggestion}</p>
      </div>
    </div>
  )

  // 小红书结果展示 - 生成内容是中文
  const renderXiaohongshuResult = (content: any) => (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm font-medium text-red-800 mb-1">标题</p>
        <p className="text-lg font-medium">{content.title}</p>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">正文</p>
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">{content.content}</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">亮点</p>
        <div className="flex flex-wrap gap-2">
          {content.highlights?.map((h: string) => (
            <Badge key={h} variant="default" className="bg-red-500">{h}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">标签</p>
        <div className="flex flex-wrap gap-2">
          {content.hashtags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">拍照技巧</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {content.photo_tips?.map((tip: string, i: number) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  // Booking结果展示 - 生成内容是英文
  const renderBookingResult = (content: any) => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">标题 (最多40字)</p>
        <div className="p-3 bg-blue-50 rounded-lg font-medium">{content.title}</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">房源描述</p>
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">{content.description}</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">核心卖点</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {content.key_selling_points?.map((point: string, i: number) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">房间亮点</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {content.room_highlights?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">位置描述</p>
        <p className="text-sm">{content.location_description}</p>
      </div>
      
      <div className="p-3 bg-amber-50 rounded-lg">
        <p className="text-sm font-medium text-amber-800">政策说明</p>
        <ul className="list-disc list-inside text-sm mt-1">
          {content.policies_notes?.map((note: string, i: number) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  // Instagram结果展示 - 生成内容是英文
  const renderInstagramResult = (content: any) => (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">配文 (Caption)</p>
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">{content.caption}</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">标签 (Hashtags)</p>
        <div className="flex flex-wrap gap-2">
          {content.hashtags?.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Stories创意</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {content.story_prompts?.map((idea: string, i: number) => (
            <li key={i}>{idea}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  const getPlatformName = (id: string) => {
    const p = platforms.find(p => p.id === id)
    return p?.name || id
  }

  const getStyleName = (id: string) => {
    const s = styles.find(s => s.id === id)
    return s?.name || id
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
            <span className="text-xl font-bold">Tiaohai 商家后台</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/hotel'}>
            返回控制台
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">AI内容生成器</h1>
              <p className="text-muted-foreground">基于GPT-4生成多语言营销内容（中文/英文）</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Platform Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">发布平台</CardTitle>
              </CardHeader>
              <CardContent>
                <select 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {platforms.map((p) => {
                    const IconComponent = platformIcons[p.id]
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    )
                  })}
                </select>
                <p className="text-xs text-muted-foreground mt-2">
                  {platforms.find(p => p.id === platform)?.description}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {platform === 'xiaohongshu' ? '将生成中文内容' : '将生成英文内容（面向外国旅客）'}
                </p>
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">内容风格</CardTitle>
              </CardHeader>
              <CardContent>
                <select 
                  value={style} 
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {styles.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-2">
                  {styles.find(s => s.id === style)?.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hotel Info */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base">酒店信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{hotelData.name}</Badge>
                <Badge variant="outline">{hotelData.city}</Badge>
                {Object.entries(hotelData.facilities).map(([key, value]) => (
                  <Badge key={key} variant={value ? "default" : "destructive"}>
                    {key === 'elevator' ? '电梯' : 
                     key === 'wifi' ? 'WiFi' : 
                     key === 'western_toilet' ? '西式马桶' : 
                     key === 'english_staff' ? '英语员工' : 
                     key === 'air_con' ? '空调' : key}: {value ? '有' : '无'}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button 
            size="lg" 
            className="w-full mb-8"
            onClick={generateContent}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                生成 {getPlatformName(platform)} 内容
                {platform !== 'xiaohongshu' && ' (英文)'}
              </>
            )}
          </Button>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>生成内容</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {getPlatformName(result.platform)} · {getStyleName(result.style)} · 
                    {result.platform === 'xiaohongshu' ? '中文' : 'English'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(result.content, null, 2))}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                {result.platform === 'tiktok' && renderTikTokResult(result.content)}
                {result.platform === 'xiaohongshu' && renderXiaohongshuResult(result.content)}
                {result.platform === 'booking' && renderBookingResult(result.content)}
                {result.platform === 'instagram' && renderInstagramResult(result.content)}
                
                {result.raw_response && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-xs text-yellow-800">
                    <span className="flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> 使用备用模式: {result.raw_response}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
