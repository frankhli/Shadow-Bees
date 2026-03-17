# 地图功能集成技术方案

**任务**: 【迭代1-修复】地图功能集成（P0阻塞项）  
**日期**: 2026-03-16  
**负责人**: Archie (架构师)  
**工期**: 2天

---

## 1. 需求分析

根据hospitality_expert验收报告，地图功能是P0关键需求：

| 需求项 | 优先级 | 说明 |
|--------|--------|------|
| 首页Hero区地图 | P0 | 显示中国地图+热门城市标记 |
| 酒店卡片缩略图 | P0 | 显示酒店位置地图缩略图 |
| 酒店详情页地图 | P0 | 显示完整地图+周边POI |

---

## 2. 技术选型

### 2.1 地图SDK对比

| 维度 | Mapbox GL JS | 高德JS API | Google Maps |
|------|--------------|------------|-------------|
| 业务匹配度(外国游客) | 5 | 3 | 5 |
| 中国访问稳定性 | 4 | 5 | 2 |
| 文档/社区(英文) | 5 | 2 | 5 |
| 样式定制能力 | 5 | 4 | 4 |
| 价格 | 4(免费额度足) | 5(免费) | 3(需信用卡) |
| **总分** | **4.6** | **3.8** | **3.8** |

**决策**: 选择 **Mapbox GL JS**
- 外国游客体验最佳
- 英文文档完善
- 样式可深度定制匹配品牌
- 免费额度足够（50,000 loads/month）

### 2.2 组件设计

```
components/map/
├── MapContainer.tsx          # 基础地图容器
├── ChinaMap.tsx              # 中国地图+热门城市
├── HotelMapThumbnail.tsx     # 酒店卡片地图缩略图
├── HotelDetailMap.tsx        # 酒店详情页地图
├── PoiMarkers.tsx            # POI标记组件
└── map-config.ts             # 地图配置
```

---

## 3. 实施计划

### Day 1: 基础架构
- [x] 创建技术方案文档
- [ ] 安装Mapbox依赖
- [ ] 配置Mapbox Token
- [ ] 创建基础地图组件
- [ ] 创建中国地图组件（Hero区）

### Day 2: 功能集成
- [ ] 酒店卡片地图缩略图
- [ ] 酒店详情页完整地图
- [ ] 周边POI功能
- [ ] 性能优化（懒加载）
- [ ] 测试与文档

---

## 4. 关键技术决策

### 4.1 Mapbox Token管理
- 使用环境变量 `NEXT_PUBLIC_MAPBOX_TOKEN`
- 开发使用测试Token
- 生产使用受限域名Token

### 4.2 性能优化策略
- 地图组件懒加载（dynamic import）
- 缩略图使用静态图片（Mapbox Static API）
- 详情页使用交互式地图

### 4.3 数据要求
```typescript
interface HotelLocation {
  id: string
  name: string
  coordinates: [number, number]  // [lng, lat]
  city: string
  address: string
}

interface CityMarker {
  id: string
  name: string
  nameCn: string
  coordinates: [number, number]
  hotelCount: number
}
```

---

## 5. 风险评估

| 风险 | 概率 | 影响 | 应对策略 |
|------|------|------|----------|
| Mapbox在中国访问不稳定 | 中 | 高 | 准备高德备用方案 |
| Token泄露 | 低 | 高 | 域名限制+监控 |
| 性能问题(移动端) | 中 | 中 | 懒加载+静态图降级 |
| API调用超限 | 低 | 中 | 缓存+用量监控 |

---

## 6. 验收标准

- [ ] 首页Hero区显示中国地图，标记热门城市
- [ ] 点击城市标记可筛选酒店
- [ ] 酒店卡片显示位置缩略图
- [ ] 酒店详情页显示交互式地图
- [ ] 地图显示周边POI（地铁、景点、餐厅）
- [ ] 移动端正常显示和操作
- [ ] 加载时间 < 3s

---

**文档版本**: v1.0  
**创建时间**: 2026-03-16 10:10
