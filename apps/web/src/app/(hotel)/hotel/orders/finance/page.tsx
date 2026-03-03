'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell, DataTableHead } from '@/components/dashboard/DataTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DollarSign, TrendingUp, Wallet, FileText, Download, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react'

// 财务统计数据 - 基于交易明细计算
const transactions = [
  { id: 'TRX001', date: '2024-03-01', type: '收入', source: 'Booking.com', amount: 2400, fee: 72, net: 2328, invoiceStatus: '已开票' },
  { id: 'TRX002', date: '2024-03-01', type: '收入', source: '官网直订', amount: 4800, fee: 144, net: 4656, invoiceStatus: '未开票' },
  { id: 'TRX003', date: '2024-02-28', type: '退款', source: 'Airbnb', amount: -1200, fee: -36, net: -1164, invoiceStatus: '-' },
  { id: 'TRX004', date: '2024-02-28', type: '收入', source: 'Booking.com', amount: 3600, fee: 108, net: 3492, invoiceStatus: '已开票' },
  { id: 'TRX005', date: '2024-02-27', type: '收入', source: 'Expedia', amount: 5200, fee: 156, net: 5044, invoiceStatus: '开票中' },
  { id: 'TRX006', date: '2024-02-27', type: '收入', source: '官网直订', amount: 2800, fee: 84, net: 2716, invoiceStatus: '未开票' },
  { id: 'TRX007', date: '2024-02-26', type: '收入', source: 'Booking.com', amount: 4200, fee: 126, net: 4074, invoiceStatus: '已开票' },
  { id: 'TRX008', date: '2024-02-26', type: '收入', source: 'Airbnb', amount: 3800, fee: 114, net: 3686, invoiceStatus: '已开票' },
]

// 计算统计数据
const totalRevenue = transactions.filter(t => t.type === '收入').reduce((sum, t) => sum + t.amount, 0)
const totalFees = transactions.reduce((sum, t) => sum + Math.abs(t.fee), 0)
const netIncome = totalRevenue - totalFees
const stripeFees = Math.round(totalRevenue * 0.03)
const platformFees = totalFees - stripeFees

// 发票数据
const invoices = [
  { id: 'INV-2024-001', type: '增值税普通发票', amount: 10200, date: '2024-03-01', status: '已开具', downloadUrl: '#' },
  { id: 'INV-2024-002', type: '增值税普通发票', amount: 7778, date: '2024-02-28', status: '已开具', downloadUrl: '#' },
  { id: 'INV-2024-003', type: '增值税专用发票', amount: 15000, date: '2024-02-26', status: '已开具', downloadUrl: '#' },
]

// 可申请开票的订单
const invoiceableOrders = transactions.filter(t => t.type === '收入' && t.invoiceStatus === '未开票')

