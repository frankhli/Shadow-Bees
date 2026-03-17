'use client'

import React from 'react'
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Info,
  Bath,
  ArrowUpDown,
  Languages,
  Train,
  CreditCard,
  Plane,
  Globe,
  BadgeCheck
} from 'lucide-react'

export interface HonestFacility {
  id: string
  name: string
  nameCn: string
  category: 'bathroom' | 'accessibility' | 'service' | 'location' | 'payment' | 'visa'
  available: boolean
  note?: string
  icon: string
}

export interface ForeignFriendly {
  englishSpeaking: boolean
  westernToilet: boolean
  elevator: boolean
  visaAssistance: boolean
  internationalPayment: boolean
}

interface ForeignGuestLabelsProps {
  honestFacilities?: HonestFacility[]
  foreignFriendly?: ForeignFriendly
  compact?: boolean
  showTitle?: boolean
}

/**
 * ForeignGuestLabels - 外宾诚实设施标签组件
 * 展示酒店对外国游客友好的设施和服务
 */
export function ForeignGuestLabels({ 
  honestFacilities = [], 
  foreignFriendly,
  compact = false,
  showTitle = true 
}: ForeignGuestLabelsProps) {
  
  // 图标映射
  const iconMap: Record<string, React.ReactNode> = {
    Bath: <Bath className="w-4 h-4" />,
    ArrowUpDown: <ArrowUpDown className="w-4 h-4" />,
    Languages: <Languages className="w-4 h-4" />,
    Train: <Train className="w-4 h-4" />,
    CreditCard: <CreditCard className="w-4 h-4" />,
    Plane: <Plane className="w-4 h-4" />,
    Globe: <Globe className="w-4 h-4" />,
    Shield: <Shield className="w-4 h-4" />,
  }

  // 获取图标
  const getIcon = (iconName: string) => iconMap[iconName] || <Info className="w-4 h-4" />

  // 紧凑模式 - 只显示关键标签
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {foreignFriendly?.westernToilet && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Western Toilet
          </span>
        )}
        {foreignFriendly?.elevator && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Elevator
          </span>
        )}
        {foreignFriendly?.englishSpeaking && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            English
          </span>
        )}
        {foreignFriendly?.visaAssistance && (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
            <BadgeCheck className="w-3 h-3" />
            Visa Help
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4">
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Honest Facility Checklist</h3>
            <p className="text-xs text-gray-400">What you should know before booking</p>
          </div>
        </div>
      )}

      {/* 设施列表 */}
      <div className="space-y-3">
        {honestFacilities.map((facility) => (
          <div 
            key={facility.id}
            className={`flex items-start gap-3 p-3 rounded-lg ${
              facility.available 
                ? 'bg-[#141B2D]/60' 
                : 'bg-red-50/60'
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              facility.available 
                ? 'bg-emerald-100 text-emerald-600' 
                : 'bg-red-100 text-red-500'
            }`}>
              {facility.available ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{getIcon(facility.icon)}</span>
                <span className={`font-medium ${
                  facility.available ? 'text-white' : 'text-red-600'
                }`}>
                  {facility.name}
                </span>
                <span className="text-xs text-gray-400">
                  ({facility.nameCn})
                </span>
              </div>
              
              {facility.note && (
                <p className="text-sm text-gray-400 mt-1">
                  {facility.note}
                </p>
              )}
              
              {!facility.available && !facility.note && (
                <p className="text-sm text-red-500 mt-1">
                  Not available at this property
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 外宾友好度摘要 */}
      {foreignFriendly && (
        <div className="mt-4 pt-4 border-t border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-sm text-white">Foreign Guest Friendly</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`flex items-center gap-2 text-sm ${
              foreignFriendly.westernToilet ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {foreignFriendly.westernToilet ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>Western Toilet</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              foreignFriendly.elevator ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {foreignFriendly.elevator ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>Elevator</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              foreignFriendly.englishSpeaking ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {foreignFriendly.englishSpeaking ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>English Staff</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              foreignFriendly.visaAssistance ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {foreignFriendly.visaAssistance ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              <span>Visa Help</span>
            </div>
          </div>
        </div>
      )}

      {/* 说明文字 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            We verify these details personally because we know they matter to international travelers. 
            No surprises when you arrive.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForeignGuestLabels
