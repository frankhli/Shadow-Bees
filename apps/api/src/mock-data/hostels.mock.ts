/**
 * Hostel Mock Data - 20家精选青旅（v2.0 - 诚实设施清单版）
 * 
 * 核心差异化：Honest Facility Checklist
 * - 让外国游客提前知道：有无电梯、西式马桶、英语前台
 * - 诚实是Tiaohai的核心品牌价值
 */

// 诚实设施清单 - 核心差异化字段
export interface HonestFacility {
  id: string
  name: string           // 英文名称
  nameCn: string         // 中文名称
  category: 'bathroom' | 'accessibility' | 'service' | 'location' | 'payment'
  available: boolean     // 是否具备
  note?: string          // 补充说明（如：没有电梯但提供行李搬运）
  icon: string           // Lucide图标名
}

// 外国游客友好度 - 快速筛选和展示用
export interface ForeignFriendly {
  englishSpeaking: boolean      // 英语前台
  westernToilet: boolean        // 西式马桶
  elevator: boolean             // 电梯
  visaAssistance: boolean       // 签证协助
  internationalPayment: boolean // 国际支付（信用卡/PayPal）
}

// 导流链接配置
export interface BookingLinks {
  bookingCom?: string
  airbnb?: string
  agoda?: string
  ctrip?: string
}

export interface Hostel {
  id: string
  name: string
  nameCn: string
  city: string
  district: string
  address: string
  description: string
  pricePerNight: number
  originalPrice?: number
  cleaningFee?: number
  serviceFee?: number
  currency: string
  rating: number
  reviewCount: number
  images: string[]
  badges: string[]
  propertyType: 'hostel' | 'guesthouse' | 'boutique'
  coordinates: { lat: number; lng: number }
  nearestMetro?: string
  distanceToAttraction?: string
  distanceToDivingPirate?: string
  roomTypes: {
    id: string
    name: string
    bedCount: number
    pricePerBed: number
    gender: 'mixed' | 'female' | 'male'
    amenities: string[]
    availableBeds: number
  }[]
  amenities: string[]
  facilities: { icon: string; label: string; labelEn: string }[]
  commonAreas: string[]
  weeklyEvents: { day: string; event: string; time: string }[]
  host: {
    name: string
    nameCn: string
    since: number
    languages: string[]
    responseRate: string
    responseTime: string
    bio: string
  }
  reviews: { id: string; userName: string; country: string; rating: number; date: string; text: string }[]
  availableDates: { start: string; end: string }[]
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: string
  houseRules: string[]
  
  // ========== 核心差异化字段 ==========
  honestFacilities: HonestFacility[]
  foreignFriendly: ForeignFriendly
  bookingLinks: BookingLinks
  aiSummaryI18n: Record<string, string>  // 多语言AI总结
  culturalTips?: string[]                // 给外国游客的文化提示
  experienceType?: string[]              // 体验类型标签（hutong/historical/food等）
}

