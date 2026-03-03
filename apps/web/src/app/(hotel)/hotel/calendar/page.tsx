'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { CalendarGrid } from '@/components/dashboard/CalendarGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { format } from 'date-fns'
import { 
  ArrowLeftRight, 
  TrendingUp, 
  AlertCircle,
  X,
  Save,
  Sparkles,
  Minus,
  Plus
} from 'lucide-react'

// Mock 房态数据
const roomStatus: Record<string, { ota: number; direct: number; total: number; price: number }> = {
  '2024-03-01': { ota: 5, direct: 3, total: 10, price: 480 },
  '2024-03-02': { ota: 2, direct: 1, total: 10, price: 520 },
  '2024-03-03': { ota: 8, direct: 2, total: 10, price: 580 },
  '2024-03-08': { ota: 0, direct: 2, total: 10, price: 680 },
  '2024-03-09': { ota: 0, direct: 1, total: 10, price: 720 },
}

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  date: Date | null
  status: { ota: number; direct: number; total: number; price: number } | null
}

function EditModal({ isOpen, onClose, date, status }: EditModalProps) {
  const [ota, setOta] = useState(0)
  const [direct, setDirect] = useState(0)
  const [price, setPrice] = useState(500)
  const [isSaving, setIsSaving] = useState(false)

  // 当 status 变化时更新表单值
  useEffect(() => {
    if (status) {
      setOta(status.ota)
      setDirect(status.direct)
      setPrice(status.price)
    }
  }, [status])

  if (!isOpen || !date || !status) return null

  const handleSave = () => {
    setIsSaving(true)
    // 模拟保存
    setTimeout(() => {
      setIsSaving(false)
      onClose()
    }, 800)
  }

  const total = ota + direct
  const maxRooms = status.total

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">
            修改 {format(date, 'MM月dd日')} 房态
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 价格设置 */}
          <div>
            <Label className="text-slate-300 mb-2 block">房间价格</Label>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">¥</span>
              <Input 
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="bg-slate-800 border-slate-700 text-white"
              />
              <span className="text-slate-400">/晚</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">AI建议价: ¥{Math.round(price * 1.15)}</span>
            </div>
          </div>

          {/* 双池分配 */}
          <div>
            <Label className="text-slate-300 mb-3 block">库存分配 (共{maxRooms}间)</Label>
            
            {/* OTA池 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-400">OTA池</span>
                <span className="text-slate-300">{ota}间</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setOta(Math.max(0, ota - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4 text-slate-400" />
                </button>
                <input
                  type="range"
                  min={0}
                  max={maxRooms - direct}
                  value={ota}
                  onChange={(e) => setOta(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <button 
                  onClick={() => setOta(Math.min(maxRooms - direct, ota + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* 直订池 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-cyan-400">直订池</span>
                <span className="text-slate-300">{direct}间</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setDirect(Math.max(0, direct - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4 text-slate-400" />
                </button>
                <input
                  type="range"
                  min={0}
                  max={maxRooms - ota}
                  value={direct}
                  onChange={(e) => setDirect(Number(e.target.value))}
                  className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <button 
                  onClick={() => setDirect(Math.min(maxRooms - ota, direct + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* 剩余库存显示 */}
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">剩余可分配</span>
              <span className={maxRooms - total < 3 ? 'text-red-400' : 'text-emerald-400'}>
                {maxRooms - total}间
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-4 border-t border-slate-800">
          <Button 
            variant="outline" 
            className="flex-1 border-slate-700 text-slate-300"
            onClick={onClose}
          >
            取消
          </Button>
          <Button 
            className="flex-1 bg-cyan-600 hover:bg-cyan-700"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                保存中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                保存
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const renderDayContent = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const status = roomStatus[dateStr]

    if (!status) return null

    const availabilityRate = ((status.ota + status.direct) / status.total) * 100
    const isLow = availabilityRate < 30
    const isSoldOut = status.ota + status.direct === 0

    return (
      <div className="mt-1 space-y-1">
        {/* 库存条 */}
        <div className="flex gap-0.5 h-1.5">
          <div
            className="bg-blue-500 rounded-l"
            style={{ width: `${(status.ota / status.total) * 100}%` }}
          />
          <div
            className="bg-cyan-500 rounded-r"
            style={{ width: `${(status.direct / status.total) * 100}%` }}
          />
        </div>

        {/* 库存数字 */}
        <div className="text-xs space-y-0.5">
          <div className="flex justify-between">
            <span className="text-blue-400">OTA:{status.ota}</span>
            <span className="text-cyan-400">直订:{status.direct}</span>
          </div>
          <div className="flex items-center gap-1">
            {isSoldOut ? (
              <span className="text-red-400 font-medium">售罄</span>
            ) : isLow ? (
              <>
                <AlertCircle className="w-3 h-3 text-orange-400" />
                <span className="text-orange-400">紧张</span>
              </>
            ) : null}
          </div>
          <div className="text-slate-500">¥{status.price}</div>
        </div>
      </div>
    )
  }

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null
  const selectedStatus = selectedDateStr ? roomStatus[selectedDateStr] : null

  // 当选择有数据的日期时，自动打开编辑弹窗
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    const dateStr = format(date, 'yyyy-MM-dd')
    if (roomStatus[dateStr]) {
      setIsEditModalOpen(true)
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="房态日历"
        description="管理双池库存和每日定价"
      />

      {/* 图例 */}
      <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-slate-400">OTA池</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-cyan-500 rounded" />
          <span className="text-slate-400">直订池</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-700 rounded" />
          <span className="text-slate-400">已售</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-400" />
          <span className="text-slate-400">库存紧张(&lt;30%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 日历 */}
        <div className="lg:col-span-2">
          <CalendarGrid
            onDateClick={handleDateSelect}
            renderDayContent={renderDayContent}
          />
        </div>

        {/* 详情面板 */}
        <div>
          {selectedDate && selectedStatus ? (
            <Card className="bg-slate-900 border-slate-800 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">
                  {format(selectedDate, 'MM月dd日')} 房态详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 库存状态 */}
                <div>
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>总库存</span>
                    <span>{selectedStatus.total}间</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-slate-600"
                      style={{
                        width: `${((selectedStatus.total - selectedStatus.ota - selectedStatus.direct) / selectedStatus.total) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-blue-500"
                      style={{ width: `${(selectedStatus.ota / selectedStatus.total) * 100}%` }}
                    />
                    <div
                      className="bg-cyan-500"
                      style={{ width: `${(selectedStatus.direct / selectedStatus.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-slate-500">
                      剩余: {selectedStatus.total - selectedStatus.ota - selectedStatus.direct}间
                    </span>
                    <div className="flex gap-3">
                      <span className="text-blue-400">OTA: {selectedStatus.ota}</span>
                      <span className="text-cyan-400">直订: {selectedStatus.direct}</span>
                    </div>
                  </div>
                </div>

                {/* 当前定价 */}
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">当前定价</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">¥{selectedStatus.price}</span>
                    <span className="text-sm text-slate-500">/晚</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-400">AI建议价 ¥{Math.round(selectedStatus.price * 1.15)}</span>
                  </div>
                </div>

                {/* 快捷操作 */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    修改库存与价格
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <ArrowLeftRight className="w-4 h-4 mr-2" />
                    调整双池分配
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📅</span>
                </div>
                <p className="text-slate-400">点击日历日期查看详情</p>
                <p className="text-sm text-slate-500 mt-1">可修改库存、价格和双池分配</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 编辑弹窗 */}
      <EditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        date={selectedDate}
        status={selectedStatus}
      />
    </div>
  )
}
