'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Coins,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
  RefreshCw,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Globe,
  ArrowRightLeft,
  Building2,
  CreditCard,
  Wallet,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  FileText,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Settings
} from 'lucide-react'
import { useState } from 'react'

// 多币种统计数据
const currencyStats = {
  totalRevenueUSD: 485600,
  totalRevenueCNY: 2864000,
  activeCurrencies: 6,
  exchangeRateUpdateTime: '2024-02-02 14:30',
  monthlyFXGain: 12500,
  settlementCount: 156
}

// 支持的币种列表
const supportedCurrencies = [
  { code: 'CNY', name: '人民币', symbol: '¥', flag: '🇨🇳', rate: 1.0, revenue: 1864000, percentage: 64, trend: 'stable' },
  { code: 'USD', name: '美元', symbol: '$', flag: '🇺🇸', rate: 7.185, revenue: 485600, percentage: 17, trend: 'up' },
  { code: 'EUR', name: '欧元', symbol: '€', flag: '🇪🇺', rate: 7.823, revenue: 312400, percentage: 11, trend: 'down' },
  { code: 'JPY', name: '日元', symbol: '¥', flag: '🇯🇵', rate: 0.048, revenue: 123800, percentage: 4, trend: 'up' },
  { code: 'GBP', name: '英镑', symbol: '£', flag: '🇬🇧', rate: 9.124, revenue: 85600, percentage: 3, trend: 'stable' },
  { code: 'KRW', name: '韩元', symbol: '₩', flag: '🇰🇷', rate: 0.0054, revenue: 45600, percentage: 1, trend: 'stable' }
]

// 汇率历史
const exchangeRateHistory = [
  { date: '2024-01-28', usd: 7.195, eur: 7.845, jpy: 0.0482, gbp: 9.156 },
  { date: '2024-01-29', usd: 7.192, eur: 7.838, jpy: 0.0480, gbp: 9.142 },
  { date: '2024-01-30', usd: 7.188, eur: 7.831, jpy: 0.0479, gbp: 9.138 },
  { date: '2024-01-31', usd: 7.190, eur: 7.828, jpy: 0.0478, gbp: 9.131 },
  { date: '2024-02-01', usd: 7.188, eur: 7.825, jpy: 0.0479, gbp: 9.128 },
  { date: '2024-02-02', usd: 7.185, eur: 7.823, jpy: 0.0480, gbp: 9.124 }
]

// 多币种交易记录
const currencyTransactions = [
  {
    id: 'TRX-2024-0156',
    date: '2024-02-02 14:28',
    customer: 'John Smith',
    fromCurrency: 'USD',
    fromAmount: 580,
    toCurrency: 'CNY',
    toAmount: 4167.3,
    rate: 7.185,
    type: 'payment',
    status: 'completed',
    merchant: '北京王府半岛酒店'
  },
  {
    id: 'TRX-2024-0155',
    date: '2024-02-02 13:45',
    customer: 'Marie Dupont',
    fromCurrency: 'EUR',
    fromAmount: 420,
    toCurrency: 'CNY',
    toAmount: 3285.66,
    rate: 7.823,
    type: 'payment',
    status: 'completed',
    merchant: '上海外滩茂悦大酒店'
  },
  {
    id: 'TRX-2024-0154',
    date: '2024-02-02 12:20',
    customer: '田中太郎',
    fromCurrency: 'JPY',
    fromAmount: 28500,
    toCurrency: 'CNY',
    toAmount: 1368,
    rate: 0.048,
    type: 'payment',
    status: 'completed',
    merchant: '张明 - 专业导游'
  },
  {
    id: 'TRX-2024-0153',
    date: '2024-02-02 11:05',
    customer: 'Emma Wilson',
    fromCurrency: 'GBP',
    fromAmount: 245,
    toCurrency: 'CNY',
    toAmount: 2235.38,
    rate: 9.124,
    type: 'refund',
    status: 'processing',
    merchant: '成都宽窄巷子体验店'
  },
  {
    id: 'TRX-2024-0152',
    date: '2024-02-02 09:32',
    customer: 'Kim Min-jae',
    fromCurrency: 'KRW',
    fromAmount: 450000,
    toCurrency: 'CNY',
    toAmount: 2430,
    rate: 0.0054,
    type: 'payment',
    status: 'completed',
    merchant: '杭州西湖国宾馆'
  }
]

