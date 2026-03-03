'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export default function LoginPage() {
  const t = useTranslations('auth.login')
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError(t('errors.requiredFields', { defaultValue: 'Please enter email and password' }))
      return
    }
    
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (success) {
        // Check for redirect URL
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin')
        if (redirectUrl) {
          sessionStorage.removeItem('redirectAfterLogin')
          window.location.href = redirectUrl
        } else {
          router.push('/')
          router.refresh()
        }
      } else {
        setError(t('errors.invalidCredentials', { defaultValue: 'Invalid email or password' }))
      }
    } catch (err) {
      setError(t('errors.generic', { defaultValue: 'Login failed, please try again' }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-500 mb-6">{t('subtitle')}</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder={t('emailPlaceholder', { defaultValue: 'your@email.com' })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">{t('rememberMe')}</span>
                </label>
                <Link href="/forgot-password" className="text-rose-500 hover:underline">
                  {t('forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg font-semibold"
              >
                {isLoading ? t('loading') : t('button')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {t('noAccount')}{' '}
              <Link href="/register" className="text-rose-500 hover:underline font-medium">
                {t('signupLink')}
              </Link>
            </div>

            {/* Demo accounts */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-3">{t('demoTitle')}</p>
              <div className="space-y-2">
                <button
                  onClick={() => { setEmail('demo@example.com'); setPassword('demo123'); }}
                  className="w-full p-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <span className="font-medium">{t('demoUser')}</span>
                  <span className="text-gray-500 ml-2">demo@example.com / demo123</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
