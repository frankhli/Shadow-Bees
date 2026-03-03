/**
 * Guides Mock Data
 * 20+ local guides across 9 cities
 */

export interface Guide {
  id: string
  name: string
  nameEn: string
  avatar?: string
  city: string
  nationality: string
  
  // Languages
  languages: string[]
  
  // Specialties
  specialties: string[]
  
  // Rating & Reviews
  rating: number
  reviewCount: number
  completedTours: number
  
  // Pricing
  hourlyRate: number
  halfDayRate: number
  fullDayRate: number
  currency: string
  
  // Bio
  bio: string
  bioCn: string
  
  // Credentials
  licenseNumber?: string
  licenseVerified: boolean
  yearsExperience: number
  
  // Services
  services: {
    type: string
    duration: string
    price: number
    description: string
  }[]
  
  // Availability
  availableDates: string[]
  
  // Reviews
  reviews: {
    id: string
    userName: string
    country: string
    rating: number
    date: string
    text: string
  }[]
}

const guideSpecialties = [
  { id: 'history', label: 'History', labelCn: '历史', icon: '🏛️' },
  { id: 'food', label: 'Food & Dining', labelCn: '美食', icon: '🍜' },
  { id: 'art', label: 'Art & Culture', labelCn: '艺术文化', icon: '🎨' },
  { id: 'nightlife', label: 'Nightlife', labelCn: '夜生活', icon: '🍻' },
  { id: 'shopping', label: 'Shopping', labelCn: '购物', icon: '🛍️' },
  { id: 'architecture', label: 'Architecture', labelCn: '建筑', icon: '🏗️' },
  { id: 'photography', label: 'Photography', labelCn: '摄影', icon: '📸' },
  { id: 'nature', label: 'Nature & Outdoors', labelCn: '自然户外', icon: '🌲' },
]

