'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Languages, Award, Camera } from 'lucide-react'

interface GuideProfile {
  id: string
  name: string
  nameEn: string | null
  city: string
  languages: string[]
  specialties: string[]
  bio: string | null
  bioEn: string | null
  licenseNo: string | null
  licenseVerified: boolean
  rating: number
  hourlyRate: number | null
  photos: string[]
}

const specialtyOptions = [
  { value: 'history', label: 'History' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'art', label: 'Art & Culture' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'photography', label: 'Photography' },
  { value: 'nature', label: 'Nature & Outdoors' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'ja', label: '日本語' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ko', label: '한국어' },
  { value: 'ru', label: 'Русский' },
]

export default function GuideProfilePage() {
  const t = useTranslations('guideDashboard')
  const [profile, setProfile] = useState<GuideProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      // TODO: Get actual guide ID from auth context
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/guides/guide-1`)
      const data = await res.json()
      setProfile(data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/guides/${profile.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameEn: profile.nameEn,
          bioEn: profile.bioEn,
          hourlyRate: profile.hourlyRate,
          languages: profile.languages,
          specialties: profile.specialties,
        }),
      })
      if (res.ok) {
        setEditing(false)
      }
    } catch (error) {
      console.error('Failed to save profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const toggleLanguage = (lang: string) => {
    if (!profile) return
    const newLanguages = profile.languages.includes(lang)
      ? profile.languages.filter(l => l !== lang)
      : [...profile.languages, lang]
    setProfile({ ...profile, languages: newLanguages })
  }

  const toggleSpecialty = (spec: string) => {
    if (!profile) return
    const newSpecialties = profile.specialties.includes(spec)
      ? profile.specialties.filter(s => s !== spec)
      : [...profile.specialties, spec]
    setProfile({ ...profile, specialties: newSpecialties })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('profileNotFound')}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('profileTitle')}</h1>
          <p className="text-gray-500">{t('profileSubtitle')}</p>
        </div>
        <Button 
          variant={editing ? 'default' : 'outline'}
          onClick={() => editing ? handleSave() : setEditing(true)}
          disabled={saving}
        >
          {editing ? (saving ? t('saving') : t('save')) : t('edit')}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-2xl font-bold">{profile.rating}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('rating')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-cyan-500" />
              <span className="text-2xl font-bold">{profile.languages.length}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('languages')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{profile.specialties.length}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('specialties')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              <span className="text-lg font-bold">{profile.city}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{t('city')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>{t('basicInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">{t('name')}</label>
              <Input value={profile.name} disabled className="mt-1 bg-gray-50" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">{t('nameEn')}</label>
              <Input 
                value={profile.nameEn || ''} 
                disabled={!editing}
                onChange={(e) => setProfile({ ...profile, nameEn: e.target.value })}
                className="mt-1"
                placeholder="Your name in English"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">{t('hourlyRate')}</label>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-500">$</span>
              <Input 
                type="number"
                value={profile.hourlyRate || ''} 
                disabled={!editing}
                onChange={(e) => setProfile({ ...profile, hourlyRate: Number(e.target.value) })}
                className="w-32"
              />
              <span className="text-gray-500">/ {t('hour')}</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">{t('license')}</label>
            <div className="flex items-center gap-2 mt-1">
              <Input value={profile.licenseNo || ''} disabled className="bg-gray-50" />
              {profile.licenseVerified && (
                <Badge className="bg-green-100 text-green-700">
                  {t('verified')}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader>
          <CardTitle>{t('about')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">{t('bioEn')}</label>
              {editing ? (
                <textarea
                  value={profile.bioEn || ''}
                  onChange={(e) => setProfile({ ...profile, bioEn: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-h-[120px]"
                  placeholder="Introduce yourself to international travelers..."
                />
              ) : (
                <p className="mt-1 text-gray-600">{profile.bioEn || t('noBio')}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>{t('languages')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map((lang) => (
              <button
                key={lang.value}
                onClick={() => editing && toggleLanguage(lang.value)}
                disabled={!editing}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  profile.languages.includes(lang.value)
                    ? 'bg-cyan-100 text-cyan-700 border-2 border-cyan-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                } ${!editing && 'cursor-default'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>{t('specialties')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {specialtyOptions.map((spec) => (
              <button
                key={spec.value}
                onClick={() => editing && toggleSpecialty(spec.value)}
                disabled={!editing}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  profile.specialties.includes(spec.value)
                    ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                } ${!editing && 'cursor-default'}`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card>
        <CardHeader>
          <CardTitle>{t('photos')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-cyan-400 transition-colors">
              <Camera className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">{t('addPhoto')}</span>
            </div>
            {profile.photos?.map((photo, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
