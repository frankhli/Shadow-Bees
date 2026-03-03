'use client'

import { cn } from '@/lib/utils'

type LanguageCode = 'zh' | 'en' | 'es' | 'fr' | 'de' | 'ja'
type NationalityCode = 'CN' | 'US' | 'ES' | 'FR' | 'DE' | 'JP' | 'GB' | 'AU' | 'CA' | 'MX' | 'AR' | 'IT'

interface LanguageBadgeProps {
  code: LanguageCode
  showFlag?: boolean
  className?: string
}

interface NationalityBadgeProps {
  code: NationalityCode
  showFlag?: boolean
  className?: string
}

const languageInfo: Record<LanguageCode, { name: string; flag: string }> = {
  zh: { name: '中文', flag: '🇨🇳' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ja: { name: '日本語', flag: '🇯🇵' },
}

const nationalityInfo: Record<NationalityCode, { name: string; flag: string }> = {
  CN: { name: '中国', flag: '🇨🇳' },
  US: { name: '美国', flag: '🇺🇸' },
  ES: { name: '西班牙', flag: '🇪🇸' },
  FR: { name: '法国', flag: '🇫🇷' },
  DE: { name: '德国', flag: '🇩🇪' },
  JP: { name: '日本', flag: '🇯🇵' },
  GB: { name: '英国', flag: '🇬🇧' },
  AU: { name: '澳大利亚', flag: '🇦🇺' },
  CA: { name: '加拿大', flag: '🇨🇦' },
  MX: { name: '墨西哥', flag: '🇲🇽' },
  AR: { name: '阿根廷', flag: '🇦🇷' },
  IT: { name: '意大利', flag: '🇮🇹' },
}

export function LanguageBadge({ code, showFlag = true, className }: LanguageBadgeProps) {
  const info = languageInfo[code]
  if (!info) return null

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
      'bg-slate-800 text-slate-300',
      className
    )}>
      {showFlag && <span>{info.flag}</span>}
      <span>{info.name}</span>
    </span>
  )
}

export function NationalityBadge({ code, showFlag = true, className }: NationalityBadgeProps) {
  const info = nationalityInfo[code]
  if (!info) return null

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
      'bg-slate-800 text-slate-300',
      className
    )}>
      {showFlag && <span>{info.flag}</span>}
      <span>{info.name}</span>
    </span>
  )
}

// 组合组件：同时显示国籍和语言
interface GuestIdentityProps {
  nationality: NationalityCode | string
  language: LanguageCode | string
  name?: string
  className?: string
}

export function GuestIdentity({ nationality, language, name, className }: GuestIdentityProps) {
  const natInfo = nationalityInfo[nationality as NationalityCode]
  const langInfo = languageInfo[language as LanguageCode]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-lg">{natInfo?.flag}</span>
      <div>
        {name && <p className="text-white font-medium">{name}</p>}
        <p className="text-xs text-slate-400">
          {natInfo?.name} · {langInfo?.name}
        </p>
      </div>
    </div>
  )
}
