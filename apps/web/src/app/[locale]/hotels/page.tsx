'use client'

import { Suspense, useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/user-nav'
import { LanguageSwitcher } from '@/components/language-switcher'
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  SlidersHorizontal,
  Map,
  List,
  Wifi,
  Waves,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Globe,
  Info,
  X,
  ChevronDown,
  Minus,
  Plus,
  Calendar,
  Menu
} from 'lucide-react'
import { format, addDays, differenceInDays } from 'date-fns'

// API Types
interface RoomType {
  id: string
  name: string
  pricePerBed: number
  availableBeds: number
}

interface Hostel {
  id: string
  name: string
  nameCn: string
  city: string
  district: string
  pricePerNight: number
  rating: number
  reviewCount: number
  images: string[]
  badges: string[]
  roomTypes: RoomType[]
  amenities: string[]
  distanceToDivingPirate: string
  facilities?: { icon: string; label: string; labelEn?: string }[]
}

interface ApiResponse {
  data: Hostel[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Honest facility filters for foreign travelers
const honestFacilityFilters = [
  { icon: null, label: '🚽 Western Toilet', key: 'western_toilet', color: 'emerald' },
  { icon: null, label: '🛗 Elevator', key: 'elevator', color: 'blue' },
  { icon: null, label: '🇬🇧 English Staff', key: 'english_staff', color: 'purple' },
  { icon: Wifi, label: '📶 WiFi', key: 'wifi', color: 'gray' },
]

// Map API amenities to filter keys
function mapAmenityToKey(amenity: string): string | null {
  const lower = amenity.toLowerCase()
  if (lower.includes('wifi')) return 'wifi'
  if (lower.includes('parking')) return 'parking'
  if (lower.includes('kitchen')) return 'kitchen'
  if (lower.includes('pool')) return 'pool'
  if (lower.includes('gym')) return 'gym'
  return null
}

// Calculate total price
function calculateTotalPrice(pricePerNight: number, checkIn: Date | null, checkOut: Date | null): number {
  if (!checkIn || !checkOut) return pricePerNight * 5 // Default 5 nights
  const nights = differenceInDays(checkOut, checkIn)
  return pricePerNight * Math.max(nights, 1)
}

// Static initial data to prevent hydration mismatch
const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Hutong Heritage House',
    nameCn: '胡同 heritage 客栈',
    city: 'Beijing',
    district: 'Dongcheng',
    pricePerNight: 89,
    rating: 4.9,
    reviewCount: 128,
    images: ['https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=800&fit=crop'],
    badges: ['Superhost'],
    roomTypes: [{ id: '1', name: 'Standard Room', pricePerBed: 89, availableBeds: 4 }],
    amenities: ['WiFi', 'Air Conditioning'],
    distanceToDivingPirate: 'Near Forbidden City',
    facilities: [{ icon: 'Bath', label: 'Western Toilet' }]
  },
  {
    id: '2',
    name: 'The Bund View Suite',
    nameCn: '外滩景观套房',
    city: 'Shanghai',
    district: 'Huangpu',
    pricePerNight: 145,
    rating: 4.8,
    reviewCount: 256,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=800&fit=crop'],
    badges: ['Superhost', 'Elevator'],
    roomTypes: [{ id: '2', name: 'Deluxe Suite', pricePerBed: 145, availableBeds: 2 }],
    amenities: ['WiFi', 'Elevator', 'English Staff'],
    distanceToDivingPirate: 'The Bund waterfront',
    facilities: [{ icon: 'Bath', label: 'Western Toilet' }, { icon: 'Users', label: 'Elevator' }]
  }
]

