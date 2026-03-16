'use client'

import { useState, useMemo, Suspense, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { AIChatWidget } from '@/components/ai-chat-widget'
import dynamic from 'next/dynamic'
import { 
  MapPin, 
  Star, 
  Share,
  Wind,
  Bath,
  Users,
  Wifi,
  Coffee,
  Car,
  Check,
  ChevronRight,
  Minus,
  Plus,
  X,
  ChevronLeft
} from 'lucide-react'
import { format, addDays, differenceInDays } from 'date-fns'

// Dynamic import for HotelDetailMap (client-side only)
const HotelDetailMap = dynamic(
  () => import('@/components/map/HotelDetailMap').then(mod => mod.HotelDetailMap),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    )
  }
)

interface BookingLinks {
  bookingCom?: string
  airbnb?: string
  agoda?: string
  ctrip?: string
}

interface HonestFacility {
  id: string
  name: string
  available: boolean
  note?: string
  icon: string
}

interface ForeignFriendly {
  englishSpeaking: boolean
  westernToilet: boolean
  elevator: boolean
  visaAssistance: boolean
  internationalPayment: boolean
}

interface Hostel {
  id: string
  name: string
  nameCn?: string
  city: string
  district?: string
  address: string
  description: string
  pricePerNight: number
  cleaningFee: number
  serviceFee: number
  rating: number
  reviewCount: number
  images: string[]
  badges?: string[]
  amenities: string[]
  facilities: { icon: string; label: string; labelEn?: string }[]
  commonAreas?: string[]
  weeklyEvents?: { day: string; event: string; time: string }[]
  checkInTime?: string
  checkOutTime?: string
  houseRules?: string[]
  host: {
    name: string
    since: number | string
    languages: string[]
    responseRate: string
    responseTime?: string
    rating?: number
    reviews?: number
  }
  reviews?: { id: string; userName: string; country: string; rating: number; date: string; text: string }[]
  roomTypes?: { id: string; name: string; bedCount: number; pricePerBed: number; gender: string; amenities: string[]; availableBeds: number }[]
  // Core differentiation fields
  hasWesternToilet?: boolean
  hasElevator?: boolean
  hasEnglishSpeakingStaff?: boolean
  honestFacilities?: HonestFacility[]
  foreignFriendly?: ForeignFriendly
  bookingLinks?: BookingLinks
  culturalTips?: string[]
  coordinates?: [number, number]  // [longitude, latitude] for map
}

// Map facility icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Wind,
  Bath,
  Users,
  Coffee,
  Car,
}

function isDateAvailable(checkInTime: string | undefined, checkOutTime: string | undefined, date: Date): boolean {
  // Simple availability check - in real app, this would check against booked dates
  const now = new Date()
  return date >= now
}

