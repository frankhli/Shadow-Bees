'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface BookingButtonsProps {
  hotel: {
    id: string
    city: string
  }
}

export function BookingButtons({ hotel }: BookingButtonsProps) {
  const t = useTranslations()
  const [tracking, setTracking] = useState<string | null>(null)

  const handleBookingClick = async (platform: 'booking' | 'airbnb') => {
    setTracking(platform)
    
    const targetUrls = {
      booking: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.city)}`,
      airbnb: `https://www.airbnb.com/s/${encodeURIComponent(hotel.city)}/homes`,
    }

    try {
      // Track the click
      const response = await fetch('/api/referral/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId: hotel.id,
          platform,
          utmSource: 'tiaohai',
          utmMedium: 'website',
          utmCampaign: 'hotel_detail',
          targetUrl: targetUrls[platform],
        }),
      })
      
      const data = await response.json()
      
      // Open tracking URL
      if (data.trackingUrl) {
        window.open(data.trackingUrl, '_blank')
      }
    } catch (error) {
      console.error('Tracking failed:', error)
      // Fallback: open original URL
      window.open(targetUrls[platform], '_blank')
    }
    
    setTracking(null)
  }

  return (
    <div className="space-y-3">
      <Button 
        className="w-full" 
        size="lg"
        onClick={() => handleBookingClick('booking')}
        disabled={tracking === 'booking'}
      >
        {tracking === 'booking' ? t('booking.opening') : t('hotel.price.bookingLink')}
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => handleBookingClick('airbnb')}
        disabled={tracking === 'airbnb'}
      >
        {tracking === 'airbnb' ? t('booking.opening') : t('hotel.price.airbnbLink')}
        <ExternalLink className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
