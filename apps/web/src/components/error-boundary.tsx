'use client'

import React from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

/**
 * Global Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
    
    // In production, you would send this to an error tracking service
    // like Sentry, LogRocket, or your own logging endpoint
    if (process.env.NODE_ENV === 'production') {
      // Example: sentry.captureException(error, { extra: errorInfo })
      this.logErrorToService(error, errorInfo)
    }
  }

  private logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
    // Placeholder for error logging service integration
    // TODO: Integrate with Sentry or similar service
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
      }),
    }).catch(() => {
      // Silent fail - don't break the error boundary itself
    })
  }

  private handleRetry = () => {
    // Reset error state and attempt to re-render
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    
    // Optional: Reload the page if the error persists
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error} 
        onRetry={this.handleRetry}
        onGoHome={this.handleGoHome}
      />
    }

    return this.props.children
  }
}

/**
 * Error Fallback UI Component
 */
interface ErrorFallbackProps {
  error?: Error
  onRetry: () => void
  onGoHome: () => void
}

function ErrorFallback({ error, onRetry, onGoHome }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#141B2D] rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h1>
        
        {/* Error Message */}
        <p className="text-gray-400 mb-4">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-[#1E2746] rounded-lg p-4 mb-6 text-left overflow-auto max-h-40">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Error Details (Dev Only)
            </p>
            <p className="text-sm text-red-600 font-mono break-words">
              {error.message}
            </p>
            {error.stack && (
              <pre className="text-xs text-gray-400 mt-2 overflow-auto">
                {error.stack.split('\n').slice(0, 5).join('\n')}
              </pre>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00F0FF] hover:bg-[#00D0DD] text-white font-medium rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            onClick={onGoHome}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#252D4A] hover:bg-[#2D3655] text-gray-300 font-medium rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Support Contact */}
        <p className="mt-6 text-sm text-gray-400">
          If this problem persists, please contact{' '}
          <a 
            href="mailto:support@tiaohai.com" 
            className="text-[#00F0FF] hover:underline"
          >
            support@tiaohai.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default GlobalErrorBoundary
