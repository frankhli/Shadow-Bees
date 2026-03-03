'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { X, MapPin, Calendar, Users, DollarSign, BedDouble } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
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

interface CreateRoomShareModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const getCities = (t: any) => [
  { value: 'Beijing', label: t('cities.beijing', { defaultValue: 'Beijing' }) },
  { value: 'Shanghai', label: t('cities.shanghai', { defaultValue: 'Shanghai' }) },
  { value: "Xi'an", label: t('cities.xian', { defaultValue: "Xi'an" }) },
  { value: 'Chengdu', label: t('cities.chengdu', { defaultValue: 'Chengdu' }) },
  { value: 'Hangzhou', label: t('cities.hangzhou', { defaultValue: 'Hangzhou' }) },
  { value: 'Guilin', label: t('cities.guilin', { defaultValue: 'Guilin' }) },
]
const getRoomTypes = (t: any) => [
  { value: 'Single Room', label: t('roomTypes.single', { defaultValue: 'Single Room' }) },
  { value: 'Twin Room', label: t('roomTypes.twin', { defaultValue: 'Twin Room' }) },
  { value: 'Double Room', label: t('roomTypes.double', { defaultValue: 'Double Room' }) },
  { value: '4-bed Dorm', label: t('roomTypes.4bed', { defaultValue: '4-bed Dorm' }) },
  { value: '6-bed Dorm', label: t('roomTypes.6bed', { defaultValue: '6-bed Dorm' }) },
  { value: '8-bed Dorm', label: t('roomTypes.8bed', { defaultValue: '8-bed Dorm' }) },
]
const getTags = (t: any) => [
  { value: 'female_only', label: t('tags.femaleOnly', { defaultValue: 'Female Only' }), color: 'bg-pink-100 text-pink-700' },
  { value: 'male_only', label: t('tags.maleOnly', { defaultValue: 'Male Only' }), color: 'bg-blue-100 text-blue-700' },
  { value: 'quiet', label: t('tags.quiet', { defaultValue: 'Quiet' }), color: 'bg-green-100 text-green-700' },
  { value: 'social', label: t('tags.social', { defaultValue: 'Social' }), color: 'bg-purple-100 text-purple-700' },
  { value: 'budget', label: t('tags.budget', { defaultValue: 'Budget' }), color: 'bg-amber-100 text-amber-700' },
  { value: 'central', label: t('tags.central', { defaultValue: 'Central Location' }), color: 'bg-cyan-100 text-cyan-700' },
  { value: 'solo_traveler', label: t('tags.soloTraveler', { defaultValue: 'Solo Traveler Friendly' }), color: 'bg-rose-100 text-rose-700' },
]

export function CreateRoomShareModal({ isOpen, onClose, onSuccess }: CreateRoomShareModalProps) {
  const t = useTranslations('social')
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [formData, setFormData] = useState({
    hotelName: '',
    city: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    maxPeople: 2,
    pricePerPerson: 50,
    description: '',
    descriptionEn: ''
  })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social/room-shares`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizerId: 'guest-1', // TODO: Get from auth
          hotelName: formData.hotelName,
          city: formData.city,
          roomType: formData.roomType,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          maxPeople: formData.maxPeople,
          pricePerPerson: formData.pricePerPerson,
          description: formData.description,
          descriptionEn: formData.descriptionEn,
          tags: selectedTags
        })
      })

      if (res.ok) {
        onSuccess?.()
        onClose()
      }
    } catch (error) {
      console.error('Failed to create room share:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('findRoommate')}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Hotel Name */}
          <div>
            <Label htmlFor="hotelName">{t('hotelName')}</Label>
            <Input
              id="hotelName"
              value={formData.hotelName}
              onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
              placeholder={t('hotelNamePlaceholder')}
              required
            />
          </div>

          {/* City */}
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

          {/* Room Type */}
          <div>
            <Label htmlFor="roomType">{t('roomType')}</Label>
            <Select
              value={formData.roomType}
              onValueChange={(value) => setFormData({ ...formData, roomType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectRoomType')} />
              </SelectTrigger>
              <SelectContent>
                {getRoomTypes(t).map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Check In / Check Out */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkIn">{t('checkIn')}</Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <Label htmlFor="checkOut">{t('checkOut')}</Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
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
                max={12}
                value={formData.maxPeople}
                onChange={(e) => setFormData({ ...formData, maxPeople: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="pricePerPerson">{t('pricePerPerson')}</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="pricePerPerson"
                  type="number"
                  min={1}
                  value={formData.pricePerPerson}
                  onChange={(e) => setFormData({ ...formData, pricePerPerson: parseInt(e.target.value) })}
                  className="pl-9"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label>{t('tags')}</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {getTags(t).map((tag) => (
                <button
                  key={tag.value}
                  type="button"
                  onClick={() => toggleTag(tag.value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag.value)
                      ? tag.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('roomShareDescPlaceholder')}
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
              placeholder={t('roomShareDescEnPlaceholder')}
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('posting') : t('postRoomShare')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
