'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Clock, Check, X } from 'lucide-react'

interface AvailabilitySlot {
  date: string
  available: boolean
  bookedSlots: string[]
  note?: string
}

const timeSlots = [
  '08:00-10:00',
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function GuideSchedulePage() {
  const t = useTranslations('guideDashboard')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [availability, setAvailability] = useState<Record<string, AvailabilitySlot>>({})
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    fetchAvailability()
  }, [currentDate])

  const fetchAvailability = async () => {
    try {
      const monthStr = currentDate.toISOString().slice(0, 7)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mock/guides/guide-1/availability?month=${monthStr}`
      )
      const data = await res.json()
      const availabilityMap: Record<string, AvailabilitySlot> = {}
      data.forEach((item: any) => {
        availabilityMap[item.date] = item.slots
      })
      setAvailability(availabilityMap)
    } catch (error) {
      console.error('Failed to fetch availability:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleDateAvailability = async (dateStr: string) => {
    const currentSlot = availability[dateStr]
    const newAvailable = !currentSlot?.available
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mock/guides/guide-1/availability`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            availability: {
              [dateStr]: {
                available: newAvailable,
                bookedSlots: currentSlot?.bookedSlots || [],
              },
            },
          }),
        }
      )
      if (res.ok) {
        setAvailability({
          ...availability,
          [dateStr]: {
            ...currentSlot,
            date: dateStr,
            available: newAvailable,
          },
        })
      }
    } catch (error) {
      console.error('Failed to update availability:', error)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('scheduleTitle')}</h1>
          <p className="text-gray-500">{t('scheduleSubtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-lg font-medium min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300" />
          <span>{t('available')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
          <span>{t('unavailable')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300" />
          <span>{t('hasBooking')}</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }
              
              const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
              const slot = availability[dateStr]
              const isAvailable = slot?.available
              const hasBookings = slot?.bookedSlots?.length > 0
              const isSelected = selectedDate === dateStr
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square rounded-lg border-2 p-2 flex flex-col items-start justify-between transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-50'
                      : isAvailable
                      ? 'border-green-300 bg-green-50 hover:bg-green-100'
                      : hasBookings
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-cyan-700' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  {hasBookings && (
                    <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                      {slot.bookedSlots.length} {t('bookings')}
                    </Badge>
                  )}
                  {isAvailable && !hasBookings && (
                    <Check className="w-4 h-4 text-green-600 self-end" />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedDate}</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={availability[selectedDate]?.available ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleDateAvailability(selectedDate)}
                >
                  {availability[selectedDate]?.available ? (
                    <><X className="w-4 h-4 mr-1" /> {t('markUnavailable')}</>
                  ) : (
                    <><Check className="w-4 h-4 mr-1" /> {t('markAvailable')}</>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">{t('timeSlots')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((timeSlot) => {
                    const isBooked = availability[selectedDate]?.bookedSlots?.includes(timeSlot)
                    return (
                      <div
                        key={timeSlot}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${
                          isBooked
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {timeSlot}
                        {isBooked && <Badge className="text-xs bg-blue-500">{t('booked')}</Badge>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline">{t('blockDates')}</Button>
          <Button variant="outline">{t('setRecurring')}</Button>
          <Button variant="outline">{t('importCalendar')}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
