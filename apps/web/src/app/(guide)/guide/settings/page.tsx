'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn } from '@/components/animations/FadeIn'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Bell, 
  Shield,
  Camera,
  CheckCircle,
  Languages,
  Save,
  Lock,
  MessageCircle,
  Eye,
  EyeOff,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const THEME_COLOR = '#00E396'

interface GuideSettings {
  name: string
  phone: string
  email: string
  city: string
  bio: string
  avatar: string
  languages: { code: string; name: string; level: string; certified: boolean }[]
  serviceAreas: { name: string; checked: boolean }[]
  notifications: { label: string; checked: boolean }[]
  wechatBound: boolean
}

const defaultSettings: GuideSettings = {
  name: '张伟',
  phone: '138****8888',
  email: 'zhang@example.com',
  city: '北京市',
  bio: '专业北京本地导游，擅长历史文化讲解',
  avatar: '👨‍💼',
  languages: [
    { code: 'zh', name: '中文', level: '母语', certified: true },
    { code: 'en', name: 'English', level: '专业级', certified: true },
    { code: 'ja', name: '日本語', level: '高级', certified: true },
    { code: 'es', name: 'Español', level: '中级', certified: false },
    { code: 'fr', name: 'Français', level: '中级', certified: false },
  ],
  serviceAreas: [
    { name: '故宫/天安门', checked: true },
    { name: '长城', checked: true },
    { name: '颐和园', checked: true },
    { name: '798艺术区', checked: false },
    { name: '胡同/南锣鼓巷', checked: true },
    { name: '鸟巢/水立方', checked: false },
  ],
  notifications: [
    { label: '新订单提醒', checked: true },
    { label: '订单状态变更', checked: true },
    { label: '客户消息通知', checked: true },
    { label: '收入结算通知', checked: true },
    { label: '平台公告', checked: false },
    { label: '营销邮件', checked: false },
  ],
  wechatBound: false,
}

const avatarOptions = ['👨‍💼', '👩‍💼', '👨‍🦱', '👩‍🦱', '👨‍🦰', '👩‍🦰', '👱‍♂️', '👱‍♀️', '🧔', '👳‍♂️']

