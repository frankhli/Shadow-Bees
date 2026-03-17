'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { getThumbnailMapUrl } from './map-config'

interface HotelMapThumbnailProps {
  coordinates: [number, number]
  name?: string
  className?: string
  width?: number
  height?: number
  zoom?: number
  onClick?: () => void
  showLabel?: boolean
}

export function HotelMapThumbnail({
  coordinates,
  name,
  className = '',
  width = 200,
  height = 150,
  zoom = 13,
  onClick,
  showLabel = true
}: HotelMapThumbnailProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Generate static map URL
  const mapUrl = getThumbnailMapUrl(coordinates, width, height, zoom)

  // Fallback placeholder when map fails
  if (imageError) {
    return (
      <div 
        className={`relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center ${className}`}
        style={{ width, height }}
        onClick={onClick}
      >
        <div className="text-center p-2">
          <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-1" />
          {showLabel && name && (
            <p className="text-xs text-blue-600 font-medium truncate max-w-[120px]">{name}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`relative rounded-lg overflow-hidden ${onClick ? 'cursor-pointer hover:opacity-90' : ''} ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <MapPin className="w-5 h-5 text-gray-300" />
        </div>
      )}
      
      {/* Static map image */}
      <Image
        src={mapUrl}
        alt={name ? `Map showing location of ${name}` : 'Hotel location map'}
        fill
        className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes={`${width}px`}
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
        unoptimized // Mapbox URLs are dynamic
      />
      
      {/* Location indicator overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-500" />
        </div>
      </div>
      
      {/* Label overlay */}
      {showLabel && name && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium truncate">{name}</span>
          </div>
        </div>
      )}
      
      {/* Hover overlay with view text */}
      {onClick && (
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded">
            View on map
          </span>
        </div>
      )}
    </div>
  )
}

// Smaller variant for compact card layouts
export function HotelMapThumbnailCompact({
  coordinates,
  className = '',
  onClick
}: Omit<HotelMapThumbnailProps, 'width' | 'height' | 'zoom' | 'showLabel' | 'name'>) {
  return (
    <HotelMapThumbnail
      coordinates={coordinates}
      width={120}
      height={80}
      zoom={14}
      showLabel={false}
      className={className}
      onClick={onClick}
    />
  )
}
