'use client'

import React, { useState, useCallback } from 'react'
import { 
  CreditCard, 
  PayPalIcon, 
  CheckCircle2, 
  Lock,
  Shield,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  BadgeCheck,
  Building2,
  Wallet
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

// 支付方式类型
 type PaymentMethod = 'stripe' | 'paypal' | 'alipay' | 'wechat'

// 币种类型
 type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY'

// 汇率映射（简化版，实际应该从API获取）
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 150,
  CNY: 7.2,
}

// 币种符号
const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  CNY: '¥',
}

interface PriceBreakdown {
  roomRate: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  total: number
  nights: number
}

interface PaymentFlowProps {
  hotelName: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  basePriceUSD: number
  onSuccess?: (paymentId: string) => void
  onCancel?: () => void
}

/**
 * PaymentFlow - 完整支付流程组件
 * 支持多支付方式（Stripe/PayPal/支付宝/微信）和多币种
 */
export function PaymentFlow({
  hotelName,
  roomType,
  checkIn,
  checkOut,
  guests,
  basePriceUSD,
  onSuccess,
  onCancel,
}: PaymentFlowProps) {
  const t = useTranslations()
  const locale = useLocale()
  
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [currency, setCurrency] = useState<Currency>('USD')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 表单状态
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // 计算价格明细
  const calculatePrice = useCallback((): PriceBreakdown => {
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    const roomRate = basePriceUSD * nights
    const cleaningFee = 15 * nights
    const serviceFee = roomRate * 0.12
    const taxes = (roomRate + cleaningFee + serviceFee) * 0.1
    const total = roomRate + cleaningFee + serviceFee + taxes
    
    return {
      roomRate,
      cleaningFee,
      serviceFee,
      taxes,
      total,
      nights,
    }
  }, [basePriceUSD, checkIn, checkOut])

  const price = calculatePrice()
  const exchangeRate = exchangeRates[currency]
  const symbol = currencySymbols[currency]

  // 转换金额
  const convertAmount = (amountUSD: number): number => {
    return Math.round(amountUSD * exchangeRate * 100) / 100
  }

  // 格式化卡号
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    }
    return v
  }

  // 格式化过期日期
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  // 验证表单
  const validateStep1 = () => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions')
      return false
    }
    setError(null)
    return true
  }

  const validateStep2 = () => {
    if (paymentMethod === 'stripe') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setError('Please enter a valid card number')
        return false
      }
      if (expiryDate.length < 5) {
        setError('Please enter a valid expiry date')
        return false
      }
      if (cvv.length < 3) {
        setError('Please enter a valid CVV')
        return false
      }
      if (!cardholderName.trim()) {
        setError('Please enter the cardholder name')
        return false
      }
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    setError(null)
    return true
  }

  // 处理支付
  const handlePayment = async () => {
    if (!validateStep2()) return
    
    setIsProcessing(true)
    setError(null)

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟成功（90%成功率）
      if (Math.random() > 0.1) {
        const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        setStep(3)
        onSuccess?.(paymentId)
      } else {
        throw new Error('Payment declined by issuer')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  // 渲染步骤1 - 订单确认
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* 订单摘要 */}
      <div className="bg-[#1E2746] rounded-xl p-4">
        <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">{hotelName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">{roomType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Check-in</span>
            <span>{checkIn}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Check-out</span>
            <span>{checkOut}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Guests</span>
            <span>{guests}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Nights</span>
            <span>{price.nights}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Room rate ({price.nights} nights)</span>
            <span>{symbol}{convertAmount(price.roomRate).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Cleaning fee</span>
            <span>{symbol}{convertAmount(price.cleaningFee).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Service fee</span>
            <span>{symbol}{convertAmount(price.serviceFee).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Taxes (10%)</span>
            <span>{symbol}{convertAmount(price.taxes).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-[#00D0DD]">{symbol}{convertAmount(price.total).toFixed(2)} {currency}</span>
          </div>
        </div>
      </div>

      {/* 币种选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Select Currency</label>
        <div className="grid grid-cols-5 gap-2">
          {(Object.keys(currencySymbols) as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                currency === c
                  ? 'bg-[#00F0FF] text-white'
                  : 'bg-[#252D4A] text-gray-300 hover:bg-[#2D3655]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 支付安全提示 */}
      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-green-800">Secure Payment</p>
          <p className="text-xs text-green-600">Your payment information is encrypted and secure. We never store your full card details.</p>
        </div>
      </div>

      {/* 条款同意 */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-[#00F0FF] focus:ring-[#00F0FF] mt-0.5"
        />
        <label htmlFor="terms" className="text-sm text-gray-400">
          I agree to the{' '}
          <a href="/terms" className="text-[#00F0FF] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="/cancellation" className="text-[#00F0FF] hover:underline">Cancellation Policy</a>
        </label>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )

  // 渲染步骤2 - 支付信息
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* 支付方式选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Payment Method</label>
        <div className="space-y-2">
          {/* Stripe - Credit Card */}
          <button
            onClick={() => setPaymentMethod('stripe')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
              paymentMethod === 'stripe'
                ? 'border-[#00F0FF] bg-[#00F0FF]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">Credit/Debit Card</p>
              <p className="text-sm text-gray-400">Visa, Mastercard, Amex, JCB</p>
            </div>
            {paymentMethod === 'stripe' && <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />}
          </button>

          {/* PayPal */}
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
              paymentMethod === 'paypal'
                ? 'border-[#00F0FF] bg-[#00F0FF]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium">PayPal</p>
              <p className="text-sm text-gray-400">Fast & secure checkout</p>
            </div>
            {paymentMethod === 'paypal' && <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />}
          </button>

          {/* 支付宝 - 仅在中国IP显示 */}
          {locale === 'zh' && (
            <button
              onClick={() => setPaymentMethod('alipay')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                paymentMethod === 'alipay'
                  ? 'border-[#00F0FF] bg-[#00F0FF]/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">支付宝 Alipay</p>
                <p className="text-sm text-gray-400">中国大陆用户首选</p>
              </div>
              {paymentMethod === 'alipay' && <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />}
            </button>
          )}
        </div>
      </div>

      {/* 信用卡表单 */}
      {paymentMethod === 'stripe' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Cardholder Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* 联系信息 */}
      <div className="space-y-4">
        <h4 className="font-medium text-white">Contact Information</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00F0FF] focus:border-transparent"
          />
        </div>
      </div>

      {/* 订单总额 */}
      <div className="bg-[#00F0FF]/10 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total to Pay</span>
          <span className="text-2xl font-bold text-[#00D0DD]">{symbol}{convertAmount(price.total).toFixed(2)} {currency}</span>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  )

  // 渲染步骤3 - 支付成功
  const renderStep3 = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
      
      {/* 演示预订提醒 */}
      <div className="bg-[#FFF3CD] border border-[#856404]/20 rounded-xl p-4 mb-6 mx-4">
        <div className="flex items-center gap-2 justify-center">
          <AlertCircle className="w-5 h-5 text-[#856404]" />
          <span className="font-semibold text-[#856404]">演示预订</span>
        </div>
        <p className="text-sm text-[#856404]/80 mt-1">此为演示环境，不会产生实际扣款</p>
      </div>
      
      <p className="text-gray-400 mb-6">
        Your booking at {hotelName} has been confirmed.
      </p>
      
      <div className="bg-[#1E2746] rounded-xl p-4 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Check-in</span>
            <span className="font-medium">{checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Check-out</span>
            <span className="font-medium">{checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Paid</span>
            <span className="font-bold text-[#00D0DD]">{symbol}{convertAmount(price.total).toFixed(2)} {currency}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        A confirmation email has been sent to {email}
      </p>
    </div>
  )

  return (
    <div className="w-full max-w-lg mx-auto bg-[#141B2D] rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00F0FF] to-pink-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Complete Your Booking</h2>
          {onCancel && (
            <button onClick={onCancel} className="p-2 hover:bg-[#141B2D]/20 rounded-full">
              <Lock className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* 步骤指示器 */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s < step 
                  ? 'bg-[#141B2D] text-[#00F0FF]' 
                  : s === step 
                    ? 'bg-[#141B2D]/20 text-white border-2 border-white' 
                    : 'bg-[#141B2D]/20 text-white/60'
              }`}>
                {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-8 h-0.5 mx-1 ${
                s < step ? 'bg-[#141B2D]' : 'bg-[#141B2D]/30'
              }`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Footer Actions */}
      {step !== 3 && (
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-300 hover:bg-[#1E2746] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            )}
            
            <button
              onClick={() => {
                if (step === 1 && validateStep1()) {
                  setStep(2)
                } else if (step === 2) {
                  handlePayment()
                }
              }}
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#00F0FF] text-white rounded-xl font-medium hover:bg-[#00D0DD] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : step === 1 ? (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay {symbol}{convertAmount(price.total).toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentFlow
