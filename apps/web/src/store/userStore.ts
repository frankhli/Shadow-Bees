import { create } from 'zustand'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface UserState {
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => {
    set({ isLoggedIn: true, user })
    // Also save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('tiaohai_user', JSON.stringify(user))
    }
  },
  logout: () => {
    set({ isLoggedIn: false, user: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tiaohai_user')
    }
  },
  updateUser: (updates) => set((state) => ({ 
    user: state.user ? { ...state.user, ...updates } : null 
  })),
}))

// Hydrate store from localStorage on client side
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('tiaohai_user')
  if (stored) {
    try {
      const user = JSON.parse(stored)
      useUserStore.setState({ isLoggedIn: true, user })
    } catch {
      localStorage.removeItem('tiaohai_user')
    }
  }
}
