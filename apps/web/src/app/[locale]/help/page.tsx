'use client'

import { Link } from '@/navigation'
import { BookOpen, Shield, CreditCard, MessageCircle, ChevronDown, ChevronUp, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const quickLinks = [
  { icon: BookOpen, key: 'bookingGuide' },
  { icon: Shield, key: 'safetyInfo' },
  { icon: CreditCard, key: 'payments' },
  { icon: MessageCircle, key: 'contactUs' },
]

const questions = [
  { question: 'reservation', answer: 'reservationAnswer' },
  { question: 'cancellation', answer: 'cancellationAnswer' },
  { question: 'passport', answer: 'passportAnswer' },
  { question: 'payment', answer: 'paymentAnswer' },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('static.help')

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium">{t(`questions.${question}` as any)}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <p className="pb-4 text-gray-600">{t(`questions.${answer}` as any)}</p>
      )}
    </div>
  )
}

export default function HelpPage() {
  const t = useTranslations('static.help')
  const tNav = useTranslations('nav')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-rose-500">tiaohai</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">{t('title')}</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {quickLinks.map((link) => (
            <div
              key={link.key}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <link.icon className="w-8 h-8 text-rose-500 mb-4" />
              <h3 className="font-semibold">{t(link.key as any)}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t('faqTitle')}</h2>
          <div className="space-y-2">
            {questions.map((q) => (
              <FAQItem key={q.question} question={q.question} answer={q.answer} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{t('stillNeedHelp')}</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
            <Mail className="w-5 h-5" />
            {t('emailUs')}
          </button>
        </div>
      </main>
    </div>
  )
}