export default function FinancePage() {
  const [selectedTab, setSelectedTab] = useState('transactions')
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const handleApplyInvoice = () => {
    if (selectedOrders.length === 0) {
      alert('请选择要开票的订单')
      return
    }
    alert(`已为 ${selectedOrders.length} 个订单申请开票，系统将在1-3个工作日内处理`)
    setSelectedOrders([])
    setShowApplyDialog(false)
  }

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  return (
    <div className="p-8">
      <PageHeader
        title="财务合规"
        description="查看收入明细、管理发票和公安上报"
        showBack
      />

      {/* 统计卡片 - 基于真实交易数据计算 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="总收入"
          value={`¥${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          iconColor="bg-emerald-500"
        />
        <StatCard
          title="支付手续费"
          value={`¥${stripeFees.toLocaleString()}`}
          subtitle="Stripe 3%"
          icon={TrendingUp}
          iconColor="bg-blue-500"
        />
        <StatCard
          title="平台服务费"
          value={`¥${platformFees.toLocaleString()}`}
          subtitle="平台服务费"
          icon={Wallet}
          iconColor="bg-purple-500"
        />
        <StatCard
          title="净收入"
          value={`¥${netIncome.toLocaleString()}`}
          icon={DollarSign}
          iconColor="bg-cyan-500"
        />
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-slate-800 mb-6">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-700">收支明细</TabsTrigger>
          <TabsTrigger value="invoices" className="data-[state=active]:bg-slate-700">发票管理</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700">公安上报</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">近期交易</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable>
                <DataTableHeader>
                  <tr>
                    <DataTableHead>交易号</DataTableHead>
                    <DataTableHead>日期</DataTableHead>
                    <DataTableHead>类型</DataTableHead>
                    <DataTableHead>来源</DataTableHead>
                    <DataTableHead align="right">金额</DataTableHead>
                    <DataTableHead align="right">手续费</DataTableHead>
                    <DataTableHead align="right">净收入</DataTableHead>
                    <DataTableHead>发票状态</DataTableHead>
                  </tr>
                </DataTableHeader>
                <DataTableBody>
                  {transactions.map((trx) => (
                    <DataTableRow key={trx.id}>
                      <DataTableCell>{trx.id}</DataTableCell>
                      <DataTableCell>{trx.date}</DataTableCell>
                      <DataTableCell>
                        <span className={trx.type === '收入' ? 'text-emerald-400' : 'text-red-400'}>
                          {trx.type}
                        </span>
                      </DataTableCell>
                      <DataTableCell>{trx.source}</DataTableCell>
                      <DataTableCell align="right">¥{trx.amount.toLocaleString()}</DataTableCell>
                      <DataTableCell align="right" className="text-slate-500">¥{trx.fee}</DataTableCell>
                      <DataTableCell align="right" className="font-medium text-white">¥{trx.net.toLocaleString()}</DataTableCell>
                      <DataTableCell>
                        <Badge variant={trx.invoiceStatus === '已开票' ? 'default' : trx.invoiceStatus === '开票中' ? 'secondary' : 'outline'}>
                          {trx.invoiceStatus}
                        </Badge>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTableBody>
              </DataTable>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <div className="space-y-6">
            {/* 发票统计 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">已开发票</p>
                      <p className="text-2xl font-bold text-white">3 张</p>
                      <p className="text-xs text-slate-500">金额 ¥32,978</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">开票中</p>
                      <p className="text-2xl font-bold text-white">1 张</p>
                      <p className="text-xs text-slate-500">金额 ¥5,200</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">可开票金额</p>
                      <p className="text-2xl font-bold text-white">¥7,600</p>
                      <p className="text-xs text-slate-500">2 个订单待开票</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 已开发票列表 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">已开发票</CardTitle>
                <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="w-4 h-4 mr-2" />
                      申请开票
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>申请开具发票</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-slate-400">请选择要开票的订单（共 {invoiceableOrders.length} 个可开票）</p>
                      <DataTable>
                        <DataTableHeader>
                          <tr>
                            <DataTableHead>选择</DataTableHead>
                            <DataTableHead>订单号</DataTableHead>
                            <DataTableHead>日期</DataTableHead>
                            <DataTableHead align="right">金额</DataTableHead>
                          </tr>
                        </DataTableHeader>
                        <DataTableBody>
                          {invoiceableOrders.map((order) => (
                            <DataTableRow key={order.id}>
                              <DataTableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedOrders.includes(order.id)}
                                  onChange={() => toggleOrderSelection(order.id)}
                                  className="rounded border-slate-600"
                                />
                              </DataTableCell>
                              <DataTableCell>{order.id}</DataTableCell>
                              <DataTableCell>{order.date}</DataTableCell>
                              <DataTableCell align="right">¥{order.amount.toLocaleString()}</DataTableCell>
                            </DataTableRow>
                          ))}
                        </DataTableBody>
                      </DataTable>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                        <p className="text-sm text-slate-400">
                          已选择 {selectedOrders.length} 个订单，开票金额：
                          <span className="text-white font-medium">
                            ¥{invoiceableOrders
                              .filter(o => selectedOrders.includes(o.id))
                              .reduce((sum, o) => sum + o.amount, 0)
                              .toLocaleString()}
                          </span>
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => setShowApplyDialog(false)}>取消</Button>
                          <Button 
                            className="bg-cyan-600 hover:bg-cyan-700"
                            onClick={handleApplyInvoice}
                            disabled={selectedOrders.length === 0}
                          >
                            确认申请
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <DataTable>
                  <DataTableHeader>
                    <tr>
                      <DataTableHead>发票编号</DataTableHead>
                      <DataTableHead>发票类型</DataTableHead>
                      <DataTableHead>开票日期</DataTableHead>
                      <DataTableHead align="right">金额</DataTableHead>
                      <DataTableHead>状态</DataTableHead>
                      <DataTableHead align="center">操作</DataTableHead>
                    </tr>
                  </DataTableHeader>
                  <DataTableBody>
                    {invoices.map((invoice) => (
                      <DataTableRow key={invoice.id}>
                        <DataTableCell>{invoice.id}</DataTableCell>
                        <DataTableCell>{invoice.type}</DataTableCell>
                        <DataTableCell>{invoice.date}</DataTableCell>
                        <DataTableCell align="right">¥{invoice.amount.toLocaleString()}</DataTableCell>
                        <DataTableCell>
                          <Badge className="bg-emerald-500/20 text-emerald-400">
                            {invoice.status}
                          </Badge>
                        </DataTableCell>
                        <DataTableCell align="center">
                          <Button variant="ghost" size="sm" className="text-cyan-400">
                            <Download className="w-4 h-4 mr-1" />
                            下载
                          </Button>
                        </DataTableCell>
                      </DataTableRow>
                    ))}
                  </DataTableBody>
                </DataTable>
              </CardContent>
            </Card>

            {/* 发票说明 */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">开票说明</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <span>发票将在申请后 1-3 个工作日内开具</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <span>增值税普通发票税率为 1%，专用发票税率为 6%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                    <span>如有问题请联系客服：finance@tiaohai.com</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">外宾入住上报</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <p className="text-sm text-emerald-400">今日上报</p>
                      <p className="text-2xl font-bold text-white mt-1">4 人</p>
                      <p className="text-xs text-slate-400 mt-1">已自动上报成功</p>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg">
                      <p className="text-sm text-slate-400">本月累计</p>
                      <p className="text-2xl font-bold text-white mt-1">86 人</p>
                      <p className="text-xs text-slate-400 mt-1">合规率 100%</p>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-lg">
                      <p className="text-sm text-slate-400">待补录</p>
                      <p className="text-2xl font-bold text-white mt-1">0 人</p>
                      <p className="text-xs text-slate-400 mt-1">无待处理</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-white font-medium mb-2">上报须知</p>
                    <ul className="space-y-1 text-sm text-slate-400">
                      <li>• 根据《旅馆业治安管理办法》，接待境外旅客需在 24 小时内向公安机关报送住宿登记表</li>
                      <li>• 系统已对接公安系统，实现自动上报</li>
                      <li>• 如系统上报失败，请手动在"旅客登记系统"补录</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">近期上报记录</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable>
                  <DataTableHeader>
                    <tr>
                      <DataTableHead>时间</DataTableHead>
                      <DataTableHead>姓名</DataTableHead>
                      <DataTableHead>国籍</DataTableHead>
                      <DataTableHead>护照号</DataTableHead>
                      <DataTableHead>房间号</DataTableHead>
                      <DataTableHead>状态</DataTableHead>
                    </tr>
                  </DataTableHeader>
                  <DataTableBody>
                    {[
                      { time: '2024-03-01 14:32', name: 'John Smith', nationality: '美国', passport: 'G12345678', room: '302', status: '成功' },
                      { time: '2024-03-01 14:30', name: 'Maria Garcia', nationality: '西班牙', passport: 'X98765432', room: '205', status: '成功' },
                      { time: '2024-03-01 11:15', name: 'Pierre Dubois', nationality: '法国', passport: 'F87654321', room: '418', status: '成功' },
                      { time: '2024-03-01 09:45', name: '田中太郎', nationality: '日本', passport: 'J76543210', room: '301', status: '成功' },
                    ].map((record, idx) => (
                      <DataTableRow key={idx}>
                        <DataTableCell>{record.time}</DataTableCell>
                        <DataTableCell>{record.name}</DataTableCell>
                        <DataTableCell>{record.nationality}</DataTableCell>
                        <DataTableCell>{record.passport}</DataTableCell>
                        <DataTableCell>{record.room}</DataTableCell>
                        <DataTableCell>
                          <Badge className="bg-emerald-500/20 text-emerald-400">{record.status}</Badge>
                        </DataTableCell>
                      </DataTableRow>
                    ))}
                  </DataTableBody>
                </DataTable>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
