import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from '@/i18n/config'
import { Providers } from '@/components/providers'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages({ locale: locale as Locale })
  
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate locale - fall back to default if invalid
  const validLocale = locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : defaultLocale

  const messages = await getMessages({ locale: validLocale })

  return (
    <html lang={validLocale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={validLocale}>
          <Providers>
            <GlobalErrorBoundary>
              {children}
            </GlobalErrorBoundary>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
