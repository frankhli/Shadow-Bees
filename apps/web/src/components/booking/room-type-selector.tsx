'use client'

import React, { useState } from 'react'
import { Users, Bed, Bath, Wifi, Check, ChevronRight, Info } from 'lucide-react'
import { PriceDisplay } from './price-calculator'

export interface RoomType {
  id: string
  name: string
  description: string
  maxGuests: number
  bedType: string
  size?: string
  amenities: string[]
  images?: string[]
  pricePerNight: number
  currency: string
  availableRooms: number
  cancellationPolicy: string
  breakfastIncluded?: boolean
}

interface RoomTypeSelectorProps {
  roomTypes: RoomType[]
  selectedRoomId?: string
  nights?: number
  guests?: number
  onSelect?: (room: RoomType) => void
  onContinue?: () => void
  className?: string
}

/**
 * RoomTypeSelector - 房型选择器组件
 * BUG-007修复：房型选择器优化
 * 
 * 优化点：
 * 1. 清晰的房型对比
 * 2. 可用性实时显示
 * 3. 设施图标展示
 * 4. 价格明细
 */
export function RoomTypeSelector({
  roomTypes,
  selectedRoomId,
  nights = 1,
  guests = 2,
  onSelect,
  onContinue,
  className = '',
}: RoomTypeSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(selectedRoomId || null)
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null)

  const handleSelect = (room: RoomType) => {
    setSelectedId(room.id)
    onSelect?.(room)
  }

  const selectedRoom = roomTypes.find(r => r.id === selectedId)

  // 获取设施图标
  const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'wifi': <Wifi className="w-4 h-4" />,
      'bathroom': <Bath className="w-4 h-4" />,
      'bed': <Bed className="w-4 h-4" />,
    }
    return iconMap[amenity.toLowerCase()] || <Check className="w-4 h-4" />
  }

  if (roomTypes.length === 0) {
    return (
      <div className={`p-8 text-center text-gray-400 ${className}`}>
        No room types available for the selected dates.
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Select Room Type</h3>
        <p className="text-sm text-gray-400">
          {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {roomTypes.map((room) => {
          const isSelected = selectedId === room.id
          const isExpanded = expandedRoom === room.id
          const isLowAvailability = room.availableRooms <= 2 && room.availableRooms > 0
          const isUnavailable = room.availableRooms === 0

          return (
            <div
              key={room.id}
              className={`
                border-2 rounded-xl overflow-hidden transition-all
                ${isSelected 
                  ? 'border-[#00F0FF] bg-[#00F0FF]/10' 
                  : isUnavailable 
                    ? 'border-gray-200 opacity-60' 
                    : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {/* 主要内容 */}
              <div className="p-4">
                <div className="flex gap-4">
                  {/* 房型图片占位 */}
                  <div className="w-24 h-24 bg-[#2D3655] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <Bed className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* 房型信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-white">{room.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{room.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-bold text-white">
                          <PriceDisplay amount={room.pricePerNight} currency={room.currency} />
                        </div>
                        <p className="text-xs text-gray-400">per night</p>
                      </div>
                    </div>

                    {/* 基本信息 */}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /
                        Up to {room.maxGuests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" /
                        {room.bedType}
                      </span>
                    </div>

                    {/* 可用性提示 */}
                    <div className="mt-2">
                      {isUnavailable ? (
                        <span className="inline-flex items-center px-2 py-1 bg-[#252D4A] text-gray-400 text-xs rounded-full">
                          Sold out
                        </span>
                      ) : isLowAvailability ? (
                        <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                          Only {room.availableRooms} left
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {room.availableRooms} available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 设施标签 */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span 
                      key={amenity}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#252D4A] text-gray-300 text-xs rounded-md"
                    >
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleSelect(room)}
                    disabled={isUnavailable}
                    className={`
                      flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors
                      ${isSelected
                        ? 'bg-[#00F0FF] text-white'
                        : isUnavailable
                          ? 'bg-[#252D4A] text-gray-400 cursor-not-allowed'
                          : 'border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10'
                      }
                    `}
                  >
                    {isSelected ? (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /
                        Selected
                      </span>
                    ) : isUnavailable ? (
                      'Not available'
                    ) : (
                      'Select'
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
                    className="p-2.5 text-gray-400 hover:bg-[#252D4A] rounded-lg transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 展开详情 */}
              <div className={`bg-[#1E2746] transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                <div className="p-4 border-t border-gray-200">
                  <h5 className="font-medium mb-2">Room Details</h5>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Room size</span>
                      <span>{room.size || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bed type</span>
                      <span>{room.bedType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max guests</span>
                      <span>{room.maxGuests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cancellation</span>
                      <span className={room.cancellationPolicy.includes('Free') ? 'text-green-600' : ''}>
                        {room.cancellationPolicy}
                      </span>
                    </div>
                    {room.breakfastIncluded && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Breakfast</span>
                        <span className="text-green-600">Included</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <h6 className="font-medium mb-2">All Amenities</h6>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span 
                          key={amenity}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-[#141B2D] border border-gray-200 text-gray-300 text-xs rounded-md"
                        >
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total for {nights} nights</span>
                      <span className="text-xl font-bold">
                        <PriceDisplay amount={room.pricePerNight * nights} currency={room.currency} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 继续按钮 */}
      <div className="mt-6">
        <button
          onClick={onContinue}
          disabled={!selectedRoom}
          className="w-full py-4 bg-[#00F0FF] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00D0DD] transition-colors"
        >
          {selectedRoom ? (
            <>
              Continue with {selectedRoom.name}
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            'Select a room to continue'
          )}
        </button>
      </div>
    </div>
  )
}

export default RoomTypeSelector
