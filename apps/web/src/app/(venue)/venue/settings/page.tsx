'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn } from '@/components/animations/FadeIn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Store, 
  MapPin, 
  Phone, 
  Clock,
  Image,
  Save,
  Upload,
  Globe,
  Mail
} from 'lucide-react'
import { useState, useEffect } from 'react'

const THEME_COLOR = '#FFB800'

interface VenueSettings {
  name: string
  description: string
  phone: string
  backupPhone: string
  address: string
  transportGuide: string
  wechatId: string
  email: string
  businessHours: { day: string; open: string; close: string; closed: boolean }[]
  tags: string[]
  isOpen: boolean
}

const defaultSettings: VenueSettings = {
  name: '老北京茶馆',
  description: '百年老字号茶馆，提供正宗北京茶文化体验。品茗、听曲、感受老北京生活。',
  phone: '010-12345678',
  backupPhone: '138-0000-0000',
  address: '北京市东城区前门大街123号',
  transportGuide: '地铁2号线前门站B出口，步行5分钟',
  wechatId: 'laobeijingchaguan',
  email: 'contact@laobeijing.com',
  businessHours: [
    { day: '周一', open: '09:00', close: '21:00', closed: false },
    { day: '周二', open: '09:00', close: '21:00', closed: false },
    { day: '周三', open: '09:00', close: '21:00', closed: false },
    { day: '周四', open: '09:00', close: '21:00', closed: false },
    { day: '周五', open: '09:00', close: '22:00', closed: false },
    { day: '周六', open: '08:00', close: '22:00', closed: false },
    { day: '周日', open: '08:00', close: '21:00', closed: false },
  ],
  tags: ['茶文化', '老字号', '体验', '休闲', '传统'],
  isOpen: true,
}

export default function VenueSettingsPage() {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'hours'>('basic')
  const [settings, setSettings] = useState<VenueSettings>(defaultSettings)
  const [newTag, setNewTag] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  // 加载保存的设置
  useEffect(() => {
    const saved = localStorage.getItem('venue_settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  // 监听变化
  useEffect(() => {
    const saved = localStorage.getItem('venue_settings')
    const currentSaved = saved ? JSON.parse(saved) : defaultSettings
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(currentSaved))
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('venue_settings', JSON.stringify(settings))
      toast.success('设置已保存', '店铺信息已更新')
      setHasChanges(false)
    } catch (error) {
      toast.error('保存失败', '请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<VenueSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const handleBusinessHourChange = (index: number, field: keyof VenueSettings['businessHours'][0], value: any) => {
    const newHours = [...settings.businessHours]
    newHours[index] = { ...newHours[index], [field]: value }
    updateSettings({ businessHours: newHours })
  }

  const handleAddTag = () => {
    if (newTag && !settings.tags.includes(newTag)) {
      updateSettings({ tags: [...settings.tags, newTag] })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    updateSettings({ tags: settings.tags.filter(t => t !== tag) })
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="店铺设置"
            description="管理店铺基本信息和联系方式"
          />
          {hasChanges && (
            <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-yellow-400 text-sm">有未保存的更改</span>
            </div>
          )}
        </div>
      </FadeIn>

      {/* 设置标签 */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2">
          {[
            { id: 'basic', label: '基本信息', icon: Store },
            { id: 'contact', label: '联系方式', icon: Phone },
            { id: 'hours', label: '营业时间', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧表单 */}
        <FadeIn delay={0.2} className="lg:col-span-2 space-y-6">
          {activeTab === 'basic' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">基本信息</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">店铺名称</Label>
                  <Input 
                    value={settings.name}
                    onChange={(e) => updateSettings({ name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">店铺简介</Label>
                  <Textarea 
                    value={settings.description}
                    onChange={(e) => updateSettings({ description: e.target.value })}
                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">店铺封面图</Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-amber-500/50 transition-colors cursor-pointer">
                    <Image className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">拖拽图片到此处，或点击上传</p>
                    <GlowButton size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      选择图片
                    </GlowButton>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">店铺标签</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {settings.tags.map((tag) => (
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
                      className="bg-white/5 border-white/10 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <GlowButton size="sm" color={THEME_COLOR} onClick={handleAddTag}>
                      添加
                    </GlowButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === 'contact' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">联系方式</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      联系电话
                    </Label>
                    <Input 
                      value={settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">备用电话</Label>
                    <Input 
                      value={settings.backupPhone}
                      onChange={(e) => updateSettings({ backupPhone: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    邮箱
                  </Label>
                  <Input 
                    value={settings.email}
                    onChange={(e) => updateSettings({ email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    详细地址
                  </Label>
                  <Textarea 
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">交通指引</Label>
                  <Textarea 
                    value={settings.transportGuide}
                    onChange={(e) => updateSettings({ transportGuide: e.target.value })}
                    placeholder="为游客提供详细的交通指引"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    微信公众号
                  </Label>
                  <Input 
                    value={settings.wechatId}
                    onChange={(e) => updateSettings({ wechatId: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === 'hours' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">营业时间</h2>
              <div className="space-y-4">
                {settings.businessHours.map((schedule, index) => (
                  <div key={schedule.day} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                    <span className="w-16 text-slate-300">{schedule.day}</span>
                    <Switch 
                      checked={!schedule.closed}
                      onCheckedChange={(v) => handleBusinessHourChange(index, 'closed', !v)}
                    />
                    {schedule.closed ? (
                      <Badge className="bg-slate-700 text-slate-400">休息</Badge>
                    ) : (
                      <>
                        <Input 
                          type="time"
                          value={schedule.open}
                          onChange={(e) => handleBusinessHourChange(index, 'open', e.target.value)}
                          className="w-24 bg-white/5 border-white/10 text-white text-center"
                        />
                        <span className="text-slate-500">至</span>
                        <Input 
                          type="time"
                          value={schedule.close}
                          onChange={(e) => handleBusinessHourChange(index, 'close', e.target.value)}
                          className="w-24 bg-white/5 border-white/10 text-white text-center"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </FadeIn>

        {/* 右侧信息 */}
        <FadeIn delay={0.3} className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4">店铺状态</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">营业状态</span>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={settings.isOpen}
                    onCheckedChange={(v) => updateSettings({ isOpen: v })}
                  />
                  <Badge className={settings.isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                    {settings.isOpen ? '营业中' : '已打烊'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">认证状态</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">已认证</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">评分</span>
                <span className="text-white font-medium">4.8 ⭐</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4">操作</h3>
            <div className="space-y-3">
              <GlowButton 
                color={THEME_COLOR}
                className="w-full"
                onClick={handleSave}
                disabled={saving || !hasChanges}
                icon={<Save className="w-4 h-4" />}
              >
                {saving ? '保存中...' : '保存设置'}
              </GlowButton>
              <GlowButton 
                variant="outline" 
                className="w-full"
                onClick={() => toast.info('预览功能开发中')}
              >
                预览店铺页面
              </GlowButton>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  )
}
