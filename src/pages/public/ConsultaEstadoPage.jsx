import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Eye,
  ExternalLink,
  FileText,
  IdCard,
  LoaderCircle,
  MessageSquareText,
  Search,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import StatusTimeline from '../../components/shared/StatusTimeline.jsx'
import Badge from '../../components/ui/Badge.jsx'
import ProgressBar from '../../components/ui/ProgressBar.jsx'
import { consultaTramiteDemo } from '../../mock/consultaTramite.js'

const processStates = [
  'Pre-registrado',
  'En revisión',
  'En Audiencia',
  'Concluido',
]

function ConsultaEstadoPage() {
  const [dni, setDni] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [error, setError] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [previewDocument, setPreviewDocument] = useState(null)

  const handleSearch = async (event) => {
    event.preventDefault()

    if (!/^\d{8}$/.test(dni)) {
      setError('Ingrese un DNI válido de 8 dígitos.')
      setSearchResult(null)
      return
    }

    setError('')
    setIsSearching(true)
    setPreviewDocument(null)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSearchResult(dni === consultaTramiteDemo.dni ? 'found' : 'not-found')
    setIsSearching(false)
  }

  const handleDniChange = (event) => {
    const nextDni = event.target.value.replace(/\D/g, '').slice(0, 8)
    setDni(nextDni)
    setError('')
    setSearchResult(null)
    setPreviewDocument(null)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 transition hover:text-primary"
            to="/"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            Volver al inicio
          </Link>
          <span className="hidden text-sm font-semibold text-neutral-600 sm:block">
            Municipalidad Distrital de El Porvenir
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Seguimiento en línea
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Consulte el estado de su trámite
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            Ingrese el DNI del titular para revisar su pre-registro, los documentos y el avance del trámite.
          </p>
        </div>

        <form
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-md sm:p-9"
          onSubmit={handleSearch}
        >
          <label
            className="block text-center text-base font-bold text-neutral-900 sm:text-lg"
            htmlFor="consulta-dni"
          >
            Ingrese su DNI
          </label>
          <div className="relative mx-auto mt-4 max-w-md">
            <IdCard
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-400"
            />
            <input
              autoComplete="off"
              autoFocus
              className="min-h-16 w-full rounded-xl border border-neutral-200 bg-white py-4 pl-13 pr-4 text-center text-2xl font-bold tracking-[0.18em] text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light"
              id="consulta-dni"
              inputMode="numeric"
              maxLength="8"
              onChange={handleDniChange}
              placeholder="11111111"
              disabled={isSearching}
              value={dni}
            />
          </div>
          {error && (
            <p className="mt-3 text-center text-sm font-semibold text-primary" role="alert">
              {error}
            </p>
          )}
          <button
            className="mx-auto mt-5 flex min-h-14 w-full max-w-md items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md disabled:cursor-wait disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-primary-light"
            disabled={isSearching}
            type="submit"
          >
            {isSearching ? (
              <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
            ) : (
              <Search aria-hidden="true" className="h-5 w-5" />
            )}
            {isSearching ? 'Consultando...' : 'Consultar'}
          </button>
        </form>

        <div aria-live="polite">
          {searchResult === 'found' && (
            <div className="wizard-panel-in mt-8 space-y-6">
              <p className="rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm leading-6 text-neutral-600">Vista de demostración con datos ficticios. Los documentos se muestran con un PDF de ejemplo.</p>
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md">
                <div className="border-b border-neutral-200 bg-white p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                        <UserRound aria-hidden="true" className="h-7 w-7" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-neutral-600">Titular</p>
                        <h2 className="mt-1 truncate text-xl font-extrabold text-neutral-900 sm:text-2xl">
                          {consultaTramiteDemo.titular}
                        </h2>
                      </div>
                    </div>
                    <Badge variant="warning">{consultaTramiteDemo.estado}</Badge>
                  </div>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
                  <div className="rounded-xl bg-neutral-50 p-5">
                    <p className="text-sm font-semibold text-neutral-600">
                      DNI del solicitante
                    </p>
                    <p className="mt-2 font-heading text-xl font-extrabold tracking-wide text-primary">
                      {consultaTramiteDemo.dni}
                    </p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-5">
                    <p className="text-sm font-semibold text-neutral-600">Estado actual</p>
                    <p className="mt-2 text-lg font-extrabold text-neutral-900">
                      {consultaTramiteDemo.estado}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600">Pre-registro recibido el {consultaTramiteDemo.fecha}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                    <FileText aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-extrabold text-neutral-900">
                    Progreso del trámite
                  </h2>
                </div>

                <div className="mt-7">
                  <ProgressBar current={consultaTramiteDemo.etapa} label="Estado" total={4} />
                </div>

                <div className="mt-6 overflow-x-auto pb-2">
                  <ol className="grid min-w-[620px] grid-cols-4">
                    {processStates.map((state, index) => {
                      const stateNumber = index + 1
                      const isCurrent = stateNumber === consultaTramiteDemo.etapa
                      const isComplete = stateNumber < consultaTramiteDemo.etapa

                      return (
                        <li className="relative flex flex-col items-center text-center" key={state}>
                          {index < processStates.length - 1 && (
                            <span
                              aria-hidden="true"
                              className={`absolute left-1/2 top-5 h-0.5 w-full ${
                                isComplete ? 'bg-primary' : 'bg-neutral-200'
                              }`}
                            />
                          )}
                          <span
                            className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold ${
                              isCurrent
                                ? 'border-accent bg-accent-light text-amber-800 ring-4 ring-accent-light/60'
                                : isComplete
                                  ? 'border-primary bg-primary text-white'
                                  : 'border-neutral-200 bg-white text-neutral-400'
                            }`}
                          >
                            {stateNumber}
                          </span>
                          <span
                            className={`mt-3 text-sm font-bold ${
                              isCurrent ? 'text-amber-800' : 'text-neutral-600'
                            }`}
                          >
                            {state}
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </section>

              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="text-xl font-extrabold text-neutral-900">
                    Historial del trámite
                  </h2>
                  <div className="mt-7">
                    <StatusTimeline items={consultaTramiteDemo.historial} />
                  </div>
                </section>

                <div className="space-y-6">
                  <section className="rounded-2xl border border-accent/30 bg-accent-light p-6 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3 text-amber-900">
                      <MessageSquareText aria-hidden="true" className="h-6 w-6" />
                      <h2 className="text-lg font-extrabold">Mensaje de la Oficina de Divorcios</h2>
                    </div>
                    <blockquote className="mt-4 text-base leading-7 text-neutral-800">
                      {consultaTramiteDemo.mensaje}
                    </blockquote>
                  </section>

                  <section className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm sm:p-7">
                    <Download aria-hidden="true" className="mx-auto h-8 w-8 text-primary" />
                    <h2 className="mt-3 text-lg font-extrabold text-neutral-900">
                      Constancia de pre-registro
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Consulte la constancia referencial de recepción de su solicitud.
                    </p>
                    <a
                      className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                      href="/EJEMPLO.pdf"
                      download="Constancia-de-pre-registro-ejemplo.pdf"
                    >
                      <Download aria-hidden="true" className="h-5 w-5" />
                      Descargar constancia
                    </a>
                    <a className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline underline-offset-4" href="/EJEMPLO.pdf" target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" className="h-4 w-4" />Ver constancia de ejemplo</a>
                  </section>
                </div>
              </div>
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-extrabold text-neutral-900">Documentos presentados</h2>
                <p className="mt-2 text-base leading-7 text-neutral-600">Revise los documentos de su pre-registro. Su recepción no implica que hayan sido validados.</p>
                <ul className="mt-6 space-y-4">
                  {consultaTramiteDemo.documentos.map((documento, index) => (
                    <li className="overflow-hidden rounded-xl border border-neutral-200" key={documento}>
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                        <div className="flex min-w-0 items-start gap-3">
                          <FileText aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary" />
                          <div><h3 className="text-base font-bold leading-6 text-neutral-900">{documento}</h3><p className="mt-1 text-sm text-neutral-600">PDF de ejemplo · Pendiente de revisión</p></div>
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-3">
                          <button aria-expanded={previewDocument === index} aria-controls={`consulta-documento-${index}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-primary-light focus:outline-none focus:ring-4 focus:ring-primary-light" onClick={() => setPreviewDocument((current) => current === index ? null : index)} type="button"><Eye aria-hidden="true" className="h-4 w-4" />{previewDocument === index ? 'Ocultar documento' : 'Ver documento'}</button>
                          <a aria-label={`Descargar ejemplo de ${documento}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-bold text-neutral-800 hover:bg-neutral-50" href="/EJEMPLO.pdf" download="Documento-de-ejemplo.pdf"><Download aria-hidden="true" className="h-4 w-4" />Descargar</a>
                        </div>
                      </div>
                      {previewDocument === index && <div className="requirements-fade-in border-t border-neutral-200 bg-neutral-50" id={`consulta-documento-${index}`}>
                        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"><p className="text-sm text-neutral-600">Muestra referencial: EJEMPLO.pdf</p><a className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary underline" href="/EJEMPLO.pdf" target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" className="h-4 w-4" />Abrir PDF</a></div>
                        <object aria-label={`Vista previa de ${documento}`} className="block h-[450px] w-full bg-white sm:h-[600px]" data="/EJEMPLO.pdf#view=FitH" type="application/pdf"><p className="p-6 text-center text-neutral-600">Puede visualizar el documento mediante el enlace “Abrir PDF”.</p></object>
                      </div>}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {searchResult === 'not-found' && (
            <section className="wizard-panel-in mx-auto mt-8 max-w-2xl rounded-2xl border border-neutral-200 bg-white p-7 text-center shadow-md sm:p-10">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-100 text-neutral-600">
                <Search aria-hidden="true" className="h-8 w-8" />
              </span>
              <h2 className="mt-6 text-2xl font-extrabold text-neutral-900">
                No se encontraron trámites con este DNI
              </h2>
              <p className="mt-3 leading-7 text-neutral-600">
                Revise el número ingresado o registre una nueva solicitud.
              </p>
              <Link
                className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-bold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                to="/pre-registro"
              >
                Iniciar pre-registro
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default ConsultaEstadoPage
