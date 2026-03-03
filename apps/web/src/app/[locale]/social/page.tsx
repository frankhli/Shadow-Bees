'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  MapPin, 
  Calendar, 
  Clock,
  UserPlus,
  MessageCircle,
  BedDouble,
  PartyPopper,
  Loader2,
  Wine,
  Footprints,
  UtensilsCrossed,
  Scissors,
  CircleDot
} from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { CreateEventModal } from '@/components/create-event-modal'
import { CreateRoomShareModal } from '@/components/create-room-share-modal'

interface SocialEvent {
  id: string
  title: string
  titleEn: string | null
  type: 'PUB_CRAWL' | 'CITY_WALK' | 'FOOD_TOUR' | 'WORKSHOP' | 'OTHER'
  city: string
  meetingPoint: string
  eventDate: string
  duration: number
  maxPeople: number
  currentPeople: number
  price: number
  organizerType: string
  description: string
  descriptionEn: string | null
}

interface RoomShare {
  id: string
  hotelName: string
  city: string
  roomType: string
  checkIn: string
  checkOut: string
  pricePerPerson: number
  maxPeople: number
  currentPeople: number
  interestedPeople: number
  description: string
  descriptionEn: string | null
  tags: string[]
}

// Event type icon components mapping
const eventTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PUB_CRAWL: Wine,
  CITY_WALK: Footprints,
  FOOD_TOUR: UtensilsCrossed,
  WORKSHOP: Scissors,
  OTHER: PartyPopper,
}

const getEventTypeLabels = (t: any): Record<string, { label: string; color: string }> => ({
  PUB_CRAWL: { label: t('eventTypes.pubCrawl', { defaultValue: 'Pub Crawl' }), color: 'bg-amber-100 text-amber-800' },
  CITY_WALK: { label: t('eventTypes.cityWalk', { defaultValue: 'City Walk' }), color: 'bg-green-100 text-green-800' },
  FOOD_TOUR: { label: t('eventTypes.foodTour', { defaultValue: 'Food Tour' }), color: 'bg-red-100 text-red-800' },
  WORKSHOP: { label: t('eventTypes.workshop', { defaultValue: 'Workshop' }), color: 'bg-purple-100 text-purple-800' },
  OTHER: { label: t('eventTypes.social', { defaultValue: 'Social' }), color: 'bg-blue-100 text-blue-800' },
})

const getCities = (tCommon: any) => [
  tCommon('allCities', { defaultValue: 'All Cities' }),
  tCommon('cities.beijing', { defaultValue: 'Beijing' }),
  tCommon('cities.shanghai', { defaultValue: 'Shanghai' }),
  tCommon('cities.xian', { defaultValue: "Xi'an" }),
  tCommon('cities.chengdu', { defaultValue: 'Chengdu' }),
  tCommon('cities.hangzhou', { defaultValue: 'Hangzhou' }),
]

export default function SocialPage() {
  const t = useTranslations('social')
  const tCommon = useTranslations('common')
  const [activeTab, setActiveTab] = useState('events')
  const [selectedCity, setSelectedCity] = useState('')
  const [events, setEvents] = useState<SocialEvent[]>([])
  const [roomShares, setRoomShares] = useState<RoomShare[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showCreateRoomShare, setShowCreateRoomShare] = useState(false)

  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents()
    } else {
      fetchRoomShares()
    }
  }, [activeTab, selectedCity])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity && selectedCity !== 'All Cities') params.append('city', selectedCity)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/events?${params}`)
      const data = await res.json()
      setEvents(data)
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRoomShares = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity && selectedCity !== 'All Cities') params.append('city', selectedCity)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mock/room-shares?${params}`)
      const data = await res.json()
      setRoomShares(data)
    } catch (error) {
      console.error('Failed to fetch room shares:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinEvent = async (eventId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mock/events/${eventId}/join`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'guest-1' }) // TODO: Get from auth
        }
      )
      if (res.ok) {
        fetchEvents()
      }
    } catch (error) {
      console.error('Failed to join event:', error)
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
            <Link href="/experiences" className="text-sm text-muted-foreground hover:text-foreground">
              {t('nav.experiences')}
            </Link>
            <Link href="/social" className="text-sm font-medium">
              {t('nav.social')}
            </Link>
            <LanguageSwitcher />
            <Button size="sm">{t('nav.listProperty')}</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <PartyPopper className="w-4 h-4" />
                {t('tab.events')}
              </TabsTrigger>
              <TabsTrigger value="roommates" className="flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                {t('tab.roommates')}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-background"
          >
            {getCities(tCommon).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : activeTab === 'events' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">{t('noEvents')}</p>
              </div>
            ) : events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`p-4 ${getEventTypeLabels(t)[event.type]?.color || 'bg-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    {(() => {
                      const IconComponent = eventTypeIcons[event.type] || MapPin
                      return <IconComponent className="w-8 h-8" />
                    })()}
                    <Badge variant="outline" className="bg-white/50">
                      {getEventTypeLabels(t)[event.type]?.label || event.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-2">{event.titleEn || event.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {event.city}
                    <span className="mx-1">·</span>
                    {event.meetingPoint}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.eventDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(event.duration)}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {event.descriptionEn || event.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {event.currentPeople}/{event.maxPeople} {t('people')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">
                        {event.price === 0 ? t('free') : `$${event.price}`}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => handleJoinEvent(event.id)}
                        disabled={event.currentPeople >= event.maxPeople}
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        {event.currentPeople >= event.maxPeople ? t('full') : t('join')}
                      </Button>
                    </div>
                  </div>

                  {event.organizerType === 'guide' && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Badge className="bg-cyan-100 text-cyan-700">
                        {t('guideLed')}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomShares.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">{t('noRoomShares')}</p>
              </div>
            ) : roomShares.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-2 bg-rose-100 text-rose-700">
                        {t('roomShare')}
                      </Badge>
                      <h3 className="font-semibold text-lg">{room.hotelName}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">${room.pricePerPerson}</span>
                      <p className="text-xs text-muted-foreground">{t('perNight')}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {room.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(room.checkIn).toLocaleDateString()} - {new Date(room.checkOut).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4" />
                      {room.roomType}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {room.descriptionEn || room.description}
                  </p>

                  {room.tags && room.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      <span className="font-medium">{room.currentPeople}/{room.maxPeople}</span>
                      <p className="text-muted-foreground">{t('spotsLeft')}</p>
                      {room.interestedPeople > 0 && (
                        <p className="text-xs text-amber-600">{room.interestedPeople} interested</p>
                      )}
                    </div>
                    <Button size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {t('connect')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Button */}
        <div className="fixed bottom-8 right-8">
          <Button 
            size="lg" 
            className="shadow-lg"
            onClick={() => activeTab === 'events' ? setShowCreateEvent(true) : setShowCreateRoomShare(true)}
          >
            {activeTab === 'events' ? t('createEvent') : t('findRoommate')}
          </Button>
        </div>

        {/* Modals */}
        <CreateEventModal
          isOpen={showCreateEvent}
          onClose={() => setShowCreateEvent(false)}
          onSuccess={fetchEvents}
        />
        <CreateRoomShareModal
          isOpen={showCreateRoomShare}
          onClose={() => setShowCreateRoomShare(false)}
          onSuccess={fetchRoomShares}
        />
      </main>
    </div>
  )
}
