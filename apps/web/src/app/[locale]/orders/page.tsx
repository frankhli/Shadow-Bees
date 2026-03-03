'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { AIChatWidget } from '@/components/ai-chat-widget'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft,
  MapPin,
  Calendar,
  Users,
  Star,
  MessageSquare,
  Download,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Loader2
} from 'lucide-react'
import { format, differenceInDays } from 'date-fns'

// Order status types
type OrderStatus = 'confirmed' | 'completed' | 'cancelled' | 'pending'

interface Order {
  id: string
  orderNo: string
  type: string
  hostelId: string
  hostelName: string
  hostelImage: string
  checkIn: string
  checkOut: string
  nights: number
  roomType: string
  bedCount: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: string
  hostName: string
  hostPhone: string
  hostWechat?: string
  canReview: boolean
  reviewed: boolean
}

const statusConfig: Record<OrderStatus, { labelKey: string; color: string; icon: any }> = {
  confirmed: { labelKey: 'confirmed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  completed: { labelKey: 'completed', color: 'bg-gray-100 text-gray-700', icon: CheckCircle2 },
  cancelled: { labelKey: 'cancelled', color: 'bg-red-100 text-red-700', icon: X },
  pending: { labelKey: 'pending', color: 'bg-amber-100 text-amber-700', icon: Clock }
}

export default function OrdersPage() {
  const t = useTranslations('orders')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Fetch orders from API
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/orders?userId=user-001`)
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated])

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    )
  }

  // Redirect if not logged in
  if (!isAuthenticated) {
    return null
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

  const handleReview = (order: Order) => {
    setReviewOrder(order)
    setShowReviewModal(true)
  }

  const submitReview = () => {
    // In real app, submit to API
    setShowReviewModal(false)
    setReviewOrder(null)
  }

  if (selectedOrder) {
    const status = statusConfig[selectedOrder.status]
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              {t('backToOrders')}
            </button>
            <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{t('order')} {selectedOrder.orderNo}</p>
                  <h1 className="text-2xl font-bold mt-1">{selectedOrder.hostelName}</h1>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${status.color}`}>
                  <status.icon className="w-4 h-4" />
                  {t(`status.${status.labelKey}`)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                {selectedOrder.roomType}
              </div>
            </div>

            {/* Hostel Image */}
            <div className="relative h-64 bg-gray-200">
              <Image
                src={selectedOrder.hostelImage}
                alt={selectedOrder.hostelName}
                fill
                className="object-cover"
              />
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-6">
              {/* Dates & Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('details.dates', { defaultValue: 'Dates' })}</p>
                    <p className="font-medium">
                      {selectedOrder.checkIn && selectedOrder.checkOut 
                        ? `${format(new Date(selectedOrder.checkIn), 'MMM d')} - ${format(new Date(selectedOrder.checkOut), 'MMM d, yyyy')}`
                        : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-500">{selectedOrder.nights} {t('nights')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('details.guests', { defaultValue: 'Beds' })}</p>
                    <p className="font-medium">{selectedOrder.bedCount} {t('beds', { defaultValue: 'beds' })}</p>
                  </div>
                </div>
              </div>

              {/* Host Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">{t('yourHost')}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedOrder.hostName}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.hostPhone}</p>
                  </div>
                  <a 
                    href={`tel:${selectedOrder.hostPhone}`}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600"
                  >
                    {t('callHost')}
                  </a>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3">{t('priceDetails')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('total')}</span>
                    <span className="font-semibold">{selectedOrder.currency} {selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadVoucher')}
                </Button>
                {selectedOrder.canReview && !selectedOrder.reviewed && (
                  <Button 
                    className="flex-1 bg-rose-500 hover:bg-rose-600"
                    onClick={() => handleReview(selectedOrder)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {t('actions.writeReview', { defaultValue: 'Write Review' })}
                  </Button>
                )}
                {selectedOrder.reviewed && (
                  <Button variant="outline" className="flex-1" disabled>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t('actions.reviewed', { defaultValue: 'Reviewed' })}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">{t('needHelp')}</h3>
            <p className="text-blue-700 text-sm mb-4">{t('supportAvailable')}</p>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('contactSupport')}
              </Button>
            </div>
          </div>
        </main>

        <AIChatWidget hotelId={selectedOrder.hostelId} hotelName={selectedOrder.hostelName} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full">
            <ChevronLeft className="w-5 h-5" />
            {t('backToProfile', { defaultValue: 'Back to profile' })}
          </Link>
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

        {/* Loading State */}
        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
          </div>
        ) : (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'all', labelKey: 'all', count: orders.length },
                { id: 'confirmed', labelKey: 'upcoming', count: orders.filter(o => o.status === 'confirmed').length },
                { id: 'completed', labelKey: 'completed', count: orders.filter(o => o.status === 'completed').length },
                { id: 'pending', labelKey: 'pending', count: orders.filter(o => o.status === 'pending').length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-900'
                  }`}
                >
                  {t(`tabs.${tab.labelKey}`)}
                  <span className="ml-2 opacity-60">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <p className="text-gray-500 mb-4">{t('empty.noOrders', { defaultValue: 'No orders found' })}</p>
                <Link href="/hostels">
                  <Button className="bg-rose-500 hover:bg-rose-600">{t('empty.exploreHostels', { defaultValue: 'Explore Hostels' })}</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const status = statusConfig[order.status]
                  
                  return (
                    <div 
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 rounded-lg bg-gray-200 relative flex-shrink-0 overflow-hidden">
                          <Image
                            src={order.hostelImage}
                            alt={order.hostelName}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-gray-500">{order.orderNo}</p>
                              <h3 className="font-semibold text-lg truncate">{order.hostelName}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {order.roomType}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                              <status.icon className="w-3 h-3" />
                              {t(`status.${status.labelKey}`)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>
                              {order.checkIn && order.checkOut 
                                ? `${format(new Date(order.checkIn), 'MMM d')} - ${format(new Date(order.checkOut), 'MMM d')}`
                                : 'N/A'}
                            </span>
                            <span>·</span>
                            <span>{order.nights} {t('nights')}</span>
                            <span>·</span>
                            <span>{order.bedCount} {t('beds', { defaultValue: 'beds' })}</span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <span className="font-semibold">{order.currency} {order.total}</span>
                            <div className="flex items-center gap-2">
                              {order.canReview && !order.reviewed && (
                                <span className="text-rose-500 text-sm font-medium">{t('reviewNow')}</span>
                              )}
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>

      {/* Review Modal */}
      {showReviewModal && reviewOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-2">{t('rateYourStay')}</h2>
            <p className="text-gray-500 mb-4">{reviewOrder.hostelName}</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
            
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
              placeholder={t('shareExperience')}
            />
            
            <div className="flex gap-3 mt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReviewModal(false)}
              >
                {tCommon('cancel')}
              </Button>
              <Button 
                className="flex-1 bg-rose-500 hover:bg-rose-600"
                onClick={submitReview}
              >
                {t('submitReview')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
