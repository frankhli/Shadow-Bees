-- 初始化数据库
-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'HOTEL_OWNER',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 酒店表
CREATE TABLE IF NOT EXISTS hotels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    license_no VARCHAR(100) UNIQUE,
    has_foreign_guest_license BOOLEAN DEFAULT false,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    facilities JSONB DEFAULT '{}',
    photos JSONB DEFAULT '[]',
    base_price DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'CNY',
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 测试数据
INSERT INTO users (email, password, role) 
VALUES ('test@hotel.com', 'hashed_password_here', 'HOTEL_OWNER')
ON CONFLICT (email) DO NOTHING;

INSERT INTO hotels (user_id, name, name_en, city, address, facilities, status)
SELECT 
    u.id,
    '胡同里精品酒店',
    'Hutong Boutique Hotel',
    'Beijing',
    '北京市东城区交道口南大街',
    '{"elevator": false, "westernToilet": true, "wifi": true, "englishStaff": true}'::jsonb,
    'ACTIVE'
FROM users u WHERE u.email = 'test@hotel.com'
ON CONFLICT (user_id) DO NOTHING;

SELECT 'Database initialized successfully' as result;