export default function GuideSettingsPage() {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<GuideSettings>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)
  
  // 头像选择弹窗
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)
  
  // 密码修改弹窗
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })
  
  // 微信绑定二维码弹窗
  const [showWechatDialog, setShowWechatDialog] = useState(false)
  const [wechatBinding, setWechatBinding] = useState(false)

  // 加载保存的设置
  useEffect(() => {
    const saved = localStorage.getItem('guide_settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  // 监听变化
  useEffect(() => {
    const saved = localStorage.getItem('guide_settings')
    const currentSaved = saved ? JSON.parse(saved) : defaultSettings
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(currentSaved))
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('guide_settings', JSON.stringify(settings))
      toast.success('设置已保存', '个人信息已更新')
      setHasChanges(false)
    } catch (error) {
      toast.error('保存失败', '请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (updates: Partial<GuideSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const handleLanguageLevelChange = (code: string, level: string) => {
    const newLanguages = settings.languages.map(l => 
      l.code === code ? { ...l, level } : l
    )
    updateSettings({ languages: newLanguages })
  }

  const handleServiceAreaChange = (name: string, checked: boolean) => {
    const newAreas = settings.serviceAreas.map(a => 
      a.name === name ? { ...a, checked } : a
    )
    updateSettings({ serviceAreas: newAreas })
  }

  const handleNotificationChange = (label: string, checked: boolean) => {
    const newNotifications = settings.notifications.map(n => 
      n.label === label ? { ...n, checked } : n
    )
    updateSettings({ notifications: newNotifications })
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="个人设置"
            description="管理您的个人信息和服务设置"
          />
          {hasChanges && (
            <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-yellow-400 text-sm">有未保存的更改</span>
            </div>
          )}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：基本信息 */}
        <FadeIn delay={0.1} className="lg:col-span-2 space-y-6">
          {/* 个人信息 */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5" style={{ color: THEME_COLOR }} />
              基本信息
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 flex items-center justify-center overflow-hidden text-5xl">
                    {settings.avatar}
                  </div>
                  <button 
                    className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"
                    onClick={() => setShowAvatarDialog(true)}
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{settings.name}</h3>
                  <p className="text-slate-400">金牌导游 · 认证ID: GD2024001</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-emerald-500/20 text-emerald-400">已认证</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">5年经验</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">真实姓名</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      value={settings.name}
                      onChange={(e) => updateSettings({ name: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">手机号</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      value={settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      value={settings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400">所在城市</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                      value={settings.city}
                      onChange={(e) => updateSettings({ city: e.target.value })}
                      className="pl-10 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* 语言能力 */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Languages className="w-5 h-5" style={{ color: THEME_COLOR }} />
              语言能力
            </h2>
            <div className="space-y-3">
              {settings.languages.map((lang) => (
                <div 
                  key={lang.code} 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-white w-20">{lang.name}</span>
                    <select
                      value={lang.level}
                      onChange={(e) => handleLanguageLevelChange(lang.code, e.target.value)}
                      className="bg-white/5 border border-white/10 text-white text-sm rounded px-2 py-1"
                    >
                      <option value="母语">母语</option>
                      <option value="专业级">专业级</option>
                      <option value="高级">高级</option>
                      <option value="中级">中级</option>
                      <option value="初级">初级</option>
                    </select>
                    {lang.certified && (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  {!lang.certified && (
                    <GlowButton 
                      size="sm" 
                      variant="outline"
                      onClick={() => toast.info('认证申请已提交')}
                    >
                      申请认证
                    </GlowButton>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* 服务区域 */}
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" style={{ color: THEME_COLOR }} />
              服务区域
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {settings.serviceAreas.map((area) => (
                <label 
                  key={area.name}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <input 
                    type="checkbox" 
                    checked={area.checked}
                    onChange={(e) => handleServiceAreaChange(area.name, e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-slate-300 text-sm">{area.name}</span>
                </label>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* 右侧：通知和安全 */}
        <FadeIn delay={0.2} className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: THEME_COLOR }} />
              通知设置
            </h3>
            <div className="space-y-4">
              {settings.notifications.map((item) => (
                <label key={item.label} className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300 text-sm">{item.label}</span>
                  <Switch 
                    checked={item.checked}
                    onCheckedChange={(v) => handleNotificationChange(item.label, v)}
                  />
                </label>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: THEME_COLOR }} />
              账号安全
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">实名认证</p>
                    <p className="text-xs text-slate-500">已完成</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm">导游资格证</p>
                    <p className="text-xs text-slate-500">已认证</p>
                  </div>
                </div>
              </div>

              <GlowButton 
                variant="outline" 
                className="w-full"
                icon={<Lock className="w-4 h-4" />}
                onClick={() => setShowPasswordDialog(true)}
              >
                修改密码
              </GlowButton>
              <GlowButton 
                variant="outline" 
                className="w-full"
                icon={<MessageCircle className="w-4 h-4" />}
                onClick={() => settings.wechatBound ? toast.info('已绑定微信') : setShowWechatDialog(true)}
              >
                {settings.wechatBound ? '已绑定微信' : '绑定微信'}
              </GlowButton>
            </div>
          </GlassCard>

          <GlowButton 
            color={THEME_COLOR}
            className="w-full"
            onClick={handleSave}
            disabled={saving || !hasChanges}
            icon={<Save className="w-4 h-4" />}
          >
            {saving ? '保存中...' : '保存修改'}
          </GlowButton>
        </FadeIn>
      </div>

      {/* 头像选择弹窗 */}
      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>选择头像</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-5 gap-3 py-4">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => {
                  updateSettings({ avatar })
                  setShowAvatarDialog(false)
                  toast.success('头像已更新')
                }}
                className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                  settings.avatar === avatar 
                    ? 'bg-emerald-500/20 border-2 border-emerald-500' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* 密码修改弹窗 */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>修改密码</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">当前密码</label>
              <div className="relative">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white pr-10"
                  placeholder="请输入当前密码"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                >
                  {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">新密码</label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white pr-10"
                  placeholder="请输入新密码（至少6位）"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                >
                  {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">确认新密码</label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white pr-10"
                  placeholder="请再次输入新密码"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                >
                  {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <GlowButton 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPasswordDialog(false)}
              >
                取消
              </GlowButton>
              <GlowButton 
                color={THEME_COLOR}
                className="flex-1"
                onClick={() => {
                  if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
                    toast.warning('请填写所有字段')
                    return
                  }
                  if (passwordForm.new.length < 6) {
                    toast.warning('新密码至少6位')
                    return
                  }
                  if (passwordForm.new !== passwordForm.confirm) {
                    toast.warning('两次输入的新密码不一致')
                    return
                  }
                  toast.success('密码修改成功', '请使用新密码登录')
                  setShowPasswordDialog(false)
                  setPasswordForm({ current: '', new: '', confirm: '' })
                }}
              >
                确认修改
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 微信绑定弹窗 */}
      <Dialog open={showWechatDialog} onOpenChange={setShowWechatDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>绑定微信</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            {wechatBinding ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <p className="text-white">绑定成功！</p>
              </div>
            ) : (
              <>
                <div className="w-48 h-48 mx-auto bg-white rounded-lg p-2 mb-4">
                  {/* 模拟二维码 */}
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="grid grid-cols-5 gap-1 mb-2">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`w-6 h-6 ${Math.random() > 0.5 ? 'bg-white' : 'bg-slate-900'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-white">微信扫码绑定</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4">请使用微信扫一扫绑定账号</p>
                <GlowButton 
                  color={THEME_COLOR}
                  onClick={() => {
                    setWechatBinding(true)
                    setTimeout(() => {
                      updateSettings({ wechatBound: true })
                      setShowWechatDialog(false)
                      setWechatBinding(false)
                      toast.success('微信绑定成功', '您将收到微信消息通知')
                    }, 1500)
                  }}
                >
                  模拟绑定成功
                </GlowButton>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
