/**
 * Social Events & Room Shares Mock Data
 * 20+ events and 15+ room shares
 */

export interface SocialEvent {
  id: string
  title: string
  titleEn: string
  type: 'PUB_CRAWL' | 'CITY_WALK' | 'FOOD_TOUR' | 'WORKSHOP' | 'HIKING' | 'LANGUAGE_EXCHANGE' | 'OTHER'
  city: string
  meetingPoint: string
  meetingPointEn: string
  eventDate: string
  eventTime: string
  duration: number // minutes
  maxPeople: number
  currentPeople: number
  price: number
  currency: string
  organizerType: 'guide' | 'user' | 'hostel'
  organizerId: string
  organizerName: string
  description: string
  descriptionEn: string
  image?: string
  tags: string[]
  status: 'OPEN' | 'FULL' | 'CLOSED'
  participants: {
    id: string
    name: string
    nationality: string
    avatar?: string
  }[]
}

export interface RoomShare {
  id: string
  hotelName: string
  hotelId?: string
  city: string
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  pricePerPerson: number
  currency: string
  maxPeople: number
  currentPeople: number
  interestedPeople: number
  description: string
  descriptionEn: string
  organizerId: string
  organizerName: string
  organizerNationality: string
  tags: string[]
  status: 'OPEN' | 'FULL' | 'CLOSED'
  responses: {
    id: string
    userId: string
    userName: string
    nationality: string
    status: 'INTERESTED' | 'CONFIRMED'
    message?: string
  }[]
}

