'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { 
  MAPBOX_TOKEN, 
  MAP_STYLE, 
  POI_TYPES, 
  MARKER_COLORS,
  POPULAR_CITIES 
} from './map-config'
import { Train, Camera, UtensilsCrossed, ShoppingBag, X } from 'lucide-react'

// Set Mapbox token
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

interface POI {
  id: string
  name: string
  type: keyof typeof POI_TYPES
  coordinates: [number, number]
  distance?: string
}

interface HotelDetailMapProps {
  hotelCoordinates: [number, number]
  hotelName: string
  className?: string
  height?: string
  nearbyPOIs?: POI[]
  onPOISelect?: (poi: POI) => void
}

// Mock nearby POIs (in real app, this would come from API)
const MOCK_POIS: POI[] = [
  { id: '1', name: 'Subway Station', type: 'subway', coordinates: [0, 0], distance: '300m' },
  { id: '2', name: 'Local Restaurant', type: 'restaurant', coordinates: [0, 0], distance: '150m' },
  { id: '3', name: 'Tourist Attraction', type: 'attraction', coordinates: [0, 0], distance: '500m' },
  { id: '4', name: 'Shopping Center', type: 'shopping', coordinates: [0, 0], distance: '800m' },
]

// Get icon component for POI type
function getPOIIcon(type: keyof typeof POI_TYPES) {
  switch (type) {
    case 'subway': return Train
    case 'attraction': return Camera
    case 'restaurant': return UtensilsCrossed
    case 'shopping': return ShoppingBag
    default: return Camera
  }
}

