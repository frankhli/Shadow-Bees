'use client'

import { Link } from '@/navigation'
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const policies = [
  { 
    name: 'flexible', 
    desc: 'flexibleDesc',
    icon: CheckCircle,
    features: 'flexibleFeatures'
  },
  { 
    name: 'moderate', 
    desc: 'moderateDesc',
    icon: AlertCircle,
    features: 'moderateFeatures'
  },
  { 
    name: 'strict', 
    desc: 'strictDesc',
    icon: XCircle,
    features: 'strictFeatures'
  },
]

const stepKeys = [
  'steps.step1',
  'steps.step2', 
  'steps.step3',
  'steps.step4'
]

export default function CancellationPage() {
  const t = useTranslations('static.cancellation')
  const tCommon = useTranslations('common')

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

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {policies.map((policy) => (
            <div
              key={policy.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <policy.icon className="w-6 h-6 text-rose-500" />
                <h3 className="text-xl font-semibold capitalize">{t(policy.name as any)}</h3>
              </div>
              <p className="text-gray-600 mb-4">{t(policy.desc as any)}</p>
              <ul className="space-y-2">
                {(t.raw(policy.features as any) as string[]).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t('howToCancel')}</h2>
          <div className="space-y-4">
            {stepKeys.map((key, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{t(key as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