// Social Events
export const mockSocialEvents: SocialEvent[] = [
  // Shanghai Events
  {
    id: 'evt-sh-001',
    title: '周五跳海酒吧趴',
    titleEn: 'Friday Diving Pirate Pub Crawl',
    type: 'PUB_CRAWL',
    city: 'Shanghai',
    meetingPoint: 'The Diving Pirate Hostel 门口',
    meetingPointEn: 'The Diving Pirate Hostel entrance',
    eventDate: '2026-03-20',
    eventTime: '20:00',
    duration: 240,
    maxPeople: 15,
    currentPeople: 8,
    price: 25,
    currency: 'USD',
    organizerType: 'hostel',
    organizerId: 'host-sh-001',
    organizerName: 'Alex from Diving Pirate',
    description: 'Join us for the ultimate Shanghai pub crawl! Starting at Diving Pirate Bar, then hitting 4 more local favorites. Drink specials included!',
    descriptionEn: 'Join us for the ultimate Shanghai pub crawl! Starting at Diving Pirate Bar, then hitting 4 more local favorites. Drink specials included!',
    tags: ['nightlife', 'drinks', 'social', 'bars'],
    status: 'OPEN',
    participants: [
      { id: 'u1', name: 'Emma', nationality: 'UK' },
      { id: 'u2', name: 'Marco', nationality: 'IT' },
      { id: 'u3', name: 'Yuki', nationality: 'JP' },
    ],
  },
  {
    id: 'evt-sh-002',
    title: '外滩摄影漫步',
    titleEn: 'The Bund Photography Walk',
    type: 'CITY_WALK',
    city: 'Shanghai',
    meetingPoint: '外滩观光平台',
    meetingPointEn: 'The Bund Sightseeing Platform',
    eventDate: '2026-03-22',
    eventTime: '18:30',
    duration: 120,
    maxPeople: 10,
    currentPeople: 6,
    price: 0,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-sh-002',
    organizerName: 'David the Photographer',
    description: 'Free photography walk along The Bund. Share tips, take amazing shots, and make friends! All camera levels welcome.',
    descriptionEn: 'Free photography walk along The Bund. Share tips, take amazing shots, and make friends! All camera levels welcome.',
    tags: ['photography', 'free', 'sightseeing', 'bund'],
    status: 'OPEN',
    participants: [
      { id: 'u4', name: 'Sophie', nationality: 'FR' },
      { id: 'u5', name: 'Tom', nationality: 'AU' },
    ],
  },
  {
    id: 'evt-sh-003',
    title: '周三语言交换',
    titleEn: 'Wednesday Language Exchange',
    type: 'LANGUAGE_EXCHANGE',
    city: 'Shanghai',
    meetingPoint: 'The Diving Pirate Bar',
    meetingPointEn: 'The Diving Pirate Bar',
    eventDate: '2026-03-18',
    eventTime: '19:00',
    duration: 180,
    maxPeople: 20,
    currentPeople: 12,
    price: 10,
    currency: 'USD',
    organizerType: 'hostel',
    organizerId: 'host-sh-001',
    organizerName: 'Alex from Diving Pirate',
    description: 'Practice Chinese, English, Japanese, or any language! Meet travelers and locals over drinks. First drink included!',
    descriptionEn: 'Practice Chinese, English, Japanese, or any language! Meet travelers and locals over drinks. First drink included!',
    tags: ['language', 'social', 'drinks', 'free'],
    status: 'OPEN',
    participants: [
      { id: 'u6', name: 'Anna', nationality: 'DE' },
      { id: 'u7', name: 'Kim', nationality: 'KR' },
      { id: 'u8', name: 'James', nationality: 'US' },
    ],
  },
  
  // Beijing Events
  {
    id: 'evt-bj-001',
    title: '胡同美食之旅',
    titleEn: 'Hutong Food Adventure',
    type: 'FOOD_TOUR',
    city: 'Beijing',
    meetingPoint: '鼓楼地铁站',
    meetingPointEn: 'Gulou Subway Station',
    eventDate: '2026-03-21',
    eventTime: '17:00',
    duration: 180,
    maxPeople: 8,
    currentPeople: 5,
    price: 35,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-bj-001',
    organizerName: 'Ming the Beijing Expert',
    description: 'Eat your way through Beijing\'s hutongs! Try jianbing, zhajiangmian, and end at Diving Pirate for drinks.',
    descriptionEn: 'Eat your way through Beijing\'s hutongs! Try jianbing, zhajiangmian, and end at Diving Pirate for drinks.',
    tags: ['food', 'hutong', 'walking', 'dining'],
    status: 'OPEN',
    participants: [
      { id: 'u9', name: 'Lisa', nationality: 'CA' },
    ],
  },
  {
    id: 'evt-bj-002',
    title: '798艺术区漫步',
    titleEn: '798 Art District Tour',
    type: 'CITY_WALK',
    city: 'Beijing',
    meetingPoint: '798艺术区南门',
    meetingPointEn: '798 Art District South Gate',
    eventDate: '2026-03-23',
    eventTime: '14:00',
    duration: 180,
    maxPeople: 12,
    currentPeople: 4,
    price: 15,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-bj-002',
    organizerName: 'Lisa the Art Lover',
    description: 'Explore Beijing\'s contemporary art scene. Visit galleries, meet artists, and understand Chinese modern art.',
    descriptionEn: 'Explore Beijing\'s contemporary art scene. Visit galleries, meet artists, and understand Chinese modern art.',
    tags: ['art', 'culture', 'walking', '798'],
    status: 'OPEN',
    participants: [],
  },
  {
    id: 'evt-bj-003',
    title: '周六夜生活探索',
    titleEn: 'Saturday Nightlife Crawl',
    type: 'PUB_CRAWL',
    city: 'Beijing',
    meetingPoint: 'Diving Pirate Bar',
    meetingPointEn: 'Diving Pirate Bar',
    eventDate: '2026-03-21',
    eventTime: '21:00',
    duration: 300,
    maxPeople: 20,
    currentPeople: 14,
    price: 30,
    currency: 'USD',
    organizerType: 'user',
    organizerId: 'u10',
    organizerName: 'Party Mike',
    description: 'Beijing\'s best nightlife! Start at Diving Pirate, then Sanlitun, Gongti, and secret speakeasies.',
    descriptionEn: 'Beijing\'s best nightlife! Start at Diving Pirate, then Sanlitun, Gongti, and secret speakeasies.',
    tags: ['nightlife', 'party', 'drinks', 'bars'],
    status: 'OPEN',
    participants: [
      { id: 'u11', name: 'Jessica', nationality: 'US' },
      { id: 'u12', name: 'Pierre', nationality: 'FR' },
    ],
  },
  
  // Chengdu Events
  {
    id: 'evt-cd-001',
    title: '火锅之夜',
    titleEn: 'Hotpot Night',
    type: 'FOOD_TOUR',
    city: 'Chengdu',
    meetingPoint: '熊猫基地青旅',
    meetingPointEn: 'Panda Base Hostel',
    eventDate: '2026-03-20',
    eventTime: '19:00',
    duration: 180,
    maxPeople: 10,
    currentPeople: 7,
    price: 20,
    currency: 'USD',
    organizerType: 'hostel',
    organizerId: 'host-cd-001',
    organizerName: 'Panda Sister',
    description: 'All-you-can-eat hotpot! Spice levels from mild to insane. Meet fellow travelers and eat until you can\'t move!',
    descriptionEn: 'All-you-can-eat hotpot! Spice levels from mild to insane. Meet fellow travelers and eat until you can\'t move!',
    tags: ['food', 'hotpot', 'spicy', 'dining'],
    status: 'OPEN',
    participants: [
      { id: 'u13', name: 'Ben', nationality: 'CA' },
    ],
  },
  {
    id: 'evt-cd-002',
    title: '熊猫基地一日游',
    titleEn: 'Panda Base Day Trip',
    type: 'CITY_WALK',
    city: 'Chengdu',
    meetingPoint: '熊猫基地青旅',
    meetingPointEn: 'Panda Base Hostel',
    eventDate: '2026-03-22',
    eventTime: '08:00',
    duration: 360,
    maxPeople: 8,
    currentPeople: 6,
    price: 15,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-cd-001',
    organizerName: 'Panda Sister',
    description: 'Early access to see pandas at their most active! Includes transportation and insider knowledge.',
    descriptionEn: 'Early access to see pandas at their most active! Includes transportation and insider knowledge.',
    tags: ['pandas', 'nature', 'morning', 'cute'],
    status: 'OPEN',
    participants: [],
  },
  {
    id: 'evt-cd-003',
    title: '周五跳海聚会',
    titleEn: 'Friday Diving Pirate Social',
    type: 'PUB_CRAWL',
    city: 'Chengdu',
    meetingPoint: 'Diving Pirate Bar Chengdu',
    meetingPointEn: 'Diving Pirate Bar Chengdu',
    eventDate: '2026-03-27',
    eventTime: '20:00',
    duration: 240,
    maxPeople: 25,
    currentPeople: 18,
    price: 15,
    currency: 'USD',
    organizerType: 'user',
    organizerId: 'u14',
    organizerName: 'Mahjong Li',
    description: 'Chengdu\'s Diving Pirate location! Craft beer, great people, and the start of an epic night.',
    descriptionEn: 'Chengdu\'s Diving Pirate location! Craft beer, great people, and the start of an epic night.',
    tags: ['drinks', 'social', 'beer', 'nightlife'],
    status: 'OPEN',
    participants: [
      { id: 'u15', name: 'Wang', nationality: 'CN' },
    ],
  },
  
  // Xi'an Events
  {
    id: 'evt-xa-001',
    title: '回民街美食探索',
    titleEn: 'Muslim Quarter Food Tour',
    type: 'FOOD_TOUR',
    city: 'Xi\'an',
    meetingPoint: '钟楼地铁站',
    meetingPointEn: 'Zhonglou Subway Station',
    eventDate: '2026-03-24',
    eventTime: '18:00',
    duration: 180,
    maxPeople: 10,
    currentPeople: 4,
    price: 25,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-xa-001',
    organizerName: 'Hassan',
    description: 'Taste Xi\'an\'s famous Muslim Quarter! Roujiamo, yangrou paomo, and so much more. Finish at Diving Pirate.',
    descriptionEn: 'Taste Xi\'an\'s famous Muslim Quarter! Roujiamo, yangrou paomo, and so much more. Finish at Diving Pirate.',
    tags: ['food', 'halal', 'walking', 'street food'],
    status: 'OPEN',
    participants: [],
  },
  
  // Chongqing Events
  {
    id: 'evt-cq-001',
    title: '山城夜景徒步',
    titleEn: 'Mountain City Night Hike',
    type: 'HIKING',
    city: 'Chongqing',
    meetingPoint: '洪崖洞',
    meetingPointEn: 'Hongya Cave',
    eventDate: '2026-03-25',
    eventTime: '19:30',
    duration: 180,
    maxPeople: 12,
    currentPeople: 6,
    price: 10,
    currency: 'USD',
    organizerType: 'guide',
    organizerId: 'guide-cq-001',
    organizerName: 'Mountain Brother',
    description: 'See Chongqing\'s famous night views! We\'ll climb stairs, take photos, and end with hotpot.',
    descriptionEn: 'See Chongqing\'s famous night views! We\'ll climb stairs, take photos, and end with hotpot.',
    tags: ['hiking', 'night', 'views', 'stairs'],
    status: 'OPEN',
    participants: [],
  },
  
  // More events
  {
    id: 'evt-gz-001',
    title: '早茶点心分享',
    titleEn: 'Dim Sum Brunch',
    type: 'FOOD_TOUR',
    city: 'Guangzhou',
    meetingPoint: '点都德茶楼',
    meetingPointEn: 'Dian Dou De Restaurant',
    eventDate: '2026-03-28',
    eventTime: '10:00',
    duration: 150,
    maxPeople: 6,
    currentPeople: 4,
    price: 30,
    currency: 'USD',
    organizerType: 'user',
    organizerId: 'u16',
    organizerName: 'Dim Sum Fan',
    description: 'Authentic Cantonese dim sum experience! Share tables, share food, make friends.',
    descriptionEn: 'Authentic Cantonese dim sum experience! Share tables, share food, make friends.',
    tags: ['food', 'dim sum', 'cantonese', 'brunch'],
    status: 'OPEN',
    participants: [],
  },
  {
    id: 'evt-hz-001',
    title: '西湖日落野餐',
    titleEn: 'West Lake Sunset Picnic',
    type: 'CITY_WALK',
    city: 'Hangzhou',
    meetingPoint: '断桥残雪',
    meetingPointEn: 'Broken Bridge',
    eventDate: '2026-03-26',
    eventTime: '17:00',
    duration: 180,
    maxPeople: 8,
    currentPeople: 3,
    price: 15,
    currency: 'USD',
    organizerType: 'user',
    organizerId: 'u17',
    organizerName: 'Tea Lover',
    description: 'Bring snacks and drinks! Watch the sunset over West Lake with new friends.',
    descriptionEn: 'Bring snacks and drinks! Watch the sunset over West Lake with new friends.',
    tags: ['nature', 'sunset', 'picnic', 'free'],
    status: 'OPEN',
    participants: [],
  },
]

