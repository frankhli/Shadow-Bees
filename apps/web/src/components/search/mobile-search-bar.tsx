'use client'

import React, { useState } from 'react'
import { useRouter } from '@/navigation'
import { Search, Calendar, Users, MapPin, X, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'

interface MobileSearchBarProps {
  onSearch?: (params: {
    query: string
    checkIn: Date | null
    checkOut: Date | null
    guests: number
  }) => void
}

/**
 * MobileSearchBar - 移动端优化搜索栏组件
 * BUG-002修复：移动端搜索栏适配问题
 */
export function MobileSearchBar({ onSearch }: MobileSearchBarProps) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [activeField, setActiveField] = useState<'location' | 'dates' | 'guests' | null>(null)

  // 格式化日期显示
  const formatDateDisplay = () => {
    if (!checkIn && !checkOut) return 'Add dates'
    if (checkIn && !checkOut) return format(checkIn, 'MMM d')
    if (checkIn && checkOut) {
      return `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
    }
    return 'Add dates'
  }

  // 处理搜索
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set('q', searchQuery.trim())
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'))
    if (guests !== 2) params.set('guests', guests.toString())
    
    router.push(`/hotels?${params.toString()}`)
    setIsExpanded(false)
    onSearch?.({ query: searchQuery, checkIn, checkOut, guests })
  }

  // 收起状态 - 显示简化搜索按钮
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full bg-[#141B2D] rounded-full shadow-lg border border-gray-200 p-4 flex items-center gap-3 active:scale-95 transition-transform"
      >
        <div className="w-10 h-10 bg-[#00F0FF] rounded-full flex items-center justify-center flex-shrink-0">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-white">Where to?</p>
          <p className="text-sm text-gray-400">{formatDateDisplay()} · {guests} guests</p>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#141B2D]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Search</h2>
        <button 
          onClick={() => setIsExpanded(false)}
          className="p-2 hover:bg-[#252D4A] rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Search Fields */}
      <div className="p-4 space-y-4">
        {/* Location Field */}
        <div 
          className={`border-2 rounded-xl p-4 transition-colors ${
            activeField === 'location' ? 'border-[#00F0FF] bg-[#00F0FF]/10' : 'border-gray-200'
          }`}
          onClick={() => setActiveField('location')}
        >
          <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Where</label>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations"
              className="flex-1 outline-none bg-transparent text-white"
              autoFocus={activeField === 'location'}
            />
          </div>
        </div>

        {/* Dates Field */}
        <div 
          className={`border-2 rounded-xl p-4 transition-colors ${
            activeField === 'dates' ? 'border-[#00F0FF] bg-[#00F0FF]/10' : 'border-gray-200'
          }`}
          onClick={() => setActiveField('dates')}
        >
          <label className="block text-xs font-bold text-gray-300 uppercase mb-1">When</label>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-white">{formatDateDisplay()}</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Simple Date Picker */}
          {activeField === 'dates' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Check in</label>
                  <input
                    type="date"
                    value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Check out</label>
                  <input
                    type="date"
                    value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guests Field */}
        <div 
          className={`border-2 rounded-xl p-4 transition-colors ${
            activeField === 'guests' ? 'border-[#00F0FF] bg-[#00F0FF]/10' : 'border-gray-200'
          }`}
          onClick={() => setActiveField('guests')}
        >
          <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Who</label>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-white">{guests} guest{guests !== 1 ? 's' : ''}</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Guest Counter */}
          {activeField === 'guests' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-gray-400">Ages 13+</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setGuests(Math.max(1, guests - 1))
                    }}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
                    disabled={guests <= 1}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{guests}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setGuests(Math.min(10, guests + 1))
                    }}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                    disabled={guests >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#141B2D] border-t border-gray-200">
        <button
          onClick={handleSearch}
          className="w-full bg-[#00F0FF] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Search className="w-5 h-5" />
          Search
        </button>
      </div>
    </div>
  )
}

export default MobileSearchBar
