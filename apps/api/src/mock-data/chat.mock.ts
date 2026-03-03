/**
 * Chat Mock Data
 * Conversations and messages
 */

export interface Conversation {
  id: string
  type: 'direct' | 'group' | 'event' | 'room_share' | 'support'
  title?: string
  participants: {
    id: string
    name: string
    avatar?: string
    role?: string
    nationality?: string
  }[]
  lastMessage?: {
    content: string
    contentType: string
    createdAt: string
    senderId: string
  }
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  contentType: 'text' | 'image' | 'location' | 'booking'
  createdAt: string
  isDeleted: boolean
  metadata?: {
    bookingId?: string
    imageUrl?: string
    location?: { lat: number; lng: number; address: string }
  }
}

// Current user (for reference)
export const currentUser = {
  id: 'user-001',
  name: 'Emma Johnson',
  email: 'emma@example.com',
  nationality: 'UK',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop',
}

// Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    type: 'direct',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'guide-sh-001', name: 'Mary Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&fit=crop', role: 'guide' },
    ],
    lastMessage: {
      content: 'Hi Emma! Looking forward to our food tour tomorrow. Meet at 10am at Jing\'an Temple?',
      contentType: 'text',
      createdAt: '2026-03-14T18:30:00Z',
      senderId: 'guide-sh-001',
    },
    unreadCount: 1,
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-14T18:30:00Z',
  },
  {
    id: 'conv-002',
    type: 'group',
    title: 'Diving Pirate Friday Crew 🍻',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'host-sh-001', name: 'Alex', role: 'host' },
      { id: 'u1', name: 'Marco', nationality: 'IT' },
      { id: 'u2', name: 'Yuki', nationality: 'JP' },
      { id: 'u3', name: 'James', nationality: 'US' },
    ],
    lastMessage: {
      content: 'Who\'s joining tonight? Starting at 8pm!',
      contentType: 'text',
      createdAt: '2026-03-14T12:00:00Z',
      senderId: 'host-sh-001',
    },
    unreadCount: 3,
    createdAt: '2026-03-08T14:00:00Z',
    updatedAt: '2026-03-14T12:00:00Z',
  },
  {
    id: 'conv-003',
    type: 'direct',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'host-sh-001', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop', role: 'hostel' },
    ],
    lastMessage: {
      content: 'Your booking for March 15-20 is confirmed! Check-in is at 2pm.',
      contentType: 'text',
      createdAt: '2026-02-20T10:35:00Z',
      senderId: 'host-sh-001',
    },
    unreadCount: 0,
    createdAt: '2026-02-20T10:30:00Z',
    updatedAt: '2026-02-20T10:35:00Z',
  },
  {
    id: 'conv-004',
    type: 'group',
    title: 'Shanghai Room Share - The Diving Pirate',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'u19', name: 'Marco', nationality: 'IT' },
      { id: 'u31', name: 'Sofia', nationality: 'ES' },
    ],
    lastMessage: {
      content: 'Hey everyone! I\'m arriving on the 24th. Excited to meet you all!',
      contentType: 'text',
      createdAt: '2026-03-13T15:20:00Z',
      senderId: 'u19',
    },
    unreadCount: 0,
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-13T15:20:00Z',
  },
  {
    id: 'conv-005',
    type: 'direct',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'guide-cd-001', name: 'Panda Sister', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop', role: 'guide' },
    ],
    lastMessage: {
      content: 'The pandas are most active in the morning. I\'ll pick you up at 7:30am!',
      contentType: 'text',
      createdAt: '2026-02-25T20:00:00Z',
      senderId: 'guide-cd-001',
    },
    unreadCount: 0,
    createdAt: '2026-02-25T14:20:00Z',
    updatedAt: '2026-02-25T20:00:00Z',
  },
  {
    id: 'conv-006',
    type: 'support',
    title: 'Tiaohai Support',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'support-001', name: 'Support Team', role: 'support' },
    ],
    lastMessage: {
      content: 'Is there anything else I can help you with today?',
      contentType: 'text',
      createdAt: '2026-03-01T09:00:00Z',
      senderId: 'support-001',
    },
    unreadCount: 0,
    createdAt: '2026-03-01T08:45:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
  },
  {
    id: 'conv-007',
    type: 'group',
    title: 'Food Tour Shanghai Group 🥟',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'guide-sh-001', name: 'Mary', role: 'guide' },
      { id: 'u32', name: 'Pierre', nationality: 'FR' },
      { id: 'u33', name: 'Anna', nationality: 'DE' },
    ],
    lastMessage: {
      content: 'Don\'t eat breakfast tomorrow! We\'ll try so much food 🤤',
      contentType: 'text',
      createdAt: '2026-03-14T10:00:00Z',
      senderId: 'guide-sh-001',
    },
    unreadCount: 2,
    createdAt: '2026-03-12T16:00:00Z',
    updatedAt: '2026-03-14T10:00:00Z',
  },
  {
    id: 'conv-008',
    type: 'direct',
    participants: [
      { id: 'user-001', name: 'Emma Johnson' },
      { id: 'host-cd-001', name: 'Panda Sister Hostel', role: 'hostel' },
    ],
    lastMessage: {
      content: 'Hotpot tonight at 7pm! Don\'t be late, we have a special Sichuan peppercorn surprise 🔥',
      contentType: 'text',
      createdAt: '2026-02-28T16:30:00Z',
      senderId: 'host-cd-001',
    },
    unreadCount: 0,
    createdAt: '2026-02-25T18:00:00Z',
    updatedAt: '2026-02-28T16:30:00Z',
  },
]