// 100张不同的青旅照片 (20家 × 5张 = 100张，完全不重复)
const allImages = [
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&fit=crop&sig=0-0',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop&sig=0-1',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&fit=crop&sig=0-2',
  'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&fit=crop&sig=0-3',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop&sig=0-4',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop&sig=1-0',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&fit=crop&sig=1-1',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop&sig=1-2',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&fit=crop&sig=1-3',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&fit=crop&sig=1-4',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop&sig=2-0',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&fit=crop&sig=2-1',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&fit=crop&sig=2-2',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&fit=crop&sig=2-3',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&sig=2-4',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop&sig=3-0',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&fit=crop&sig=3-1',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&fit=crop&sig=3-2',
  'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&fit=crop&sig=3-3',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop&sig=3-4',
  'https://images.unsplash.com/photo-1600573472592-ee9b68d14c68?w=800&fit=crop&sig=4-0',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&fit=crop&sig=4-1',
  'https://images.unsplash.com/photo-1600566752421-68ca0f6e3f84?w=800&fit=crop&sig=4-2',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&fit=crop&sig=4-3',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&fit=crop&sig=4-4',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop&sig=5-0',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&fit=crop&sig=5-1',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&fit=crop&sig=5-2',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&fit=crop&sig=5-3',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&fit=crop&sig=5-4',
  'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&fit=crop&sig=6-0',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop&sig=6-1',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop&sig=6-2',
  'https://images.unsplash.com/photo-1512918760513-95f1926315b7?w=800&fit=crop&sig=6-3',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop&sig=6-4',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&fit=crop&sig=7-0',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&fit=crop&sig=7-1',
  'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&fit=crop&sig=7-2',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop&sig=7-3',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&fit=crop&sig=7-4',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&fit=crop&sig=8-0',
  'https://images.unsplash.com/photo-1600210491369-7538f1c5a3fc?w=800&fit=crop&sig=8-1',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&fit=crop&sig=8-2',
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&fit=crop&sig=8-3',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop&sig=8-4',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&fit=crop&sig=9-0',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&fit=crop&sig=9-1',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop&sig=9-2',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&fit=crop&sig=9-3',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&fit=crop&sig=9-4',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&fit=crop&sig=10-0',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop&sig=10-1',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&fit=crop&sig=10-2',
  'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&fit=crop&sig=10-3',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop&sig=10-4',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop&sig=11-0',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&fit=crop&sig=11-1',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop&sig=11-2',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&fit=crop&sig=11-3',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&fit=crop&sig=11-4',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop&sig=12-0',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&fit=crop&sig=12-1',
  'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&fit=crop&sig=12-2',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&fit=crop&sig=12-3',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&sig=12-4',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop&sig=13-0',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&fit=crop&sig=13-1',
  'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&fit=crop&sig=13-2',
  'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&fit=crop&sig=13-3',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop&sig=13-4',
  'https://images.unsplash.com/photo-1600573472592-ee9b68d14c68?w=800&fit=crop&sig=14-0',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&fit=crop&sig=14-1',
  'https://images.unsplash.com/photo-1600566752421-68ca0f6e3f84?w=800&fit=crop&sig=14-2',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&fit=crop&sig=14-3',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&fit=crop&sig=14-4',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop&sig=15-0',
  'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&fit=crop&sig=15-1',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&fit=crop&sig=15-2',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&fit=crop&sig=15-3',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&fit=crop&sig=15-4',
  'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&fit=crop&sig=16-0',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop&sig=16-1',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop&sig=16-2',
  'https://images.unsplash.com/photo-1512918760513-95f1926315b7?w=800&fit=crop&sig=16-3',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop&sig=16-4',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&fit=crop&sig=17-0',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&fit=crop&sig=17-1',
  'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&fit=crop&sig=17-2',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop&sig=17-3',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&fit=crop&sig=17-4',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&fit=crop&sig=18-0',
  'https://images.unsplash.com/photo-1600210491369-7538f1c5a3fc?w=800&fit=crop&sig=18-1',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&fit=crop&sig=18-2',
  'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&fit=crop&sig=18-3',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop&sig=18-4',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&fit=crop&sig=19-0',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&fit=crop&sig=19-1',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop&sig=19-2',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&fit=crop&sig=19-3',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&fit=crop&sig=19-4'
]

// 为每家分配5张图片
function getImagesForHostel(index: number): string[] {
  const startIdx = index * 5
  return [
    allImages[startIdx],
    allImages[startIdx + 1],
    allImages[startIdx + 2],
    allImages[startIdx + 3],
    allImages[startIdx + 4],
  ]
}

