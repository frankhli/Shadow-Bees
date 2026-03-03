import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  CheckCircle2,
  XCircle,
  Eye,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react'

interface PendingHotel {
  id: string
  name: string
  nameEn: string
  city: string
  address: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
  roomCount: number
  submitDate: string
  licenseNo: string
}

const mockPendingHotels: PendingHotel[] = [
  {
    id: '1',
    name: '西安古城客栈',
    nameEn: 'Xian Ancient City Inn',
    city: '西安',
    address: '西安市碑林区南大街120号',
    ownerName: '张老板',
    ownerPhone: '+86 139 1234 5678',
    ownerEmail: 'zhang@xianinn.com',
    roomCount: 8,
    submitDate: '2024-03-10',
    licenseNo: '陕特旅字第20240088号',
  },
  {
    id: '2',
    name: '丽江古城客栈',
    nameEn: 'Lijiang Ancient Town Inn',
    city: '丽江',
    address: '丽江市古城区五一街兴仁上段',
    ownerName: '杨经理',
    ownerPhone: '+86 138 8765 4321',
    ownerEmail: 'yang@lijianginn.com',
    roomCount: 12,
    submitDate: '2024-03-09',
    licenseNo: '云特旅字第20240123号',
  },
  {
    id: '3',
    name: '厦门海边民宿',
    nameEn: 'Xiamen Seaside Homestay',
    city: '厦门',
    address: '厦门市思明区环岛路',
    ownerName: '陈总',
    ownerPhone: '+86 137 1111 2222',
    ownerEmail: 'chen@xiamenstay.com',
    roomCount: 6,
    submitDate: '2024-03-08',
    licenseNo: '闽特旅字第20240056号',
  },
]

export function HotelPending() {
  const [selectedHotel, setSelectedHotel] = useState<PendingHotel | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">待审核酒店</h2>
          <p className="text-gray-400 text-sm mt-1">
            共有 <span className="text-amber-400 font-bold">{mockPendingHotels.length}</span> 家酒店等待审核
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 待审核列表 */}
        <div className="space-y-4">
          {mockPendingHotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedHotel(hotel)}
              className={`
                p-6 bg-dark-800 rounded-xl border cursor-pointer transition-all
                ${selectedHotel?.id === hotel.id
                  ? 'border-neon-purple ring-2 ring-neon-purple/20'
                  : 'border-dark-600 hover:border-dark-500'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-2xl">
                    🏨
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{hotel.name}</h3>
                    <p className="text-sm text-gray-500">{hotel.nameEn}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                      <MapPin size={14} />
                      <span>{hotel.city} · {hotel.roomCount}间房</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
                  待审核
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-dark-600">
                <Calendar size={14} className="text-gray-500" />
                <span className="text-sm text-gray-400">提交时间：{hotel.submitDate}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 详情面板 */}
        <div>
          {selectedHotel ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 rounded-xl border border-dark-600 p-6 sticky top-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">审核详情</h3>

              <div className="space-y-6">
                {/* 酒店信息 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">酒店信息</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Building2 size={16} className="text-gray-500" />
                      <div>
                        <p className="text-white">{selectedHotel.name}</p>
                        <p className="text-xs text-gray-500">{selectedHotel.nameEn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-gray-500" />
                      <p className="text-gray-300">{selectedHotel.address}</p>
                    </div>
                    <div className="p-3 bg-dark-900 rounded-lg">
                      <p className="text-xs text-gray-500">特种行业许可证</p>
                      <p className="text-sm text-white font-mono">{selectedHotel.licenseNo}</p>
                    </div>
                  </div>
                </div>

                {/* 负责人信息 */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-3">负责人信息</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-gray-500" />
                      <p className="text-white">{selectedHotel.ownerName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-gray-500" />
                      <p className="text-gray-300">{selectedHotel.ownerPhone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-500" />
                      <p className="text-gray-300">{selectedHotel.ownerEmail}</p>
                    </div>
                  </div>
                </div>

                {/* 审核操作 */}
                <div className="pt-6 border-t border-dark-600">
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">
                      <CheckCircle2 size={18} />
                      通过审核
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                      <XCircle size={18} />
                      拒绝
                    </button>
                  </div>
                  <button className="w-full mt-3 py-2 text-gray-400 hover:text-white transition-colors">
                    查看完整资料
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-dark-800 rounded-xl border border-dark-600 border-dashed p-12 flex flex-col items-center justify-center text-gray-500">
              <Eye size={48} className="mb-4 opacity-50" />
              <p>点击左侧酒店查看详情并进行审核</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
