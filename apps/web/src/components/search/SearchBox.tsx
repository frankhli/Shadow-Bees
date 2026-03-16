'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from '@/navigation'
import { format, addDays } from 'date-fns'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  X,
  Minus,
  Plus,
  ChevronDown
} from 'lucide-react'

interface SearchBoxProps {
  variant?: 'hero' | 'sticky' | 'default'
  className?: string
  onSearch?: (params: SearchParams) => void
}

export interface SearchParams {
  location: string
  checkIn: Date | null
  checkOut: Date | null
  guests: number
}

// 设施筛选选项
export const facilityFilters = [
  { id: 'western_toilet', label: '🚽 Western Toilet', color: 'emerald' },
  { id: 'elevator', label: '🛗 Elevator', color: 'blue' },
  { id: 'english_staff', label: '🇬🇧 English Staff', color: 'purple' },
  { id: 'visa_assistance', label: '🛂 Visa Help', color: 'amber' },
  { id: 'international_payment', label: '💳 Card Payment', color: 'green' },
]

export default function SearchBox({ variant = 'default', className = '', onSearch }: SearchBoxProps) {
  const router = useRouter()
  
  // 搜索状态
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  
  // UI状态
  const [activeField, setActiveField] = useState<'location' | 'dates' | 'guests' | null>(null)
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  
  // Refs for click outside detection
  const containerRef = useRef<HTMLDivElement>(null)
  
  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveField(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // 切换设施筛选
  const toggleFacility = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId)
        ? prev.filter(id => id !== facilityId)
        : [...prev, facilityId]
    )
  }
  
  // 搜索处理
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location.trim()) params.set('q', location.trim())
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'))
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'))
    if (guests !== 2) params.set('guests', guests.toString())
    if (selectedFacilities.length > 0) params.set('facility', selectedFacilities.join(','))
    
    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests })
    } else {
      router.push(`/hotels?${params.toString()}`)
    }
    setActiveField(null)
  }
  
  // 日期选择处理
  const handleDateSelect = (type: 'checkIn' | 'checkOut', date: string) => {
    const selectedDate = date ? new Date(date) : null
    
    if (type === 'checkIn') {
      setCheckIn(selectedDate)
      // 如果新入住日期晚于当前退房日期，清除退房日期
      if (checkOut && selectedDate && checkOut <= selectedDate) {
        setCheckOut(null)
      }
    } else {
      setCheckOut(selectedDate)
    }
  }
  
  // 格式化日期显示
  const formatDateRange = () => {
    if (checkIn && checkOut) {
      return `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
    }
    if (checkIn) {
      return `${format(checkIn, 'MMM d')} - Add date`
    }
    return 'Add dates'
  }
  
  // 判断是否所有字段都已填写
  const isComplete = location && checkIn && checkOut
  
  // 变体样式
  const isHero = variant === 'hero'
  const isSticky = variant === 'sticky'
  
  return (
    <div ref={containerRef} className={`relative w-full z-[60] ${className}`}>
      {/* 主搜索框容器 */}
      <div 
        className={`
          relative overflow-hidden transition-all duration-300
          ${isHero 
            ? 'bg-gray-900 rounded-full shadow-2xl' 
            : isSticky 
              ? 'bg-white rounded-full shadow-lg border border-gray-200'
              : 'bg-white rounded-2xl shadow-xl border border-gray-200'
          }
        `}
      >
        {/* 移动端：垂直堆叠布局 */}
        <div className="flex flex-col md:flex-row md:items-stretch">
          
          {/* 目的地输入 */}
          <button
            onClick={() => setActiveField(activeField === 'location' ? null : 'location')}
            className={`
              flex-1 px-6 py-4 text-left transition-all
              ${isHero ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
              ${activeField === 'location' ? (isHero ? 'bg-gray-800' : 'bg-gray-50 shadow-inner') : ''}
              border-b md:border-b-0 md:border-r border-gray-700/30
            `}
          >
            <div className="flex items-center gap-3">
              <MapPin className={`w-5 h-5 ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
              <div className="flex-1">
                <label className={`block text-xs font-semibold uppercase tracking-wider ${isHero ? 'text-gray-400' : 'text-gray-900'}`}>
                  Where
                </label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveField('location')
                  }}
                  className={`
                    w-full bg-transparent outline-none text-sm mt-0.5
                    ${isHero 
                      ? 'text-white placeholder:text-gray-500' 
                      : 'text-gray-900 placeholder:text-gray-400'
                    }
                  `}
                />
              </div>
              {location && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setLocation('')
                  }}
                  className="p-1 rounded-full hover:bg-gray-700/50"
                >
                  <X className={`w-4 h-4 ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              )}
            </div>
          </button>
          
          {/* 日期选择 */}
          <button
            onClick={() => setActiveField(activeField === 'dates' ? null : 'dates')}
            className={`
              flex-1 px-6 py-4 text-left transition-all
              ${isHero ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
              ${activeField === 'dates' ? (isHero ? 'bg-gray-800' : 'bg-gray-50 shadow-inner') : ''}
              border-b md:border-b-0 md:border-r border-gray-700/30
            `}
          >
            <div className="flex items-center gap-3">
              <Calendar className={`w-5 h-5 ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
              <div className="flex-1">
                <label className={`block text-xs font-semibold uppercase tracking-wider ${isHero ? 'text-gray-400' : 'text-gray-900'}`}>
                  Dates
                </label>
                <span className={`text-sm mt-0.5 block ${
                  checkIn || checkOut
                    ? (isHero ? 'text-white' : 'text-gray-900')
                    : (isHero ? 'text-gray-500' : 'text-gray-400')
                }`}>
                  {formatDateRange()}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${
                activeField === 'dates' ? 'rotate-180' : ''
              } ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </button>
          
          {/* 客人数量 + 搜索按钮 */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveField(activeField === 'guests' ? null : 'guests')}
              className={`
                flex-1 px-6 py-4 text-left transition-all
                ${isHero ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                ${activeField === 'guests' ? (isHero ? 'bg-gray-800' : 'bg-gray-50 shadow-inner') : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <label className={`block text-xs font-semibold uppercase tracking-wider ${isHero ? 'text-gray-400' : 'text-gray-900'}`}>
                    Guests
                  </label>
                  <span className={`text-sm mt-0.5 block ${isHero ? 'text-white' : 'text-gray-900'}`}>
                    {guests} guest{guests > 1 ? 's' : ''}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  activeField === 'guests' ? 'rotate-180' : ''
                } ${isHero ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </button>
            
            {/* 搜索按钮 - 桌面端 */}
            <button
              onClick={handleSearch}
              className={`
                hidden md:flex items-center justify-center gap-2 mx-2
                px-8 py-3 rounded-full font-semibold text-white
                transition-all duration-200 transform hover:scale-105
                ${isComplete 
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg shadow-rose-500/30' 
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
              disabled={!isComplete}
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>
        
        {/* 移动端全宽搜索按钮 */}
        <button
          onClick={handleSearch}
          className={`
            md:hidden w-full py-4 font-semibold text-white flex items-center justify-center gap-2
            transition-all duration-200
            ${isComplete 
              ? 'bg-gradient-to-r from-rose-500 to-rose-600' 
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
          disabled={!isComplete}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
        
        {/* 设施快速筛选 - 仅在hero变体显示 */}
        {isHero && (
          <div className="hidden md:flex items-center gap-2 px-6 py-3 border-t border-gray-700/30 overflow-x-auto">
            <span className="text-xs text-gray-400 whitespace-nowrap mr-1">Must-have:</span>
            {facilityFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFacility(filter.id)}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium
                  border transition-all duration-200
                  ${selectedFacilities.includes(filter.id)
                    ? `bg-rose-500/20 border-rose-500/50 text-rose-300`
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-500'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* 日期选择弹窗 */}
      {activeField === 'dates' && (
        <div className={`
          absolute z-[100] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
          ${isHero ? 'left-0 right-0 md:left-auto md:right-0 md:w-80' : 'left-0 right-0 md:left-auto md:right-1/4 md:w-80'}
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Select Dates</h3>
              <button 
                onClick={() => setActiveField(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Check In</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => handleDateSelect('checkIn', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Check Out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                    min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => handleDateSelect('checkOut', e.target.value)}
                    disabled={!checkIn}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setCheckIn(null); setCheckOut(null); }}
                className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setActiveField(null)}
                className="flex-1 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 客人选择弹窗 */}
      {activeField === 'guests' && (
        <div className={`
          absolute z-[100] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
          ${isHero ? 'left-0 right-0 md:left-auto md:right-0 md:w-72' : 'left-0 right-0 md:left-auto md:right-0 md:w-72'}
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Guests</h3>
              <button 
                onClick={() => setActiveField(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Adults</p>
                <p className="text-sm text-gray-500">Ages 13+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors hover:border-gray-400 disabled:opacity-40 disabled:hover:border-gray-300"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(16, guests + 1))}
                  disabled={guests >= 16}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors hover:border-gray-400 disabled:opacity-40 disabled:hover:border-gray-300"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setActiveField(null)}
              className="w-full mt-4 py-3 text-sm font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* 位置建议弹窗 - 简化版 */}
      {activeField === 'location' && location && (
        <div className={`
          absolute z-[100] mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden
          left-0 right-0 md:w-80
        `}>
          <div className="p-2">
            <button
              onClick={() => {
                setLocation(location)
                setActiveField(null)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Search &quot;{location}&quot;</p>
                <p className="text-sm text-gray-500">Hotels, cities, districts</p>
              </div>
            </button>
            
            {/* 热门城市 */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Popular Cities</p>
              {['Shanghai', 'Beijing', 'Chengdu', 'Xi\'an', 'Hangzhou'].map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setLocation(city)
                    setActiveField(null)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
