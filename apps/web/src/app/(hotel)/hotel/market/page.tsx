'use client'

import { PageHeader } from '@/components/dashboard/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/dashboard/StatCard'
import { GlowButton } from '@/components/ui/GlowButton'
import { useToast } from '@/stores/toastStore'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import { 
  Radar, 
  TrendingUp, 
  Calendar, 
  Lightbulb, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  ArrowRight,
  Building2,
  Zap,
  Globe
} from 'lucide-react'
import { motion } from 'framer-motion'

// AI市场建议数据 - 针对外国入境游优化
const aiMarketSuggestions = [
  {
    id: 1,
    type: 'pricing',
    priority: 'high',
    icon: TrendingDown,
    color: '#FF4757',
    title: '竞品降价预警',
    message: '胡同精品酒店降价15%（¥680→¥580），建议跟进或突出您的差异化服务',
    action: '查看详情',
    impact: '预计影响入住率-8%',
  },
  {
    id: 2,
    type: 'demand',
    priority: 'high',
    icon: Target,
    color: '#00E396',
    title: '春节旅游高峰',
    message: '春节期间外国游客激增+45%，建议调价至¥750-850并推出文化体验套餐',
    action: '一键调价',
    impact: '预计增收+¥18,000',
  },
  {
    id: 3,
    type: 'event',
    priority: 'high',
    icon: Calendar,
    color: '#FFB800',
    title: '故宫特展红利',
    message: '紫禁城建成600周年特展，外国游客预订量激增+60%，建议跟进调价',
    action: '设置动态定价',
    impact: '预计增收+¥15,000',
  },
  {
    id: 4,
    type: 'visa',
    priority: 'medium',
    icon: Globe,
    color: '#A855F7',
    title: '免签政策利好',
    message: '144小时免签政策扩大，预计欧美游客增加30%，建议优化英语服务',
    action: '查看优化建议',
    impact: '长期利好',
  },
]

// 竞品数据
const competitorData = [
  { name: '胡同精品酒店', price: 580, change: -15, trend: 'down', distance: '0.3km' },
  { name: '四合院客栈', price: 520, change: 0, trend: 'stable', distance: '0.5km' },
  { name: '皇家驿栈', price: 680, change: +5, trend: 'up', distance: '0.8km' },
  { name: '本店', price: 550, change: 0, trend: 'stable', distance: '0km', isSelf: true },
]

// 事件数据 - 针对外国入境游优化
const eventsData = [
  { 
    name: '春节庙会文化体验', 
    date: '2024年2月10-17日', 
    location: '地坛/龙潭湖', 
    impact: '+45%', 
    daysLeft: 8,
    tags: ['传统文化', '外国游客热门'],
    foreignInterest: 'high'
  },
  { 
    name: '紫禁城600年特展', 
    date: '2024年全年', 
    location: '故宫博物院', 
    impact: '+60%', 
    daysLeft: 0,
    tags: ['文化遗产', '必游景点'],
    foreignInterest: 'high'
  },
  { 
    name: '北京国际马拉松', 
    date: '2024年10月20日', 
    location: '天安门-鸟巢', 
    impact: '+35%', 
    daysLeft: 230,
    tags: ['体育赛事', '国际选手'],
    foreignInterest: 'high'
  },
  { 
    name: '798国际艺术季', 
    date: '2024年4月1-30日', 
    location: '798艺术区', 
    impact: '+25%', 
    daysLeft: 28,
    tags: ['当代艺术', '文艺青年'],
    foreignInterest: 'high'
  },
  { 
    name: '环球影城周年庆典', 
    date: '2024年9月20日', 
    location: '通州', 
    impact: '+40%', 
    daysLeft: 200,
    tags: ['主题公园', '家庭游客'],
    foreignInterest: 'medium'
  },
]