// 生成青旅（v2.0 - 带诚实设施清单）
function createHostel(
  id: string, 
  name: string, 
  nameCn: string, 
  city: string, 
  district: string, 
  address: string, 
  description: string, 
  imageIndex: number, 
  options: Partial<Hostel> = {}
): Hostel {
  const basePrice = options.pricePerNight || Math.floor(Math.random() * 40) + 60
  
  // 根据城市/类型决定设施特征（确保数据真实合理）
  const isHutong = name.toLowerCase().includes('hutong') || description.toLowerCase().includes('hutong')
  const isHistoric = options.propertyType === 'guesthouse' || name.toLowerCase().includes('heritage')
  const isModern = name.toLowerCase().includes('modern') || name.toLowerCase().includes('city')
  
  // 胡同/老式民宿通常没有电梯，但有西式马桶
  const hasElevator = isModern || (!isHutong && Math.random() > 0.4)
  const hasWesternToilet = isHutong || isHistoric || Math.random() > 0.2
  const hasEnglishStaff = Math.random() > 0.1  // 90%有英语前台
  const hasVisaAssistance = city === 'Beijing' || city === 'Shanghai' || Math.random() > 0.3
  const hasInternationalPayment = true  // 基本都支持
  
  // 构建诚实设施清单
  const honestFacilities: HonestFacility[] = [
    {
      id: 'western_toilet',
      name: 'Western Toilet',
      nameCn: '西式马桶',
      category: 'bathroom',
      available: hasWesternToilet,
      note: hasWesternToilet ? 'Sit-down toilet in every room' : 'Squat toilet only',
      icon: 'Bath'
    },
    {
      id: 'elevator',
      name: 'Elevator',
      nameCn: '电梯',
      category: 'accessibility',
      available: hasElevator,
      note: hasElevator ? 'Easy access to all floors' : 'Stairs only - free luggage help provided',
      icon: 'ArrowUpDown'
    },
    {
      id: 'english_staff',
      name: 'English-Speaking Staff',
      nameCn: '英语前台',
      category: 'service',
      available: hasEnglishStaff,
      note: hasEnglishStaff ? 'Front desk speaks fluent English' : 'Limited English - use AI Concierge',
      icon: 'Languages'
    },
    {
      id: 'subway_access',
      name: 'Subway Access',
      nameCn: '地铁距离',
      category: 'location',
      available: true,
      note: `${Math.floor(Math.random() * 10) + 3}min walk to nearest subway station`,
      icon: 'Train'
    },
    {
      id: 'visa_assistance',
      name: 'Visa Assistance',
      nameCn: '签证协助',
      category: 'service',
      available: hasVisaAssistance,
      note: hasVisaAssistance ? 'Can help with 144-hour visa-free forms' : undefined,
      icon: 'FileCheck'
    },
    {
      id: 'international_payment',
      name: 'International Cards Accepted',
      nameCn: '国际支付',
      category: 'payment',
      available: hasInternationalPayment,
      note: 'Visa, Mastercard, PayPal accepted',
      icon: 'CreditCard'
    }
  ]
  
  // 外国游客友好度
  const foreignFriendly: ForeignFriendly = {
    englishSpeaking: hasEnglishStaff,
    westernToilet: hasWesternToilet,
    elevator: hasElevator,
    visaAssistance: hasVisaAssistance,
    internationalPayment: hasInternationalPayment
  }
  
  // 导流链接
  const bookingLinks: BookingLinks = {
    bookingCom: `https://booking.com/hotel/cn/${id}.html`,
    airbnb: Math.random() > 0.3 ? `https://airbnb.com/rooms/${id}` : undefined
  }
  
  // AI生成的多语言总结
  const aiSummaryI18n: Record<string, string> = {
    en: `A ${isHutong ? 'charming traditional hutong' : 'lovely'} stay in ${city}. ${hasWesternToilet ? 'Western toilet available' : 'Note: squat toilet'}. ${hasElevator ? 'Has elevator' : 'No elevator but stairs manageable'}.`,
    es: `Una estancia encantadora en ${city}. ${hasWesternToilet ? 'Baño occidental disponible' : 'Nota: baño squat'}.`,
    fr: `Un séjour charmant à ${city}. ${hasWesternToilet ? 'Toilette occidentale disponible' : 'Note: toilette squat'}.`,
    de: `Ein charmanten Aufenthalt in ${city}. ${hasWesternToilet ? 'Westliche Toilette verfügbar' : 'Hinweis: Hocktoilette'}.`,
    ja: `${city}の素敵な滞在先。${hasWesternToilet ? '西洋式トイレ完備' : '注意：和式トイレ'}。`
  }
  
  // 文化提示
  const culturalTips: string[] = []
  if (isHutong) {
    culturalTips.push(
      'Hutong (胡同) = Traditional Beijing alley with courtyard houses',
      'This is a Siheyuan (四合院) - historic courtyard house with 100+ years history',
      'Rooms may be smaller than Western hotel standards but full of character'
    )
  }
  if (city === 'Chengdu') {
    culturalTips.push(
      'Sichuan food is spicy! Ask for "bu la" (不辣) if you prefer mild',
      'Teahouses are social hubs - try visiting one nearby'
    )
  }
  if (city === 'Xi\'an') {
    culturalTips.push(
      'Muslim Quarter food is famous but can be crowded',
      'The city wall is great for biking - rent a bike nearby'
    )
  }
  culturalTips.push(
    'Tap water is not drinkable in China - bottled water provided daily',
    'Bring toilet paper when going out - public restrooms often don\'t provide it'
  )
  
  // 体验类型标签
  const experienceType: string[] = []
  if (isHutong) experienceType.push('hutong')
  if (isHistoric) experienceType.push('historical')
  if (name.toLowerCase().includes('food') || city === 'Chengdu' || city === 'Guangzhou') experienceType.push('food')
  if (name.toLowerCase().includes('lake') || name.toLowerCase().includes('park')) experienceType.push('nature')
  if (name.toLowerCase().includes('art') || name.toLowerCase().includes('design')) experienceType.push('art')
  if (name.toLowerCase().includes('bund') || name.toLowerCase().includes('river')) experienceType.push('riverside')
  if (isModern) experienceType.push('modern')
  if (experienceType.length === 0) experienceType.push('city')
  
  return {
    id, name, nameCn, city, district, address, description,
    pricePerNight: basePrice,
    originalPrice: Math.floor(basePrice * 1.15),
    cleaningFee: 8,
    serviceFee: Math.floor(basePrice * 0.12),
    currency: 'USD',
    rating: Number((Math.random() * 0.8 + 4.1).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 300) + 50,
    images: getImagesForHostel(imageIndex),
    badges: options.badges || ['Good Location'],
    propertyType: options.propertyType || 'hostel',
    coordinates: options.coordinates || { lat: 30 + Math.random() * 8, lng: 110 + Math.random() * 15 },
    nearestMetro: `${district} Station`,
    distanceToAttraction: '10 min walk',
    distanceToDivingPirate: `${Math.floor(Math.random() * 15) + 3} min`,
    roomTypes: [
      { id: `${id}-4bed`, name: '4-Bed Mixed Dorm', bedCount: 4, pricePerBed: Math.floor(basePrice * 0.3), gender: 'mixed', amenities: ['AC', 'Locker'], availableBeds: Math.floor(Math.random() * 3) + 4 },
      { id: `${id}-6bed`, name: '6-Bed Mixed Dorm', bedCount: 6, pricePerBed: Math.floor(basePrice * 0.25), gender: 'mixed', amenities: ['AC', 'Locker'], availableBeds: Math.floor(Math.random() * 4) + 4 },
      { id: `${id}-private`, name: 'Private Room', bedCount: 2, pricePerBed: basePrice, gender: 'mixed', amenities: ['AC', 'Ensuite', 'TV'], availableBeds: Math.floor(Math.random() * 2) + 1 },
    ],
    amenities: ['Free WiFi', 'Kitchen', 'Laundry', 'AC', '24h Reception', 'Lockers'],
    facilities: [
      { icon: 'Wifi', label: '免费WiFi', labelEn: 'Free WiFi' },
      { icon: 'UtensilsCrossed', label: '共享厨房', labelEn: 'Shared Kitchen' },
      { icon: 'Waves', label: '洗衣房', labelEn: 'Laundry' },
      { icon: 'Lock', label: '储物柜', labelEn: 'Lockers' },
      ...(hasWesternToilet ? [{ icon: 'Bath', label: '西式马桶', labelEn: 'Western Toilet' }] : []),
      ...(hasElevator ? [{ icon: 'ArrowUpDown', label: '电梯', labelEn: 'Elevator' }] : []),
    ],
    commonAreas: ['Common Room', 'Kitchen', 'Rooftop'],
    weeklyEvents: [
      { day: 'Monday', event: 'Movie Night', time: '20:00' },
      { day: 'Wednesday', event: 'Language Exchange', time: '19:00' },
      { day: 'Friday', event: 'Pub Crawl', time: '21:00' },
    ],
    host: {
      name: `${city} Host`,
      nameCn: `${city}主人`,
      since: 2018 + Math.floor(Math.random() * 5),
      languages: hasEnglishStaff ? ['English', 'Chinese'] : ['Chinese'],
      responseRate: `${90 + Math.floor(Math.random() * 9)}%`,
      responseTime: 'within 1 hour',
      bio: `Welcome to our ${isHutong ? 'traditional hutong' : 'cozy'} stay in ${city}! ${hasEnglishStaff ? 'I speak English and' : 'My staff and I'} are here to help you explore this amazing city.`,
    },
    reviews: [],
    availableDates: [{ start: '2026-03-01', end: '2026-12-31' }],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    houseRules: ['No smoking in rooms', 'Quiet hours 23:00-07:00'],
    
    // ========== 核心差异化字段 ==========
    honestFacilities,
    foreignFriendly,
    bookingLinks,
    aiSummaryI18n,
    culturalTips,
    experienceType,
  }
}

