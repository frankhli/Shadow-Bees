# i18n诊断执行摘要

**诊断时间:** 2026-03-15  
**诊断人员:** Pablo (Multilingual Auditor)  
**输出目录:** `/home/node/workspace-host/tiaohai-global/docs/redesign/i18n-diagnosis/`

---

## 📊 核心发现

### 问题本质
**切换ES/FR/DE后显示英文的根本原因：**

1. **硬编码文本 (影响所有语言)**
   - 首页(page.tsx)有12处硬编码英文
   - 导游页面(guides/page.tsx)有13处硬编码
   - 这些文本**不存在于任何翻译文件中**

2. **翻译键缺失 (影响特定语言)**
   - FR/DE/JA 缺失 `chat.*` 命名空间 (35个键)
   - FR/DE/JA 缺失 `common.months.*` (12个键)
   - 导致next-intl回退到英文

### 日语"相对正常"的真相
- **JA和FR缺失完全相同的键** (都是35个)
- JA文件更小是因为日文字符字节占用少
- 首页硬编码问题影响所有语言，包括JA

---

## 📁 输出文件清单

| 文件 | 说明 | 大小 |
|------|------|------|
| `report.md` | 完整诊断报告 | 20.7 KB |
| `quick-fix.md` | 快速修复手册 (复制即用) | 5.1 KB |
| `i18n-diagnosis-report.md` | 技术详细报告 | 13.9 KB |
| `i18n-quick-fix.md` | 补充修复指南 | 4.1 KB |
| `missing-keys.md` | 缺失键完整列表 | 6.7 KB |
| `i18n-code-examples.md` | 代码修复示例 | 11.2 KB |
| `check-translations.js` | 自动化检查脚本 | 3.2 KB |
| `patch-request.ts` | 修复补丁请求 | 1.7 KB |
| `README.md` | 目录说明 | 2.9 KB |

---

## 🎯 立即行动项

### P0 - 今天完成
1. ✅ 首页Hero副标题改用 `t('hero.description')`
2. ✅ 首页搜索框placeholder改用 `t('hero.search.placeholder')`
3. ✅ 向fr.json/de.json/ja.json添加chat命名空间

### P1 - 本周完成
4. 首页体验分类添加翻译键 (25个)
5. 首页设施筛选器添加翻译键 (10个)
6. 补充月份翻译 (12个键 × 3语言)

### P2 - 下周完成
7. 酒店列表页硬编码修复
8. 导游页面专业标签翻译
9. 酒店详情页设施标签翻译

---

## 🔍 关键代码位置

### 最严重的5个硬编码问题

| 排名 | 文件 | 问题 | 影响 |
|------|------|------|------|
| 1 | `page.tsx:72-79` | 体验分类硬编码 | 所有语言显示英文 |
| 2 | `page.tsx:263` | Hero副标题硬编码 | 所有语言显示英文 |
| 3 | `page.tsx:84-88` | 设施筛选器硬编码 | 所有语言显示英文 |
| 4 | `chat/page.tsx` | FR/DE/JA缺失chat翻译 | Chat页面全英文 |
| 5 | `guides/page.tsx:35-41` | 专业标签硬编码 | 导游页面部分英文 |

---

## ✅ 验证方法

```bash
# 进入项目目录
cd /home/node/workspace-host/tiaohai-global/apps/web

# 检查首页是否还有硬编码
grep -n "All Stays\|Hutong Culture\|Western Toilet" src/app/[locale]/page.tsx

# 检查chat翻译是否已添加
grep -A2 '"chat"' src/i18n/messages/fr.json

# 检查月份翻译是否已添加
grep -A15 '"months"' src/i18n/messages/de.json
```

---

## 📈 预期修复效果

修复后验证清单:
- [ ] 切换到ES，首页显示"Estancias"而非"All Stays"
- [ ] 切换到FR，Chat页面显示"Messages"而非"Messages"
- [ ] 切换到DE，月份选择器显示"Jan"而非"Jan"
- [ ] 切换到JA，设施筛选显示"洋式トイレ"而非"Western Toilet"

---

**诊断完成**  
**详细报告见:** `report.md`  
**快速修复见:** `quick-fix.md`
