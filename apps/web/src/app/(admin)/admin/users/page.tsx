'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, UserPlus, Shield } from 'lucide-react'

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="用户管理"
        description="管理平台注册用户（C端游客）"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">12,456</p>
                <p className="text-sm text-slate-400">总用户数</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-emerald-400">1,234</p>
                <p className="text-sm text-slate-400">本月新增</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">8,567</p>
                <p className="text-sm text-slate-400">活跃用户</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-400">23</p>
                <p className="text-sm text-slate-400">待审核</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">用户列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'John Smith', email: 'john@example.com', country: '🇺🇸 美国', status: 'active', orders: 5 },
              { name: '田中太郎', email: 'tanaka@example.jp', country: '🇯🇵 日本', status: 'active', orders: 3 },
              { name: 'Marie Dupont', email: 'marie@example.fr', country: '🇫🇷 法国', status: 'inactive', orders: 0 },
              { name: 'Hans Mueller', email: 'hans@example.de', country: '🇩🇪 德国', status: 'active', orders: 2 },
              { name: 'Pedro Garcia', email: 'pedro@example.es', country: '🇪🇸 西班牙', status: 'active', orders: 1 },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="text-white font-medium">{user.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-400">{user.country}</span>
                  <span className="text-sm text-slate-400">{user.orders} 订单</span>
                  {user.status === 'active' ? (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">活跃</span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">未活跃</span>
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
