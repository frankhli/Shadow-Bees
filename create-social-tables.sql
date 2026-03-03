-- Create social feature tables

-- CreateEnum
CREATE TYPE "SocialEventType" AS ENUM ('PUB_CRAWL', 'CITY_WALK', 'FOOD_TOUR', 'WORKSHOP', 'OTHER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('OPEN', 'FULL', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'ATTENDED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "RoomShareStatus" AS ENUM ('OPEN', 'FILLED', 'CLOSED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('INTERESTED', 'CONFIRMED', 'DECLINED');

-- CreateTable
CREATE TABLE "social_events" (
    "id" TEXT NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "organizer_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT,
    "type" "SocialEventType" NOT NULL,
    "city" TEXT NOT NULL,
    "meeting_point" TEXT NOT NULL,
    "meeting_point_en" TEXT,
    "event_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "max_people" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "EventStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_participants" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "ParticipantStatus" NOT NULL DEFAULT 'CONFIRMED',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "event_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_shares" (
    "id" TEXT NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "hotel_id" TEXT,
    "hotel_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,
    "price_per_person" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "max_people" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "description_en" TEXT,
    "tags" TEXT[],
    "status" "RoomShareStatus" NOT NULL DEFAULT 'OPEN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_share_responses" (
    "id" TEXT NOT NULL,
    "room_share_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "ResponseStatus" NOT NULL DEFAULT 'INTERESTED',
    "message" TEXT,
    "responded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_share_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "social_events_city_idx" ON "social_events"("city");

-- CreateIndex
CREATE INDEX "social_events_type_idx" ON "social_events"("type");

-- CreateIndex
CREATE INDEX "social_events_status_idx" ON "social_events"("status");

-- CreateIndex
CREATE INDEX "social_events_event_date_idx" ON "social_events"("event_date");

-- CreateIndex
CREATE UNIQUE INDEX "event_participants_event_id_user_id_key" ON "event_participants"("event_id", "user_id");

-- CreateIndex
CREATE INDEX "event_participants_event_id_idx" ON "event_participants"("event_id");

-- CreateIndex
CREATE INDEX "event_participants_user_id_idx" ON "event_participants"("user_id");

-- CreateIndex
CREATE INDEX "room_shares_city_idx" ON "room_shares"("city");

-- CreateIndex
CREATE INDEX "room_shares_status_idx" ON "room_shares"("status");

-- CreateIndex
CREATE INDEX "room_shares_check_in_idx" ON "room_shares"("check_in");

-- CreateIndex
CREATE UNIQUE INDEX "room_share_responses_room_share_id_user_id_key" ON "room_share_responses"("room_share_id", "user_id");

-- CreateIndex
CREATE INDEX "room_share_responses_room_share_id_idx" ON "room_share_responses"("room_share_id");

-- AddForeignKey
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "social_events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_share_responses" ADD CONSTRAINT "room_share_responses_room_share_id_fkey" FOREIGN KEY ("room_share_id") REFERENCES "room_shares"("id") ON DELETE CASCADE ON UPDATE CASCADE;
