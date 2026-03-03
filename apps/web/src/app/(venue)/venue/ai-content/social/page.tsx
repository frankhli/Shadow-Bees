'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Share2, 
  MessageSquare, 
  Image as ImageIcon,
  Video,
  Hash,
  Copy,
  RefreshCw,
  Sparkles,
  ThumbsUp,
  Eye,
  Send,
  CheckCircle,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Calendar,
  Wand2,
  Save,
  Trash2,
  Plus,
  ChevronDown,
  Star,
  Zap,
  Target,
  BarChart3
} from 'lucide-react'

interface SocialPost {
  id: string
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok'
  content: string
  hashtag: string[]
  imageUrl?: string
  status: 'draft' | 'scheduled' | 'published'
  scheduledTime?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

interface ContentTemplate {
  id: string
  name: string
  description: string
  tone: string
  icon: React.ReactNode
}

const templates: ContentTemplate[] = [
  { 
    id: '1', 
    name: '预热宣传', 
    description: '活动前造势，制造期待感',
    tone: '兴奋、期待',
    icon: <Sparkles className="w-5 h-5 text-orange-400" />
  },
  { 
    id: '2', 
    name: '倒计时提醒', 
    description: '活动开始前最后提醒',
    tone: '紧迫、邀请',
    icon: <Clock className="w-5 h-5 text-orange-400" />
  },
  { 
    id: '3', 
    name: '现场直播', 
    description: '实时分享活动现场',
    tone: '热情、互动',
    icon: <Video className="w-5 h-5 text-orange-400" />
  },
  { 
    id: '4', 
    name: '精彩回顾', 
    description: '活动结束后的总结分享',
    tone: '感恩、分享',
    icon: <ImageIcon className="w-5 h-5 text-orange-400" />
  },
  { 
    id: '5', 
    name: '用户评价', 
    description: '展示参与者的好评',
    tone: '真实、推荐',
    icon: <MessageSquare className="w-5 h-5 text-orange-400" />
  },
]

const platformConfig = {
  instagram: { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500', maxLength: 2200 },
  facebook: { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', maxLength: 63206 },
  twitter: { name: 'Twitter', icon: Twitter, color: 'bg-sky-500', maxLength: 280 },
  linkedin: { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', maxLength: 3000 },
  tiktok: { name: 'TikTok', icon: Video, color: 'bg-black', maxLength: 2200 },
}

export default function SocialMediaPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('1')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<SocialPost[]>([])
  const [customHashtags, setCustomHashtags] = useState('#夏日派对 #海滩狂欢 #上海活动')
  const [contentTone, setContentTone] = useState('活泼')

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newPosts: SocialPost[] = selectedPlatforms.map((platform, index) => ({
      id: Date.now().toString() + index,
      platform: platform as SocialPost['platform'],
      content: getSampleContent(platform),
      hashtag: ['夏日派对', '海滩狂欢', '上海活动', 'DJ派对', '畅饮'],
      status: 'draft',
      scheduledTime: '2024-07-15 18:00',
    }))
    
    setGeneratedContent(newPosts)
    setIsGenerating(false)
  }

  const getSampleContent = (platform: string) => {
    const contents: Record<string, string> = {
      instagram: '🌊☀️ 夏天来了，你准备好了吗？\n\n我们即将举办一场超嗨的海滩派对！🏖️\n\n✨ 无限畅饮特调鸡尾酒\n🎧 顶级DJ现场打碟\n🎁 幸运抽奖送不停\n\n快叫上你的小伙伴一起来狂欢吧！👯‍♀️👯‍♂️\n\n📅 7月15日 19:00\n📍 上海体验店',
      facebook: '【夏日海滩派对 - 畅饮狂欢夜】\n\n炎炎夏日，是时候来一场清凉的海滩派对了！我们为您准备了：\n\n🏖️ 逼真的海滩主题装饰\n🍹 无限畅饮的特调鸡尾酒\n🎵 专业DJ带来的劲爆音乐\n🎮 丰富的互动游戏\n🎊 惊喜抽奖环节\n\n时间：2024年7月15日 19:00-02:00\n地点：上海体验店主厅\n\n名额有限，快来报名参加吧！',
      twitter: '🎉 夏日海滩派对来袭！🏖️\n\n7月15日，和我们一起：\n🍹 畅饮特调鸡尾酒\n🎧 享受DJ现场演出\n🎁 参与幸运抽奖\n\n📍 上海体验店\n⏰ 19:00开始\n\n#夏日派对 #海滩狂欢',
      linkedin: '【活动预告】夏日海滩派对 - 企业团建首选\n\n为您的团队打造难忘的夏日体验。我们的海滩派对提供专业的活动策划、优质的餐饮服务和精彩 entertainment 安排。\n\n适合：企业团建 | 客户答谢 | 团队庆祝\n\n欢迎咨询详情。',
      tiktok: '🌊 这周末去哪玩？来我们的海滩派对！\n\n drinks flowing 🍹\n music pumping 🎵\n vibes amazing ✨\n\n 7/15 不见不散！\n\n #海滩派对 #周末去哪玩',
    }
    return contents[platform] || ''
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  return (
    <div className="p-8">
      <PageHeader
        title="社交媒体文案"
        description="一键生成多平台社交媒体推广文案"
        showBack
      >
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            数据分析
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleGenerate}
            disabled={isGenerating || selectedPlatforms.length === 0}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                生成文案
              </>
            )}
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：配置面板 */}
        <div className="space-y-6">
          {/* 平台选择 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-orange-400" />
                选择平台
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(platformConfig).map(([key, config]) => {
                  const Icon = config.icon
                  const isSelected = selectedPlatforms.includes(key)
                  return (
                    <button
                      key={key}
                      onClick={() => togglePlatform(key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-orange-500/20 border-orange-500' 
                          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-medium">{config.name}</p>
                        <p className="text-xs text-slate-400">最多 {config.maxLength} 字符</p>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-orange-400" />}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 模板选择 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                内容模板
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'bg-orange-500/20 border-orange-500'
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{template.name}</p>
                        <p className="text-sm text-slate-400">{template.description}</p>
                        <Badge variant="outline" className="mt-2 border-slate-600 text-slate-400 text-xs">
                          语气：{template.tone}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 高级设置 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                高级设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">自定义标签</label>
                <Textarea
                  value={customHashtags}
                  onChange={(e) => setCustomHashtags(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white text-sm"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">内容语气</label>
                <div className="flex flex-wrap gap-2">
                  {['活泼', '正式', '幽默', '感性', '专业'].map((tone) => (
                    <Badge
                      key={tone}
                      variant={contentTone === tone ? 'default' : 'outline'}
                      className={contentTone === tone 
                        ? 'bg-orange-500 text-white cursor-pointer' 
                        : 'border-slate-600 text-slate-400 cursor-pointer hover:border-orange-500'
                      }
                      onClick={() => setContentTone(tone)}
                    >
                      {tone}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：生成结果 */}
        <div className="lg:col-span-2 space-y-6">
          {generatedContent.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800 h-full min-h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">开始生成社交媒体文案</h3>
                <p className="text-slate-400 mb-6">选择平台和模板，AI将为您生成专业的推广文案</p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleGenerate}
                  disabled={selectedPlatforms.length === 0}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  立即生成
                </Button>
              </div>
            </Card>
          ) : (
            <>
              {generatedContent.map((post) => {
                const config = platformConfig[post.platform]
                const Icon = config.icon
                return (
                  <Card key={post.id} className="bg-slate-900 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{config.name}</CardTitle>
                          <p className="text-sm text-slate-400">
                            {post.content.length} / {config.maxLength} 字符
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-slate-400">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          重生成
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                          onClick={() => {}}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          复制
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={post.content}
                        onChange={() => {}}
                        className="bg-slate-800 border-slate-700 text-white min-h-[150px]"
                      />
                      
                      {/* 标签展示 */}
                      <div className="flex flex-wrap gap-2">
                        {post.hashtag.map((tag) => (
                          <Badge 
                            key={tag}
                            variant="outline"
                            className="border-orange-500/30 text-orange-400"
                          >
                            <Hash className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* 图片占位 */}
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i}
                            className="aspect-square bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/50 transition-colors"
                          >
                            <ImageIcon className="w-6 h-6 text-slate-600" />
                            <span className="text-xs text-slate-500 mt-1">图片{i}</span>
                          </div>
                        ))}
                      </div>

                      {/* 操作栏 */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <Input
                              type="datetime-local"
                              value={post.scheduledTime}
                              className="bg-slate-800 border-slate-700 text-white text-sm w-[180px]"
                              onChange={() => {}}
                            />
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-slate-400">
                            <Clock className="w-3 h-3 mr-1" />
                            草稿
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-slate-400">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            <Send className="w-4 h-4 mr-1" />
                            发布
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </>
          )}
        </div>
      </div>

      {/* 数据洞察 */}
      <Card className="bg-slate-900 border-slate-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            推广数据分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12.5K</p>
                  <p className="text-sm text-slate-400">总曝光量</p>
                </div>
              </div>
              <div className="flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23% 较上周
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3.2K</p>
                  <p className="text-sm text-slate-400">点赞数</p>
                </div>
              </div>
              <div className="flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% 较上周
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">486</p>
                  <p className="text-sm text-slate-400">评论数</p>
                </div>
              </div>
              <div className="flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8% 较上周
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-sm text-slate-400">转化报名</p>
                </div>
              </div>
              <div className="flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +32% 较上周
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
