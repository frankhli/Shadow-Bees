'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable, DataTableHeader, DataTableBody, DataTableRow, DataTableCell, DataTableHead } from '@/components/dashboard/DataTable'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import { GuestIdentity } from '@/components/dashboard/LanguageBadge'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Printer,
  QrCode,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  Coffee,
  Utensils,
  Music,
  Palette,
  Scissors,
  Camera,
  Bike,
  Anchor,
  Sun,
  Moon,
  Clock3,
  CalendarDays,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  History,
  Bookmark,
  Tag,
  Gift,
  Percent,
  CreditCard,
  Wallet,
  Receipt,
  FileSpreadsheet,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FilterX,
  SearchX,
  CalendarRange,
  Clock8,
  Timer,
} from 'lucide-react'

// 全部预订数据
const allBookings = [
  {
    id: 'BK20240301001',
    activity: '老北京茶馆品茗体验',
    category: '文化体验',
    guest: { name: 'John Smith', nationality: 'US', language: 'en', phone: '+1-555-0123', email: 'john.smith@email.com' },
    date: '2024-03-01',
    time: '14:00',
    duration: '2小时',
    people: 2,
    amount: 336,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'pending',
    bookingTime: '2024-02-28 10:30',
    notes: '对茶叶过敏，请准备花茶',
    source: '微信小程序',
  },
  {
    id: 'BK20240229005',
    activity: '传统书法工作坊',
    category: '文化体验',
    guest: { name: 'Sarah Johnson', nationality: 'CA', language: 'en', phone: '+1-555-0456', email: 'sarah.j@email.com' },
    date: '2024-02-29',
    time: '10:00',
    duration: '2.5小时',
    people: 1,
    amount: 198,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '09:55',
    bookingTime: '2024-02-25 14:20',
    notes: '',
    source: '官网',
  },
  {
    id: 'BK20240228012',
    activity: '中医养生体验',
    category: '健康养生',
    guest: { name: 'Michael Brown', nationality: 'AU', language: 'en', phone: '+61-400-123-456', email: 'michael@email.au' },
    date: '2024-02-28',
    time: '15:00',
    duration: '2小时',
    people: 2,
    amount: 456,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '14:50',
    bookingTime: '2024-02-20 09:00',
    notes: '预约了针灸服务',
    source: 'App',
  },
  {
    id: 'BK20240227008',
    activity: '京剧脸谱绘制工作坊',
    category: '手工艺',
    guest: { name: 'Maria Garcia', nationality: 'ES', language: 'es', phone: '+34-666-7890', email: 'maria.g@email.com' },
    date: '2024-02-27',
    time: '14:00',
    duration: '3小时',
    people: 3,
    amount: 756,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '13:45',
    bookingTime: '2024-02-15 16:30',
    notes: '希望有西班牙语翻译',
    source: '微信小程序',
  },
  {
    id: 'BK20240226003',
    activity: '传统剪纸艺术课程',
    category: '手工艺',
    guest: { name: '田中太郎', nationality: 'JP', language: 'ja', phone: '+81-90-1234-5678', email: 'tanaka@email.jp' },
    date: '2024-02-26',
    time: '10:00',
    duration: '2小时',
    people: 2,
    amount: 336,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '09:50',
    bookingTime: '2024-02-10 11:00',
    notes: '',
    source: '官网',
  },
  {
    id: 'BK20240225015',
    activity: '古琴体验课程',
    category: '艺术表演',
    guest: { name: 'Lucas Silva', nationality: 'BR', language: 'es', phone: '+55-11-98765-4321', email: 'lucas@email.br' },
    date: '2024-02-25',
    time: '16:00',
    duration: '1.5小时',
    people: 1,
    amount: 168,
    status: 'cancelled',
    paymentStatus: 'refunded',
    checkInStatus: 'cancelled',
    bookingTime: '2024-02-18 20:00',
    notes: '临时有事取消',
    source: 'App',
  },
  {
    id: 'BK20240224009',
    activity: '茶艺表演观赏',
    category: '文化体验',
    guest: { name: 'Emma Wilson', nationality: 'GB', language: 'en', phone: '+44-7700-900123', email: 'emma.w@email.co.uk' },
    date: '2024-02-24',
    time: '19:00',
    duration: '1小时',
    people: 4,
    amount: 672,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '18:55',
    bookingTime: '2024-02-20 15:30',
    notes: '商务宴请',
    source: '电话预约',
  },
  {
    id: 'BK20240223007',
    activity: '传统刺绣体验',
    category: '手工艺',
    guest: { name: 'Pierre Dubois', nationality: 'FR', language: 'fr', phone: '+33-6-12-34-56-78', email: 'pierre@email.fr' },
    date: '2024-02-23',
    time: '10:00',
    duration: '3小时',
    people: 2,
    amount: 536,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '09:45',
    bookingTime: '2024-02-15 08:00',
    notes: '对刺绣很感兴趣',
    source: '官网',
  },
  {
    id: 'BK20240222011',
    activity: '太极拳体验课',
    category: '健康养生',
    guest: { name: 'Hans Mueller', nationality: 'DE', language: 'de', phone: '+49-170-1234567', email: 'hans@email.de' },
    date: '2024-02-22',
    time: '07:00',
    duration: '1.5小时',
    people: 1,
    amount: 128,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '06:50',
    bookingTime: '2024-02-18 22:00',
    notes: '早起练习',
    source: '微信小程序',
  },
  {
    id: 'BK20240221004',
    activity: '传统民乐欣赏',
    category: '艺术表演',
    guest: { name: 'Sofia Rossi', nationality: 'IT', language: 'es', phone: '+39-333-444-5555', email: 'sofia@email.it' },
    date: '2024-02-21',
    time: '20:00',
    duration: '1.5小时',
    people: 2,
    amount: 336,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '19:50',
    bookingTime: '2024-02-15 14:00',
    notes: '喜欢古筝表演',
    source: 'App',
  },
  {
    id: 'BK20240220006',
    activity: '陶艺制作体验',
    category: '手工艺',
    guest: { name: '李明', nationality: 'CN', language: 'zh', phone: '+86-138-0013-8000', email: 'liming@email.cn' },
    date: '2024-02-20',
    time: '14:00',
    duration: '3小时',
    people: 3,
    amount: 804,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '13:55',
    bookingTime: '2024-02-15 10:00',
    notes: '亲子活动',
    source: '微信小程序',
  },
  {
    id: 'BK20240219010',
    activity: '香道文化体验',
    category: '文化体验',
    guest: { name: 'Anna Kowalski', nationality: 'PL', language: 'en', phone: '+48-501-234-567', email: 'anna@email.pl' },
    date: '2024-02-19',
    time: '15:00',
    duration: '2小时',
    people: 1,
    amount: 268,
    status: 'confirmed',
    paymentStatus: 'paid',
    checkInStatus: 'checked_in',
    checkInTime: '14:50',
    bookingTime: '2024-02-10 18:00',
    notes: '',
    source: '官网',
  },
]

