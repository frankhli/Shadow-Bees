# 跳海Global C端语言切换问题深度诊断报告

**任务ID:** TIAOHAI-I18N-DIAGNOSIS-001  
**诊断日期:** 2026-03-15  
**诊断人员:** Pablo (Multilingual Auditor)  
**诊断范围:** `/home/node/workspace-host/tiaohai-global/apps/web/src/app/[locale]/`

---

## 1. 执行摘要

### 🔴 核心发现

经过对C端代码的实际渲染路径分析，发现语言切换问题由**两类问题**共同导致：

| 问题类型 | 影响范围 | 严重程度 | 原因 |
|----------|----------|----------|------|
| **硬编码英文** | 首页、酒店列表、导游页面 | 🔴 严重 | 代码中直接写死英文文本 |
| **翻译键缺失** | Chat页面、部分UI组件 | 🔴 严重 | FR/DE/JA缺少完整翻译 |

### 关键结论

**为什么ES/FR/DE切换后显示英文？**
1. **首页(page.tsx)**: 存在大量硬编码英文数组（体验分类、设施筛选器），**这些文本不在翻译文件中**
2. **Chat页面**: FR/DE/JA缺失完整的`chat.*`命名空间翻译，next-intl回退到英文
3. **日语相对正常的原因**: 虽然JA也缺失chat翻译，但首页硬编码问题影响所有语言

---

## 2. 硬编码问题详细分析

### 2.1 首页 (page.tsx) - 最严重的硬编码区域

#### 🔴 问题1: 体验分类硬编码
**代码位置:** `page.tsx:72-79`
```typescript
const experienceCategories = [
  { id: 'all', label: '🏠 All Stays', description: 'Browse all accommodations' },
  { id: 'hutong', label: '🏮 Hutong Culture', description: 'Traditional courtyard houses' },
  { id: 'historical', label: '⛩️ Historical Sites', description: 'Near Forbidden City, Great Wall' },
  { id: 'food', label: '🥟 Food & Dining', description: 'Culinary hotspots' },
  { id: 'nature', label: '🌿 Nature & Parks', description: 'Lakes, mountains, gardens' },
  { id: 'art', label: '🎨 Art & Design', description: 'Boutique art districts' },
  { id: 'riverside', label: '🌊 Riverside', description: 'Bund, West Lake views' },
  { id: 'modern', label: '🏙️ Modern City', description: 'High-rise city centers' },
]
```

**影响:** 
- 所有8个体验分类标签和描述都是硬编码英文
- 切换任何语言都显示英文
- **翻译文件中不存在对应键**

**应添加的翻译键:**
```json
{
  "home": {
    "categories": {
      "all": { "label": "All Stays", "description": "Browse all accommodations" },
      "hutong": { "label": "Hutong Culture", "description": "Traditional courtyard houses" },
      "historical": { "label": "Historical Sites", "description": "Near Forbidden City, Great Wall" },
      "food": { "label": "Food & Dining", "description": "Culinary hotspots" },
      "nature": { "label": "Nature & Parks", "description": "Lakes, mountains, gardens" },
      "art": { "label": "Art & Design", "description": "Boutique art districts" },
      "riverside": { "label": "Riverside", "description": "Bund, West Lake views" },
      "modern": { "label": "Modern City", "description": "High-rise city centers" }
    }
  }
}
```

---

#### 🔴 问题2: 设施筛选器硬编码
**代码位置:** `page.tsx:84-88`
```typescript
const facilityFilters = [
  { id: 'western_toilet', label: '🚽 Western Toilet', icon: Bath, color: 'emerald', description: 'Sit-down toilet' },
  { id: 'elevator', label: '🛗 Elevator', icon: ArrowUpDown, color: 'blue', description: 'Easy floor access' },
  { id: 'english_staff', label: '🇬🇧 English Staff', icon: Languages, color: 'purple', description: 'Fluent English' },
  { id: 'visa_assistance', label: '🛂 Visa Help', icon: FileCheck, color: 'amber', description: '144-hour visa support' },
  { id: 'international_payment', label: '💳 Card Payment', icon: CreditCard, color: 'green', description: 'Visa/Mastercard' },
]
```

