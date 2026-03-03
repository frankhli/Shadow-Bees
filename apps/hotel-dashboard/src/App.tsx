import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HotelLayout } from './components/layout/HotelLayout'
import { Dashboard } from './pages/Dashboard'
import { HotelInfo } from './pages/hotel/HotelInfo'
import { RoomTypes } from './pages/hotel/RoomTypes'
import { RoomCalendar } from './pages/hotel/RoomCalendar'
import { Orders } from './pages/orders/Orders'
import { AIChat } from './pages/ai/AIChat'
import { ContentGen } from './pages/marketing/ContentGen'
import { Analytics } from './pages/marketing/Analytics'
import { Settings } from './pages/system/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* 酒店管理 */}
          <Route path="hotel/info" element={<HotelInfo />} />
          <Route path="hotel/rooms" element={<RoomTypes />} />
          <Route path="hotel/calendar" element={<RoomCalendar />} />
          
          {/* 订单 */}
          <Route path="orders" element={<Orders />} />
          
          {/* AI 客服 */}
          <Route path="ai/chat" element={<AIChat />} />
          
          {/* 营销 */}
          <Route path="marketing/content" element={<ContentGen />} />
          <Route path="marketing/analytics" element={<Analytics />} />
          
          {/* 设置 */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