function HotelContent({ params }: { params: { id: string; locale: string } }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('hotel.detail')
  const tHotel = useTranslations('hotel')
  const tCommon = useTranslations('common')
  const tNav = useTranslations('nav')
  
  const [hostel, setHostel] = useState<Hostel | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch hostel data from API
  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await fetch(`${apiUrl}/mock/hostels/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch hostel data')
        }
        
        const data = await response.json()
        setHostel(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchHostel()
  }, [params.id])
  
  // Get dates from URL or set defaults
  const urlCheckIn = searchParams.get('checkIn')
  const urlCheckOut = searchParams.get('checkOut')
  const urlGuests = searchParams.get('guests')
  
  // Use null as initial state to avoid hydration mismatch
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(parseInt(urlGuests || '2'))
  const [selectedRoom, setSelectedRoom] = useState<Hostel['roomTypes'][0] | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  // Set dates on client side only to avoid hydration mismatch
  useEffect(() => {
    if (urlCheckIn) {
      setCheckIn(new Date(urlCheckIn))
    } else {
      setCheckIn(addDays(new Date(), 7))
    }
    if (urlCheckOut) {
      setCheckOut(new Date(urlCheckOut))
    } else {
      setCheckOut(addDays(new Date(), 12))
    }
  }, [urlCheckIn, urlCheckOut])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{tCommon('loading')}</p>
        </div>
      </div>
    )
  }
  
  if (error || !hostel) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{tCommon('error')}</h1>
          <p className="text-gray-600 mb-6">{error || tCommon('hostelNotFound')}</p>
          <Link href="/hotels">
            <Button className="bg-rose-500 hover:bg-rose-600">{t('backToSearch')}</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  // Validation
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  const isAvailable = checkIn && checkOut ? 
    isDateAvailable(hostel.checkInTime, hostel.checkOutTime, checkIn) && 
    isDateAvailable(hostel.checkInTime, hostel.checkOutTime, checkOut) : false
  
  const maxGuests = hostel.roomTypes?.reduce((max, room) => Math.max(max, room.availableBeds), 4) || 4
  const isValid = nights > 0 && guests > 0 && guests <= maxGuests && isAvailable
  
  // Price calculation - use selected room price or first room type price or default to pricePerNight
  const pricePerNight = selectedRoom?.pricePerBed || hostel.roomTypes?.[0]?.pricePerBed || hostel.pricePerNight
  const roomTotal = pricePerNight * Math.max(nights, 1)
  const cleaningFee = hostel.cleaningFee || 0
  const serviceFee = hostel.serviceFee || 0
  const totalBeforeTaxes = roomTotal + cleaningFee + serviceFee
  
  const handleBook = () => {
    if (!isValid) return
    // Navigate to checkout with booking details
    const searchParams = new URLSearchParams({
      hotelId: hostel.id,
      checkIn: format(checkIn!, 'yyyy-MM-dd'),
      checkOut: format(checkOut!, 'yyyy-MM-dd'),
      guests: guests.toString()
    })
    router.push(`/checkout?${searchParams.toString()}`)
  }
  
  const updateDates = (newCheckIn: Date | null, newCheckOut: Date | null) => {
    setCheckIn(newCheckIn)
    setCheckOut(newCheckOut)
    // Update URL
    if (newCheckIn && newCheckOut) {
      router.push(`/hotels/${hostel.id}?checkIn=${format(newCheckIn, 'yyyy-MM-dd')}&checkOut=${format(newCheckOut, 'yyyy-MM-dd')}&guests=${guests}`)
    }
    setShowDatePicker(false)
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">{tCommon('bookingSuccess')}</h1>
          <p className="text-gray-600 mb-2">{tCommon('bookingSuccessMessage', { hotelName: hostel.name })}</p>
          <p className="text-gray-500 text-sm mb-6">{tCommon('hostConfirmTime')}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
            <p className="text-sm"><strong>{t('checkIn')}:</strong> {format(checkIn!, 'MMM d')} - {format(checkOut!, 'MMM d, yyyy')}</p>
            <p className="text-sm"><strong>{t('guests')}:</strong> {guests}</p>
            <p className="text-sm"><strong>{t('total')}:</strong> ${totalBeforeTaxes}</p>
          </div>
          <Link href="/hotels">
            <Button className="bg-rose-500 hover:bg-rose-600">{t('backToSearch')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get location display
  const locationDisplay = hostel.district 
    ? `${hostel.district}, ${hostel.city}` 
    : hostel.city

  // Map facilities to icons
  const facilitiesWithIcons = hostel.facilities.map(f => ({
    icon: iconMap[f.icon] || Wifi,
    label: f.labelEn || f.label
  }))

  // Check if superhost based on badges or rating
  const isSuperhost = hostel.badges?.includes('Superhost') || 
                      hostel.badges?.includes('Top Rated') || 
                      hostel.rating >= 4.8

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t('back')}</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share className="w-5 h-5" />
              </button>
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">{hostel.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{hostel.rating}</span>
              <span className="text-gray-500 underline">{hostel.reviewCount} {t('reviews')}</span>
            </div>
            {isSuperhost && <span className="font-medium text-rose-500 flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> {t('superhost')}</span>}
            <span className="text-gray-500">{locationDisplay}</span>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden mb-8 h-[300px] md:h-[400px]">
          <div className="relative bg-gray-200">
            <Image src={hostel.images[0]} alt={hostel.name} fill className="object-cover" priority />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-2">
            {hostel.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative bg-gray-200">
                <Image src={img} alt={`${hostel.name} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start justify-between pb-6 border-b">
              <div>
                <h2 className="text-xl font-semibold">{t('hostedBy')} {hostel.host.name}</h2>
                <p className="text-gray-500 mt-1">{guests} {t('guests')} · 1 {t('bedroom')} · {maxGuests > 2 ? `2 ${t('beds')}` : `1 ${t('bed')}`} · {facilitiesWithIcons.filter(f => f.label.toLowerCase().includes('bath')).length || 1} {t('bath')}</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-xl font-semibold text-rose-600">
                {hostel.host.name.charAt(0)}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4 pb-6 border-b">
              {isSuperhost && (
                <div className="flex gap-4">
                  <Star className="w-6 h-6 text-rose-500" />
                  <div>
                    <h3 className="font-semibold">{hostel.host.name} {t('superhost')}</h3>
                    <p className="text-gray-500 text-sm">{t('superhostDesc')}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-rose-500" />
                <div>
                  <h3 className="font-semibold">{t('greatLocation')}</h3>
                  <p className="text-gray-500 text-sm">{t('locationDesc')}</p>
                </div>
              </div>
            </div>

            {/* Honest Facility Checklist - Core Differentiation */}
            <div className="pb-6 border-b">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Honest Facility Checklist</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  We tell you what others won&apos;t. No surprises when you arrive.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Western Toilet */}
                  {hostel.facilities?.some((f: any) => f.label?.toLowerCase().includes('western toilet')) ? (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">Western Toilet</p>
                        <p className="text-xs text-gray-500">Sit-down toilet available</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-medium text-gray-900">No Western Toilet</p>
                        <p className="text-xs text-gray-500">Squat toilet only</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Elevator */}
                  {hostel.facilities?.some((f: any) => f.label?.toLowerCase().includes('elevator') || f.label?.toLowerCase().includes('lift')) ? (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">Elevator</p>
                        <p className="text-xs text-gray-500">Easy access to all floors</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">❌</span>
                      <div>
                        <p className="font-medium text-gray-900">No Elevator</p>
                        <p className="text-xs text-gray-500">Stairs only - free luggage help provided</p>
                      </div>
                    </div>
                  )}
                  
                  {/* English Speaking */}
                  {hostel.host?.languages?.includes('English') ? (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">English-Speaking Staff</p>
                        <p className="text-xs text-gray-500">Front desk speaks English</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <p className="font-medium text-gray-900">Limited English</p>
                        <p className="text-xs text-gray-500">Use AI Concierge for translation</p>
                      </div>
                    </div>
                  )}
                  
                  {/* WiFi */}
                  {hostel.facilities?.some((f: any) => f.label?.toLowerCase().includes('wifi')) ? (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-medium text-gray-900">Free WiFi</p>
                        <p className="text-xs text-gray-500">High-speed internet</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-xl">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <p className="font-medium text-gray-900">Limited WiFi</p>
                        <p className="text-xs text-gray-500">Check with host</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Why this matters */}
                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <strong>Why this matters:</strong> Many Chinese hotels have squat toilets and no elevators. 
                    We verify these details so you can pack accordingly and avoid surprises.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Tips for Foreign Travelers */}
            {hostel.culturalTips && hostel.culturalTips.length > 0 && (
              <div className="pb-6 border-b">
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🎎</span>
                    Cultural Tips for Foreign Guests
                  </h2>
                  <ul className="space-y-2">
                    {hostel.culturalTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="pb-6 border-b">
              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </div>

            {/* Amenities */}
            <div className="pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">{t('amenities')}</h2>
              <div className="grid grid-cols-2 gap-4">
                {facilitiesWithIcons.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <f.icon className="w-6 h-6 text-gray-700" />
                    <span className="text-gray-700">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map - NEW */}
            <div id="map" className="pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-500" />
                {t('location')}
              </h2>
              
              <div className="mb-4">
                <p className="text-gray-700">{hostel.address}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>📍 {hostel.district}, {hostel.city}</span>
                  {hostel.coordinates && (
                    <span className="text-blue-500">
                      📍 {hostel.coordinates[1].toFixed(4)}, {hostel.coordinates[0].toFixed(4)}
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Map */}
              {hostel.coordinates ? (
                <HotelDetailMap
                  hotelCoordinates={hostel.coordinates}
                  hotelName={hostel.name}
                  height="400px"
                />
              ) : (
                <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Map location coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Room Types */}
            {hostel.roomTypes && hostel.roomTypes.length > 0 && (
              <div className="pb-6 border-b" id="rooms">
                <h2 className="text-xl font-semibold mb-4">{tHotel('roomTypes', { defaultValue: 'Select Room Type' })}</h2>
                <div className="space-y-4">
                  {hostel.roomTypes.map((room) => (
                    <div 
                      key={room.id} 
                      onClick={() => setSelectedRoom(room)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedRoom?.id === room.id 
                          ? 'border-rose-500 bg-rose-50/30 shadow-md' 
                          : 'border-gray-200 hover:border-rose-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{room.name}</h3>
                            {selectedRoom?.id === room.id && (
                              <span className="px-2 py-0.5 bg-rose-500 text-white text-xs rounded-full">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{room.gender} · {room.bedCount} beds</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {room.amenities.slice(0, 4).map((amenity) => (
                              <span key={amenity} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500">
                            <span className={`font-medium ${room.availableBeds > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                              {room.availableBeds > 0 ? `${room.availableBeds} beds available` : 'Sold out'}
                            </span>
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-xl text-rose-600">${room.pricePerBed}</p>
                          <p className="text-sm text-gray-500">{tHotel('price.perNight')}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRoom(room);
                            }}
                            disabled={room.availableBeds === 0}
                            className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              selectedRoom?.id === room.id
                                ? 'bg-rose-500 text-white'
                                : room.availableBeds > 0
                                  ? 'bg-gray-100 text-gray-700 hover:bg-rose-100 hover:text-rose-700'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {selectedRoom?.id === room.id ? 'Selected' : room.availableBeds > 0 ? 'Select' : 'Unavailable'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!selectedRoom && (
                  <p className="mt-3 text-sm text-amber-600 flex items-center gap-1">
                    <span>⚠️</span>
                    Please select a room type to continue
                  </p>
                )}
              </div>
            )}

            {/* House Rules */}
            {hostel.houseRules && hostel.houseRules.length > 0 && (
              <div className="pb-6 border-b">
                <h2 className="text-xl font-semibold mb-4">{tHotel('houseRules', { defaultValue: 'House Rules' })}</h2>
                <ul className="space-y-2">
                  {hostel.houseRules.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {rule}
                    </li>
                  ))}
                </ul>
                {hostel.checkInTime && hostel.checkOutTime && (
                  <div className="mt-4 flex gap-8 text-sm">
                    <div>
                      <span className="font-medium">{t('checkIn')}:</span> {hostel.checkInTime}
                    </div>
                    <div>
                      <span className="font-medium">{t('checkOut')}:</span> {hostel.checkOutTime}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-300 rounded-xl p-6 shadow-lg">
              {/* Price */}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-2xl font-semibold">${pricePerNight}</span>
                  <span className="text-gray-500"> / {tHotel('price.perNight')}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{hostel.rating}</span>
                </div>
              </div>

              {/* Date/Guest Selector */}
              <div className="border border-gray-400 rounded-lg mb-4">
                <button 
                  onClick={() => setShowDatePicker(true)}
                  className="w-full grid grid-cols-2 border-b border-gray-400"
                >
                  <div className="p-3 border-r border-gray-400 text-left">
                    <div className="text-xs font-bold uppercase">{t('checkIn')}</div>
                    <div className="text-gray-700">{checkIn ? format(checkIn, 'MMM d') : t('addDate')}</div>
                  </div>
                  <div className="p-3 text-left">
                    <div className="text-xs font-bold uppercase">{t('checkOut')}</div>
                    <div className="text-gray-700">{checkOut ? format(checkOut, 'MMM d') : t('addDate')}</div>
                  </div>
                </button>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase">{tNav('hotels')}</div>
                    <div className="text-gray-700">{guests} {t('guests')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                      disabled={guests >= maxGuests}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Honesty Facilities Quick Preview - Critical for Foreign Tourists */}
              <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-3">
                  ✓ Verified for International Travelers
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {/* Western Toilet */}
                  <div className={`text-center p-2 rounded-lg ${hostel.hasWesternToilet ? 'bg-white' : 'bg-red-50'}`}>
                    <div className={`text-lg mb-1 ${hostel.hasWesternToilet ? 'text-emerald-600' : 'text-red-500'}`}>
                      {hostel.hasWesternToilet ? '✅' : '❌'}
                    </div>
                    <p className={`text-xs font-medium ${hostel.hasWesternToilet ? 'text-gray-700' : 'text-red-700'}`}>
                      Western Toilet
                    </p>
                  </div>
                  
                  {/* Elevator */}
                  <div className={`text-center p-2 rounded-lg ${hostel.hasElevator ? 'bg-white' : 'bg-red-50'}`}>
                    <div className={`text-lg mb-1 ${hostel.hasElevator ? 'text-emerald-600' : 'text-red-500'}`}>
                      {hostel.hasElevator ? '✅' : '❌'}
                    </div>
                    <p className={`text-xs font-medium ${hostel.hasElevator ? 'text-gray-700' : 'text-red-700'}`}>
                      Elevator
                    </p>
                  </div>
                  
                  {/* English Staff */}
                  <div className={`text-center p-2 rounded-lg ${hostel.hasEnglishSpeakingStaff ? 'bg-white' : 'bg-red-50'}`}>
                    <div className={`text-lg mb-1 ${hostel.hasEnglishSpeakingStaff ? 'text-emerald-600' : 'text-red-500'}`}>
                      {hostel.hasEnglishSpeakingStaff ? '✅' : '❌'}
                    </div>
                    <p className={`text-xs font-medium ${hostel.hasEnglishSpeakingStaff ? 'text-gray-700' : 'text-red-700'}`}>
                      English Staff
                    </p>
                  </div>
                </div>
                {!hostel.hasWesternToilet && !hostel.hasElevator && (
                  <p className="text-xs text-amber-600 mt-2 text-center">
                    ⚠️ No Western toilet or elevator - pack accordingly
                  </p>
                )}
              </div>

              {/* Selected Room Display */}
              {selectedRoom && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Selected Room</p>
                  <p className="font-semibold text-gray-900">{selectedRoom.name}</p>
                  <p className="text-sm text-rose-600">${selectedRoom.pricePerBed} / night</p>
                </div>
              )}
              {hostel.roomTypes && hostel.roomTypes.length > 0 && !selectedRoom && (
                <div className="mb-4">
                  <a 
                    href="#rooms" 
                    className="text-sm text-rose-600 hover:text-rose-700 underline flex items-center gap-1"
                  >
                    <span>👇</span>
                    View room options
                  </a>
                </div>
              )}

              {/* Validation Messages */}
              {(!checkIn || !checkOut) && (
                <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm">
                  {t('selectDatesError')}
                </div>
              )}
              {checkIn && checkOut && nights <= 0 && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {t('checkOutAfterCheckIn')}
                </div>
              )}
              {!isAvailable && checkIn && checkOut && nights > 0 && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {t('datesNotAvailable')}
                </div>
              )}
              {guests > maxGuests && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {t('maxGuests', { max: maxGuests })}
                </div>
              )}
              {hostel.roomTypes && hostel.roomTypes.length > 0 && !selectedRoom && (
                <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm flex items-center gap-2">
                  <span>🏠</span>
                  Please select a room type below
                </div>
              )}

              {/* Booking Redirect Buttons - Clear OTA导流 */}
              <div className="space-y-3">
                {hostel.bookingLinks?.bookingCom && (
                  <Button 
                    onClick={() => window.open(hostel.bookingLinks?.bookingCom, '_blank')}
                    className="w-full bg-[#003580] hover:bg-[#002a66] text-white font-semibold py-6 rounded-lg"
                  >
                    Check Availability on Booking.com
                  </Button>
                )}
                
                {hostel.bookingLinks?.airbnb && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(hostel.bookingLinks?.airbnb, '_blank')}
                    className="w-full border-rose-500 text-rose-500 hover:bg-rose-50 font-semibold py-6 rounded-lg"
                  >
                    View on Airbnb
                  </Button>
                )}
              </div>
              
              <p className="text-center text-gray-500 text-sm mt-3">
                We partner with trusted platforms to ensure secure booking. 
                Tiaohai helps you find the perfect stay with honest information.
              </p>

              {/* Price Breakdown */}
              {nights > 0 && (
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="underline">${pricePerNight} x {nights} {tCommon('night')}</span>
                    <span>${roomTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t('cleaningFee')}</span>
                    <span>${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">{t('serviceFee')}</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                    <span>{t('total')}</span>
                    <span>${totalBeforeTaxes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('addDate')}</h3>
              <button onClick={() => setShowDatePicker(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkIn')}</label>
                <input
                  type="date"
                  value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkOut')}</label>
                <input
                  type="date"
                  value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                  min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : undefined}
                  onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <Button 
                onClick={() => updateDates(checkIn, checkOut)}
                disabled={!checkIn || !checkOut}
                className="w-full bg-rose-500 hover:bg-rose-600"
              >
                {t('applyDates')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <AIChatWidget hotelId={hostel.id} hotelName={hostel.name} />
    </div>
  )
}

export default function HotelPage(props: { params: { id: string; locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HotelContent params={props.params} />
    </Suspense>
  )
}
