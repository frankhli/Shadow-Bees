// CommonJS wrapper for the database package
const { PrismaClient } = require('./node_modules/.prisma/client')

// Enums
const HotelStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REJECTED: 'REJECTED'
}

const GuideStatus = {
  ACTIVE: 'ACTIVE',
  BUSY: 'BUSY',
  SUSPENDED: 'SUSPENDED',
  INACTIVE: 'INACTIVE'
}

const OrderStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
}

const OrderType = {
  ACCOMMODATION_ONLY: 'ACCOMMODATION_ONLY',
  GUIDE_ONLY: 'GUIDE_ONLY',
  EXPERIENCE_ONLY: 'EXPERIENCE_ONLY',
  BUNDLE: 'BUNDLE'
}

const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
}

const UserRole = {
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
  HOTEL_OWNER: 'HOTEL_OWNER',
  GUIDE: 'GUIDE'
}

const ExperienceType = {
  WORKSHOP: 'WORKSHOP',
  DINING: 'DINING',
  SHOPPING: 'SHOPPING',
  TOUR: 'TOUR'
}

const SyncStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PENDING: 'PENDING'
}

const AIChannel = {
  WHATSAPP: 'WHATSAPP',
  WEB: 'WEB',
  BOOKING_MSG: 'BOOKING_MSG',
  WECHAT: 'WECHAT'
}

const KnowledgeType = {
  HOTEL_FACILITY: 'HOTEL_FACILITY',
  VISA_POLICY: 'VISA_POLICY',
  POI_NEARBY: 'POI_NEARBY',
  CULTURAL_TIP: 'CULTURAL_TIP',
  EMERGENCY: 'EMERGENCY',
  FAQ: 'FAQ'
}

// Social Enums
const SocialEventType = {
  PUB_CRAWL: 'PUB_CRAWL',
  CITY_WALK: 'CITY_WALK',
  FOOD_TOUR: 'FOOD_TOUR',
  WORKSHOP: 'WORKSHOP',
  OTHER: 'OTHER'
}

const EventStatus = {
  OPEN: 'OPEN',
  FULL: 'FULL',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
}

const ParticipantStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  ATTENDED: 'ATTENDED',
  NO_SHOW: 'NO_SHOW'
}

const RoomShareStatus = {
  OPEN: 'OPEN',
  FILLED: 'FILLED',
  CLOSED: 'CLOSED',
  EXPIRED: 'EXPIRED'
}

const ResponseStatus = {
  INTERESTED: 'INTERESTED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED'
}

// Chat Enums
const ConversationType = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
  EVENT: 'EVENT',
  ROOM_SHARE: 'ROOM_SHARE'
}

const ParticipantRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
}

module.exports = {
  PrismaClient,
  HotelStatus,
  GuideStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
  UserRole,
  ExperienceType,
  SyncStatus,
  AIChannel,
  KnowledgeType,
  SocialEventType,
  EventStatus,
  ParticipantStatus,
  RoomShareStatus,
  ResponseStatus,
  ConversationType,
  ParticipantRole
}
