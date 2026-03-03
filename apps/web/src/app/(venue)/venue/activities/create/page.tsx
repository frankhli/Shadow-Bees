'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { usePlatformStore } from '@/stores/platformStore'
import { FadeIn } from '@/components/animations/FadeIn'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Save, 
  X, 
  Upload, 
  Plus, 
  Trash2,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Tag,
  Info,
  CheckCircle,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  Languages,
  Calendar,
  Settings
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ScheduleSlot {
  id: string
  day: string
  startTime: string
  endTime: string
  available: boolean
}

interface Inclusion {
  id: string
  item: string
  included: boolean
}

const THEME_COLOR = '#FFB800'

export default function CreateActivityPage() {
  const router = useRouter()
  const toast = useToast()
  const { addOrder } = usePlatformStore()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>(['文化体验', '手工'])
  const [newTag, setNewTag] = useState('')
  const [saving, setSaving] = useState(false)
  
  // 表单数据
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    detailDescription: '',
    duration: '',
    maxPeople: '',
    location: '',
    adultPrice: '',
    childPrice: '',
    groupDiscount: false,
    earlyBird: false,
    publish: true,
    acceptBooking: true,
    showOnHome: false,
  })
  
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([
    { id: '1', day: '周一', startTime: '09:00', endTime: '12:00', available: true },
    { id: '2', day: '周三', startTime: '14:00', endTime: '17:00', available: true },
    { id: '3', day: '周六', startTime: '10:00', endTime: '13:00', available: false },
  ])

  const [inclusions, setInclusions] = useState<Inclusion[]>([
    { id: '1', item: '专业导师指导', included: true },
    { id: '2', item: '所有材料费用', included: true },
    { id: '3', item: '作品可带走', included: true },
    { id: '4', item: '茶点供应', included: false },
  ])

  const steps = [
    { id: 1, title: '基本信息', icon: Info },
    { id: 2, title: '时间安排', icon: Calendar },
    { id: 3, title: '价格设置', icon: DollarSign },
    { id: 4, title: '多语言', icon: Languages },
  ]

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleAddSchedule = () => {
    const newSlot: ScheduleSlot = {
      id: Date.now().toString(),
      day: '周二',
      startTime: '09:00',
      endTime: '12:00',
      available: true
    }
    setSchedule([...schedule, newSlot])
  }

  const handleRemoveSchedule = (id: string) => {
    setSchedule(schedule.filter(s => s.id !== id))
  }

  const handleScheduleChange = (id: string, field: keyof ScheduleSlot, value: any) => {
    setSchedule(schedule.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const handleInclusionChange = (id: string, included: boolean) => {
    setInclusions(inclusions.map(i => i.id === id ? { ...i, included } : i))
  }

  const handleAddInclusion = () => {
    const newItem: Inclusion = {
      id: Date.now().toString(),
      item: '新增项目',
      included: true
    }
    setInclusions([...inclusions, newItem])
  }

  // 保存活动
  const handleSave = async () => {
    // 验证必填字段
    if (!formData.name.trim()) {
      toast.warning('请输入活动名称')
      return
    }
    if (!formData.category) {
      toast.warning('请选择活动分类')
      return
    }
    if (!formData.description.trim()) {
      toast.warning('请输入活动简介')
      return
    }
    if (!formData.adultPrice || parseFloat(formData.adultPrice) <= 0) {
      toast.warning('请输入有效的成人价格')
      return
    }

    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 这里应该调用API保存活动
      // 模拟保存成功
      toast.success('活动创建成功', '活动已保存并' + (formData.publish ? '发布' : '存入草稿'))
      
      // 保存到localStorage作为演示
      const activities = JSON.parse(localStorage.getItem('venue_activities') || '[]')
      activities.push({
        id: 'ACT-' + Date.now(),
        ...formData,
        tags,
        schedule,
        inclusions,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('venue_activities', JSON.stringify(activities))
      
      // 跳转到活动列表
      router.push('/venue/activities')
    } catch (error) {
      toast.error('保存失败', '请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (confirm('确定要取消吗？未保存的内容将丢失。')) {
      router.push('/venue/activities')
    }
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <PageHeader
          title="新建活动"
          description="创建一个新的体验活动"
          showBack
        />
      </FadeIn>

      {/* Progress Steps */}
      <FadeIn delay={0.1}>
        <div className="flex items-center gap-2 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentStep === step.id 
                    ? 'bg-amber-500 text-white' 
                    : currentStep > step.id
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-white/5 text-slate-400'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{step.title}</span>
              </button>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-600 mx-2" />
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <FadeIn delay={0.2} className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Info className="w-5 h-5" style={{ color: THEME_COLOR }} />
              活动基本信息
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">活动名称 <span className="text-red-400">*</span></Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="输入活动名称"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">活动分类 <span className="text-red-400">*</span></Label>
                  <Select value={formData.category} onValueChange={(v) => handleFormChange('category', v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141B2D] border-white/10">
                      <SelectItem value="culture">文化体验</SelectItem>
                      <SelectItem value="craft">手工艺</SelectItem>
                      <SelectItem value="food">美食</SelectItem>
                      <SelectItem value="photo">摄影</SelectItem>
                      <SelectItem value="outdoor">户外活动</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">活动简介 <span className="text-red-400">*</span></Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="简要描述活动内容，吸引用户参与..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">详细描述</Label>
                <Textarea 
                  value={formData.detailDescription}
                  onChange={(e) => handleFormChange('detailDescription', e.target.value)}
                  placeholder="详细介绍活动流程、亮点、注意事项等..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    活动时长 <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.duration} onValueChange={(v) => handleFormChange('duration', v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="选择时长" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141B2D] border-white/10">
                      <SelectItem value="1">1小时</SelectItem>
                      <SelectItem value="1.5">1.5小时</SelectItem>
                      <SelectItem value="2">2小时</SelectItem>
                      <SelectItem value="3">3小时</SelectItem>
                      <SelectItem value="4">4小时</SelectItem>
                      <SelectItem value="6">半天 (6小时)</SelectItem>
                      <SelectItem value="8">全天 (8小时)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    最大人数 <span className="text-red-400">*</span>
                  </Label>
                  <Input 
                    type="number"
                    value={formData.maxPeople}
                    onChange={(e) => handleFormChange('maxPeople', e.target.value)}
                    placeholder="例如: 12"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  活动地点 <span className="text-red-400">*</span>
                </Label>
                <Input 
                  value={formData.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder="详细地址"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                />
              </div>
            </div>
          </GlassCard>

          {/* Images */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" style={{ color: THEME_COLOR }} />
              活动图片
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-colors">
                <Upload className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-xs text-slate-500">上传图片</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-white/5 relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                  </div>
                  <button className="absolute top-2 right-2 p-1 bg-red-500/80 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">
              建议尺寸 1200x800px，支持 JPG、PNG 格式，最多上传 8 张图片
            </p>
          </GlassCard>

          {/* Schedule */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: THEME_COLOR }} />
                时间安排
              </h2>
              <GlowButton 
                size="sm" 
                variant="outline"
                onClick={handleAddSchedule}
              >
                <Plus className="w-4 h-4 mr-1" />
                添加时段
              </GlowButton>
            </div>
            <div className="space-y-3">
              {schedule.map((slot) => (
                <div key={slot.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Select 
                    value={slot.day} 
                    onValueChange={(v) => handleScheduleChange(slot.id, 'day', v)}
                  >
                    <SelectTrigger className="w-24 bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141B2D] border-white/10">
                      {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    type="time" 
                    value={slot.startTime}
                    onChange={(e) => handleScheduleChange(slot.id, 'startTime', e.target.value)}
                    className="w-28 bg-white/5 border-white/10 text-white"
                  />
                  <span className="text-slate-500">至</span>
                  <Input 
                    type="time" 
                    value={slot.endTime}
                    onChange={(e) => handleScheduleChange(slot.id, 'endTime', e.target.value)}
                    className="w-28 bg-white/5 border-white/10 text-white"
                  />
                  <div className="flex items-center gap-2 ml-auto">
                    <Switch 
                      checked={slot.available}
                      onCheckedChange={(v) => handleScheduleChange(slot.id, 'available', v)}
                    />
                    <span className="text-sm text-slate-400">
                      {slot.available ? '可预约' : '不可预约'}
                    </span>
                    <button 
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                      onClick={() => handleRemoveSchedule(slot.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Pricing */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" style={{ color: THEME_COLOR }} />
              价格设置
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">成人价格 (¥) <span className="text-red-400">*</span></Label>
                  <Input 
                    type="number"
                    value={formData.adultPrice}
                    onChange={(e) => handleFormChange('adultPrice', e.target.value)}
                    placeholder="例如: 168"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">儿童价格 (¥)</Label>
                  <Input 
                    type="number"
                    value={formData.childPrice}
                    onChange={(e) => handleFormChange('childPrice', e.target.value)}
                    placeholder="不填则与成人同价"
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    id="group-discount" 
                    checked={formData.groupDiscount}
                    onCheckedChange={(v) => handleFormChange('groupDiscount', v)}
                  />
                  <Label htmlFor="group-discount" className="text-slate-300">启用团体优惠</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="early-bird" 
                    checked={formData.earlyBird}
                    onCheckedChange={(v) => handleFormChange('earlyBird', v)}
                  />
                  <Label htmlFor="early-bird" className="text-slate-300">早鸟优惠</Label>
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Sidebar */}
        <FadeIn delay={0.3} className="space-y-6">
          {/* Tags */}
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4" style={{ color: THEME_COLOR }} />
              标签
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="bg-amber-500/10 text-amber-400 border-amber-500/20 cursor-pointer hover:bg-red-500/10 hover:text-red-400"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="添加标签"
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <GlowButton 
                size="sm"
                color={THEME_COLOR}
                onClick={handleAddTag}
              >
                <Plus className="w-4 h-4" />
              </GlowButton>
            </div>
          </GlassCard>

          {/* Inclusions */}
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: THEME_COLOR }} />
              费用包含
            </h3>
            <div className="space-y-2">
              {inclusions.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Switch 
                    checked={item.included}
                    onCheckedChange={(v) => handleInclusionChange(item.id, v)}
                    id={`inclusion-${item.id}`}
                  />
                  <Label htmlFor={`inclusion-${item.id}`} className="text-slate-300 text-sm">
                    {item.item}
                  </Label>
                </div>
              ))}
            </div>
            <GlowButton 
              size="sm" 
              variant="outline"
              className="w-full mt-3"
              onClick={handleAddInclusion}
            >
              <Plus className="w-4 h-4 mr-1" />
              添加项目
            </GlowButton>
          </GlassCard>

          {/* AI Assist */}
          <GlassCard className="p-4 border-amber-500/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-white">AI 智能助手</p>
                <p className="text-sm text-slate-400 mt-1">
                  使用 AI 生成活动描述、优化标题、翻译多语言内容
                </p>
                <GlowButton 
                  size="sm" 
                  color={THEME_COLOR}
                  className="mt-3"
                  onClick={() => toast.info('AI功能开发中', '敬请期待')}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  使用 AI 优化
                </GlowButton>
              </div>
            </div>
          </GlassCard>

          {/* Status */}
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" style={{ color: THEME_COLOR }} />
              发布设置
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">立即发布</Label>
                <Switch 
                  checked={formData.publish}
                  onCheckedChange={(v) => handleFormChange('publish', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">接受预订</Label>
                <Switch 
                  checked={formData.acceptBooking}
                  onCheckedChange={(v) => handleFormChange('acceptBooking', v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">显示在首页</Label>
                <Switch 
                  checked={formData.showOnHome}
                  onCheckedChange={(v) => handleFormChange('showOnHome', v)}
                />
              </div>
            </div>
          </GlassCard>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <GlowButton 
              color={THEME_COLOR}
              className="w-full"
              onClick={handleSave}
              disabled={saving}
              icon={<Save className="w-4 h-4" />}
            >
              {saving ? '保存中...' : '保存活动'}
            </GlowButton>
            <GlowButton 
              variant="outline" 
              className="w-full"
              onClick={handleCancel}
              disabled={saving}
            >
              <X className="w-4 h-4 mr-2" />
              取消
            </GlowButton>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
