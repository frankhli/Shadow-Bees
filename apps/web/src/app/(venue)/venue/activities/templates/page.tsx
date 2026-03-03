'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { 
  Search, 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  Star,
  Clock,
  Users,
  Tag,
  Layout,
  Grid3X3,
  List,
  Filter,
  Sparkles,
  CheckCircle,
  MoreHorizontal,
  Eye,
  Download,
  Upload,
  Heart,
  TrendingUp,
  Zap
} from 'lucide-react'
import { useState } from 'react'

interface Template {
  id: string
  title: string
  category: string
  description: string
  duration: string
  maxPeople: number
  price: number
  rating: number
  usageCount: number
  tags: string[]
  isOfficial: boolean
  isFavorite: boolean
  createdAt: string
  image: string
}

const templates: Template[] = [
  {
    id: 'TMP001',
    title: '传统茶艺体验',
    category: '文化体验',
    description: '学习中国传统茶艺，品尝各种名茶，了解茶文化的历史与精髓',
    duration: '2小时',
    maxPeople: 8,
    price: 188,
    rating: 4.9,
    usageCount: 128,
    tags: ['茶文化', '传统', '静心', '互动'],
    isOfficial: true,
    isFavorite: true,
    createdAt: '2024-01-01',
    image: 'tea'
  },
  {
    id: 'TMP002',
    title: '书法入门工作坊',
    category: '手工艺',
    description: '零基础学习中国书法，从握笔姿势到基本笔画，感受汉字之美',
    duration: '2.5小时',
    maxPeople: 12,
    price: 158,
    rating: 4.7,
    usageCount: 96,
    tags: ['书法', '艺术', '传统文化'],
    isOfficial: true,
    isFavorite: false,
    createdAt: '2024-01-05',
    image: 'calligraphy'
  },
  {
    id: 'TMP003',
    title: '中式点心制作',
    category: '美食',
    description: '亲手制作传统中式点心，如小笼包、月饼、汤圆等',
    duration: '3小时',
    maxPeople: 10,
    price: 268,
    rating: 4.8,
    usageCount: 215,
    tags: ['美食', '手工', '传统', '互动'],
    isOfficial: true,
    isFavorite: true,
    createdAt: '2024-01-10',
    image: 'food'
  },
  {
    id: 'TMP004',
    title: '剪纸艺术创作',
    category: '手工艺',
    description: '学习中国传统剪纸技艺，创作属于自己的剪纸作品',
    duration: '2小时',
    maxPeople: 15,
    price: 128,
    rating: 4.6,
    usageCount: 78,
    tags: ['剪纸', '手工艺', '民间艺术'],
    isOfficial: false,
    isFavorite: false,
    createdAt: '2024-02-01',
    image: 'paper'
  },
  {
    id: 'TMP005',
    title: '京剧脸谱绘制',
    category: '文化体验',
    description: '了解京剧文化，亲手绘制属于自己的京剧脸谱',
    duration: '2.5小时',
    maxPeople: 12,
    price: 198,
    rating: 4.8,
    usageCount: 156,
    tags: ['京剧', '绘画', '传统文化'],
    isOfficial: true,
    isFavorite: false,
    createdAt: '2024-01-15',
    image: 'opera'
  },
  {
    id: 'TMP006',
    title: '胡同摄影导览',
    category: '摄影',
    description: '专业摄影师带领，探索北京胡同的独特魅力，学习街头摄影技巧',
    duration: '4小时',
    maxPeople: 6,
    price: 298,
    rating: 4.9,
    usageCount: 89,
    tags: ['摄影', '胡同', '文化探索'],
    isOfficial: false,
    isFavorite: true,
    createdAt: '2024-02-10',
    image: 'photo'
  },
]

