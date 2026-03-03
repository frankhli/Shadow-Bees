/**
 * Platform Store - 统一数据层
 * 管理整个平台的核心数据，确保各页面数据一致性
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ==================== 类型定义 ====================

export type OrderStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'refunding' | 'refunded'
export type UserRole = 'guest' | 'hotel_owner' | 'guide' | 'venue_owner' | 'admin'
export type ActivityStatus = 'draft' | 'active' | 'paused' | 'ended' | 'full'

// 用户
export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  nationality?: string
  language?: string
  avatar?: string
  role: UserRole
  createdAt: string
}

// 订单 - 统一订单模型
export interface Order {
  id: string
  userId: string
  userName: string
  userNationality: string
  type: 'hotel' | 'guide' | 'venue'
  // 关联ID
  hotelId?: string
  guideId?: string
  venueId?: string
  activityId?: string
  // 订单信息
  title: string
  description?: string
  amount: number
  platformFee: number
  netAmount: number
  status: OrderStatus
  // 时间
  bookingDate: string
  serviceDate?: string
  completedAt?: string
  // 人数
  guests: number
  // 支付
  paymentMethod?: string
  paidAt?: string
  // 其他
  notes?: string
  createdAt: string
  updatedAt: string
  // 退款相关
  refundAmount?: number
  refundReason?: string
  refundProcessedAt?: string
  refundRejectedReason?: string
  providerName?: string
}

// 活动/服务
export interface Activity {
  id: string
  type: 'hotel_room' | 'guide_service' | 'venue_experience'
  ownerId: string
  ownerName: string
  title: string
  description: string
  price: number
  currency: string
  capacity: number
  // 时间安排
  schedule: {
    type: 'daily' | 'weekly' | 'one_time'
    startTime: string
    endTime: string
    dates?: string[]
  }
  status: ActivityStatus
  bookedCount: number
  image?: string
  location?: string
  createdAt: string
}

// 财务交易记录
export interface Transaction {
  id: string
  type: 'income' | 'expense' | 'refund' | 'withdrawal'
  orderId?: string
  relatedId?: string
  userId: string
  userName: string
  amount: number
  currency: string
  description: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
}

// 审核申请
export interface ReviewApplication {
  id: string
  type: 'hotel' | 'guide' | 'venue'
  applicantId: string
  applicantName: string
  name?: string
  email?: string
  city?: string
  status: 'pending' | 'approved' | 'rejected'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectReason?: string
  documents?: string[]
  // 导游相关
  languages?: string[]
  experience?: string
  certifications?: string[]
  bio?: string
  avatar?: string
}

// 系统设置
export interface SystemSettings {
  notifications: {
    newOrder: boolean
    orderCancel: boolean
    lowInventory: boolean
    aiSuggestion: boolean
  }
  language: string
  currency: string
  timezone: string
}

// ==================== Store 状态定义 ====================

interface PlatformState {
  // ===== 核心数据 =====
  users: User[]
  orders: Order[]
  activities: Activity[]
  transactions: Transaction[]
  reviewApplications: ReviewApplication[]
  
  // ===== 当前登录用户 =====
  currentUser: User | null
  
  // ===== 系统设置 =====
  settings: SystemSettings
  
  // ===== 统计缓存 =====
  stats: {
    totalRevenue: number
    todayRevenue: number
    totalOrders: number
    todayOrders: number
    pendingReviews: number
  }
  
  // ===== 加载状态 =====
  isLoading: boolean
  loadingText: string
}

// ==================== Actions 定义 ====================

interface PlatformActions {
  // 用户管理
  setCurrentUser: (user: User | null) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  
  // 订单管理
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order
  updateOrder: (orderId: string, updates: Partial<Order>) => void
  deleteOrder: (orderId: string) => void
  getOrdersByUser: (userId: string) => Order[]
  getOrdersByStatus: (status: OrderStatus) => Order[]
  getOrdersByType: (type: Order['type']) => Order[]
  getTodayOrders: () => Order[]
  getWeekOrders: () => Order[]
  calculateRevenue: (filters?: { startDate?: string; endDate?: string; type?: Order['type'] }) => number
  
  // 活动管理
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => Activity
  updateActivity: (activityId: string, updates: Partial<Activity>) => void
  deleteActivity: (activityId: string) => void
  bookActivity: (activityId: string, count: number) => void
  
  // 财务管理
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Transaction
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void
  getTransactionsByUser: (userId: string) => Transaction[]
  getPendingWithdrawals: () => Transaction[]
  
  // 审核管理
  addReviewApplication: (application: Omit<ReviewApplication, 'id' | 'submittedAt'>) => ReviewApplication
  approveApplication: (applicationId: string, reviewerId: string) => void
  rejectApplication: (applicationId: string, reviewerId: string, reason: string) => void
  getPendingApplications: () => ReviewApplication[]
  
  // 设置管理
  updateSettings: (settings: Partial<SystemSettings>) => void
  updateNotificationSettings: (notifications: Partial<SystemSettings['notifications']>) => void
  
  // 统计更新
  recalculateStats: () => void
  
  // 加载状态
  setLoading: (loading: boolean, text?: string) => void
  
  // 数据初始化
  initializeMockData: () => void
  resetData: () => void
}

// ==================== 初始数据 ====================

const initialSettings: SystemSettings = {
  notifications: {
    newOrder: true,
    orderCancel: true,
    lowInventory: true,
    aiSuggestion: true,
  },
  language: 'zh-CN',
  currency: 'CNY',
  timezone: 'Asia/Shanghai',
}

// ==================== Mock 数据生成器 ====================

const generateMockOrders = (): Order[] => {
  const orders: Order[] = []
  const now = new Date()
  
  // Hotel 订单
  orders.push(
    {
      id: 'ORD240301001',
      userId: 'user1',
      userName: 'John Smith',
      userNationality: 'US',
      type: 'hotel',
      hotelId: 'hotel1',
      title: '胡同景观大床房',
      amount: 2400,
      platformFee: 360,
      netAmount: 2040,
      status: 'confirmed',
      bookingDate: '2024-03-01',
      serviceDate: '2024-03-01',
      guests: 2,
      createdAt: '2024-03-01T08:30:00Z',
      updatedAt: '2024-03-01T08:30:00Z',
    },
    {
      id: 'ORD240301002',
      userId: 'user2',
      userName: 'Maria Garcia',
      userNationality: 'ES',
      type: 'hotel',
      hotelId: 'hotel1',
      title: '传统四合院套房',
      amount: 4800,
      platformFee: 720,
      netAmount: 4080,
      status: 'pending',
      bookingDate: '2024-03-01',
      serviceDate: '2024-03-02',
      guests: 3,
      createdAt: '2024-03-01T09:15:00Z',
      updatedAt: '2024-03-01T09:15:00Z',
    },
    {
      id: 'ORD240301003',
      userId: 'user3',
      userName: '田中太郎',
      userNationality: 'JP',
      type: 'guide',
      guideId: 'guide1',
      title: '胡同文化深度游',
      amount: 1200,
      platformFee: 180,
      netAmount: 1020,
      status: 'completed',
      bookingDate: '2024-02-28',
      serviceDate: '2024-02-28',
      completedAt: '2024-02-28T12:00:00Z',
      guests: 4,
      createdAt: '2024-02-28T10:00:00Z',
      updatedAt: '2024-02-28T12:00:00Z',
    },
    {
      id: 'ORD240301004',
      userId: 'user4',
      userName: 'Pierre Dubois',
      userNationality: 'FR',
      type: 'venue',
      venueId: 'venue1',
      activityId: 'act1',
      title: '老北京茶馆品茗体验',
      amount: 672,
      platformFee: 100,
      netAmount: 572,
      status: 'completed',
      bookingDate: '2024-02-28',
      serviceDate: '2024-02-28',
      completedAt: '2024-02-28T16:00:00Z',
      guests: 4,
      createdAt: '2024-02-28T14:30:00Z',
      updatedAt: '2024-02-28T16:00:00Z',
    }
  )
  
  // 今天的订单
  for (let i = 0; i < 8; i++) {
    const types: Order['type'][] = ['hotel', 'guide', 'venue']
    const type = types[i % 3]
    const amount = type === 'hotel' ? 2400 : type === 'guide' ? 1200 : 500
    
    orders.push({
      id: `ORD240301${100 + i}`,
      userId: `user${i + 10}`,
      userName: ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry'][i],
      userNationality: ['US', 'UK', 'DE', 'FR', 'JP', 'ES', 'IT', 'AU'][i],
      type,
      title: type === 'hotel' ? '豪华大床房' : type === 'guide' ? '故宫深度游' : '京剧体验',
      amount,
      platformFee: Math.round(amount * 0.15),
      netAmount: Math.round(amount * 0.85),
      status: ['confirmed', 'completed', 'active'][i % 3] as OrderStatus,
      bookingDate: '2024-03-01',
      serviceDate: '2024-03-01',
      guests: [2, 3, 4, 1, 2, 3, 4, 2][i],
      createdAt: new Date(now.getTime() - i * 3600000).toISOString(),
      updatedAt: new Date(now.getTime() - i * 3600000).toISOString(),
    })
  }
  
  return orders
}

const generateMockApplications = (): ReviewApplication[] => [
  {
    id: 'APP001',
    type: 'hotel',
    applicantId: 'hotel_new1',
    applicantName: '悦榕庄精品酒店',
    city: '北京',
    status: 'pending',
    submittedAt: '2024-03-01T06:00:00Z',
  },
  {
    id: 'APP002',
    type: 'guide',
    applicantId: 'guide_new1',
    applicantName: '李导游',
    city: '上海',
    status: 'pending',
    submittedAt: '2024-03-01T05:00:00Z',
  },
  {
    id: 'APP003',
    type: 'venue',
    applicantId: 'venue_new1',
    applicantName: '故宫文创体验店',
    city: '北京',
    status: 'pending',
    submittedAt: '2024-03-01T03:00:00Z',
  },
  {
    id: 'APP004',
    type: 'hotel',
    applicantId: 'hotel_new2',
    applicantName: '西湖度假村',
    city: '杭州',
    status: 'pending',
    submittedAt: '2024-02-29T10:00:00Z',
  },
]

// ==================== Store 创建 ====================

export const usePlatformStore = create<PlatformState & PlatformActions>()(
  persist(
    (set, get) => ({
      // ===== 初始状态 =====
      users: [],
      orders: [],
      activities: [],
      transactions: [],
      reviewApplications: [],
      currentUser: null,
      settings: initialSettings,
      stats: {
        totalRevenue: 0,
        todayRevenue: 0,
        totalOrders: 0,
        todayOrders: 0,
        pendingReviews: 0,
      },
      isLoading: false,
      loadingText: '',

      // ===== 用户管理 =====
      setCurrentUser: (user) => set({ currentUser: user }),
      
      updateUser: (userId, updates) => set((state) => ({
        users: state.users.map(u => u.id === userId ? { ...u, ...updates } : u)
      })),

      // ===== 订单管理 =====
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: `ORD${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ orders: [order, ...state.orders] }))
        get().recalculateStats()
        return order
      },

      updateOrder: (orderId, updates) => set((state) => {
        const newOrders = state.orders.map(o => 
          o.id === orderId ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
        )
        return { orders: newOrders }
      }),

      deleteOrder: (orderId) => set((state) => ({
        orders: state.orders.filter(o => o.id !== orderId)
      })),

      getOrdersByUser: (userId) => {
        return get().orders.filter(o => o.userId === userId)
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter(o => o.status === status)
      },

      getOrdersByType: (type) => {
        return get().orders.filter(o => o.type === type)
      },

      getTodayOrders: () => {
        const today = new Date().toISOString().split('T')[0]
        return get().orders.filter(o => o.createdAt.startsWith(today))
      },

      getWeekOrders: () => {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return get().orders.filter(o => new Date(o.createdAt) >= weekAgo)
      },

      calculateRevenue: (filters) => {
        let orders = get().orders
        
        if (filters?.type) {
          orders = orders.filter(o => o.type === filters.type)
        }
        if (filters?.startDate) {
          orders = orders.filter(o => o.createdAt >= filters.startDate!)
        }
        if (filters?.endDate) {
          orders = orders.filter(o => o.createdAt <= filters.endDate!)
        }
        
        return orders.reduce((sum, o) => {
          if (o.status === 'completed' || o.status === 'confirmed') {
            return sum + o.netAmount
          }
          return sum
        }, 0)
      },

      // ===== 活动管理 =====
      addActivity: (activityData) => {
        const activity: Activity = {
          ...activityData,
          id: `ACT${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ activities: [activity, ...state.activities] }))
        return activity
      },

      updateActivity: (activityId, updates) => set((state) => ({
        activities: state.activities.map(a => 
          a.id === activityId ? { ...a, ...updates } : a
        )
      })),

      deleteActivity: (activityId) => set((state) => ({
        activities: state.activities.filter(a => a.id !== activityId)
      })),

      bookActivity: (activityId, count) => set((state) => ({
        activities: state.activities.map(a => 
          a.id === activityId ? { ...a, bookedCount: a.bookedCount + count } : a
        )
      })),

      // ===== 财务管理 =====
      addTransaction: (transactionData) => {
        const transaction: Transaction = {
          ...transactionData,
          id: `TRX${Date.now()}`,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ transactions: [transaction, ...state.transactions] }))
        return transaction
      },

      updateTransaction: (transactionId, updates) => set((state) => ({
        transactions: state.transactions.map(t => 
          t.id === transactionId ? { ...t, ...updates } : t
        )
      })),

      getTransactionsByUser: (userId) => {
        return get().transactions.filter(t => t.userId === userId)
      },

      getPendingWithdrawals: () => {
        return get().transactions.filter(t => 
          t.type === 'withdrawal' && t.status === 'pending'
        )
      },

      // ===== 审核管理 =====
      addReviewApplication: (applicationData) => {
        const application: ReviewApplication = {
          ...applicationData,
          id: `APP${Date.now()}`,
          submittedAt: new Date().toISOString(),
        }
        set((state) => ({ 
          reviewApplications: [application, ...state.reviewApplications] 
        }))
        return application
      },

      approveApplication: (applicationId, reviewerId) => set((state) => ({
        reviewApplications: state.reviewApplications.map(app => 
          app.id === applicationId ? { 
            ...app, 
            status: 'approved', 
            reviewedAt: new Date().toISOString(),
            reviewedBy: reviewerId 
          } : app
        )
      })),

      rejectApplication: (applicationId, reviewerId, reason) => set((state) => ({
        reviewApplications: state.reviewApplications.map(app => 
          app.id === applicationId ? { 
            ...app, 
            status: 'rejected', 
            reviewedAt: new Date().toISOString(),
            reviewedBy: reviewerId,
            rejectReason: reason
          } : app
        )
      })),

      getPendingApplications: () => {
        return get().reviewApplications.filter(a => a.status === 'pending')
      },

      // ===== 设置管理 =====
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings }
      })),

      updateNotificationSettings: (notifications) => set((state) => ({
        settings: {
          ...state.settings,
          notifications: { ...state.settings.notifications, ...notifications }
        }
      })),

      // ===== 统计更新 =====
      recalculateStats: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        
        const todayOrders = state.orders.filter(o => o.createdAt.startsWith(today))
        const todayRevenue = todayOrders.reduce((sum, o) => sum + o.netAmount, 0)
        
        const totalRevenue = state.orders.reduce((sum, o) => {
          if (o.status === 'completed' || o.status === 'confirmed') {
            return sum + o.netAmount
          }
          return sum
        }, 0)
        
        set({
          stats: {
            totalRevenue,
            todayRevenue,
            totalOrders: state.orders.length,
            todayOrders: todayOrders.length,
            pendingReviews: state.reviewApplications.filter(a => a.status === 'pending').length,
          }
        })
      },

      // ===== 加载状态 =====
      setLoading: (loading, text = '') => set({ isLoading: loading, loadingText: text }),

      // ===== 数据初始化 =====
      initializeMockData: () => {
        set({
          orders: generateMockOrders(),
          reviewApplications: generateMockApplications(),
          users: [
            { id: 'user1', name: 'John Smith', nationality: 'US', role: 'guest', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'user2', name: 'Maria Garcia', nationality: 'ES', role: 'guest', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'user3', name: '田中太郎', nationality: 'JP', role: 'guest', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'guide1', name: '张导游', role: 'guide', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'hotel1', name: '胡同里酒店', role: 'hotel_owner', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'venue1', name: '茶文化馆', role: 'venue_owner', createdAt: '2024-01-01T00:00:00Z' },
            { id: 'admin1', name: '管理员', role: 'admin', createdAt: '2024-01-01T00:00:00Z' },
          ],
        })
        get().recalculateStats()
      },

      resetData: () => set({
        users: [],
        orders: [],
        activities: [],
        transactions: [],
        reviewApplications: [],
        stats: {
          totalRevenue: 0,
          todayRevenue: 0,
          totalOrders: 0,
          todayOrders: 0,
          pendingReviews: 0,
        },
      }),
    }),
    {
      name: 'platform-storage',
      partialize: (state) => ({
        settings: state.settings,
        currentUser: state.currentUser,
      }),
    }
  )
)

// ==================== 便捷 Hooks ====================

export function useOrders() {
  const store = usePlatformStore()
  return {
    orders: store.orders,
    addOrder: store.addOrder,
    updateOrder: store.updateOrder,
    getTodayOrders: store.getTodayOrders,
    getWeekOrders: store.getWeekOrders,
    calculateRevenue: store.calculateRevenue,
  }
}

export function useStats() {
  const store = usePlatformStore()
  return {
    stats: store.stats,
    recalculateStats: store.recalculateStats,
  }
}

export function useReviewApplications() {
  const store = usePlatformStore()
  return {
    applications: store.reviewApplications,
    pendingApplications: store.getPendingApplications(),
    approveApplication: store.approveApplication,
    rejectApplication: store.rejectApplication,
  }
}
