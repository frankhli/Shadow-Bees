# i18n问题快速定位手册

## 立即修复清单 (复制即用)

### 1. 首页硬编码修复

**文件:** `src/app/[locale]/page.tsx`

#### 1.1 修复Hero副标题 (已有翻译键，只需使用)
```diff
- <p className="text-lg text-gray-600 mb-6">
-   Honest info about hotels in China. We tell you what others won't: Western toilet? Elevator? English staff?
- </p>
+ <p className="text-lg text-gray-600 mb-6">
+   {t('hero.description')}
+ </p>
```

#### 1.2 修复搜索框placeholder (已有翻译键)
```diff
- placeholder="Search destinations, hotels..."
+ placeholder={t('hero.search.placeholder')}
```

#### 1.3 修复体验分类 (需添加翻译键)
```diff
const experienceCategories = [
-  { id: 'all', label: '🏠 All Stays', description: 'Browse all accommodations' },
+  { id: 'all', label: `🏠 ${t('home.categories.all.label')}`, description: t('home.categories.all.description') },
]
```

**需要在所有语言文件添加:**
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

### 2. 补充FR/DE/JA的Chat翻译

**文件:** `src/i18n/messages/fr.json`, `de.json`, `ja.json`

**添加以下键 (从en.json复制并翻译):**
```json
{
  "chat": {
    "title": "Messages",
    "subtitle": "24/7 instant answers in your language",
    "search": "Search conversations...",
    "newChat": "New Chat",
    "online": "Online",
    "members": "members",
    "typeMessage": "Type a message...",
    "selectConversation": "Select a conversation to start chatting"
  }
}
```

---

### 3. 补充月份翻译

**文件:** `src/i18n/messages/fr.json`, `de.json`, `ja.json`

**添加:**
```json
{
  "common": {
    "months": {
      "jan": "Jan",
      "feb": "Feb",
      "mar": "Mar",
      "apr": "Apr",
      "may": "May",
      "jun": "Jun",
      "jul": "Jul",
      "aug": "Aug",
      "sep": "Sep",
      "oct": "Oct",
      "nov": "Nov",
      "dec": "Dec"
    }
  }
}
```

---

## 文件路径速查

| 问题 | 文件路径 | 行号范围 |
|------|----------|----------|
| 首页体验分类硬编码 | `src/app/[locale]/page.tsx` | 72-79 |
| 首页设施筛选硬编码 | `src/app/[locale]/page.tsx` | 84-88 |
| Hero副标题硬编码 | `src/app/[locale]/page.tsx` | 263 |
| 免签标识硬编码 | `src/app/[locale]/page.tsx` | 256 |
| AI预设问题硬编码 | `src/app/[locale]/page.tsx` | 67-72 |
| 酒店列表设施硬编码 | `src/app/[locale]/hotels/page.tsx` | 91-94 |
| 酒店列表静态数据 | `src/app/[locale]/hotels/page.tsx` | 108-147 |
| 导游专业标签硬编码 | `src/app/[locale]/guides/page.tsx` | 35-41 |
| 酒店详情设施硬编码 | `src/app/[locale]/hotels/[id]/page.tsx` | 379-392 |
| Chat页面翻译缺失 | `src/i18n/messages/fr.json` | 添加chat命名空间 |
| Chat页面翻译缺失 | `src/i18n/messages/de.json` | 添加chat命名空间 |
| Chat页面翻译缺失 | `src/i18n/messages/ja.json` | 添加chat命名空间 |

---

## 验证命令

```bash
# 1. 检查是否还有硬编码的"All Stays"
cd /home/node/workspace-host/tiaohai-global/apps/web
grep -rn "'All Stays'" src/app/[locale]/

# 2. 检查是否还有硬编码的"Western Toilet"
grep -rn "'Western Toilet'" src/app/[locale]/

# 3. 统计各页面翻译调用次数
for f in src/app/[locale]/*/page.tsx src/app/[locale]/page.tsx; do
  echo "$f: $(grep -c "t('" $f) translations"
done

# 4. 检查chat翻译是否存在
for lang in fr de ja; do
  echo "=== $lang.json ==="
  grep -A5 '"chat"' src/i18n/messages/$lang.json || echo "MISSING"
done
```

---

## 日语翻译参考 (供对比)

```json
{
  "chat": {
    "title": "メッセージ",
    "subtitle": "あなたの言語で24時間即時回答",
    "search": "会話を検索...",
    "newChat": "新規チャット",
    "online": "オンライン",
    "members": "メンバー",
    "typeMessage": "メッセージを入力...",
    "selectConversation": "会話を選択してチャットを開始"
  }
}
```

---

## 预期修复效果

修复后，各语言应显示：

| 页面 | EN | ES | FR | DE | JA |
|------|----|----|----|----|----|
| 首页分类 | All Stays | [ES翻译] | [FR翻译] | [DE翻译] | すべての宿泊 |
| Hero副标题 | AI Concierge... | [ES翻译] | [FR翻译] | [DE翻译] | AIコンシェルジュ... |
| Chat页面 | Messages | Mensajes | Messages | Nachrichten | メッセージ |
| 月份选择 | Jan/Ene | Ene | Jan | Jan | 1月 |