const categoryColors: Record<string, string> = {
  '文化体验': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  '手工艺': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  '摄影': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '美食': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function ActivityTemplatesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesFavorite = !favoritesOnly || template.isFavorite
    return matchesSearch && matchesCategory && matchesFavorite
  })

  const officialCount = templates.filter(t => t.isOfficial).length
  const myTemplatesCount = templates.filter(t => !t.isOfficial).length
  const favoriteCount = templates.filter(t => t.isFavorite).length
  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0)

  return (
    <div className="p-8">
      <PageHeader
        title="活动模板"
        description="使用模板快速创建活动，提高效率"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Layout className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">官方模板</p>
              <p className="text-xl font-bold text-white">{officialCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Copy className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">我的模板</p>
              <p className="text-xl font-bold text-white">{myTemplatesCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <Heart className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">收藏</p>
              <p className="text-xl font-bold text-white">{favoriteCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">总使用次数</p>
              <p className="text-xl font-bold text-white">{totalUsage}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="搜索模板..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">全部分类</option>
            <option value="文化体验">文化体验</option>
            <option value="手工艺">手工艺</option>
            <option value="美食">美食</option>
            <option value="摄影">摄影</option>
          </select>

          <Button
            variant={favoritesOnly ? 'default' : 'outline'}
            size="sm"
            className={favoritesOnly ? 'bg-pink-500 hover:bg-pink-600' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}
            onClick={() => setFavoritesOnly(!favoritesOnly)}
          >
            <Heart className={`w-4 h-4 mr-1 ${favoritesOnly ? 'fill-white' : ''}`} />
            收藏
          </Button>

          <div className="flex items-center border border-slate-700 rounded-md overflow-hidden">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600 rounded-none' : 'text-slate-400 hover:text-white rounded-none'}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600 rounded-none' : 'text-slate-400 hover:text-white rounded-none'}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1" />

        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Upload className="w-4 h-4 mr-2" />
          导入
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          新建模板
        </Button>
      </div>

      {/* Templates Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-slate-900 border-slate-800 overflow-hidden group">
              {/* Image Placeholder */}
              <div className="h-40 bg-slate-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Layout className="w-12 h-12 text-slate-600" />
                </div>
                {template.isOfficial && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    官方
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className={`absolute top-3 right-3 h-8 w-8 p-0 ${template.isFavorite ? 'text-pink-400' : 'text-slate-400'} hover:text-pink-400`}
                >
                  <Heart className={`w-4 h-4 ${template.isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900 to-transparent">
                  <Badge className={categoryColors[template.category]}>
                    {template.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-white text-lg mb-2">{template.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-3">{template.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {template.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {template.maxPeople}人
                  </span>
                  <span className="flex items-center gap-1 text-orange-400 font-medium">
                    ¥{template.price}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      {template.rating}
                    </span>
                    <span className="text-sm text-slate-500">
                      使用 {template.usageCount} 次
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-orange-400">
                      <Copy className="w-4 h-4" />
                    </Button>
                    {!template.isOfficial && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Template Card */}
          <Card className="bg-slate-900 border-slate-800 border-dashed border-2 cursor-pointer hover:border-orange-500/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full py-16">
              <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-orange-400" />
              </div>
              <p className="font-medium text-white mb-1">创建新模板</p>
              <p className="text-sm text-slate-400 text-center">将现有活动保存为模板<br/>方便下次快速创建</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List View */
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-0">
            {filteredTemplates.map((template, index) => (
              <div 
                key={template.id} 
                className={`flex items-center gap-4 p-4 hover:bg-slate-800/50 transition-colors ${index !== filteredTemplates.length - 1 ? 'border-b border-slate-800' : ''}`}
              >
                <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Layout className="w-6 h-6 text-slate-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white truncate">{template.title}</h3>
                    {template.isOfficial && (
                      <Badge className="bg-orange-500 text-white border-0 text-xs">
                        官方
                      </Badge>
                    )}
                    <Badge className={categoryColors[template.category]}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{template.description}</p>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {template.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {template.maxPeople}人
                  </span>
                  <span className="text-orange-400 font-medium">¥{template.price}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    {template.rating}
                  </span>
                  <span className="text-slate-500">使用 {template.usageCount} 次</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-pink-400">
                    <Heart className={`w-4 h-4 ${template.isFavorite ? 'fill-pink-400 text-pink-400' : ''}`} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Copy className="w-4 h-4 mr-1" />
                    使用
                  </Button>
                  {!template.isOfficial && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Template Generator */}
      <Card className="bg-slate-900 border-slate-800 mt-8 overflow-hidden">
        <div className="flex items-center">
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <h3 className="font-semibold text-white">AI 智能模板生成</h3>
            </div>
            <p className="text-slate-400 mb-4">
              只需输入活动主题，AI 将为您生成完整的活动模板，包括活动描述、
              时间安排、价格建议等
            </p>
            <div className="flex gap-3">
              <Input 
                placeholder="例如：创建一个关于中国书法的体验活动..."
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 flex-1"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Zap className="w-4 h-4 mr-2" />
                生成模板
              </Button>
            </div>
          </div>
          <div className="w-64 h-40 bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-orange-400" />
          </div>
        </div>
      </Card>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white">官方认证模板</p>
                <p className="text-sm text-slate-400 mt-1">
                  经过平台审核的高质量模板，使用更放心
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Copy className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white">一键复用</p>
                <p className="text-sm text-slate-400 mt-1">
                  点击使用模板，自动填充活动信息，快速创建
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Heart className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-white">收藏常用模板</p>
                <p className="text-sm text-slate-400 mt-1">
                  收藏常用模板，方便下次快速找到
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
