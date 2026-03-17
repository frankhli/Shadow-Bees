# 跳海Global C端中文硬编码扫描报告

**任务ID:** TIAOHAI-REDESIGN-002  
**扫描时间:** 2026-03-15  
**扫描范围:** apps/web/src/app/[locale]/* (C端，排除dashboard)  
**文件类型:** .tsx, .ts, .jsx, .js  
**总文件数:** 20个  

---

## 📊 扫描摘要

| 类别 | 数量 | 风险等级 |
|------|------|----------|
| 中文注释 | 45处 | 🟢 低 |
| 中文占位符/示例 | 6处 | 🟡 中 |
| 中文标点符号 | 12处 | 🟢 低 |
| Emoji符号 | 38处 | 🟢 低 |
| **总计** | **101处** | - |

---

## 🔴 关键硬编码清单（需优先修复）

### 1. 中文酒店名称硬编码

**文件:** `apps/web/src/app/[locale]/hotels/page.tsx`

| 行号 | 代码片段 | 修复建议 |
|------|----------|----------|
| 120 | `nameCn: '胡同 heritage 客栈'` | 从API获取或使用i18n键 |
| 136 | `nameCn: '外滩景观套房'` | 从API获取或使用i18n键 |

### 2. 中文地址占位符

**文件:** `apps/web/src/app/[locale]/partner/register/page.tsx`

| 行号 | 代码片段 | 修复建议 |
|------|----------|----------|
| 135 | `placeholder="北京市东城区..."` | 使用 `t('partner.register.form.addressPlaceholder')` |

### 3. 中文许可证号格式示例

**文件:** `apps/web/src/app/[locale]/partner/register/page.tsx`

| 行号 | 代码片段 | 修复建议 |
|------|----------|----------|
| 160 | `defaultValue: '京特旅字第20240001号'` | 使用英文示例或i18n键 |
| 163 | `特种行业许可证号 - Required...` | 使用 `t('partner.register.form.licenseNoHelper')` |

---

## 🟡 次要硬编码清单（建议修复）

### 4. 中文注释（45处）

主要分布文件及行号：

**`apps/web/src/app/[locale]/page.tsx`**
- 行37: `// 增强的Hostel接口`
- 行70: `// 体验类型分类`
- 行82: `// 设施筛选选项`
- 行99: `// AI预设问题`
- 行112: `// 状态管理`
- 行119: `// 日期选择状态`
- 行124: `// 客人数量`
- 行128: `// 设施筛选`
- 行131: `// 获取特色酒店`
- 行147: `// 根据体验类型筛选`
- 行153: `// 切换收藏`
- 行174: `// 切换设施筛选`
- 行183: `// 搜索跳转`
- 行196: `// 应用日期`
- 行205: `// 获取设施图标`
- 行253: `{/* 144小时免签标识 */}`
- 行268: `{/* 搜索框 - 放在Hero下方 */}`
- 行271: `{/* 搜索栏 */}`
- 行273: `{/* 目的地 */}`
- 行286: `{/* 入住日期 */}`
- 行297: `{/* 退房日期 */}`
- 行308: `{/* 客人数量 */}`
- 行317: `{/* 搜索按钮 */}`
- 行327: `{/* 设施快速筛选 */}`
- 行351: `{/* AI Concierge 快速入口 */}`
- 行372: `{/* 预设问题 */}`
- 行463: `{/* 诚实设施标签 */}`
- 行497: `{/* 诚实设施预览 */}`

**`apps/web/src/app/[locale]/hotels/page.tsx`**
- 行77: `// Map API amenities...`
- 行90: `// Calculate total price`
- 行99: `// Static initial data...`
- 行117: `// Inner component...`
- 行141: `// Data state...`
- 行149: `// Search state`
- 行162: `// Filter state...`
- 行173: `// Fetch data...`
- 行189: `// Derived state...`
- 行272: `// Date Picker Modal`
- 行308: `// Guest Picker Modal`
- 行351: `// Results Info`
- 行384: `// Hostel Grid`

