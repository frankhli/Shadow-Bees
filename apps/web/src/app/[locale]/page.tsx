'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { UserNav } from '@/components/user-nav'
import { useAuth } from '@/contexts/auth-context'
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
  Globe
} from 'lucide-react'

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
  facilities?: string[]
}

// Experience-based categories - more intuitive for foreign travelers
const categories = [
  { id: 'all', label: '🏠 All Stays' },
  { id: 'hutong', label: '🏮 Hutong Culture' },
  { id: 'historical', label: '⛩️ Historical Sites' },
  { id: 'food', label: '🥟 Food & Dining' },
  { id: 'nature', label: '🌿 Nature & Parks' },
  { id: 'art', label: '🎨 Art & Design' },
  { id: 'riverside', label: '🌊 Riverside' },
  { id: 'modern', label: '🏙️ Modern City' },
]

// Trust badges - labels use translation keys
const trustIndicators = [
  { icon: Shield, labelKey: 'verified', descKey: 'verifiedDesc' },
  { icon: MessageCircle, labelKey: 'support', descKey: 'supportDesc' },
  { icon: Star, labelKey: 'reviews', descKey: 'reviewsDesc' },
  { icon: Clock, labelKey: 'booking', descKey: 'bookingDesc' },
]

// Static initial data to prevent hydration mismatch
// This ensures SSR and CSR render the same initial content
const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Hutong Heritage House',
    city: 'Beijing',
    district: 'Dongcheng',
    pricePerNight: 89,
    rating: 4.9,
    reviewCount: 128,
    images: ['https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=800&fit=crop'],
    badges: ['Superhost'],
    distanceToDivingPirate: 'Near Forbidden City',
    facilities: ['Western Toilet', 'English Speaking']
  },
  {
    id: '2',
    name: 'The Bund View Suite',
    city: 'Shanghai',
    district: 'Huangpu',
    pricePerNight: 145,
    rating: 4.8,
    reviewCount: 256,
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=800&fit=crop'],
    badges: ['Superhost', 'Elevator'],
    distanceToDivingPirate: 'The Bund waterfront',
    facilities: ['Western Toilet', 'Elevator', 'English Speaking']
  },
  {
    id: '3',
    name: 'Xi\'an Ancient Courtyard',
    city: 'Xi\'an',
    district: 'Lianhu',
    pricePerNight: 65,
    rating: 4.7,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=800&fit=crop'],
    badges: ['Superhost'],
    distanceToDivingPirate: 'Near Bell Tower',
    facilities: ['Western Toilet']
  },
  {
    id: '4',
    name: 'Chengdu Panda Hostel',
    city: 'Chengdu',
    district: 'Jinjiang',
    pricePerNight: 45,
    rating: 4.6,
    reviewCount: 312,
    images: ['https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=800&fit=crop'],
    badges: ['English Staff'],
    distanceToDivingPirate: 'Tianfu Square',
    facilities: ['English Speaking', 'WiFi']
  }
]

