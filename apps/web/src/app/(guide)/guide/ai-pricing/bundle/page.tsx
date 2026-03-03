'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Package, 
  Plus,
  Edit,
  Trash2,
  Sparkles
} from 'lucide-react'
import { useState } from 'react'

interface BundleService {
  id: string
  name: string
  description: string
  services: string[]
  originalPrice: number
  bundlePrice: number
  isActive: boolean
}

const defaultBundles: BundleService[] = [
  {
    id: '1',
    name: '北京经典一日游',
    description: '故宫+天安门+景山公园，全方位体验皇城文化',
    services: ['故宫深度讲解', '天安门广场', '景山公园俯瞰'],
    originalPrice: 2400,
    bundlePrice: 2000,
    isActive: true,
  },
  {
    id: '2',
    name: '胡同文化半天游',
    description: '南锣鼓巷+什刹海+老北京人家里做客',
    services: ['南锣鼓巷漫步', '什刹海游船', '四合院品茶'],
    originalPrice: 1200,
    bundlePrice: 980,
    isActive: true,
  },
  {
    id: '3',
    name: '美食探索之旅',
    description: '品尝正宗北京小吃，了解饮食文化',
    services: ['簋街夜市', '豆汁焦圈体验', '烤鸭店探访'],
    originalPrice: 800,
    bundlePrice: 680,
    isActive: false,
  },
]

export default function GuideAIPricingBundlePage() {
  const [bundles, setBundles] = useState<BundleService[]>(defaultBundles)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const availableServices = [
    '故宫深度讲解',
    '天安门广场',
    '景山公园',
    '南锣鼓巷',
    '什刹海',
    '四合院体验',
    '胡同漫步',
    '美食探索',
    '798艺术区',
    '天坛公园',
    '颐和园',
    '长城一日游',
  ]

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  return (
    <div className="p-8">
      <PageHeader
        title="打包服务"
        description="组合多个服务，提供优惠套餐"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 现有套餐 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">我的套餐</h3>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              新建套餐
            </Button>
          </div>

          <div className="space-y-4">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{bundle.name}</h3>
                        {bundle.isActive ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            已上架
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-700 text-slate-400">
                            未上架
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-3">{bundle.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bundle.services.map((service) => (
                          <Badge 
                            key={service}
                            variant="outline" 
                            className="bg-slate-800 border-slate-700 text-slate-300"
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 line-through">¥{bundle.originalPrice}</span>
                        <span className="text-2xl font-bold text-emerald-400">¥{bundle.bundlePrice}</span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          省¥{bundle.originalPrice - bundle.bundlePrice}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 创建新套餐 */}
        <div>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                AI推荐组合
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-400">
                根据您的服务历史，AI推荐以下热门组合：
              </p>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 font-medium mb-1">🏆 最畅销组合</p>
                <p className="text-sm text-slate-300">故宫 + 天安门 + 景山</p>
                <p className="text-xs text-slate-500 mt-1">78%的游客选择此路线</p>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 font-medium mb-1">💡 潜力组合</p>
                <p className="text-sm text-slate-300">胡同 + 四合院 + 美食</p>
                <p className="text-xs text-slate-500 mt-1">近期搜索量上升40%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 mt-6">
            <CardHeader>
              <CardTitle className="text-white text-base">选择服务</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availableServices.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox 
                      id={service}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    />
                    <label 
                      htmlFor={service}
                      className="text-sm text-slate-300 cursor-pointer"
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <Package className="w-4 h-4 mr-2" />
                  创建套餐 ({selectedServices.length}项)
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
