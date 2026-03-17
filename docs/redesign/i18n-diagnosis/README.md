# i18n 诊断文档索引

**任务ID:** TIAOHAI-I18N-DIAGNOSIS-001  
**问题:** 切换ES/FR/DE语言后显示英文，日语相对正常

---

## 📁 文档清单

| 文档 | 说明 | 优先级 |
|------|------|--------|
| [`report.md`](./report.md) | 完整诊断报告 | 必读 |
| [`missing-keys.md`](./missing-keys.md) | 缺失翻译键清单 | 开发参考 |
| [`patch-request.ts`](./patch-request.ts) | 临时修复补丁 | 快速修复 |
| [`check-translations.js`](./check-translations.js) | 翻译检查脚本 | 验证工具 |

---

## 🎯 快速开始

### 1. 阅读诊断报告
```bash
cat report.md
```
了解问题的根本原因和影响范围。

### 2. 运行检查脚本
```bash
cd /home/node/workspace-host/tiaohai-global
node docs/redesign/i18n-diagnosis/check-translations.js
```
查看当前翻译完整度。

### 3. 应用临时修复（可选）
```bash
# 备份原文件
cp apps/web/src/i18n/request.ts apps/web/src/i18n/request.ts.backup

# 应用补丁
cp docs/redesign/i18n-diagnosis/patch-request.ts apps/web/src/i18n/request.ts

# 重启开发服务器
npm run dev
```

### 4. 补齐缺失翻译
参考 [`missing-keys.md`](./missing-keys.md) 中的清单，手动或使用脚本补齐翻译。

---

## 📊 问题摘要

### 完整度统计
```
🇺🇸 EN: 100% ✅
🇪🇸 ES: 98.0% ⚠️  (缺失16键)
🇫🇷 FR: 95.5% ⚠️  (缺失35键)
🇩🇪 DE: 92.5% 🔴  (缺失59键)
🇯🇵 JA: 95.5% ⚠️  (缺失35键)
```

### 为什么日语"相对正常"
- 日语和法语完整度相同（95.5%）
- 缺失的键主要集中在较少使用的模块（guideDashboard、chat）
- 用户可能在测试时避开了缺失翻译的功能

---

## 🔧 修复方案

### 方案A: 临时修复（5分钟）
应用 `patch-request.ts`，添加英语回退机制。

**优点:** 快速见效，无需补齐所有翻译  
**缺点:** 缺失部分显示英文而非目标语言

### 方案B: 完整修复（2-3小时）
1. 补齐 `de.json` 缺失的59键（优先级最高）
2. 补齐 `fr.json` 和 `ja.json` 缺失的35键
3. 补齐 `es.json` 缺失的16键

**优点:** 彻底解决，所有语言100%完整  
**缺点:** 需要翻译资源和时间

### 推荐方案
**短期:** 应用临时修复（今天）  
**中期:** 补齐德语结账流程（本周）  
**长期:** 建立翻译管理流程（本月）

---

## 🧪 验证步骤

### 1. 检查翻译完整度
```bash
node check-translations.js
```

### 2. 手动验证
- 访问 `/es` - 验证西班牙语
- 访问 `/fr` - 验证法语
- 访问 `/de` - 验证德语
- 访问 `/ja` - 验证日语

### 3. 关键流程测试
- 每种语言下完成酒店搜索
- 进入结账流程
- 检查所有步骤显示正确语言

---

## 📞 问题反馈

如有疑问，请联系：
- **架构师:** Archie
- **PM:** Mike
- **工程师:** Eddie

---

**文档生成时间:** 2026-03-15  
**最后更新:** 2026-03-15