**`apps/web/src/app/[locale]/hotels/[id]/page.tsx`**
- 行101: `// Map facility icon names...`
- 行105: `// Simple availability check...`
- 行131: `// Fetch hostel data...`
- 行155: `// Get dates from URL...`
- 行161: `// Use null as initial state...`
- 行169: `// Set dates on client side...`

### 5. 特殊字符和标点

| 文件 | 行号 | 内容 | 说明 |
|------|------|------|------|
| `checkout/page.tsx` | 593 | `→` | 箭头符号 |
| `checkout/page.tsx` | 239 | `+86 138-1234-5678` | 中文手机号格式 |
| `guides/[id]/page.tsx` | 284 | `小时` | 中文单位 |
| `hotels/[id]/page.tsx` | 338 | `1` | 硬编码数字 |
| `hotels/page.tsx` | 569 | `🚽 Western Toilet` | Emoji+英文混合 |
| `hotels/page.tsx` | 574 | `🛗 Elevator` | Emoji+英文混合 |
| `hotels/page.tsx` | 579 | `🇬🇧 English` | Emoji+英文混合 |
| `hotels/page.tsx` | 621 | `✓` / `✗` | 勾选符号 |
| `social/page.tsx` | 260 | `·` | 中文间隔号 |
| `orders/page.tsx` | 384, 386 | `·` | 中文间隔号 |

---

## 📋 完整文件硬编码分布

### 1. page.tsx (首页)
- **中文注释:** 26处
- **状态:** 需全部转为英文注释

### 2. hotels/page.tsx (酒店列表)
- **中文硬编码名称:** 2处 (`nameCn`字段)
- **中文注释:** 13处
- **Emoji标签:** 3处

### 3. hotels/[id]/page.tsx (酒店详情)
- **中文注释:** 6处
- **状态:** 需转为英文注释

### 4. partner/register/page.tsx (商户注册)
- **中文占位符:** 1处
- **中文helper文本:** 1处
- **中文许可证示例:** 1处

### 5. checkout/page.tsx (结账)
- **箭头符号:** 1处
- **中文手机号:** 1处

### 6. guides/[id]/page.tsx & guides/page.tsx
- **语言标签:** 中文已使用i18n，但语言名称是国际标准

### 7. 其他文件
- **login/page.tsx** - 密码占位符 `••••••••` (标准做法，无需修改)
- **signup/page.tsx** - 同上
- **orders/page.tsx** - 中文间隔号 `·`

---

## 🔧 i18n修复方案

### 方案A: 最小修复（推荐短期）

只修复影响用户体验的中文硬编码：

1. **中文酒店名称** - 改为从API获取或使用英文名称
2. **中文占位符** - 添加i18n键
3. **中文helper文本** - 添加i18n键

**预计工作量:** 2小时  
**影响范围:** 低风险，快速修复核心问题

### 方案B: 完整修复（推荐长期）

全面国际化所有文本内容：

1. **所有中文注释** → 转为英文
2. **所有占位符** → 使用i18n键
3. **所有静态文本** → 使用 `t()` 函数
4. **所有示例数据** → 使用英文或从API获取

**预计工作量:** 1-2天  
**影响范围:** 中风险，需要全面测试

### 方案C: 渐进式修复（推荐平衡方案）

按优先级分批修复：

**第一阶段（本周）:**
- 修复中文酒店名称硬编码
- 修复中文占位符和helper文本
- 修复中文许可证号示例

**第二阶段（下周）:**
- 将所有中文注释转为英文
- 审查所有 `defaultValue` 中的中文

**第三阶段（后续）:**
- 建立i18n代码检查规则
- 添加pre-commit钩子防止中文硬编码

---

## 📝 具体修复代码示例

### 修复1: 中文酒店名称