// Inner component that uses useSearchParams
function HotelsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations()
  
  // Get search params from URL
  const queryParam = searchParams.get('q') || ''
  const facilityParam = searchParams.get('facility') || ''
  const cityParam = searchParams.get('city') || ''
  
  // Data state - use static initial data to prevent hydration mismatch
  const [hostels, setHostels] = useState<Hostel[]>(initialHostels)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  
  // Filter state - initialize from URL params
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    facilityParam ? [facilityParam] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  
  // Fetch data from API
  useEffect(() => {
    async function fetchHostels() {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/hostels?limit=100`)
        if (!response.ok) {
          throw new Error('Failed to fetch hostels')
        }
        const data: ApiResponse = await response.json()
        setHostels(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    
    fetchHostels()
  }, [])
  
  // Derived state - with real search functionality
  const filteredHostels = useMemo(() => {
    return hostels.filter(hostel => {
      // Search by query (name, city, district)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          hostel.name.toLowerCase().includes(query) ||
          hostel.city.toLowerCase().includes(query) ||
          (hostel.district && hostel.district.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }
      
      // Filter by city from URL
      if (cityParam) {
        if (hostel.city.toLowerCase() !== cityParam.toLowerCase()) {
          return false
        }
      }
      
      // Check guest capacity
      const maxBeds = Math.max(...hostel.roomTypes.map(rt => rt.availableBeds), 0)
      if (guests > maxBeds) {
        return false
      }
      
      // Check amenities/facilities (honest facility filters)
      if (selectedAmenities.length > 0) {
        const hostelFacilities = hostel.facilities?.map((f: any) => f.label?.toLowerCase() || '') || []
        const hasAllAmenities = selectedAmenities.every(amenity => {
          // Map amenity keys to facility labels
          const amenityMapping: Record<string, string[]> = {
            'western_toilet': ['western toilet', 'toilet'],
            'elevator': ['elevator', 'lift'],
            'english_staff': ['english', 'staff'],
            'wifi': ['wifi', 'internet'],
          }
          const searchTerms = amenityMapping[amenity] || [amenity]
          return searchTerms.some(term => 
            hostelFacilities.some((f: string) => f.includes(term))
          )
        })
        if (!hasAllAmenities) return false
      }
      
      // Check price range
      if (hostel.pricePerNight < priceRange[0] || hostel.pricePerNight > priceRange[1]) {
        return false
      }
      
      return true
    })
  }, [hostels, searchQuery, cityParam, checkIn, checkOut, guests, selectedAmenities, priceRange])
  
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 5

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const handleSearch = () => {
    // Update URL with search params
    const params = new URLSearchParams()
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'))
    params.set('guests', guests.toString())
    router.push(`/hotels?${params.toString()}`)
  }

  // Get first image or fallback
  const getHostelImage = (hostel: Hostel): string => {
    return hostel.images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=800&fit=crop'
  }

  // Get location string
  const getHostelLocation = (hostel: Hostel): string => {
    return `${hostel.district}, ${hostel.city}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-rose-500 font-bold text-xl hidden sm:block">tiaohai</span>
            </Link>

            {/* Active Search Bar with text search */}
            <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center px-4 py-2 border-r border-gray-300">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search destinations, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none text-sm w-40"
                />
              </div>
              <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="px-4 py-2 font-medium text-sm border-r border-gray-300 hover:bg-gray-50"
              >
                {checkIn && checkOut 
                  ? `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
                  : 'Add dates'
                }
              </button>
              <button 
                onClick={() => setShowGuestPicker(!showGuestPicker)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                {guests} guests
              </button>
              <button 
                onClick={handleSearch}
                className="m-1 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center hover:bg-rose-600"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <UserNav />
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="border-t border-gray-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${
                  showFilters ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 hover:border-gray-900'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('common.filter')}
                {(selectedAmenities.length > 0 || priceRange[1] < 200) && (
                  <span className="ml-1 w-5 h-5 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center">
                    {selectedAmenities.length + (priceRange[1] < 200 ? 1 : 0)}
                  </span>
                )}
              </button>
              
              {/* Honest Facility Filters - for foreign travelers */}
              <span className="text-sm text-gray-500 mr-2 hidden lg:inline">Must-have:</span>
              {honestFacilityFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => toggleAmenity(filter.key)}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedAmenities.includes(filter.key)
                      ? `border-${filter.color}-500 bg-${filter.color}-50 text-${filter.color}-700`
                      : 'border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{t('hotels.filters.price')}</h3>
                  <span className="text-sm text-gray-600">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <button 
                    onClick={() => {setSelectedAmenities([]); setPriceRange([0, 500])}}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {t('hotels.clearFilters')}
                  </button>
                  <span className="text-sm text-gray-500">
                    {filteredHostels.length} {t('home.stays')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('hero.search.checkIn')} - {t('hero.search.checkOut')}</h3>
              <button onClick={() => setShowDatePicker(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('hero.search.checkIn')}</label>
                <input
                  type="date"
                  value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('hero.search.checkOut')}</label>
                <input
                  type="date"
                  value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                  min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <Button 
                onClick={() => setShowDatePicker(false)}
                className="w-full bg-rose-500 hover:bg-rose-600"
              >
                {t('hotels.applyDates', { defaultValue: 'Apply dates' })}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Guest Picker Modal */}
      {showGuestPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('hero.search.guests')}</h3>
              <button onClick={() => setShowGuestPicker(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">{t('hero.search.adults')}</p>
                <p className="text-sm text-gray-500">{t('hero.search.adultsDesc')}</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{guests}</span>
                <button 
                  onClick={() => setGuests(Math.min(8, guests + 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button 
              onClick={() => setShowGuestPicker(false)}
              className="w-full bg-rose-500 hover:bg-rose-600"
            >
              {t('common.apply', { defaultValue: 'Apply' })}
            </Button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {loading ? (
              'Loading...'
            ) : checkIn && checkOut ? (
              <>
                {filteredHostels.length} {t('home.stays')} · {nights} {t('checkout.nights')} · {guests} {t('hero.search.who')}
              </>
            ) : (
              <>{filteredHostels.length} {t('home.stays')}</>
            )}
          </p>
          {(checkIn || checkOut || selectedAmenities.length > 0) && (
            <button 
              onClick={() => {setCheckIn(null); setCheckOut(null); setSelectedAmenities([]); setPriceRange([0, 200])}}
              className="text-sm text-rose-500 hover:underline"
            >
              {t('hotels.clearFilters')}
            </button>
          )}
        </div>
      </div>

      {/* Hostel Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Loading hostels...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-xl text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-rose-500 hover:underline"
            >
              Try again
            </button>
          </div>
        ) : filteredHostels.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">{t('hotels.noResults')}</p>
            <button 
              onClick={() => {setCheckIn(null); setCheckOut(null)}}
              className="mt-4 text-rose-500 hover:underline"
            >
              {t('hotels.tryAdjusting')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHostels.map((hostel) => {
              const totalPrice = calculateTotalPrice(hostel.pricePerNight, checkIn, checkOut)
              const image = getHostelImage(hostel)
              const location = getHostelLocation(hostel)
              
              return (
                <div key={hostel.id} className="group">
                  <Link href={`/hotels/${hostel.id}?${checkIn ? `checkIn=${format(checkIn, 'yyyy-MM-dd')}&` : ''}${checkOut ? `checkOut=${format(checkOut, 'yyyy-MM-dd')}&` : ''}guests=${guests}`}>
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
                      <Image
                        src={image}
                        alt={hostel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {hostel.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {hostel.badges.map((badge) => (
                            <span key={badge} className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <button 
                        className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/20 transition-colors z-10"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      >
                        <Heart className="w-5 h-5 text-white stroke-2" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{location}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm">{hostel.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-500 text-sm truncate">{hostel.name}</p>
                      <p className="text-gray-400 text-xs">{hostel.distanceToDivingPirate}</p>
                      
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-semibold text-gray-900">${hostel.pricePerNight}</span>
                        <span className="text-gray-500 text-sm">/{t('home.night')}</span>
                      </div>
                      
                      {checkIn && checkOut && (
                        <p className="text-sm text-gray-500">
                          ${totalPrice} {t('checkout.total')} · {nights} {t('checkout.nights')}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

// Loading fallback for Suspense
function HotelsPageLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  )
}

// Default export wrapped in Suspense
export default function HotelsPage() {
  return (
    <Suspense fallback={<HotelsPageLoading />}>
      <HotelsPageContent />
    </Suspense>
  )
}
