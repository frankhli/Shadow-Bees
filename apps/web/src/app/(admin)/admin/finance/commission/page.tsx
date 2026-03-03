'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  PieChart,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Calendar,
  Building2,
  Users,
  MapPin,
  ArrowRight,
  DollarSign,
  FileText,
  ChevronDown,
  Filter,
  Search,
  CreditCard,
  BarChart3,
  Percent,
  Receipt
} from 'lucide-react'
import { useState } from 'react'

// 佣金结算统计数据
const commissionStats = {
  totalCommission: 1589600,
  pendingSettlement: 456800,
  settledThisMonth: 892400,
  settlementRate: 94,
  hotelCommission: 862400,
  guideCommission: 428960,
  venueCommission: 298240
}

// 待结算商家列表
const pendingMerchants = [
  { id: 1, name: '北京王府半岛酒店', type: 'hotel', amount: 45600, orders: 128, period: '2024-01-01 ~ 2024-01-31', status: 'pending' },
  { id: 2, name: '上海外滩茂悦大酒店', type: 'hotel', amount: 38200, orders: 96, period: '2024-01-01 ~ 2024-01-31', status: 'pending' },
  { id: 3, name: '张明 - 专业导游', type: 'guide', amount: 18500, orders: 45, period: '2024-01-01 ~ 2024-01-31', status: 'pending' },
  { id: 4, name: '成都宽窄巷子体验店', type: 'venue', amount: 12800, orders: 320, period: '2024-01-01 ~ 2024-01-31', status: 'processing' },
  { id: 5, name: '西安兵马俑导游服务', type: 'guide', amount: 22400, orders: 68, period: '2024-01-01 ~ 2024-01-31', status: 'pending' },
  { id: 6, name: '杭州西湖国宾馆', type: 'hotel', amount: 31500, orders: 85, period: '2024-01-01 ~ 2024-01-31', status: 'pending' }
]

// 佣金分成配置
const commissionRates = [
  { category: '酒店住宿', rate: 12, minAmount: 100, description: '按订单金额12%收取' },
  { category: '导游服务', rate: 15, minAmount: 50, description: '按订单金额15%收取' },
  { category: '体验店商品', rate: 8, minAmount: 20, description: '按订单金额8%收取' },
  { category: '特色餐饮', rate: 10, minAmount: 30, description: '按订单金额10%收取' }
]

// 结算历史记录
const settlementHistory = [
  { id: 'SET-2024-001', date: '2024-02-01', merchant: '北京王府半岛酒店', amount: 45600, status: 'completed', method: '银行转账' },
  { id: 'SET-2024-002', date: '2024-02-01', merchant: '上海外滩茂悦大酒店', amount: 38200, status: 'completed', method: '银行转账' },
  { id: 'SET-2024-003', date: '2024-02-01', merchant: '张明 - 专业导游', amount: 18500, status: 'completed', method: '支付宝' },
  { id: 'SET-2024-004', date: '2024-01-15', merchant: '成都宽窄巷子体验店', amount: 25600, status: 'completed', method: '微信支付' },
  { id: 'SET-2024-005', date: '2024-01-15', merchant: '西安兵马俑导游服务', amount: 19800, status: 'completed', method: '银行转账' },
  { id: 'SET-2024-006', date: '2024-01-15', merchant: '杭州西湖国宾馆', amount: 42300, status: 'completed', method: '银行转账' }
]

// 月度佣金趋势
const monthlyTrends = [
  { month: '2023-08', commission: 320000, settled: 310000 },
  { month: '2023-09', commission: 380000, settled: 375000 },
  { month: '2023-10', commission: 420000, settled: 418000 },
  { month: '2023-11', commission: 390000, settled: 385000 },
  { month: '2023-12', commission: 480000, settled: 475000 },
  { month: '2024-01', commission: 520000, settled: 892400 }
]

export default function CommissionPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [activeTab, setActiveTab] = useState('pending')

  const getMerchantIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return <Building2 className="w-4 h-4 text-blue-400" />
      case 'guide':
        return <Users className="w-4 h-4 text-green-400" />
      case 'venue':
        return <MapPin className="w-4 h-4 text-orange-400" />
      default:
        return <Building2 className="w-4 h-4 text-slate-400" />
    }
  }

  const getMerchantTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel':
        return '酒店'
      case 'guide':
        return '导游'
      case 'venue':
        return '体验店'
      default:
        return '其他'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 bg-yellow-500/10">待结算</Badge>
      case 'processing':
        return <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">处理中</Badge>
      case 'completed':
        return <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">已完成</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="佣金结算"
        description="管理平台佣金分成与商家结算"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">累计佣金收入</p>
                <p className="text-2xl font-bold text-white mt-1">¥{(commissionStats.totalCommission / 10000).toFixed(2)}万</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-emerald-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+18.5% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">待结算金额</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">¥{(commissionStats.pendingSettlement / 10000).toFixed(2)}万</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">共 {pendingMerchants.length} 个商家待结算</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">本月已结算</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">¥{(commissionStats.settledThisMonth / 10000).toFixed(2)}万</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">结算率 {commissionStats.settlementRate}%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">结算账户余额</p>
                <p className="text-2xl font-bold text-white mt-1">¥{(commissionStats.pendingSettlement * 1.2 / 10000).toFixed(2)}万</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Progress value={85} className="h-1.5 flex-1" />
              <span className="text-xs text-slate-400">85%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 佣金分成配置 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Percent className="w-5 h-5 text-purple-400" />
            佣金分成配置
          </CardTitle>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
            <FileText className="w-4 h-4 mr-2" />
            编辑配置
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commissionRates.map((rate) => (
              <div key={rate.category} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-300 font-medium">{rate.category}</span>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{rate.rate}%</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{rate.description}</p>
                <p className="text-xs text-slate-500">最低结算金额: ¥{rate.minAmount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 待结算商家列表 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            待结算商家
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              筛选
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <CreditCard className="w-4 h-4 mr-2" />
              批量结算
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingMerchants.map((merchant) => (
              <div key={merchant.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    {getMerchantIcon(merchant.type)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{merchant.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {getMerchantTypeLabel(merchant.type)}
                      </Badge>
                      <span>{merchant.orders} 笔订单</span>
                      <span className="text-slate-500">{merchant.period}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-white">¥{merchant.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">佣金金额</p>
                  </div>
                  <div>{getStatusBadge(merchant.status)}</div>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 佣金收入构成 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              佣金收入构成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">酒店住宿佣金</span>
                    <span className="text-white font-semibold">¥{commissionStats.hotelCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={54} className="h-2 flex-1" />
                    <span className="text-xs text-slate-400 w-10 text-right">54%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">导游服务佣金</span>
                    <span className="text-white font-semibold">¥{commissionStats.guideCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={27} className="h-2 flex-1" />
                    <span className="text-xs text-slate-400 w-10 text-right">27%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">体验店佣金</span>
                    <span className="text-white font-semibold">¥{commissionStats.venueCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={19} className="h-2 flex-1" />
                    <span className="text-xs text-slate-400 w-10 text-right">19%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 结算历史记录 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-purple-400" />
              结算历史
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
              查看全部
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {settlementHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{record.merchant}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{record.date}</span>
                        <span>·</span>
                        <span>{record.method}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">¥{record.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{record.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 结算提醒 */}
      <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5" />
          <div>
            <p className="text-white font-medium">结算提醒</p>
            <p className="text-sm text-slate-400 mt-1">
              本月结算周期将于 2月15日 截止，请及时处理待结算商家。结算完成后，系统将自动发送通知邮件至商家注册邮箱。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
