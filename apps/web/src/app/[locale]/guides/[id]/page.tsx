'use client'
import { Link } from "@/navigation"
import { useState, useEffect } from 'react'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Star, MapPin, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Guide {
  id: string
  name: string
  nameEn: string | null
  city: string
  languages: string[]
  specialties: string[]
  rating: number
  hourlyRate: number | null
  bio: string | null
  bioEn: string | null
  licenseNo: string | null
  licenseVerified: boolean
  user?: { email: string }
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

const languageLabels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
}

export default function GuideDetailPage({ params: { locale, id } }: { params: { locale: string; id: string } }) {
  const t = useTranslations()
  const router = useRouter()
  const [guide, setGuide] = useState<Guide | null>(null)
  const [loading, setLoading] = useState(true)
  const [hours, setHours] = useState(4)
  const [date, setDate] = useState('')
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    fetchGuide()
  }, [id])

  const fetchGuide = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/guides/${id}`)
      if (!res.ok) throw new Error('Guide not found')
      const data = await res.json()
      setGuide(data)
    } catch (error) {
      console.error('Failed to fetch guide:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBook = async () => {
    if (!date || !guide) return
    setBooking(true)
    
    try {
      // Create order via API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderType: 'GUIDE_ONLY',
          guideId: guide.id,
          serviceDate: date,
          serviceHours: hours,
          guideFee: (guide.hourlyRate || 0) * hours,
          totalAmount: (guide.hourlyRate || 0) * hours,
        }),
      })
      
      if (res.ok) {
        router.push(`/${locale}/orders`)
      }
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setBooking(false)
    }
  }

  const totalPrice = (guide?.hourlyRate || 0) * hours

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{t('guide.notFound', { defaultValue: 'Guide not found' })}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
              <span className="text-xl font-bold">Tiaohai</span>
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link href={`/${locale}/guides`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{t('nav.guides')}</span>
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Guide Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center text-4xl font-bold text-cyan-700">
                {(guide.nameEn || guide.name).charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{guide.nameEn}</h1>
                <p className="text-lg text-muted-foreground">{guide.name}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-lg">{guide.rating}</span>
                    <span className="text-sm text-muted-foreground">({t('guide.rating', { defaultValue: 'Rating' })})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{guide.city}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {guide.specialties.map((spec: string) => (
                    <Badge 
                      key={spec} 
                      className={`${specialtyLabels[spec]?.color || 'bg-gray-100'}`}
                    >
                      {specialtyLabels[spec]?.label || spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{guide.languages.length}</div>
                  <p className="text-sm text-muted-foreground">{t('guide.languages')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-2xl font-bold">{guide.specialties?.length || 0}</div>
                  <p className="text-sm text-muted-foreground">{t('guide.specialties', { defaultValue: 'Specialties' })}</p>
                </CardContent>
              </Card>
            </div>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>{t('guide.about')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {guide.bioEn || guide.bio || t('guide.noBio', { defaultValue: 'Experienced local guide ready to show you around.' })}
                </p>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">{t('guide.languages')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages?.map((lang: string) => (
                      <Badge key={lang} variant="outline">
                        {languageLabels[lang] || lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {guide.licenseVerified && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">{t('guide.license')}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      {guide.licenseNo ? `${t('guide.licenseLabel')} ${guide.licenseNo}` : t('guide.verifiedGuide')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reviews Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>{t('guide.reviewsTitle', { defaultValue: 'Reviews' })}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t('guide.noReviews', { defaultValue: 'No reviews yet. Be the first to book!' })}</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{t('guide.bookTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${guide.hourlyRate}</span>
                    <span className="text-muted-foreground">{t('guide.perHour')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t('guide.minimumHours')}</p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('guide.selectDate')}</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Hours Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('guide.duration')}</label>
                  <div className="flex gap-2">
                    {[2, 4, 6, 8].map((h) => (
                      <Button
                        key={h}
                        variant={hours === h ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setHours(h)}
                      >
                        {t('guide.hoursShort', { h })}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">${guide.hourlyRate} × {hours} {t('guide.hours')}</span>
                    <span className="font-medium">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{t('guide.serviceFee')}</span>
                    <span>{t('common.included', { defaultValue: 'Included' })}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>{t('guide.total')}</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!date || booking}
                  onClick={handleBook}
                >
                  {booking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : date ? (
                    t('guide.requestToBook')
                  ) : (
                    t('guide.selectDateButton')
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {t('guide.bookingNote')}
                </p>

                {/* Trust Badges */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{t('guide.freeCancellation')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{t('guide.verifiedGuide')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{t('guide.securePayment')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
