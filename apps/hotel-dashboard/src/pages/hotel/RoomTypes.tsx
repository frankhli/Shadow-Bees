import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  BedDouble,
  Users,
  DollarSign,
  Edit2,
  Trash2,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import { SortableTable, Column } from '../../components/ui/SortableTable'

interface RoomType {
  id: string
  name: string
  nameEn: string
  bedType: string
  maxGuests: number
  roomCount: number
  basePrice: number
  weekendPrice: number
  size: string
  amenities: string[]
}

const mockRoomTypes: RoomType[] = [
  {
    id: '1',
    name: '舒适大床房',
    nameEn: 'Comfort King Room',
    bedType: '1.8m大床',
    maxGuests: 2,
    roomCount: 5,
    basePrice: 450,
    weekendPrice: 520,
    size: '25m²',
    amenities: ['wifi', 'ac', 'tv'],
  },
  {
    id: '2',
    name: '胡同景观房',
    nameEn: 'Hutong View Room',
    bedType: '1.8m大床',
    maxGuests: 2,
    roomCount: 3,
    basePrice: 580,
    weekendPrice: 680,
    size: '30m²',
    amenities: ['wifi', 'ac', 'tv', 'balcony'],
  },
  {
    id: '3',
    name: '家庭套房',
    nameEn: 'Family Suite',
    bedType: '1.8m+1.2m床',
    maxGuests: 4,
    roomCount: 2,
    basePrice: 880,
    weekendPrice: 1080,
    size: '45m²',
    amenities: ['wifi', 'ac', 'tv', 'living'],
  },
]

const amenityLabels: Record<string, string> = {
  wifi: 'WiFi',
  ac: '空调',
  tv: '电视',
  balcony: '阳台',
  living: '客厅',
}

export function RoomTypes() {
  const [rooms, setRooms] = useState<RoomType[]>(mockRoomTypes)
  const [showAddModal, setShowAddModal] = useState(false)

  const columns: Column<RoomType>[] = [
    {
      key: 'name',
      title: '房型名称',
      render: (row) => (
        <div>
          <div className="font-medium text-white">{row.name}</div>
          <div className="text-xs text-gray-500">{row.nameEn}</div>
        </div>
      ),
    },
    {
      key: 'bedType',
      title: '床型',
      width: '120px',
    },
    {
      key: 'maxGuests',
      title: '最大入住',
      width: '100px',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <Users size={14} className="text-gray-500" />
          <span>{row.maxGuests}人</span>
        </div>
      ),
    },
    {
      key: 'roomCount',
      title: '房间数',
      width: '80px',
      align: 'center',
    },
    {
      key: 'basePrice',
      title: '价格',
      width: '150px',
      render: (row) => (
        <div>
          <div className="flex items-center gap-1 text-white">
            <DollarSign size={14} />
            <span className="font-medium">{row.basePrice}</span>
            <span className="text-xs text-gray-500">/晚</span>
          </div>
          <div className="text-xs text-gray-500">
            周末 ¥{row.weekendPrice}
          </div>
        </div>
      ),
    },
    {
      key: 'amenities',
      title: '设施',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.amenities.slice(0, 3).map(a => (
            <span key={a} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-gray-300">
              {amenityLabels[a] || a}
            </span>
          ))}
          {row.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{row.amenities.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      title: '操作',
      width: '120px',
      align: 'center',
      render: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-neon-cyan transition-colors">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">房型管理</h2>
          <p className="text-gray-400 text-sm mt-1">管理您的房型、价格和库存</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors"
        >
          <Plus size={18} />
          添加房型
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <BedDouble size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">房型数量</p>
              <p className="text-2xl font-bold text-white">{rooms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-neon-purple" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">总房间数</p>
              <p className="text-2xl font-bold text-white">
                {rooms.reduce((sum, r) => sum + r.roomCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <DollarSign size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">平均房价</p>
              <p className="text-2xl font-bold text-white">
                ¥{Math.round(rooms.reduce((sum, r) => sum + r.basePrice, 0) / rooms.length)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Users size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">最大接待</p>
              <p className="text-2xl font-bold text-white">
                {rooms.reduce((sum, r) => sum + r.maxGuests * r.roomCount, 0)}人
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 房型列表 */}
      <SortableTable
        data={rooms}
        columns={columns}
        rowKey="id"
      />

      {/* 添加房型弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-xl border border-dark-600 p-6 w-full max-w-lg"
          >
            <h3 className="text-lg font-semibold text-white mb-4">添加新房型</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">房型名称</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                    placeholder="如：豪华大床房"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">英文名称</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                    placeholder="Deluxe King Room"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">基础价格</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                    placeholder="450"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">房间数量</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors"
              >
                保存
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
