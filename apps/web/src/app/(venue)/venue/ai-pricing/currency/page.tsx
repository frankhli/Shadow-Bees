'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  Coins, 
  DollarSign, 
  Euro, 
  JapaneseYen, 
  PoundSterling,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Globe,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Save,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Shield
} from 'lucide-react'
import { useState } from 'react'

// 支持的币种列表
const currencies = [
  { 
    code: 'CNY', 
    name: '人民币', 
    symbol: '¥', 
    flag: '🇨🇳',
    rate: 1.0000, 
    isDefault: true, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 0
  },
  { 
    code: 'USD', 
    name: '美元', 
    symbol: '$', 
    flag: '🇺🇸',
    rate: 0.1395, 
    isDefault: false, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 2.5
  },
  { 
    code: 'EUR', 
    name: '欧元', 
    symbol: '€', 
    flag: '🇪🇺',
    rate: 0.1278, 
    isDefault: false, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 2.5
  },
  { 
    code: 'JPY', 
    name: '日元', 
    symbol: '¥', 
    flag: '🇯🇵',
    rate: 20.8650, 
    isDefault: false, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 3.0
  },
  { 
    code: 'GBP', 
    name: '英镑', 
    symbol: '£', 
    flag: '🇬🇧',
    rate: 0.1095, 
    isDefault: false, 
    isActive: false,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: false,
    fee: 2.8
  },
  { 
    code: 'KRW', 
    name: '韩元', 
    symbol: '₩', 
    flag: '🇰🇷',
    rate: 186.2500, 
    isDefault: false, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 3.5
  },
  { 
    code: 'THB', 
    name: '泰铢', 
    symbol: '฿', 
    flag: '🇹🇭',
    rate: 4.9850, 
    isDefault: false, 
    isActive: false,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: false,
    fee: 3.2
  },
  { 
    code: 'SGD', 
    name: '新加坡元', 
    symbol: 'S$', 
    flag: '🇸🇬',
    rate: 0.1875, 
    isDefault: false, 
    isActive: true,
    lastUpdated: '2024-01-15 14:30',
    autoUpdate: true,
    fee: 2.5
  },
]

// 汇率历史数据（模拟）
const rateHistory = [
  { date: '1月9日', cny: 1.00, usd: 0.1385, eur: 0.1265 },
  { date: '1月10日', cny: 1.00, usd: 0.1388, eur: 0.1268 },
  { date: '1月11日', cny: 1.00, usd: 0.1390, eur: 0.1270 },
  { date: '1月12日', cny: 1.00, usd: 0.1392, eur: 0.1275 },
  { date: '1月13日', cny: 1.00, usd: 0.1393, eur: 0.1276 },
  { date: '1月14日', cny: 1.00, usd: 0.1394, eur: 0.1277 },
  { date: '1月15日', cny: 1.00, usd: 0.1395, eur: 0.1278 },
]

// 汇率预警设置
const alertSettings = [
  { id: 1, currency: 'USD', condition: '低于', threshold: 0.135, enabled: true },
  { id: 2, currency: 'EUR', condition: '高于', threshold: 0.130, enabled: true },
  { id: 3, currency: 'JPY', condition: '变动超过', threshold: 5, enabled: false },
]

