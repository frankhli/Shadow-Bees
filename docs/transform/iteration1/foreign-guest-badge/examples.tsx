import { useState } from 'react';
import { ForeignGuestBadge } from './ForeignGuestBadge';
import { CertificationModal, InlineCertificationInfo } from './CertificationModal';
import { Star, MapPin, Heart } from 'lucide-react';

// ============================================
// Usage Examples
// 外宾资质徽章使用示例
// ============================================

// --------------------------------------------
// Example 1: 酒店卡片 (Hotel Card)
// --------------------------------------------

interface Hotel {
  id: string;
  name: string;
  district: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  images: string[];
  certification: {
    acceptsForeignGuests: boolean;
    certificationType: 'official' | 'verified' | 'self_reported';
    policeRegistration: boolean;
  };
  facilities: {
    westernToilet: boolean;
    elevator: boolean;
    englishStaff: boolean;
  };
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <>
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* 图片区域 */}
        <div className="relative aspect-square">
          <img 
            src={hotel.images[0]} 
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          
          {/* 顶部认证徽章 - 左上角 */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {hotel.certification.acceptsForeignGuests && (
              <ForeignGuestBadge
                certification={hotel.certification}
                size="sm"
                onClick={() => setShowCertModal(true)}
              />
            )}
            {/* Superhost 徽章可以并列 */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">
              <Star className="w-3 h-3 fill-current" />
              Superhost
            </div>
          </div>
          
          {/* 收藏按钮 */}
          <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>

          {/* 底部设施标签 */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
            {hotel.facilities.westernToilet && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs rounded-full">
                Western Toilet
              </span>
            )}
            {hotel.facilities.elevator && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs rounded-full">
                Elevator
              </span>
            )}
          </div>
        </div>

        {/* 信息区域 */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="font-semibold text-gray-900">{hotel.district}, {hotel.city}</h3>
              <p className="text-sm text-gray-500">{hotel.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{hotel.rating}</span>
              <span className="text-sm text-gray-500">({hotel.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-gray-900">${hotel.pricePerNight}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
        </div>
      </div>

      {/* 资质说明弹窗 */}
      <CertificationModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        hotelName={hotel.name}
        certification={hotel.certification}
      />
    </>
  );
}

// --------------------------------------------
// Example 2: 酒店详情页 (Hotel Detail Page)
// --------------------------------------------

export function HotelDetailHeader({ hotel }: { hotel: Hotel }) {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{hotel.name}</h1>
      
      {/* 评分和徽章行 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{hotel.rating}</span>
          <a href="#reviews" className="text-gray-600 underline">{hotel.reviewCount} reviews</a>
        </div>
        
        <span className="text-gray-300">·</span>
        
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{hotel.district}, {hotel.city}</span>
        </div>
        
        <span className="text-gray-300">·</span>

        {/* 大号认证徽章 */}
        <ForeignGuestBadge
          certification={hotel.certification}
          size="lg"
          onClick={() => setShowCertModal(true)}
        />
      </div>

      <CertificationModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        hotelName={hotel.name}
        certification={hotel.certification}
      />
    </div>
  );
}

// --------------------------------------------
// Example 3: Hero区信任标识 (Hero Section Trust Badges)
// --------------------------------------------

import { Globe } from 'lucide-react';

export function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* 144小时免签标识 */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
        <Globe className="w-4 h-4" />
        <span>144-hour Visa-Free Transit</span>
      </div>

      {/* 外宾资质认证标识 */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
        <ShieldCheck className="w-4 h-4" />
        <span>Verified Foreign Guest License</span>
      </div>
    </div>
  );
}

// --------------------------------------------
// Example 4: 搜索结果列表 (Search Results List)
// --------------------------------------------

export function HotelListItem({ hotel }: { hotel: Hotel }) {
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
      {/* 缩略图 */}
      <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        
        {/* 卡片上的徽章 - 小尺寸 */}
        <div className="absolute top-2 left-2">
          <ForeignGuestBadge
            certification={hotel.certification}
            size="sm"
            onClick={() => setShowCertModal(true)}
          />
        </div>
      </div>

      {/* 信息 */}
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{hotel.name}</h3>
            <p className="text-gray-500">{hotel.district}, {hotel.city}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{hotel.rating}</span>
          </div>
        </div>

        {/* 内联资质信息（可选） */}
        <InlineCertificationInfo 
          certification={hotel.certification}
          className="max-w-sm"
        />

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold">${hotel.pricePerNight}</span>
          <span className="text-gray-500">/night</span>
        </div>
      </div>

      <CertificationModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        hotelName={hotel.name}
        certification={hotel.certification}
      />
    </div>
  );
}

// --------------------------------------------
// Example 5: 不同认证类型的展示
// --------------------------------------------

export function BadgeVariantsShowcase() {
  const certifications: Hotel['certification'][] = [
    {
      acceptsForeignGuests: true,
      certificationType: 'official',
      policeRegistration: true,
    },
    {
      acceptsForeignGuests: true,
      certificationType: 'verified',
      policeRegistration: false,
    },
    {
      acceptsForeignGuests: true,
      certificationType: 'self_reported',
      policeRegistration: false,
    },
    {
      acceptsForeignGuests: false,
      certificationType: 'self_reported',
      policeRegistration: false,
    },
  ];

  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
      <h3 className="font-semibold text-gray-900">认证类型示例</h3>
      
      <div className="flex flex-wrap gap-4">
        {certifications.map((cert, index) => (
          <ForeignGuestBadge
            key={index}
            certification={cert}
            size="md"
          />
        ))}
      </div>
      
      <p className="text-sm text-gray-500">
        注意：acceptsForeignGuests 为 false 时徽章不显示
      </p>
    </div>
  );
}