// 统计数据
const stats = {
  totalBookings: 156,
  totalRevenue: 48520,
  thisMonthBookings: 28,
  thisMonthRevenue: 8650,
  confirmedRate: 94,
  cancellationRate: 6,
}

// 月份数据
const monthlyData = [
  { month: '2024-01', bookings: 45, revenue: 12580 },
  { month: '2024-02', bookings: 52, revenue: 15890 },
  { month: '2024-03', bookings: 28, revenue: 8650 },
]

export default function AllBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [selectedBookings, setSelectedBookings] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || booking.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const toggleSelection = (id: string) => {
    setSelectedBookings(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="全部预订"
        description="查看和管理所有历史预订订单，支持多维度筛选和批量操作"
      />

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">总预订数</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold text-white">{stats.totalBookings}</p>
                  <span className="text-xs text-slate-400">笔</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+15.2%</span>
                  <span className="text-xs text-slate-500">较上月</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Bookmark className="w-7 h-7 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">累计营收</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold text-white">¥{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+22.8%</span>
                  <span className="text-xs text-slate-500">较上月</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Wallet className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">本月预订</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold text-white">{stats.thisMonthBookings}</p>
                  <span className="text-xs text-slate-400">笔</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">营收 ¥{stats.thisMonthRevenue.toLocaleString()}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CalendarDays className="w-7 h-7 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">完成率</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <p className="text-3xl font-bold text-white">{stats.confirmedRate}%</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">取消率 {stats.cancellationRate}%</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Activity className="w-7 h-7 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 月度趋势 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            月度预订趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">{data.month}</span>
                  <Badge className="bg-orange-500/20 text-orange-400">
                    {data.bookings} 笔
                  </Badge>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">¥{data.revenue.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                    style={{ width: `${(data.bookings / 60) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 搜索和筛选 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索预订号、活动或客人姓名..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="订单状态" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">全部状态</SelectItem>
                <SelectItem value="confirmed" className="text-white">已确认</SelectItem>
                <SelectItem value="pending" className="text-white">待确认</SelectItem>
                <SelectItem value="checked_in" className="text-white">已核销</SelectItem>
                <SelectItem value="cancelled" className="text-white">已取消</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                <SelectValue placeholder="活动分类" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">全部分类</SelectItem>
                <SelectItem value="文化体验" className="text-white">文化体验</SelectItem>
                <SelectItem value="手工艺" className="text-white">手工艺</SelectItem>
                <SelectItem value="健康养生" className="text-white">健康养生</SelectItem>
                <SelectItem value="艺术表演" className="text-white">艺术表演</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px] bg-slate-800 border-slate-700 text-white">
                <CalendarRange className="w-4 h-4 mr-2" />
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white">全部时间</SelectItem>
                <SelectItem value="today" className="text-white">今日</SelectItem>
                <SelectItem value="week" className="text-white">本周</SelectItem>
                <SelectItem value="month" className="text-white">本月</SelectItem>
                <SelectItem value="quarter" className="text-white">本季度</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <FilterX className="w-4 h-4 mr-2" />
              清除筛选
            </Button>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <RefreshCw className="w-4 h-4 mr-2" />
              刷新
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              导出Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 预订列表 */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <History className="w-5 h-5 text-orange-400" />
            预订记录
            <Badge className="bg-orange-500 text-white">{filteredBookings.length}</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {selectedBookings.length > 0 && (
              <>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                  批量操作
                </Button>
                <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-950">
                  <Trash2 className="w-4 h-4 mr-1" />
                  删除
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Printer className="w-4 h-4 mr-1" />
              打印
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable>
            <DataTableHeader>
              <tr>
                <DataTableHead className="w-10">
                  <input
                    type="checkbox"
                    className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBookings(filteredBookings.map(b => b.id))
                      } else {
                        setSelectedBookings([])
                      }
                    }}
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                  />
                </DataTableHead>
                <DataTableHead>预订号</DataTableHead>
                <DataTableHead>活动信息</DataTableHead>
                <DataTableHead>客人信息</DataTableHead>
                <DataTableHead>时间</DataTableHead>
                <DataTableHead>人数/金额</DataTableHead>
                <DataTableHead>状态</DataTableHead>
                <DataTableHead align="center">操作</DataTableHead>
              </tr>
            </DataTableHeader>
            <DataTableBody>
              {filteredBookings.map((booking) => (
                <DataTableRow key={booking.id} className={selectedBookings.includes(booking.id) ? 'bg-orange-500/5' : ''}>
                  <DataTableCell>
                    <input
                      type="checkbox"
                      className="rounded border-slate-600 bg-slate-800 text-orange-500 focus:ring-orange-500"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => toggleSelection(booking.id)}
                    />
                  </DataTableCell>
                  <DataTableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-white">{booking.id}</p>
                      <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                        {booking.source}
                      </Badge>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="space-y-1">
                      <p className="text-white font-medium">{booking.activity}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                          {booking.category}
                        </Badge>
                        <span className="text-xs text-slate-500">{booking.duration}</span>
                      </div>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <GuestIdentity
                      name={booking.guest.name}
                      nationality={booking.guest.nationality}
                      language={booking.guest.language}
                    />
                  </DataTableCell>
                  <DataTableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-white">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {booking.time}
                      </div>
                      <p className="text-xs text-slate-500">{booking.date}</p>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-white">
                        <Users className="w-3 h-3 text-blue-400" />
                        {booking.people} 人
                      </div>
                      <p className="text-sm font-medium text-emerald-400">¥{booking.amount}</p>
                    </div>
                  </DataTableCell>
                  <DataTableCell>
                    <div className="space-y-1">
                      <StatusBadge status={booking.status as any}>
                        {booking.status === 'confirmed' ? '已确认' : 
                         booking.status === 'pending' ? '待确认' : 
                         booking.status === 'cancelled' ? '已取消' : '已核销'}
                      </StatusBadge>
                      {booking.checkInStatus === 'checked_in' && (
                        <p className="text-xs text-emerald-400">
                          已核销 {booking.checkInTime}
                        </p>
                      )}
                    </div>
                  </DataTableCell>
                  <DataTableCell align="center">
                    <div className="flex items-center justify-center gap-1">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                        <Receipt className="w-4 h-4" />
                      </Button>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>

          {/* 分页 */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-slate-400">
              显示 {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, filteredBookings.length)} 条，共 {filteredBookings.length} 条
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="border-slate-700 text-slate-300"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                上一页
              </Button>
              {[1, 2].map(page => (
                <Button 
                  key={page}
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-orange-500 border-orange-500 text-white" : "border-slate-700 text-slate-300"}
                >
                  {page}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage >= 2}
                onClick={() => setCurrentPage(p => p + 1)}
                className="border-slate-700 text-slate-300"
              >
                下一页
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快捷报表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">分类统计</p>
                <p className="text-sm text-slate-400">查看各活动类别预订分布</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">客户分析</p>
                <p className="text-sm text-slate-400">客户来源和偏好分析</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">财务报表</p>
                <p className="text-sm text-slate-400">导出月度营收报表</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
