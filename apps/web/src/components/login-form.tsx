'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AnimatedButton } from '@/components/ui/AnimatedButton'
import { ErrorMessage } from '@/components/ui/ErrorMessage'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { Link } from '@/navigation'
import { LogIn } from 'lucide-react'

export function LoginForm() {
  const t = useTranslations('auth.login')
  const { login } = useAuth()
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirect, setRedirect] = useState('/')

  // Get redirect from URL on client side only to avoid hydration mismatch
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRedirect(params.get('redirect') || '/')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push(redirect)
      } else {
        setError(t('errors.invalidCredentials'))
      }
    } catch (err) {
      setError(t('errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ErrorMessage 
            error={error} 
            onDismiss={() => setError('')}
            variant="banner"
          />
          
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-field-focus"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-field-focus"
            />
          </div>

          <AnimatedButton 
            type="submit" 
            className="w-full"
            loading={loading}
            loadingText={t('loading')}
            icon={<LogIn className="w-4 h-4" />}
          >
            {t('button')}
          </AnimatedButton>

          <p className="text-center text-sm text-gray-600">
            {t('noAccount')}{' '}
            <Link 
              href="/register" 
              className="text-cyan-600 hover:underline link-underline"
            >
              {t('signupLink')}
            </Link>
          </p>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm font-medium text-gray-700 mb-3">{t('demoTitle')}</p>
          <div className="grid gap-2">
            <AnimatedButton 
              variant="outline" 
              size="sm"
              onClick={() => {
                setEmail('guest@example.com')
                setPassword('password')
              }}
            >
              {t('demoUser')}
            </AnimatedButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