export default function HomePage() {
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [savedHostels, setSavedHostels] = useState<Set<string>>(new Set())
  const [featuredHostels, setFeaturedHostels] = useState<Hostel[]>(initialHostels)
  const [loading, setLoading] = useState(true)

  // Fetch featured hostels from API
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

  const filteredHostels = activeCategory === 'all' 
    ? featuredHostels 
    : featuredHostels.filter(h => h.city.toLowerCase() === activeCategory)

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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/hotels?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push('/hotels')
    }
  }

  // Get destination image based on city
  const getCityImage = (city: string) => {
    const images: Record<string, string> = {
      'Shanghai': 'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=400&h=400&fit=crop',
      'Beijing': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=400&fit=crop',
      "Xi'an": 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=400&fit=crop',
      'Chengdu': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'Guangzhou': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop',
      'Shenzhen': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=400&fit=crop',
      'Hangzhou': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop',
      'Chongqing': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop',
      'Changsha': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=400&fit=crop',
    }
    return images[city] || images['Shanghai']
  }

  // Get city stats
  const getCityStats = (city: string) => {
    const stats: Record<string, number> = {
      'Beijing': 10,
      'Shanghai': 12,
      'Chengdu': 8,
      'Guangzhou': 6,
      'Shenzhen': 5,
      'Hangzhou': 4,
      'Chongqing': 4,
      "Xi'an": 5,
      'Changsha': 3,
    }
    return stats[city] || 5
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

        {/* Category Scroll */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center gap-2 min-w-fit pb-2 border-b-2 transition-colors ${
                    activeCategory === cat.id 
                      ? 'border-gray-900 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search */}
      <div className="relative">
        <div className="h-[480px] bg-gradient-to-br from-rose-100 via-orange-50 to-yellow-50 flex items-center justify-center">
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
              {t('hero.description')}
            </p>
            
            {/* AI Concierge 快速入口 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <button 
                onClick={() => router.push('/chat')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Ask AI Concierge
              </button>
              <span className="text-gray-500 text-sm">
                Get honest answers about hotels, facilities & customs
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
            {/* 搜索框 */}
            <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
              <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full">
                <label className="block text-xs font-bold text-gray-900">{t('hero.search.where')}</label>
                <input 
                  type="text" 
                  placeholder={t('hero.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full">
                <label className="block text-xs font-bold text-gray-900">{t('hero.search.checkIn')}</label>
                <input 
                  type="text" 
                  placeholder={t('hero.search.addDates')}
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                  readOnly
                />
              </div>
              <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full">
                <label className="block text-xs font-bold text-gray-900">{t('hero.search.checkOut')}</label>
                <input 
                  type="text" 
                  placeholder={t('hero.search.addDates')}
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                  readOnly
                />
              </div>
              <div className="flex-1 px-4 py-2 w-full">
                <label className="block text-xs font-bold text-gray-900">{t('hero.search.who')}</label>
                <input 
                  type="text" 
                  placeholder={t('hero.search.addGuests')}
                  className="w-full outline-none text-gray-700 placeholder:text-gray-400"
                  readOnly
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-rose-500 text-white rounded-full p-4 hover:opacity-90 transition-opacity"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {/* 设施快速筛选 */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 mr-2">Must-have for foreign guests:</span>
              {[
                { id: 'western_toilet', label: '🚽 Western Toilet', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                { id: 'elevator', label: '🛗 Elevator', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { id: 'english_staff', label: '🇬🇧 English Staff', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                { id: 'wifi', label: '📶 WiFi', color: 'bg-gray-50 text-gray-700 border-gray-200' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter.color} hover:opacity-80 transition-opacity`}
                  onClick={() => router.push(`/hotels?facility=${filter.id}`)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustIndicators.map((item) => (
            <div key={item.labelKey} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t(`home.trust.${item.labelKey}`)}</h3>
                <p className="text-sm text-gray-500">{t(`home.trust.${item.descKey}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.featuredStays')}</h2>
          <Link href="/hotels" className="flex items-center gap-1 text-gray-900 font-medium hover:underline">
            {t('home.showAll')} <ChevronRight className="w-4 h-4" />
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
                  {hostel.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      {hostel.badges.slice(0, 2).map(badge => (
                        <span key={badge} className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{hostel.district}, {hostel.city}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{hostel.rating}</span>
                    </div>
                  </div>
                  
                  {/* 诚实设施标签 - 核心差异化 */}
                  <div className="flex flex-wrap gap-1 py-1">
                    {hostel.facilities?.includes('Western Toilet') && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                        🚽 Western Toilet
                      </span>
                    )}
                    {hostel.facilities?.includes('Elevator') && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                        🛗 Elevator
                      </span>
                    )}
                    {hostel.facilities?.includes('English Speaking') && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">
                        🇬🇧 English Staff
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-500 text-sm truncate">{hostel.distanceToDivingPirate || 'Near city center'}</p>
                  <p className="text-gray-500 text-sm">{hostel.reviewCount} reviews</p>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-semibold text-gray-900">${hostel.pricePerNight}</span>
                    <span className="text-gray-500">{t('home.night')}</span>
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
                {t('home.whyChoose.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('home.whyChoose.aiConcierge.title')}</h3>
                    <p className="text-gray-600">{t('home.whyChoose.aiConcierge.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('home.whyChoose.verified.title')}</h3>
                    <p className="text-gray-600">{t('home.whyChoose.verified.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t('home.whyChoose.englishSupport.title')}</h3>
                    <p className="text-gray-600">{t('home.whyChoose.englishSupport.desc')}</p>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('home.popularDestinations')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { city: 'Shanghai', cityKey: 'shanghai', stays: 12 },
            { city: 'Beijing', cityKey: 'beijing', stays: 10 },
            { city: 'Chengdu', cityKey: 'chengdu', stays: 8 },
            { city: "Xi'an", cityKey: 'xian', stays: 5 },
          ].map((dest) => (
            <Link 
              key={dest.city} 
              href={`/hotels?city=${dest.city.toLowerCase()}`}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={getCityImage(dest.city)}
                alt={dest.city}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-xl">{dest.city}</h3>
                <p className="text-sm opacity-90">{dest.stays}+ {t('home.stays')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:underline">{t('footer.helpCenter')}</Link></li>
                <li><Link href="/safety" className="hover:underline">{t('footer.safety')}</Link></li>
                <li><Link href="/cancellation" className="hover:underline">{t('footer.cancellation')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.community')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="text-gray-400">{t('footer.referFriend')} ({t('footer.comingSoon')})</span></li>
                <li><Link href="/guides" className="hover:underline">{t('footer.travelGuide')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.hosting')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/partner/register" className="hover:underline">{t('footer.listProperty')}</Link></li>
                <li><span className="text-gray-400">{t('footer.hostResources')} ({t('footer.comingSoon')})</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.about')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><span className="text-gray-400">{t('footer.aboutUs')} ({t('footer.comingSoon')})</span></li>
                <li><span className="text-gray-400">{t('footer.careers')} ({t('footer.comingSoon')})</span></li>
                <li><span className="text-gray-400">{t('footer.press')} ({t('footer.comingSoon')})</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">{t('footer.copyright')}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="text-gray-400">{t('footer.privacy')} ({t('footer.comingSoon')})</span>
              <span className="text-gray-400">{t('footer.terms')} ({t('footer.comingSoon')})</span>
              <span className="text-gray-400">{t('footer.sitemap')} ({t('footer.comingSoon')})</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
