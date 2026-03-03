import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastStore {
  toasts: Toast[]
  add: (toast: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
  clear: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
  })),
  remove: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),
  clear: () => set({ toasts: [] }),
}))

// Hook for easier usage
export function useToast() {
  const { add } = useToastStore()
  
  return {
    success: (title: string, message?: string) => 
      add({ type: 'success', title, message }),
    error: (title: string, message?: string) => 
      add({ type: 'error', title, message }),
    warning: (title: string, message?: string) => 
      add({ type: 'warning', title, message }),
    info: (title: string, message?: string) => 
      add({ type: 'info', title, message }),
  }
}
