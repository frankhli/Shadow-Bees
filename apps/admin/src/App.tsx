import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AdminLayout } from './components/layout/AdminLayout'
import { Dashboard } from './pages/dashboard/Dashboard'
import { HotelAudit } from './pages/hotels/HotelAudit'
import { HotelList } from './pages/hotels/HotelList'
import { UserOwners } from './pages/users/UserOwners'
import { UserGuests } from './pages/users/UserGuests'
import { UserGuides } from './pages/users/UserGuides'
import { OrderMonitoring } from './pages/orders/OrderMonitoring'
import { AIKnowledgeBase } from './pages/ai/AIKnowledgeBase'
import { FinanceSettlement } from './pages/finance/FinanceSettlement'
import { SystemSettings } from './pages/settings/SystemSettings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hotels/audit" element={<HotelAudit />} />
          <Route path="hotels/list" element={<HotelList />} />
          <Route path="users/owners" element={<UserOwners />} />
          <Route path="users/guests" element={<UserGuests />} />
          <Route path="users/guides" element={<UserGuides />} />
          <Route path="orders" element={<OrderMonitoring />} />
          <Route path="ai/knowledge" element={<AIKnowledgeBase />} />
          <Route path="finance" element={<FinanceSettlement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
