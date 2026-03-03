'use client'

import { Link } from '@/navigation'
import { Shield, UserCheck, Users, Sparkles, AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const safetyFeatures = [
  { icon: Shield, title: 'verifiedProperties', desc: 'verifiedPropertiesDesc' },
  { icon: UserCheck, title: 'guestProtection', desc: 'guestProtectionDesc' },
  { icon: Users, title: 'communityStandards', desc: 'communityStandardsDesc' },
  { icon: Sparkles, title: 'cleanSafe', desc: 'cleanSafeDesc' },
]

export default function SafetyPage() {
  const t = useTranslations('static.safety')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-8 shadow-sm flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-rose-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.title as any)}</h3>
                <p className="text-gray-600">{t(feature.desc as any)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-rose-500 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">{t('haveConcerns')}</h2>
              <p className="text-gray-600 mb-4">{t('teamAvailable')}</p>
              <button className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                {t('contactTeam')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
