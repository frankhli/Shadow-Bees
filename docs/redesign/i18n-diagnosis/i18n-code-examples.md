# i18n代码修复示例

## 示例1: 主页体验类别修复

### 当前代码（问题）
```tsx
// src/app/[locale]/page.tsx
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

// 使用
{experienceCategories.map((cat) => (
  <button key={cat.id}>
    <span>{cat.label}</span>
  </button>
))}
```

### 修复步骤

#### 步骤1: 在语言文件中添加翻译

**src/i18n/messages/en.json**
```json
{
  "home": {
    "categories": {
      "title": "Browse by Experience",
      "all": { "emoji": "🏠", "name": "All Stays", "description": "Browse all accommodations" },
      "hutong": { "emoji": "🏮", "name": "Hutong Culture", "description": "Traditional courtyard houses" },
      "historical": { "emoji": "⛩️", "name": "Historical Sites", "description": "Near Forbidden City, Great Wall" },
      "food": { "emoji": "🥟", "name": "Food & Dining", "description": "Culinary hotspots" },
      "nature": { "emoji": "🌿", "name": "Nature & Parks", "description": "Lakes, mountains, gardens" },
      "art": { "emoji": "🎨", "name": "Art & Design", "description": "Boutique art districts" },
      "riverside": { "emoji": "🌊", "name": "Riverside", "description": "Bund, West Lake views" },
      "modern": { "emoji": "🏙️", "name": "Modern City", "description": "High-rise city centers" }
    }
  }
}
```

**src/i18n/messages/es.json**
```json
{
  "home": {
    "categories": {
      "title": "Explorar por Experiencia",
      "all": { "emoji": "🏠", "name": "Todos los Alojamientos", "description": "Explora todos los alojamientos" },
      "hutong": { "emoji": "🏮", "name": "Cultura Hutong", "description": "Casas tradicionales con patio" },
      "historical": { "emoji": "⛩️", "name": "Sitios Históricos", "description": "Cerca de la Ciudad Prohibida, Gran Muralla" },
      "food": { "emoji": "🥟", "name": "Comida y Restaurantes", "description": "Zonas gastronómicas" },
      "nature": { "emoji": "🌿", "name": "Naturaleza y Parques", "description": "Lagos, montañas, jardines" },
      "art": { "emoji": "🎨", "name": "Arte y Diseño", "description": "Distritos artísticos boutique" },
      "riverside": { "emoji": "🌊", "name": "Ribera", "description": "Vistas de Bund, Lago del Oeste" },
      "modern": { "emoji": "🏙️", "name": "Ciudad Moderna", "description": "Centros urbanos de rascacielos" }
    }
  }
}
```

#### 步骤2: 修改组件代码

```tsx
// src/app/[locale]/page.tsx
'use client'

import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations()
  
  // 类别ID列表
  const categoryIds = ['all', 'hutong', 'historical', 'food', 'nature', 'art', 'riverside', 'modern']
  
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">{t('home.categories.title')}</h2>
      
      <div className="flex gap-4 overflow-x-auto">
        {categoryIds.map((id) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[100px] p-4 rounded-xl border-2"
          >
            <span className="text-2xl">{t(`home.categories.${id}.emoji`)}</span>
            <span className="text-xs font-medium text-center">
              {t(`home.categories.${id}.name`)}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
```

---

## 示例2: 设施筛选修复

### 当前代码（问题）
```tsx
const facilityFilters = [
  { id: 'western_toilet', label: '🚽 Western Toilet', icon: Bath, color: 'emerald', description: 'Sit-down toilet' },
  { id: 'elevator', label: '🛗 Elevator', icon: ArrowUpDown, color: 'blue', description: 'Easy floor access' },
  { id: 'english_staff', label: '🇬🇧 English Staff', icon: Languages, color: 'purple', description: 'Fluent English' },
  { id: 'visa_assistance', label: '🛂 Visa Help', icon: FileCheck, color: 'amber', description: '144-hour visa support' },
  { id: 'international_payment', label: '💳 Card Payment', icon: CreditCard, color: 'green', description: 'Visa/Mastercard' },
]
```

### 修复步骤

#### 步骤1: 在语言文件中添加翻译

**src/i18n/messages/en.json**
```json
{
  "home": {
    "filters": {
      "westernToilet": { 
        "emoji": "🚽", 
        "label": "Western Toilet", 
        "description": "Sit-down toilet" 
      },
      "elevator": { 
        "emoji": "🛗", 
        "label": "Elevator", 
        "description": "Easy floor access" 
      },
      "englishStaff": { 
        "emoji": "🇬🇧", 
        "label": "English Staff", 
        "description": "Fluent English" 
      },
      "visaHelp": { 
        "emoji": "🛂", 
        "label": "Visa Help", 
        "description": "144-hour visa support" 
      },
      "cardPayment": { 
        "emoji": "💳", 
        "label": "Card Payment", 
        "description": "Visa/Mastercard" 
      }
    }
  }
}
```

**src/i18n/messages/es.json**
```json
{
  "home": {
    "filters": {
      "westernToilet": { 
        "emoji": "🚽", 
        "label": "Baño Occidental", 
        "description": "Inodoro sentado" 
      },
      "elevator": { 
        "emoji": "🛗", 
        "label": "Ascensor", 
        "description": "Acceso fácil a pisos" 
      },
      "englishStaff": { 
        "emoji": "🇬🇧", 
        "label": "Personal en Inglés", 
        "description": "Inglés fluido" 
      },
      "visaHelp": { 
        "emoji": "🛂", 
        "label": "Ayuda Visa", 
        "description": "Soporte visa 144 horas" 
      },
      "cardPayment": { 
        "emoji": "💳", 
        "label": "Pago con Tarjeta", 
        "description": "Visa/Mastercard" 
      }
    }
  }
}
```