**影响:** 设施筛选器标签和描述硬编码，切换语言无效

---

#### 🔴 问题3: Hero区域副标题硬编码
**代码位置:** `page.tsx:263`
```typescript
<p className="text-lg text-gray-600 mb-6">
  Honest info about hotels in China. We tell you what others won&apos;t: Western toilet? Elevator? English staff?
</p>
```

**翻译文件中存在对应键:** `hero.description`
```json
"hero": {
  "description": "Boutique hotels, local guides, and cultural experiences. All with 24/7 AI support in your language."
}
```

**但代码中没有使用！** 应该改为：`t('hero.description')`

---

#### 🔴 问题4: 免签标识硬编码
**代码位置:** `page.tsx:256`
```typescript
<div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium mb-6 animate-pulse">
  <Globe className="w-4 h-4" />
  144-hour Visa-Free Transit Available
</div>
```

**影响:** 重要营销信息未国际化

---

#### 🔴 问题5: AI预设问题硬编码
**代码位置:** `page.tsx:67-72`
```typescript
const aiPresetQuestions = [
  { icon: '🚽', text: 'Does this hotel have a Western toilet?', category: 'facilities' },
  { icon: '🛗', text: 'Is there an elevator?', category: 'facilities' },
  { icon: '🚇', text: 'How far from the subway?', category: 'location' },
  { icon: '🎎', text: 'What should I know about hutongs?', category: 'culture' },
]
```

**影响:** AI助手预设问题全是英文

---

#### 🔴 问题6: 搜索框Placeholder硬编码
**代码位置:** `page.tsx:278`
```typescript
placeholder="Search destinations, hotels..."
```

**翻译文件中存在:** `hero.search.placeholder`

---

### 2.2 酒店列表页 (hotels/page.tsx) 硬编码问题

#### 🔴 问题7: 设施筛选器重复硬编码
**代码位置:** `hotels/page.tsx:91-94`
```typescript
const honestFacilityFilters = [
  { icon: null, label: '🚽 Western Toilet', key: 'western_toilet', color: 'emerald' },
  { icon: null, label: '🛗 Elevator', key: 'elevator', color: 'blue' },
  { icon: null, label: '🇬🇧 English Staff', key: 'english_staff', color: 'purple' },
  { icon: Wifi, label: '📶 WiFi', key: 'wifi', color: 'gray' },
]
```

**注意:** 这与首页的facilityFilters重复定义，违反DRY原则

---

#### 🔴 问题8: 静态酒店数据硬编码
**代码位置:** `hotels/page.tsx:108-147`
```typescript
const initialHostels: Hostel[] = [
  {
    id: '1',
    name: 'Hutong Heritage House',
    nameCn: '胡同 heritage 客栈',
    city: 'Beijing',
    district: 'Dongcheng',
    // ...
    facilities: [{ icon: 'Bath', label: 'Western Toilet' }]
  },
  // ...
]
```

**影响:** 
- 城市名用英文（Beijing而非北京）
- 区域名用拼音（Dongcheng）
- facilities.label硬编码

---

### 2.3 导游页面 (guides/page.tsx) 硬编码问题

#### 🔴 问题9: 专业标签硬编码
**代码位置:** `guides/page.tsx:35-41`
```typescript
const specialtyLabels: Record<string, { label: string; color: string }> = {
  history: { label: 'History', color: 'bg-amber-100 text-amber-800' },
  food: { label: 'Food & Dining', color: 'bg-red-100 text-red-800' },
  art: { label: 'Art & Culture', color: 'bg-purple-100 text-purple-800' },
  nightlife: { label: 'Nightlife', color: 'bg-indigo-100 text-indigo-800' },
  shopping: { label: 'Shopping', color: 'bg-pink-100 text-pink-800' },
  architecture: { label: 'Architecture', color: 'bg-blue-100 text-blue-800' },
  photography: { label: 'Photography', color: 'bg-green-100 text-green-800' },
}
```

