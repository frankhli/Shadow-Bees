# 跳海Global C端i18n问题诊断报告

**任务ID:** TIAOHAI-I18N-DIAGNOSIS-001  
**诊断时间:** 2025年  
**诊断范围:** `/home/node/workspace-host/tiaohai-global/apps/web/`  
**问题描述:** 切换ES/FR/DE语言后显示英文  

---

## 📊 执行摘要

### 问题根因
1. **ES（西班牙语）语言文件未完成翻译** - 80%内容仍是英文
2. **代码中大量硬编码英文** - 未使用`t()`函数
3. **Dashboard页面完全未国际化** - 硬编码中文
4. **API返回数据缺少i18n字段**

### 影响范围
| 优先级 | 问题类型 | 影响页面 | 严重程度 |
|--------|----------|----------|----------|
| P0 | 语言文件缺失 | 全站 | 🔴 严重 |
| P1 | 硬编码字符串 | 主页、酒店列表 | 🔴 严重 |
| P1 | 未国际化组件 | Dashboard | 🟠 中等 |
| P2 | API数据缺失i18n | 酒店详情 | 🟡 轻微 |

---

## 🔍 详细问题清单

### 1. 语言文件问题

#### 1.1 ES（西班牙语）翻译缺失
**文件:** `src/i18n/messages/es.json`

**问题描述:** 该文件80%内容仍是英文，仅少量词汇翻译成西班牙语。

**已翻译内容（约20%）:**
- `nav.saved` → "Guardado"
- `hotel.roomTypes` → "Tipos de Habitación"
- `hotel.availableBeds` → "Disponible"
- `hotel.houseRules` → "Reglas de la Casa"
- `orders.tabs.pending` → "Pendiente"
- `orders.beds` → "camas"
- `profile.profile.labels` 部分字段
- `guideDashboard` 部分字段
- `guides` 部分字段
- `experienceTypes` 部分字段
- `social` 部分字段
- `common.cities` 部分城市名

**未翻译内容（约80%）:**
- 所有 `home.*` 键
- 所有 `hero.*` 键（除ES特有）
- 所有 `auth.*` 键
- 所有 `hotel.detail.*` 键
- 所有 `checkout.*` 键
- 所有 `orders.*` 键（除上述）
- 所有 `profile.*` 键（除上述）
- 所有 `features.*` 键
- 所有 `static.*` 键
- 所有 `footer.*` 键
- 所有 `dashboard.*` 键
- 所有 `aiChat.*` 键
- 所有 `guide.*` 键
- 所有 `booking.*` 键
- 所有 `experiences.items.*` 内容
- 所有 `partner.*` 键
- 所有 `common.*` 键（除上述）

**修复建议:**
```bash
# 需要补充约 400+ 个键的西班牙语翻译
# 建议找专业翻译或使用AI翻译后人工校对
```

#### 1.2 FR（法语）和DE（德语）状态
**状态:** ✅ 相对完整（约90%+已翻译）

**FR文件:** `src/i18n/messages/fr.json` - 大部分已翻译  
**DE文件:** `src/i18n/messages/de.json` - 大部分已翻译  

**注意:** 即使FR和DE相对完整，由于代码中硬编码英文，切换后仍会显示英文。

---

### 2. 硬编码字符串问题

#### 2.1 主页 (page.tsx)
**文件:** `src/app/[locale]/page.tsx`

