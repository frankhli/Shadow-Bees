'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Cloud, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'

const pmsList = [
  { id: 'cloudbeds', name: 'Cloudbeds', connected: true, lastSync: '2分钟前', status: 'success' },
  { id: 'siteminder', name: 'SiteMinder', connected: false, lastSync: '-', status: 'disconnected' },
  { id: 'manual', name: '手动录入', connected: true, lastSync: '实时', status: 'active' },
]

const syncLogs = [
  { id: 1, time: '2024-03-01 14:23:05', action: '库存同步', status: 'success', details: '同步了15个房型，30天库存' },
  { id: 2, time: '2024-03-01 13:15:22', action: '订单同步', status: 'success', details: '从Booking.com同步了3个新订单' },
  { id: 3, time: '2024-03-01 12:45:10', action: '价格同步', status: 'warning', details: '价格冲突，已使用本地设置' },
]

export default function InventorySyncPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="库存同步"
        description="连接PMS系统，自动同步库存"
        showBack
      />

      {/* PMS连接状态 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {pmsList.map((pms) => (
          <Card key={pms.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cloud className={`w-8 h-8 ${pms.connected ? 'text-cyan-400' : 'text-slate-600'}`} />
                  <div>
                    <p className="font-medium text-white">{pms.name}</p>
                    <p className="text-xs text-slate-400">{pms.connected ? `上次同步: ${pms.lastSync}` : '未连接'}</p>
                  </div>
                </div>
                <Switch checked={pms.connected} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 同步操作 */}
      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">手动同步</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              立即同步库存
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              同步历史订单
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 同步日志 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">同步日志</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {syncLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                {log.status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{log.action}</span>
                    <span className="text-xs text-slate-500">{log.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