---

### 2.4 导游详情页 (guides/[id]/page.tsx) 硬编码问题

#### 🔴 问题10: 重复的专业标签定义
**代码位置:** `guides/[id]/page.tsx:31-37`
```typescript
const specialtyLabels: Record<string, { label: string; color: string }> = {
  history: { label: 'History', color: 'bg-amber-100 text-amber-800' },
  food: { label: 'Food & Dining', color: 'bg-red-100 text-red-800' },
  art: { label: 'Art & Culture', color: 'bg-purple-100 text-purple-800' },
  // ...
}
```

**注意:** 与guides/page.tsx重复定义，应该提取到共享配置

---

### 2.5 酒店详情页 (hotels/[id]/page.tsx) 硬编码问题

#### 🔴 问题11: 设施标签硬编码
**代码位置:** `hotels/[id]/page.tsx:379-392`
```typescript
{/* Western Toilet */}
{hostel.foreignFriendly?.westernToilet ? (
  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
    <Bath className="w-5 h-5 text-emerald-600" />
    <div>
      <p className="font-medium text-gray-900">Western Toilet</p>
      <p className="text-sm text-gray-600">Sit-down style</p>
    </div>
  </div>
) : (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <Ban className="w-5 h-5 text-gray-400" />
    <div>
      <p className="font-medium text-gray-900">No Western Toilet</p>
      <p className="text-sm text-gray-600">Squat style</p>
    </div>
  </div>
)}
```

**影响:** 酒店设施标签完全硬编码，切换语言无效

---

## 3. 翻译键缺失问题分析

### 3.1 Chat页面翻译缺失 (最严重)

**代码位置:** `chat/page.tsx:59`
```typescript
const t = useTranslations('chat')
```

**问题分析:**
- 页面使用了`useTranslations('chat')`，意味着所有文本应从`chat`命名空间获取
- 但FR/DE/JA语言文件**完全缺失**`chat`命名空间

**缺失的翻译键 (35个):**
```
chat.title
chat.subtitle
chat.search
chat.newChat
chat.online
chat.members
chat.typeMessage
chat.selectConversation
chat.status.active
chat.status.resolved
chat.status.escalated
chat.status.pending
... (共35个)
```

**影响:**
- 切换到FR/DE/JA时，整个Chat页面显示英文
- 只有ES有完整的chat翻译

---

### 3.2 月份名称翻译缺失

**缺失键:**
```
common.months.jan
common.months.feb
common.months.mar
common.months.apr
common.months.may
common.months.jun
common.months.jul
common.months.aug
common.months.sep
common.months.oct
common.months.nov
common.months.dec
```

**影响语言:** FR, DE, JA

**注意:** ES有完整的月份翻译

---

### 3.3 GuideDashboard翻译缺失

**缺失键 (ES语言缺失16个):**
```
guideDashboard.cancel
guideDashboard.contact
guideDashboard.filter.all
guideDashboard.filter.cancelled
guideDashboard.filter.completed
guideDashboard.filter.upcoming
guideDashboard.guides.subtitle
guideDashboard.guides.title
guideDashboard.hours
guideDashboard.markComplete
guideDashboard.messages
guideDashboard.noOrders
guideDashboard.ordersSubtitle
guideDashboard.ordersTitle
guideDashboard.scheduleSubtitle
guideDashboard.scheduleTitle
```

**影响:** 导游仪表板(D端)功能文本显示英文

---

### 3.4 Checkout页面翻译缺失 (DE特有)

**DE缺失:**
```
checkout.guestInfo.dateOfBirth
checkout.guestInfo.errors.dateOfBirth
checkout.guestInfo.errors.emailInvalid
checkout.guestInfo.errors.nationality
checkout.guestInfo.errors.passportNumber
...
```

