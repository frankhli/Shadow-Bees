'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { X, Calendar, MapPin, Users, Clock, DollarSign, Wine, Footprints, UtensilsCrossed, Scissors, PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const eventTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PUB_CRAWL: Wine,
  CITY_WALK: Footprints,
  FOOD_TOUR: UtensilsCrossed,
  WORKSHOP: Scissors,
  OTHER: PartyPopper,
}

const getEventTypes = (t: any) => [
  { value: 'PUB_CRAWL', label: t('eventTypes.pubCrawl', { defaultValue: 'Pub Crawl' }) },
  { value: 'CITY_WALK', label: t('eventTypes.cityWalk', { defaultValue: 'City Walk' }) },
  { value: 'FOOD_TOUR', label: t('eventTypes.foodTour', { defaultValue: 'Food Tour' }) },
  { value: 'WORKSHOP', label: t('eventTypes.workshop', { defaultValue: 'Workshop' }) },
  { value: 'OTHER', label: t('eventTypes.other', { defaultValue: 'Other' }) },
]

const getCities = (t: any) => [
  { value: 'Beijing', label: t('cities.beijing', { defaultValue: 'Beijing' }) },
  { value: 'Shanghai', label: t('cities.shanghai', { defaultValue: 'Shanghai' }) },
  { value: "Xi'an", label: t('cities.xian', { defaultValue: "Xi'an" }) },
  { value: 'Chengdu', label: t('cities.chengdu', { defaultValue: 'Chengdu' }) },
  { value: 'Hangzhou', label: t('cities.hangzhou', { defaultValue: 'Hangzhou' }) },
  { value: 'Guilin', label: t('cities.guilin', { defaultValue: 'Guilin' }) },
]

export function CreateEventModal({ isOpen, onClose, onSuccess }: CreateEventModalProps) {
  const t = useTranslations('social')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    type: '',
    city: '',
    meetingPoint: '',
    eventDate: '',
    eventTime: '',
    duration: 120,
    maxPeople: 10,
    price: 0,
    description: '',
    descriptionEn: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const eventDateTime = new Date(`${formData.eventDate}T${formData.eventTime}`)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizerId: 'guest-1', // TODO: Get from auth
          organizerType: 'guest',
          title: formData.title,
          titleEn: formData.titleEn,
          type: formData.type,
          city: formData.city,
          meetingPoint: formData.meetingPoint,
          eventDate: eventDateTime.toISOString(),
          duration: formData.duration,
          maxPeople: formData.maxPeople,
          price: formData.price,
          description: formData.description,
          descriptionEn: formData.descriptionEn
        })
      })

      if (res.ok) {
        onSuccess?.()
        onClose()
      }
    } catch (error) {
      console.error('Failed to create event:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('createEvent')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Event Type */}
          <div>
            <Label>{t('eventType')}</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {getEventTypes(t).map((type) => {
                const IconComponent = eventTypeIcons[type.value]
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.type === type.value
                        ? 'border-cyan-500 bg-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="flex justify-center mb-1">
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <span className="text-sm">{type.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">{t('eventTitle')}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t('titlePlaceholder', { defaultValue: 'e.g., Friday Night Pub Crawl' })}
                required
              />
            </div>
            <div>
              <Label htmlFor="titleEn">{t('eventTitleEn')}</Label>
              <Input
                id="titleEn"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="e.g., Hutong Night Tour"
              />
            </div>
          </div>

          {/* City & Meeting Point */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">{t('city')}</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData({ ...formData, city: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectCity')} />
                </SelectTrigger>
                <SelectContent>
                  {getCities(t).map((city) => (
                    <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meetingPoint">{t('meetingPoint')}</Label>
              <Input
                id="meetingPoint"
                value={formData.meetingPoint}
                onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                placeholder={t('meetingPointPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">{t('date')}</Label>
              <Input
                id="date"
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">{t('time')}</Label>
              <Input
                id="time"
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">{t('duration')}</Label>
              <Select
                value={formData.duration.toString()}
                onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">{t('duration.1hour', { defaultValue: '1 hour' })}</SelectItem>
                  <SelectItem value="90">{t('duration.1_5hours', { defaultValue: '1.5 hours' })}</SelectItem>
                  <SelectItem value="120">{t('duration.2hours', { defaultValue: '2 hours' })}</SelectItem>
                  <SelectItem value="180">{t('duration.3hours', { defaultValue: '3 hours' })}</SelectItem>
                  <SelectItem value="240">{t('duration.4hours', { defaultValue: '4 hours' })}</SelectItem>
                  <SelectItem value="300">{t('duration.5hours', { defaultValue: '5 hours' })}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Max People & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxPeople">{t('maxPeople')}</Label>
              <Input
                id="maxPeople"
                type="number"
                min={2}
                max={50}
                value={formData.maxPeople}
                onChange={(e) => setFormData({ ...formData, maxPeople: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">{t('pricePerPerson')}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="price"
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{t('freeIfZero')}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('descriptionPlaceholder')}
              rows={3}
              required
            />
          </div>
          <div>
            <Label htmlFor="descriptionEn">{t('descriptionEn')}</Label>
            <Textarea
              id="descriptionEn"
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              placeholder={t('descriptionEnPlaceholder')}
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('creating') : t('createEvent')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
