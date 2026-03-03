import { motion } from 'framer-motion'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  Building2,
  Download,
  Calendar,
} from 'lucide-react'
import { useState } from 'react'

const mockTransactions = [
  {
    id: 'TXN-001',
    type: 'income',
    source: '酒店订单',
    description: '胡同里精品酒店 - 豪华大床房 x3晚',
    amount: 3840,
    platformFee: 384,
    settlement: 3456,
    date: '2024-03-15',
    status: 'settled',
  },
  {
    id: 'TXN-002',
    type: 'income',
    source: '导游订单',
    description: '李明 - 北京半日深度游',
    amount: 600,
    platformFee: 60,
    settlement: 540,
    date: '2024-03-15',
    status: 'pending',
  },
  {
    id: 'TXN-003',
    type: 'refund',
    source: '酒店退款',
    description: '上海外滩酒店 - 订单取消',
    amount: -3200,
    platformFee: 0,
    settlement: -3200,
    date: '2024-03-14',
    status: 'completed',
  },
]

const settlements = [
  { hotel: '胡同里精品酒店', period: '2024-03-01 ~ 2024-03-15', amount: 125680, status: 'paid', date: '2024-03-16' },
  { hotel: '上海外滩酒店', period: '2024-03-01 ~ 2024-03-15', amount: 256000, status: 'pending', date: '2024-03-16' },
  { hotel: '西安古城客栈', period: '2024-03-01 ~ 2024-03-15', amount: 45800, status: 'pending', date: '2024-03-16' },
]

export function FinanceSettlement() {
  const [tab, setTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">财务结算</h2>
          <p className="text-gray-400 text-sm mt-1">平台财务数据与结算管理</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <Calendar size={16} />
            选择日期
          </button>
          <button className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm hover:bg-neon-cyan/30 transition-colors flex items-center gap-2">
            <Download size={16} />
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl border border-emerald-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">今日GMV</p>
              <p className="text-2xl font-bold text-white">¥89,420</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <DollarSign size={20} className="text-emerald-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs text-emerald-400">+18%</span>
            <span className="text-xs text-gray-500">vs 昨日</span>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">平台佣金</p>
              <p className="text-2xl font-bold text-white">¥8,942</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Wallet size={20} className="text-neon-cyan" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">平均佣金率 10%</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">待结算金额</p>
              <p className="text-2xl font-bold text-white">¥456,230</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <CreditCard size={20} className="text-amber-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">待结算订单 156笔</div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">已结算金额</p>
              <p className="text-2xl font-bold text-white">¥2,156,800</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <Building2 size={20} className="text-neon-purple" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">本月累计</div>
        </div>
      </div>

      <div className="flex gap-1 bg-dark-800 p-1 rounded-lg w-fit">
        {['overview', 'transactions', 'settlements'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              tab === t
                ? 'bg-neon-cyan text-dark-900 font-medium'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'overview' ? '概览' : t === 'transactions' ? '交易明细' : '结算管理'}
          </button>
        ))}
      </div>

      {tab === 'transactions' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-900">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">交易号</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">来源</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">描述</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">金额</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">平台费</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">实际结算</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">日期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-dark-700/50 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm text-neon-cyan">{tx.id}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tx.source === '酒店订单'
                        ? 'bg-neon-cyan/20 text-neon-cyan'
                        : tx.source === '导游订单'
                        ? 'bg-neon-purple/20 text-neon-purple'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {tx.source}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{tx.description}</td>
                  <td className={`py-4 px-4 font-medium ${tx.amount > 0 ? 'text-white' : 'text-red-400'}`}>
                    {tx.amount > 0 ? '+' : ''}¥{Math.abs(tx.amount)}
                  </td>
                  <td className="py-4 px-4 text-gray-400">-¥{tx.platformFee}</td>
                  <td className="py-4 px-4 text-emerald-400 font-medium">
                    {tx.settlement > 0 ? '+' : ''}¥{tx.settlement}
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'settlements' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-900">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">酒店名称</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">结算周期</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">结算金额</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">预计结算日</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">状态</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {settlements.map((s) => (
                <tr key={s.hotel} className="hover:bg-dark-700/50 transition-colors">
                  <td className="py-4 px-4 text-white">{s.hotel}</td>
                  <td className="py-4 px-4 text-gray-300">{s.period}</td>
                  <td className="py-4 px-4 text-emerald-400 font-medium">¥{s.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-400">{s.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      s.status === 'paid'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {s.status === 'paid' ? '已结算' : '待结算'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {s.status === 'pending' && (
                      <button className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded text-xs hover:bg-neon-cyan/30 transition-colors">
                        确认结算
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="font-semibold text-white mb-4">GMV趋势 (近30天)</h3>
            <div className="h-64 flex items-end gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const height = 20 + Math.random() * 60
                return (
                  <div
                    key={i}
                    className="flex-1 bg-neon-cyan/30 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>2月15日</span>
              <span>3月15日</span>
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="font-semibold text-white mb-4">收入来源分布</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">酒店预订</span>
                  <span className="text-sm text-white">68%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">导游服务</span>
                  <span className="text-sm text-white">25%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">其他服务</span>
                  <span className="text-sm text-white">7%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '7%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
