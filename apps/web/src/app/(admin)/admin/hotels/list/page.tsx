'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableHead,
} from '@/components/dashboard/DataTable'
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
  Power,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Download,
  RefreshCw,
  TrendingUp,
  Bed,
  Users,
  CreditCard,
  Award,
  ShieldCheck,
  Image as ImageIcon,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Lock,
  Unlock,
} from 'lucide-react'

// 模拟酒店数据
const hotelsData = [
  {
    id: 1,
    name: '上海外滩精品酒店',
    city: '上海',
    district: '黄浦区',
    address: '外滩中山东一路88号',
    contactName: '张明华',
    contactPhone: '138****8888',
    contactEmail: 'manager@bundhotel.com',
    starRating: 5,
    roomCount: 120,
    hotelType: '商务酒店',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-06-15',
    monthlyRevenue: '¥458,600',
    totalBookings: 1256,
    occupancyRate: '87%',
    averageRating: 4.8,
    reviewCount: 523,
    isFeatured: true,
    commissionRate: 12,
    lastActive: '2024-01-15 14:30',
  },
  {
    id: 2,
    name: '成都宽窄巷子客栈',
    city: '成都',
    district: '青羊区',
    address: '宽窄巷子景区旁',
    contactName: '李雅琴',
    contactPhone: '139****6666',
    contactEmail: 'owner@kuanzhai.com',
    starRating: 4,
    roomCount: 45,
    hotelType: '精品民宿',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-08-20',
    monthlyRevenue: '¥128,400',
    totalBookings: 892,
    occupancyRate: '76%',
    averageRating: 4.6,
    reviewCount: 312,
    isFeatured: true,
    commissionRate: 10,
    lastActive: '2024-01-15 12:15',
  },
  {
    id: 3,
    name: '杭州西湖度假酒店',
    city: '杭州',
    district: '西湖区',
    address: '西湖风景区杨公堤',
    contactName: '王建国',
    contactPhone: '137****9999',
    contactEmail: 'contact@xihuhotel.com',
    starRating: 5,
    roomCount: 200,
    hotelType: '度假酒店',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-05-10',
    monthlyRevenue: '¥625,800',
    totalBookings: 1689,
    occupancyRate: '92%',
    averageRating: 4.9,
    reviewCount: 756,
    isFeatured: true,
    commissionRate: 15,
    lastActive: '2024-01-15 16:45',
  },
  {
    id: 4,
    name: '厦门鼓浪屿家庭旅馆',
    city: '厦门',
    district: '思明区',
    address: '鼓浪屿内厝澳路',
    contactName: '陈小雨',
    contactPhone: '136****5555',
    contactEmail: 'chen@kulangsu.com',
    starRating: 3,
    roomCount: 15,
    hotelType: '家庭旅馆',
    status: 'suspended',
    licenseStatus: 'expired',
    joinDate: '2023-09-05',
    monthlyRevenue: '¥45,200',
    totalBookings: 456,
    occupancyRate: '45%',
    averageRating: 4.2,
    reviewCount: 128,
    isFeatured: false,
    commissionRate: 8,
    lastActive: '2024-01-10 09:20',
  },
  {
    id: 5,
    name: '西安古城墙客栈',
    city: '西安',
    district: '碑林区',
    address: '南门古城墙下',
    contactName: '赵文博',
    contactPhone: '135****7777',
    contactEmail: 'zhao@xianhotel.com',
    starRating: 4,
    roomCount: 80,
    hotelType: '文化主题酒店',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-07-18',
    monthlyRevenue: '¥198,500',
    totalBookings: 678,
    occupancyRate: '68%',
    averageRating: 4.5,
    reviewCount: 234,
    isFeatured: false,
    commissionRate: 10,
    lastActive: '2024-01-15 11:30',
  },
  {
    id: 6,
    name: '北京四合院精品酒店',
    city: '北京',
    district: '东城区',
    address: '南锣鼓巷附近',
    contactName: '刘芳华',
    contactPhone: '138****1111',
    contactEmail: 'liu@beijinghotel.com',
    starRating: 5,
    roomCount: 30,
    hotelType: '精品酒店',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-04-22',
    monthlyRevenue: '¥356,800',
    totalBookings: 567,
    occupancyRate: '82%',
    averageRating: 4.7,
    reviewCount: 289,
    isFeatured: true,
    commissionRate: 12,
    lastActive: '2024-01-15 15:10',
  },
  {
    id: 7,
    name: '苏州园林民宿',
    city: '苏州',
    district: '姑苏区',
    address: '拙政园旁',
    contactName: '周雅婷',
    contactPhone: '139****2222',
    contactEmail: 'zhou@suzhou.com',
    starRating: 4,
    roomCount: 20,
    hotelType: '精品民宿',
    status: 'pending_review',
    licenseStatus: 'pending',
    joinDate: '2024-01-10',
    monthlyRevenue: '¥0',
    totalBookings: 0,
    occupancyRate: '0%',
    averageRating: 0,
    reviewCount: 0,
    isFeatured: false,
    commissionRate: 10,
    lastActive: '2024-01-14 18:00',
  },
  {
    id: 8,
    name: '丽江古镇客栈',
    city: '丽江',
    district: '古城区',
    address: '丽江古城中心',
    contactName: '和晓明',
    contactPhone: '137****3333',
    contactEmail: 'he@lijiang.com',
    starRating: 4,
    roomCount: 50,
    hotelType: '度假客栈',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-03-15',
    monthlyRevenue: '¥156,300',
    totalBookings: 789,
    occupancyRate: '71%',
    averageRating: 4.4,
    reviewCount: 412,
    isFeatured: false,
    commissionRate: 10,
    lastActive: '2024-01-15 10:45',
  },
  {
    id: 9,
    name: '三亚海滨度假酒店',
    city: '三亚',
    district: '海棠区',
    address: '海棠湾海岸线',
    contactName: '吴海涛',
    contactPhone: '136****4444',
    contactEmail: 'wu@sanya.com',
    starRating: 5,
    roomCount: 350,
    hotelType: '度假酒店',
    status: 'inactive',
    licenseStatus: 'verified',
    joinDate: '2023-02-28',
    monthlyRevenue: '¥125,000',
    totalBookings: 234,
    occupancyRate: '35%',
    averageRating: 4.3,
    reviewCount: 189,
    isFeatured: false,
    commissionRate: 15,
    lastActive: '2024-01-05 16:20',
  },
  {
    id: 10,
    name: '青岛海景酒店',
    city: '青岛',
    district: '市南区',
    address: '栈桥海滨',
    contactName: '孙海燕',
    contactPhone: '135****6666',
    contactEmail: 'sun@qingdao.com',
    starRating: 4,
    roomCount: 150,
    hotelType: '海景酒店',
    status: 'active',
    licenseStatus: 'verified',
    joinDate: '2023-06-01',
    monthlyRevenue: '¥298,400',
    totalBookings: 945,
    occupancyRate: '79%',
    averageRating: 4.5,
    reviewCount: 378,
    isFeatured: true,
    commissionRate: 12,
    lastActive: '2024-01-15 14:00',
  },
]

