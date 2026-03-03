'use client'

import { useState } from 'react'
import { Sparkles, Loader2, X, Check, Copy } from 'lucide-react'
import { GlowButton } from './ui/GlowButton'
import { useToast } from '@/stores/toastStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { mockAIPricingSuggestion, mockAITranslate, mockAIGenerateContent, AIResponse } from '@/lib/mock-ai'

interface AIDemoButtonProps {
  type: 'pricing' | 'translate' | 'content'
  context?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AIDemoButton({
  type,
  context = '',
  color = '#A855F7',
  size = 'sm',
  className,
}: AIDemoButtonProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)

  const typeLabels: Record<string, string> = {
    pricing: 'AI 定价建议',
    translate: 'AI 翻译',
    content: 'AI 内容生成',
  }

  const handleClick = async () => {
    setLoading(true)
    setShowDialog(true)
    
    try {
      let response: AIResponse | null = null
      
      switch (type) {
        case 'pricing':
          response = await mockAIPricingSuggestion(500, { avgPrice: 450, demand: 'high' })
          break
        case 'translate':
          response = await mockAITranslate(context || '欢迎光临', 'en')
          break
        case 'content':
          response = await mockAIGenerateContent('description', context || '北京胡同')
          break
      }
      
      setResult(response)
    } catch (error) {
      toast.error('AI 服务暂时不可用')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('已复制到剪贴板')
  }

  return (
    <>
      <GlowButton
        color={color}
        variant="outline"
        size={size}
        className={className}
        disabled={loading}
        onClick={handleClick}
        icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
      >
        {loading ? '处理中...' : typeLabels[type]}
      </GlowButton>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-[#141B2D] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color }} />
              {typeLabels[type]}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mb-4" style={{ color }} />
                <p className="text-slate-400">AI 正在思考中...</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">AI 建议</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        置信度: {Math.round(result.confidence * 100)}%
                      </span>
                      <button
                        onClick={() => copyToClipboard(result.content)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-white whitespace-pre-line">{result.content}</p>
                </div>

                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-slate-400 text-sm">其他建议:</span>
                    {result.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(suggestion)}
                        className="w-full p-3 bg-white/5 rounded-lg text-left hover:bg-white/10 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-slate-300 text-sm">{suggestion}</span>
                        <Copy className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <GlowButton
                    color="#8B9AAF"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDialog(false)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    关闭
                  </GlowButton>
                  <GlowButton
                    color={color}
                    className="flex-1"
                    onClick={() => {
                      copyToClipboard(result.content)
                      setShowDialog(false)
                    }}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    采纳建议
                  </GlowButton>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
