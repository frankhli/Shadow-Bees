'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Loader2, Clock, Users, MapPin, Scissors, UtensilsCrossed, ShoppingBag, Footprints } from 'lucide-react'

interface Experience {
  id: string
  name: string
  nameEn: string | null
  type: 'WORKSHOP' | 'DINING' | 'SHOPPING' | 'TOUR'
  city: string
  descriptionEn: string | null
  pricePerPerson: number
  durationMinutes: number
  maxCapacity: number
  photos: string[]
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  WORKSHOP: Scissors,
  DINING: UtensilsCrossed,
  SHOPPING: ShoppingBag,
  TOUR: Footprints,
}

const getTypeLabels = (t: any): Record<string, { label: string; color: string }> => ({
  WORKSHOP: { label: t('experienceTypes.workshop', { defaultValue: 'Workshop' }), color: 'bg-purple-100 text-purple-800' },
  DINING: { label: t('experienceTypes.dining', { defaultValue: 'Food & Dining' }), color: 'bg-red-100 text-red-800' },
  SHOPPING: { label: t('experienceTypes.shopping', { defaultValue: 'Shopping' }), color: 'bg-pink-100 text-pink-800' },
  TOUR: { label: t('experienceTypes.tour', { defaultValue: 'Tour' }), color: 'bg-blue-100 text-blue-800' },
})

const getCities = (t: any) => [
  { value: '', label: t('common.allCities', { defaultValue: 'All Cities' }) },
  { value: 'Beijing', label: t('common.cities.beijing', { defaultValue: 'Beijing' }) },
  { value: 'Shanghai', label: t('common.cities.shanghai', { defaultValue: 'Shanghai' }) },
  { value: "Xi'an", label: t('common.cities.xian', { defaultValue: "Xi'an" }) },
  { value: 'Chengdu', label: t('common.cities.chengdu', { defaultValue: 'Chengdu' }) },
  { value: 'Guilin', label: t('common.cities.guilin', { defaultValue: 'Guilin' }) },
  { value: 'Hangzhou', label: t('common.cities.hangzhou', { defaultValue: 'Hangzhou' }) },
]

export default function ExperiencesPage() {
  const t = useTranslations()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    fetchExperiences()
  }, [selectedCity])

  const fetchExperiences = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity) params.append('city', selectedCity)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/experiences?${params}`)
      const data = await res.json()
      setExperiences(data)
    } catch (error) {
      console.error('Failed to fetch experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${minutes}m`
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
            <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
              {t('nav.guides')}
            </Link>
            <Link href="/experiences" className="text-sm font-medium">
              {t('nav.experiences')}
            </Link>
            <Link href="/social" className="text-sm text-muted-foreground hover:text-foreground">
              {t('footer.community')}
            </Link>
            <LanguageSwitcher />
            <Button size="sm">{t('nav.listProperty')}</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">{t('experiences.title', { defaultValue: 'Cultural Experiences' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('experiences.subtitle', { defaultValue: 'Authentic workshops, food tours, and cultural activities curated for international travelers.' })}
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            {getCities(t).map(city => (
              <option key={city.value} value={city.value}>{city.label}</option>
            ))}
          </select>
        </div>

        {/* Experiences Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t('experiences.noExperiences', { defaultValue: 'No experiences found for your criteria.' })}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <Card key={exp.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    {(() => {
                      const IconComponent = typeIcons[exp.type] || MapPin
                      return <IconComponent className="w-12 h-12 text-white/80" />
                    })()}
                  </div>
                  <Badge className={`absolute top-4 right-4 ${getTypeLabels(t)[exp.type]?.color || ''}`}>
                    {getTypeLabels(t)[exp.type]?.label || exp.type}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{exp.nameEn || exp.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {exp.city}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {exp.descriptionEn || t('experiences.noDescription', { defaultValue: 'An authentic cultural experience awaits.' })}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(exp.durationMinutes)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Max {exp.maxCapacity}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${exp.pricePerPerson}</span>
                    <span className="text-sm text-muted-foreground">/person</span>
                  </div>
                  <Button className="w-full mt-4">{t('experiences.bookNow', { defaultValue: 'Book Now' })}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
