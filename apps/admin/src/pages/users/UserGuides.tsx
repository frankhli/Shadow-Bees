import { motion } from 'framer-motion'
import {
  Users,
  Star,
  MapPin,
  Globe,
  CheckCircle2,
  Clock,
  DollarSign,
} from 'lucide-react'

const mockGuides = [
  {
    id: '1',
    name: '李明',
    nameEn: 'Michael Li',
    avatar: '👨🏻',
    city: '北京',
    languages: ['中文', '英语'],
    specialties: ['历史', '美食'],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 200,
    status: 'active',
    licenseNo: 'D-2024-BJ-001',
  },
  {
    id: '2',
    name: 'Sarah Zhang',
    nameEn: 'Sarah Zhang',
    avatar: '👩🏻',
    city: '上海',
    languages: ['中文', '英语', '西班牙语'],
    specialties: ['美食', '购物'],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 250,
    status: 'active',
    licenseNo: 'D-2024-SH-002',
  },
  {
    id: '3',
    name: '王芳',
    nameEn: 'Emma Wang',
    avatar: '👩🏻‍🏫',
    city: '北京',
    languages: ['中文', '英语', '日语'],
    specialties: ['历史', '建筑'],
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 300,
    status: 'pending',
    licenseNo: 'D-2024-BJ-003',
  },
]

export function UserGuides() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">导游管理</h2>
          <p className="text-gray-400 text-sm mt-1">管理平台注册导游</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Users size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">导游总数</p>
              <p className="text-2xl font-bold text-white">45</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">已认证</p>
              <p className="text-2xl font-bold text-white">42</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">待审核</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <Star size={20} className="text-neon-purple" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">平均评分</p>
              <p className="text-2xl font-bold text-white">4.8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGuides.map((guide) => (
          <motion.div
            key={guide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800 rounded-xl border border-dark-600 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-3xl">
                  {guide.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{guide.nameEn}</h3>
                  <p className="text-sm text-gray-500">{guide.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">{guide.city}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                guide.status === 'active'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}>
                {guide.status === 'active' ? '已认证' : '待审核'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-dark-600">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-gray-500" />
                <span className="text-sm text-gray-300">{guide.languages.join('、')}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {guide.specialties.map((spec) => (
                  <span key={spec} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-gray-300">
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400" />
                  <span className="text-white font-medium">{guide.rating}</span>
                  <span className="text-xs text-gray-500">({guide.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-neon-cyan">
                  <DollarSign size={14} />
                  <span className="font-medium">{guide.hourlyRate}</span>
                  <span className="text-xs text-gray-500">/小时</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dark-600 flex gap-2">
              <button className="flex-1 py-2 bg-dark-700 rounded-lg text-sm text-white hover:bg-dark-600 transition-colors">
                查看详情
              </button>
              {guide.status === 'pending' && (
                <button className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors">
                  审核通过
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