export default function MarketPage() {
  const toast = useToast()

  const handleAction = (action: string, suggestion: typeof aiMarketSuggestions[0]) => {
    if (action === '一键调价') {
      toast.success('调价建议已生成', '请前往AI定价页面查看并确认')
    } else if (action === '查看详情') {
      toast.info('竞品分析', `正在分析${suggestion.message.split('降价')[0]}的定价策略...`)
    } else if (action === '设置动态定价') {
      toast.success('动态定价已启用', '系统将在活动期间自动调整价格')
    } else {
      toast.success(`${action}成功`)
    }
  }

  const dismissSuggestion = (id: number) => {
    toast.info('建议已标记为已读')
  }

  return (
    <div className="p-8">
      <PageHeader
        title="市场情报"
        description="监控市场动态，智能定价决策"
      />

      {/* 核心指标 */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StaggerItem>
          <StatCard
            title="本城事件"
            value="12"
            subtitle="未来30天"
            icon={Calendar}
            iconColor="bg-blue-500"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="竞品监控"
            value="8"
            subtitle="周边酒店"
            icon={Radar}
            iconColor="bg-purple-500"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            title="需求预测"
            value="+15%"
            trend="较上月"
            trendUp={true}
            icon={TrendingUp}
            iconColor="bg-emerald-500"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* AI市场建议卡片 */}
      <FadeIn delay={0.1}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">AI市场建议</h2>
            <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
              基于实时数据分析
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {aiMarketSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon
              return (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-5 rounded-xl border overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${suggestion.color}10 0%, ${suggestion.color}05 100%)`,
                    borderColor: `${suggestion.color}30`
                  }}
                >
                  {/* 优先级标识 */}
                  {suggestion.priority === 'high' && (
                    <div 
                      className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: suggestion.color }}
                    />
                  )}
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${suggestion.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: suggestion.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium flex items-center gap-2">
                        {suggestion.title}
                        {suggestion.priority === 'high' && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                            紧急
                          </span>
                        )}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{suggestion.message}</p>
                    </div>
                  </div>

                  <div 
                    className="text-xs mb-3 flex items-center gap-1"
                    style={{ color: suggestion.color }}
                  >
                    <Zap className="w-3 h-3" />
                    {suggestion.impact}
                  </div>

                  <div className="flex gap-2">
                    <GlowButton
                      size="sm"
                      color={suggestion.color}
                      className="flex-1"
                      icon={<ArrowRight className="w-3 h-3" />}
                      onClick={() => handleAction(suggestion.action, suggestion)}
                    >
                      {suggestion.action}
                    </GlowButton>
                    <GlowButton
                      size="sm"
                      variant="outline"
                      color="#8B9AAF"
                      onClick={() => dismissSuggestion(suggestion.id)}
                    >
                      忽略
                    </GlowButton>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 竞品价格监控 - 增强版 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              竞品价格监控
            </CardTitle>
            <span className="text-xs text-slate-500">实时更新</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {competitorData.map((hotel) => (
                <div 
                  key={hotel.name}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    hotel.isSelf 
                      ? 'bg-cyan-500/10 border border-cyan-500/30' 
                      : 'bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      hotel.trend === 'up' ? 'bg-emerald-400' :
                      hotel.trend === 'down' ? 'bg-red-400' :
                      'bg-slate-400'
                    }`} />
                    <div>
                      <span className={`font-medium ${hotel.isSelf ? 'text-cyan-400' : 'text-slate-300'}`}>
                        {hotel.name} {hotel.isSelf && '(本店)'}
                      </span>
                      <p className="text-xs text-slate-500">{hotel.distance}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold">¥{hotel.price}</span>
                    {!hotel.isSelf && hotel.change !== 0 && (
                      <p className={`text-xs ${
                        hotel.change > 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {hotel.change > 0 ? '+' : ''}{hotel.change}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                您当前定价低于区域均价8%，存在提价空间
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 近期事件 - 针对外国游客优化 */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              外国游客热门活动
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
 入境游导向
              </span>
            </CardTitle>
            <GlowButton size="sm" variant="outline">
              查看全部
            </GlowButton>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventsData.map((event: any) => (
                <div key={event.name} className="p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-medium">{event.name}</span>
                        {/* 外国游客兴趣度标识 */}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          event.foreignInterest === 'high' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {event.foreignInterest === 'high' ? '🔥 外国游客热门' : '👥 国际友好'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{event.date} · {event.location}</p>
                      {/* 标签展示 */}
                      <div className="flex gap-1 mt-2">
                        {event.tags?.map((tag: string) => (
                          <span 
                            key={tag} 
                            className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-emerald-400 font-medium">{event.impact}</span>
                      <p className="text-xs text-slate-500">
                        {event.daysLeft === 0 ? '进行中' : `${event.daysLeft}天后`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${Math.max(5, event.daysLeft === 0 ? 100 : 100 - event.daysLeft)}%` }}
                      />
                    </div>
                    <GlowButton size="sm" color="#00E396">
                      设置定价
                    </GlowButton>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 提示信息 */}
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-400 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                这些活动对外国游客最具吸引力，建议提前准备多语言服务
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 数据洞察说明 */}
      <FadeIn delay={0.3}>
        <Card className="bg-slate-900 border-slate-800 mt-6">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              为什么这些活动更适合外国游客？
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">🎯 文化体验导向</h4>
                <p className="text-slate-400">
                  外国游客来中国主要寻求文化体验（故宫、春节、茶艺），而非商务活动或华语娱乐
                </p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">💰 支付能力更强</h4>
                <p className="text-slate-400">
                  外国游客平均客单价¥680，比国内游客高40%，对价格敏感度较低
                </p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">🌍 免签政策利好</h4>
                <p className="text-slate-400">
                  144小时免签政策吸引大量欧美游客，预计2024年外国游客增长50%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}
