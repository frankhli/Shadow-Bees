'use client'

import { Link } from '@/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Star, MapPin, Globe, Loader2 } from 'lucide-react'

interface Guide {
  id: string
  name: string
  nameEn: string | null
  city: string
  languages: string[]
  specialties: string[]
  rating: number
  hourlyRate: number | null
  bioEn: string | null
  licenseVerified: boolean
}

const languageLabels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
}

const specialtyLabels: Record<string, { label: string; color: string }> = {
  history: { label: 'History', color: 'bg-amber-100 text-amber-800' },
  food: { label: 'Food & Dining', color: 'bg-red-100 text-red-800' },
  art: { label: 'Art & Culture', color: 'bg-purple-100 text-purple-800' },
  nightlife: { label: 'Nightlife', color: 'bg-indigo-100 text-indigo-800' },
  shopping: { label: 'Shopping', color: 'bg-pink-100 text-pink-800' },
  architecture: { label: 'Architecture', color: 'bg-blue-100 text-blue-800' },
  photography: { label: 'Photography', color: 'bg-green-100 text-green-800' },
}

const getCities = (t: any) => [
  { value: '', label: t('common.allCities', { defaultValue: 'All Cities' }) },
  { value: 'Beijing', label: t('common.cities.beijing', { defaultValue: 'Beijing' }) },
  { value: 'Shanghai', label: t('common.cities.shanghai', { defaultValue: 'Shanghai' }) },
  { value: "Xi'an", label: t('common.cities.xian', { defaultValue: "Xi'an" }) },
  { value: 'Chengdu', label: t('common.cities.chengdu', { defaultValue: 'Chengdu' }) },
  { value: 'Guilin', label: t('common.cities.guilin', { defaultValue: 'Guilin' }) },
  { value: 'Hangzhou', label: t('common.cities.hangzhou', { defaultValue: 'Hangzhou' }) },
]

export default function GuidesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations()
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  useEffect(() => {
    fetchGuides()
  }, [selectedCity, selectedLanguage])

  const fetchGuides = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity) params.append('city', selectedCity)
      if (selectedLanguage) params.append('language', selectedLanguage)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/guides?${params}`)
      const data = await res.json()
      setGuides(data)
    } catch (error) {
      console.error('Failed to fetch guides:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
            <span className="text-xl font-bold">Tiaohai</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/hotels" className="text-sm text-muted-foreground hover:text-foreground">
              {t('nav.hotels')}
            </Link>
            <Link href="/guides" className="text-sm font-medium">
              {t('nav.guides')}
            </Link>
            <Link href="/experiences" className="text-sm text-muted-foreground hover:text-foreground">
              {t('nav.experiences')}
            </Link>
            <Link href="/social" className="text-sm text-muted-foreground hover:text-foreground">
              {t('social.nav.social')}
            </Link>
            <LanguageSwitcher />
            <Button size="sm">{t('nav.listProperty')}</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('guides.title', { defaultValue: 'Local Guides' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('guides.subtitle', { defaultValue: 'Connect with verified local guides who speak your language and share your interests.' })}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            {getCities(t).map(city => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        {/* Guides Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : guides.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t('guides.noGuides', { defaultValue: 'No guides found for your criteria.' })}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center text-2xl">
                        {guide.nameEn?.charAt(0) || guide.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{guide.nameEn || guide.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {guide.city}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{guide.rating}</span>
                          {guide.licenseVerified && (
                            <Badge variant="outline" className="ml-2 text-xs">Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {guide.bioEn || t('guides.noBio', { defaultValue: 'Experienced local guide ready to show you around.' })}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.specialties?.slice(0, 3).map((spec) => (
                        <Badge key={spec} className={`text-xs ${specialtyLabels[spec]?.color || 'bg-gray-100'}`}>
                          {specialtyLabels[spec]?.label || spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="w-3 h-3" />
                        {guide.languages?.slice(0, 3).map(l => languageLabels[l] || l).join(', ')}
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">${guide.hourlyRate || 0}</span>
                        <span className="text-sm text-muted-foreground">/hr</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
