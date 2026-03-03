'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function HotelsForeignLicensePage() {
  return (
    <div className="p-8">
      <PageHeader
        title="涉外资质"
        description="管理酒店涉外接待资质认证"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">156</p>
                <p className="text-sm text-slate-400">已认证酒店</p>
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
                <p className="text-3xl font-bold text-yellow-400">23</p>
                <p className="text-sm text-slate-400">审核中</p>
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
                <p className="text-3xl font-bold text-red-400">5</p>
                <p className="text-sm text-slate-400">未通过</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-400" />
            资质审核列表
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: '北京饭店', type: '五星级', status: 'approved', date: '2024-01-15' },
              { name: '胡同精品客栈', type: '民宿', status: 'pending', date: '2024-03-01' },
              { name: '皇家花园酒店', type: '四星级', status: 'approved', date: '2024-02-20' },
              { name: '青年旅舍', type: '青旅', status: 'rejected', date: '2024-02-28' },
              { name: '长城脚下民宿', type: '民宿', status: 'pending', date: '2024-03-02' },
            ].map((hotel, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-slate-700 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{hotel.name}</p>
                    <p className="text-sm text-slate-400">{hotel.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{hotel.date}</span>
                  {hotel.status === 'approved' ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">已通过</span>
                  ) : hotel.status === 'pending' ? (
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">审核中</span>
                  ) : (
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">未通过</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