// Room Shares
export const mockRoomShares: RoomShare[] = [
  {
    id: 'rs-001',
    hotelName: 'The Diving Pirate Hostel',
    hotelId: 'sh-001',
    city: 'Shanghai',
    roomType: '4-Bed Mixed Dorm',
    checkIn: '2026-03-25',
    checkOut: '2026-03-30',
    nights: 5,
    pricePerPerson: 16,
    currency: 'USD',
    maxPeople: 3,
    currentPeople: 1,
    interestedPeople: 2,
    description: 'Already booked a 4-bed dorm! Looking for 2-3 chill roommates. I\'m a solo traveler from UK, love photography and craft beer. Planning to hit Diving Pirate bar often!',
    descriptionEn: 'Already booked a 4-bed dorm! Looking for 2-3 chill roommates. I\'m a solo traveler from UK, love photography and craft beer. Planning to hit Diving Pirate bar often!',
    organizerId: 'u18',
    organizerName: 'Emma',
    organizerNationality: 'UK',
    tags: ['social', 'nightlife', 'photography'],
    status: 'OPEN',
    responses: [
      { id: 'resp1', userId: 'u19', userName: 'Marco', nationality: 'IT', status: 'INTERESTED', message: 'Hey! Love photography too!' },
    ],
  },
  {
    id: 'rs-002',
    hotelName: 'Hutong Hideout',
    hotelId: 'bj-001',
    city: 'Beijing',
    roomType: '6-Bed Mixed Dorm',
    checkIn: '2026-04-01',
    checkOut: '2026-04-05',
    nights: 4,
    pricePerPerson: 14,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 2,
    interestedPeople: 1,
    description: 'Two friends from Germany looking for more people to share our dorm! We\'re easy-going, love beer and history. Join us for hutong exploring!',
    descriptionEn: 'Two friends from Germany looking for more people to share our dorm! We\'re easy-going, love beer and history. Join us for hutong exploring!',
    organizerId: 'u20',
    organizerName: 'Anna',
    organizerNationality: 'DE',
    tags: ['history', 'beer', 'easygoing'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-003',
    hotelName: 'Panda Base Hostel',
    hotelId: 'cd-001',
    city: 'Chengdu',
    roomType: '6-Bed Female Dorm',
    checkIn: '2026-04-10',
    checkOut: '2026-04-15',
    nights: 5,
    pricePerPerson: 14,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 2,
    interestedPeople: 3,
    description: 'Female travelers unite! Booked a female dorm for panda volunteering. Looking for roommates who love animals and spicy food!',
    descriptionEn: 'Female travelers unite! Booked a female dorm for panda volunteering. Looking for roommates who love animals and spicy food!',
    organizerId: 'u21',
    organizerName: 'Yuki',
    organizerNationality: 'JP',
    tags: ['female only', 'pandas', 'spicy food'],
    status: 'OPEN',
    responses: [
      { id: 'resp1', userId: 'u22', userName: 'Sophie', nationality: 'FR', status: 'INTERESTED' },
      { id: 'resp2', userId: 'u23', userName: 'Lisa', nationality: 'US', status: 'INTERESTED' },
    ],
  },
  {
    id: 'rs-004',
    hotelName: 'Bund Backpackers',
    hotelId: 'sh-002',
    city: 'Shanghai',
    roomType: '4-Bed Mixed Dorm',
    checkIn: '2026-03-28',
    checkOut: '2026-04-02',
    nights: 5,
    pricePerPerson: 22,
    currency: 'USD',
    maxPeople: 3,
    currentPeople: 1,
    interestedPeople: 0,
    description: 'Solo traveler from Australia. Quiet but social when drinking! Looking for respectful roommates. Non-smoker.',
    descriptionEn: 'Solo traveler from Australia. Quiet but social when drinking! Looking for respectful roommates. Non-smoker.',
    organizerId: 'u24',
    organizerName: 'James',
    organizerNationality: 'AU',
    tags: ['quiet', 'respectful', 'nonsmoker'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-005',
    hotelName: 'West Lake Hostel',
    hotelId: 'hz-001',
    city: 'Hangzhou',
    roomType: '6-Bed Lake View Dorm',
    checkIn: '2026-04-15',
    checkOut: '2026-04-20',
    nights: 5,
    pricePerPerson: 15,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 2,
    interestedPeople: 1,
    description: 'Digital nomad couple looking for like-minded travelers. Good WiFi, great views, peaceful atmosphere.',
    descriptionEn: 'Digital nomad couple looking for like-minded travelers. Good WiFi, great views, peaceful atmosphere.',
    organizerId: 'u25',
    organizerName: 'Mike',
    organizerNationality: 'US',
    tags: ['digital nomad', 'wifi', 'quiet'],
    status: 'OPEN',
    responses: [],
  },
  // More room shares to reach 15+
  {
    id: 'rs-006',
    hotelName: 'Mountain City Hostel',
    hotelId: 'cq-001',
    city: 'Chongqing',
    roomType: '8-Bed Mountain View Dorm',
    checkIn: '2026-04-05',
    checkOut: '2026-04-10',
    nights: 5,
    pricePerPerson: 10,
    currency: 'USD',
    maxPeople: 7,
    currentPeople: 3,
    interestedPeople: 2,
    description: 'Group of friends looking for more party people! Hotpot every night, clubbing, and exploring this crazy city.',
    descriptionEn: 'Group of friends looking for more party people! Hotpot every night, clubbing, and exploring this crazy city.',
    organizerId: 'u26',
    organizerName: 'Tom',
    organizerNationality: 'UK',
    tags: ['party', 'hotpot', 'nightlife'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-007',
    hotelName: 'Terracotta Backpackers',
    hotelId: 'xa-001',
    city: 'Xi\'an',
    roomType: '6-Bed Mixed Dorm',
    checkIn: '2026-04-08',
    checkOut: '2026-04-12',
    nights: 4,
    pricePerPerson: 11,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 2,
    interestedPeople: 1,
    description: 'History buffs wanted! Planning to see Terracotta Warriors and ancient sites. Early risers preferred.',
    descriptionEn: 'History buffs wanted! Planning to see Terracotta Warriors and ancient sites. Early risers preferred.',
    organizerId: 'u27',
    organizerName: 'David',
    organizerNationality: 'CA',
    tags: ['history', 'early bird', 'museums'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-008',
    hotelName: 'Pearl River Hostel',
    hotelId: 'gz-001',
    city: 'Guangzhou',
    roomType: '6-Bed Mixed Dorm',
    checkIn: '2026-04-12',
    checkOut: '2026-04-17',
    nights: 5,
    pricePerPerson: 13,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 1,
    interestedPeople: 2,
    description: 'Foodie looking for dim sum buddies! Want to eat my way through Guangzhou. Diving Pirate visits included!',
    descriptionEn: 'Foodie looking for dim sum buddies! Want to eat my way through Guangzhou. Diving Pirate visits included!',
    organizerId: 'u28',
    organizerName: 'Maria',
    organizerNationality: 'ES',
    tags: ['foodie', 'dim sum', 'exploring'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-009',
    hotelName: 'Drum Tower Youth Hostel',
    hotelId: 'bj-002',
    city: 'Beijing',
    roomType: '4-Bed Mixed Dorm',
    checkIn: '2026-04-20',
    checkOut: '2026-04-25',
    nights: 5,
    pricePerPerson: 18,
    currency: 'USD',
    maxPeople: 3,
    currentPeople: 2,
    interestedPeople: 1,
    description: 'Musicians welcome! We have a guitar and love jam sessions. Near live music venues.',
    descriptionEn: 'Musicians welcome! We have a guitar and love jam sessions. Near live music venues.',
    organizerId: 'u29',
    organizerName: 'Alex',
    organizerNationality: 'US',
    tags: ['music', 'jam sessions', 'creative'],
    status: 'OPEN',
    responses: [],
  },
  {
    id: 'rs-010',
    hotelName: 'Spicy City Hostel',
    hotelId: 'cs-001',
    city: 'Changsha',
    roomType: '6-Bed Spicy Dorm',
    checkIn: '2026-04-25',
    checkOut: '2026-04-30',
    nights: 5,
    pricePerPerson: 9,
    currency: 'USD',
    maxPeople: 5,
    currentPeople: 2,
    interestedPeople: 2,
    description: 'Spicy food challenge team forming! Can you handle Changsha heat? Street food tours every day.',
    descriptionEn: 'Spicy food challenge team forming! Can you handle Changsha heat? Street food tours every day.',
    organizerId: 'u30',
    organizerName: 'Chen',
    organizerNationality: 'CN',
    tags: ['spicy', 'food challenge', 'street food'],
    status: 'OPEN',
    responses: [],
  },
]

// Helper functions
export function getEventsByCity(city: string): SocialEvent[] {
  if (!city || city === 'all') return mockSocialEvents
  return mockSocialEvents.filter(e => e.city.toLowerCase() === city.toLowerCase())
}

export function getRoomSharesByCity(city: string): RoomShare[] {
  if (!city || city === 'all') return mockRoomShares
  return mockRoomShares.filter(r => r.city.toLowerCase() === city.toLowerCase())
}

export function getEventById(id: string): SocialEvent | undefined {
  return mockSocialEvents.find(e => e.id === id)
}

export function getRoomShareById(id: string): RoomShare | undefined {
  return mockRoomShares.find(r => r.id === id)
}
