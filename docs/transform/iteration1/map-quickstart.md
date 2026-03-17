# 地图功能快速启动指南

## 1. 配置Mapbox Token (必需)

### 步骤1: 获取Token
1. 访问 https://account.mapbox.com/access-tokens/
2. 登录/注册Mapbox账号
3. 点击 "Create a token"
4. 选择 "Public token"
5. 复制生成的Token

### 步骤2: 配置环境变量
```bash
# 编辑 apps/web/.env.local
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoi...your_token_here
```

### 步骤3: 验证配置
```bash
cd /home/node/workspace-host/tiaohai-global/apps/web
npm run dev
# 访问 http://localhost:3000 查看地图是否正常加载
```

---

## 2. 测试地图功能

### 首页地图测试
1. 访问首页，向下滚动到"Explore Destinations"区域
2. 确认中国地图正确加载
3. 点击城市标记（如北京、上海），应自动搜索该城市

### 酒店卡片测试
1. 确保API返回的Hostel数据包含coordinates字段
2. 酒店卡片应显示右下角的小地图缩略图
3. 点击缩略图应跳转到详情页

### 详情页地图测试
1. 进入任意酒店详情页
2. 向下滚动到"Location"区域
3. 确认交互式地图加载正常
4. 测试POI列表和地图标记交互

---

## 3. 为现有酒店添加坐标

### API数据格式更新
```typescript
// apps/api/src/hotels/entities/hotel.entity.ts
export class Hotel {
  // ... existing fields
  
  @Column('float', { nullable: true })
  longitude?: number
  
  @Column('float', { nullable: true })
  latitude?: number
}
```

### Mock数据示例
```json
{
  "id": "beijing-hutong-001",
  "name": "Beijing Traditional Hutong Hostel",
  "city": "Beijing",
  "district": "Dongcheng",
  "coordinates": [116.4074, 39.9042],
  "address": "123 Gulou East Street, Dongcheng District, Beijing"
}
```

### 批量获取坐标
使用Mapbox Geocoding API批量转换地址：
```bash
curl "https://api.mapbox.com/geocoding/v5/mapbox.places/北京市东城区.json?access_token=YOUR_TOKEN&limit=1"
```

---

## 4. 常见问题排查

### 地图不显示
```
问题: 空白区域或加载失败
检查:
1. Token是否正确配置在.env.local
2. Token是否被域名限制（本地开发需添加localhost）
3. 浏览器控制台是否有CORS错误
```

### 地图显示但无标记
```
问题: 地图加载但看不到城市/酒店标记
检查:
1. POPULAR_CITIES数据是否正确导入
2. Hostel接口是否包含coordinates字段
3. 坐标格式是否为[lng, lat]（经度在前）
```

### TypeScript错误
```
问题: 编译时出现类型错误
解决:
1. 确保安装了@types/mapbox-gl
2. 检查map.current的非空判断
```

---

## 5. 生产环境配置

### Token安全
```
1. 创建生产环境专用Token
2. 配置域名白名单（如：tiaohai.com, *.tiaohai.com）
3. 设置请求来源限制
4. 启用Token使用监控
```

### 性能优化
```
1. 启用Mapbox CDN缓存
2. 配置静态地图图片缓存
3. 监控API调用量，避免超出免费额度
```

### 免费额度
```
Mapbox免费额度：
- Map Loads: 50,000 / month
- Static Images: 50,000 / month
- Geocoding: 100,000 / month

超过后费用：
- Map Loads: $5 / 1,000
- Static Images: $2 / 1,000
```

---

## 6. 自定义配置

### 修改热门城市
编辑 `apps/web/src/components/map/map-config.ts`:
```typescript
export const POPULAR_CITIES = [
  { id: 'your-city', name: 'City Name', nameCn: '中文名', coordinates: [lng, lat], hotelCount: 10 },
  // ...
]
```

### 自定义地图样式
```typescript
// 使用Mapbox Studio创建自定义样式
// https://studio.mapbox.com/
export const MAP_STYLE_CUSTOM = 'mapbox://styles/your-username/your-style-id'
```

### 调整POI类型
```typescript
export const POI_TYPES = {
  your_type: { icon: 'emoji', color: '#hex', label: 'Label' },
}
```

---

**最后更新**: 2026-03-16
