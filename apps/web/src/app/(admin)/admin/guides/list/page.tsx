'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableHead,
} from '@/components/dashboard/DataTable'
import {
  Users,
  UserCheck,
  UserX,
  Star,
  MapPin,
  Globe,
  TrendingUp,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  Award,
  Briefcase,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Shield,
  ThumbsUp,
  Clock,
  MoreHorizontal,
  ChevronDown,
  Plus,
} from 'lucide-react'

// 模拟导游数据
const guides = [
  {
    id: 'G1001',
    name: '张导游',
    avatar: '张',
    email: 'zhang.guide@example.com',
    phone: '+86 138-1234-5678',
    city: '北京',
    languages: ['中文', '英语', '日语'],
    experience: 8,
    rating: 4.9,
    reviewCount: 156,
    totalOrders: 328,
    completedOrders: 312,
    revenue: 156000,
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-03-15',
    specialty: ['历史文化', '古建筑', '美食'],
    isCertified: true,
    isFeatured: true,
  },
  {
    id: 'G1002',
    name: 'Maria Rodriguez',
    avatar: 'M',
    email: 'maria.guide@example.com',
    phone: '+86 139-2345-6789',
    city: '上海',
    languages: ['西班牙语', '英语', '中文'],
    experience: 5,
    rating: 4.8,
    reviewCount: 89,
    totalOrders: 186,
    completedOrders: 178,
    revenue: 98000,
    status: 'active',
    joinDate: '2023-03-20',
    lastActive: '2024-03-14',
    specialty: ['城市观光', '购物', '夜生活'],
    isCertified: true,
    isFeatured: true,
  },
  {
    id: 'G1003',
    name: 'Pierre Dubois',
    avatar: 'P',
    email: 'pierre.guide@example.com',
    phone: '+86 137-3456-7890',
    city: '广州',
    languages: ['法语', '英语'],
    experience: 6,
    rating: 4.7,
    reviewCount: 67,
    totalOrders: 142,
    completedOrders: 135,
    revenue: 72000,
    status: 'active',
    joinDate: '2023-05-10',
    lastActive: '2024-03-13',
    specialty: ['美食', '葡萄酒', '文化'],
    isCertified: true,
    isFeatured: false,
  },
  {
    id: 'G1004',
    name: '李秀英',
    avatar: '李',
    email: 'li.guide@example.com',
    phone: '+86 136-4567-8901',
    city: '西安',
    languages: ['中文', '英语', '韩语'],
    experience: 10,
    rating: 5.0,
    reviewCount: 234,
    totalOrders: 456,
    completedOrders: 445,
    revenue: 234000,
    status: 'active',
    joinDate: '2022-11-01',
    lastActive: '2024-03-15',
    specialty: ['兵马俑', '历史', '考古'],
    isCertified: true,
    isFeatured: true,
  },
  {
    id: 'G1005',
    name: 'John Anderson',
    avatar: 'J',
    email: 'john.guide@example.com',
    phone: '+86 135-5678-9012',
    city: '成都',
    languages: ['英语', '中文'],
    experience: 4,
    rating: 4.6,
    reviewCount: 45,
    totalOrders: 98,
    completedOrders: 92,
    revenue: 52000,
    status: 'suspended',
    joinDate: '2023-08-15',
    lastActive: '2024-02-28',
    specialty: ['熊猫', '川菜', '茶文化'],
    isCertified: true,
    isFeatured: false,
  },
  {
    id: 'G1006',
    name: '王小芳',
    avatar: '王',
    email: 'wang.guide@example.com',
    phone: '+86 134-6789-0123',
    city: '杭州',
    languages: ['中文', '英语', '法语'],
    experience: 7,
    rating: 4.9,
    reviewCount: 178,
    totalOrders: 345,
    completedOrders: 334,
    revenue: 167000,
    status: 'active',
    joinDate: '2023-02-01',
    lastActive: '2024-03-15',
    specialty: ['西湖', '丝绸', '茶文化'],
    isCertified: true,
    isFeatured: true,
  },
  {
    id: 'G1007',
    name: '陈建国',
    avatar: '陈',
    email: 'chen.guide@example.com',
    phone: '+86 133-7890-1234',
    city: '深圳',
    languages: ['中文', '英语'],
    experience: 12,
    rating: 4.8,
    reviewCount: 198,
    totalOrders: 412,
    completedOrders: 398,
    revenue: 198000,
    status: 'active',
    joinDate: '2022-09-10',
    lastActive: '2024-03-14',
    specialty: ['科技', '创新', '商务'],
    isCertified: true,
    isFeatured: false,
  },
  {
    id: 'G1008',
    name: 'Sophie Laurent',
    avatar: 'S',
    email: 'sophie.guide@example.com',
    phone: '+86 132-8901-2345',
    city: '苏州',
    languages: ['法语', '英语', '中文'],
    experience: 3,
    rating: 4.5,
    reviewCount: 34,
    totalOrders: 76,
    completedOrders: 70,
    revenue: 38000,
    status: 'inactive',
    joinDate: '2023-10-20',
    lastActive: '2024-01-15',
    specialty: ['园林', '水乡', '刺绣'],
    isCertified: true,
    isFeatured: false,
  },
  {
    id: 'G1009',
    name: '刘大明',
    avatar: '刘',
    email: 'liu.guide@example.com',
    phone: '+86 131-9012-3456',
    city: '南京',
    languages: ['中文', '德语'],
    experience: 9,
    rating: 4.7,
    reviewCount: 123,
    totalOrders: 267,
    completedOrders: 254,
    revenue: 134000,
    status: 'active',
    joinDate: '2023-01-05',
    lastActive: '2024-03-13',
    specialty: ['民国历史', '大屠杀纪念馆', '中山陵'],
    isCertified: true,
    isFeatured: false,
  },
  {
    id: 'G1010',
    name: '山田太郎',
    avatar: '山',
    email: 'yamada.guide@example.com',
    phone: '+86 130-0123-4567',
    city: '北京',
    languages: ['日语', '中文', '英语'],
    experience: 6,
    rating: 4.8,
    reviewCount: 87,
    totalOrders: 189,
    completedOrders: 182,
    revenue: 96000,
    status: 'active',
    joinDate: '2023-04-12',
    lastActive: '2024-03-15',
    specialty: ['长城', '故宫', '京剧'],
    isCertified: true,
    isFeatured: true,
  },
]

