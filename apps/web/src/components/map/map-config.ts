// Map configuration and constants
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

// Default map style
export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12'

// Custom style for Tiaohai brand (optional upgrade)
export const MAP_STYLE_CUSTOM = 'mapbox://styles/mapbox/light-v11'

// China bounds [west, south, east, north]
export const CHINA_BOUNDS: [[number, number], [number, number]] = [
  [73.5, 18.0],  // Southwest
  [135.0, 53.5]  // Northeast
]

// Default center (China center)
export const CHINA_CENTER: [number, number] = [104.5, 35.5]

// Default zoom for China view
export const CHINA_ZOOM = 3.5

// Popular cities with coordinates
export const POPULAR_CITIES = [
  { id: 'beijing', name: 'Beijing', nameCn: '北京', coordinates: [116.4074, 39.9042] as [number, number], hotelCount: 45 },
  { id: 'shanghai', name: 'Shanghai', nameCn: '上海', coordinates: [121.4737, 31.2304] as [number, number], hotelCount: 38 },
  { id: 'xian', name: 'Xi\'an', nameCn: '西安', coordinates: [108.9398, 34.3416] as [number, number], hotelCount: 22 },
  { id: 'chengdu', name: 'Chengdu', nameCn: '成都', coordinates: [104.0668, 30.5728] as [number, number], hotelCount: 18 },
  { id: 'hangzhou', name: 'Hangzhou', nameCn: '杭州', coordinates: [120.1551, 30.2741] as [number, number], hotelCount: 15 },
  { id: 'guilin', name: 'Guilin', nameCn: '桂林', coordinates: [110.1791, 25.2344] as [number, number], hotelCount: 12 },
  { id: 'suzhou', name: 'Suzhou', nameCn: '苏州', coordinates: [120.5853, 31.2989] as [number, number], hotelCount: 10 },
  { id: 'lijiang', name: 'Lijiang', nameCn: '丽江', coordinates: [100.2330, 26.8721] as [number, number], hotelCount: 8 },
]

// POI types for nearby search
export const POI_TYPES = {
  subway: { icon: 'train', color: '#3b82f6', label: 'Subway' },
  attraction: { icon: 'camera', color: '#f59e0b', label: 'Attraction' },
  restaurant: { icon: 'utensils', color: '#ef4444', label: 'Restaurant' },
  shopping: { icon: 'shopping-bag', color: '#8b5cf6', label: 'Shopping' },
}

// Map marker colors
export const MARKER_COLORS = {
  city: '#ef4444',      // Red for cities
  hotel: '#3b82f6',     // Blue for hotels
  selected: '#10b981',  // Emerald for selected
  poi: {
    subway: '#3b82f6',
    attraction: '#f59e0b',
    restaurant: '#ef4444',
    shopping: '#8b5cf6',
  }
}

// Generate Mapbox Static Image URL for thumbnails
export function getStaticMapUrl(
  coordinates: [number, number],
  width: number = 400,
  height: number = 300,
  zoom: number = 14
): string {
  const [lng, lat] = coordinates
  const marker = `pin-l+3b82f6(${lng},${lat})`
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${marker}/${lng},${lat},${zoom},0/${width}x${height}@2x?access_token=${MAPBOX_TOKEN}`
}

// Generate smaller thumbnail URL
export function getThumbnailMapUrl(
  coordinates: [number, number],
  width: number = 200,
  height: number = 150,
  zoom: number = 13
): string {
  return getStaticMapUrl(coordinates, width, height, zoom)
}
