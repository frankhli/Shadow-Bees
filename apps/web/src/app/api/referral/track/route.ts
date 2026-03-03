import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage for demo (use Redis/DB in production)
const clickStore: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hotelId, platform, utmSource, utmMedium, utmCampaign, targetUrl } = body

    // Record the click
    const clickData = {
      id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      hotelId,
      platform,
      utmSource: utmSource || 'tiaohai',
      utmMedium: utmMedium || 'website',
      utmCampaign,
      ipAddress: request.ip || request.headers.get('x-forwarded-for'),
      userAgent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer'),
      clickedAt: new Date().toISOString(),
    }

    // Store click (in production, save to database)
    clickStore.push(clickData)
    console.log('Referral click tracked:', clickData)

    // Build tracking URL with UTM parameters
    const url = new URL(targetUrl)
    url.searchParams.set('utm_source', utmSource || 'tiaohai')
    url.searchParams.set('utm_medium', utmMedium || 'referral')
    if (utmCampaign) url.searchParams.set('utm_campaign', utmCampaign)
    url.searchParams.set('utm_content', hotelId)

    return NextResponse.json({
      success: true,
      trackingUrl: url.toString(),
      clickId: clickData.id,
    })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track click' },
      { status: 500 }
    )
  }
}

// Get stats for a hotel
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const hotelId = searchParams.get('hotelId')

  if (!hotelId) {
    return NextResponse.json(
      { success: false, error: 'Hotel ID required' },
      { status: 400 }
    )
  }

  // Filter clicks for this hotel
  const hotelClicks = clickStore.filter(c => c.hotelId === hotelId)

  // Aggregate stats
  const stats = {
    totalClicks: hotelClicks.length,
    byPlatform: {} as Record<string, number>,
    byDate: {} as Record<string, number>,
    recentClicks: hotelClicks.slice(-10),
  }

  hotelClicks.forEach(click => {
    // By platform
    stats.byPlatform[click.platform] = (stats.byPlatform[click.platform] || 0) + 1
    
    // By date
    const date = click.clickedAt.split('T')[0]
    stats.byDate[date] = (stats.byDate[date] || 0) + 1
  })

  return NextResponse.json({ success: true, stats })
}
