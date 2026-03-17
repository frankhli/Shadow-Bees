'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { UserNav } from '@/components/user-nav'
import { useAuth } from '@/contexts/auth-context'
import { format, addDays } from 'date-fns'
import { 
  Search, 
  MapPin, 
  Star, 
  Heart,
  Shield, 
  MessageCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Globe,
  X,
  Minus,
  Plus,
  Calendar,
  Check,
  Bath,
  ArrowUpDown,
  Languages,
  Train,
  FileCheck,
  CreditCard,
  Wifi
} from 'lucide-react'

// 增强的Hostel接口
interface Hostel {
  id: string
  name: string
  city: string
  district: string
  pricePerNight: number
  rating: number
  reviewCount: number
  images: string[]
  badges: string[]
  distanceToDivingPirate?: string
  honestFacilities?: HonestFacility[]
  foreignFriendly?: ForeignFriendly
  aiSummaryI18n?: Record<string, string>
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

// 体验类型分类
const experienceCategories = [
  { id: 'all', label: '🏠 All Stays', description: 'Browse all accommodations' },
  { id: 'hutong', label: '🏮 Hutong Culture', description: 'Traditional courtyard houses' },
  { id: 'historical', label: '⛩️ Historical Sites', description: 'Near Forbidden City, Great Wall' },
  { id: 'food', label: '🥟 Food & Dining', description: 'Culinary hotspots' },
  { id: 'nature', label: '🌿 Nature & Parks', description: 'Lakes, mountains, gardens' },
  { id: 'art', label: '🎨 Art & Design', description: 'Boutique art districts' },
  { id: 'riverside', label: '🌊 Riverside', description: 'Bund, West Lake views' },
  { id: 'modern', label: '🏙️ Modern City', description: 'High-rise city centers' },
]

// 设施筛选选项
const facilityFilters = [
  { id: 'western_toilet', label: '🚽 Western Toilet', icon: Bath, color: 'emerald', description: 'Sit-down toilet' },
  { id: 'elevator', label: '🛗 Elevator', icon: ArrowUpDown, color: 'blue', description: 'Easy floor access' },
  { id: 'english_staff', label: '🇬🇧 English Staff', icon: Languages, color: 'purple', description: 'Fluent English' },
  { id: 'visa_assistance', label: '🛂 Visa Help', icon: FileCheck, color: 'amber', description: '144-hour visa support' },
  { id: 'international_payment', label: '💳 Card Payment', icon: CreditCard, color: 'green', description: 'Visa/Mastercard' },
]

// Trust badges
const trustIndicators = [
  { icon: Shield, labelKey: 'verified', descKey: 'verifiedDesc' },
  { icon: MessageCircle, labelKey: 'support', descKey: 'supportDesc' },
  { icon: Star, labelKey: 'reviews', descKey: 'reviewsDesc' },
  { icon: Clock, labelKey: 'booking', descKey: 'bookingDesc' },
]

// AI预设问题
const aiPresetQuestions = [
  { icon: '🚽', text: 'Does this hotel have a Western toilet?', category: 'facilities' },
  { icon: '🛗', text: 'Is there an elevator?', category: 'facilities' },
  { icon: '🚇', text: 'How far from the subway?', category: 'location' },
  { icon: '🎎', text: 'What should I know about hutongs?', category: 'culture' },
]

export default function HomePage() {
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  
  // 状态管理
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedHostels, setSavedHostels] = useState<Set<string>>(new Set())
  const [featuredHostels, setFeaturedHostels] = useState<Hostel[]>([])
  const [loading, setLoading] = useState(true)
  
  // 日期选择状态
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  
  // 客人数量
  const [guests, setGuests] = useState(2)
  const [showGuestPicker, setShowGuestPicker] = useState(false)
  
