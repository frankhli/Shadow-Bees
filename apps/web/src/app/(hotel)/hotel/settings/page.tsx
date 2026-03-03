'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/stores/toastStore'
import { FadeIn } from '@/components/animations/FadeIn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  Plus, 
  Trash2, 
  CheckCircle,
  Save,
  Phone,
  MapPin,
  Mail,
  Lock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const THEME_COLOR = '#00D9FF'

interface StaffMember {
  id: number
  name: string
  role: string
  status: 'online' | 'offline'
  email: string
}

interface HotelSettings {
  name: string
  phone: string
  email: string
  address: string
  description: string
  notifications: {
    newOrder: boolean
    aiHandover: boolean
    priceChange: boolean
    reviewAlert: boolean
    systemNotice: boolean
  }
}

const defaultSettings: HotelSettings = {
  name: '胡同里精品酒店',
  phone: '010-12345678',
  email: 'contact@hutonghotel.com',
  address: '北京市东城区南锣鼓巷12号',
  description: '位于北京胡同深处的精品酒店，体验地道北京生活',
  notifications: {
    newOrder: true,
    aiHandover: true,
    priceChange: false,
    reviewAlert: true,
    systemNotice: true,
  },
}

const defaultStaff: StaffMember[] = [
  { id: 1, name: '张经理', role: '店长', status: 'online', email: 'manager@hutonghotel.com' },
  { id: 2, name: '李前台', role: '前台', status: 'offline', email: 'frontdesk@hutonghotel.com' },
]