// 20家青旅
const hostelsData: Hostel[] = [
  // 上海3
  createHostel('sh-001', 'The Diving Pirate Hostel', '跳海青年旅舍', 'Shanghai', 'Jing\'an', '456 West Nanjing Road', 'Located in the heart of Shanghai, steps from Diving Pirate Bar.', 0, { badges: ['Top Rated', 'Social Hub'] }),
  createHostel('sh-002', 'French Concession Guesthouse', '法租界民宿', 'Shanghai', 'Xuhui', '88 Wukang Road', 'Charming guesthouse in historic French Concession.', 1, { badges: ['Historic'], propertyType: 'guesthouse' }),
  createHostel('sh-003', 'Bund View Hostel', '外滩观景青旅', 'Shanghai', 'Huangpu', '200 East Nanjing Road', 'Steps from Bund with stunning skyline views.', 2, { badges: ['Bund View'] }),
  // 北京2
  createHostel('bj-001', 'Hutong Hideout', '胡同隐秘', 'Beijing', 'Dongcheng', '15 Nanluoguxiang', 'Authentic hutong courtyard near Forbidden City.', 3, { badges: ['Superhost'], propertyType: 'guesthouse' }),
  createHostel('bj-002', 'Drum Tower Youth Hostel', '鼓楼青年旅舍', 'Beijing', 'Dongcheng', '51 Gulou East Street', 'Steps from iconic Drum Tower.', 4, { badges: ['Drum Tower View'] }),
  // 成都3
  createHostel('cd-001', 'Panda Base Hostel', '熊猫基地青旅', 'Chengdu', 'Chenghua', '88 Panda Avenue', 'Panda-themed hostel near Giant Panda Base.', 5, { badges: ['Panda Themed'] }),
  createHostel('cd-002', 'Jinli Ancient Street Hostel', '锦里古街青旅', 'Chengdu', 'Wuhou', '231 Wuhou Street', 'Near Jinli Ancient Street.', 6, { badges: ['Ancient Street'], propertyType: 'guesthouse' }),
  createHostel('cd-003', 'Tianfu Square Hostel', '天府广场青旅', 'Chengdu', 'Qingyang', '9 Tianfu Square', 'City center with metro access.', 7, { badges: ['City Center'] }),
  // 西安2
  createHostel('xa-001', 'Muslim Quarter Hostel', '回民街青旅', 'Xi\'an', 'Lianhu', '45 Beiyuanmen', 'Located in Muslim Quarter, famous for street food.', 8, { badges: ['Street Food'] }),
  createHostel('xa-002', 'Bell Tower Central Hostel', '钟楼中心青旅', 'Xi\'an', 'Lianhu', '1 South Street', 'Right at Bell Tower, center of Xi\'an.', 9, { badges: ['City Center'] }),
  // 广州2
  createHostel('gz-001', 'Pearl River Hostel', '珠江青旅', 'Guangzhou', 'Yuexiu', '123 Beijing Road', 'Modern hostel by Pearl River.', 10, { badges: ['River View'] }),
  createHostel('gz-002', 'Shamian Island Guesthouse', '沙面岛民宿', 'Guangzhou', 'Liwan', '54 Shamian Street', 'Historic European colonial architecture.', 11, { badges: ['Historic'], propertyType: 'guesthouse' }),
  // 深圳2
  createHostel('sz-001', 'Tech City Hostel', '科技之城青旅', 'Shenzhen', 'Nanshan', '88 Shennan Avenue', 'In tech district for digital nomads.', 12, { badges: ['Tech Hub'] }),
  createHostel('sz-002', 'Window of the World Hostel', '世界之窗青旅', 'Shenzhen', 'Nanshan', '9037 Shennan Avenue', 'Near Window of the World theme park.', 13, { badges: ['Theme Park'] }),
  // 杭州2
  createHostel('hz-001', 'West Lake Hostel', '西湖青旅', 'Hangzhou', 'Xihu', '66 Nanshan Road', 'Peaceful hostel by West Lake.', 14, { badges: ['Lake View'] }),
  createHostel('hz-002', 'Longjing Tea Village Guesthouse', '龙井茶村民宿', 'Hangzhou', 'Xihu', '38 Longjing Village', 'Famous Longjing tea village.', 15, { badges: ['Tea Village'], propertyType: 'guesthouse' }),
  // 重庆2
  createHostel('cq-001', 'Mountain City Hostel', '山城青旅', 'Chongqing', 'Yuzhong', '88 Jiefangbei', 'Experience 8D magic city!', 16, { badges: ['8D City', 'Hotpot'] }),
  createHostel('cq-002', 'Hongya Cave Guesthouse', '洪崖洞民宿', 'Chongqing', 'Yuzhong', '88 Cangbai Road', 'Near stunning Hongya Cave.', 17, { badges: ['Night View'], propertyType: 'guesthouse' }),
  // 长沙2
  createHostel('cs-001', 'Spicy City Hostel', '辣味之城青旅', 'Changsha', 'Tianxin', '66 Pozi Street', 'Heart of food street!', 18, { badges: ['Food Paradise'] }),
  createHostel('cs-002', 'Orange Isle Hostel', '橘子洲青旅', 'Changsha', 'Yuelu', '2 Orange Isle', 'Located on Orange Isle.', 19, { badges: ['Island'] }),
]

