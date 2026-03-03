'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Toolbar } from '@/components/dashboard/Toolbar'
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableHead,
} from '@/components/dashboard/DataTable'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { GuestIdentity } from '@/components/dashboard/LanguageBadge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { FileText } from 'lucide-react'

// Mock 订单数据
const orders = [
  {
    id: 'ORD240301001',
    guest: { name: 'John Smith', nationality: 'US', language: 'en' as const },
    roomType: '胡同景观大床房',
    checkIn: '2024-03-01',
    checkOut: '2024-03-03',
    nights: 2,
    amount: 2400,
    source: 'Booking.com',
    status: 'confirmed' as const,
  },
  {
    id: 'ORD240301002',
    guest: { name: 'Maria Garcia', nationality: 'ES', language: 'es' as const },
    roomType: '传统四合院套房',
    checkIn: '2024-03-02',
    checkOut: '2024-03-05',
    nights: 3,
    amount: 4800,
    source: '官网直订',
    status: 'pending' as const,
  },
  {
    id: 'ORD240301003',
    guest: { name: 'Pierre Dubois', nationality: 'FR', language: 'fr' as const },
    roomType: '胡同景观大床房',
    checkIn: '2024-03-05',
    checkOut: '2024-03-07',
    nights: 2,
    amount: 2600,
    source: 'Airbnb',
    status: 'confirmed' as const,
  },
  {
    id: 'ORD240301004',
    guest: { name: '田中太郎', nationality: 'JP', language: 'ja' as const },
    roomType: '庭院景观双床房',
    checkIn: '2024-03-08',
    checkOut: '2024-03-10',
    nights: 2,
    amount: 2800,
    source: '官网直订',
    status: 'confirmed' as const,
  },
  {
    id: 'ORD240301005',
    guest: { name: 'Hans Mueller', nationality: 'DE', language: 'de' as const },
    roomType: '传统四合院套房',
    checkIn: '2024-03-10',
    checkOut: '2024-03-12',
    nights: 2,
    amount: 3200,
    source: 'Booking.com',
    status: 'cancelled' as const,
  },
]

export default function OrdersPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="订单管理"
        description="查看和管理所有预订订单"
      />

      <Toolbar
        searchPlaceholder="搜索订单号、客人姓名..."
        onSearch={(value) => console.log('搜索:', value)}
        onFilter={() => console.log('筛选')}
      />

      {orders.length > 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <DataTable>
            <DataTableHeader>
              <tr>
                <DataTableHead>订单号</DataTableHead>
                <DataTableHead>客人信息</DataTableHead>
                <DataTableHead>房型</DataTableHead>
                <DataTableHead>入住日期</DataTableHead>
                <DataTableHead>金额</DataTableHead>
                <DataTableHead>来源</DataTableHead>
                <DataTableHead>状态</DataTableHead>
                <DataTableHead align="center">操作</DataTableHead>
              </tr>
            </DataTableHeader>
            <DataTableBody>
              {orders.map((order) => (
                <DataTableRow key={order.id}>
                  <DataTableCell>
                    <span className="font-mono text-slate-400">{order.id}</span>
                  </DataTableCell>
                  <DataTableCell>
                    <GuestIdentity
                      name={order.guest.name}
                      nationality={order.guest.nationality}
                      language={order.guest.language}
                    />
                  </DataTableCell>
                  <DataTableCell>{order.roomType}</DataTableCell>
                  <DataTableCell>
                    <div className="text-sm">
                      <div>{order.checkIn}</div>
                      <div className="text-slate-500">{order.nights}晚</div>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <span className="font-medium text-white">¥{order.amount}</span>
                  </DataTableCell>
                  <DataTableCell>
                    <span className={order.source === '官网直订' ? 'text-cyan-400' : 'text-slate-400'}>
                      {order.source}
                    </span>
                  </DataTableCell>
                  <DataTableCell>
                    <StatusBadge status={order.status}>
                      {order.status === 'confirmed' ? '已确认' : order.status === 'pending' ? '待确认' : '已取消'}
                    </StatusBadge>
                  </DataTableCell>
                  <DataTableCell align="center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                    >
                      详情
                    </Button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="暂无订单"
          description="当有新的预订时，会显示在这里"
        />
      )}
    </div>
  )
}
