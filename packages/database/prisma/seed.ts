import { PrismaClient, UserRole, HotelStatus, GuideStatus, ExperienceType, KnowledgeType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@tiaohai.com',
      password: '$2b$10$YourHashedPasswordHere', // bcrypt hash of 'admin123'
      role: UserRole.ADMIN,
    },
  })
  console.log('Created admin:', admin.id)

  // Create sample hotel owner
  const hotelOwner = await prisma.user.create({
    data: {
      email: 'hotel@example.com',
      password: '$2b$10$YourHashedPasswordHere',
      role: UserRole.HOTEL_OWNER,
      hotel: {
        create: {
          name: '胡同里精品酒店',
          nameEn: 'Hutong Boutique Hotel',
          licenseNo: '京特旅字第20240001号',
          hasForeignGuestLicense: true,
          city: 'Beijing',
          address: '北京市东城区南锣鼓巷12号',
          lat: 39.9347,
          lng: 116.3974,
          facilities: {
            elevator: false,
            wifi: true,
            westernToilet: true,
            airCon: true,
            heating: true,
            englishStaff: true,
          },
          basePrice: 450.00,
          currency: 'CNY',
          pmsType: 'manual',
          status: HotelStatus.ACTIVE,
          roomTypes: {
            create: [
              {
                name: '舒适大床房',
                nameEn: 'Comfort King Room',
                roomCount: 5,
                inventoryPool: { ota: 3, direct: 2 },
                amenities: {
                  toiletType: 'western',
                  airCon: true,
                  tv: true,
                  wifi: true,
                  roomSize: '25m²',
                },
                isActive: true,
              },
              {
                name: '胡同景观房',
                nameEn: 'Hutong View Room',
                roomCount: 3,
                inventoryPool: { ota: 2, direct: 1 },
                amenities: {
                  toiletType: 'western',
                  airCon: true,
                  tv: true,
                  wifi: true,
                  balcony: true,
                  roomSize: '30m²',
                },
                isActive: true,
              },
            ],
          },
        },
      },
    },
  })
  console.log('Created hotel:', hotelOwner.id)

  // Create sample guides
  const guides = await Promise.all([
    prisma.user.create({
      data: {
        email: 'guide1@example.com',
        password: '$2b$10$YourHashedPasswordHere',
        role: UserRole.GUIDE,
        guide: {
          create: {
            name: '李明',
            nameEn: 'Michael Li',
            languages: ['en', 'zh'],
            specialties: ['history', 'food', 'art'],
            licenseNo: 'D-2024-BJ-001',
            licenseVerified: true,
            city: 'Beijing',
            bio: '土生土长的北京人，对胡同文化有深入研究。带游客探访隐藏的美食小店和历史遗迹。',
            bioEn: 'Born and raised in Beijing, expert in Hutong culture and history. Love showing visitors hidden food spots and historic sites.',
            rating: 4.9,
            hourlyRate: 200.00,
            availability: {},
            status: GuideStatus.ACTIVE,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'guide2@example.com',
        password: '$2b$10$YourHashedPasswordHere',
        role: UserRole.GUIDE,
        guide: {
          create: {
            name: 'Sarah Zhang',
            nameEn: 'Sarah Zhang',
            languages: ['en', 'es', 'zh'],
            specialties: ['food', 'nightlife', 'shopping'],
            licenseNo: 'D-2024-SH-002',
            licenseVerified: true,
            city: 'Shanghai',
            bio: '上海本土美食博主，熟悉各国饮食文化，擅长为外国游客定制美食路线。',
            bioEn: 'Shanghai native food blogger, familiar with international food culture. Expert in customizing food tours for foreign visitors.',
            rating: 4.8,
            hourlyRate: 250.00,
            availability: {},
            status: GuideStatus.ACTIVE,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'guide3@example.com',
        password: '$2b$10$YourHashedPasswordHere',
        role: UserRole.GUIDE,
        guide: {
          create: {
            name: '王芳',
            nameEn: 'Emma Wang',
            languages: ['en', 'ja', 'zh'],
            specialties: ['history', 'architecture', 'photography'],
            licenseNo: 'D-2024-BJ-003',
            licenseVerified: true,
            city: 'Beijing',
            bio: '前故宫讲解员，精通明清历史。擅长用生动故事让历史活起来。',
            bioEn: 'Former Forbidden City docent, expert in Ming and Qing history. Bring history to life with vivid stories.',
            rating: 5.0,
            hourlyRate: 300.00,
            availability: {},
            status: GuideStatus.ACTIVE,
          },
        },
      },
    }),
  ])
  console.log('Created guides:', guides.length)

  // Create sample experiences
  const experiences = await prisma.experience.createMany({
    data: [
      {
        name: '老北京胡同漫步',
        nameEn: 'Old Beijing Hutong Walking Tour',
        type: ExperienceType.TOUR,
        city: 'Beijing',
        address: '南锣鼓巷集合',
        lat: 39.9347,
        lng: 116.3974,
        description: '3小时深度胡同游，探访老北京四合院',
        descriptionEn: '3-hour deep Hutong tour, explore traditional Beijing courtyard houses',
        pricePerPerson: 150.00,
        durationMinutes: 180,
        maxCapacity: 8,
        partnerContract: { commissionRate: 0.20 },
        isActive: true,
      },
      {
        name: '手工饺子制作课',
        nameEn: 'Handmade Dumpling Workshop',
        type: ExperienceType.WORKSHOP,
        city: 'Beijing',
        address: '鼓楼东大街88号',
        lat: 39.9408,
        lng: 116.3895,
        description: '学习包传统北方饺子，品尝自己的作品',
        descriptionEn: 'Learn to make traditional northern dumplings and taste your own creation',
        pricePerPerson: 120.00,
        durationMinutes: 120,
        maxCapacity: 6,
        partnerContract: { commissionRate: 0.15 },
        isActive: true,
      },
    ],
  })
  console.log('Created experiences:', experiences.count)

  // Create knowledge documents for RAG
  const knowledgeDocs = await prisma.knowledgeDocument.createMany({
    data: [
      {
        type: KnowledgeType.VISA_POLICY,
        title: '144小时过境免签政策',
        titleEn: '144-hour Visa-Free Transit Policy',
        content: '53个国家公民可在北京、上海、广州等口岸享受144小时过境免签，需持有前往第三国的机票。',
        contentEn: 'Citizens of 53 countries can enjoy 144-hour visa-free transit in Beijing, Shanghai, Guangzhou with onward tickets to third countries.',
        isActive: true,
      },
      {
        type: KnowledgeType.CULTURAL_TIP,
        title: '饮用水提示',
        titleEn: 'Drinking Water Tips',
        content: '中国的自来水不能直接饮用，酒店提供瓶装水。建议携带保温杯。',
        contentEn: 'Tap water in China is not drinkable. Hotels provide bottled water. Bring a thermos.',
        isActive: true,
      },
      {
        type: KnowledgeType.CULTURAL_TIP,
        title: '厕所纸巾',
        titleEn: 'Toilet Paper Tips',
        content: '中国公共厕所通常不提供纸巾，建议随身携带。',
        contentEn: 'Public toilets in China usually do not provide toilet paper. Carry your own.',
        isActive: true,
      },
      {
        type: KnowledgeType.EMERGENCY,
        title: '紧急联系方式',
        titleEn: 'Emergency Contacts',
        content: '报警: 110, 急救: 120, 火警: 119, 旅游投诉: 12301',
        contentEn: 'Police: 110, Ambulance: 120, Fire: 119, Tourist Complaint: 12301',
        isActive: true,
      },
    ],
  })
  console.log('Created knowledge docs:', knowledgeDocs.count)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
