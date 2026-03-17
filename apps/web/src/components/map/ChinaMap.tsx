'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAP_STYLE, CHINA_BOUNDS, CHINA_CENTER, CHINA_ZOOM, POPULAR_CITIES, MARKER_COLORS } from './map-config'

// Set Mapbox token
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

interface ChinaMapProps {
  className?: string
  onCitySelect?: (cityId: string) => void
  selectedCity?: string | null
  height?: string
}

export function ChinaMap({ 
  className = '', 
  onCitySelect, 
  selectedCity,
  height = '400px'
}: ChinaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [showHint, setShowHint] = useState(true)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: CHINA_CENTER,
      zoom: CHINA_ZOOM,
      maxBounds: CHINA_BOUNDS,
      minZoom: 3,
      maxZoom: 8,
      interactive: true,
      attributionControl: false,
    })

    // Disable scroll zoom for better UX in hero section
    map.current.scrollZoom.disable()

    map.current.on('load', () => {
      setIsLoaded(true)
      addCityMarkers()
    })

    // Add zoom controls
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    )

    return () => {
      markers.current.forEach(marker => marker.remove())
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Add city markers
  const addCityMarkers = useCallback(() => {
    if (!map.current) return

    // Clear existing markers
    markers.current.forEach(marker => marker.remove())
    markers.current = []

    POPULAR_CITIES.forEach((city) => {
      const isSelected = selectedCity === city.id
      
      // Create marker element
      const el = document.createElement('div')
      el.className = 'cursor-pointer transition-transform hover:scale-110'
      el.innerHTML = `
        <div style="
          width: ${isSelected ? '32px' : '24px'};
          height: ${isSelected ? '32px' : '24px'};
          background: ${isSelected ? MARKER_COLORS.selected : MARKER_COLORS.city};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${isSelected ? '14px' : '12px'};
        ">
          ${city.hotelCount}
        </div>
        <div style="
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        ">
          ${city.name}
        </div>
      `

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
        <div style="padding: 8px; text-align: center;">
          <div style="font-weight: bold; font-size: 14px;">${city.name} ${city.nameCn}</div>
          <div style="color: #666; font-size: 12px; margin-top: 4px;">${city.hotelCount} hotels</div>
          <div style="color: #3b82f6; font-size: 11px; margin-top: 4px;">Click to explore →</div>
        </div>
      `)

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(city.coordinates)
        .setPopup(popup)
      
      if (map.current) {
        marker.addTo(map.current)
      }

      // Click handler
      el.addEventListener('click', () => {
        onCitySelect?.(city.id)
        
        // Fly to city
        map.current?.flyTo({
          center: city.coordinates,
          zoom: 9,
          duration: 1500
        })
      })

      // Hover handlers
      el.addEventListener('mouseenter', () => {
        if (map.current) {
          popup.addTo(map.current)
        }
      })
      el.addEventListener('mouseleave', () => {
        popup.remove()
      })

      markers.current.push(marker)
    })
  }, [selectedCity, onCitySelect])

  // Update markers when selection changes
  useEffect(() => {
    if (isLoaded) {
      addCityMarkers()
    }
  }, [selectedCity, isLoaded, addCityMarkers])

  // Hide hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const resetView = () => {
    map.current?.flyTo({
      center: CHINA_CENTER,
      zoom: CHINA_ZOOM,
      duration: 1000
    })
    onCitySelect?.('')
  }

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

      {/* Hint overlay */}
      {isLoaded && showHint && (
        <div className="absolute top-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm text-center transition-opacity duration-500"
        >
          🗺️ Click on any city marker to explore hotels
        </div>
      )}

      {/* Reset button */}
      {isLoaded && selectedCity && (
        <button
          onClick={resetView}
          className="absolute top-4 right-4 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md hover:bg-gray-50 transition-colors"
        >
          ← Back to China view
        </button>
      )}

      {/* Legend */}
      {isLoaded && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="text-xs font-medium text-gray-600 mb-1">Popular Destinations</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-white" />
            <span className="text-xs text-gray-500">{POPULAR_CITIES.length} cities with hotels</span>
          </div>
        </div>
      )}

      {/* Map attribution */}
      <div className="absolute bottom-1 right-1 text-[10px] text-gray-400">
        © Mapbox
      </div>
    </div>
  )
}
