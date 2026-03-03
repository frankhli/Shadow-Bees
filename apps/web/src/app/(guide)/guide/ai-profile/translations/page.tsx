'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCircle, AlertCircle, Edit, Globe } from 'lucide-react'
import { useState } from 'react'

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳', status: 'approved' },
  { code: 'en', name: 'English', flag: '🇺🇸', status: 'approved' },
  { code: 'es', name: 'Español', flag: '🇪🇸', status: 'approved' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', status: 'pending' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', status: 'approved' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', status: 'approved' },
]

const translations = {
  zh: `大家好，我是张导游，土生土长的北京人。

从事导游工作已经10年，专精于北京历史文化讲解。我热爱这座城市，希望通过我的讲解，让每一位游客都能感受到老北京独特的魅力。

我的服务特色：
- 深度讲解故宫、天坛等皇家建筑的历史文化
- 带您走进胡同，体验地道的老北京生活
- 推荐最正宗的北京美食
- 提供英语、日语双语服务

期待与您相遇在北京！`,
  
  en: `Hello everyone, I am Guide Zhang, a native Beijinger.

I have been working as a tour guide for 10 years, specializing in Beijing's history and culture. I love this city and hope that through my explanations, every visitor can experience the unique charm of old Beijing.

My service features:
- In-depth explanations of the history and culture of royal buildings such as the Forbidden City and Temple of Heaven
- Take you into the hutongs to experience authentic old Beijing life
- Recommend the most authentic Beijing cuisine
- Provide bilingual service in English and Japanese

Looking forward to meeting you in Beijing!`,

  es: `¡Hola a todos! Soy el guía Zhang, nacido y criado en Pekín.

Llevo 10 años trabajando como guía turístico, especializado en la historia y cultura de Pekín. Amo esta ciudad y espero que a través de mis explicaciones, cada visitante pueda experimentar el encanto único del viejo Pekín.

Características de mi servicio:
- Explicaciones profundas de la historia y cultura de edificios reales como la Ciudad Prohibida y el Templo del Cielo
- Le llevaré a los hutongs para experimentar la auténtica vida del viejo Pekín
- Recomiendo la cocina de Pekín más auténtica
- Servicio bilingüe en inglés y japonés`,

  fr: `Bonjour à tous, je suis le guide Zhang, né et élevé à Pékin.

Je travaille comme guide touristique depuis 10 ans, spécialisé dans l'histoire et la culture de Pékin. J'aime cette ville et j'espère qu'à travers mes explications, chaque visiteur pourra ressentir le charme unique du vieux Pékin.

Caractéristiques de mon service:
- Explications approfondies de l'histoire et de la culture des bâtiments royaux tels que la Cité Interdite et le Temple du Ciel
- Je vous emmène dans les hutongs pour découvrir la vie authentique du vieux Pékin
- Je recommande la cuisine pékinoise la plus authentique
- Service bilingue en anglais et en japonais`,

  de: `Hallo zusammen, ich bin Guide Zhang, geboren und aufgewachsen in Peking.

Ich arbeite seit 10 Jahren als Reiseführer und bin auf die Geschichte und Kultur Pekings spezialisiert. Ich liebe diese Stadt und hoffe, dass durch meine Erklärungen jeder Besucher den einzigartigen Charme des alten Pekings erleben kann.

Meine Service-Features:
- Tiefgehende Erklärungen zur Geschichte und Kultur königlicher Gebäude wie der Verbotenen Stadt und des Himmelstempels
- Ich führe Sie in die Hutongs, um das authentische Leben des alten Pekings zu erleben
- Empfehlung der authentischsten pekingischen Küche
- Zweisprachiger Service auf Englisch und Japanisch`,

  ja: `皆さんこんにちは、生粋の北京人である張ガイドです。

10年間ガイドとして働き、北京の歴史と文化を専門としています。この街が大好きで、私の説明を通じて、すべての観光客が古き良き北京の独特な魅力を感じていただけるよう願っています。

サービスの特徴：
- 紫禁城や天壇などの皇家建築の歴史と文化を深く解説
- 胡同に案内し、地道な北京の生活を体験
- 最も本場の北京料理をご紹介
- 英語と日本語のバイリンガルサービス`,
}

export default function GuideAIProfileTranslationsPage() {
  const [activeTab, setActiveTab] = useState('zh')

  return (
    <div className="p-8">
      <PageHeader
        title="五语介绍管理"
        description="查看和管理多语言个人介绍"
      />

      {/* 语言状态概览 */}
      <Card className="bg-slate-900 border-slate-800 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-slate-300">{lang.name}</span>
                {lang.status === 'approved' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 多语言内容 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-400" />
            多语言内容预览
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-slate-800 mb-4">
              {languages.map((lang) => (
                <TabsTrigger 
                  key={lang.code} 
                  value={lang.code}
                  className="flex-1 data-[state=active]:bg-slate-700"
                >
                  <span className="mr-1">{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {languages.map((lang) => (
              <TabsContent key={lang.code} value={lang.code}>
                <div className="relative">
                  <div className="p-4 bg-slate-800/50 rounded-lg min-h-[200px] whitespace-pre-line text-slate-300">
                    {translations[lang.code as keyof typeof translations]}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
                    {lang.status === 'pending' && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        待审核
                      </Badge>
                    )}
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {lang.code !== 'zh' && (
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="border-slate-700 text-slate-300">
                      AI重新翻译
                    </Button>
                    {lang.status === 'pending' && (
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        确认使用
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
