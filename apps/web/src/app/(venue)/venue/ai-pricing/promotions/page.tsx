'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Tag, 
  Clock, 
  Users, 
  Percent, 
  Calendar, 
  Gift,
  TrendingUp,
  Zap,
  Save,
  Plus,
  Edit3,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Star,
  Ticket,
  UserPlus,
  PartyPopper,
  Sparkles,
  History,
  BarChart3,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'

// 促销活动数据
const promotions = [
  {
    id: 1,
    name: '早鸟特惠 - 7天提前预订',
    type: 'early_bird',
    discount: 15,
    discountType: 'percentage',
    minDays: 7,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageCount: 128,
    revenue: 18560,
    description: '提前7天预订可享受85折优惠',
    applicableActivities: ['全部活动'],
    stackable: false
  },
  {
    id: 2,
    name: '早鸟特惠 - 14天提前预订',
    type: 'early_bird',
    discount: 25,
    discountType: 'percentage',
    minDays: 14,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageCount: 86,
    revenue: 12480,
    description: '提前14天预订可享受75折优惠',
    applicableActivities: ['全部活动'],
    stackable: false
  },
  {
    id: 3,
    name: '团体优惠 - 6人及以上',
    type: 'group',
    discount: 20,
    discountType: 'percentage',
    minPeople: 6,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageCount: 45,
    revenue: 15800,
    description: '6人及以上团体享受8折优惠',
    applicableActivities: ['全部活动'],
    stackable: true
  },
  {
    id: 4,
    name: '团体优惠 - 10人及以上',
    type: 'group',
    discount: 30,
    discountType: 'percentage',
    minPeople: 10,
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageCount: 23,
    revenue: 11200,
    description: '10人及以上团体享受7折优惠',
    applicableActivities: ['全部活动'],
    stackable: true
  },
  {
    id: 5,
    name: '春节特惠活动',
    type: 'seasonal',
    discount: 50,
    discountType: 'percentage',
    status: 'scheduled',
    startDate: '2024-02-08',
    endDate: '2024-02-17',
    usageCount: 0,
    revenue: 0,
    description: '春节期间限时5折优惠',
    applicableActivities: ['老北京茶馆品茗体验', '京剧脸谱绘制工作坊'],
    stackable: false
  },
]

// 优惠码数据
const couponCodes = [
  { id: 1, code: 'WELCOME2024', discount: 20, type: 'percentage', usageLimit: 100, usedCount: 67, expiry: '2024-06-30', status: 'active' },
  { id: 2, code: 'VIP50', discount: 50, type: 'fixed', usageLimit: 50, usedCount: 23, expiry: '2024-03-31', status: 'active' },
  { id: 3, code: 'FAMILY30', discount: 30, type: 'percentage', usageLimit: 200, usedCount: 156, expiry: '2024-12-31', status: 'active' },
  { id: 4, code: 'NEWYEAR', discount: 100, type: 'fixed', usageLimit: 20, usedCount: 20, expiry: '2024-01-31', status: 'expired' },
]

// 会员等级折扣
const membershipTiers = [
  { id: 'bronze', name: '青铜会员', minSpending: 0, discount: 0, color: 'bg-amber-700', benefits: ['基础积分累积'] },
  { id: 'silver', name: '白银会员', minSpending: 1000, discount: 5, color: 'bg-slate-400', benefits: ['积分加速1.2倍', '生日礼券'] },
  { id: 'gold', name: '黄金会员', minSpending: 5000, discount: 10, color: 'bg-yellow-500', benefits: ['积分加速1.5倍', '专属客服', '优先预订'] },
  { id: 'platinum', name: '铂金会员', minSpending: 20000, discount: 15, color: 'bg-cyan-400', benefits: ['积分加速2倍', '专属活动', '免费升级', '生日礼物'] },
]