// 对账汇总
const reconciliationSummary = [
  { currency: 'USD', incoming: 485600, outgoing: 125000, net: 360600, pending: 45000 },
  { currency: 'EUR', incoming: 312400, outgoing: 89000, net: 223400, pending: 28000 },
  { currency: 'JPY', incoming: 123800, outgoing: 45000, net: 78800, pending: 12000 },
  { currency: 'GBP', incoming: 85600, outgoing: 32000, net: 53600, pending: 8500 },
  { currency: 'KRW', incoming: 45600, outgoing: 15000, net: 30600, pending: 4200 }
]

// 外汇损益
const fxPnL = [
  { date: '2024-01-01', realized: 1200, unrealized: 5800 },
  { date: '2024-01-08', realized: 850, unrealized: 4200 },
  { date: '2024-01-15', realized: 2100, unrealized: 6800 },
  { date: '2024-01-22', realized: 1560, unrealized: 5200 },
  { date: '2024-01-29', realized: 1890, unrealized: 6100 },
  { date: '2024-02-02', realized: 1250, unrealized: 7500 }
]

// 结算账户
const settlementAccounts = [
  { currency: 'USD', bank: 'Bank of America', account: '****8823', balance: 360600, status: 'active' },
  { currency: 'EUR', bank: 'Deutsche Bank', account: '****4512', balance: 223400, status: 'active' },
  { currency: 'JPY', bank: 'MUFG Bank', account: '****9921', balance: 78800, status: 'active' },
  { currency: 'GBP', bank: 'HSBC UK', account: '****3345', balance: 53600, status: 'active' },
  { currency: 'KRW', bank: 'KB Kookmin Bank', account: '****7789', balance: 30600, status: 'active' }
]