export default function HotelSettingsPage() {
  const toast = useToast()
  const [activeTab, setActiveTab] = useState<'info' | 'staff' | 'notifications' | 'security'>('info')
  const [settings, setSettings] = useState<HotelSettings>(defaultSettings)
  const [staff, setStaff] = useState<StaffMember[]>(defaultStaff)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  
  // 弹窗状态
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false)
  const [newStaffName, setNewStaffName] = useState('')
  const [newStaffRole, setNewStaffRole] = useState('前台')
  const [newStaffEmail, setNewStaffEmail] = useState('')
  
  // 密码修改
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // 加载保存的设置
  useEffect(() => {
    const savedSettings = localStorage.getItem('hotel_settings')
    const savedStaff = localStorage.getItem('hotel_staff')
    if (savedSettings) setSettings(JSON.parse(savedSettings))
    if (savedStaff) setStaff(JSON.parse(savedStaff))
  }, [])

  // 监听变化
  useEffect(() => {
    const savedSettings = localStorage.getItem('hotel_settings')
    const currentSaved = savedSettings ? JSON.parse(savedSettings) : defaultSettings
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(currentSaved))
  }, [settings])

  const updateSettings = (updates: Partial<HotelSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }

  const updateNotifications = (key: keyof HotelSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }))
  }

  // 保存酒店信息
  const handleSave = async () => {
    if (!settings.name.trim() || !settings.phone.trim() || !settings.address.trim()) {
      toast.warning('请填写完整的酒店信息')
      return
    }
    
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('hotel_settings', JSON.stringify(settings))
      localStorage.setItem('hotel_staff', JSON.stringify(staff))
      toast.success('设置已保存', '酒店信息已更新')
      setHasChanges(false)
    } catch (error) {
      toast.error('保存失败', '请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  // 添加员工
  const handleAddStaff = () => {
    if (!newStaffName.trim()) {
      toast.warning('请输入员工姓名')
      return
    }
    if (!newStaffEmail.trim()) {
      toast.warning('请输入员工邮箱')
      return
    }
    
    const newStaff: StaffMember = {
      id: Date.now(),
      name: newStaffName,
      role: newStaffRole,
      status: 'offline',
      email: newStaffEmail,
    }
    setStaff([...staff, newStaff])
    setNewStaffName('')
    setNewStaffEmail('')
    setShowAddStaffDialog(false)
    toast.success('员工已添加', `${newStaffName} 已加入团队`)
  }

  // 删除员工
  const handleRemoveStaff = (id: number) => {
    if (confirm('确定要删除该员工吗？')) {
      setStaff(staff.filter(s => s.id !== id))
      toast.success('员工已删除')
    }
  }

  // 修改密码
  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.warning('请填写所有密码字段')
      return
    }
    if (passwords.new !== passwords.confirm) {
      toast.warning('新密码与确认密码不一致')
      return
    }
    if (passwords.new.length < 6) {
      toast.warning('新密码长度至少6位')
      return
    }
    toast.success('密码修改成功', '请使用新密码重新登录')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="酒店设置"
            description="管理酒店信息和系统配置"
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
            { id: 'info', label: '基本信息', icon: Building2 },
            { id: 'staff', label: '员工管理', icon: User },
            { id: 'notifications', label: '通知设置', icon: Bell },
            { id: 'security', label: '安全设置', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
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
          {activeTab === 'info' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Building2 className="w-5 h-5" style={{ color: THEME_COLOR }} />
                基本信息
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300">酒店名称</Label>
                  <Input 
                    value={settings.name}
                    onChange={(e) => updateSettings({ name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    酒店地址
                  </Label>
                  <Input 
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">酒店简介</Label>
                  <textarea
                    value={settings.description}
                    onChange={(e) => updateSettings({ description: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-white/20"
                  />
                </div>
              </div>
            </GlassCard>
          )}

          {activeTab === 'staff' && (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5" style={{ color: THEME_COLOR }} />
                  员工管理
                </h2>
                <GlowButton
                  size="sm"
                  color={THEME_COLOR}
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowAddStaffDialog(true)}
                >
                  添加员工
                </GlowButton>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {staff.map((member) => (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 flex items-center justify-center text-cyan-400 font-medium">
                          {member.name[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">{member.name}</p>
                          <p className="text-slate-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={member.status === 'online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}>
                          {member.status === 'online' ? '在线' : '离线'}
                        </Badge>
                        <Badge className="bg-white/10 text-slate-300">{member.role}</Badge>
                        <button
                          onClick={() => handleRemoveStaff(member.id)}
                          className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassCard>
          )}

          {activeTab === 'notifications' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5" style={{ color: THEME_COLOR }} />
                通知设置
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'newOrder', label: '新订单提醒', desc: '当有新订单时接收通知' },
                  { key: 'aiHandover', label: 'AI转人工提醒', desc: '当AI客服需要转人工时通知' },
                  { key: 'priceChange', label: '价格变动提醒', desc: '当市场价格大幅变动时通知' },
                  { key: 'reviewAlert', label: '评价提醒', desc: '当收到新评价时通知' },
                  { key: 'systemNotice', label: '系统公告', desc: '接收平台重要公告' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                    <Switch
                      checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                      onCheckedChange={(v) => updateNotifications(item.key as any, v)}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {activeTab === 'security' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: THEME_COLOR }} />
                安全设置
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    当前密码
                  </Label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="输入当前密码"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">新密码</Label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="输入新密码（至少6位）"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">确认新密码</Label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="再次输入新密码"
                  />
                </div>
                <GlowButton
                  color={THEME_COLOR}
                  onClick={handleChangePassword}
                >
                  修改密码
                </GlowButton>
              </div>
            </GlassCard>
          )}
        </FadeIn>

        {/* 右侧信息 */}
        <FadeIn delay={0.3} className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-white font-medium mb-4">认证状态</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">酒店认证</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  已认证
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">营业执照</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">已上传</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">特行许可证</span>
                <Badge className="bg-emerald-500/20 text-emerald-400">已上传</Badge>
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
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* 添加员工弹窗 */}
      <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>添加员工</DialogTitle>
            <DialogDescription className="text-slate-400">
              添加新员工到酒店团队
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">姓名</Label>
              <Input
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                placeholder="输入员工姓名"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">邮箱</Label>
              <Input
                value={newStaffEmail}
                onChange={(e) => setNewStaffEmail(e.target.value)}
                placeholder="输入员工邮箱"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">职位</Label>
              <select
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              >
                <option value="前台">前台</option>
                <option value="客房">客房</option>
                <option value="经理">经理</option>
                <option value="财务">财务</option>
              </select>
            </div>
            <div className="flex gap-2">
              <GlowButton
                color="#8B9AAF"
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddStaffDialog(false)}
              >
                取消
              </GlowButton>
              <GlowButton
                color={THEME_COLOR}
                className="flex-1"
                onClick={handleAddStaff}
              >
                添加
              </GlowButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
