import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Send,
  Video,
  BookOpen,
  Hotel,
  Instagram,
} from 'lucide-react'

const platforms = [
  { id: 'tiktok', name: 'TikTok', icon: Video, description: '短视频脚本生成' },
  { id: 'xiaohongshu', name: '小红书', icon: BookOpen, description: '种草文案生成' },
  { id: 'booking', name: 'Booking.com', icon: Hotel, description: 'Listing优化' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, description: '图文文案生成' },
]

const styles = [
  { id: 'lifestyle', name: '生活方式', description: '温馨、沉浸式体验' },
  { id: 'professional', name: '专业可靠', description: '商务、高效、可信' },
  { id: 'funny', name: '幽默有趣', description: '轻松、接地气' },
  { id: 'urgent', name: '限时促销', description: '紧迫感、稀缺性' },
]

export function ContentGen() {
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok')
  const [selectedStyle, setSelectedStyle] = useState('lifestyle')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (selectedPlatform === 'tiktok') {
      setResult({
        hook: "POV: You found a hidden gem in Beijing 🏮✨",
        script: "[Show courtyard] Welcome to our hutong hotel!\n[Room tour] Traditional meets modern\n[Bathroom] Western toilet ✅\n[Staff] English speaking!\n[Neighborhood] 5min to subway",
        voiceover: "Found this amazing boutique hotel in Beijing! Perfect for experiencing authentic China. No elevator but free luggage service!",
        captions: "Hidden gem in Beijing 🏮 | Boutique hotel | English staff",
        hashtags: ["#beijing", "#chinatravel", "#boutiquehotel", "#hutong", "#travel"],
        tips: ["Film during golden hour", "Show room details", "Capture neighborhood"],
        music: "Upbeat traditional Chinese instrumental",
      })
    } else if (selectedPlatform === 'xiaohongshu') {
      setResult({
        title: "🏨 北京胡同里的宝藏酒店",
        content: `藏在北京胡同里的宝藏酒店！🏮

✨ 亮点：
- 可接待外宾（有涉外资质）
- 西式马桶，外国朋友友好
- 免费搬行李（虽然无电梯）
- 5分钟到地铁站
- 英语前台沟通无障碍

💰 价格：450-580/晚
📍 位置：北京东城区

#北京酒店 #酒店种草 #入境游 #外国人来中国`,
        highlights: ["可接待外宾", "西式马桶", "免费搬行李", "英语前台"],
        hashtags: ["#北京酒店", "#酒店种草", "#入境游"],
      })
    }
    
    setLoading(false)
  }

  const copyContent = () => {
    const text = selectedPlatform === 'tiktok' 
      ? `${result.hook}\n\n${result.script}\n\n${result.voiceover}`
      : result.content
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">AI 内容生成</h2>
          <p className="text-gray-400 text-sm mt-1">一键生成各平台的营销文案</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：配置 */}
        <div className="space-y-6">
          {/* 平台选择 */}
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4">选择平台</h3>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`
                      p-4 rounded-lg border text-left transition-all
                      ${selectedPlatform === platform.id
                        ? 'bg-neon-cyan/10 border-neon-cyan'
                        : 'bg-dark-900 border-dark-600 hover:border-dark-500'
                      }
                    `}
                  >
                    <Icon size={24} className={selectedPlatform === platform.id ? 'text-neon-cyan' : 'text-gray-400'} />
                    <p className={`font-medium mt-2 ${selectedPlatform === platform.id ? 'text-white' : 'text-gray-300'}`}>
                      {platform.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{platform.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 风格选择 */}
          <div className="bg-dark-800 rounded-xl border border-dark-600 p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-4">内容风格</h3>
            <div className="space-y-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`
                    w-full p-3 rounded-lg border text-left transition-all
                    ${selectedStyle === style.id
                      ? 'bg-neon-purple/10 border-neon-purple'
                      : 'bg-dark-900 border-dark-600 hover:border-dark-500'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={selectedStyle === style.id ? 'text-white font-medium' : 'text-gray-300'}>
                      {style.name}
                    </span>
                    {selectedStyle === style.id && <Check size={16} className="text-neon-purple" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 生成按钮 */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-neon-cyan text-dark-900 rounded-lg font-medium hover:bg-neon-cyan/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                生成内容
              </>
            )}
          </button>
        </div>

        {/* 右侧：结果 */}
        <div className="lg:col-span-2">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-800 rounded-xl border border-dark-600 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">生成结果</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerate}
                    className="p-2 rounded-lg hover:bg-dark-700 text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={copyContent}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 transition-colors"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    {copied ? '已复制' : '复制'}
                  </button>
                </div>
              </div>

              {selectedPlatform === 'tiktok' && (
                <div className="space-y-6">
                  <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
                    <p className="text-sm text-neon-cyan mb-1">Hook</p>
                    <p className="text-lg font-medium text-white">{result.hook}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">脚本</p>
                    <div className="p-4 bg-dark-900 rounded-lg whitespace-pre-line text-gray-300">
                      {result.script}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">配音文案</p>
                    <div className="p-4 bg-dark-900 rounded-lg text-white">
                      {result.voiceover}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">推荐标签</p>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-dark-900 rounded-full text-sm text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">拍摄建议</p>
                      <ul className="space-y-1">
                        {result.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-dark-900 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">音乐建议</p>
                      <p className="text-sm text-gray-300">{result.music}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedPlatform === 'xiaohongshu' && (
                <div className="space-y-6">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-400 mb-1">标题</p>
                    <p className="text-lg font-medium text-white">{result.title}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">正文</p>
                    <div className="p-4 bg-dark-900 rounded-lg whitespace-pre-line text-gray-300">
                      {result.content}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">亮点标签</p>
                      <div className="flex flex-wrap gap-2">
                        {result.highlights.map((h: string) => (
                          <span key={h} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">推荐话题</p>
                      <div className="flex flex-wrap gap-2">
                        {result.hashtags.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-dark-900 rounded text-sm text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center bg-dark-800 rounded-xl border border-dark-600 border-dashed">
              <div className="text-center">
                <Sparkles size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">选择平台和风格，点击生成按钮</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
