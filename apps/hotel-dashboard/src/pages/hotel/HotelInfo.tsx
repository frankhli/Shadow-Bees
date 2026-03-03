import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Save,
  Upload,
  Wifi,
  Bath,
  Elevator,
  Wind,
  Car,
  Utensils,
  Languages,
} from 'lucide-react'

// 设施标签
const facilities = [
  { id: 'wifi', label: '免费WiFi', icon: Wifi },
  { id: 'westernToilet', label: '西式马桶', icon: Bath },
  { id: 'elevator', label: '电梯', icon: Elevator },
  { id: 'airCon', label: '空调', icon: Wind },
  { id: 'parking', label: '停车场', icon: Car },
  { id: 'breakfast', label: '早餐', icon: Utensils },
  { id: 'englishStaff', label: '英语服务', icon: Languages },
]

export function HotelInfo() {
  const [formData, setFormData] = useState({
    name: '胡同里精品酒店',
    nameEn: 'Hutong Boutique Hotel',
    address: '北京市东城区南锣鼓巷12号',
    phone: '+86 10 1234 5678',
    email: 'contact@hutonghotel.com',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    description: '藏在胡同里的精品酒店，体验最地道的北京生活。步行可达故宫、后海，交通便利。',
    descriptionEn: 'A boutique hotel hidden in the hutong, experience the most authentic Beijing life. Walking distance to Forbidden City and Houhai.',
    selectedFacilities: ['wifi', 'westernToilet', 'airCon', 'englishStaff'],
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleFacility = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFacilities: prev.selectedFacilities.includes(id)
        ? prev.selectedFacilities.filter(f => f !== id)
        : [...prev.selectedFacilities, id]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">基本信息</h2>
          <p className="text-gray-400 text-sm mt-1">管理您的酒店信息，这些信息将展示给游客</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors"
        >
          <Save size={18} />
          保存修改
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400"
        >
          <CheckCircle2 size={20} />
          保存成功！
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">酒店名称</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">中文名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">英文名称</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-neon-purple" />
              地址与联系方式
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">详细地址</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">电话</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg text-white focus:border-neon-cyan focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">设施配置</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {facilities.map((facility) => {
                const Icon = facility.icon
                const isSelected = formData.selectedFacilities.includes(facility.id)
                return (
                  <button
                    key={facility.id}
                    onClick={() => toggleFacility(facility.id)}
                    className={`
                      flex items-center gap-2 p-3 rounded-lg border transition-all
                      ${isSelected
                        ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan'
                        : 'bg-dark-900 border-dark-600 text-gray-400 hover:border-dark-500'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{facility.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">酒店照片</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-dark-900 rounded-lg border-2 border-dashed border-dark-600 flex flex-col items-center justify-center cursor-pointer hover:border-neon-cyan transition-colors">
                <Upload size={24} className="text-gray-500 mb-2" />
                <span className="text-xs text-gray-500">上传封面</span>
              </div>
              <div className="aspect-square bg-dark-700 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🏨</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <p className="text-amber-400 text-sm">请如实填写设施信息，虚假描述将导致差评和平台处罚。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
