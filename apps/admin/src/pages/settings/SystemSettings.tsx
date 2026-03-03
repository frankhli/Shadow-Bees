import { motion } from 'framer-motion'
import {
  Settings,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Users,
  Save,
} from 'lucide-react'
import { useState } from 'react'

export function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: '通用设置', icon: Settings },
    { id: 'notifications', label: '通知', icon: Bell },
    { id: 'security', label: '安全', icon: Shield },
    { id: 'payment', label: '支付', icon: CreditCard },
    { id: 'i18n', label: '国际化', icon: Globe },
    { id: 'users', label: '管理员', icon: Users },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">系统设置</h2>
        <p className="text-gray-400 text-sm mt-1">管理平台全局配置</p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-4">平台信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">平台名称</label>
                      <input
                        type="text"
                        defaultValue="Tiohai"
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">客服邮箱</label>
                      <input
                        type="email"
                        defaultValue="support@tiohai.com"
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">联系电话</label>
                      <input
                        type="tel"
                        defaultValue="+86 400-123-4567"
                        className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-dark-600">
                  <h3 className="font-semibold text-white mb-4">业务设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">新酒店自动审核</p>
                        <p className="text-sm text-gray-500">关闭后新酒店需要人工审核</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">开放注册</p>
                        <p className="text-sm text-gray-500">关闭后禁止新用户注册</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-white mb-4">通知设置</h3>
                <div className="space-y-4">
                  {['新订单提醒', '退款申请', '酒店入驻申请', '系统异常', '每日报表'].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{item}</p>
                        <p className="text-sm text-gray-500">通过邮件接收通知</p>
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

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-white mb-4">支付设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">平台佣金比例 (%)</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">结算周期 (天)</label>
                    <select className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan">
                      <option value="7">7天</option>
                      <option value="15">15天</option>
                      <option value="30">30天</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">最小提现金额 (¥)</label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'i18n' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-white mb-4">语言设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">默认语言</label>
                    <select className="w-full bg-dark-900 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan">
                      <option value="zh">简体中文</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">支持的货币</label>
                    <div className="flex gap-2 flex-wrap">
                      {['CNY', 'USD', 'EUR', 'JPY', 'KRW'].map((currency) => (
                        <label key={currency} className="flex items-center gap-2 px-3 py-2 bg-dark-900 rounded-lg cursor-pointer">
                          <input type="checkbox" defaultChecked={['CNY', 'USD'].includes(currency)} />
                          <span className="text-white text-sm">{currency}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-white mb-4">安全设置</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-dark-900 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">两步验证 (2FA)</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">启用后登录需要验证码</p>
                  </div>
                  <div className="p-4 bg-dark-900 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">登录失败锁定</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">连续5次失败锁定账户30分钟</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-white mb-4">管理员账户</h3>
                <div className="space-y-3">
                  {[
                    { name: '超级管理员', email: 'admin@tiohai.com', role: 'super' },
                    { name: '运营专员', email: 'ops@tiohai.com', role: 'operator' },
                    { name: '财务人员', email: 'finance@tiohai.com', role: 'finance' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-dark-600">
                      <div>
                        <p className="text-white">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'super'
                          ? 'bg-neon-purple/20 text-neon-purple'
                          : user.role === 'operator'
                          ? 'bg-neon-cyan/20 text-neon-cyan'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {user.role === 'super' ? '超级管理员' : user.role === 'operator' ? '运营' : '财务'}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2 border border-dashed border-dark-600 rounded-lg text-gray-400 hover:text-white hover:border-neon-cyan transition-colors">
                  + 添加管理员
                </button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-dark-600 flex justify-end">
              <button className="px-6 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors flex items-center gap-2">
                <Save size={18} />
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
