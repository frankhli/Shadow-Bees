'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  Languages, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Copy,
  Eye,
  RefreshCw,
  Download,
  ChevronDown,
  Star,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  FileText,
  CheckSquare,
  Square,
  ArrowRightLeft,
  Wand2,
  History,
  MoreHorizontal,
  Edit3,
  Trash2
} from 'lucide-react'

interface LanguageVersion {
  code: string
  name: string
  flag: string
  status: 'completed' | 'editing' | 'pending' | 'error'
  title: string
  subtitle: string
  description: string
  lastUpdated: string
  confidence: number
}

const languages: LanguageVersion[] = [
  { 
    code: 'zh', 
    name: '中文', 
    flag: '🇨🇳', 
    status: 'completed',
    title: '夏日海滩派对 - 畅饮狂欢夜',
    subtitle: '与DJ一起嗨翻整个夏天，无限畅饮特调鸡尾酒',
    description: '在这个炎热的夏日，我们为您准备了一场难忘的海滩派对！现场DJ将带来最劲爆的音乐...',
    lastUpdated: '2024-07-10 14:30',
    confidence: 100
  },
  { 
    code: 'en', 
    name: 'English', 
    flag: '🇬🇧', 
    status: 'completed',
    title: 'Summer Beach Party - Unlimited Drinks Night',
    subtitle: 'Dance all night with our DJ and enjoy unlimited signature cocktails',
    description: 'Get ready for an unforgettable summer beach party! Our live DJ will bring the hottest beats...',
    lastUpdated: '2024-07-10 14:32',
    confidence: 95
  },
  { 
    code: 'ja', 
    name: '日本語', 
    flag: '🇯🇵', 
    status: 'completed',
    title: 'サマービーチパーティー - 飲み放題ナイト',
    subtitle: 'DJと一緒に夏を盛り上げ、オリジナルカクテルを飲み放題',
    description: '暑い夏に忘れられないビーチパーティーをご用意しました！ライブDJが最高の音楽をお届け...',
    lastUpdated: '2024-07-10 14:35',
    confidence: 92
  },
  { 
    code: 'ko', 
    name: '한국어', 
    flag: '🇰🇷', 
    status: 'editing',
    title: '여름 해변 파티 - 무제한 음료의 밤',
    subtitle: 'DJ와 함께 여름을 즐기며 시그니처 칵테일을 무제한으로',
    description: '무더운 여름, 잊을 수 없는 해변 파티를 준비했습니다! 라이브 DJ가 최고의 비트를 선사...',
    lastUpdated: '2024-07-10 15:00',
    confidence: 88
  },
  { 
    code: 'th', 
    name: 'ไทย', 
    flag: '🇹🇭', 
    status: 'pending',
    title: '',
    subtitle: '',
    description: '',
    lastUpdated: '-',
    confidence: 0
  },
]

