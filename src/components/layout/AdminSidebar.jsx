import { CalendarDays, FileText, FolderOpen, LayoutDashboard, LogOut, ReceiptText, Settings, X, ChartNoAxesCombined } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const items = [
  { label: 'Resumen', path: '/admin/dashboard', icon: LayoutDashboard }, { label: 'Expedientes', path: '/admin/expedientes', icon: FolderOpen },
  { label: 'Audiencias', path: '/admin/audiencias', icon: CalendarDays }, { label: 'Pagos', path: '/admin/pagos', icon: ReceiptText },
  { label: 'Documentos', path: '/admin/documentos', icon: FileText }, { label: 'Reportes', path: '/admin/reportes', icon: ChartNoAxesCombined },
  { label: 'Configuración demo', path: '/admin/configuracion', icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
  const auth = useAuth(); const navigate = useNavigate()
  const logout = () => { auth.logout(); navigate('/admin/login') }
  return <>
    {open && <button className="sidebar-backdrop" aria-label="Cerrar navegación" onClick={onClose} />}
    <aside className={'admin-sidebar ' + (open ? 'is-open' : '')}>
      <div className="sidebar-brand"><img src="/logo.svg" alt="Municipalidad de El Porvenir" /><div><strong>Gestión legal</strong><span>Separación y divorcio</span></div><button className="mobile-close" onClick={onClose} aria-label="Cerrar"><X /></button></div>
      <nav aria-label="Navegación administrativa">{items.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} onClick={onClose} className={({ isActive }) => isActive ? 'active' : ''}><Icon aria-hidden="true" /><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-user"><div><strong>Dra. María García</strong><span>Abogada responsable</span></div><button onClick={logout}><LogOut aria-hidden="true" /> Salir</button></div>
    </aside>
  </>
}