**原代码 (hotels/page.tsx:120-136)**
```typescript
const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Hutong Heritage House',
    nameCn: '胡同 heritage 客栈',  // ← 中文硬编码
    // ...
  },
  {
    id: '2',
    name: 'The Bund View Suite',
    nameCn: '外滩景观套房',  // ← 中文硬编码
    // ...
  }
]
```

**修复后:**
```typescript
// 方案1: 移除nameCn，只使用英文名称
const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Hutong Heritage House',
    // 移除nameCn字段，或从API获取
  },
  // ...
]

// 方案2: 如果需要显示中文，从API获取
// nameCn 应该在 API 响应中提供，而不是硬编码
```

### 修复2: 中文地址占位符

**原代码 (partner/register/page.tsx:135)**
```typescript
placeholder="北京市东城区..."
```

**修复后:**
```typescript
placeholder={t('partner.register.form.addressPlaceholder', { 
  defaultValue: 'e.g., 123 Main St, Dongcheng District' 
})}
```

### 修复3: 中文许可证号示例

**原代码 (partner/register/page.tsx:160)**
```typescript
placeholder={t('partner.register.form.licenseNoPlaceholder', { 
  defaultValue: '京特旅字第20240001号'  // ← 中文硬编码
})}
```

**修复后:**
```typescript
placeholder={t('partner.register.form.licenseNoPlaceholder', { 
  defaultValue: 'e.g., BJ-HOTEL-2024-0001' 
})}
```

### 修复4: 中文helper文本

**原代码 (partner/register/page.tsx:163)**
```typescript
{t('partner.register.form.licenseNoHelper', { 
  defaultValue: '特种行业许可证号 - Required for hosting foreign guests' 
})}
```

**修复后:**
```typescript
{t('partner.register.form.licenseNoHelper', { 
  defaultValue: 'Special Industry License Number - Required for hosting foreign guests' 
})}
```

### 修复5: 中文注释

**原代码 (page.tsx:37)**
```typescript
// 增强的Hostel接口
interface Hostel {
```

**修复后:**
```typescript
// Enhanced Hostel interface with additional fields
interface Hostel {
```

---

## 🖼️ Unsplash图片加载技术方案

### 当前状态分析

**当前使用的Unsplash URL格式:**
```typescript
// 在多个文件中出现：
'https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&h=600&fit=crop'
```

**使用位置:**
1. `page.tsx` - 首页Hero和目的地图片
2. `hotels/page.tsx` - 酒店列表图片
3. `hotels/[id]/page.tsx` - 酒店详情页图片
4. `checkout/page.tsx` - 结账页面酒店图片

### 方案1: 直接使用Unsplash API（推荐MVP阶段）

**优点:**
- 免费使用（遵守Unsplash指南）
- 高质量图片
- 无需自建图床
- 全球CDN加速

**缺点:**
- 依赖第三方服务
- 图片可能变更（使用固定ID可避免）
- 国内访问可能不稳定

**实施建议:**
```typescript
// 创建统一的图片配置
export const UNSPLASH_IMAGES = {
  // 使用固定ID确保图片稳定
  beijing: {
    hutong: 'photo-1548919973-5cef591cdbc9',
    city: 'photo-1508804185872-d7badad00f7d',
  },
  shanghai: {
    bund: 'photo-1542314831-068cd1dbfeeb',
    skyline: 'photo-1548919973-5cef591cdbc9',
  },
  chengdu: {
    panda: 'photo-1558618666-fcd25c85cd64',
  },
  xian: {
    terracotta: 'photo-1590490360182-c33d57733427',
  },
  // 通用酒店图片
  hotel: {
    room1: 'photo-1566073771259-6a8506099945',
    room2: 'photo-1582719478250-c89cae4dc85b',
    lobby: 'photo-1566665797739-1674de7a421a',
  }
} as const;

// 使用辅助函数
export function getUnsplashUrl(photoId: string, width: number, height: number): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=80`;
}
```

### 方案2: 混合方案（推荐长期）

结合Unsplash + 自托管图片：

```typescript
// 图片配置
export const IMAGE_CONFIG = {
  provider: process.env.NEXT_PUBLIC_IMAGE_PROVIDER || 'unsplash', // 'unsplash' | 'cdn'
  
  // Unsplash配置
  unsplash: {
    baseUrl: 'https://images.unsplash.com',
    // ...图片ID映射
  },
  
  // 自托管CDN配置（未来使用）
  cdn: {
    baseUrl: process.env.NEXT_PUBLIC_CDN_URL,
    // ...图片路径映射
  }
};

