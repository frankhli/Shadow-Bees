// Simple seed script using raw SQL
const { Client } = require('pg')

const client = new Client({
  connectionString: 'postgresql://tiaohai:tiaohai@localhost:5432/tiaohai'
})

async function main() {
  await client.connect()
  
  console.log('Seeding data...')
  
  // Insert users first
  await client.query(`
    INSERT INTO users (id, email, password, role, status, created_at, updated_at)
    VALUES 
      ('user-guide-1', 'guide1@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW()),
      ('user-guide-2', 'guide2@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW()),
      ('user-guide-3', 'guide3@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW())
    ON CONFLICT (id) DO NOTHING
  `)
  
  // Insert guides
  await client.query(`
    INSERT INTO guides (id, user_id, name, name_en, languages, specialties, license_no, license_verified, city, bio, bio_en, rating, hourly_rate, availability, status, created_at, updated_at)
    VALUES 
      ('guide-1', 'user-guide-1', '李明', 'Michael Li', '["en","zh"]', '["history","food","art"]', 'D-2024-BJ-001', true, 'Beijing', '土生土长的北京人，胡同文化专家', 'Born and raised in Beijing, expert in Hutong culture and history.', 4.9, 50, '{}', 'ACTIVE', NOW(), NOW()),
      ('guide-2', 'user-guide-2', 'Sarah Zhang', 'Sarah Zhang', '["en","es","zh"]', '["food","nightlife","shopping"]', 'D-2024-SH-002', true, 'Shanghai', '上海本地美食博主', 'Shanghai native food blogger, expert in customizing food tours.', 4.8, 60, '{}', 'ACTIVE', NOW(), NOW()),
      ('guide-3', 'user-guide-3', '王芳', 'Emma Wang', '["en","ja","zh"]', '["history","architecture","photography"]', 'D-2024-BJ-003', true, 'Beijing', '前故宫讲解员，明清历史专家', 'Former Forbidden City docent, expert in Ming and Qing history.', 5.0, 70, '{}', 'ACTIVE', NOW(), NOW())
    ON CONFLICT (id) DO NOTHING
  `)
  
  // Insert experiences
  await client.query(`
    INSERT INTO experiences (id, name, name_en, type, city, description, description_en, price_per_person, duration_minutes, max_capacity, photos, is_active, created_at, updated_at)
    VALUES 
      ('exp-1', '北京烤鸭制作体验', 'Peking Duck Cooking Class', 'DINING', 'Beijing', '学习正宗北京烤鸭的制作工艺', 'Learn the art of authentic Peking Duck preparation.', 89, 180, 8, '[]', true, NOW(), NOW()),
      ('exp-2', '书法体验课', 'Chinese Calligraphy Workshop', 'WORKSHOP', 'Shanghai', '体验中国传统书法艺术', 'Experience the art of Chinese calligraphy.', 65, 120, 6, '[]', true, NOW(), NOW()),
      ('exp-3', '兵马俑深度游', 'Terracotta Warriors Deep Dive', 'TOUR', 'Xi''an', '专业讲解兵马俑历史', 'Expert-guided tour of the Terracotta Army.', 120, 240, 10, '[]', true, NOW(), NOW()),
      ('exp-4', '茶艺体验', 'Tea Ceremony Experience', 'WORKSHOP', 'Hangzhou', '学习中国茶道文化', 'Learn the art of Chinese tea ceremony.', 75, 120, 8, '[]', true, NOW(), NOW()),
      ('exp-5', '功夫体验课', 'Kung Fu Class', 'WORKSHOP', 'Beijing', '跟师傅学中国功夫', 'Learn Kung Fu from a master.', 95, 120, 12, '[]', true, NOW(), NOW()),
      ('exp-6', '点心制作', 'Dim Sum Making', 'DINING', 'Shanghai', '学习制作广式点心', 'Learn to make traditional dim sum.', 85, 180, 10, '[]', true, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING
  `)
  
  console.log('Seeding completed!')
  await client.end()
}

main().catch(console.error)
