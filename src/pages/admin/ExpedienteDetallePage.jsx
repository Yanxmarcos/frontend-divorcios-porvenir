import { useState } from 'react'
import {
  ArrowLeft,
  CalendarPlus,
  Download,
  FileText,
  MapPin,
  MessageSquarePlus,
  Phone,
  RefreshCw,
  UploadCloud,
  UserRound,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import AdminHeader from '../../components/layout/AdminHeader.jsx'
import AdminSidebar from '../../components/layout/AdminSidebar.jsx'
import StatusTimeline from '../../components/shared/StatusTimeline.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { expedientes } from '../../mock/expedientes.js'

const documents = [
  { id: 'solicitud', name: 'Solicitud de separación convencional.pdf', size: '1.2 MB' },
  { id: 'dni-ana', name: 'DNI del primer cónyuge.pdf', size: '840 KB' },
  { id: 'dni-luis', name: 'DNI del segundo cónyuge.pdf', size: '815 KB' },
  { id: 'matrimonio', name: 'Acta de matrimonio.pdf', size: '2.1 MB' },
  { id: 'domicilio', name: 'Declaración de domicilio conyugal.pdf', size: '980 KB' },
]

const timelineItems = [
  {
    date: '01/09/2026',
    description: 'Solicitud registrada correctamente',
    status: 'complete',
  },
  {
    date: '03/09/2026',
    description: 'Documentos recibidos por Mesa de Partes',
    status: 'complete',
  },
  {
    date: '09/09/2026',
    description: 'Expediente asignado para revisión legal',
    status: 'current',
  },
  {
    date: 'Pendiente',
    description: 'Audiencia de ratificación',
    status: 'pending',
  },
  {
    date: 'Pendiente',
    description: 'Resolución de admisibilidad',
    status: 'pending',
  },
  {
    date: 'Pendiente',
    description: 'Disolución final',
    status: 'pending',
  },
]

const actionButtons = [
  { label: 'Cambiar estado', icon: RefreshCw },
  { label: 'Registrar audiencia', icon: CalendarPlus },
  { label: 'Subir documento', icon: UploadCloud },
]

function ExpedienteDetallePage() {
  const { id } = useParams()
  const caseData = expedientes.find((caseItem) => caseItem.id === id)
  const [actionMessage, setActionMessage] = useState('')
  const [note, setNote] = useState('')
  const [internalNotes, setInternalNotes] = useState([
    {
      author: 'Dra. María García',
      date: '09/09/2026 · 10:20 AM',
      text: 'Se inició la revisión de los documentos presentados.',
    },
  ])

  const addNote = () => {
    const cleanNote = note.trim()
    if (!cleanNote) return

    setInternalNotes((currentNotes) => [
      {
        author: 'Dra. María García',
        date: '09/09/2026 · Ahora',
        text: cleanNote,
      },
      ...currentNotes,
    ])
    setNote('')
    setActionMessage('Nota interna agregada correctamente.')
  }

  if (!caseData) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader title="Expediente no encontrado" />
          <main className="p-5 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-sm">
              <FileText aria-hidden="true" className="mx-auto h-10 w-10 text-neutral-400" />
              <h2 className="mt-4 text-2xl font-extrabold text-neutral-900">
                No encontramos este expediente
              </h2>
              <Link
                className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:text-primary-dark"
                to="/admin/expedientes"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Volver al listado
              </Link>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Detalle del expediente" />

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 transition hover:text-primary"
              to="/admin/expedientes"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Volver a expedientes
            </Link>

            <section className="mt-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-600">
                    Número de expediente
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h2 className="font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                      {caseData.number}
                    </h2>
                    <Badge variant={caseData.variant}>{caseData.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600">
                    Ingresado el {caseData.entryDate}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {actionButtons.map(({ icon: Icon, label }, index) => (
                    <button
                      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-primary-light ${
                        index === 0
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'border border-neutral-200 bg-white text-neutral-800 hover:border-primary hover:text-primary'
                      }`}
                      key={label}
                      onClick={() => setActionMessage(`${label}: acción simulada correctamente.`)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {actionMessage && (
                <p
                  className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-leaf"
                  role="status"
                >
                  {actionMessage}
                </p>
              )}
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <UserRound aria-hidden="true" className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-extrabold text-neutral-900">Datos de los cónyuges</h2>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {caseData.spouses.map((spouse, index) => (
                      <article className="rounded-xl bg-neutral-50 p-5" key={spouse.dni}>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          Cónyuge {index + 1}
                        </p>
                        <h3 className="mt-3 font-bold leading-6 text-neutral-900">{spouse.name}</h3>
                        <dl className="mt-4 space-y-3 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <dt className="text-neutral-600">DNI</dt>
                            <dd className="font-semibold text-neutral-900">{spouse.dni}</dd>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <dt className="inline-flex items-center gap-1.5 text-neutral-600">
                              <Phone aria-hidden="true" className="h-4 w-4" />
                              Teléfono
                            </dt>
                            <dd className="font-semibold text-neutral-900">{spouse.phone}</dd>
                          </div>
                        </dl>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <MapPin aria-hidden="true" className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-extrabold text-neutral-900">Datos del matrimonio</h2>
                  </div>
                  <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <dt className="text-sm text-neutral-600">Fecha de matrimonio</dt>
                      <dd className="mt-1 font-bold text-neutral-900">15/03/2018</dd>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <dt className="text-sm text-neutral-600">Años de casados</dt>
                      <dd className="mt-1 font-bold text-neutral-900">8 años</dd>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <dt className="text-sm text-neutral-600">Lugar</dt>
                      <dd className="mt-1 font-bold text-neutral-900">El Porvenir, Trujillo</dd>
                    </div>
                    <div className="rounded-xl bg-neutral-50 p-4">
                      <dt className="text-sm text-neutral-600">Último domicilio conyugal</dt>
                      <dd className="mt-1 font-bold leading-6 text-neutral-900">
                        Av. Sánchez Carrión N.º 720
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <FileText aria-hidden="true" className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-extrabold text-neutral-900">Documentos subidos</h2>
                  </div>

                  <div className="mt-6 divide-y divide-neutral-100">
                    {documents.map((document) => (
                      <div
                        className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                        key={document.id}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-light text-primary">
                            <FileText aria-hidden="true" className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-neutral-900">{document.name}</p>
                            <p className="mt-1 text-xs text-neutral-600">PDF · {document.size}</p>
                          </div>
                        </div>
                        <button
                          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-bold text-neutral-600 transition hover:border-primary hover:bg-primary-light hover:text-primary"
                          onClick={() => setActionMessage(`Descarga simulada: ${document.name}`)}
                          type="button"
                        >
                          <Download aria-hidden="true" className="h-4 w-4" />
                          Descargar
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <MessageSquarePlus aria-hidden="true" className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-extrabold text-neutral-900">Comentarios internos</h2>
                  </div>

                  <label className="mt-6 block text-sm font-bold text-neutral-800" htmlFor="internal-note">
                    Agregar comentario
                  </label>
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-xl border border-neutral-200 bg-white p-4 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light"
                    id="internal-note"
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Escriba una nota visible solo para el personal administrativo..."
                    value={note}
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!note.trim()}
                      onClick={addNote}
                      type="button"
                    >
                      <MessageSquarePlus aria-hidden="true" className="h-4 w-4" />
                      Agregar nota
                    </button>
                  </div>

                  <div className="mt-7 space-y-3">
                    {internalNotes.map((internalNote, index) => (
                      <article className="rounded-xl bg-neutral-50 p-4" key={`${internalNote.date}-${index}`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-bold text-neutral-900">{internalNote.author}</p>
                          <p className="text-xs text-neutral-600">{internalNote.date}</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">{internalNote.text}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <aside>
                <section className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-xl font-extrabold text-neutral-900">Timeline del trámite</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Historial y próximos hitos del expediente.
                  </p>
                  <div className="mt-7">
                    <StatusTimeline items={timelineItems} />
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ExpedienteDetallePage
