import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { label: 'Municipalidad', href: 'https://muniporvenir.gob.pe/' },
  { label: 'Servicios', href: '#accesos' },
  { label: 'Oficina de Divorcios', href: '#tramite' },
  { label: 'Consulta de expediente', href: '/consulta-estado' },
  { label: 'Transparencia', href: 'https://muniporvenir.gob.pe/' },
]

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-b border-neutral-200 bg-white shadow-sm">
      <div className="h-1 bg-primary" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <a
          aria-label="Ir al inicio de Divorcio Municipal"
          className="flex min-w-0 items-center gap-3"
          href="/"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
            <img
              alt="Escudo de la Municipalidad Distrital de El Porvenir"
              className="h-full w-full object-contain"
              src="/logo.svg"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-heading text-sm font-extrabold leading-5 text-neutral-900 sm:text-base">
              Municipalidad Distrital de El Porvenir
            </span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-primary">
              Capital del Calzado Peruano
            </span>
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  className="inline-flex min-h-10 items-center rounded-md px-3 text-xs font-bold uppercase tracking-wide text-neutral-600 transition-colors hover:bg-primary-light hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary-light"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          aria-controls="public-mobile-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-neutral-200 text-neutral-800 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary-light lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="border-t border-neutral-200 bg-white px-5 py-3 lg:hidden"
          id="public-mobile-menu"
        >
          <ul className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  className="block rounded-md px-3 py-3 text-sm font-bold text-neutral-700 hover:bg-primary-light hover:text-primary"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default PublicNavbar