export default function CurrencySettingsPage() {
  const [saving, setSaving] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState<'currencies' | 'rates' | 'alerts'>('currencies')

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const handleUpdateRates = () => {
    setUpdating(true)
    setTimeout(() => setUpdating(false), 1500)
  }

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case 'USD': return DollarSign
      case 'EUR': return Euro
      case 'JPY': return JapaneseYen
      case 'GBP': return PoundSterling
      default: return Coins
    }
  }

  const activeCurrencies = currencies.filter(c => c.isActive)

  return (
    <div className="p-8">
      <PageHeader
        title="多币种设置"
        description="管理支持结算的货币种类和汇率设置"
        showBack={true}
      />

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">支持币种</p>
                <p className="text-2xl font-bold text-white">{activeCurrencies.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">基准货币</p>
                <p className="text-2xl font-bold text-white">CNY</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">自动更新</p>
                <p className="text-2xl font-bold text-white">已启用</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">汇率源</p>
                <p className="text-2xl font-bold text-white">XE.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 标签导航 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'currencies', label: '币种管理', icon: Coins },
          { id: 'rates', label: '汇率走势', icon: TrendingUp },
          { id: 'alerts', label: '预警设置', icon: AlertTriangle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧主要内容 */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'currencies' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-400" />
                    币种管理
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    管理您店铺支持的结算货币
                  </CardDescription>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  添加币种
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currencies.map((currency) => {
                    const Icon = getCurrencyIcon(currency.code)
                    return (
                      <div 
                        key={currency.code}
                        className={`p-4 rounded-lg border transition-all ${
                          currency.isActive 
                            ? 'bg-slate-800/50 border-slate-700' 
                            : 'bg-slate-900/50 border-slate-800 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{currency.flag}</div>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              currency.isActive ? 'bg-orange-500/20' : 'bg-slate-800'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                currency.isActive ? 'text-orange-400' : 'text-slate-500'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-white font-medium">{currency.name}</h4>
                                {currency.isDefault && (
                                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                    默认
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-400">{currency.code} ({currency.symbol})</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-xs text-slate-500">当前汇率</p>
                              <p className="text-white font-mono">{currency.rate.toFixed(4)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">手续费</p>
                              <p className="text-white font-mono">{currency.fee}%</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch 
                                defaultChecked={currency.isActive}
                                className="data-[checked]:bg-orange-500"
                              />
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              {!currency.isDefault && (
                                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {currency.isActive && (
                          <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-400">更新: {currency.lastUpdated}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <RefreshCw className={`w-4 h-4 ${currency.autoUpdate ? 'text-emerald-400' : 'text-slate-500'}`} />
                              <span className={currency.autoUpdate ? 'text-emerald-400' : 'text-slate-500'}>
                                {currency.autoUpdate ? '自动更新' : '手动更新'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'rates' && (
            <>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    汇率走势
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    最近7天主要货币汇率变化
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* 汇率图表表格 */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">日期</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">CNY (基准)</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">USD</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">EUR</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-400">趋势</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rateHistory.map((row, index) => (
                          <tr key={index} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                            <td className="py-3 px-4 text-white">{row.date}</td>
                            <td className="py-3 px-4 text-center text-white font-mono">{row.cny.toFixed(4)}</td>
                            <td className="py-3 px-4 text-center text-white font-mono">{row.usd.toFixed(4)}</td>
                            <td className="py-3 px-4 text-center text-white font-mono">{row.eur.toFixed(4)}</td>
                            <td className="py-3 px-4 text-center">
                              {index > 0 ? (
                                row.usd > rateHistory[index - 1].usd ? (
                                  <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-400 mx-auto" />
                                )
                              ) : (
                                <span className="text-slate-500">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange-400" />
                    汇率更新设置
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">自动更新汇率</p>
                        <p className="text-sm text-slate-400">每小时自动从汇率源获取最新汇率</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[checked]:bg-orange-500" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-white font-medium">汇率波动保护</p>
                        <p className="text-sm text-slate-400">汇率单日变动超过5%时暂停自动更新</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[checked]:bg-orange-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">汇率源</Label>
                      <select className="w-full h-10 bg-slate-800 border border-slate-700 rounded-md text-white px-3">
                        <option>XE.com (推荐)</option>
                        <option>中国银行</option>
                        <option>欧洲央行</option>
                        <option>自定义API</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">更新频率</Label>
                      <select className="w-full h-10 bg-slate-800 border border-slate-700 rounded-md text-white px-3">
                        <option>每小时</option>
                        <option>每6小时</option>
                        <option>每12小时</option>
                        <option>每日</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'alerts' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    汇率预警设置
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    设置汇率变动预警阈值，及时掌握汇率变化
                  </CardDescription>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  添加预警
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertSettings.map((alert) => (
                    <div 
                      key={alert.id}
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                            {alert.currency}
                          </Badge>
                          <span className="text-white font-medium">
                            {currencies.find(c => c.code === alert.currency)?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            defaultChecked={alert.enabled}
                            className="data-[checked]:bg-orange-500"
                          />
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Label className="text-slate-400 text-sm">预警条件</Label>
                          <select className="w-full mt-1 h-9 bg-slate-900 border border-slate-700 rounded text-white text-sm px-3">
                            <option>{alert.condition}</option>
                            <option>高于</option>
                            <option>低于</option>
                            <option>变动超过</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <Label className="text-slate-400 text-sm">阈值</Label>
                          <Input 
                            defaultValue={alert.threshold}
                            className="mt-1 bg-slate-900 border-slate-700 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-400 font-medium mb-1">预警通知方式</p>
                      <p className="text-sm text-slate-400 mb-3">
                        当汇率触发预警条件时，系统将通过以下方式通知您：
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                          站内消息
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          邮件通知
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          短信通知
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          企业微信
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧边栏 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快捷操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handleUpdateRates}
                disabled={updating}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
                {updating ? '更新中...' : '立即更新汇率'}
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                <Save className="w-4 h-4 mr-2" />
                保存设置
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">汇率信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">最后更新</span>
                  <span className="text-white">2024-01-15 14:30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">更新源</span>
                  <span className="text-white">XE.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">下次更新</span>
                  <span className="text-white">15:30</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">使用提示</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                <p className="text-sm text-slate-400">
                  建议至少开启 USD、EUR 等主要货币，方便国际游客预订
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                <p className="text-sm text-slate-400">
                  汇率更新频率越高，定价越准确，但可能产生更多API调用费用
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                <p className="text-sm text-slate-400">
                  开启汇率波动保护可防止异常汇率影响您的收益
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">本月汇率统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">USD</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">0.1395</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">EUR</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">0.1278</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">JPY</span>
                <div className="flex items-center gap-2">
                  <span className="text-white">20.8650</span>
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
