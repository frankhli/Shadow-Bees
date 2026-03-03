'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface Phrase {
  id: string
  chinese: string
  english: string
  spanish: string
  french: string
  german: string
  japanese: string
  category: string
}

const defaultPhrases: Phrase[] = [
  {
    id: '1',
    chinese: '您好，欢迎来到北京！我是您的导游。',
    english: 'Hello, welcome to Beijing! I am your guide.',
    spanish: '¡Hola, bienvenido a Pekín! Soy su guía.',
    french: 'Bonjour, bienvenue à Pékin ! Je suis votre guide.',
    german: 'Hallo, willkommen in Peking! Ich bin Ihr Reiseführer.',
    japanese: 'こんにちは、北京へようこそ！ガイドの者です。',
    category: '问候',
  },
  {
    id: '2',
    chinese: '请问有什么可以帮助您的？',
    english: 'How can I help you?',
    spanish: '¿En qué puedo ayudarle?',
    french: 'Comment puis-je vous aider ?',
    german: 'Wie kann ich Ihnen helfen?',
    japanese: '何かお手伝いできることはありますか？',
    category: '服务',
  },
  {
    id: '3',
    chinese: '我们的集合地点在...',
    english: 'Our meeting point is at...',
    spanish: 'Nuestro punto de encuentro está en...',
    french: 'Notre point de rendez-vous est à...',
    german: 'Unser Treffpunkt ist bei...',
    japanese: '集合場所は...です。',
    category: '行程',
  },
  {
    id: '4',
    chinese: '请注意安全，跟紧我。',
    english: 'Please be careful and follow me closely.',
    spanish: 'Por favor tenga cuidado y sígame de cerca.',
    french: 'Faites attention et suivez-moi de près.',
    german: 'Bitte seien Sie vorsichtig und folgen Sie mir dicht.',
    japanese: '安全に注意して、私についてきてください。',
    category: '安全',
  },
  {
    id: '5',
    chinese: '这是我们的行程结束，感谢您的参与！',
    english: 'This concludes our tour. Thank you for joining!',
    spanish: 'Esto concluye nuestro tour. ¡Gracias por participar!',
    french: 'Ceci conclut notre visite. Merci de votre participation !',
    german: 'Damit endet unsere Tour. Vielen Dank für Ihre Teilnahme!',
    japanese: 'これでツアーは終了です。ご参加ありがとうございました！',
    category: '结束',
  },
]

export default function GuideAIServicePhrasesPage() {
  const [phrases, setPhrases] = useState<Phrase[]>(defaultPhrases)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', ...Array.from(new Set(phrases.map(p => p.category)))]

  const filteredPhrases = selectedCategory === '全部' 
    ? phrases 
    : phrases.filter(p => p.category === selectedCategory)

  const handleCopy = (phrase: Phrase, lang: string) => {
    const text = phrase[lang as keyof Phrase] as string
    navigator.clipboard.writeText(text)
    setCopiedId(`${phrase.id}-${lang}`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="常用语库"
        description="快速复制常用服务用语"
      />

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-green-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 常用语列表 */}
      <div className="space-y-4">
        {filteredPhrases.map((phrase) => (
          <Card key={phrase.id} className="bg-slate-900 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="bg-slate-800 border-slate-700 text-slate-300">
                  {phrase.category}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-green-400">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* 中文 */}
              <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">🇨🇳 中文</span>
                    <p className="text-white mt-1">{phrase.chinese}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleCopy(phrase, 'chinese')}
                  >
                    {copiedId === `${phrase.id}-chinese` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* 外语版本 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { lang: 'english', label: '🇺🇸 English', text: phrase.english },
                  { lang: 'spanish', label: '🇪🇸 Español', text: phrase.spanish },
                  { lang: 'french', label: '🇫🇷 Français', text: phrase.french },
                  { lang: 'german', label: '🇩🇪 Deutsch', text: phrase.german },
                  { lang: 'japanese', label: '🇯🇵 日本語', text: phrase.japanese },
                ].map(({ lang, label, text }) => (
                  <div key={lang} className="p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">{label}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => handleCopy(phrase, lang)}
                      >
                        {copiedId === `${phrase.id}-${lang}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-500" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
