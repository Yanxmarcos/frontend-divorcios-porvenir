import { Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = [
  { label: 'Consulta de expediente', href: '/consulta-estado' },
  { label: 'Iniciar pre-registro', href: '/pre-registro' },
  { label: 'Portal municipal', href: 'https://muniporvenir.gob.pe/' },
]

function PublicFooter() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white p-1">
              <img
                alt="Escudo de la Municipalidad Distrital de El Porvenir"
                className="h-full w-full object-contain"
                src="/logo.svg"
              />
            </span>
            <p className="font-heading text-sm font-bold leading-5 text-white">
              Municipalidad Distrital de El Porvenir
            </p>
          </div>
          <p className="mt-4 text-sm leading-6">
            Oficina de Divorcios: orientación para el trámite de separación
            convencional y divorcio ulterior.
          </p>
        </div>

        <div>
          <h2 className="border-l-4 border-primary pl-3 text-sm font-extrabold uppercase tracking-wide text-white">
            Consultas
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a className="transition-colors hover:text-white" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="border-l-4 border-primary pl-3 text-sm font-extrabold uppercase tracking-wide text-white">
            Enlaces
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a className="transition-colors hover:text-white" href="#requisitos">Requisitos del trámite</a></li>
            <li><a className="transition-colors hover:text-white" href="#contacto">Atención presencial</a></li>
            <li><a className="transition-colors hover:text-white" href="https://muniporvenir.gob.pe/">Portal institucional</a></li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="border-l-4 border-primary pl-3 text-sm font-extrabold uppercase tracking-wide text-white">
            Contáctanos
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li className="flex gap-2"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />Av. Sánchez Carrión 500, El Porvenir</li>
            <li className="flex gap-2"><Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />044 - 400503</li>
            <li className="flex gap-2"><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" /><span className="break-all">consultamesadepartes@muniporvenir.gob.pe</span></li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs sm:px-8">
        © 2026 Municipalidad Distrital de El Porvenir - Todos los derechos reservados
      </div>
    </footer>
  )
}

export default PublicFooter
