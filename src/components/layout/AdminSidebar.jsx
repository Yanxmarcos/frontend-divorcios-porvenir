import {
  CalendarDays,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Expedientes', path: '/admin/expedientes', icon: FolderOpen },
  { label: 'Audiencias', path: '/admin/audiencias', icon: CalendarDays },
  { label: 'Documentos', path: '/admin/documentos', icon: FileText },
]

const getDesktopLinkClass = ({ isActive }) =>
  `flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
    isActive
      ? 'bg-primary text-white shadow-md shadow-black/20'
      : 'text-neutral-300 hover:bg-white/10 hover:text-white'
  }`

const getMobileLinkClass = ({ isActive }) =>
  `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition ${
    isActive ? 'bg-primary text-white' : 'bg-white/5 text-neutral-300'
  }`

function AdminSidebar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-neutral-900 text-white lg:flex">
        <div className="flex min-h-20 items-center gap-3 border-b border-white/10 px-6">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-lg shadow-black/20">
            <img alt="" className="h-full w-full object-contain" src="/logo.svg" />
          </span>
          <div>
            <p className="font-heading text-sm font-extrabold leading-5">Oficina de Divorcios</p>
            <p className="mt-0.5 text-[11px] font-semibold text-neutral-400">El Porvenir</p>
          </div>
        </div>

        <nav aria-label="Navegación administrativa" className="flex-1 space-y-2 px-4 py-6">
          {navigationItems.map(({ icon: Icon, label, path }) => (
            <NavLink className={getDesktopLinkClass} key={path} to={path}>
              <Icon aria-hidden="true" className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <NavLink
            className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-neutral-300 transition hover:bg-white/10 hover:text-white"
            to="/admin/login"
          >
            <LogOut aria-hidden="true" className="h-5 w-5" />
            Cerrar sesión
          </NavLink>
        </div>
      </aside>

      <div className="bg-neutral-900 px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3 text-white">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-white p-0.5">
            <img alt="" className="h-full w-full object-contain" src="/logo.svg" />
          </span>
          <p className="font-heading text-sm font-extrabold">Oficina de Divorcios</p>
        </div>
        <nav
          aria-label="Navegación administrativa móvil"
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {navigationItems.map(({ icon: Icon, label, path }) => (
            <NavLink className={getMobileLinkClass} key={path} to={path}>
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar
