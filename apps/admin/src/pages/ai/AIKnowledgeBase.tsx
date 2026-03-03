import { motion } from 'framer-motion'
import {
  Brain,
  Database,
  MessageSquare,
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'

const knowledgeItems = [
  {
    id: '1',
    category: 'faq',
    title: '北京酒店预订常见问题',
    content: '包含酒店预订流程、取消政策、价格说明等...',
    status: 'active',
    lastUpdated: '2024-03-15',
    usage: 1256,
  },
  {
    id: '2',
    category: 'attraction',
    title: '北京必去景点推荐',
    content: '故宫、长城、天坛、颐和园等热门景点介绍...',
    status: 'active',
    lastUpdated: '2024-03-14',
    usage: 2341,
  },
  {
    id: '3',
    category: 'dining',
    title: '北京美食指南',
    content: '烤鸭、涮羊肉、老北京小吃等美食推荐...',
    status: 'draft',
    lastUpdated: '2024-03-13',
    usage: 0,
  },
  {
    id: '4',
    category: 'guide',
    title: '导游服务说明',
    content: '导游预约流程、价格标准、服务范围等...',
    status: 'active',
    lastUpdated: '2024-03-12',
    usage: 567,
  },
]

const chatLogs = [
  {
    id: '1',
    user: '游客A',
    query: '推荐一个靠近故宫的酒店',
    response: '推荐您考虑"胡同里精品酒店"，距离故宫步行仅需10分钟...',
    helpful: true,
    timestamp: '2024-03-15 10:30',
  },
  {
    id: '2',
    user: '游客B',
    query: '长城一日游怎么安排',
    response: '建议早上7点出发，可以选择慕田峪长城，人少景美...',
    helpful: true,
    timestamp: '2024-03-15 09:15',
  },
  {
    id: '3',
    user: '游客C',
    query: '这个酒店价格包含早餐吗',
    response: '抱歉，我没有找到相关信息。',
    helpful: false,
    timestamp: '2024-03-15 08:45',
  },
]

export function AIKnowledgeBase() {
  const [activeTab, setActiveTab] = useState('knowledge')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">AI训练中心</h2>
          <p className="text-gray-400 text-sm mt-1">管理AI知识库，优化客服体验</p>
        </div>
        <button className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm hover:bg-neon-cyan/30 transition-colors flex items-center gap-2">
          <Plus size={16} />
          新增知识
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
              <Database size={20} className="text-neon-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">知识库条目</p>
              <p className="text-2xl font-bold text-white">428</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">已启用</p>
              <p className="text-2xl font-bold text-white">386</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
              <MessageSquare size={20} className="text-neon-purple" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">今日对话</p>
              <p className="text-2xl font-bold text-white">1,256</p>
            </div>
          </div>
        </div>
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Brain size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">解决率</p>
              <p className="text-2xl font-bold text-white">87%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-dark-800 p-1 rounded-lg w-fit">
        {[
          { id: 'knowledge', label: '知识库管理', icon: Database },
          { id: 'logs', label: '对话日志', icon: MessageSquare },
          { id: 'training', label: '模型训练', icon: Brain },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
              activeTab === t.id
                ? 'bg-neon-cyan text-dark-900 font-medium'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <t.icon size={16} />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'knowledge' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
          <div className="p-4 border-b border-dark-600 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="搜索知识条目..."
                className="w-full bg-dark-900 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan"
              />
            </div>
            <select className="bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-neon-cyan">
              <option value="all">全部分类</option>
              <option value="faq">常见问题</option>
              <option value="attraction">景点</option>
              <option value="dining">美食</option>
              <option value="guide">导游</option>
            </select>
          </div>
          <table className="w-full">
            <thead className="bg-dark-900">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">分类</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">标题</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">状态</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">使用次数</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">更新时间</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {knowledgeItems.map((item) => (
                <tr key={item.id} className="hover:bg-dark-700/50 transition-colors">
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.category === 'faq' ? 'bg-neon-cyan/20 text-neon-cyan' :
                      item.category === 'attraction' ? 'bg-neon-purple/20 text-neon-purple' :
                      item.category === 'dining' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.category === 'faq' ? 'FAQ' :
                       item.category === 'attraction' ? '景点' :
                       item.category === 'dining' ? '美食' : '导游'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{item.content}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.status === 'active' ? '已启用' : '草稿'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300">{item.usage}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{item.lastUpdated}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-dark-700 rounded-lg transition-colors">
                        <Edit2 size={16} className="text-gray-400" />
                      </button>
                      <button className="p-1.5 hover:bg-dark-700 rounded-lg transition-colors">
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 overflow-hidden">
          <table className="w-full">
            <thead className="bg-dark-900">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">时间</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">用户</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">问题</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">AI回复</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400">满意度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              {chatLogs.map((log) => (
                <tr key={log.id} className="hover:bg-dark-700/50 transition-colors">
                  <td className="py-4 px-4 text-gray-400 text-sm">{log.timestamp}</td>
                  <td className="py-4 px-4 text-gray-300">{log.user}</td>
                  <td className="py-4 px-4 text-white">{log.query}</td>
                  <td className="py-4 px-4 text-gray-300 text-sm max-w-xs truncate">{log.response}</td>
                  <td className="py-4 px-4">
                    {log.helpful ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : (
                      <AlertCircle size={18} className="text-amber-400" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'training' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">模型训练任务</h3>
              <button className="px-3 py-1.5 bg-neon-cyan/20 text-neon-cyan rounded-lg text-sm hover:bg-neon-cyan/30 transition-colors">
                开始训练
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-dark-900 rounded-lg border border-dark-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">知识库更新训练</span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">已完成</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">训练时间：2024-03-15 03:00</p>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="p-4 bg-dark-900 rounded-lg border border-dark-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">对话反馈优化</span>
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs">进行中</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">已处理 1,256 / 2,000 条反馈</p>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '63%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="font-semibold text-white mb-4">模型性能指标</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">回答准确率</span>
                  <span className="text-white">92.5%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan rounded-full" style={{ width: '92.5%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">用户满意度</span>
                  <span className="text-white">87.0%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple rounded-full" style={{ width: '87%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">响应速度</span>
                  <span className="text-white">1.2s</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">知识覆盖率</span>
                  <span className="text-white">78.5%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '78.5%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
