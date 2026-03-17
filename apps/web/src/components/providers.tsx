'use client'

import { ReactNode } from 'react'
import { UserProvider } from './user-provider'
import { AuthProvider } from '@/contexts/auth-context'
import { ToastContainer } from './ui/Toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UserProvider>
        {children}
        <ToastContainer />
      </UserProvider>
    </AuthProvider>
  )
}