const languageFlags: Record<string, string> = {
  '中文': '🇨🇳',
  '英语': '🇬🇧',
  '日语': '🇯🇵',
  '法语': '🇫🇷',
  '西班牙语': '🇪🇸',
  '德语': '🇩🇪',
  '韩语': '🇰🇷',
}

export default function GuidesListPage() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            已认证
          </Badge>
        )
      case 'suspended':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30">
            <Ban className="w-3 h-3 mr-1" />
            已暂停
          </Badge>
        )
      case 'inactive':
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-slate-500/30">
            <UserX className="w-3 h-3 mr-1" />
            未活跃
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredGuides = filterStatus === 'all' 
    ? guides 
    : guides.filter(g => g.status === filterStatus)

  return (
    <div className="p-8">
      <PageHeader
        title="导游列表"
        description="管理所有认证导游，查看服务状态和业绩数据"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{guides.length}</p>
                <p className="text-xs text-slate-400">认证导游总数</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400">
                  {guides.filter(g => g.status === 'active').length}
                </p>
                <p className="text-xs text-slate-400">活跃导游</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {guides.reduce((acc, g) => acc + g.completedOrders, 0).toLocaleString()}
                </p>
                <p className="text-xs text-slate-400">累计接单</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  ¥{(guides.reduce((acc, g) => acc + g.revenue, 0) / 10000).toFixed(0)}万
                </p>
                <p className="text-xs text-slate-400">累计营收</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-400">
                  {(guides.reduce((acc, g) => acc + g.rating, 0) / guides.length).toFixed(1)}
                </p>
                <p className="text-xs text-slate-400">平均评分</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="搜索导游姓名、ID或城市..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <option value="all">全部状态</option>
          <option value="active">已认证</option>
          <option value="suspended">已暂停</option>
          <option value="inactive">未活跃</option>
        </select>

        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Filter className="w-4 h-4 mr-2" />
          高级筛选
        </Button>

        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          导出数据
        </Button>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
            className={viewMode === 'card' ? 'bg-purple-600 hover:bg-purple-700' : 'border-slate-700 text-slate-300'}
          >
            卡片视图
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'bg-purple-600 hover:bg-purple-700' : 'border-slate-700 text-slate-300'}
          >
            列表视图
          </Button>
        </div>
      </div>

      {viewMode === 'card' ? (
        /* 卡片视图 */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="bg-slate-900 border-slate-800 hover:border-purple-500/50 transition-all group">
              <CardContent className="p-6">
                {/* 头部信息 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center text-xl font-bold text-purple-200">
                      {guide.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{guide.name}</h3>
                        {guide.isFeatured && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{guide.id}</p>
                      <div className="mt-1">{getStatusBadge(guide.status)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold">{guide.rating}</span>
                    </div>
                    <p className="text-xs text-slate-400">{guide.reviewCount} 条评价</p>
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">服务城市：</span>
                    <span className="text-white font-medium">{guide.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">语言能力：</span>
                    <div className="flex gap-1">
                      {guide.languages.slice(0, 3).map((lang) => (
                        <Badge key={lang} variant="outline" className="border-slate-600 text-slate-300 text-xs py-0">
                          {languageFlags[lang] || ''} {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">从业经验：</span>
                    <span className="text-white font-medium">{guide.experience} 年</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">已完成：</span>
                    <span className="text-emerald-400 font-medium">{guide.completedOrders} 单</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">累计营收：</span>
                    <span className="text-yellow-400 font-medium">¥{guide.revenue.toLocaleString()}</span>
                  </div>
                </div>

                {/* 专长标签 */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {guide.specialty.map((s) => (
                    <Badge key={s} className="bg-purple-500/10 text-purple-300 border-0 text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>

                {/* 联系方式 */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {guide.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {guide.phone}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2 pt-4 border-t border-slate-800">
                  <Button variant="outline" size="sm" className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800">
                    <Eye className="w-4 h-4 mr-1" />
                    详情
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/20">
                    <Edit className="w-4 h-4 mr-1" />
                    编辑
                  </Button>
                  {guide.status === 'active' ? (
                    <Button variant="outline" size="sm" className="flex-1 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20">
                      <Ban className="w-4 h-4 mr-1" />
                      暂停
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      恢复
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* 表格视图 */
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-0">
            <DataTable>
              <DataTableHeader>
                <tr>
                  <DataTableHead>导游信息</DataTableHead>
                  <DataTableHead>服务城市</DataTableHead>
                  <DataTableHead>语言能力</DataTableHead>
                  <DataTableHead>评分</DataTableHead>
                  <DataTableHead>接单数</DataTableHead>
                  <DataTableHead>营收</DataTableHead>
                  <DataTableHead>状态</DataTableHead>
                  <DataTableHead align="center">操作</DataTableHead>
                </tr>
              </DataTableHeader>
              <DataTableBody>
                {filteredGuides.map((guide) => (
                  <DataTableRow key={guide.id}>
                    <DataTableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <span className="text-purple-300 font-medium">{guide.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium flex items-center gap-2">
                            {guide.name}
                            {guide.isFeatured && <Award className="w-3 h-3 text-yellow-400" />}
                          </p>
                          <p className="text-xs text-slate-500">{guide.id}</p>
                        </div>
                      </div>
                    </DataTableCell>
                    <DataTableCell>{guide.city}</DataTableCell>
                    <DataTableCell>
                      <div className="flex gap-1">
                        {guide.languages.map((lang) => (
                          <span key={lang} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </DataTableCell>
                    <DataTableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{guide.rating}</span>
                        <span className="text-slate-500 text-xs">({guide.reviewCount})</span>
                      </div>
                    </DataTableCell>
                    <DataTableCell>
                      <span className="text-white">{guide.completedOrders}</span>
                      <span className="text-slate-500 text-xs"> / {guide.totalOrders}</span>
                    </DataTableCell>
                    <DataTableCell>
                      <span className="text-yellow-400">¥{guide.revenue.toLocaleString()}</span>
                    </DataTableCell>
                    <DataTableCell>{getStatusBadge(guide.status)}</DataTableCell>
                    <DataTableCell align="center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" className="text-purple-400 h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-400 h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </DataTableBody>
            </DataTable>
          </CardContent>
        </Card>
      )}

      {/* 分页 */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          显示 {filteredGuides.length} 条记录，共 {guides.length} 条
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-400" disabled>
            上一页
          </Button>
          <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
            1
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
            2
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
            3
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 text-slate-400">
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}
