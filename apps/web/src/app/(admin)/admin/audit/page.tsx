'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  MapPin,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

const auditItems = [
  {
    id: 'AUD-001',
    type: 'hotel',
    title: '古城客栈入驻申请',
    applicant: '张经理',
    date: '2024-03-15',
    status: 'pending',
  },
  {
    id: 'AUD-002',
    type: 'guide',
    title: '导游认证 - 李明',
    applicant: '李明',
    date: '2024-03-14',
    status: 'pending',
  },
  {
    id: 'AUD-003',
    type: 'content',
    title: 'AI生成内容审核',
    applicant: '胡同里精品酒店',
    date: '2024-03-14',
    status: 'pending',
  },
  {
    id: 'AUD-004',
    type: 'venue',
    title: '体验店入驻 - 胡同美食探索',
    applicant: '王老板',
    date: '2024-03-13',
    status: 'approved',
  },
  {
    id: 'AUD-005',
    type: 'hotel',
    title: '上海外滩酒店资质更新',
    applicant: '李经理',
    date: '2024-03-12',
    status: 'rejected',
  },
]

const typeConfig = {
  hotel: { label: '酒店', icon: Building2, color: 'text-blue-400' },
  guide: { label: '导游', icon: Users, color: 'text-green-400' },
  venue: { label: '体验店', icon: MapPin, color: 'text-orange-400' },
  content: { label: '内容', icon: Clock, color: 'text-purple-400' },
}

const statusConfig = {
  pending: { label: '待审核', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  approved: { label: '已通过', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  rejected: { label: '已拒绝', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export default function AdminAuditPage() {
  const pendingCount = auditItems.filter(item => item.status === 'pending').length

  return (
    <div className="p-8">
      <PageHeader
        title="审核中心"
        description="统一管理所有审核事项"
      />

      {/* 待审核提醒 */}
      {pendingCount > 0 && (
        <Card className="bg-yellow-500/10 border-yellow-500/30 mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-200">
                您有 <strong>{pendingCount}</strong> 个待审核事项需要处理
              </span>
            </div>
            <Button size="sm" className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
              立即处理
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 审核统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
                <p className="text-sm text-slate-400">待审核</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">128</p>
                <p className="text-sm text-slate-400">本月已通过</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-red-400">12</p>
                <p className="text-sm text-slate-400">本月已拒绝</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">2.5小时</p>
                <p className="text-sm text-slate-400">平均审核时长</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 审核列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">审核记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditItems.map((item) => {
              const TypeIcon = typeConfig[item.type as keyof typeof typeConfig].icon
              const typeInfo = typeConfig[item.type as keyof typeof typeConfig]
              const statusInfo = statusConfig[item.status as keyof typeof statusConfig]
              
              return (
                <div 
                  key={item.id}
                  className="p-4 bg-slate-800/50 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center ${typeInfo.color}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{item.title}</span>
                        <Badge variant="outline" className={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                        <span>申请人: {item.applicant}</span>
                        <span>{item.date}</span>
                        <span className={typeInfo.color}>{typeInfo.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  {item.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                        <XCircle className="w-4 h-4 mr-1" />
                        拒绝
                      </Button>
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        通过
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