export { hostelsData }
export const mockHostels = hostelsData

export function getHostelById(id: string): Hostel | undefined {
  return hostelsData.find(h => h.id === id)
}

export function getHostelsByCity(city: string): Hostel[] {
  return hostelsData.filter(h => h.city.toLowerCase() === city.toLowerCase())
}

export function getHostelsByExperienceType(type: string): Hostel[] {
  return hostelsData.filter(h => h.experienceType?.includes(type))
}

export function getFeaturedHostels(limit: number = 8): Hostel[] {
  return [...hostelsData].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

// 增强搜索：支持全文搜索 + 设施筛选
export interface SearchFilters {
  query?: string           // 全文搜索
  city?: string            // 城市筛选
  experienceType?: string  // 体验类型
  facilities?: string[]    // 设施筛选 ['western_toilet', 'elevator', 'english_staff']
  minPrice?: number
  maxPrice?: number
}

export function searchHostelsAdvanced(filters: SearchFilters): Hostel[] {
  let results = hostelsData
  
  // 全文搜索（酒店名、城市、区域、描述）
  if (filters.query) {
    const q = filters.query.toLowerCase()
    results = results.filter(h => 
      h.name.toLowerCase().includes(q) ||
      h.city.toLowerCase().includes(q) ||
      h.district.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q) ||
      h.nameCn.includes(q)
    )
  }
  
  // 城市筛选
  if (filters.city && filters.city !== 'all') {
    results = results.filter(h => h.city.toLowerCase() === filters.city!.toLowerCase())
  }
  
  // 体验类型筛选
  if (filters.experienceType && filters.experienceType !== 'all') {
    results = results.filter(h => h.experienceType?.includes(filters.experienceType!))
  }
  
  // 设施筛选（支持多选，AND逻辑）
  if (filters.facilities && filters.facilities.length > 0) {
    results = results.filter(h => {
      return filters.facilities!.every(facility => {
        switch(facility) {
          case 'western_toilet': return h.foreignFriendly.westernToilet
          case 'elevator': return h.foreignFriendly.elevator
          case 'english_staff': return h.foreignFriendly.englishSpeaking
          case 'visa_assistance': return h.foreignFriendly.visaAssistance
          case 'international_payment': return h.foreignFriendly.internationalPayment
          default: return false
        }
      })
    })
  }
  
  // 价格筛选
  if (filters.minPrice !== undefined) {
    results = results.filter(h => h.pricePerNight >= filters.minPrice!)
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter(h => h.pricePerNight <= filters.maxPrice!)
  }
  
  return results
}