export function HotelDetailMap({
  hotelCoordinates,
  hotelName,
  className = '',
  height = '400px',
  nearbyPOIs,
  onPOISelect
}: HotelDetailMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const hotelMarker = useRef<mapboxgl.Marker | null>(null)
  const poiMarkers = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [activePOI, setActivePOI] = useState<POI | null>(null)
  const [showPOIPanel, setShowPOIPanel] = useState(false)

  // Generate mock POIs around hotel (in real app, fetch from API)
  const generateNearbyPOIs = useCallback((): POI[] => {
    if (nearbyPOIs) return nearbyPOIs
    
    // Generate mock POIs with slight offsets from hotel
    const offsets = [
      { lng: 0.003, lat: 0.002, type: 'subway' as const },
      { lng: -0.002, lat: 0.003, type: 'restaurant' as const },
      { lng: 0.002, lat: -0.002, type: 'attraction' as const },
      { lng: -0.003, lat: -0.003, type: 'shopping' as const },
    ]
    
    return offsets.map((offset, i) => ({
      id: `poi-${i}`,
      name: `${POI_TYPES[offset.type].label} ${i + 1}`,
      type: offset.type,
      coordinates: [hotelCoordinates[0] + offset.lng, hotelCoordinates[1] + offset.lat] as [number, number],
      distance: `${(Math.random() * 800 + 100).toFixed(0)}m`
    }))
  }, [hotelCoordinates, nearbyPOIs])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: hotelCoordinates,
      zoom: 15,
      interactive: true,
    })

    map.current.on('load', () => {
      setIsLoaded(true)
    })

    // Add navigation control
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'bottom-right'
    )

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      'bottom-right'
    )

    return () => {
      hotelMarker.current?.remove()
      poiMarkers.current.forEach(m => m.remove())
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add hotel marker
  useEffect(() => {
    if (!map.current || !isLoaded) return

    // Remove existing hotel marker
    hotelMarker.current?.remove()

    // Create hotel marker element
    const el = document.createElement('div')
    el.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        background: ${MARKER_COLORS.hotel};
        border: 4px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 18px;">🏨</span>
      </div>
    `

    // Add popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="padding: 8px;">
          <div style="font-weight: bold;">${hotelName}</div>
          <div style="color: #666; font-size: 12px;">Your selected hotel</div>
        </div>
      `)

    hotelMarker.current = new mapboxgl.Marker(el)
      .setLngLat(hotelCoordinates)
      .setPopup(popup)
      .addTo(map.current)

    // Center map on hotel
    map.current.setCenter(hotelCoordinates)
  }, [hotelCoordinates, hotelName, isLoaded])

  // Add POI markers
  useEffect(() => {
    if (!map.current || !isLoaded) return

    // Clear existing POI markers
    poiMarkers.current.forEach(m => m.remove())
    poiMarkers.current = []

    const pois = generateNearbyPOIs()

    pois.forEach((poi) => {
      const config = POI_TYPES[poi.type]
      
      const el = document.createElement('div')
      el.innerHTML = `
        <div style="
          width: 32px;
          height: 32px;
          background: ${config.color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        "
          class="poi-marker"
          data-poi-id="${poi.id}"
        >
          <span style="color: white; font-size: 14px;">${getIconForType(poi.type)}</span>
        </div>
      `

      const popup = new mapboxgl.Popup({ offset: 20 })
        .setHTML(`
          <div style="padding: 8px; min-width: 150px;">
            <div style="font-weight: bold; font-size: 13px;">${poi.name}</div>
            <div style="color: ${config.color}; font-size: 11px; margin-top: 2px;">${config.label}</div>
            <div style="color: #666; font-size: 11px; margin-top: 4px;">📍 ${poi.distance} from hotel</div>
          </div>
        `)

      const marker = new mapboxgl.Marker(el)
        .setLngLat(poi.coordinates)
        .setPopup(popup)
        .addTo(map.current!)

      // Click handler
      el.addEventListener('click', () => {
        setActivePOI(poi)
        onPOISelect?.(poi)
      })

      poiMarkers.current.push(marker)
    })
  }, [isLoaded, generateNearbyPOIs, onPOISelect])

  const pois = generateNearbyPOIs()

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-lg ${className}`} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Loading map...</p>
          </div>
        </div>
      )}

      {/* POI Legend */}
      {isLoaded && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md max-w-[200px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">Nearby</span>
            <button
              onClick={() => setShowPOIPanel(!showPOIPanel)}
              className="text-xs text-blue-500 hover:text-blue-600"
            >
              {showPOIPanel ? 'Hide' : 'Show all'}
            </button>
          </div>
          
          {Object.entries(POI_TYPES).map(([type, config]) => (
            <div key={type} className="flex items-center gap-2 mb-1">
              <div 
                className="w-4 h-4 rounded-full border border-white shadow-sm flex items-center justify-center"
                style={{ backgroundColor: config.color }}
              >
                <span className="text-[8px] text-white">{getIconForType(type as keyof typeof POI_TYPES)}</span>
              </div>
              <span className="text-[10px] text-gray-600">{config.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* POI List Panel */}
      {isLoaded && showPOIPanel && (
        <div className="absolute top-4 right-4 bottom-4 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">Nearby Places</span>
            <button 
              onClick={() => setShowPOIPanel(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-48px)]">
            {pois.map((poi) => {
              const Icon = getPOIIcon(poi.type)
              const config = POI_TYPES[poi.type]
              return (
                <button
                  key={poi.id}
                  onClick={() => {
                    setActivePOI(poi)
                    map.current?.flyTo({ center: poi.coordinates, zoom: 16 })
                  }}
                  className={`w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0 transition-colors ${
                    activePOI?.id === poi.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.color + '20' }}
                    >
                      <Icon className="w-3 h-3" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{poi.name}</p>
                      <p className="text-[10px] text-gray-500">{poi.distance} from hotel</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Map attribution */}
      <div className="absolute bottom-1 right-1 text-[10px] text-gray-400 bg-white/80 px-1 rounded">
        © Mapbox
      </div>
    </div>
  )
}

// Helper to get emoji icon for POI type
function getIconForType(type: keyof typeof POI_TYPES): string {
  switch (type) {
    case 'subway': return '🚇'
    case 'attraction': return '📸'
    case 'restaurant': return '🍽️'
    case 'shopping': return '🛍️'
    default: return '📍'
  }
}
