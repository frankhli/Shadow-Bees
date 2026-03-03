import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  BedDouble,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
} from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface DayStatus {
  date: Date
  available: number
  total: number
  price: number
  bookings: number
}

const roomTypes = [
  { id: '1', name: '舒适大床房', total: 5, color: 'bg-neon-cyan' },
  { id: '2', name: '胡同景观房', total: 3, color: 'bg-neon-purple' },
  { id: '3', name: '家庭套房', total: 2, color: 'bg-emerald-500' },
]

function generateCalendarData(year: number, month: number): DayStatus[] {
  const start = startOfMonth(new Date(year, month))
  const end = endOfMonth(new Date(year, month))
  const days = eachDayOfInterval({ start, end })

  return days.map(date => {
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const basePrice = 450
    
    return {
      date,
      available: Math.floor(Math.random() * 5),
      total: 10,
      price: isWeekend ? Math.round(basePrice * 1.2) : basePrice,
      bookings: Math.floor(Math.random() * 3),
    }
  })
}

function getStatusColor(available: number, total: number): string {
  if (available === 0) return 'bg-red-500/20 border-red-500/50 text-red-400'
  if (available <= total * 0.3) return 'bg-amber-500/20 border-amber-500/50 text-amber-400'
  return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
}

function getStatusDot(available: number, total: number): string {
  if (available === 0) return 'bg-red-500'
  if (available <= total * 0.3) return 'bg-amber-500'
  return 'bg-emerald-500'
}

export function RoomCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0].id)
  const [selectedDays, setSelectedDays] = useState<Date[]>([])
  const [showBulkAction, setShowBulkAction] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const calendarData = generateCalendarData(year, month)

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const toggleDaySelection = (date: Date) => {
    setSelectedDays(prev => {
      const exists = prev.find(d => d.getTime() === date.getTime())
      if (exists) {
        return prev.filter(d => d.getTime() !== date.getTime())
      }
      return [...prev, date]
    })
  }

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">房态日历</h2>
          <p className="text-gray-400 text-sm mt-1">管理每日房态、价格和库存</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white hover:border-neon-cyan transition-colors">
            <CheckCircle2 size={18} className="text-emerald-400" />
            批量开房
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white hover:border-red-400 transition-colors">
            <XCircle size={18} className="text-red-400" />
            批量关房
          </button>
        </div>
      </div>

      {/* 房型选择 */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">选择房型：</span>
        {roomTypes.map((room) => (
          <button
            key={room.id}
            onClick={() => setSelectedRoom(room.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
              ${selectedRoom === room.id
                ? 'bg-dark-700 border-neon-cyan text-white'
                : 'bg-dark-800 border-dark-600 text-gray-400 hover:border-dark-500'
              }
            `}
          >
            <div className={`w-2 h-2 rounded-full ${room.color}`} />
            <span className="text-sm">{room.name}</span>
            <span className="text-xs text-gray-500">({room.total}间)</span>
          </button>
        ))}
      </div>

      {/* 日历 */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
        {/* 日历头部 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-white">
              {format(currentDate, 'yyyy年 M月', { locale: zhCN })}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-1 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* 图例 */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-gray-400">充足</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-gray-400">紧张</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-400">满房</span>
            </div>
          </div>
        </div>

        {/* 星期头部 */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 日历格子 */}
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((day, index) => {
            const isSelected = selectedDays.find(d => d.getTime() === day.date.getTime())
            return (
              <motion.div
                key={day.date.toISOString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => toggleDaySelection(day.date)}
                className={`
                  min-h-[100px] p-3 rounded-lg border cursor-pointer transition-all
                  ${isToday(day.date) ? 'border-neon-cyan' : 'border-dark-600'}
                  ${isSelected ? 'ring-2 ring-neon-cyan ring-offset-2 ring-offset-dark-800' : ''}
                  ${getStatusColor(day.available, day.total)}
                  hover:border-neon-cyan/50
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${isToday(day.date) ? 'text-neon-cyan' : ''}`}>
                    {format(day.date, 'd')}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(day.available, day.total)}`} />
                </div>

                <div className="space-y-1">
                  <div className="text-lg font-bold">
                    {day.available}<span className="text-xs text-gray-500">/{day.total}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <DollarSign size={10} />
                    <span>{day.price}</span>
                  </div>
                  {day.bookings > 0 && (
                    <div className="flex items-center gap-1 text-xs">
                      <CheckCircle2 size={10} />
                      <span>{day.bookings}单</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 批量操作面板 */}
      {selectedDays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-800 rounded-xl border border-dark-600 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white">
                已选择 <span className="text-neon-cyan font-bold">{selectedDays.length}</span> 天
              </span>
              <div className="h-4 w-px bg-dark-600" />
              <span className="text-gray-400 text-sm">
                {selectedDays.map(d => format(d, 'M/d')).join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedDays([])}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                取消选择
              </button>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="设置价格"
                  className="w-24 px-3 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white text-sm focus:border-neon-cyan focus:outline-none"
                />
                <button className="px-4 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors">
                  应用
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
