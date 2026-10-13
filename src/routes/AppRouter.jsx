import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { DemoProvider } from '../context/DemoContext'
import AdminLayout from '../layouts/AdminLayout'
import PublicLayout from '../layouts/PublicLayout'
import LandingPage from '../pages/public/LandingPage'
import PreRegistroPage from '../pages/public/PreRegistroPage'
import ConsultaEstadoPage from '../pages/public/ConsultaEstadoPage'
import LoginPage from '../pages/admin/LoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import ExpedientesPage from '../pages/admin/ExpedientesPage'
import ExpedienteDetallePage from '../pages/admin/ExpedienteDetallePage'
import AudienciasPage from '../pages/admin/AudienciasPage'
import DocumentosPage from '../pages/admin/DocumentosPage'
import PagosPage from '../pages/admin/PagosPage'
import ReportesPage from '../pages/admin/ReportesPage'
import ConfiguracionPage from '../pages/admin/ConfiguracionPage'

function Protected() { const auth = useAuth(); const location = useLocation(); return auth.session ? <AdminLayout /> : <Navigate replace to="/admin/login" state={{ from: location.pathname }} /> }

export default function AppRouter() {
  return <BrowserRouter><AuthProvider><DemoProvider><Routes>
    <Route element={<PublicLayout />}><Route path="/" element={<LandingPage />} /><Route path="/pre-registro" element={<PreRegistroPage />} /><Route path="/consulta" element={<ConsultaEstadoPage />} /></Route>
    <Route path="/admin/login" element={<LoginPage />} />
    <Route path="/admin" element={<Protected />}><Route index element={<Navigate replace to="dashboard" />} /><Route path="dashboard" element={<DashboardPage />} /><Route path="expedientes" element={<ExpedientesPage />} /><Route path="expedientes/:id" element={<ExpedienteDetallePage />} /><Route path="audiencias" element={<AudienciasPage />} /><Route path="documentos" element={<DocumentosPage />} /><Route path="pagos" element={<PagosPage />} /><Route path="reportes" element={<ReportesPage />} /><Route path="configuracion" element={<ConfiguracionPage />} /></Route>
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes></DemoProvider></AuthProvider></BrowserRouter>
}
