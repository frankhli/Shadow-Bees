import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Save,
  CheckCircle2,
} from 'lucide-react'

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'profile', label: '账户信息', icon: User },
    { id: 'notifications', label: '通知设置', icon: Bell },
    { id: 'security', label: '安全设置', icon: Shield },
    { id: 'payment', label: '收款账户', icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">系统设置</h2>
          <p className="text-gray-400 text-sm mt-1">管理您的账户和偏好设置</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors"
        >
          <Save size={18} />
          保存设置
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400"
        >
          <CheckCircle2 size={20} />
          设置已保存！
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧导航 */}
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                    ${activeTab === tab.id
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                      : 'text-gray-400 hover:bg-dark-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* 右侧内容 */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">账户信息</h3>
              
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-2xl font-bold text-white">
                  胡
                </div>
                <div>
                  <button className="px-4 py-2 bg-dark-700 rounded-lg text-white text-sm hover:bg-dark-600 transition-colors">
                    更换头像
                  </button>
                  <p className="text-gray-500 text-xs mt-2">支持 JPG、PNG 格式，最大 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">联系人姓名</label>
                  <input
                    type="text"
                    defaultValue="王经理"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">职位</label>
                  <input
                    type="text"
                    defaultValue="酒店经理"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">登录邮箱</label>
                <input
                  type="email"
                  defaultValue="manager@hutonghotel.com"
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">手机号</label>
                <input
                  type="tel"
                  defaultValue="+86 138 1234 5678"
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">通知设置</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'new_order', label: '新订单通知', desc: '当有新订单时发送邮件和短信' },
                  { id: 'order_cancel', label: '订单取消通知', desc: '当客人取消订单时通知' },
                  { id: 'ai_chat', label: 'AI 客服转人工', desc: '当 AI 无法回答需要人工介入时' },
                  { id: 'daily_report', label: '每日经营报告', desc: '每天早上发送昨日经营数据' },
                  { id: 'weekly_report', label: '每周分析报告', desc: '每周一发送周报' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">安全设置</h3>
              
              <div className="p-4 bg-dark-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">登录密码</p>
                    <p className="text-gray-500 text-sm">上次修改：2024-02-01</p>
                  </div>
                  <button className="px-4 py-2 bg-dark-700 rounded-lg text-white text-sm hover:bg-dark-600 transition-colors">
                    修改密码
                  </button>
                </div>
              </div>

              <div className="p-4 bg-dark-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">两步验证</p>
                    <p className="text-gray-500 text-sm">使用手机验证码增强账户安全</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-dark-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">登录设备管理</p>
                    <p className="text-gray-500 text-sm">查看和管理已登录的设备</p>
                  </div>
                  <button className="px-4 py-2 bg-dark-700 rounded-lg text-white text-sm hover:bg-dark-600 transition-colors">
                    查看设备
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-white">收款账户</h3>
              
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={18} />
                  <span className="font-medium">账户已认证</span>
                </div>
                <p className="text-gray-400 text-sm mt-1">您可以正常接收平台结算款项</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">银行账户名</label>
                <input
                  type="text"
                  defaultValue="北京胡同里酒店管理有限公司"
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">银行账号</label>
                  <input
                    type="text"
                    defaultValue="6222 **** **** 1234"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">开户银行</label>
                  <input
                    type="text"
                    defaultValue="中国工商银行"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">结算周期</label>
                <select className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none">
                  <option value="t7">T+7（7天后结算）</option>
                  <option value="t14">T+14（14天后结算）</option>
                  <option value="t30">T+30（30天后结算）</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