| 行号 | 代码 | 问题 | 修复建议 |
|------|------|------|----------|
| 72-79 | `experienceCategories` 数组 | 8个类别label和description全部硬编码英文 | 移至语言文件，使用`t('home.categories.*')` |
| 83-89 | `facilityFilters` 数组 | 5个设施筛选条件全部硬编码英文 | 移至语言文件，使用`t('home.filters.*')` |
| 100-105 | `aiPresetQuestions` 数组 | 4个AI预设问题全部硬编码英文 | 移至语言文件，使用`t('aiChat.presetQuestions.*')` |
| 263 | `"Honest info about hotels..."` | Hero描述文字硬编码 | 使用`t('hero.description')` |
| 331-374 | 设施筛选按钮渲染 | 使用硬编码的`facilityFilters` | 改为从语言文件读取 |
| 374 | `aiPresetQuestions.map` | 渲染硬编码问题 | 改为从语言文件读取 |
| 389 | `"Browse by Experience"` | Section标题硬编码 | 使用`t('home.browseByExperience')` |
| 391-410 | 体验类别渲染 | 使用硬编码的`experienceCategories` | 改为从语言文件读取 |
| 428 | `"Featured Stays"` | 标题硬编码（未使用翻译） | 改为使用`t('home.featuredStays')` |
| 430 | `"View all"` | 链接文字硬编码 | 使用`t('home.showAll')` |
| 468-478 | 设施标签渲染 | `Western Toilet`, `Elevator`, `English` 硬编码 | 使用`t('hotel.facilities.*')` |
| 541 | `"We verify and show you..."` | 描述文字硬编码 | 添加翻译键 |

**代码示例（问题代码）:**
```tsx
// ❌ 硬编码 - src/app/[locale]/page.tsx:72-79
const experienceCategories = [
  { id: 'all', label: '🏠 All Stays', description: 'Browse all accommodations' },
  { id: 'hutong', label: '🏮 Hutong Culture', description: 'Traditional courtyard houses' },
  // ... 全部硬编码
]

// ❌ 硬编码 - src/app/[locale]/page.tsx:83-89
const facilityFilters = [
  { id: 'western_toilet', label: '🚽 Western Toilet', description: 'Sit-down toilet' },
  { id: 'elevator', label: '🛗 Elevator', description: 'Easy floor access' },
  // ... 全部硬编码
]

// ❌ 硬编码 - src/app/[locale]/page.tsx:100-105
const aiPresetQuestions = [
  { icon: '🚽', text: 'Does this hotel have a Western toilet?' },
  { icon: '🛗', text: 'Is there an elevator?' },
  // ... 全部硬编码
]
```

**修复示例:**
```tsx
// ✅ 使用翻译
const t = useTranslations()

// 在语言文件中定义:
// "categories": {
//   "all": { "label": "🏠 All Stays", "description": "Browse all accommodations" },
//   ...
// }

// 代码中:
const categories = [
  { id: 'all', label: t('home.categories.all.label'), ... },
]
```

#### 2.2 酒店列表页 (hotels/page.tsx)
**文件:** `src/app/[locale]/hotels/page.tsx`

| 行号 | 代码 | 问题 | 修复建议 |
|------|------|------|----------|
| 90-95 | `honestFacilityFilters` | 设施筛选条件硬编码 | 移至语言文件 |
| 108-147 | `initialHostels` | 静态酒店数据硬编码英文 | 使用翻译键或从API获取 |
| 569 | `"Western Toilet"` | 标签硬编码 | 使用`t('hotel.facilities.westernToilet')` |

#### 2.3 Dashboard页面（完全未国际化）

**文件:** `src/app/[locale]/dashboard/hotel/page.tsx`
**状态:** ❌ 完全无i18n支持，全部中文硬编码

**硬编码内容:**
- 行50: `"Tiaohai 商家后台"`
- 行53: `"返回控制台"`
- 行83: `"营业中"`
- 行87-93: `"AI内容生成"`, `"数据分析"`, `"查看公开页面"`, `"设置"`
- 行103-105: `"总房间数"`, `"今日预订"`, `"今日收入"`
- 以及更多...

**文件:** `src/app/[locale]/dashboard/hotel/analytics/page.tsx`
**状态:** ❌ 完全无i18n支持，全部中文硬编码

**硬编码内容:**
- 行36-38: `"Tiaohai 商家后台"`, `"返回控制台"`
- 行50: `"引流数据分析"`, `"追踪Tiaohai列表带来的点击和转化"`
- 行58: `"总点击量"`
- 以及更多...

---

### 3. API动态数据问题

#### 3.1 酒店名称缺少i18n
**接口:** `/api/mock/hostels/featured`

**当前数据结构:**
```json
{
  "id": "1",
  "name": "Hutong Heritage House",  // ❌ 只有英文
  "nameCn": "胡同 heritage 客栈",    // ❌ 只有中文
  "city": "Beijing",               // ❌ 英文
  "district": "Dongcheng"          // ❌ 英文
}
```