  // 设施筛选
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  
  // 获取特色酒店
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/hostels/featured?limit=8`)
        const data = await res.json()
        setFeaturedHostels(data)
      } catch (error) {
        console.error('Failed to fetch hostels:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHostels()
  }, [])
  
  // 根据体验类型筛选
  const filteredHostels = activeCategory === 'all' 
    ? featuredHostels 
    : featuredHostels.filter(h => h.aiSummaryI18n?.en?.toLowerCase().includes(activeCategory) || 
        (activeCategory === 'hutong' && h.name.toLowerCase().includes('hutong')))
  
  // 切换收藏
  const toggleSaveHostel = (e: React.MouseEvent, hostelId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    setSavedHostels(prev => {
      const newSet = new Set(prev)
      if (newSet.has(hostelId)) {
        newSet.delete(hostelId)
      } else {
        newSet.add(hostelId)
      }
      return newSet
    })
  }
  
  // 切换设施筛选
  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    )
  }
  
  // 搜索跳转
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'))
    if (guests !== 2) params.set('guests', guests.toString())
    if (activeCategory !== 'all') params.set('experienceType', activeCategory)
    if (selectedFacilities.length > 0) params.set('facility', selectedFacilities.join(','))
    
    router.push(`/hotels?${params.toString()}`)
  }
  
  // 应用日期
  const applyDates = () => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      alert('Check-out date must be after check-in date')
      return
    }
    setShowDatePicker(false)
  }
  
  // 获取设施图标
  const getFacilityIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Bath, ArrowUpDown, Languages, Train, FileCheck, CreditCard, Wifi
    }
    return iconMap[iconName] || Check
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

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/hotels" className="text-gray-700 hover:text-gray-900 font-medium">
                {t('nav.stays')}
              </Link>
              <Link href="/experiences" className="text-gray-500 hover:text-gray-900">
                {t('nav.experiences')}
              </Link>
              <Link href="/guides" className="text-gray-500 hover:text-gray-900">
                {t('nav.guides')}
              </Link>
              <Link href="/social" className="text-gray-500 hover:text-gray-900">
                {t('footer.community')}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search */}
      <div className="relative">
        <div className="h-[520px] bg-gradient-to-br from-rose-100 via-orange-50 to-yellow-50 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            {/* 144小时免签标识 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium mb-6 animate-pulse">
              <Globe className="w-4 h-4" />
              144-hour Visa-Free Transit Available
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('hero.title')} {t('hero.titleHighlight')}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Honest info about hotels in China. We tell you what others won&apos;t: Western toilet? Elevator? English staff?
            </p>
          </div>
        </div>

        {/* 搜索框 - 放在Hero下方 */}
        <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* 搜索栏 */}
            <div className="flex flex-col md:flex-row items-stretch">
              {/* 目的地 */}
              <div className="flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
                <label className="block text-xs font-bold text-gray-900 mb-1">Where</label>
                <input 
                  type="text" 
                  placeholder="Search destinations, hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                />
              </div>
              
              {/* 入住日期 */}
              <button 
                onClick={() => setShowDatePicker(true)}
                className="flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 text-left hover:bg-gray-50 transition-colors"
              >
                <label className="block text-xs font-bold text-gray-900 mb-1">Check In</label>
                <span className={`text-sm ${checkIn ? 'text-gray-900' : 'text-gray-400'}`}>
                  {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Add date'}
                </span>
              </button>
              
              {/* 退房日期 */}
              <button 
                onClick={() => setShowDatePicker(true)}
                className="flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 text-left hover:bg-gray-50 transition-colors"
              >
                <label className="block text-xs font-bold text-gray-900 mb-1">Check Out</label>
                <span className={`text-sm ${checkOut ? 'text-gray-900' : 'text-gray-400'}`}>
                  {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Add date'}
                </span>
              </button>
              
              {/* 客人数量 */}
              <button 
                onClick={() => setShowGuestPicker(true)}
                className="flex-1 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <label className="block text-xs font-bold text-gray-900 mb-1">Guests</label>
                <span className="text-sm text-gray-900">{guests} guest{guests > 1 ? 's' : ''}</span>
              </button>
              
              {/* 搜索按钮 */}
              <button 
                onClick={handleSearch}
                className="bg-rose-500 text-white px-8 py-3 md:rounded-r-2xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span className="md:hidden">Search</span>
              </button>
            </div>
            
            {/* 设施快速筛选 */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-500 mr-1">Must-have for foreign guests:</span>
                {facilityFilters.slice(0, 4).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFacility(filter.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedFacilities.includes(filter.id)
                        ? `bg-${filter.color}-100 border-${filter.color}-300 text-${filter.color}-700`
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span>{filter.label.split(' ')[0]}</span>
                    <span className="hidden sm:inline">{filter.label.split(' ').slice(1).join(' ')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Concierge 快速入口 */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Not sure what to look for?</h3>
                <p className="text-sm text-gray-600">Ask our AI Concierge - it knows Chinese hotels inside out</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/chat')}
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
            >
              Ask AI Concierge
            </button>
          </div>
          
          {/* 预设问题 */}
          <div className="mt-4 flex flex-wrap gap-2">
            {aiPresetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => router.push('/chat')}
                className="text-xs px-3 py-1.5 bg-white rounded-full border border-violet-200 text-violet-700 hover:bg-violet-50 transition-colors"
              >
                {q.icon} {q.text}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Experience</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {experienceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 min-w-[100px] p-4 rounded-xl border-2 transition-all ${
                activeCategory === cat.id 
                  ? 'border-rose-500 bg-rose-50 text-rose-700' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <span className="text-2xl">{cat.label.split(' ')[0]}</span>
              <span className="text-xs font-medium text-center">{cat.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustIndicators.map((item) => (
            <div key={item.labelKey} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t(`home.trust.${item.labelKey}`)}</h3>
                <p className="text-xs text-gray-500">{t(`home.trust.${item.descKey}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Stays</h2>
          <Link href="/hotels" className="flex items-center gap-1 text-rose-500 font-medium hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHostels.map((hostel) => (
              <Link key={hostel.id} href={`/hotels/${hostel.id}`} className="group">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
                  <Image
                    src={hostel.images[0]}
                    alt={hostel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <button 
                    onClick={(e) => toggleSaveHostel(e, hostel.id)}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 stroke-2 transition-colors ${
                        savedHostels.has(hostel.id) 
                          ? 'fill-rose-500 text-rose-500' 
                          : 'text-white'
                      }`} 
                    />
                  </button>
                  
                  {/* 诚实设施标签 */}
                  {hostel.foreignFriendly && (
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                      {hostel.foreignFriendly.westernToilet && (
                        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                          <Bath className="w-3 h-3" /> Western Toilet
                        </span>
                      )}
                      {hostel.foreignFriendly.elevator && (
                        <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                          <ArrowUpDown className="w-3 h-3" /> Elevator
                        </span>
                      )}
                      {hostel.foreignFriendly.englishSpeaking && (
                        <span className="bg-purple-500 text-white px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                          <Languages className="w-3 h-3" /> English
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{hostel.district}, {hostel.city}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{hostel.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm truncate">{hostel.name}</p>
                  <p className="text-gray-400 text-xs">{hostel.distanceToDivingPirate}</p>
                  
                  {/* 诚实设施预览 */}
                  {hostel.honestFacilities && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hostel.honestFacilities.slice(0, 3).map((facility) => (
                        <span 
                          key={facility.id}
                          className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            facility.available 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {facility.available ? '✓' : '✗'} {facility.name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-semibold text-gray-900">${hostel.pricePerNight}</span>
                    <span className="text-gray-500 text-sm">/ night</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Tiaohai */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Foreign Travelers Choose Tiaohai
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Honest Facility Checklist</h3>
                    <p className="text-gray-600">We verify and show you: Western toilet? Elevator? English staff? No surprises when you arrive.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Concierge</h3>
                    <p className="text-gray-600">Get instant answers in your language about hotels, customs, and travel tips.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">144-Hour Visa-Free</h3>
                    <p className="text-gray-600">Optimized for visa-free transit travelers. We help you plan the perfect short trip.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=600&fit=crop"
                alt="Tiaohai Experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { city: 'Shanghai', stays: 12, image: 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=400&h=400&fit=crop' },
            { city: 'Beijing', stays: 10, image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=400&fit=crop' },
            { city: 'Chengdu', stays: 8, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' },
            { city: "Xi'an", stays: 5, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=400&fit=crop' },
          ].map((dest) => (
            <Link 
              key={dest.city} 
              href={`/hotels?city=${dest.city.toLowerCase()}`}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={dest.image}
                alt={dest.city}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-xl">{dest.city}</h3>
                <p className="text-sm opacity-90">{dest.stays}+ stays</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Dates</h3>
              <button onClick={() => setShowDatePicker(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Check In</label>
                <input
                  type="date"
                  value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Check Out</label>
                <input
                  type="date"
                  value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                  min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : undefined}
                  onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={() => { setCheckIn(null); setCheckOut(null); setShowDatePicker(false); }}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button 
                  onClick={applyDates}
                  disabled={!checkIn || !checkOut}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest Picker Modal */}
      {showGuestPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Guests</h3>
              <button onClick={() => setShowGuestPicker(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-sm text-gray-500">Ages 13+</p>
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
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:underline">Help Center</Link></li>
                <li><Link href="/safety" className="hover:underline">Safety</Link></li>
                <li><Link href="/cancellation" className="hover:underline">Cancellation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/guides" className="hover:underline">Travel Guides</Link></li>
                <li><Link href="/social" className="hover:underline">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hosting</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/partner/register" className="hover:underline">List Your Property</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tiaohai</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="text-gray-400">About Us (Coming Soon)</span></li>
                <li><span className="text-gray-400">Careers (Coming Soon)</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2026 Tiaohai. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="text-gray-400">Privacy (Coming Soon)</span>
              <span className="text-gray-400">Terms (Coming Soon)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
