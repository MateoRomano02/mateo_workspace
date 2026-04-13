import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardHomePage } from '../../features/dashboard/pages/DashboardHomePage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