**期望数据结构:**
```json
{
  "id": "1",
  "nameI18n": {
    "en": "Hutong Heritage House",
    "es": "Casa Patrimonial Hutong",
    "fr": "Maison Heritage Hutong",
    "de": "Hutong Heritage Haus",
    "ja": "胡同ヘリテージハウス"
  },
  "cityI18n": {
    "en": "Beijing",
    "es": "Pekín",
    "fr": "Pékin",
    "de": "Peking",
    "ja": "北京"
  }
}
```

**影响页面:** 酒店卡片、酒店详情页、搜索结果

#### 3.2 AI摘要字段使用不规范
**字段:** `aiSummaryI18n`

**问题:** 虽然提供了i18n字段，但代码中仍有硬编码判断：
```tsx
// page.tsx 中
filteredHostels.filter(h => h.aiSummaryI18n?.en?.toLowerCase().includes(activeCategory))
// 硬编码使用 .en，应该根据当前locale选择
```

---

### 4. 组件级别问题

#### 4.1 未使用i18n的页面列表
| 文件路径 | 使用i18n | 问题 |
|----------|----------|------|
| `src/app/[locale]/page.tsx` | ⚠️ 部分 | 硬编码常量数组 |
| `src/app/[locale]/hotels/page.tsx` | ⚠️ 部分 | 硬编码常量数组 |
| `src/app/[locale]/dashboard/hotel/page.tsx` | ❌ 否 | 完全中文硬编码 |
| `src/app/[locale]/dashboard/hotel/analytics/page.tsx` | ❌ 否 | 完全中文硬编码 |

#### 4.2 LanguageSwitcher组件
**文件:** `src/components/language-switcher.tsx`

**状态:** ✅ 工作正常

**说明:** 语言切换器本身实现正确，可以正常切换locale。但由于上述问题，切换后仍显示英文。

---

## 🛠️ 修复方案

### 阶段1: 修复语言文件（P0 - 2天）

1. **补充ES翻译**
   ```bash
   # 需要翻译的键数统计
   cd src/i18n/messages
   
   # ES文件缺失翻译数量
   grep -c '"[a-zA-Z]"' es.json  # 约400+个英文值
   ```

2. **推荐做法:**
   - 以`en.json`为基准
   - 使用AI翻译生成初稿
   - 找母语者校对
   - 保持键结构一致

### 阶段2: 修复硬编码字符串（P1 - 3天）

1. **主页 (page.tsx)**
   - 将`experienceCategories`移至`en.json`等语言文件
   - 将`facilityFilters`移至语言文件
   - 将`aiPresetQuestions`移至语言文件
   - 替换所有硬编码标题和描述

2. **酒店列表页 (hotels/page.tsx)**
   - 将`honestFacilityFilters`移至语言文件
   - 移除或翻译`initialHostels`静态数据

3. **新增翻译键示例:**
   ```json
   {
     "home": {
       "browseByExperience": "Browse by Experience",
       "categories": {
         "all": { "label": "🏠 All Stays", "description": "Browse all accommodations" },
         "hutong": { "label": "🏮 Hutong Culture", "description": "Traditional courtyard houses" },
         "historical": { "label": "⛩️ Historical Sites", "description": "Near Forbidden City, Great Wall" },
         "food": { "label": "🥟 Food & Dining", "description": "Culinary hotspots" },
         "nature": { "label": "🌿 Nature & Parks", "description": "Lakes, mountains, gardens" },
         "art": { "label": "🎨 Art & Design", "description": "Boutique art districts" },
         "riverside": { "label": "🌊 Riverside", "description": "Bund, West Lake views" },
         "modern": { "label": "🏙️ Modern City", "description": "High-rise city centers" }
       },
       "filters": {
         "westernToilet": { "label": "🚽 Western Toilet", "description": "Sit-down toilet" },
         "elevator": { "label": "🛗 Elevator", "description": "Easy floor access" },
         "englishStaff": { "label": "🇬🇧 English Staff", "description": "Fluent English" },
         "visaAssistance": { "label": "🛂 Visa Help", "description": "144-hour visa support" },
         "cardPayment": { "label": "💳 Card Payment", "description": "Visa/Mastercard" }
       }
     },
     "aiChat": {
       "presetQuestions": {
         "westernToilet": "Does this hotel have a Western toilet?",
         "elevator": "Is there an elevator?",
         "subway": "How far from the subway?",
         "hutong": "What should I know about hutongs?"
       }
     }
   }
   ```

