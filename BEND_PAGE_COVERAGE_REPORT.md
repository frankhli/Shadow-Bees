# B端页面应用覆盖报告

## 总览

| 系统 | 导航项 | 实际页面 | 状态 |
|------|--------|----------|------|
| Hotel | 30 | 30 | ✅ 完全匹配 |
| Guide | 26 | 27 | ⚠️ 1个孤儿页面 |
| Venue | 28 | 28 | ✅ 完全匹配 |
| Admin | 27 | 32 | ⚠️ 5个孤儿页面 |
| **总计** | **111** | **117** | **6个未应用** |

---

## 已应用页面（在导航中）✅

所有在左侧导航中定义的 **111个路径** 都有对应的页面文件，用户可以正常访问。

### Hotel系统 (30页)
全部已应用到导航，无孤儿页面。

### Guide系统 (26页在导航中)
全部已应用到导航。

### Venue系统 (28页)
全部已应用到导航，无孤儿页面。

### Admin系统 (27页在导航中)
全部已应用到导航。

---

## 未应用页面（孤儿页面）⚠️

这些页面存在但**不在左侧导航中**，用户无法通过导航访问：

### 1. Guide系统 - 1个孤儿页面

| 页面路径 | 说明 | 建议 |
|----------|------|------|
| `/guide/schedule/history` | 历史日程查看 | 添加到导航"排班管理"下 |

### 2. Admin系统 - 5个孤儿页面

| 页面路径 | 说明 | 建议 |
|----------|------|------|
| `/admin/users` | 用户管理 | 添加到主导航 |
| `/admin/guides/schedule` | 导游排班管理 | 添加到"导游管理"下 |
| `/admin/hotels/license` | 酒店资质(旧) | 与`foreign-license`重复，建议删除 |
| `/admin/venues/list` | 场馆列表 | 与`/admin/venues`重复，建议删除 |
| `/admin/venues/activities` | 场馆活动管理 | 添加到"体验店管理"下或删除 |

---

## 修复方案

### 方案A: 添加到导航（推荐使用这些页面）

我可以将这些孤儿页面添加到对应系统的导航中：

1. **Guide系统** - 在"排班管理"下添加"历史记录"
2. **Admin系统** - 添加"用户管理"到主导航
3. **Admin系统** - 在"导游管理"下添加"排班管理"

### 方案B: 删除孤儿页面（如果这些功能不需要）

如果这些页面是不需要的，可以直接删除：
```bash
rm -f apps/web/src/app/(guide)/guide/schedule/history/page.tsx
rm -f apps/web/src/app/(admin)/admin/guides/schedule/page.tsx
rm -f apps/web/src/app/(admin)/admin/hotels/license/page.tsx
rm -f apps/web/src/app/(admin)/admin/users/page.tsx
rm -f apps/web/src/app/(admin)/admin/venues/activities/page.tsx
rm -f apps/web/src/app/(admin)/admin/venues/list/page.tsx
```

---

## 您希望怎么处理？

请告诉我：

1. **是否要将孤儿页面添加到导航中？**
   - 方案A-1: 添加全部6个页面到导航
   - 方案A-2: 只添加部分（请指定）

2. **是否要删除不需要的孤儿页面？**
   - 方案B: 删除所有孤儿页面
   - 或者保留现状（页面存在但无法访问）

3. **哪些功能是您实际需要的？**
   - 用户管理 (`/admin/users`)
   - 导游排班 (`/admin/guides/schedule`)
   - 历史日程 (`/guide/schedule/history`)
   - 其他...
