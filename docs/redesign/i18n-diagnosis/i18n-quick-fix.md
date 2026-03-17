# i18n问题快速修复清单

## 🔥 P0 - 紧急修复（2天）

### 1. 补充西班牙语翻译
**文件:** `src/i18n/messages/es.json`

**缺失的主要命名空间:**
- [ ] `home.*` - 首页所有内容
- [ ] `hero.*` - Hero区域
- [ ] `auth.*` - 登录/注册
- [ ] `hotel.detail.*` - 酒店详情
- [ ] `checkout.*` - 结账流程
- [ ] `orders.*` - 订单管理
- [ ] `static.*` - 静态页面

**建议:** 复制`en.json`，使用ChatGPT/DeepL批量翻译

---

## 🔴 P1 - 重要修复（3天）

### 2. 修复主页硬编码
**文件:** `src/app/[locale]/page.tsx`

**必须移除的硬编码:**
```tsx
// ❌ 第72-79行 - 移至语言文件
const experienceCategories = [...]

// ❌ 第83-89行 - 移至语言文件
const facilityFilters = [...]

// ❌ 第100-105行 - 移至语言文件
const aiPresetQuestions = [...]

// ❌ 第389行
"Browse by Experience" → t('home.browseByExperience')

// ❌ 第428行
"Featured Stays" → t('home.featuredStays')

// ❌ 第430行
"View all" → t('home.showAll')
```

### 3. 修复酒店列表页
**文件:** `src/app/[locale]/hotels/page.tsx`

**必须移除的硬编码:**
```tsx
// ❌ 第90-95行
const honestFacilityFilters = [...]

// ❌ 第108-147行 - 静态数据
const initialHostels = [...]
```

### 4. Dashboard国际化
**文件:** 
- `src/app/[locale]/dashboard/hotel/page.tsx`
- `src/app/[locale]/dashboard/hotel/analytics/page.tsx`

**行动:** 添加`useTranslations`钩子，替换所有中文硬编码

---

## 🟡 P2 - 优化改进（3天）

### 5. API数据i18n
**后端改动:**
```typescript
// 当前
interface Hostel {
  name: string;        // 只有英文
  nameCn: string;      // 只有中文
  city: string;        // 英文
}

// 期望
interface Hostel {
  nameI18n: Record<Locale, string>;  // 多语言
  cityI18n: Record<Locale, string>;  // 多语言
}
```

---

## ✅ 新增翻译键清单

添加到所有语言文件：

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

---

## 🧪 验证步骤

1. 启动dev服务器
2. 访问 `/es` - 应显示西班牙语
3. 访问 `/fr` - 应显示法语
4. 访问 `/de` - 应显示德语
5. 检查：
   - [ ] 导航栏
   - [ ] 体验类别
   - [ ] 设施筛选
   - [ ] AI预设问题
   - [ ] 酒店卡片

---

## 📊 翻译进度

| 语言 | 进度 | 状态 |
|------|------|------|
| EN | 100% | ✅ |
| ES | 20% | ❌ 需补充 |
| FR | 90% | ⚠️ 需检查 |
| DE | 90% | ⚠️ 需检查 |
| JA | 待检查 | ⏳ |

---

**总工作量预估:** 8人天
- 翻译补充: 2天
- 代码修复: 3天
- Dashboard: 2天
- API改造: 1天
