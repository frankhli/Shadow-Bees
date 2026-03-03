'use client'

import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  date: string
  revenue: number
  cost?: number
}

interface RevenueChartProps {
  data: DataPoint[]
  showCost?: boolean
  color?: string
}

export function RevenueChart({ 
  data, 
  showCost = false,
  color = '#00F0FF'
}: RevenueChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 避免SSR渲染问题，只在客户端挂载后渲染图表
  if (!mounted) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center">
        <div className="w-full h-full bg-slate-800/30 rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`colorRevenue-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
            {showCost && (
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF4757" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF4757" stopOpacity={0}/>
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2738" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#6B7B90" 
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
          />
          <YAxis 
            stroke="#6B7B90" 
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
            width={50}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#141B2D', 
              border: '1px solid #2D3A55',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              padding: '12px',
            }}
            labelStyle={{ color: '#8B9AAF', marginBottom: '4px' }}
            formatter={(value, name) => [
              `¥${Number(value).toLocaleString()}`, 
              name === 'revenue' ? '收入' : '成本'
            ]}
            itemStyle={{ color: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke={color} 
            strokeWidth={2}
            fill={`url(#colorRevenue-${color.replace('#', '')})`}
            animationDuration={1500}
          />
          {showCost && (
            <Area 
              type="monotone" 
              dataKey="cost" 
              stroke="#FF4757" 
              strokeWidth={2}
              fill="url(#colorCost)" 
              animationDuration={1500}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
