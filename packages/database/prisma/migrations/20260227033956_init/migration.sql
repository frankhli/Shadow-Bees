-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GUEST', 'HOTEL_OWNER', 'GUIDE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "HotelStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "GuideStatus" AS ENUM ('ACTIVE', 'BUSY', 'SUSPENDED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('WORKSHOP', 'DINING', 'SHOPPING', 'TOUR');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ACCOMMODATION_ONLY', 'GUIDE_ONLY', 'EXPERIENCE_ONLY', 'BUNDLE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AIChannel" AS ENUM ('WHATSAPP', 'WEB', 'BOOKING_MSG', 'WECHAT');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateEnum
CREATE TYPE "KnowledgeType" AS ENUM ('HOTEL_FACILITY', 'VISA_POLICY', 'POI_NEARBY', 'CULTURAL_TIP', 'EMERGENCY', 'FAQ');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'GUEST',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "phone" TEXT,
    "passport_no" TEXT,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotels" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "license_no" TEXT,
    "has_foreign_guest_license" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DECIMAL(10,8),
    "lng" DECIMAL(11,8),
    "facilities" JSONB,
    "photos" JSONB,
    "base_price" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'CNY',
    "pms_type" TEXT,
    "pms_config" JSONB,
    "status" "HotelStatus" NOT NULL DEFAULT 'PENDING',
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_types" (
    "id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "room_count" INTEGER NOT NULL,
    "inventory_pool" JSONB NOT NULL DEFAULT '{"ota": 0, "direct": 0}',
    "amenities" JSONB,
    "photos" JSONB,
    "pms_config" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guides" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "languages" TEXT[],
    "specialties" TEXT[],
    "license_no" TEXT,
    "license_verified" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "bio" TEXT,
    "bio_en" TEXT,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 5.0,
    "hourly_rate" DECIMAL(10,2),
    "availability" JSONB,
    "status" "GuideStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "type" "ExperienceType" NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT,
    "lat" DECIMAL(10,8),
    "lng" DECIMAL(11,8),
    "description" TEXT,
    "description_en" TEXT,
    "price_per_person" DECIMAL(10,2) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "photos" JSONB,
    "partner_contract" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "order_no" TEXT NOT NULL,
    "guest_id" TEXT NOT NULL,
    "guest_nationality" TEXT,
    "order_type" "OrderType" NOT NULL,
    "hotel_id" TEXT,
    "room_type_id" TEXT,
    "check_in" TIMESTAMP(3),
    "check_out" TIMESTAMP(3),
    "nights" INTEGER,
    "room_price_total" DECIMAL(10,2),
    "guide_id" TEXT,
    "service_date" TIMESTAMP(3),
    "service_hours" INTEGER,
    "guide_fee" DECIMAL(10,2),
    "experience_id" TEXT,
    "experience_fee" DECIMAL(10,2),
    "total_amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "exchange_rate" DECIMAL(10,4),
    "platform_fee" DECIMAL(10,2) NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripe_payment_intent_id" TEXT,
    "paid_at" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT 'CONFIRMED',
    "cancelled_at" TIMESTAMP(3),
    "cancelled_reason" TEXT,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_conversations" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "guest_id" TEXT,
    "channel" "AIChannel" NOT NULL,
    "message" TEXT NOT NULL,
    "response" TEXT,
    "intent" TEXT,
    "confidence_score" DECIMAL(3,2),
    "escalated_to_human" BOOLEAN NOT NULL DEFAULT false,
    "human_handled_by" TEXT,
    "escalated_at" TIMESTAMP(3),
    "resolved_at" TIMESTAMP(3),
    "hotel_id" TEXT,
    "context" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_sync_logs" (
    "id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "availability_date" TIMESTAMP(3) NOT NULL,
    "rooms_available" INTEGER NOT NULL,
    "sync_status" "SyncStatus" NOT NULL,
    "error_msg" TEXT,
    "synced_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_documents" (
    "id" TEXT NOT NULL,
    "type" "KnowledgeType" NOT NULL,
    "category" TEXT,
    "hotel_id" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "content_en" TEXT,
    "embedding" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_clicks" (
    "id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "utm_source" TEXT NOT NULL,
    "utm_medium" TEXT NOT NULL,
    "utm_campaign" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "referrer" TEXT,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "order_id" TEXT,
    "clicked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_stats" (
    "id" TEXT NOT NULL,
    "hotel_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "platform" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "unique_visitors" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "estimated_revenue" DECIMAL(10,2),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guests_user_id_key" ON "guests"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_user_id_key" ON "hotels"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "hotels_license_no_key" ON "hotels"("license_no");

-- CreateIndex
CREATE INDEX "hotels_city_idx" ON "hotels"("city");

-- CreateIndex
CREATE INDEX "hotels_status_idx" ON "hotels"("status");

-- CreateIndex
CREATE INDEX "hotels_has_foreign_guest_license_idx" ON "hotels"("has_foreign_guest_license");

-- CreateIndex
CREATE INDEX "room_types_hotel_id_idx" ON "room_types"("hotel_id");

-- CreateIndex
CREATE UNIQUE INDEX "guides_user_id_key" ON "guides"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "guides_license_no_key" ON "guides"("license_no");

-- CreateIndex
CREATE INDEX "guides_city_idx" ON "guides"("city");

-- CreateIndex
CREATE INDEX "guides_status_idx" ON "guides"("status");

-- CreateIndex
CREATE INDEX "experiences_city_idx" ON "experiences"("city");

-- CreateIndex
CREATE INDEX "experiences_type_idx" ON "experiences"("type");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_no_key" ON "orders"("order_no");

-- CreateIndex
CREATE INDEX "orders_guest_id_idx" ON "orders"("guest_id");

-- CreateIndex
CREATE INDEX "orders_hotel_id_idx" ON "orders"("hotel_id");

-- CreateIndex
CREATE INDEX "orders_order_no_idx" ON "orders"("order_no");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_payment_status_idx" ON "orders"("payment_status");

-- CreateIndex
CREATE INDEX "ai_conversations_session_id_idx" ON "ai_conversations"("session_id");

-- CreateIndex
CREATE INDEX "ai_conversations_guest_id_idx" ON "ai_conversations"("guest_id");

-- CreateIndex
CREATE INDEX "ai_conversations_escalated_to_human_idx" ON "ai_conversations"("escalated_to_human");

-- CreateIndex
CREATE INDEX "ai_conversations_created_at_idx" ON "ai_conversations"("created_at");

-- CreateIndex
CREATE INDEX "inventory_sync_logs_hotel_id_idx" ON "inventory_sync_logs"("hotel_id");

-- CreateIndex
CREATE INDEX "inventory_sync_logs_room_type_id_idx" ON "inventory_sync_logs"("room_type_id");

-- CreateIndex
CREATE INDEX "inventory_sync_logs_availability_date_idx" ON "inventory_sync_logs"("availability_date");

-- CreateIndex
CREATE INDEX "knowledge_documents_type_idx" ON "knowledge_documents"("type");

-- CreateIndex
CREATE INDEX "knowledge_documents_hotel_id_idx" ON "knowledge_documents"("hotel_id");

-- CreateIndex
CREATE INDEX "knowledge_documents_category_idx" ON "knowledge_documents"("category");

-- CreateIndex
CREATE INDEX "referral_clicks_hotel_id_idx" ON "referral_clicks"("hotel_id");

-- CreateIndex
CREATE INDEX "referral_clicks_platform_idx" ON "referral_clicks"("platform");

-- CreateIndex
CREATE INDEX "referral_clicks_clicked_at_idx" ON "referral_clicks"("clicked_at");

-- CreateIndex
CREATE INDEX "referral_clicks_converted_idx" ON "referral_clicks"("converted");

-- CreateIndex
CREATE INDEX "referral_stats_hotel_id_idx" ON "referral_stats"("hotel_id");

-- CreateIndex
CREATE INDEX "referral_stats_date_idx" ON "referral_stats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "referral_stats_hotel_id_date_platform_key" ON "referral_stats"("hotel_id", "date", "platform");

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_types" ADD CONSTRAINT "room_types_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guides" ADD CONSTRAINT "guides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_hotel_id_fkey" FOREIGN KEY ("hotel_id") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "guides"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
