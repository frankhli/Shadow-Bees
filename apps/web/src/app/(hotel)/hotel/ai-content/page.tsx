'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkles, Copy, Check, Globe, FileText, Image, MessageSquare } from 'lucide-react'

// 六语支持
const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
]

// Mock 生成的内容
const mockGeneratedContent = {
  zh: '胡同里的精品四合院酒店，步行5分钟可达故宫。传统中式装修，现代化设施。提供中西式早餐，24小时热水。特别适合想要体验老北京文化的旅客。',
  en: 'A boutique siheyuan hotel nestled in the heart of Beijing\'s historic hutongs, just a 5-minute walk from the Forbidden City. Traditional Chinese decor meets modern amenities. Enjoy Chinese and Western breakfast options with 24-hour hot water. Perfect for travelers seeking an authentic Old Beijing experience.',
  es: 'Un hotel boutique tradicional siheyuan ubicado en el corazón de los históricos hutongs de Pekín, a solo 5 minutos a pie de la Ciudad Prohibida. Decoración china tradicional con comodidades modernas. Disfrute de opciones de desayuno chino y occidental con agua caliente las 24 horas. Perfecto para viajeros que buscan una experiencia auténtica del Viejo Pekín.',
  fr: 'Un hôtel boutique siheyuan niché au cœur des hutongs historiques de Pékin, à seulement 5 minutes à pied de la Cité Interdite. Décor traditionnel chinois allié à des équipements modernes. Profitez d\'options de petit-déjeuner chinois et occidental avec eau chaude 24h/24. Parfait pour les voyageurs en quête d\'une expérience authentique du Vieux Pékin.',
  de: 'Ein Boutique-Siheyuan-Hotel im Herzen der historischen Hutongs von Peking, nur 5 Gehminuten von der Verbotenen Stadt entfernt. Traditionelle chinesische Einrichtung trifft auf moderne Annehmlichkeiten. Genießen Sie chinesische und westliche Frühstücksoptionen mit 24-Stunden-Warmwasser. Perfekt für Reisende, die ein authentisches Alt-Peking-Erlebnis suchen.',
  ja: '故宮まで徒歩5分の歴史的な胡同の中心に位置するブティック四合院ホテル。伝統的な中国の装飾とモダンな設備が融合。24時間温水の中西朝食をご用意。古き良き北京の体験を求める旅行者に最適です。',
}

export default function AIContentPage() {
  const [chineseInput, setChineseInput] = useState('')
  const [generatedContent, setGeneratedContent] = useState<Record<string, string> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedLang, setCopiedLang] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!chineseInput.trim()) return
    
    setIsGenerating(true)
    // Mock AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setGeneratedContent(mockGeneratedContent)
    setIsGenerating(false)
  }

  const handleCopy = (lang: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLang(lang)
    setTimeout(() => setCopiedLang(null), 2000)
  }

  return (
    <div className="p-8">
      <PageHeader
        title="AI内容生成"
        description="中文编辑，一键生成六语版本"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：中文编辑 */}
        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                中文描述编辑
              </CardTitle>
              <CardDescription className="text-slate-400">
                用中文描述您的酒店特色和卖点
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="例如：胡同里的精品四合院酒店，步行5分钟可达故宫..."
                className="min-h-[200px] bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                value={chineseInput}
                onChange={(e) => setChineseInput(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                  onClick={handleGenerate}
                  disabled={isGenerating || !chineseInput.trim()}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? '生成中...' : 'AI生成六语版本'}
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <Image className="w-4 h-4 mr-2" />
                  生成配图建议
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 快速模板 */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">快速模板</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['胡同四合院', '现代商务', '亲子友好', '文化体验', '美食之旅'].map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => setChineseInput(`我们是一家${template}风格的酒店...`)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：六语预览 */}
        <div>
          {generatedContent ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  六语版本预览
                </CardTitle>
                <CardDescription className="text-slate-400">
                  点击复制按钮可直接使用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="zh" className="w-full">
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
                        <div className="min-h-[150px] p-4 bg-slate-800 rounded-lg text-slate-300 text-sm leading-relaxed">
                          {generatedContent[lang.code]}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 text-slate-400 hover:text-white"
                          onClick={() => handleCopy(lang.code, generatedContent[lang.code])}
                        >
                          {copiedLang === lang.code ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          人工修正
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                        >
                          确认使用
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-900 border-slate-800 h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Globe className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">
                  在左侧编辑中文描述<br />
                  AI将自动生成六语版本
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