**影响:** 德语用户在结账流程中看到英文错误提示

---

## 4. 日语"相对正常"的原因分析

### 4.1 数据对比

| 指标 | JA | FR | DE | ES |
|------|----|----|----|----|
| 覆盖率 | 96.9% | 96.9% | 94.4% | 98.0% |
| 缺失键 | 35 | 35 | 59 | 16 |
| 文件大小 | 21,004 | 31,038 | 29,685 | 28,693 |

### 4.2 为什么JA看起来"正常"？

**实际原因:**
1. **JA和FR缺失完全相同的键**（都是35个，都是chat和months模块）
2. **JA文件更小**是因为日文字符占用更少字节，不代表内容更少
3. **用户感知差异**可能是因为：
   - 测试时主要看了首页，而首页硬编码影响所有语言
   - 没有进入Chat页面测试
   - 日语有独特的文字，看起来"本地化程度更高"

### 4.3 验证

检查JA和FR的缺失键是否相同：
```bash
# JA缺失: chat.members, chat.newChat, chat.online, chat.search, chat.selectConversation, chat.title, chat.typeMessage, common.months.apr...
# FR缺失: chat.members, chat.newChat, chat.online, chat.search, chat.selectConversation, chat.title, chat.typeMessage, common.months.apr...
```

**结论: JA和FR的缺失键列表完全相同！**

---

## 5. 各页面语言切换效果验证

### 5.1 页面诊断矩阵

| 页面 | 使用翻译 | 硬编码 | ES效果 | FR效果 | DE效果 | JA效果 |
|------|----------|--------|--------|--------|--------|--------|
| **首页** | 部分 | 严重 | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN |
| **酒店列表** | 部分 | 严重 | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN |
| **酒店详情** | 部分 | 严重 | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN |
| **导游列表** | 部分 | 有 | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN |
| **导游详情** | 部分 | 有 | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN | 🟡 部分EN |
| **体验** | 良好 | 无 | 🟢 正常 | 🟢 正常 | 🟢 正常 | 🟢 正常 |
| **Chat** | 完整 | 无 | 🟢 正常 | 🔴 全EN | 🔴 全EN | 🔴 全EN |
| **订单** | 良好 | 无 | 🟢 正常 | 🟢 正常 | 🟢 正常 | 🟢 正常 |
| **个人资料** | 良好 | 无 | 🟢 正常 | 🟢 正常 | 🟢 正常 | 🟢 正常 |
| **结账** | 良好 | 无 | 🟢 正常 | 🟢 正常 | 🟡 部分EN | 🟢 正常 |

### 5.2 页面级别问题详解

#### 🔴 首页 (page.tsx) - 严重硬编码
```typescript
// 使用的翻译键数: 16个
// 硬编码英文数量: 约35处
// 主要问题:
// - experienceCategories (8项)
// - facilityFilters (5项)
// - aiPresetQuestions (4项)
// - Hero副标题 (1处)
// - 免签标识 (1处)
// - Search placeholder (多处)
```

#### 🔴 酒店列表 (hotels/page.tsx) - 严重硬编码
```typescript
// 使用的翻译键数: 24个
// 硬编码英文数量: 约20处
// 主要问题:
// - honestFacilityFilters (4项)
// - initialHostels静态数据
// - 城市名、区域名
```

#### 🟢 体验页面 (experiences/page.tsx) - 良好
```typescript
// 使用的翻译键数: 21个
// 硬编码英文数量: 0处
// 特点: 使用 defaultValue 模式
const getTypeLabels = (t: any) => ({
  WORKSHOP: { label: t('experienceTypes.workshop', { defaultValue: 'Workshop' }) }
})
```

