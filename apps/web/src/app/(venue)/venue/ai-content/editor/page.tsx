'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Edit3, 
  Sparkles, 
  Save, 
  Eye, 
  RotateCcw, 
  CheckCircle, 
  Image as ImageIcon, 
  Calendar,
  MapPin,
  Tag,
  Users,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  Wand2,
  History,
  Copy,
  Trash2,
  Plus,
  ChevronDown,
  Star
} from 'lucide-react'

interface ActivitySection {
  id: string
  title: string
  content: string
  isAIgenerated?: boolean
}

export default function ChineseEditorPage() {
  const [title, setTitle] = useState('夏日海滩派对 - 畅饮狂欢夜')
  const [subtitle, setSubtitle] = useState('与DJ一起嗨翻整个夏天，无限畅饮特调鸡尾酒')
  const [description, setDescription] = useState(`在这个炎热的夏日，我们为您准备了一场难忘的海滩派对！

现场DJ将带来最劲爆的音乐，让您尽情舞动。专业调酒师为您调制各种特调鸡尾酒，从经典的莫吉托到创意特饮，应有尽有。

我们还准备了丰富的互动游戏和惊喜抽奖环节，让您的夜晚充满欢乐与惊喜。`)
  
  const [sections, setSections] = useState<ActivitySection[]>([
    { id: '1', title: '活动亮点', content: '• 顶级DJ现场表演\n• 无限畅饮特调鸡尾酒\n• 海滩主题装饰\n• 幸运抽奖环节', isAIgenerated: true },
    { id: '2', title: '时间安排', content: '• 19:00 - 入场签到\n• 20:00 - DJ表演开始\n• 22:00 - 互动游戏\n• 23:00 - 抽奖环节', isAIgenerated: true },
    { id: '3', title: '注意事项', content: '• 请携带有效身份证件\n• 建议穿着休闲舒适\n• 未成年人禁止饮酒\n• 请勿携带外食入场', isAIgenerated: false },
  ])

  const [tags, setTags] = useState(['派对', '海滩', '夏日', '音乐'])
  const [newTag, setNewTag] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedStatus, setSavedStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
      setSavedStatus('unsaved')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
    setSavedStatus('unsaved')
  }

  const handleAIGenerate = async (sectionId: string) => {
    setIsGenerating(true)
    // 模拟AI生成
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, content: s.content + '\n• AI生成的额外内容示例', isAIgenerated: true }
        : s
    ))
    setIsGenerating(false)
    setSavedStatus('unsaved')
  }

  const handleSave = async () => {
    setSavedStatus('saving')
    await new Promise(resolve => setTimeout(resolve, 800))
    setSavedStatus('saved')
  }

  const addNewSection = () => {
    const newSection: ActivitySection = {
      id: Date.now().toString(),
      title: '新段落',
      content: '',
      isAIgenerated: false
    }
    setSections([...sections, newSection])
    setSavedStatus('unsaved')
  }

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id))
    setSavedStatus('unsaved')
  }

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value, isAIgenerated: false } : s
    ))
    setSavedStatus('unsaved')
  }

  return (
    <div className="p-8">
      <PageHeader
        title="中文活动编辑"
        description="编辑和优化活动的所有中文内容"
        showBack
      >
        <div className="flex items-center gap-3">
          {savedStatus === 'saved' && (
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              已保存
            </Badge>
          )}
          {savedStatus === 'saving' && (
            <Badge variant="outline" className="border-orange-500 text-orange-400">
              <Clock className="w-3 h-3 mr-1 animate-spin" />
              保存中...
            </Badge>
          )}
          {savedStatus === 'unsaved' && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
              <AlertCircle className="w-3 h-3 mr-1" />
              未保存
            </Badge>
          )}
          <Button 
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => window.open('/preview', '_blank')}
          >
            <Eye className="w-4 h-4 mr-2" />
            预览
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSave}
            disabled={savedStatus === 'saving'}
          >
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：基本信息 */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-orange-400" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">活动标题</label>
                <Input
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setSavedStatus('unsaved') }}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  placeholder="输入活动标题"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">副标题</label>
                <Input
                  value={subtitle}
                  onChange={(e) => { setSubtitle(e.target.value); setSavedStatus('unsaved') }}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  placeholder="输入副标题"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">活动描述</label>
                <Textarea
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); setSavedStatus('unsaved') }}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[120px]"
                  placeholder="输入活动详细描述"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                    onClick={() => setDescription(description + '\n\n[AI优化建议：添加更多情感化描述]')}
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    AI优化
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 内容段落 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-400" />
                内容段落
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                onClick={addNewSection}
              >
                <Plus className="w-4 h-4 mr-1" />
                添加段落
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <div key={section.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white font-medium max-w-[200px]"
                      />
                      {section.isAIgenerated && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-0">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI生成
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-orange-400"
                        onClick={() => handleAIGenerate(section.id)}
                        disabled={isGenerating}
                      >
                        <Wand2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-400"
                        onClick={() => removeSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={section.content}
                    onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 标签管理 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-orange-400" />
                活动标签
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline"
                    className="border-orange-500/50 text-orange-400 px-3 py-1 cursor-pointer hover:bg-orange-500/10"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <span className="ml-1 text-slate-500">×</span>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  placeholder="添加新标签"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button 
                  variant="outline"
                  className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10"
                  onClick={handleAddTag}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：辅助信息 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-orange-400" />
                活动图片
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-800 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/50 transition-colors">
                <ImageIcon className="w-12 h-12 text-slate-600 mb-2" />
                <p className="text-sm text-slate-500">点击上传或拖拽图片</p>
                <p className="text-xs text-slate-600 mt-1">支持 JPG, PNG, WebP</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-slate-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                活动信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>2024年7月15日 - 7月16日</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>19:00 - 02:00</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>上海体验店 · 主厅</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Users className="w-4 h-4 text-orange-400" />
                <span>限额 200 人</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <History className="w-5 h-5 text-orange-400" />
                编辑历史
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '10分钟前', action: '修改了活动描述', user: '张经理' },
                { time: '2小时前', action: 'AI生成了内容段落', user: 'AI助手' },
                { time: '昨天', action: '更新了活动标题', user: '张经理' },
                { time: '3天前', action: '创建了活动', user: '张经理' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-slate-300">{item.action}</p>
                    <p className="text-slate-500 text-xs">{item.time} · {item.user}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">AI智能助手</h4>
                  <p className="text-xs text-slate-400">一键优化内容</p>
                </div>
              </div>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setIsGenerating(true)}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    一键优化全部
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
