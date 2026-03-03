'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell, DataTableHead } from '@/components/dashboard/DataTable'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { Button } from '@/components/ui/button'
import { GuestIdentity } from '@/components/dashboard/LanguageBadge'
import { Ticket, CheckCircle } from 'lucide-react'

const bookings = [
  {
    id: 'BK001',
    activity: '老北京茶馆品茗体验',
    guest: { name: 'John Smith', nationality: 'US', language: 'en' },
    date: '2024-03-01 14:00',
    people: 2,
    amount: 336,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    activity: '京剧脸谱绘制工作坊',
    guest: { name: 'Maria Garcia', nationality: 'ES', language: 'es' },
    date: '2024-03-02 10:00',
    people: 4,
    amount: 1072,
    status: 'pending',
  },
  {
    id: 'BK003',
    activity: '老北京茶馆品茗体验',
    guest: { name: '田中太郎', nationality: 'JP', language: 'ja' },
    date: '2024-03-01 16:00',
    people: 1,
    amount: 168,
    status: 'confirmed',
  },
]

export default function VenueBookingsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="预订管理"
        description="管理活动预订和核销"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-sm text-slate-400">今日预订</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-sm text-slate-400">今日核销</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">待核销</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">预订列表</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable>
            <DataTableHeader>
              <tr>
                <DataTableHead>预订号</DataTableHead>
                <DataTableHead>活动</DataTableHead>
                <DataTableHead>客人</DataTableHead>
                <DataTableHead>时间</DataTableHead>
                <DataTableHead>人数</DataTableHead>
                <DataTableHead>金额</DataTableHead>
                <DataTableHead>状态</DataTableHead>
                <DataTableHead align="center">操作</DataTableHead>
              </tr>
            </DataTableHeader>
            <DataTableBody>
              {bookings.map((booking) => (
                <DataTableRow key={booking.id}>
                  <DataTableCell>{booking.id}</DataTableCell>
                  <DataTableCell>{booking.activity}</DataTableCell>
                  <DataTableCell>
                    <GuestIdentity
                      name={booking.guest.name}
                      nationality={booking.guest.nationality}
                      language={booking.guest.language}
                    />
                  </DataTableCell>
                  <DataTableCell>{booking.date}</DataTableCell>
                  <DataTableCell>{booking.people}人</DataTableCell>
                  <DataTableCell>¥{booking.amount}</DataTableCell>
                  <DataTableCell>
                    <StatusBadge status={booking.status as any}>
                      {booking.status === 'confirmed' ? '已确认' : '待确认'}
                    </StatusBadge>
                  </DataTableCell>
                  <DataTableCell align="center">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      核销
                    </Button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>
        </CardContent>
      </Card>
    </div>
  )
}
