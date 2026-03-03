import { Injectable } from '@nestjs/common'
import { hostelsData, getHostelById, getHostelsByCity, getFeaturedHostels, searchHostels } from './hostels.mock'
import { mockOrders, getOrdersByUser, getOrderById, getOrdersByStatus } from './orders.mock'
import { mockGuides, getGuidesByCity, getGuideById, getGuidesByLanguage } from './guides.mock'
import { mockExperiences, getExperiencesByCity, getExperienceById, getExperiencesByType } from './experiences.mock'
import { mockSocialEvents, mockRoomShares, getEventsByCity, getRoomSharesByCity, getEventById, getRoomShareById } from './social.mock'
import { mockConversations, mockMessages, currentUser, getConversationsByUser, getMessagesByConversation, getConversationById } from './chat.mock'

@Injectable()
export class MockDataService {
  // ========== Hostels ==========
  async getHostels(filters: { city?: string; query?: string; page?: number; limit?: number }) {
    let data = hostelsData
    
    if (filters.city && filters.city !== 'all') {
      data = getHostelsByCity(filters.city)
    }
    
    if (filters.query) {
      data = searchHostels(filters.query)
    }
    
    const page = filters.page || 1
    const limit = filters.limit || 20
    const start = (page - 1) * limit
    const end = start + limit
    
    return {
      data: data.slice(start, end),
      meta: {
        total: data.length,
        page,
        limit,
        totalPages: Math.ceil(data.length / limit),
      },
    }
  }

  async getHostelById(id: string) {
    return getHostelById(id)
  }

  async getFeaturedHostels(limit: number = 8) {
    return getFeaturedHostels(limit)
  }

  // ========== Orders ==========
  async getOrders(filters: { userId?: string; status?: string }) {
    let data = mockOrders
    
    if (filters.userId) {
      data = getOrdersByUser(filters.userId)
    }
    
    if (filters.status && filters.status !== 'all') {
      data = data.filter(o => o.status === filters.status)
    }
    
    return data
  }

  async getOrderById(id: string) {
    return getOrderById(id)
  }

  // ========== Guides ==========
  async getGuides(filters: { city?: string; language?: string }) {
    let data = mockGuides
    
    if (filters.city && filters.city !== 'all') {
      data = getGuidesByCity(filters.city)
    }
    
    if (filters.language) {
      data = getGuidesByLanguage(filters.language)
    }
    
    return data
  }

  async getGuideById(id: string) {
    return getGuideById(id)
  }

  // ========== Experiences ==========
  async getExperiences(filters: { city?: string; type?: string }) {
    let data = mockExperiences
    
    if (filters.city && filters.city !== 'all') {
      data = getExperiencesByCity(filters.city)
    }
    
    if (filters.type && filters.type !== 'all') {
      data = getExperiencesByType(filters.type)
    }
    
    return data
  }

  async getExperienceById(id: string) {
    return getExperienceById(id)
  }

  // ========== Social ==========
  async getEvents(filters: { city?: string }) {
    return getEventsByCity(filters.city)
  }

  async getEventById(id: string) {
    return getEventById(id)
  }

  async getRoomShares(filters: { city?: string }) {
    return getRoomSharesByCity(filters.city)
  }

  async getRoomShareById(id: string) {
    return getRoomShareById(id)
  }

  // ========== Chat ==========
  async getConversations(userId: string) {
    return getConversationsByUser(userId)
  }

  async getConversationById(id: string) {
    return getConversationById(id)
  }

  async getMessages(conversationId: string) {
    return getMessagesByConversation(conversationId)
  }

  async getCurrentUser() {
    return currentUser
  }
}
