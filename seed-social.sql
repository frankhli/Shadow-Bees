-- Seed social events and room shares

-- Get a sample user
DO $$
DECLARE
  sample_user_id TEXT;
BEGIN
  SELECT id INTO sample_user_id FROM users LIMIT 1;
  
  IF sample_user_id IS NULL THEN
    -- Create a sample guest user if none exists
    INSERT INTO users (id, email, password, role, status, created_at, updated_at)
    VALUES (gen_random_uuid(), 'guest@example.com', 'hashed', 'GUEST', 'ACTIVE', NOW(), NOW())
    RETURNING id INTO sample_user_id;
  END IF;

  -- Insert social events
  INSERT INTO social_events (id, organizer_id, organizer_type, title, title_en, description, description_en, type, city, meeting_point, meeting_point_en, event_date, duration, max_people, price, currency, status, created_at, updated_at)
  VALUES 
    (gen_random_uuid(), 'guide-1', 'guide', '胡同酒吧夜游', 'Hutong Pub Crawl 🍺', '探索北京最好的胡同酒吧，结识 fellow travelers', 'Join us for an unforgettable night exploring Beijing''s best hutong bars!', 'PUB_CRAWL', 'Beijing', '南锣鼓巷地铁站B出口', 'Nanluoguxiang Subway Exit B', NOW() + INTERVAL '2 days', 240, 12, 30, 'USD', 'OPEN', NOW(), NOW()),
    (gen_random_uuid(), 'guide-3', 'guide', '天坛太极体验', 'Morning Tai Chi in Temple of Heaven', '跟导游一起打太极，体验中国传统养生', 'Start your day with traditional Tai Chi. All levels welcome!', 'CITY_WALK', 'Beijing', '天坛公园东门', 'Temple of Heaven East Gate', NOW() + INTERVAL '3 days', 120, 10, 0, 'USD', 'OPEN', NOW(), NOW()),
    (gen_random_uuid(), sample_user_id, 'guest', '上海美食探索', 'Shanghai Street Food Tour', '发现老上海的美食秘密', 'Discover hidden food gems in old Shanghai!', 'FOOD_TOUR', 'Shanghai', '豫园地铁站', 'Yuyuan Garden Metro Station', NOW() + INTERVAL '5 days', 180, 8, 25, 'USD', 'OPEN', NOW(), NOW());

  -- Insert room shares
  INSERT INTO room_shares (id, organizer_id, hotel_name, city, room_type, check_in, check_out, price_per_person, currency, max_people, description, description_en, tags, status, created_at, updated_at)
  VALUES 
    (gen_random_uuid(), sample_user_id, 'Beijing Hutong Hostel', 'Beijing', '4-bed Dorm', NOW() + INTERVAL '7 days', NOW() + INTERVAL '10 days', 25, 'USD', 4, '寻找友好的室友一起住胡同青旅', 'Looking for friendly travelers to share a dorm room!', ARRAY['social', 'budget', 'solo_traveler'], 'OPEN', NOW(), NOW()),
    (gen_random_uuid(), sample_user_id, 'The Bund Youth Hostel', 'Shanghai', 'Twin Room', NOW() + INTERVAL '14 days', NOW() + INTERVAL '16 days', 45, 'USD', 2, '外滩景观双人间，寻找女性室友', 'Great Bund view twin room, looking for female roommate', ARRAY['female_only', 'view', 'central'], 'OPEN', NOW(), NOW());

END $$;