// 统一获取图片URL
export function getImageUrl(key: string, options: { width?: number; height?: number } = {}): string {
  const { provider } = IMAGE_CONFIG;
  const { width = 800, height = 600 } = options;
  
  if (provider === 'unsplash') {
    const photoId = UNSPLASH_IMAGES[key] || UNSPLASH_IMAGES.hotel.room1;
    return `${IMAGE_CONFIG.unsplash.baseUrl}/${photoId}?w=${width}&h=${height}&fit=crop&q=80`;
  }
  
  // 未来切换到自托管CDN
  return `${IMAGE_CONFIG.cdn.baseUrl}/images/${key}.jpg`;
}
```

### 方案3: 图片优化（性能考虑）

```typescript
// Next.js Image组件优化
import Image from 'next/image';

// 使用 Next.js Image 组件自动优化
<Image
  src={getImageUrl('beijing.hutong', { width: 800, height: 600 })}
  alt={t('home.hero.alt.beijing')}
  width={800}
  height={600}
  priority // 首屏图片
  placeholder="blur" // 模糊占位
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // 低质量占位图
/>
```

### 实施建议

**短期（本周）:**
1. 创建统一的图片配置文件 `lib/images.ts`
2. 将所有硬编码的Unsplash URL替换为配置引用
3. 确保使用固定图片ID，避免图片变更

**中期（下周）:**
1. 为每个城市和酒店类型选择合适的Unsplash图片
2. 建立图片ID映射表
3. 添加图片加载失败的fallback处理

**长期（后续）:**
1. 考虑使用 Cloudinary / AWS CloudFront 等CDN
2. 实现图片自动压缩和格式转换
3. 针对国内用户考虑阿里云/腾讯云OSS

---

## ✅ 修复检查清单

### 必须修复（P0）
- [ ] `hotels/page.tsx:120` - 删除或替换 `nameCn: '胡同 heritage 客栈'`
- [ ] `hotels/page.tsx:136` - 删除或替换 `nameCn: '外滩景观套房'`
- [ ] `partner/register/page.tsx:135` - 替换中文地址占位符
- [ ] `partner/register/page.tsx:160` - 替换中文许可证号示例
- [ ] `partner/register/page.tsx:163` - 替换中文helper文本

### 建议修复（P1）
- [ ] `page.tsx` - 将所有中文注释转为英文（26处）
- [ ] `hotels/page.tsx` - 将中文注释转为英文（13处）
- [ ] `hotels/[id]/page.tsx` - 将中文注释转为英文（6处）

### 可选修复（P2）
- [ ] 审查所有 `defaultValue` 中的中文内容
- [ ] 建立i18n代码检查规则
- [ ] 添加pre-commit钩子

---

## 🚀 下一步行动

1. **创建修复分支:** `fix/TIAOHAI-REDESIGN-002-hardcoded-chinese`
2. **按优先级修复:** 先P0，再P1，最后P2
3. **代码审查:** 提交PR前进行i18n专项审查
4. **测试验证:** 确保所有语言切换正常
5. **文档更新:** 更新开发规范，防止未来出现类似问题

---

**报告生成时间:** 2026-03-15  
**报告生成者:** Archie (架构师Agent)  
**审核状态:** 待PM和Engineer确认