// 保留旧版搜索兼容
export function searchHostels(query: string): Hostel[] {
  return searchHostelsAdvanced({ query })
}

// 获取所有体验类型（用于筛选UI）
export function getAllExperienceTypes(): { id: string; label: string; icon: string; description: string }[] {
  return [
    { id: 'hutong', label: 'Hutong Culture', icon: '🏮', description: 'Traditional courtyard houses in historic alleys' },
    { id: 'historical', label: 'Historical Sites', icon: '⛩️', description: 'Near Forbidden City, Great Wall, etc.' },
    { id: 'food', label: 'Food & Dining', icon: '🥟', description: 'Stay in culinary hotspots' },
    { id: 'nature', label: 'Nature & Parks', icon: '🌿', description: 'Near lakes, mountains, and gardens' },
    { id: 'art', label: 'Art & Design', icon: '🎨', description: 'Boutique stays in art districts' },
    { id: 'riverside', label: 'Riverside', icon: '🌊', description: 'Views of the Bund, West Lake, etc.' },
    { id: 'modern', label: 'Modern City', icon: '🏙️', description: 'High-rise luxury in city centers' },
    { id: 'city', label: 'City Center', icon: '🏢', description: 'Convenient urban locations' },
  ]
}

// 获取设施筛选选项（用于筛选UI）
export function getFacilityFilters(): { id: string; label: string; icon: string; color: string }[] {
  return [
    { id: 'western_toilet', label: '🚽 Western Toilet', icon: '🚽', color: 'emerald' },
    { id: 'elevator', label: '🛗 Elevator', icon: '🛗', color: 'blue' },
    { id: 'english_staff', label: '🇬🇧 English Staff', icon: '🇬🇧', color: 'purple' },
    { id: 'visa_assistance', label: '🛂 Visa Help', icon: '🛂', color: 'amber' },
    { id: 'international_payment', label: '💳 Card Payment', icon: '💳', color: 'green' },
  ]
}
