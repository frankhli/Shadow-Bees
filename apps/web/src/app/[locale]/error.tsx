'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import { useRouter } from '@/navigation'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter()

  useEffect(() => {
    // Log error to monitoring service
    console.error('Application Error:', error)
    
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error)
    // }
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-2">
          We apologize for the inconvenience. Our team has been notified.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Error Details:</p>
            <p className="text-sm text-red-600 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Error ID for production */}
        {error.digest && process.env.NODE_ENV !== 'development' && (
          <p className="text-xs text-gray-400 mt-4">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2"
            variant="default"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            className="flex-1 flex items-center justify-center gap-2"
            variant="outline"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        {/* Beta Badge */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Beta Version
          </span>
        </div>
      </div>
    </div>
  )
}
