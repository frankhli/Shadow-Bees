import { motion } from 'framer-motion'
import {
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  TrendingUp,
} from 'lucide-react'

const mockOwners = [
  {
    id: '1',
    name: '王经理',
    hotelName: '胡同里精品酒店',
    email: 'wang@hutonghotel.com',
    phone: '+86 138 1234 5678',
    status: 'active',
    joinDate: '2024-01-15',
    totalRevenue: 128500,
  },
  {
    id: '2',
    name: '李总',
    hotelName: '上海外滩酒店',
    email: 'li@bundhotel.com',
    phone: '+86 139 8765 4321',
    status: 'active',
    joinDate: '2024-02-01',
    totalRevenue: 256000,
  },
  {
    id: '3',
    name: '张老板',
    hotelName: '西安古城客栈',
    email: 'zhang@xianinn.com',
    phone: '+86 137 1111 2222',
    status: 'pending',
    joinDate: '2024-03-10',
    totalRevenue: 0,
  },
]

export function UserOwners() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">酒店业主</h2>
          <p className="text-gray-400 text-sm mt-1">管理入驻酒店业主</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Building2 size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">业主总数</p>
              <p className="text-2xl font-bold text-white">128</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">活跃业主</p>
              <p className="text-2xl font-bold text-white">118</p>
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
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">业主/酒店</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">联系方式</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">状态</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">总收入</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">入驻时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-600">
            {mockOwners.map((owner) => (
              <motion.tr
                key={owner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-dark-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-white">{owner.hotelName}</p>
                    <p className="text-sm text-gray-500">负责人：{owner.name}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail size={14} className="text-gray-500" />
                      {owner.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Phone size={14} className="text-gray-500" />
                      {owner.phone}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    owner.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {owner.status === 'active' ? '活跃' : '待审核'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 text-white">
                    <TrendingUp size={14} className="text-emerald-400" />
                    ¥{owner.totalRevenue.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-400 text-sm">{owner.joinDate}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