export default function TranslationsPage() {
  const [selectedLang, setSelectedLang] = useState('en')
  const [isGenerating, setIsGenerating] = useState(false)
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [autoTranslate, setAutoTranslate] = useState(true)

  const currentLang = languages.find(l => l.code === selectedLang) || languages[0]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
            <CheckCircle className="w-3 h-3 mr-1" />
            已完成
          </Badge>
        )
      case 'editing':
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-0">
            <Edit3 className="w-3 h-3 mr-1" />
            编辑中
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-0">
            <Clock className="w-3 h-3 mr-1" />
            待翻译
          </Badge>
        )
      case 'error':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-0">
            <AlertCircle className="w-3 h-3 mr-1" />
            需修改
          </Badge>
        )
      default:
        return null
    }
  }

  const handleGenerateAll = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsGenerating(false)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="五语活动页面"
        description="管理活动的多语言版本，一键同步翻译"
        showBack
      >
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 mr-2" />
            导出全部
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleGenerateAll}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                一键翻译全部
              </>
            )}
          </Button>
        </div>
      </PageHeader>

      {/* 语言状态概览 */}
      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-400" />
            翻译状态概览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedLang === lang.code 
                    ? 'bg-orange-500/20 border-orange-500' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-orange-500/50'
                }`}
                onClick={() => setSelectedLang(lang.code)}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <p className="text-white font-medium">{lang.name}</p>
                <div className="mt-2">{getStatusBadge(lang.status)}</div>
                {lang.confidence > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>准确度</span>
                      <span>{lang.confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-400 rounded-full"
                        style={{ width: `${lang.confidence}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：中文原文 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">🇨🇳</span>
              中文原文
              <Badge className="bg-orange-500/20 text-orange-400 border-0">源语言</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Copy className="w-4 h-4 mr-1" />
                复制
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-400 mb-2 block">活动标题</label>
              <Input
                value={languages[0].title}
                readOnly
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400 mb-2 block">副标题</label>
              <Input
                value={languages[0].subtitle}
                readOnly
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400 mb-2 block">活动描述</label>
              <Textarea
                value={languages[0].description}
                readOnly
                className="bg-slate-800 border-slate-700 text-white min-h-[200px]"
              />
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-sm font-medium text-slate-300 mb-3">内容段落</h4>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800 rounded border border-slate-700">
                  <p className="text-sm text-orange-400 font-medium mb-1">活动亮点</p>
                  <p className="text-sm text-slate-300">• 顶级DJ现场表演<br/>• 无限畅饮特调鸡尾酒<br/>• 海滩主题装饰</p>
                </div>
                <div className="p-3 bg-slate-800 rounded border border-slate-700">
                  <p className="text-sm text-orange-400 font-medium mb-1">时间安排</p>
                  <p className="text-sm text-slate-300">• 19:00 - 入场签到<br/>• 20:00 - DJ表演开始<br/>• 22:00 - 互动游戏</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 右侧：目标语言编辑 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-2xl">{currentLang.flag}</span>
              {currentLang.name}
              {getStatusBadge(currentLang.status)}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-slate-400">
                <History className="w-4 h-4 mr-1" />
                历史
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Eye className="w-4 h-4 mr-1" />
                预览
              </Button>
              <Button 
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                保存
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">活动标题</label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                >
                  <Wand2 className="w-3 h-3 mr-1" />
                  AI优化
                </Button>
              </div>
              <Input
                value={currentLang.title}
                onChange={() => {}}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="输入翻译标题"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400 mb-2 block">副标题</label>
              <Input
                value={currentLang.subtitle}
                onChange={() => {}}
                className="bg-slate-800 border-slate-700 text-white"
                placeholder="输入翻译副标题"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-400 mb-2 block">活动描述</label>
              <Textarea
                value={currentLang.description}
                onChange={() => {}}
                className="bg-slate-800 border-slate-700 text-white min-h-[200px]"
                placeholder="输入翻译描述"
              />
            </div>
            
            {/* 翻译工具栏 */}
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-300">翻译工具</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                    <ArrowRightLeft className="w-3 h-3 mr-1" />
                    对比
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    重译
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  重新生成
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  复制原文
                </Button>
              </div>
            </div>

            {/* 翻译建议 */}
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-400 mb-1">AI翻译建议</p>
                  <p className="text-sm text-slate-300">
                    检测到当前翻译使用了较为正式的语气。建议调整措辞使其更加活泼，
                    以符合海滩派对的主题氛围。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 批量操作区域 */}
      <Card className="bg-slate-900 border-slate-800 mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-orange-400" />
            批量翻译设置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${syncEnabled ? 'bg-orange-500/20' : 'bg-slate-700'}`}>
                  <RefreshCw className={`w-5 h-5 ${syncEnabled ? 'text-orange-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className="text-white font-medium">自动同步</p>
                  <p className="text-sm text-slate-400">中文修改后自动更新</p>
                </div>
              </div>
              <button 
                onClick={() => setSyncEnabled(!syncEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${syncEnabled ? 'bg-orange-500' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${syncEnabled ? 'translate-x-7' : 'translate-x-1'} mt-1`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${autoTranslate ? 'bg-orange-500/20' : 'bg-slate-700'}`}>
                  <Languages className={`w-5 h-5 ${autoTranslate ? 'text-orange-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className="text-white font-medium">AI自动翻译</p>
                  <p className="text-sm text-slate-400">同步时自动翻译</p>
                </div>
              </div>
              <button 
                onClick={() => setAutoTranslate(!autoTranslate)}
                className={`w-12 h-6 rounded-full transition-colors ${autoTranslate ? 'bg-orange-500' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoTranslate ? 'translate-x-7' : 'translate-x-1'} mt-1`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-white font-medium">质量检查</p>
                  <p className="text-sm text-slate-400">翻译完成后自动检测</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                配置
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