export default function PromotionsPage() {
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'promotions' | 'coupons' | 'membership'>('promotions')

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => setSaving(false), 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">进行中</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">待开始</Badge>
      case 'expired':
        return <Badge className="bg-slate-700 text-slate-400">已结束</Badge>
      default:
        return <Badge className="bg-slate-700 text-slate-400">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'early_bird': return Clock
      case 'group': return Users
      case 'seasonal': return PartyPopper
      default: return Tag
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="早鸟与团体优惠"
        description="设置促销活动策略，提升预订转化率和客单价"
        showBack={true}
      />

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Tag className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">活跃促销</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">本月优惠金额</p>
                <p className="text-2xl font-bold text-emerald-400">¥12,580</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">优惠使用人次</p>
                <p className="text-2xl font-bold text-white">282</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Percent className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">平均折扣率</p>
                <p className="text-2xl font-bold text-white">22%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 标签导航 */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'promotions', label: '促销活动', icon: Gift },
          { id: 'coupons', label: '优惠码', icon: Ticket },
          { id: 'membership', label: '会员等级', icon: Star },
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
          {activeTab === 'promotions' && (
            <>
              {/* AI建议 */}
              <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">AI促销建议</h3>
                      <p className="text-slate-300 text-sm mb-4">
                        根据历史数据分析，建议增设"工作日特惠"活动，针对周一至周四提供额外9折优惠，
                        预计可提升工作日预订率 15-20%。
                      </p>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          <Zap className="w-4 h-4 mr-2" />
                          创建建议活动
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                          查看分析报告
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 促销活动列表 */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Gift className="w-5 h-5 text-orange-400" />
                      促销活动列表
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      管理您的早鸟、团体等优惠活动
                    </CardDescription>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    新建活动
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {promotions.map((promo) => {
                    const TypeIcon = getTypeIcon(promo.type)
                    return (
                      <div 
                        key={promo.id}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-orange-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              promo.status === 'active' ? 'bg-orange-500/20' : 'bg-slate-700'
                            }`}>
                              <TypeIcon className={`w-5 h-5 ${
                                promo.status === 'active' ? 'text-orange-400' : 'text-slate-500'
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-white font-medium">{promo.name}</h4>
                                {getStatusBadge(promo.status)}
                              </div>
                              <p className="text-sm text-slate-400">{promo.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-3">
                          <div className="text-center p-2 bg-slate-900/50 rounded">
                            <p className="text-xs text-slate-500 mb-1">折扣</p>
                            <p className="text-lg font-bold text-orange-400">
                              {promo.discount}{promo.discountType === 'percentage' ? '%' : '元'}
                            </p>
                          </div>
                          <div className="text-center p-2 bg-slate-900/50 rounded">
                            <p className="text-xs text-slate-500 mb-1">使用次数</p>
                            <p className="text-lg font-bold text-white">{promo.usageCount}</p>
                          </div>
                          <div className="text-center p-2 bg-slate-900/50 rounded">
                            <p className="text-xs text-slate-500 mb-1">带来收益</p>
                            <p className="text-lg font-bold text-emerald-400">¥{promo.revenue.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-2 bg-slate-900/50 rounded">
                            <p className="text-xs text-slate-500 mb-1">可叠加</p>
                            <p className="text-lg font-bold text-white">
                              {promo.stackable ? '是' : '否'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span className="text-slate-400">
                                {promo.startDate} 至 {promo.endDate}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {promo.applicableActivities.map((activity, idx) => (
                              <Badge key={idx} variant="outline" className="border-slate-600 text-slate-400">
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'coupons' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-orange-400" />
                    优惠码管理
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    创建和管理优惠码活动
                  </CardDescription>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  新建优惠码
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {couponCodes.map((coupon) => (
                    <div 
                      key={coupon.id}
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-orange-500/20 rounded border border-orange-500/30">
                            <span className="text-orange-400 font-mono font-bold tracking-wider">
                              {coupon.code}
                            </span>
                          </div>
                          {getStatusBadge(coupon.status)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">优惠金额</p>
                          <p className="text-white font-semibold">
                            {coupon.discount}{coupon.type === 'percentage' ? '%' : '元'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">使用限制</p>
                          <p className="text-white font-semibold">{coupon.usageLimit}次</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">已使用</p>
                          <p className="text-white font-semibold">{coupon.usedCount}次</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">到期时间</p>
                          <p className="text-white font-semibold">{coupon.expiry}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-500 rounded-full transition-all"
                            style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 text-right">
                          使用率 {Math.round((coupon.usedCount / coupon.usageLimit) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'membership' && (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-400" />
                    会员等级设置
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    配置会员等级体系和权益
                  </CardDescription>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  添加等级
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {membershipTiers.map((tier, index) => (
                  <div 
                    key={tier.id}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${tier.color} flex items-center justify-center`}>
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{tier.name}</h4>
                          <p className="text-sm text-slate-400">
                            最低消费 ¥{tier.minSpending.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-400">{tier.discount}%</p>
                        <p className="text-xs text-slate-500">专属折扣</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-slate-400 text-sm">等级名称</Label>
                          <Input 
                            defaultValue={tier.name}
                            className="bg-slate-900 border-slate-700 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-slate-400 text-sm">折扣比例 (%)</Label>
                          <Input 
                            type="number"
                            defaultValue={tier.discount}
                            className="bg-slate-900 border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-400 text-sm">最低消费要求 (元)</Label>
                        <Input 
                          type="number"
                          defaultValue={tier.minSpending}
                          className="bg-slate-900 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-400 text-sm">会员权益</Label>
                        <div className="flex flex-wrap gap-2">
                          {tier.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="outline" className="border-orange-500/30 text-orange-400">
                              {benefit}
                            </Badge>
                          ))}
                          <Button size="sm" variant="outline" className="border-dashed border-slate-600 text-slate-500">
                            <Plus className="w-3 h-3 mr-1" />
                            添加权益
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? '保存中...' : '保存设置'}
              </Button>
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                <History className="w-4 h-4 mr-2" />
                查看使用记录
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">促销效果统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">早鸟优惠贡献</span>
                  <span className="text-white font-semibold">45%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">团体优惠贡献</span>
                  <span className="text-white font-semibold">32%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">优惠码使用</span>
                  <span className="text-white font-semibold">23%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '23%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">使用规则说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  早鸟优惠规则
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  根据预订提前天数自动计算折扣，可设置多档优惠力度
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-400" />
                  团体优惠规则
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  按预订人数阶梯计算折扣，可与早鸟优惠叠加使用
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-orange-400" />
                  优惠码规则
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  可设置使用次数限制、有效期和适用活动范围
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-400" />
                  会员折扣规则
                </h4>
                <p className="text-sm text-slate-400 pl-6">
                  会员等级折扣可与部分活动优惠叠加
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">最近活动</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                <div>
                  <p className="text-sm text-white">早鸟7天优惠被使用</p>
                  <p className="text-xs text-slate-500">5分钟前 - 订单 #20240115001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                <div>
                  <p className="text-sm text-white">团体优惠10人被激活</p>
                  <p className="text-xs text-slate-500">12分钟前 - 订单 #20240115002</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2" />
                <div>
                  <p className="text-sm text-white">优惠码 WELCOME2024 被使用</p>
                  <p className="text-xs text-slate-500">32分钟前</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
