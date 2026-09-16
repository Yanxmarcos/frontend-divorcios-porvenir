import { Bell } from 'lucide-react'

function AdminHeader({ title }) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Panel administrativo
          </p>
          <h1 className="mt-1 font-heading text-xl font-extrabold text-neutral-900 sm:text-2xl">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            aria-label="Ver notificaciones"
            className="relative grid h-11 w-11 place-items-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:border-primary-light hover:bg-primary-light hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary-light"
            type="button"
          >
            <Bell aria-hidden="true" className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-extrabold text-white">
              MG
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-neutral-900">Dra. María García</p>
              <p className="mt-0.5 text-xs text-neutral-600">Abogada responsable</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
