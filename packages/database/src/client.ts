import { PrismaClient as BasePrismaClient } from '@prisma/client'

export const PrismaClient = BasePrismaClient
export type PrismaClient = BasePrismaClient

// Enums - both as values and types
export const HotelStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  REJECTED: 'REJECTED'
} as const
export type HotelStatus = typeof HotelStatus[keyof typeof HotelStatus]

export const GuideStatus = {
  ACTIVE: 'ACTIVE',
  BUSY: 'BUSY',
  SUSPENDED: 'SUSPENDED',
  INACTIVE: 'INACTIVE'
} as const
export type GuideStatus = typeof GuideStatus[keyof typeof GuideStatus]

export const OrderStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
} as const
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus]

export const OrderType = {
  ACCOMMODATION_ONLY: 'ACCOMMODATION_ONLY',
  GUIDE_ONLY: 'GUIDE_ONLY',
  EXPERIENCE_ONLY: 'EXPERIENCE_ONLY',
  BUNDLE: 'BUNDLE'
} as const
export type OrderType = typeof OrderType[keyof typeof OrderType]

export const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED'
} as const
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus]

export const UserRole = {
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
  HOTEL_OWNER: 'HOTEL_OWNER',
  GUIDE: 'GUIDE'
} as const
export type UserRole = typeof UserRole[keyof typeof UserRole]

export const ExperienceType = {
  WORKSHOP: 'WORKSHOP',
  DINING: 'DINING',
  SHOPPING: 'SHOPPING',
  TOUR: 'TOUR'
} as const
export type ExperienceType = typeof ExperienceType[keyof typeof ExperienceType]

export const SyncStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PENDING: 'PENDING'
} as const
export type SyncStatus = typeof SyncStatus[keyof typeof SyncStatus]

export const AIChannel = {
  WHATSAPP: 'WHATSAPP',
  WEB: 'WEB',
  BOOKING_MSG: 'BOOKING_MSG',
  WECHAT: 'WECHAT'
} as const
export type AIChannel = typeof AIChannel[keyof typeof AIChannel]

export const KnowledgeType = {
  HOTEL_FACILITY: 'HOTEL_FACILITY',
  VISA_POLICY: 'VISA_POLICY',
  POI_NEARBY: 'POI_NEARBY',
  CULTURAL_TIP: 'CULTURAL_TIP',
  EMERGENCY: 'EMERGENCY',
  FAQ: 'FAQ'
} as const
export type KnowledgeType = typeof KnowledgeType[keyof typeof KnowledgeType]

// Social Feature Enums
export const SocialEventType = {
  PUB_CRAWL: 'PUB_CRAWL',
  CITY_WALK: 'CITY_WALK',
  FOOD_TOUR: 'FOOD_TOUR',
  WORKSHOP: 'WORKSHOP',
  OTHER: 'OTHER'
} as const
export type SocialEventType = typeof SocialEventType[keyof typeof SocialEventType]

export const EventStatus = {
  OPEN: 'OPEN',
  FULL: 'FULL',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const
export type EventStatus = typeof EventStatus[keyof typeof EventStatus]

export const ParticipantStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  ATTENDED: 'ATTENDED',
  NO_SHOW: 'NO_SHOW'
} as const
export type ParticipantStatus = typeof ParticipantStatus[keyof typeof ParticipantStatus]

export const RoomShareStatus = {
  OPEN: 'OPEN',
  FILLED: 'FILLED',
  CLOSED: 'CLOSED',
  EXPIRED: 'EXPIRED'
} as const
export type RoomShareStatus = typeof RoomShareStatus[keyof typeof RoomShareStatus]

export const ResponseStatus = {
  INTERESTED: 'INTERESTED',
  CONFIRMED: 'CONFIRMED',
  DECLINED: 'DECLINED'
} as const
export type ResponseStatus = typeof ResponseStatus[keyof typeof ResponseStatus]

// Chat Enums
export const ConversationType = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
  EVENT: 'EVENT',
  ROOM_SHARE: 'ROOM_SHARE'
} as const
export type ConversationType = typeof ConversationType[keyof typeof ConversationType]

export const ParticipantRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
} as const
export type ParticipantRole = typeof ParticipantRole[keyof typeof ParticipantRole]