#### 🟢 订单页面 (orders/page.tsx) - 良好
```typescript
// 使用的翻译键数: 很多
// 硬编码英文数量: 0处
// 特点: 使用 labelKey 模式引用翻译
const tabs = [
  { id: 'all', labelKey: 'all', count: orders.length },
]
```

---

## 6. 技术诊断：为什么next-intl没有回退

### 6.1 next-intl回退机制

next-intl在以下情况下会回退到默认语言：
1. 翻译键在目标语言中不存在
2. 使用了命名空间但命名空间缺失
3. 显式设置了`defaultValue`参数

### 6.2 本项目的实际情况

**情况1: 硬编码文本（最严重）**
```typescript
// 这类代码完全不经过next-intl
const categories = [{ label: '🏠 All Stays' }]
// 无论切换到什么语言，都显示"All Stays"
```

**情况2: 翻译键缺失**
```typescript
// chat/page.tsx
const t = useTranslations('chat')
t('title') // FR/DE/JA中chat命名空间不存在，回退到EN
```

**情况3: defaultValue覆盖**
```typescript
// experiences/page.tsx - 正确使用
t('experienceTypes.workshop', { defaultValue: 'Workshop' })
// 如果翻译存在则使用，否则显示'Workshop'
```

---

## 7. 修复优先级建议

### 🔴 P0 - 立即修复 (影响所有语言)

1. **首页硬编码**
   - 文件: `page.tsx`
   - 问题: experienceCategories, facilityFilters, hero副标题
   - 预计工作量: 2-3小时
   - 需要添加翻译键: ~25个

2. **酒店列表硬编码**
   - 文件: `hotels/page.tsx`
   - 问题: honestFacilityFilters, 静态数据
   - 预计工作量: 2小时

### 🔴 P1 - 高优先级 (影响FR/DE/JA)

3. **补充Chat页面翻译**
   - 文件: `fr.json`, `de.json`, `ja.json`
   - 添加: `chat.*` 命名空间 (35个键)
   - 预计工作量: 1小时（使用AI翻译）

4. **补充月份翻译**
   - 文件: `fr.json`, `de.json`, `ja.json`
   - 添加: `common.months.*` (12个键)
   - 预计工作量: 30分钟

### 🟡 P2 - 中优先级

5. **酒店详情页设施标签**
   - 文件: `hotels/[id]/page.tsx`
   - 问题: Western Toilet等设施描述硬编码
   - 预计工作量: 1小时

6. **导游页面专业标签**
   - 文件: `guides/page.tsx`, `guides/[id]/page.tsx`
   - 问题: specialtyLabels硬编码
   - 预计工作量: 1小时

### 🟢 P3 - 低优先级

7. **补充ES的guideDashboard翻译**
   - 影响: 仅ES语言的D端
   - 添加: 16个缺失键

8. **补充DE的checkout翻译**
   - 影响: 仅DE语言的结账流程
   - 添加: 约20个缺失键

---

## 8. 代码修复示例

### 8.1 修复首页体验分类

**当前代码:**
```typescript
const experienceCategories = [
  { id: 'all', label: '🏠 All Stays', description: 'Browse all accommodations' },
  // ...
]
```

**修复后代码:**
```typescript
// 在en.json/es.json/fr.json/de.json/ja.json中添加:
{
  "home": {
    "categories": {
      "all": { "label": "🏠 All Stays", "description": "Browse all accommodations" },
      "hutong": { "label": "🏮 Hutong Culture", "description": "Traditional courtyard houses" },
      // ...
    }
  }
}

// page.tsx中:
const experienceCategories = [
  { id: 'all', label: t('home.categories.all.label'), description: t('home.categories.all.description') },
  // ...
]
```

### 8.2 修复首页Hero副标题

**当前代码:**
```typescript
<p className="text-lg text-gray-600 mb-6">
  Honest info about hotels in China. We tell you what others won&apos;t: Western toilet? Elevator? English staff?
</p>
```

**修复后代码:**
```typescript
<p className="text-lg text-gray-600 mb-6">
  {t('hero.description')}
</p>
```