export const mockGuides: Guide[] = [
  // Shanghai Guides
  {
    id: 'guide-sh-001',
    name: '陈玛丽',
    nameEn: 'Mary Chen',
    city: 'Shanghai',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['food', 'shopping', 'nightlife'],
    rating: 4.9,
    reviewCount: 156,
    completedTours: 423,
    hourlyRate: 35,
    halfDayRate: 120,
    fullDayRate: 200,
    currency: 'USD',
    bio: 'Born and raised in Shanghai, I know every hidden food stall and secret bar in the city. I used to work in fashion so I can take you to the best local designers and tailors. Friday nights we always end at Diving Pirate!',
    bioCn: '土生土长的上海人，熟悉每家隐藏的美食摊位和秘密酒吧。曾在时尚行业工作，可以带你找到最好的本地设计师和裁缝。周五晚上我们通常以跳海结束！',
    licenseNumber: 'SH-2018-001',
    licenseVerified: true,
    yearsExperience: 6,
    services: [
      { type: 'food_tour', duration: '4 hours', price: 80, description: 'Street food tour through Old Town and French Concession' },
      { type: 'shopping', duration: '6 hours', price: 150, description: 'Fashion and design shopping tour' },
      { type: 'nightlife', duration: '5 hours', price: 100, description: 'Bar crawl including Diving Pirate' },
    ],
    availableDates: ['2026-03-15', '2026-03-16', '2026-03-18', '2026-03-20', '2026-03-22'],
    reviews: [
      { id: 'r1', userName: 'John', country: 'US', rating: 5, date: '2026-02-20', text: 'Mary took us to the best xiaolongbao place! And the night ended at Diving Pirate which was epic.' },
      { id: 'r2', userName: 'Sophie', country: 'FR', rating: 5, date: '2026-02-15', text: 'Amazing shopping tour. Found unique pieces I could never find on my own.' },
    ],
  },
  {
    id: 'guide-sh-002',
    name: '李大卫',
    nameEn: 'David Li',
    city: 'Shanghai',
    nationality: 'China',
    languages: ['en', 'zh', 'ja'],
    specialties: ['history', 'architecture', 'art'],
    rating: 4.8,
    reviewCount: 89,
    completedTours: 234,
    hourlyRate: 40,
    halfDayRate: 140,
    fullDayRate: 240,
    currency: 'USD',
    bio: 'Architecture professor by day, tour guide by passion. I love showing visitors the contrast between Shanghai\'s colonial past and futuristic present. Expert on Art Deco buildings.',
    bioCn: '白天是建筑学教授，导游是我的热情所在。我喜欢向游客展示上海殖民历史与未来主义现在的对比。装饰艺术建筑专家。',
    licenseNumber: 'SH-2019-045',
    licenseVerified: true,
    yearsExperience: 5,
    services: [
      { type: 'architecture', duration: '4 hours', price: 100, description: 'Art Deco architecture walking tour' },
      { type: 'history', duration: '6 hours', price: 180, description: 'Colonial Shanghai and The Bund history' },
    ],
    availableDates: ['2026-03-17', '2026-03-19', '2026-03-21'],
    reviews: [],
  },
  
  // Beijing Guides
  {
    id: 'guide-bj-001',
    name: '王大明',
    nameEn: 'Ming Wang',
    city: 'Beijing',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['history', 'food', 'architecture'],
    rating: 4.9,
    reviewCount: 234,
    completedTours: 567,
    hourlyRate: 30,
    halfDayRate: 100,
    fullDayRate: 180,
    currency: 'USD',
    bio: 'I\'ve been guiding in Beijing for 8 years and I still get excited every time I walk through the Forbidden City. I specialize in making history fun and accessible. Beijing duck expert!',
    bioCn: '在北京做导游8年了，每次走过紫禁城我仍然感到兴奋。我专注于让历史变得有趣易懂。北京烤鸭专家！',
    licenseNumber: 'BJ-2017-023',
    licenseVerified: true,
    yearsExperience: 8,
    services: [
      { type: 'history', duration: '8 hours', price: 200, description: 'Forbidden City and Great Wall day tour' },
      { type: 'food', duration: '4 hours', price: 70, description: 'Hutong food and beer tour' },
      { type: 'hutong', duration: '3 hours', price: 60, description: 'Hutong walking tour with local stories' },
    ],
    availableDates: ['2026-03-15', '2026-03-16', '2026-03-17', '2026-03-20'],
    reviews: [
      { id: 'r1', userName: 'Emma', country: 'UK', rating: 5, date: '2026-02-18', text: 'Ming made the Forbidden City come alive! And he knows the best Peking duck place.' },
    ],
  },
  {
    id: 'guide-bj-002',
    name: '刘小美',
    nameEn: 'Lisa Liu',
    city: 'Beijing',
    nationality: 'China',
    languages: ['en', 'zh', 'ko'],
    specialties: ['art', 'nightlife', 'photography'],
    rating: 4.7,
    reviewCount: 123,
    completedTours: 289,
    hourlyRate: 32,
    halfDayRate: 110,
    fullDayRate: 190,
    currency: 'USD',
    bio: 'Photographer and art lover. I\'ll take you to 798 Art District\'s hidden galleries and the best photo spots in Beijing. I know all the cool bars including Diving Pirate!',
    bioCn: '摄影师和艺术爱好者。我会带你去798艺术区的隐藏画廊和北京最佳拍照地点。我知道所有酷炫的酒吧，包括跳海！',
    licenseNumber: 'BJ-2020-067',
    licenseVerified: true,
    yearsExperience: 4,
    services: [
      { type: 'art', duration: '4 hours', price: 80, description: '798 Art District deep dive' },
      { type: 'photography', duration: '6 hours', price: 150, description: 'Best photo spots in Beijing' },
    ],
    availableDates: ['2026-03-18', '2026-03-19', '2026-03-21'],
    reviews: [],
  },
  
  // Chengdu Guides
  {
    id: 'guide-cd-001',
    name: '熊猫姐姐',
    nameEn: 'Panda Sister',
    city: 'Chengdu',
    nationality: 'China',
    languages: ['en', 'zh', 'ko'],
    specialties: ['nature', 'food', 'photography'],
    rating: 5.0,
    reviewCount: 312,
    completedTours: 892,
    hourlyRate: 28,
    halfDayRate: 90,
    fullDayRate: 160,
    currency: 'USD',
    bio: 'I\'m obsessed with pandas! I can get you into the Panda Base early before the crowds and help you volunteer. Also hotpot expert - I know the spiciest spots in Chengdu!',
    bioCn: '我对熊猫很着迷！我可以在人群之前带你进入熊猫基地，帮你做志愿者。也是火锅专家 - 我知道成都最辣的地方！',
    licenseNumber: 'CD-2016-001',
    licenseVerified: true,
    yearsExperience: 9,
    services: [
      { type: 'panda', duration: '6 hours', price: 120, description: 'Panda Base early access + volunteer program' },
      { type: 'hotpot', duration: '4 hours', price: 60, description: 'Hotpot tour - from mild to extreme spicy' },
      { type: 'nature', duration: '8 hours', price: 180, description: 'Giant Buddha and tea plantations' },
    ],
    availableDates: ['2026-03-15', '2026-03-16', '2026-03-17', '2026-03-18', '2026-03-19'],
    reviews: [
      { id: 'r1', userName: 'Anna', country: 'DE', rating: 5, date: '2026-02-20', text: 'Panda Sister is amazing! We got to see the pandas being fed and she knows everything about them.' },
      { id: 'r2', userName: 'Mike', country: 'CA', rating: 5, date: '2026-02-18', text: 'The hotpot tour was intense! My mouth is still burning but it was worth it!' },
    ],
  },
  {
    id: 'guide-cd-002',
    name: '王茶茶',
    nameEn: 'Tea Wang',
    city: 'Chengdu',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['food', 'history', 'art'],
    rating: 4.8,
    reviewCount: 156,
    completedTours: 378,
    hourlyRate: 25,
    halfDayRate: 80,
    fullDayRate: 140,
    currency: 'USD',
    bio: 'Tea ceremony master and Sichuan opera expert. I\'ll show you the elegant side of Chengdu - teahouses, gardens, and traditional performances.',
    bioCn: '茶道大师和川剧专家。我会向你展示成都优雅的一面 - 茶馆、园林和传统表演。',
    licenseNumber: 'CD-2019-034',
    licenseVerified: true,
    yearsExperience: 5,
    services: [
      { type: 'tea', duration: '3 hours', price: 50, description: 'Tea ceremony experience' },
      { type: 'opera', duration: '4 hours', price: 80, description: 'Sichuan opera backstage tour' },
    ],
    availableDates: ['2026-03-20', '2026-03-21', '2026-03-22'],
    reviews: [],
  },
  
  // Xi'an Guides
  {
    id: 'guide-xa-001',
    name: '马历史',
    nameEn: 'History Ma',
    city: 'Xi\'an',
    nationality: 'China',
    languages: ['en', 'zh', 'ja'],
    specialties: ['history', 'architecture', 'food'],
    rating: 4.9,
    reviewCount: 178,
    completedTours: 445,
    hourlyRate: 26,
    halfDayRate: 85,
    fullDayRate: 150,
    currency: 'USD',
    bio: 'History degree from Xi\'an Jiaotong University. The Terracotta Warriors are my backyard! I make ancient history exciting and can take you to the best Muslim Quarter food spots.',
    bioCn: '西安交通大学历史学位。兵马俑就是我的后院！我让古代历史变得激动人心，可以带你去回民街最好的美食点。',
    licenseNumber: 'XA-2018-012',
    licenseVerified: true,
    yearsExperience: 6,
    services: [
      { type: 'warriors', duration: '6 hours', price: 120, description: 'Terracotta Warriors deep dive' },
      { type: 'food', duration: '3 hours', price: 50, description: 'Muslim Quarter street food tour' },
      { type: 'history', duration: '8 hours', price: 180, description: 'Ancient Xi\'an full day tour' },
    ],
    availableDates: ['2026-03-15', '2026-03-17', '2026-03-19', '2026-03-21'],
    reviews: [
      { id: 'r1', userName: 'Tom', country: 'UK', rating: 5, date: '2026-02-15', text: 'History Ma knows everything! The Terracotta Warriors came alive with his stories.' },
    ],
  },
  
  // More guides for other cities
  {
    id: 'guide-gz-001',
    name: '陈点心',
    nameEn: 'Dim Sum Chen',
    city: 'Guangzhou',
    nationality: 'China',
    languages: ['en', 'zh', 'cantonese'],
    specialties: ['food', 'shopping', 'history'],
    rating: 4.8,
    reviewCount: 134,
    completedTours: 312,
    hourlyRate: 28,
    halfDayRate: 90,
    fullDayRate: 160,
    currency: 'USD',
    bio: 'Cantonese food is my life! I know every dim sum restaurant worth visiting in Guangzhou. From street stalls to Michelin stars.',
    bioCn: '粤菜是我的生命！我知道广州每一家值得去的点心餐厅。从街边摊到米其林。',
    licenseNumber: 'GZ-2019-028',
    licenseVerified: true,
    yearsExperience: 5,
    services: [
      { type: 'dimsum', duration: '4 hours', price: 70, description: 'Ultimate dim sum tour' },
    ],
    availableDates: ['2026-03-16', '2026-03-18', '2026-03-20'],
    reviews: [],
  },
  {
    id: 'guide-sz-001',
    name: '林科技',
    nameEn: 'Tech Lin',
    city: 'Shenzhen',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['architecture', 'shopping', 'nightlife'],
    rating: 4.6,
    reviewCount: 89,
    completedTours: 198,
    hourlyRate: 30,
    halfDayRate: 100,
    fullDayRate: 180,
    currency: 'USD',
    bio: 'Tech enthusiast showing you the future! Shenzhen is China\'s Silicon Valley. I\'ll take you to drone shows, tech markets, and the coolest rooftop bars.',
    bioCn: '科技爱好者带你看看未来！深圳是中国的硅谷。我会带你去看无人机表演、科技市场和最酷的屋顶酒吧。',
    licenseNumber: 'SZ-2020-045',
    licenseVerified: true,
    yearsExperience: 4,
    services: [
      { type: 'tech', duration: '6 hours', price: 120, description: 'Tech Shenzhen tour' },
    ],
    availableDates: ['2026-03-17', '2026-03-19', '2026-03-21'],
    reviews: [],
  },
  {
    id: 'guide-hz-001',
    name: '周茶香',
    nameEn: 'Tea Zhou',
    city: 'Hangzhou',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['nature', 'art', 'food'],
    rating: 4.9,
    reviewCount: 156,
    completedTours: 389,
    hourlyRate: 32,
    halfDayRate: 110,
    fullDayRate: 200,
    currency: 'USD',
    bio: 'Tea farmer\'s daughter. I grew up on Longjing tea plantations. Let me show you the most beautiful tea fields and teach you the art of tea.',
    bioCn: '茶农的女儿。我在龙井茶园长大。让我向你展示最美丽的茶园，教你茶艺。',
    licenseNumber: 'HZ-2017-019',
    licenseVerified: true,
    yearsExperience: 7,
    services: [
      { type: 'tea', duration: '6 hours', price: 130, description: 'Tea plantation experience' },
    ],
    availableDates: ['2026-03-15', '2026-03-18', '2026-03-20'],
    reviews: [],
  },
  {
    id: 'guide-cq-001',
    name: '山哥',
    nameEn: 'Mountain Brother',
    city: 'Chongqing',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['food', 'nightlife', 'architecture'],
    rating: 4.8,
    reviewCount: 123,
    completedTours: 278,
    hourlyRate: 24,
    halfDayRate: 80,
    fullDayRate: 140,
    currency: 'USD',
    bio: 'Born on the mountain, live on the mountain! I know every staircase and secret passage in this 8D city. Hotpot is religion here!',
    bioCn: '生在山里，住在山里！我知道这座8D城市的每个楼梯和秘密通道。火锅是这里的宗教！',
    licenseNumber: 'CQ-2018-033',
    licenseVerified: true,
    yearsExperience: 6,
    services: [
      { type: 'hotpot', duration: '4 hours', price: 60, description: 'Extreme hotpot challenge' },
      { type: 'night', duration: '5 hours', price: 80, description: 'Chongqing night view tour' },
    ],
    availableDates: ['2026-03-16', '2026-03-19', '2026-03-22'],
    reviews: [],
  },
  {
    id: 'guide-cs-001',
    name: '辣妹子',
    nameEn: 'Spicy Girl',
    city: 'Changsha',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['food', 'nightlife', 'art'],
    rating: 4.7,
    reviewCount: 98,
    completedTours: 189,
    hourlyRate: 22,
    halfDayRate: 70,
    fullDayRate: 120,
    currency: 'USD',
    bio: 'Changsha\'s street food queen! Stinky tofu, spicy crayfish, and milk tea - I know where to find the best. This city never sleeps!',
    bioCn: '长沙街头美食女王！臭豆腐、麻辣小龙虾、奶茶 - 我知道哪里能找到最好的。这座城市从不睡觉！',
    licenseNumber: 'CS-2020-021',
    licenseVerified: true,
    yearsExperience: 4,
    services: [
      { type: 'food', duration: '4 hours', price: 55, description: 'Changsha street food marathon' },
    ],
    availableDates: ['2026-03-17', '2026-03-20'],
    reviews: [],
  },
  // Add more guides to reach 20+
  {
    id: 'guide-sh-003',
    name: '张艺术',
    nameEn: 'Art Zhang',
    city: 'Shanghai',
    nationality: 'China',
    languages: ['en', 'zh', 'fr'],
    specialties: ['art', 'architecture', 'history'],
    rating: 4.8,
    reviewCount: 67,
    completedTours: 156,
    hourlyRate: 38,
    halfDayRate: 130,
    fullDayRate: 220,
    currency: 'USD',
    bio: 'Art curator and historian. I specialize in contemporary Chinese art and can get you access to private galleries and artist studios.',
    bioCn: '艺术策展人和历史学家。我专注于当代中国艺术，可以带你进入私人画廊和艺术家工作室。',
    licenseNumber: 'SH-2021-089',
    licenseVerified: true,
    yearsExperience: 3,
    services: [
      { type: 'art', duration: '5 hours', price: 120, description: 'Contemporary art gallery tour' },
    ],
    availableDates: ['2026-03-22', '2026-03-23'],
    reviews: [],
  },
  {
    id: 'guide-bj-003',
    name: '赵胡同',
    nameEn: 'Hutong Zhao',
    city: 'Beijing',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['history', 'food', 'architecture'],
    rating: 4.9,
    reviewCount: 189,
    completedTours: 423,
    hourlyRate: 28,
    halfDayRate: 95,
    fullDayRate: 170,
    currency: 'USD',
    bio: 'Fourth generation hutong resident. I\'ve lived in the same courtyard for 40 years. Let me show you the real Beijing that tourists never see.',
    bioCn: '第四代胡同居民。我在同一个四合院住了40年。让我向你展示游客从未见过的真正北京。',
    licenseNumber: 'BJ-2016-008',
    licenseVerified: true,
    yearsExperience: 8,
    services: [
      { type: 'hutong', duration: '4 hours', price: 75, description: 'Real hutong life experience' },
    ],
    availableDates: ['2026-03-23', '2026-03-24'],
    reviews: [],
  },
  {
    id: 'guide-cd-003',
    name: '李麻将',
    nameEn: 'Mahjong Li',
    city: 'Chengdu',
    nationality: 'China',
    languages: ['en', 'zh'],
    specialties: ['nightlife', 'food', 'art'],
    rating: 4.7,
    reviewCount: 112,
    completedTours: 267,
    hourlyRate: 25,
    halfDayRate: 80,
    fullDayRate: 140,
    currency: 'USD',
    bio: 'Mahjong master and nightlife expert. I\'ll teach you mahjong in a teahouse, then take you to the best bars and clubs in Chengdu.',
    bioCn: '麻将大师和夜生活专家。我会在茶馆教你打麻将，然后带你去成都最好的酒吧和夜店。',
    licenseNumber: 'CD-2020-056',
    licenseVerified: true,
    yearsExperience: 4,
    services: [
      { type: 'nightlife', duration: '6 hours', price: 90, description: 'Chengdu nightlife + mahjong lesson' },
    ],
    availableDates: ['2026-03-23', '2026-03-25'],
    reviews: [],
  },
]

// Helper functions
export function getGuidesByCity(city: string): Guide[] {
  if (!city || city === 'all') return mockGuides
  return mockGuides.filter(g => g.city.toLowerCase() === city.toLowerCase())
}

export function getGuideById(id: string): Guide | undefined {
  return mockGuides.find(g => g.id === id)
}

export function getGuidesByLanguage(language: string): Guide[] {
  if (!language) return mockGuides
  return mockGuides.filter(g => g.languages.includes(language))
}
