import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminHeader from '../components/layout/AdminHeader'
import AdminSidebar from '../components/layout/AdminSidebar'
import { useDemo } from '../context/DemoContext'

const titles = { '/admin/dashboard': 'Resumen operativo', '/admin/expedientes': 'Expedientes', '/admin/audiencias': 'Audiencias', '/admin/documentos': 'Documentos y formatos', '/admin/pagos': 'Pagos', '/admin/reportes': 'Reporte de resoluciones', '/admin/configuracion': 'Configuración demo' }

export default function AdminLayout() {
  const location = useLocation()
  const { notice, setNotice } = useDemo()
  const [menuOpen, setMenuOpen] = useState(false)
  const title = Object.entries(titles).find(([path]) => location.pathname.startsWith(path))?.[1] || 'Detalle de expediente'
  return <div className="admin-shell">
    <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    <div className="admin-workspace">
      <div className="demo-banner">Demostración — datos ficticios · Sin conexión a sistemas municipales</div>
      <AdminHeader title={title} onMenu={() => setMenuOpen(true)} />
      <main className="admin-main"><Outlet /></main>
      {notice && <div className="app-toast" role="status"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Cerrar mensaje">×</button></div>}
    </div>
  </div>
}
