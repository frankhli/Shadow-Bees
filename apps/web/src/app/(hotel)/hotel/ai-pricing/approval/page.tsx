'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const pendingApprovals = [
  { id: 1, date: '03-15', currentPrice: 480, proposedPrice: 680, change: '+42%', reason: '演唱会期间需求激增', requestBy: 'AI系统', time: '10:23' },
  { id: 2, date: '03-16', currentPrice: 480, proposedPrice: 620, change: '+29%', reason: '展会+周末双重因素', requestBy: 'AI系统', time: '09:45' },
]

const approvedHistory = [
  { id: 3, date: '03-10', currentPrice: 480, proposedPrice: 520, change: '+8%', status: 'approved', approvedBy: '张经理', time: 'Yesterday' },
]

export default function PricingApprovalPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="价格审批"
        description="审批AI提出的价格调整建议"
      />

      {/* 待审批 */}
      <Card className="bg-slate-900 border-slate-800 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            待审批 ({pendingApprovals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium">{item.date}</span>
                    <Badge className="bg-orange-500/20 text-orange-400">{item.change}</Badge>
                  </div>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-slate-400 line-through">¥{item.currentPrice}</span>
                  <span className="text-2xl font-bold text-emerald-400">¥{item.proposedPrice}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{item.reason}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    批准
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                    <XCircle className="w-4 h-4 mr-1" />
                    拒绝
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 审批历史 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">审批历史</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {approvedHistory.map((item) => (
              <div key={item.id} className="p-3 bg-slate-800/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{item.date}</span>
                  <span className="text-white">¥{item.proposedPrice}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400">{item.change}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  已批准
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
