'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LanguagesTermsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="术语标准化"
        description="统一管理多语言术语库"
      />

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">核心术语对照表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">中文</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">English</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Español</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Français</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { zh: '胡同', en: 'Hutong', es: 'Hutong', fr: 'Hutong' },
                  { zh: '四合院', en: 'Siheyuan', es: 'Siheyuan', fr: 'Cour carrée' },
                  { zh: '故宫', en: 'Forbidden City', es: 'Ciudad Prohibida', fr: 'Cité interdite' },
                  { zh: '长城', en: 'Great Wall', es: 'Gran Muralla', fr: 'Grande Muraille' },
                ].map((term, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-white">{term.zh}</td>
                    <td className="py-3 px-4 text-slate-300">{term.en}</td>
                    <td className="py-3 px-4 text-slate-300">{term.es}</td>
                    <td className="py-3 px-4 text-slate-300">{term.fr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