#### 步骤2: 修改组件代码

```tsx
// src/app/[locale]/page.tsx
import { Bath, ArrowUpDown, Languages, FileCheck, CreditCard } from 'lucide-react'

const facilityConfig = [
  { id: 'westernToilet', icon: Bath, color: 'emerald' },
  { id: 'elevator', icon: ArrowUpDown, color: 'blue' },
  { id: 'englishStaff', icon: Languages, color: 'purple' },
  { id: 'visaHelp', icon: FileCheck, color: 'amber' },
  { id: 'cardPayment', icon: CreditCard, color: 'green' },
]

// 使用
{facilityConfig.map((facility) => {
  const Icon = facility.icon
  return (
    <button key={facility.id}>
      <Icon className={`text-${facility.color}-500`} />
      <span>{t(`home.filters.${facility.id}.emoji`)} {t(`home.filters.${facility.id}.label`)}</span>
      <p>{t(`home.filters.${facility.id}.description`)}</p>
    </button>
  )
})}
```

---

## 示例3: AI预设问题修复

### 当前代码（问题）
```tsx
const aiPresetQuestions = [
  { icon: '🚽', text: 'Does this hotel have a Western toilet?', category: 'facilities' },
  { icon: '🛗', text: 'Is there an elevator?', category: 'facilities' },
  { icon: '🚇', text: 'How far from the subway?', category: 'location' },
  { icon: '🎎', text: 'What should I know about hutongs?', category: 'culture' },
]
```

### 修复步骤

#### 步骤1: 在语言文件中添加翻译

**src/i18n/messages/en.json**
```json
{
  "aiChat": {
    "presetQuestions": {
      "westernToilet": { "icon": "🚽", "text": "Does this hotel have a Western toilet?" },
      "elevator": { "icon": "🛗", "text": "Is there an elevator?" },
      "subway": { "icon": "🚇", "text": "How far from the subway?" },
      "hutong": { "icon": "🎎", "text": "What should I know about hutongs?" }
    }
  }
}
```

**src/i18n/messages/es.json**
```json
{
  "aiChat": {
    "presetQuestions": {
      "westernToilet": { "icon": "🚽", "text": "¿Este hotel tiene baño occidental?" },
      "elevator": { "icon": "🛗", "text": "¿Hay ascensor?" },
      "subway": { "icon": "🚇", "text": "¿A qué distancia está el metro?" },
      "hutong": { "icon": "🎎", "text": "¿Qué debería saber sobre los hutongs?" }
    }
  }
}
```

#### 步骤2: 修改组件代码

```tsx
const questionIds = ['westernToilet', 'elevator', 'subway', 'hutong']

// 使用
{questionIds.map((id) => (
  <button key={id}>
    {t(`aiChat.presetQuestions.${id}.icon`)}
    {t(`aiChat.presetQuestions.${id}.text`)}
  </button>
))}
```

---

## 示例4: Dashboard国际化

### 当前代码（问题）
```tsx
// src/app/[locale]/dashboard/hotel/page.tsx
<span className="text-xl font-bold">Tiaohai 商家后台</span>
<Button>返回控制台</Button>
<span>营业中</span>
```

### 修复步骤

#### 步骤1: 在语言文件中添加翻译

**src/i18n/messages/en.json**
```json
{
  "dashboard": {
    "title": "Tiaohai Merchant Dashboard",
    "backToDashboard": "Back to Dashboard",
    "status": {
      "active": "Active",
      "inactive": "Inactive"
    },
    "nav": {
      "aiContent": "AI Content",
      "analytics": "Analytics",
      "viewPublicPage": "View Public Page",
      "settings": "Settings"
    }
  }
}
```

**src/i18n/messages/zh.json** (新增中文作为源语言)
```json
{
  "dashboard": {
    "title": "Tiaohai 商家后台",
    "backToDashboard": "返回控制台",
    "status": {
      "active": "营业中",
      "inactive": "暂停营业"
    },
    "nav": {
      "aiContent": "AI内容生成",
      "analytics": "数据分析",
      "viewPublicPage": "查看公开页面",
      "settings": "设置"
    }
  }
}
```

#### 步骤2: 修改组件代码

```tsx
'use client'

import { useTranslations } from 'next-intl'

export default function HotelDashboardPage() {
  const t = useTranslations()
  
  return (
    <header>
      <span className="text-xl font-bold">{t('dashboard.title')}</span>
      <Button>{t('dashboard.backToDashboard')}</Button>
      <Badge>{t('dashboard.status.active')}</Badge>
    </header>
  )
}
```

---

## 通用最佳实践

### 1. 命名规范
```
页面.组件.元素
例如: home.categories.hutong.name
      hotel.detail.checkIn
      checkout.payment.cardNumber
```

### 2. 动态值处理
```tsx
// ❌ 不推荐
<p>Price: ${price} per night</p>

// ✅ 推荐 - 使用插值
// 语言文件: "pricePerNight": "Price: ${price} per night"
<p>{t('hotel.pricePerNight', { price })}</p>
```

### 3. 复数处理
```tsx
// 语言文件: "nights": "{count, plural, one {# night} other {# nights}}"
t('hotel.nights', { count: 5 }) // "5 nights"
t('hotel.nights', { count: 1 }) // "1 night"
```

### 4. 富文本处理
```tsx
// 语言文件: "description": "Book now and get <strong>20% off</strong>"
t.rich('home.description', {
  strong: (chunks) => <strong>{chunks}</strong>
})
```
