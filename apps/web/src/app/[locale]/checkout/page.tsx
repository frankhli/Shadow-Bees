'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { 
  ChevronLeft,
  Shield,
  Lock,
  CreditCard,
  Check,
  AlertCircle,
  Loader2,
  Star
} from 'lucide-react'
import { useUser } from '@/components/user-provider'
import { format, differenceInDays } from 'date-fns'

interface BookingData {
  hotelId: string
  hotelName: string
  hotelImage: string
  checkIn: string
  checkOut: string
  guests: number
  pricePerNight: number
  cleaningFee: number
  serviceFee: number
}

// Mock hotel data lookup
const getHotelData = (id: string) => {
  const hotels: Record<string, any> = {
    '1': {
      id: '1',
      name: 'Hutong Heritage House',
      location: 'Dongcheng, Beijing',
      image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=400&h=300&fit=crop',
      price: 89,
      cleaningFee: 25,
      serviceFee: 15,
    },
    '2': {
      id: '2',
      name: 'The Bund View Suite',
      location: 'Huangpu, Shanghai',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
      price: 145,
      cleaningFee: 35,
      serviceFee: 25,
    }
  }
  return hotels[id] || hotels['1']
}

// Inner component that uses useSearchParams
function CheckoutPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('checkout')
  const tCommon = useTranslations('common')
  const { user, isLoading } = useUser()
  
  // Check login status
  if (!isLoading && !user) {
    // Store intended destination and redirect to login
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('redirectAfterLogin', currentUrl)
    }
    router.push('/login')
    return null
  }
  
  // Get booking details from URL
  const hotelId = searchParams.get('hotelId') || '1'
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = parseInt(searchParams.get('guests') || '2')
  
  const hotel = getHotelData(hotelId)
  const checkInDate = checkIn ? new Date(checkIn) : null
  const checkOutDate = checkOut ? new Date(checkOut) : null
  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0
  
  // Price calculation
  const roomTotal = hotel.price * nights
  const cleaningFee = hotel.cleaningFee
  const serviceFee = hotel.serviceFee
  const total = roomTotal + cleaningFee + serviceFee
  
  // Form state
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  // Guest info
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    passportCountry: 'US',
    nationality: '',
    dateOfBirth: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  })
  
  // Payment info (mock)
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
    billingCountry: 'US'
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!guestInfo.firstName) newErrors.firstName = t('guestInfo.errors.firstName')
    if (!guestInfo.lastName) newErrors.lastName = t('guestInfo.errors.lastName')
    if (!guestInfo.email) newErrors.email = t('guestInfo.errors.email')
    else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) newErrors.email = t('guestInfo.errors.emailInvalid')
    if (!guestInfo.phone) newErrors.phone = t('guestInfo.errors.phone')
    if (!guestInfo.passportNumber) newErrors.passportNumber = t('guestInfo.errors.passportNumber')
    if (!guestInfo.nationality) newErrors.nationality = t('guestInfo.errors.nationality')
    if (!guestInfo.dateOfBirth) newErrors.dateOfBirth = t('guestInfo.errors.dateOfBirth')
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = t('payment.errors.cardNumber')
    }
    if (!paymentInfo.cardHolder) newErrors.cardHolder = t('payment.errors.cardHolder')
    if (!paymentInfo.expiryMonth || !paymentInfo.expiryYear) {
      newErrors.expiry = t('payment.errors.expiry')
    }
    if (paymentInfo.cvv.length !== 3) newErrors.cvv = t('payment.errors.cvv')
    if (!paymentInfo.billingAddress) newErrors.billingAddress = t('payment.errors.billingAddress')
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handlePayment()
    }
  }
  
  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order ID
    const newOrderId = 'TH' + Date.now().toString(36).toUpperCase()
    setOrderId(newOrderId)
    setBookingComplete(true)
    setIsProcessing(false)
  }
  
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
          </div>
        </header>
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('success.title')}</h1>
            <p className="text-gray-600 mb-6">{t('success.message', { hotelName: hotel.name })}.</p>
            
            <div className="bg-gray-50 rounded-xl p-6 text-left mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg bg-gray-200 relative overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-gray-500 text-sm">{hotel.location}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('success.orderId')}</span>
                  <span className="font-mono font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('success.dates')}</span>
                  <span>{checkInDate && format(checkInDate, 'MMM d')} - {checkOutDate && format(checkOutDate, 'MMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('hero.search.who')}</span>
                  <span>{guests} {t('hero.search.who')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t('success.guest')}</span>
                  <span>{guestInfo.firstName} {guestInfo.lastName}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold">{t('success.totalPaid')}</span>
                  <span className="font-semibold">${total}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 text-left mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">{t('success.whatsNext')}</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('success.checkEmail')}</li>
                <li>• {t('success.contactHost')}: +86 138-1234-5678</li>
                <li>• {t('success.downloadVoucher')}</li>
                <li>• {t('success.addToCalendar')}</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Link href="/hotels" className="flex-1">
                <Button variant="outline" className="w-full">{t('success.continueBrowsing')}</Button>
              </Link>
              <Button className="flex-1 bg-rose-500 hover:bg-rose-600">
                {t('success.downloadVoucher')}
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/hotels/${hotelId}`} className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('back')}</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
          <LanguageSwitcher />
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-rose-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? 'bg-rose-500 text-white' : 'bg-gray-200'}`}>1</div>
                <span className="hidden sm:inline font-medium">{t('step1')}</span>
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-rose-500' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? 'bg-rose-500 text-white' : 'bg-gray-200'}`}>2</div>
                <span className="hidden sm:inline font-medium">{t('step2')}</span>
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">3</div>
                <span className="hidden sm:inline font-medium">{t('step3')}</span>
              </div>
            </div>
            
            {step === 1 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6">{t('guestInfo.title')}</h2>
                <p className="text-gray-500 text-sm mb-6">
                  {t('guestInfo.subtitle')}
                </p>
                
                <div className="space-y-6">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('guestInfo.firstName')} *</label>
                      <input
                        type="text"
                        value={guestInfo.firstName}
                        onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.firstName')}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('guestInfo.lastName')} *</label>
                      <input
                        type="text"
                        value={guestInfo.lastName}
                        onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.lastName')}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('guestInfo.email')} *</label>
                      <input
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.email')}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('guestInfo.phone')} *</label>
                      <input
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.phone')}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  {/* Passport */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium mb-4">{t('passport.title')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">{t('guestInfo.passportNumber')} *</label>
                        <input
                          type="text"
                          value={guestInfo.passportNumber}
                          onChange={(e) => setGuestInfo({...guestInfo, passportNumber: e.target.value})}
                          className={`w-full border rounded-lg px-3 py-2 ${errors.passportNumber ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder={t('common.placeholders.passport')}
                        />
                        {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t('guestInfo.nationality')} *</label>
                        <select
                          value={guestInfo.nationality}
                          onChange={(e) => setGuestInfo({...guestInfo, nationality: e.target.value})}
                          className={`w-full border rounded-lg px-3 py-2 ${errors.nationality ? 'border-red-500' : 'border-gray-300'}`}
                        >
                          <option value="">{t('guestInfo.selectCountry', { defaultValue: 'Select country' })}</option>
                          <option value="US">{t('countries.US', { defaultValue: 'United States' })}</option>
                          <option value="UK">{t('countries.UK', { defaultValue: 'United Kingdom' })}</option>
                          <option value="CA">{t('countries.CA', { defaultValue: 'Canada' })}</option>
                          <option value="AU">{t('countries.AU', { defaultValue: 'Australia' })}</option>
                          <option value="DE">{t('countries.DE', { defaultValue: 'Germany' })}</option>
                          <option value="FR">{t('countries.FR', { defaultValue: 'France' })}</option>
                          <option value="JP">{t('countries.JP', { defaultValue: 'Japan' })}</option>
                          <option value="KR">{t('countries.KR', { defaultValue: 'South Korea' })}</option>
                          <option value="SG">{t('countries.SG', { defaultValue: 'Singapore' })}</option>
                          <option value="OTHER">{t('countries.OTHER', { defaultValue: 'Other' })}</option>
                        </select>
                        {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">{t('guestInfo.dateOfBirth')} *</label>
                      <input
                        type="date"
                        value={guestInfo.dateOfBirth}
                        onChange={(e) => setGuestInfo({...guestInfo, dateOfBirth: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6">{t('payment.title')}</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-green-800">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">{t('payment.securePayment')}</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">{t('payment.secureDesc')}</p>
                </div>
                
                <div className="space-y-6">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('payment.cardNumber')}</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').substring(0, 16)
                          setPaymentInfo({...paymentInfo, cardNumber: value})
                        }}
                        className={`w-full border rounded-lg pl-10 pr-3 py-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.cardNumber')}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  
                  {/* Card Holder */}
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('payment.cardHolder')}</label>
                    <input
                      type="text"
                      value={paymentInfo.cardHolder}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardHolder: e.target.value})}
                      className={`w-full border rounded-lg px-3 py-2 ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t('common.placeholders.cardHolder')}
                    />
                    {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                  </div>
                  
                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('payment.month', { defaultValue: 'Month' })}</label>
                      <select
                        value={paymentInfo.expiryMonth}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryMonth: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">{t('payment.monthPlaceholder', { defaultValue: 'MM' })}</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('payment.year', { defaultValue: 'Year' })}</label>
                      <select
                        value={paymentInfo.expiryYear}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryYear: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">{t('payment.yearPlaceholder', { defaultValue: 'YYYY' })}</option>
                        {Array.from({length: 10}, (_, i) => (
                          <option key={i} value={2026 + i}>{2026 + i}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('payment.cvv')}</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').substring(0, 3)
                            setPaymentInfo({...paymentInfo, cvv: value})
                          }}
                          className={`w-full border rounded-lg pl-9 pr-3 py-2 ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder={t('common.placeholders.cvv')}
                        />
                      </div>
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
                  
                  {/* Billing Address */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium mb-4">{t('payment.billingAddress')}</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={paymentInfo.billingAddress}
                        onChange={(e) => setPaymentInfo({...paymentInfo, billingAddress: e.target.value})}
                        className={`w-full border rounded-lg px-3 py-2 ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('common.placeholders.address')}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={paymentInfo.billingCity}
                          onChange={(e) => setPaymentInfo({...paymentInfo, billingCity: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder={t('common.placeholders.city')}
                        />
                        <input
                          type="text"
                          value={paymentInfo.billingZip}
                          onChange={(e) => setPaymentInfo({...paymentInfo, billingZip: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          placeholder={t('common.placeholders.zip')}
                        />
                      </div>
                      <select
                        value={paymentInfo.billingCountry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, billingCountry: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="US">{t('countries.US', { defaultValue: 'United States' })}</option>
                        <option value="UK">{t('countries.UK', { defaultValue: 'United Kingdom' })}</option>
                        <option value="CA">{t('countries.CA', { defaultValue: 'Canada' })}</option>
                        <option value="AU">{t('countries.AU', { defaultValue: 'Australia' })}</option>
                        <option value="DE">{t('countries.DE', { defaultValue: 'Germany' })}</option>
                        <option value="FR">{t('countries.FR', { defaultValue: 'France' })}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Continue Button */}
            <div className="mt-6 flex gap-4">
              {step === 2 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="px-8"
                >
                  {t('back')}
                </Button>
              )}
              <Button 
                onClick={handleContinue}
                disabled={isProcessing}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('processing')}
                  </>
                ) : step === 1 ? (
                  t('continue')
                ) : (
                  `${t('confirm')} $${total}`
                )}
              </Button>
            </div>
          </div>
          
          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <p className="text-sm text-gray-500">{hotel.location}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{checkInDate && format(checkInDate, 'MMM d')}</span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium">{checkOutDate && format(checkOutDate, 'MMM d, yyyy')}</span>
                </div>
                <p className="text-sm text-gray-500">{nights} {t('nights')} · {guests} {t('hero.search.who')}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="underline">${hotel.price} x {nights} {t('nights')}</span>
                  <span>${roomTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline">{t('cleaningFee')}</span>
                  <span>${cleaningFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="underline">{t('serviceFee')}</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                  <span>{t('total')}</span>
                  <span>${total}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Free cancellation before {checkInDate && format(new Date(checkInDate.getTime() - 24*60*60*1000), 'MMM d')}. Full refund guaranteed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Loading fallback for Suspense
function CheckoutPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading checkout...</p>
      </div>
    </div>
  )
}

// Default export wrapped in Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutPageLoading />}>
      <CheckoutPageContent />
    </Suspense>
  )
}