### 阶段3: Dashboard国际化（P1 - 2天）

1. **为Dashboard添加翻译支持**
   - 添加`dashboard.*`命名空间
   - 替换所有中文硬编码
   - 建议先支持EN和ZH，后续添加ES/FR/DE

### 阶段4: API数据i18n（P2 - 3天）

1. **后端改造**
   - 数据库添加`nameI18n`, `descriptionI18n`字段
   - API响应根据`Accept-Language`返回对应语言
   - 或返回i18n对象让前端选择

---

## 📋 修复清单（Checklist）

### 语言文件
- [ ] 补充 `es.json` 400+个缺失翻译
- [ ] 检查 `fr.json` 完整性
- [ ] 检查 `de.json` 完整性
- [ ] 检查 `ja.json` 完整性

### 代码修复
- [ ] `src/app/[locale]/page.tsx` - 移除硬编码常量
- [ ] `src/app/[locale]/hotels/page.tsx` - 移除硬编码常量
- [ ] `src/app/[locale]/dashboard/hotel/page.tsx` - 添加i18n支持
- [ ] `src/app/[locale]/dashboard/hotel/analytics/page.tsx` - 添加i18n支持

### 新增翻译键
- [ ] `home.browseByExperience`
- [ ] `home.categories.*` (8个类别)
- [ ] `home.filters.*` (5个筛选)
- [ ] `aiChat.presetQuestions.*` (4个问题)
- [ ] `dashboard.*` (整个命名空间)

### API改造
- [ ] 酒店名称添加i18n字段
- [ ] 城市名称添加i18n字段
- [ ] AI摘要使用当前locale

---

## 🧪 测试验证

### 测试步骤
1. 启动dev服务器: `npm run dev`
2. 访问 `http://localhost:3000/es`
3. 检查以下内容是否正确显示西班牙语：
   - 导航栏
   - Hero区域
   - 体验类别标签
   - 设施筛选按钮
   - 酒店卡片
   - AI预设问题

4. 重复测试FR和DE

### 预期结果
| 语言 | 预期结果 | 当前状态 |
|------|----------|----------|
| ES | 显示西班牙语 | ❌ 显示英文 |
| FR | 显示法语 | ⚠️ 部分英文 |
| DE | 显示德语 | ⚠️ 部分英文 |
| EN | 显示英文 | ✅ 正常 |

---

## 📎 附录

### 相关文件列表
```
src/i18n/config.ts                          # 语言配置
src/i18n/request.ts                         # next-intl请求配置
src/i18n/messages/en.json                   # 英文翻译（基准）
src/i18n/messages/es.json                   # 西班牙语（❌ 80%缺失）
src/i18n/messages/fr.json                   # 法语（✅ 90%完成）
src/i18n/messages/de.json                   # 德语（✅ 90%完成）
src/i18n/messages/ja.json                   # 日语（待检查）
src/components/language-switcher.tsx        # 语言切换器（✅ 正常）
src/app/[locale]/layout.tsx                 # 根布局（✅ 正常）
src/app/[locale]/page.tsx                   # 主页（❌ 硬编码）
src/app/[locale]/hotels/page.tsx            # 酒店列表（❌ 硬编码）
src/app/[locale]/dashboard/hotel/page.tsx   # Dashboard（❌ 无i18n）
```

### 翻译进度统计
| 语言 | 总键数 | 已翻译 | 完成度 |
|------|--------|--------|--------|
| EN | ~500 | 500 | 100% |
| ES | ~500 | ~100 | 20% ❌ |
| FR | ~500 | ~450 | 90% ✅ |
| DE | ~500 | ~450 | 90% ✅ |
| JA | ~500 | 待检查 | 待检查 |

---

**报告生成者:** Dev Alex  
**审核人:** 待审核  
**状态:** 待修复
