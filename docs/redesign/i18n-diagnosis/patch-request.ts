#!/usr/bin/env node
/**
 * i18n Translation Fallback Patch
 * 
 * 临时修复方案：为目标语言添加英语回退
 * 当目标语言的翻译缺失时，显示英语而非键名
 * 
 * 使用方法:
 * 1. 将此文件保存到 apps/web/src/i18n/request.ts (覆盖原文件)
 * 2. 重启开发服务器
 * 3. 验证修复效果
 */

import { getRequestConfig } from 'next-intl/server'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locale && locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : defaultLocale

  // 加载目标语言的翻译
  const messages = (await import(`./messages/${validLocale}.json`)).default
  
  // 如果目标语言不是英语，加载英语作为回退
  if (validLocale !== 'en') {
    const enMessages = (await import('./messages/en.json')).default
    
    // 深度合并函数：目标语言覆盖英语
    const deepMerge = (target: any, source: any): any => {
      const output = { ...target }
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = deepMerge(target[key] || {}, source[key])
        } else if (!(key in target)) {
          output[key] = source[key]
        }
      }
      return output
    }
    
    // 合并：目标语言优先，缺失的使用英语
    const mergedMessages = deepMerge(messages, enMessages)
    
    return {
      locale: validLocale,
      messages: mergedMessages
    }
  }

  return {
    locale: validLocale,
    messages
  }
})
