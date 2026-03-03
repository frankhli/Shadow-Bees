import { PrismaClient } from '../src/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding guides and experiences...')

  // Create test guides
  const guide1 = await prisma.guide.upsert({
    where: { id: 'guide-1' },
    update: {},
    create: {
      id: 'guide-1',
      userId: 'user-guide-1',
      name: '李明',
      nameEn: 'Michael Li',
      languages: ['en', 'zh'],
      specialties: ['history', 'food', 'art'],
      licenseNo: 'D-2024-BJ-001',
      licenseVerified: true,
      city: 'Beijing',
      bio: '土生土长的北京人，胡同文化专家',
      bioEn: 'Born and raised in Beijing, expert in Hutong culture and history. Love showing visitors hidden food spots and historic sites.',
      rating: 4.9,
      hourlyRate: 50,
      availability: {},
      status: 'ACTIVE',
    },
  })

  const guide2 = await prisma.guide.upsert({
    where: { id: 'guide-2' },
    update: {},
    create: {
      id: 'guide-2',
      userId: 'user-guide-2',
      name: 'Sarah Zhang',
      nameEn: 'Sarah Zhang',
      languages: ['en', 'es', 'zh'],
      specialties: ['food', 'nightlife', 'shopping'],
      licenseNo: 'D-2024-SH-002',
      licenseVerified: true,
      city: 'Shanghai',
      bio: '上海本地美食博主',
      bioEn: 'Shanghai native food blogger, familiar with international food culture. Expert in customizing food tours.',
      rating: 4.8,
      hourlyRate: 60,
      availability: {},
      status: 'ACTIVE',
    },
  })

  const guide3 = await prisma.guide.upsert({
    where: { id: 'guide-3' },
    update: {},
    create: {
      id: 'guide-3',
      userId: 'user-guide-3',
      name: '王芳',
      nameEn: 'Emma Wang',
      languages: ['en', 'ja', 'zh'],
      specialties: ['history', 'architecture', 'photography'],
      licenseNo: 'D-2024-BJ-003',
      licenseVerified: true,
      city: 'Beijing',
      bio: '前故宫讲解员，明清历史专家',
      bioEn: 'Former Forbidden City docent, expert in Ming and Qing history. I bring history to life with vivid stories.',
      rating: 5.0,
      hourlyRate: 70,
      availability: {},
      status: 'ACTIVE',
    },
  })

  console.log('Created guides:', guide1.name, guide2.name, guide3.name)

  // Create test experiences
  const exp1 = await prisma.experience.upsert({
    where: { id: 'exp-1' },
    update: {},
    create: {
      id: 'exp-1',
      name: '北京烤鸭制作体验',
      nameEn: 'Peking Duck Cooking Class',
      type: 'DINING',
      city: 'Beijing',
      description: '学习正宗北京烤鸭的制作工艺',
      descriptionEn: 'Learn the art of authentic Peking Duck preparation from a master chef.',
      pricePerPerson: 89,
      durationMinutes: 180,
      maxCapacity: 8,
      photos: [],
      isActive: true,
    },
  })

  const exp2 = await prisma.experience.upsert({
    where: { id: 'exp-2' },
    update: {},
    create: {
      id: 'exp-2',
      name: '书法体验课',
      nameEn: 'Chinese Calligraphy Workshop',
      type: 'WORKSHOP',
      city: 'Shanghai',
      description: '体验中国传统书法艺术',
      descriptionEn: 'Experience the art of Chinese calligraphy with a master calligrapher.',
      pricePerPerson: 65,
      durationMinutes: 120,
      maxCapacity: 6,
      photos: [],
      isActive: true,
    },
  })

  const exp3 = await prisma.experience.upsert({
    where: { id: 'exp-3' },
    update: {},
    create: {
      id: 'exp-3',
      name: '兵马俑深度游',
      nameEn: 'Terracotta Warriors Deep Dive',
      type: 'TOUR',
      city: "Xi'an",
      description: '专业讲解兵马俑历史',
      descriptionEn: 'Expert-guided tour of the Terracotta Army with historical insights.',
      pricePerPerson: 120,
      durationMinutes: 240,
      maxCapacity: 10,
      photos: [],
      isActive: true,
    },
  })

  console.log('Created experiences:', exp1.nameEn, exp2.nameEn, exp3.nameEn)

  // Create required users first
  await prisma.user.upsert({
    where: { id: 'user-guide-1' },
    update: {},
    create: {
      id: 'user-guide-1',
      email: 'guide1@tiaohai.com',
      password: 'hashed_password',
      role: 'GUIDE',
      status: 'ACTIVE',
    },
  })

  await prisma.user.upsert({
    where: { id: 'user-guide-2' },
    update: {},
    create: {
      id: 'user-guide-2',
      email: 'guide2@tiaohai.com',
      password: 'hashed_password',
      role: 'GUIDE',
      status: 'ACTIVE',
    },
  })

  await prisma.user.upsert({
    where: { id: 'user-guide-3' },
    update: {},
    create: {
      id: 'user-guide-3',
      email: 'guide3@tiaohai.com',
      password: 'hashed_password',
      role: 'GUIDE',
      status: 'ACTIVE',
    },
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