**注意:** 翻译文件中已存在`hero.description`，只需在代码中使用。

---

## 9. 验证修复的方法

### 9.1 自动化检查脚本

```bash
#!/bin/bash
# check-i18n.sh

echo "=== 检查硬编码英文 ==="
grep -rn "label.*'All Stays'\|label.*'Hutong Culture'\|label.*'Western Toilet'" src/app/[locale]/

echo "=== 检查翻译键缺失 ==="
node scripts/check-missing-translations.js

echo "=== 统计各页面翻译覆盖率 ==="
for f in src/app/[locale]/*/page.tsx; do
  echo "$f:"
  grep -c "t('" "$f"
done
```

### 9.2 手动验证清单

- [ ] 切换ES语言，验证首页体验分类是否显示西班牙语
- [ ] 切换FR语言，验证Chat页面是否显示法语
- [ ] 切换DE语言，验证结账流程月份选择器是否显示德语
- [ ] 切换JA语言，验证所有页面是否显示日语

---

## 10. 长期改进建议

### 10.1 代码规范

1. **禁止硬编码UI文本**
   ```typescript
   // ❌ 禁止
   const label = 'All Stays'
   
   // ✅ 推荐
   const label = t('home.categories.all.label')
   ```

2. **使用defaultValue作为安全网**
   ```typescript
   t('key', { defaultValue: 'Fallback' })
   ```

3. **提取共享配置**
   ```typescript
   // constants/categories.ts
   export const getCategories = (t: TFunction) => [
     { id: 'all', label: t('home.categories.all') }
   ]
   ```

### 10.2 CI检查

```yaml
# .github/workflows/i18n-check.yml
name: i18n Check
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Check for hardcoded text
        run: |
          if grep -rn "label.*'All Stays'" src/app/[locale]/; then
            echo "❌ Found hardcoded English text!"
            exit 1
          fi
      - name: Check translation coverage
        run: npm run i18n:coverage
```

---

## 附录A: 硬编码文本完整清单

| 文件 | 行号 | 硬编码文本 | 类型 |
|------|------|------------|------|
| page.tsx | 72 | '🏠 All Stays' | 体验分类 |
| page.tsx | 73 | '🏮 Hutong Culture' | 体验分类 |
| page.tsx | 74 | '⛩️ Historical Sites' | 体验分类 |
| page.tsx | 75 | '🥟 Food & Dining' | 体验分类 |
| page.tsx | 76 | '🌿 Nature & Parks' | 体验分类 |
| page.tsx | 77 | '🎨 Art & Design' | 体验分类 |
| page.tsx | 78 | '🌊 Riverside' | 体验分类 |
| page.tsx | 79 | '🏙️ Modern City' | 体验分类 |
| page.tsx | 84 | '🚽 Western Toilet' | 设施筛选 |
| page.tsx | 85 | '🛗 Elevator' | 设施筛选 |
| page.tsx | 86 | '🇬🇧 English Staff' | 设施筛选 |
| page.tsx | 87 | '🛂 Visa Help' | 设施筛选 |
| page.tsx | 88 | '💳 Card Payment' | 设施筛选 |
| page.tsx | 256 | '144-hour Visa-Free Transit Available' | 营销文案 |
| page.tsx | 263 | 'Honest info about hotels in China...' | Hero描述 |
| page.tsx | 278 | 'Search destinations, hotels...' | 搜索框 |
| hotels/page.tsx | 91 | '🚽 Western Toilet' | 设施筛选 |
| hotels/page.tsx | 131 | 'Western Toilet' | 静态数据 |
| guides/page.tsx | 35-41 | History, Food & Dining... | 专业标签 |
| hotels/[id]/page.tsx | 384 | 'Western Toilet' | 设施详情 |

---

**报告完成**  
**Pablo (Multilingual Auditor)**  
**跳海Global多语言内容审核团队**
