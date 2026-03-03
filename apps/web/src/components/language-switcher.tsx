'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/navigation'
import { locales, localeNames, localeCodes, type Locale } from '@/i18n/config'
import { Globe, Check } from 'lucide-react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function switchLocale(nextLocale: Locale) {
    // pathname from @/navigation excludes locale prefix
    // Construct new URL directly
    const newPath = `/${nextLocale}${pathname}`
    window.location.href = newPath
    setIsOpen(false)
  }

  // Prevent hydration mismatch - render simplified version on server
  if (!mounted) {
    return (
      <div className="relative">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Globe className="w-4 h-4" />
          <span className="uppercase">{locale}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-scale-in">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  locale === loc ? 'bg-gray-50 font-medium' : ''
                }`}
              >
                <span className="text-xs font-bold text-gray-500 w-6 h-6 flex items-center justify-center border border-gray-300 rounded">{localeCodes[loc]}</span>
                <span className="text-sm">{localeNames[loc]}</span>
                {locale === loc && (
                  <span className="ml-auto text-rose-500"><Check className="w-4 h-4" /></span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
