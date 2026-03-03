'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Calendar,
  Shield,
  Edit3,
  MapPin,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  Heart,
  Clock,
  Loader2
} from 'lucide-react'

// Mock user data for display
const defaultUserData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 555-0123',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  nationality: 'United States',
  memberSince: '2024-01-15',
  verified: true,
  languages: ['English', 'Spanish'],
  savedHotels: 12,
  totalTrips: 8,
  reviewsGiven: 5
}

// Mock stats - labels will be translated
const stats = [
  { labelKey: 'trips', value: 8, icon: Globe },
  { labelKey: 'saved', value: 12, icon: Heart },
  { labelKey: 'reviews', value: 5, icon: Star },
  { labelKey: 'member', value: '1y', icon: Calendar },
]

// Mock recent activity
const recentActivity = [
  { type: 'booking', title: 'Booked Hutong Heritage House', date: '2 days ago', icon: MapPin },
  { type: 'review', title: 'Reviewed The Bund View Suite', date: '1 week ago', icon: Star },
  { type: 'save', title: 'Saved Panda Garden Inn', date: '2 weeks ago', icon: Heart },
]

function LogoutButton({ label }: { label: string }) {
  const { logout } = useAuth()
  const router = useRouter()
  
  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  )
}

export default function ProfilePage() {
  const t = useTranslations('profile')
  const tNav = useTranslations('nav')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

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

  // Use real user data merged with defaults
  const displayUser = {
    name: user?.name || defaultUserData.name,
    email: user?.email || defaultUserData.email,
    phone: defaultUserData.phone,
    avatar: user?.avatar || defaultUserData.avatar,
    nationality: defaultUserData.nationality,
    memberSince: defaultUserData.memberSince,
    verified: true,
    languages: defaultUserData.languages,
    savedHotels: defaultUserData.savedHotels,
    totalTrips: defaultUserData.totalTrips,
    reviewsGiven: defaultUserData.reviewsGiven,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={displayUser.avatar}
                    alt={displayUser.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  {displayUser.verified && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-semibold">{displayUser.name}</h1>
                <p className="text-gray-500 text-sm">{displayUser.email}</p>
                <p className="text-gray-400 text-xs mt-1">{t('memberSince')} {displayUser.memberSince}</p>
                
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('edit')}
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {[
                { id: 'overview', labelKey: 'overview', icon: User },
                { id: 'orders', labelKey: 'orders', icon: MapPin, href: '/orders' },
                { id: 'saved', labelKey: 'savedHotels', icon: Heart },
                { id: 'reviews', labelKey: 'myReviews', icon: Star },
                { id: 'settings', labelKey: 'settings', icon: Settings },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={item.href || `#${item.id}`}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    activeTab === item.id ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-500' : 'text-gray-700'
                  }`}
                  onClick={() => !item.href && setActiveTab(item.id)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{t(item.labelKey)}</span>
                </Link>
              ))}
              <LogoutButton label={tNav('logout')} />
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.labelKey} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{t(stat.labelKey)}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">{t('recentActivity')}</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{t('personalInfo')}</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 className="w-4 h-4 mr-1" />
                  {tCommon('edit')}
                </Button>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.form.firstName', { defaultValue: 'First Name' })}</label>
                      <input type="text" defaultValue={displayUser.name.split(' ')[0]} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t('profile.form.lastName', { defaultValue: 'Last Name' })}</label>
                      <input type="text" defaultValue={displayUser.name.split(' ').slice(1).join(' ')} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.form.email', { defaultValue: 'Email' })}</label>
                    <input type="email" defaultValue={displayUser.email} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('profile.form.phone', { defaultValue: 'Phone' })}</label>
                    <input type="tel" defaultValue={displayUser.phone} className="w-full border rounded-lg px-3 py-2" />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => setIsEditing(false)} className="bg-rose-500 hover:bg-rose-600">{t('common.save')}</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>{t('common.cancel')}</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('profile.labels.email', { defaultValue: 'Email' })}</p>
                      <p className="font-medium">{displayUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('profile.labels.phone', { defaultValue: 'Phone' })}</p>
                      <p className="font-medium">{displayUser.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('profile.labels.nationality', { defaultValue: 'Nationality' })}</p>
                      <p className="font-medium">{displayUser.nationality}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">{t('profile.labels.memberSince', { defaultValue: 'Member Since' })}</p>
                      <p className="font-medium">{displayUser.memberSince}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/orders">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{t('profile.quickLinks.myOrders', { defaultValue: 'My Orders' })}</h3>
                      <p className="text-sm text-gray-500">{t('profile.quickLinks.viewHistory', { defaultValue: 'View your booking history' })}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Link>
              <Link href="/hotels">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{t('findHotels')}</h3>
                      <p className="text-sm text-gray-500">{t('exploreDestinations')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