export default function HotelsListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')

  const handleViewDetail = (hotel: any) => {
    setSelectedHotel(hotel)
    setIsDetailOpen(true)
  }

  const handleEdit = (hotel: any) => {
    setSelectedHotel(hotel)
    setIsEditOpen(true)
  }

  const handleDelete = (hotel: any) => {
    setSelectedHotel(hotel)
    setIsDeleteOpen(true)
  }

  const handleStatusChange = (hotelId: number, newStatus: string) => {
    console.log('Change status:', hotelId, newStatus)
    // 这里应该调用API更新状态
  }

  const handleToggleFeatured = (hotelId: number, isFeatured: boolean) => {
    console.log('Toggle featured:', hotelId, isFeatured)
    // 这里应该调用API更新推荐状态
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            正常营业
          </Badge>
        )
      case 'inactive':
        return (
          <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            暂停营业
          </Badge>
        )
      case 'suspended':
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            已冻结
          </Badge>
        )
      case 'pending_review':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            待审核
          </Badge>
        )
      default:
        return null
    }
  }

  const getLicenseBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20">
            <ShieldCheck className="w-3 h-3 mr-1" />
            已认证
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            待审核
          </Badge>
        )
      case 'expired':
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            已过期
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredHotels = hotelsData.filter((hotel) => {
    const matchesSearch =
      !searchQuery ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || hotel.status === statusFilter
    const matchesCity = cityFilter === 'all' || hotel.city === cityFilter
    return matchesSearch && matchesStatus && matchesCity
  })

  return (
    <div className="p-8">
      <PageHeader
        title="酒店列表管理"
        description="管理平台所有酒店，查看详细信息，进行状态管理"
      />

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">酒店总数</p>
                <p className="text-3xl font-bold text-white mt-2">156</p>
                <p className="text-xs text-purple-400 mt-1">+12 本月新增</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">正常营业</p>
                <p className="text-3xl font-bold text-white mt-2">128</p>
                <p className="text-xs text-emerald-400 mt-1">占比 82%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">总房间数</p>
                <p className="text-3xl font-bold text-white mt-2">12,580</p>
                <p className="text-xs text-blue-400 mt-1">平均 81 间/酒店</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Bed className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">本月营收</p>
                <p className="text-3xl font-bold text-white mt-2">¥2.8M</p>
                <p className="text-xs text-emerald-400 mt-1">↑ 15.3%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">总订单数</p>
                <p className="text-3xl font-bold text-white mt-2">45,230</p>
                <p className="text-xs text-purple-400 mt-1">本月 +3,420</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选栏 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="搜索酒店名称、城市、联系人..."
            className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-white">
            <SelectValue placeholder="城市筛选" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">全部城市</SelectItem>
            <SelectItem value="上海">上海</SelectItem>
            <SelectItem value="北京">北京</SelectItem>
            <SelectItem value="成都">成都</SelectItem>
            <SelectItem value="杭州">杭州</SelectItem>
            <SelectItem value="厦门">厦门</SelectItem>
            <SelectItem value="西安">西安</SelectItem>
            <SelectItem value="苏州">苏州</SelectItem>
            <SelectItem value="丽江">丽江</SelectItem>
            <SelectItem value="三亚">三亚</SelectItem>
            <SelectItem value="青岛">青岛</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-slate-900 border-slate-700 text-white">
            <SelectValue placeholder="状态筛选" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常营业</SelectItem>
            <SelectItem value="inactive">暂停营业</SelectItem>
            <SelectItem value="suspended">已冻结</SelectItem>
            <SelectItem value="pending_review">待审核</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <Filter className="w-4 h-4 mr-2" />
          高级筛选
        </Button>
        <div className="flex-1" />
        <Button
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <Download className="w-4 h-4 mr-2" />
          导出数据
        </Button>
        <Button
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          新增酒店
        </Button>
      </div>

      {/* 酒店列表表格 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <DataTable>
          <DataTableHeader>
            <tr>
              <DataTableHead>酒店信息</DataTableHead>
              <DataTableHead>联系人</DataTableHead>
              <DataTableHead>星级/房型</DataTableHead>
              <DataTableHead>经营数据</DataTableHead>
              <DataTableHead>资质状态</DataTableHead>
              <DataTableHead>运营状态</DataTableHead>
              <DataTableHead align="center">推荐</DataTableHead>
              <DataTableHead align="center">操作</DataTableHead>
            </tr>
          </DataTableHeader>
          <DataTableBody>
            {filteredHotels.map((hotel) => (
              <DataTableRow key={hotel.id}>
                <DataTableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{hotel.name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {hotel.city} · {hotel.district}
                      </p>
                    </div>
                  </div>
                </DataTableCell>
                <DataTableCell>
                  <div>
                    <p className="text-slate-300">{hotel.contactName}</p>
                    <p className="text-xs text-slate-500">{hotel.contactPhone}</p>
                  </div>
                </DataTableCell>
                <DataTableCell>
                  <div>
                    <p className="text-slate-300 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {hotel.starRating}星级
                    </p>
                    <p className="text-xs text-slate-500">{hotel.roomCount}间房 · {hotel.hotelType}</p>
                  </div>
                </DataTableCell>
                <DataTableCell>
                  <div>
                    <p className="text-emerald-400 font-medium">{hotel.monthlyRevenue}</p>
                    <p className="text-xs text-slate-500">{hotel.totalBookings}单 · 入住率{hotel.occupancyRate}</p>
                  </div>
                </DataTableCell>
                <DataTableCell>{getLicenseBadge(hotel.licenseStatus)}</DataTableCell>
                <DataTableCell>{getStatusBadge(hotel.status)}</DataTableCell>
                <DataTableCell align="center">
                  <Switch
                    checked={hotel.isFeatured}
                    onCheckedChange={(checked) => handleToggleFeatured(hotel.id, checked)}
                    className="data-[state=checked]:bg-purple-600"
                  />
                </DataTableCell>
                <DataTableCell align="center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleViewDetail(hotel)}
                        className="text-slate-300 focus:text-white focus:bg-slate-800"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEdit(hotel)}
                        className="text-slate-300 focus:text-white focus:bg-slate-800"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        编辑信息
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      {hotel.status === 'active' ? (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(hotel.id, 'inactive')}
                          className="text-yellow-400 focus:text-yellow-400 focus:bg-slate-800"
                        >
                          <Power className="w-4 h-4 mr-2" />
                          暂停营业
                        </DropdownMenuItem>
                      ) : hotel.status === 'inactive' ? (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(hotel.id, 'active')}
                          className="text-emerald-400 focus:text-emerald-400 focus:bg-slate-800"
                        >
                          <Power className="w-4 h-4 mr-2" />
                          恢复营业
                        </DropdownMenuItem>
                      ) : null}
                      {hotel.status !== 'suspended' && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(hotel.id, 'suspended')}
                          className="text-red-400 focus:text-red-400 focus:bg-slate-800"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          冻结账户
                        </DropdownMenuItem>
                      )}
                      {hotel.status === 'suspended' && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(hotel.id, 'active')}
                          className="text-emerald-400 focus:text-emerald-400 focus:bg-slate-800"
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          解除冻结
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        onClick={() => handleDelete(hotel)}
                        className="text-red-400 focus:text-red-400 focus:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        删除酒店
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-slate-400">
          共 <span className="text-white font-medium">156</span> 条记录，
          每页 <span className="text-white font-medium">10</span> 条
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            3
          </Button>
          <span className="text-slate-500">...</span>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            16
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-5xl bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Building2 className="w-6 h-6 text-purple-400" />
              酒店详细信息
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              查看酒店完整信息和经营数据
            </DialogDescription>
          </DialogHeader>

          {selectedHotel && (
            <div className="space-y-6 mt-4">
              {/* 顶部信息卡 */}
              <div className="flex items-start gap-6 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="w-24 h-24 rounded-xl bg-slate-700 flex items-center justify-center border border-slate-600">
                  <ImageIcon className="w-12 h-12 text-slate-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{selectedHotel.name}</h3>
                    {selectedHotel.isFeatured && (
                      <Badge className="bg-purple-500/20 text-purple-300">
                        <Award className="w-3 h-3 mr-1" />
                        推荐酒店
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-400 flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4" />
                    {selectedHotel.city} · {selectedHotel.district} · {selectedHotel.address}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">{selectedHotel.starRating} 星级</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">{selectedHotel.roomCount} 间房</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium">{selectedHotel.hotelType}</span>
                    </div>
                    {getStatusBadge(selectedHotel.status)}
                  </div>
                </div>
              </div>

              {/* 数据统计卡片 */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-400">本月营收</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">{selectedHotel.monthlyRevenue}</p>
                    <p className="text-xs text-slate-500 mt-1">较上月 +12%</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-400">累计订单</p>
                    <p className="text-2xl font-bold text-white mt-1">{selectedHotel.totalBookings}</p>
                    <p className="text-xs text-slate-500 mt-1">单</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-400">入住率</p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">{selectedHotel.occupancyRate}</p>
                    <p className="text-xs text-slate-500 mt-1">行业平均 65%</p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <p className="text-sm text-slate-400">用户评分</p>
                    <p className="text-2xl font-bold text-yellow-400 mt-1">{selectedHotel.averageRating}</p>
                    <p className="text-xs text-slate-500 mt-1">{selectedHotel.reviewCount} 条评价</p>
                  </CardContent>
                </Card>
              </div>

              {/* 详细信息 */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-400" />
                      联系人信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">联系人</span>
                      <span className="text-white">{selectedHotel.contactName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">联系电话</span>
                      <span className="text-white flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {selectedHotel.contactPhone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">电子邮箱</span>
                      <span className="text-white flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-500" />
                        {selectedHotel.contactEmail}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-white flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-400" />
                      运营信息
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">入驻日期</span>
                      <span className="text-white flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {selectedHotel.joinDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">佣金比例</span>
                      <span className="text-white">{selectedHotel.commissionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">最后活跃</span>
                      <span className="text-white">{selectedHotel.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 资质信息 */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    资质认证
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    {getLicenseBadge(selectedHotel.licenseStatus)}
                    {selectedHotel.licenseStatus === 'verified' && (
                      <span className="text-sm text-slate-400">营业执照已认证，有效期至 2025-12-31</span>
                    )}
                    {selectedHotel.licenseStatus === 'pending' && (
                      <span className="text-sm text-slate-400">资质正在审核中</span>
                    )}
                    {selectedHotel.licenseStatus === 'expired' && (
                      <span className="text-sm text-red-400">营业执照已过期，请提醒酒店更新</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDetailOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              关闭
            </Button>
            <Button
              onClick={() => {
                setIsDetailOpen(false)
                handleEdit(selectedHotel)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              编辑信息
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑弹窗 */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-6 h-6 text-purple-400" />
              编辑酒店信息
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              修改酒店的基本信息和运营设置
            </DialogDescription>
          </DialogHeader>

          {selectedHotel && (
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-slate-300">酒店名称</Label>
                <Input
                  defaultValue={selectedHotel.name}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">星级</Label>
                  <Select defaultValue={String(selectedHotel.starRating)}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="3">3星级</SelectItem>
                      <SelectItem value="4">4星级</SelectItem>
                      <SelectItem value="5">5星级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">房间数</Label>
                  <Input
                    type="number"
                    defaultValue={selectedHotel.roomCount}
                    className="bg-slate-800 border-slate-700 text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">佣金比例 (%)</Label>
                <Input
                  type="number"
                  defaultValue={selectedHotel.commissionRate}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Switch
                  id="featured"
                  defaultChecked={selectedHotel.isFeatured}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="featured" className="text-slate-300">
                  设为推荐酒店
                </Label>
              </div>
            </div>
          )}

          <DialogFooter className="gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              取消
            </Button>
            <Button onClick={() => setIsEditOpen(false)} className="bg-purple-600 hover:bg-purple-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认弹窗 */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              确认删除酒店
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              确定要删除 <span className="text-white font-medium">{selectedHotel?.name}</span> 吗？
              <br />
              <span className="text-red-400">此操作不可撤销，删除后所有相关数据将被清除！</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              取消
            </Button>
            <Button onClick={() => setIsDeleteOpen(false)} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
