'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { useToast } from '@/stores/toastStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { Save, Shield, CreditCard, Bot, Bell, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'

const THEME_COLOR = '#A855F7'

interface Settings {
  platformFee: string
  minWithdrawal: string
  settlementDays: string
  aiConfidence: string
  maxChatRounds: string
  autoTranslateReview: boolean
  autoPricingSuggestion: boolean
  twoFactorAuth: boolean
  operationLog: boolean
  loginFailLock: string
  emailNotification: boolean
  pushNotification: boolean
}

const defaultSettings: Settings = {
  platformFee: '10',
  minWithdrawal: '100',
  settlementDays: '7',
  aiConfidence: '0.7',
  maxChatRounds: '50',
  autoTranslateReview: true,
  autoPricingSuggestion: true,
  twoFactorAuth: true,
  operationLog: true,
  loginFailLock: '5',
  emailNotification: true,
  pushNotification: true,
}

export default function AdminSettingsPage() {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)

  // 加载保存的设置
  useEffect(() => {
    const saved = localStorage.getItem('admin_settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  // 监听变化
  useEffect(() => {
    const saved = localStorage.getItem('admin_settings')
    const currentSaved = saved ? JSON.parse(saved) : defaultSettings
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(currentSaved))
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('admin_settings', JSON.stringify(settings))
      toast.success('设置已保存', '系统配置已更新')
      setHasChanges(false)
    } catch (error) {
      toast.error('保存失败', '请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    const saved = localStorage.getItem('admin_settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    } else {
      setSettings(defaultSettings)
    }
    toast.info('已重置', '设置已恢复到最后保存的状态')
  }

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-8 space-y-6 min-h-screen">
      {/* 页面标题 */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <PageHeader
            title="系统设置"
            description="管理平台全局配置"
          />
          {hasChanges && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-yellow-400 text-sm">有未保存的更改</span>
            </div>
          )}
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 平台配置 */}
        <StaggerItem>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" style={{ color: THEME_COLOR }} />
              平台配置
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">平台服务费 (%)</label>
                <input
                  type="number"
                  value={settings.platformFee}
                  onChange={(e) => updateSetting('platformFee', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
                <p className="text-xs text-slate-500">从每笔订单中收取的平台服务费比例</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">最低提现金额 (¥)</label>
                <input
                  type="number"
                  value={settings.minWithdrawal}
                  onChange={(e) => updateSetting('minWithdrawal', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">结算周期 (天)</label>
                <input
                  type="number"
                  value={settings.settlementDays}
                  onChange={(e) => updateSetting('settlementDays', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
                <p className="text-xs text-slate-500">订单完成后多少天自动结算到供应商账户</p>
              </div>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* AI配置 */}
        <StaggerItem>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5" style={{ color: THEME_COLOR }} />
              AI 配置
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">AI 客服置信度阈值</label>
                <input
                  type="number"
                  step="0.1"
                  max="1"
                  min="0"
                  value={settings.aiConfidence}
                  onChange={(e) => updateSetting('aiConfidence', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
                <p className="text-xs text-slate-500">低于此阈值时转人工处理</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">最大对话轮数</label>
                <input
                  type="number"
                  value={settings.maxChatRounds}
                  onChange={(e) => updateSetting('maxChatRounds', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-slate-300 text-sm">自动翻译审核</p>
                  <p className="text-xs text-slate-500">AI翻译内容是否需要人工审核</p>
                </div>
                <Switch
                  checked={settings.autoTranslateReview}
                  onCheckedChange={(v) => updateSetting('autoTranslateReview', v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-slate-300 text-sm">自动定价建议</p>
                  <p className="text-xs text-slate-500">是否向供应商推送AI定价建议</p>
                </div>
                <Switch
                  checked={settings.autoPricingSuggestion}
                  onCheckedChange={(v) => updateSetting('autoPricingSuggestion', v)}
                />
              </div>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* 安全设置 */}
        <StaggerItem>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: THEME_COLOR }} />
              安全设置
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-slate-300 text-sm">登录二次验证</p>
                  <p className="text-xs text-slate-500">管理员登录时需要二次验证</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(v) => updateSetting('twoFactorAuth', v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-slate-300 text-sm">操作日志记录</p>
                  <p className="text-xs text-slate-500">记录所有管理员操作</p>
                </div>
                <Switch
                  checked={settings.operationLog}
                  onCheckedChange={(v) => updateSetting('operationLog', v)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">登录失败锁定次数</label>
                <input
                  type="number"
                  value={settings.loginFailLock}
                  onChange={(e) => updateSetting('loginFailLock', e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/20"
                />
              </div>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* 通知设置 */}
        <StaggerItem>
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" style={{ color: THEME_COLOR }} />
              通知设置
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-slate-300 text-sm">邮件通知</p>
                    <p className="text-xs text-slate-500">重要事件发送邮件通知</p>
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotification}
                  onCheckedChange={(v) => updateSetting('emailNotification', v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-slate-300 text-sm">推送通知</p>
                    <p className="text-xs text-slate-500">浏览器推送通知</p>
                  </div>
                </div>
                <Switch
                  checked={settings.pushNotification}
                  onCheckedChange={(v) => updateSetting('pushNotification', v)}
                />
              </div>
            </div>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>

      {/* 保存按钮 */}
      <FadeIn delay={0.4}>
        <GlassCard className="p-4">
          <div className="flex items-center justify-end gap-4">
            <GlowButton
              color="#8B9AAF"
              variant="outline"
              onClick={handleReset}
              disabled={saving || !hasChanges}
            >
              重置
            </GlowButton>
            <GlowButton
              color={THEME_COLOR}
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
  )
}
