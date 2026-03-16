'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, ArrowLeft } from 'lucide-react'
import { useRouter } from '@/navigation'

interface HotelErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function HotelErrorBoundary({ error, reset }: HotelErrorBoundaryProps) {
  const router = useRouter()

  useEffect(() => {
    console.error('Hotel Detail Page Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        {/* Error Title */}
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Unable to load hotel details
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 mb-4">
          We couldn&apos;t load the hotel information. This might be a temporary issue.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-red-600 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Button
            onClick={() => router.push('/hotels')}
            className="flex-1"
            variant="outline"
          >
            Browse Hotels
          </Button>
        </div>
      </div>
    </div>
  )
}
