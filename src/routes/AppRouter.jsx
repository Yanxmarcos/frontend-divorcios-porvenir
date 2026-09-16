import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/public/LandingPage.jsx'
import PreRegistroPage from '../pages/public/PreRegistroPage.jsx'
import ConsultaEstadoPage from '../pages/public/ConsultaEstadoPage.jsx'
import LoginPage from '../pages/admin/LoginPage.jsx'
import DashboardPage from '../pages/admin/DashboardPage.jsx'
import ExpedientesPage from '../pages/admin/ExpedientesPage.jsx'
import ExpedienteDetallePage from '../pages/admin/ExpedienteDetallePage.jsx'
import AudienciasPage from '../pages/admin/AudienciasPage.jsx'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<PreRegistroPage />} path="/pre-registro" />
        <Route element={<ConsultaEstadoPage />} path="/consulta-estado" />
        <Route element={<LoginPage />} path="/admin/login" />
        <Route element={<DashboardPage />} path="/admin/dashboard" />
        <Route element={<ExpedientesPage />} path="/admin/expedientes" />
        <Route element={<ExpedienteDetallePage />} path="/admin/expedientes/:id" />
        <Route element={<AudienciasPage />} path="/admin/audiencias" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
