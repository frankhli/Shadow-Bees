'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, MAP_STYLE } from './map-config'

// Set Mapbox token
if (typeof window !== 'undefined') {
  mapboxgl.accessToken = MAPBOX_TOKEN
}

interface MapContainerProps {
  center?: [number, number]
  zoom?: number
  className?: string
  children?: React.ReactNode
  onMapLoad?: (map: mapboxgl.Map) => void
  interactive?: boolean
}

export function MapContainer({
  center = [116.4074, 39.9042],
  zoom = 12,
  className = '',
  children,
  onMapLoad,
  interactive = true
}: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center,
      zoom,
      interactive,
      attributionControl: true,
    })

    map.current.on('load', () => {
      setIsLoaded(true)
      onMapLoad?.(map.current!)
    })

    // Add navigation control
    if (interactive) {
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'bottom-right'
      )
    }

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Update center when props change
  useEffect(() => {
    if (map.current && isLoaded) {
      map.current.setCenter(center)
      map.current.setZoom(zoom)
    }
  }, [center, zoom, isLoaded])

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
      {isLoaded && children}
    </div>
  )
}

// Hook to access map instance
export function useMap() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  return mapRef
}
