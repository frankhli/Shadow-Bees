'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  DollarSign,
  MessageSquare,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface GuideOrder {
  id: string
  orderNo: string
  guestName: string
  guestNationality: string
  serviceDate: string
  serviceHours: number
  guideFee: number
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED'
  createdAt: string
  notes?: string
}

export default function GuideOrdersPage() {
  const t = useTranslations('guideDashboard')
  const [orders, setOrders] = useState<GuideOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')

  useEffect(() => {
    fetchOrders()
  }, [filter])

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders?guideId=guide-1&status=${filter === 'all' ? '' : filter}`
      )
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (orderId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/confirm`,
        { method: 'POST' }
      )
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Failed to confirm order:', error)
    }
  }

  const handleComplete = async (orderId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/complete`,
        { method: 'POST' }
      )
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Failed to complete order:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      CONFIRMED: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-blue-100 text-blue-700',
      CANCELLED: 'bg-red-100 text-red-700',
    }
    return (
      <Badge className={styles[status as keyof typeof styles] || 'bg-gray-100'}>
        {t(`status.${status.toLowerCase()}`)}
      </Badge>
    )
  }

  const getPaymentBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-amber-100 text-amber-700',
      PAID: 'bg-green-100 text-green-700',
      REFUNDED: 'bg-gray-100 text-gray-700',
    }
    return (
      <Badge variant="outline" className={styles[status as keyof typeof styles] || ''}>
        {t(`payment.${status.toLowerCase()}`)}
      </Badge>
    )
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'upcoming') return order.status === 'CONFIRMED'
    if (filter === 'completed') return order.status === 'COMPLETED'
    if (filter === 'cancelled') return order.status === 'CANCELLED'
    return true
  })

  const stats = {
    total: orders.length,
    upcoming: orders.filter(o => o.status === 'CONFIRMED').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
    totalEarnings: orders
      .filter(o => o.status === 'COMPLETED' && o.paymentStatus === 'PAID')
      .reduce((sum, o) => sum + o.guideFee, 0),
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('ordersTitle')}</h1>
          <p className="text-gray-500">{t('ordersSubtitle')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-gray-500">{t('totalOrders')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.upcoming}</div>
            <p className="text-sm text-gray-500">{t('upcoming')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-sm text-gray-500">{t('completed')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">${stats.totalEarnings}</div>
            <p className="text-sm text-gray-500">{t('totalEarnings')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {t(`filter.${f}`)}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">{t('noOrders')}</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Order Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-gray-500">#{order.orderNo}</span>
                      {getStatusBadge(order.status)}
                      {getPaymentBadge(order.paymentStatus)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{order.guestName}</span>
                      <span className="text-gray-500">({order.guestNationality})</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.serviceDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {order.serviceHours} {t('hours')}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-lg font-bold">
                        <DollarSign className="w-5 h-5" />
                        {order.guideFee}
                      </div>
                      <p className="text-sm text-gray-500">{t('yourEarnings')}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {t('contact')}
                      </Button>
                      
                      {order.status === 'CONFIRMED' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleComplete(order.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {t('markComplete')}
                        </Button>
                      )}
                      
                      {order.status === 'CONFIRMED' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          {t('cancel')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