// Messages for each conversation
export const mockMessages: Record<string, Message[]> = {
  'conv-001': [
    {
      id: 'msg-001-1',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: 'Hi Mary! I booked the food tour for March 15th. Can\'t wait!',
      contentType: 'text',
      createdAt: '2026-03-10T10:05:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-2',
      conversationId: 'conv-001',
      senderId: 'guide-sh-001',
      content: 'Hi Emma! Welcome to Shanghai! I\'m so excited to show you around. Do you have any dietary restrictions?',
      contentType: 'text',
      createdAt: '2026-03-10T10:15:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-3',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: 'No restrictions, I eat everything! Especially excited to try xiaolongbao 🥟',
      contentType: 'text',
      createdAt: '2026-03-10T10:20:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-4',
      conversationId: 'conv-001',
      senderId: 'guide-sh-001',
      content: 'Perfect! I know the best place. It\'s a locals-only spot. See you at Jing\'an Temple Metro Exit 1 at 10am?',
      contentType: 'text',
      createdAt: '2026-03-10T10:25:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-5',
      conversationId: 'conv-001',
      senderId: 'user-001',
      content: 'Perfect! I\'ll be there. Should I bring anything?',
      contentType: 'text',
      createdAt: '2026-03-10T10:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-6',
      conversationId: 'conv-001',
      senderId: 'guide-sh-001',
      content: 'Just your appetite! And maybe comfortable walking shoes. We\'ll be walking about 5km.',
      contentType: 'text',
      createdAt: '2026-03-10T10:35:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-001-7',
      conversationId: 'conv-001',
      senderId: 'guide-sh-001',
      content: 'Hi Emma! Looking forward to our food tour tomorrow. Meet at 10am at Jing\'an Temple?',
      contentType: 'text',
      createdAt: '2026-03-14T18:30:00Z',
      isDeleted: false,
    },
  ],
  'conv-002': [
    {
      id: 'msg-002-1',
      conversationId: 'conv-002',
      senderId: 'host-sh-001',
      content: 'Welcome everyone to the Friday Crew! 🎉',
      contentType: 'text',
      createdAt: '2026-03-08T14:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-2',
      conversationId: 'conv-002',
      senderId: 'u1',
      content: 'Hey! Marco from Italy here. First time in Shanghai!',
      contentType: 'text',
      createdAt: '2026-03-08T14:05:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-3',
      conversationId: 'conv-002',
      senderId: 'u2',
      content: 'Yuki from Japan! Love craft beer 🍺',
      contentType: 'text',
      createdAt: '2026-03-08T14:10:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-4',
      conversationId: 'conv-002',
      senderId: 'user-001',
      content: 'Emma from UK! Excited for tonight!',
      contentType: 'text',
      createdAt: '2026-03-08T14:15:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-5',
      conversationId: 'conv-002',
      senderId: 'host-sh-001',
      content: 'Tonight\'s plan: Diving Pirate → Liquid Laundry → Revolucion → สล็อต777',
      contentType: 'text',
      createdAt: '2026-03-13T18:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-6',
      conversationId: 'conv-002',
      senderId: 'u3',
      content: 'Last week was epic! Count me in 🍻',
      contentType: 'text',
      createdAt: '2026-03-13T19:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-002-7',
      conversationId: 'conv-002',
      senderId: 'host-sh-001',
      content: 'Who\'s joining tonight? Starting at 8pm!',
      contentType: 'text',
      createdAt: '2026-03-14T12:00:00Z',
      isDeleted: false,
    },
  ],
  'conv-003': [
    {
      id: 'msg-003-1',
      conversationId: 'conv-003',
      senderId: 'user-001',
      content: 'Hi! I just booked a 5-night stay from March 15th. Can you confirm?',
      contentType: 'text',
      createdAt: '2026-02-20T10:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-003-2',
      conversationId: 'conv-003',
      senderId: 'host-sh-001',
      content: 'Hi Emma! Yes, I see your booking. 4-Bed Mixed Dorm for 2 beds, March 15-20.',
      contentType: 'text',
      createdAt: '2026-02-20T10:32:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-003-3',
      conversationId: 'conv-003',
      senderId: 'host-sh-001',
      content: 'Your booking for March 15-20 is confirmed! Check-in is at 2pm.',
      contentType: 'text',
      createdAt: '2026-02-20T10:35:00Z',
      isDeleted: false,
      metadata: {
        bookingId: 'ord-001',
      },
    },
  ],
  'conv-004': [
    {
      id: 'msg-004-1',
      conversationId: 'conv-004',
      senderId: 'user-001',
      content: 'Hi everyone! I\'m Emma from UK. Looking forward to sharing the dorm with you!',
      contentType: 'text',
      createdAt: '2026-03-10T09:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-004-2',
      conversationId: 'conv-004',
      senderId: 'u19',
      content: 'Ciao! Marco from Italy here. I love photography too!',
      contentType: 'text',
      createdAt: '2026-03-10T09:15:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-004-3',
      conversationId: 'conv-004',
      senderId: 'u31',
      content: 'Hola! Sofia from Spain. When do you both arrive?',
      contentType: 'text',
      createdAt: '2026-03-10T09:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-004-4',
      conversationId: 'conv-004',
      senderId: 'user-001',
      content: 'I\'m there March 25-30. Planning to hit Diving Pirate a lot! 🍺',
      contentType: 'text',
      createdAt: '2026-03-10T10:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-004-5',
      conversationId: 'conv-004',
      senderId: 'u19',
      content: 'Hey everyone! I\'m arriving on the 24th. Excited to meet you all!',
      contentType: 'text',
      createdAt: '2026-03-13T15:20:00Z',
      isDeleted: false,
    },
  ],
  'conv-005': [
    {
      id: 'msg-005-1',
      conversationId: 'conv-005',
      senderId: 'user-001',
      content: 'Hi! I booked the panda volunteer program for April 2nd. So excited!',
      contentType: 'text',
      createdAt: '2026-02-25T14:20:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-005-2',
      conversationId: 'conv-005',
      senderId: 'guide-cd-001',
      content: 'Hi Emma! You\'re going to LOVE it! The pandas are so cute in the morning.',
      contentType: 'text',
      createdAt: '2026-02-25T15:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-005-3',
      conversationId: 'conv-005',
      senderId: 'guide-cd-001',
      content: 'I\'ll pick you up at your hostel at 7:30am so we can beat the crowds.',
      contentType: 'text',
      createdAt: '2026-02-25T15:05:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-005-4',
      conversationId: 'conv-005',
      senderId: 'user-001',
      content: 'Perfect! Should I wear anything special?',
      contentType: 'text',
      createdAt: '2026-02-25T16:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-005-5',
      conversationId: 'conv-005',
      senderId: 'guide-cd-001',
      content: 'Comfortable clothes and closed shoes. No perfume - pandas have sensitive noses!',
      contentType: 'text',
      createdAt: '2026-02-25T16:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-005-6',
      conversationId: 'conv-005',
      senderId: 'guide-cd-001',
      content: 'The pandas are most active in the morning. I\'ll pick you up at 7:30am!',
      contentType: 'text',
      createdAt: '2026-02-25T20:00:00Z',
      isDeleted: false,
    },
  ],
  'conv-006': [
    {
      id: 'msg-006-1',
      conversationId: 'conv-006',
      senderId: 'user-001',
      content: 'Hi, I need help changing my booking dates.',
      contentType: 'text',
      createdAt: '2026-03-01T08:45:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-006-2',
      conversationId: 'conv-006',
      senderId: 'support-001',
      content: 'Hello Emma! I\'d be happy to help. Which booking would you like to modify?',
      contentType: 'text',
      createdAt: '2026-03-01T08:50:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-006-3',
      conversationId: 'conv-006',
      senderId: 'user-001',
      content: 'The one in Chengdu, April 1-4. I need to move it to April 5-8.',
      contentType: 'text',
      createdAt: '2026-03-01T08:55:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-006-4',
      conversationId: 'conv-006',
      senderId: 'support-001',
      content: 'Let me check availability for those dates...',
      contentType: 'text',
      createdAt: '2026-03-01T09:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-006-5',
      conversationId: 'conv-006',
      senderId: 'support-001',
      content: 'Good news! The hostel has availability. I\'ve updated your booking. Is there anything else I can help you with today?',
      contentType: 'text',
      createdAt: '2026-03-01T09:00:00Z',
      isDeleted: false,
    },
  ],
  'conv-007': [
    {
      id: 'msg-007-1',
      conversationId: 'conv-007',
      senderId: 'guide-sh-001',
      content: 'Welcome to the food tour group! 🥟',
      contentType: 'text',
      createdAt: '2026-03-12T16:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-007-2',
      conversationId: 'conv-007',
      senderId: 'u32',
      content: 'Pierre from France. Can\'t wait to try real Chinese food!',
      contentType: 'text',
      createdAt: '2026-03-12T16:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-007-3',
      conversationId: 'conv-007',
      senderId: 'u33',
      content: 'Anna from Germany. I\'ve heard Shanghai food is amazing!',
      contentType: 'text',
      createdAt: '2026-03-12T17:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-007-4',
      conversationId: 'conv-007',
      senderId: 'user-001',
      content: 'Emma here! I\'m so hungry already 😅',
      contentType: 'text',
      createdAt: '2026-03-12T18:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-007-5',
      conversationId: 'conv-007',
      senderId: 'guide-sh-001',
      content: 'Don\'t eat breakfast tomorrow! We\'ll try so much food 🤤',
      contentType: 'text',
      createdAt: '2026-03-14T10:00:00Z',
      isDeleted: false,
    },
  ],
  'conv-008': [
    {
      id: 'msg-008-1',
      conversationId: 'conv-008',
      senderId: 'host-cd-001',
      content: 'Welcome to Panda Base Hostel Emma! 🐼',
      contentType: 'text',
      createdAt: '2026-02-25T18:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-008-2',
      conversationId: 'conv-008',
      senderId: 'user-001',
      content: 'Thanks! So excited to be here. When is the next hotpot night?',
      contentType: 'text',
      createdAt: '2026-02-25T18:30:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-008-3',
      conversationId: 'conv-008',
      senderId: 'host-cd-001',
      content: 'Tonight! We do hotpot every night at 7pm. Join us!',
      contentType: 'text',
      createdAt: '2026-02-25T19:00:00Z',
      isDeleted: false,
    },
    {
      id: 'msg-008-4',
      conversationId: 'conv-008',
      senderId: 'host-cd-001',
      content: 'Hotpot tonight at 7pm! Don\'t be late, we have a special Sichuan peppercorn surprise 🔥',
      contentType: 'text',
      createdAt: '2026-02-28T16:30:00Z',
      isDeleted: false,
    },
  ],
}

// Helper functions
export function getConversationsByUser(userId: string): Conversation[] {
  return mockConversations.filter(c => 
    c.participants.some(p => p.id === userId)
  )
}

export function getMessagesByConversation(conversationId: string): Message[] {
  return mockMessages[conversationId] || []
}

export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find(c => c.id === id)
}