export default function CurrencyPage() {
  const [selectedCurrency, setSelectedCurrency] = useState('all')
  const [dateRange, setDateRange] = useState('30d')

  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case 'USD':
        return <DollarSign className="w-5 h-5 text-green-400" />
      case 'EUR':
        return <Euro className="w-5 h-5 text-blue-400" />
      case 'JPY':
        return <JapaneseYen className="w-5 h-5 text-red-400" />
      case 'GBP':
        return <PoundSterling className="w-5 h-5 text-purple-400" />
      default:
        return <Coins className="w-5 h-5 text-yellow-400" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">已完成</Badge>
      case 'processing':
        return <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">处理中</Badge>
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 bg-yellow-500/10">待处理</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'payment':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">收款</Badge>
      case 'refund':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">退款</Badge>
      case 'exchange':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">兑换</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="多币种对账"
        description="管理多币种交易与汇率对账"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">多币种总收入</p>
                <p className="text-2xl font-bold text-white mt-1">${(currencyStats.totalRevenueUSD / 10000).toFixed(2)}万</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">折合 ¥{(currencyStats.totalRevenueCNY / 10000).toFixed(2)}万</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">支持币种</p>
                <p className="text-2xl font-bold text-white mt-1">{currencyStats.activeCurrencies}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Coins className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">实时汇率更新</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">本月汇兑收益</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">+¥{currencyStats.monthlyFXGain.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-emerald-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+8.5% 较上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">待结算笔数</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">{currencyStats.settlementCount}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-3">汇率更新时间: {currencyStats.exchangeRateUpdateTime}</p>
          </CardContent>
        </Card>
      </div>

      {/* 币种收入分布 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            币种收入分布
          </CardTitle>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新汇率
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedCurrencies.map((currency) => (
              <div key={currency.code} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <p className="text-white font-medium">{currency.name}</p>
                      <p className="text-xs text-slate-400">{currency.code}</p>
                    </div>
                  </div>
                  {getTrendIcon(currency.trend)}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">当前汇率</span>
                  <span className="text-white font-mono">{currency.rate}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">收入金额</span>
                  <span className="text-white font-semibold">{currency.symbol}{currency.revenue.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Progress value={currency.percentage} className="h-2 flex-1" />
                  <span className="text-xs text-slate-400 w-8 text-right">{currency.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 汇率走势 */}
        <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              汇率走势 (近7天)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
                USD/CNY
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* USD 走势图 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium">USD/CNY</span>
                  </div>
                  <span className="text-emerald-400 text-sm flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -0.14% (7日)
                  </span>
                </div>
                <div className="h-8 flex items-end gap-1">
                  {exchangeRateHistory.map((rate, index) => {
                    const height = ((rate.usd - 7.18) / 0.02) * 100
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-purple-500/30 rounded-t hover:bg-purple-500/50 transition-colors"
                        style={{ height: `${Math.max(20, Math.min(100, height))}%` }}
                        title={`${rate.date}: ${rate.usd}`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>01-28</span>
                  <span>01-30</span>
                  <span>02-01</span>
                  <span>02-02</span>
                </div>
              </div>

              {/* EUR 走势图 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Euro className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-medium">EUR/CNY</span>
                  </div>
                  <span className="text-red-400 text-sm flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -0.28% (7日)
                  </span>
                </div>
                <div className="h-8 flex items-end gap-1">
                  {exchangeRateHistory.map((rate, index) => {
                    const height = ((rate.eur - 7.80) / 0.05) * 100
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-blue-500/30 rounded-t hover:bg-blue-500/50 transition-colors"
                        style={{ height: `${Math.max(20, Math.min(100, height))}%` }}
                        title={`${rate.date}: ${rate.eur}`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>01-28</span>
                  <span>01-30</span>
                  <span>02-01</span>
                  <span>02-02</span>
                </div>
              </div>

              {/* JPY 走势图 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <JapaneseYen className="w-4 h-4 text-red-400" />
                    <span className="text-white font-medium">JPY/CNY (x100)</span>
                  </div>
                  <span className="text-emerald-400 text-sm flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -0.41% (7日)
                  </span>
                </div>
                <div className="h-8 flex items-end gap-1">
                  {exchangeRateHistory.map((rate, index) => {
                    const height = ((rate.jpy - 0.047) / 0.002) * 100
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-red-500/30 rounded-t hover:bg-red-500/50 transition-colors"
                        style={{ height: `${Math.max(20, Math.min(100, height))}%` }}
                        title={`${rate.date}: ${rate.jpy}`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>01-28</span>
                  <span>01-30</span>
                  <span>02-01</span>
                  <span>02-02</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 结算账户 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <Landmark className="w-4 h-4 text-purple-400" />
              结算账户
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
              <Settings className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {settlementAccounts.map((account) => (
                <div key={account.currency} className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCurrencyIcon(account.currency)}
                      <span className="text-white font-medium">{account.currency}</span>
                    </div>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs">
                      正常
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{account.bank}</p>
                  <p className="text-xs text-slate-500 font-mono mb-2">{account.account}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">余额</span>
                    <span className="text-white font-semibold">{account.balance.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 多币种交易记录 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-purple-400" />
            多币种交易记录
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索交易..."
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Filter className="w-4 h-4 mr-2" />
              筛选
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-800">
                  <th className="pb-3 text-sm font-medium text-slate-400">交易编号</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">时间</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">客户</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">类型</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">币种转换</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">汇率</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">商家</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">状态</th>
                  <th className="pb-3 text-sm font-medium text-slate-400">操作</th>
                </tr>
              </thead>
              <tbody>
                {currencyTransactions.map((trx) => (
                  <tr key={trx.id} className="border-b border-slate-800/50">
                    <td className="py-3">
                      <span className="text-sm text-slate-300 font-mono">{trx.id}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-slate-300">{trx.date}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-white">{trx.customer}</span>
                    </td>
                    <td className="py-3">
                      {getTypeBadge(trx.type)}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-300">{trx.fromCurrency} {trx.fromAmount.toLocaleString()}</span>
                        <ArrowRightLeft className="w-3 h-3 text-slate-500" />
                        <span className="text-sm text-emerald-400">{trx.toCurrency} {trx.toAmount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-slate-300 font-mono">{trx.rate}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-slate-300">{trx.merchant}</span>
                    </td>
                    <td className="py-3">
                      {getStatusBadge(trx.status)}
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 对账汇总 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              币种对账汇总
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reconciliationSummary.map((summary) => (
                <div key={summary.currency} className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getCurrencyIcon(summary.currency)}
                      <span className="text-white font-medium">{summary.currency}</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      净额: {summary.net.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-slate-500">流入</p>
                      <p className="text-sm text-emerald-400">+{summary.incoming.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">流出</p>
                      <p className="text-sm text-red-400">-{summary.outgoing.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">待处理</p>
                      <p className="text-sm text-yellow-400">{summary.pending.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 外汇损益 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              外汇损益分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fxPnL.map((pnl, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-slate-300 text-sm">{pnl.date}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">已实现损益</p>
                      <p className={`text-sm font-medium ${pnl.realized >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pnl.realized >= 0 ? '+' : ''}{pnl.realized.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">未实现损益</p>
                      <p className={`text-sm font-medium ${pnl.unrealized >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pnl.unrealized >= 0 ? '+' : ''}{pnl.unrealized.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">风险提示</p>
                  <p className="text-sm text-slate-400 mt-1">
                    近期美元汇率波动较大，建议适当增加美元持仓或考虑远期外汇合约对冲风险。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
