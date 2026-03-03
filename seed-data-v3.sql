-- Seed data for guides and experiences

-- Insert users first
INSERT INTO users (id, email, password, role, status, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'guide1@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW()),
  (gen_random_uuid(), 'guide2@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW()),
  (gen_random_uuid(), 'guide3@tiaohai.com', 'hashed', 'GUIDE', 'ACTIVE', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert guides with proper array format
INSERT INTO guides (id, user_id, name, name_en, languages, specialties, license_no, license_verified, city, bio, bio_en, rating, hourly_rate, availability, status, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  u.id,
  '李明',
  'Michael Li',
  ARRAY['en', 'zh'],
  ARRAY['history', 'food', 'art'],
  'D-2024-BJ-001',
  true,
  'Beijing',
  '土生土长的北京人，胡同文化专家',
  'Born and raised in Beijing, expert in Hutong culture and history.',
  4.9,
  50,
  '{}'::jsonb,
  'ACTIVE',
  NOW(),
  NOW()
FROM users u WHERE u.email = 'guide1@tiaohai.com'
ON CONFLICT DO NOTHING;

INSERT INTO guides (id, user_id, name, name_en, languages, specialties, license_no, license_verified, city, bio, bio_en, rating, hourly_rate, availability, status, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  u.id,
  'Sarah Zhang',
  'Sarah Zhang',
  ARRAY['en', 'es', 'zh'],
  ARRAY['food', 'nightlife', 'shopping'],
  'D-2024-SH-002',
  true,
  'Shanghai',
  '上海本地美食博主',
  'Shanghai native food blogger, expert in customizing food tours.',
  4.8,
  60,
  '{}'::jsonb,
  'ACTIVE',
  NOW(),
  NOW()
FROM users u WHERE u.email = 'guide2@tiaohai.com'
ON CONFLICT DO NOTHING;

INSERT INTO guides (id, user_id, name, name_en, languages, specialties, license_no, license_verified, city, bio, bio_en, rating, hourly_rate, availability, status, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  u.id,
  '王芳',
  'Emma Wang',
  ARRAY['en', 'ja', 'zh'],
  ARRAY['history', 'architecture', 'photography'],
  'D-2024-BJ-003',
  true,
  'Beijing',
  '前故宫讲解员，明清历史专家',
  'Former Forbidden City docent, expert in Ming and Qing history.',
  5.0,
  70,
  '{}'::jsonb,
  'ACTIVE',
  NOW(),
  NOW()
FROM users u WHERE u.email = 'guide3@tiaohai.com'
ON CONFLICT DO NOTHING;
