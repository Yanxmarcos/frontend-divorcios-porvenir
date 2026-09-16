import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, Plus, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/layout/AdminHeader.jsx'
import AdminSidebar from '../../components/layout/AdminSidebar.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { expedientes } from '../../mock/expedientes.js'

const states = [
  'Todos',
  'Pre-registrado',
  'En revisión',
  'En Audiencia',
  'Concluido',
]

const pageSize = 4

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function ExpedientesPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [notice, setNotice] = useState('')
  const navigate = useNavigate()

  const filteredCases = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())

    return expedientes.filter((caseItem) => {
      const matchesStatus =
        statusFilter === 'Todos' || caseItem.status === statusFilter
      const searchableText = normalizeText(
        `${caseItem.number} ${caseItem.applicants} ${caseItem.dni}`,
      )
      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [query, statusFilter])

  const pageCount = Math.max(Math.ceil(filteredCases.length / pageSize), 1)
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const visibleCases = filteredCases.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  )
  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1)

  const openCase = (caseId) => {
    navigate(`/admin/expedientes/${caseId}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Expedientes" />

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                  Expedientes
                </h2>
                <p className="mt-2 text-neutral-600">
                  Gestione y consulte las solicitudes registradas.
                </p>
              </div>
              <button
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary-light"
                onClick={() => setNotice('El nuevo expediente se habilitará desde el módulo de registro.')}
                type="button"
              >
                <Plus aria-hidden="true" className="h-5 w-5" />
                Nuevo expediente
              </button>
            </div>

            {notice && (
              <p
                className="mt-5 rounded-xl border border-primary-light bg-primary-light/60 p-4 text-sm font-semibold text-primary-dark"
                role="status"
              >
                {notice}
              </p>
            )}

            <section
              aria-label="Filtros de expedientes"
              className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="case-search">
                    Buscar expediente
                  </label>
                  <div className="relative">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light"
                      id="case-search"
                      onChange={(event) => {
                        setQuery(event.target.value)
                        setCurrentPage(1)
                      }}
                      placeholder="DNI, apellidos o N° expediente"
                      type="search"
                      value={query}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="status-filter">
                    Estado
                  </label>
                  <select
                    className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-light"
                    id="status-filter"
                    onChange={(event) => {
                      setStatusFilter(event.target.value)
                      setCurrentPage(1)
                    }}
                    value={statusFilter}
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-5 sm:px-8">
                <div>
                  <h3 className="text-lg font-extrabold text-neutral-900">Listado general</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {filteredCases.length} expediente{filteredCases.length === 1 ? '' : 's'} encontrado
                    {filteredCases.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead className="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    <tr>
                      <th className="px-6 py-4 sm:px-8">N° Exp.</th>
                      <th className="px-6 py-4">Solicitantes</th>
                      <th className="px-6 py-4">DNI</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Fecha ingreso</th>
                      <th className="px-6 py-4 text-right sm:px-8">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {visibleCases.map((caseItem) => (
                      <tr
                        aria-label={`Abrir expediente ${caseItem.number}`}
                        className="cursor-pointer transition-colors hover:bg-primary-light/30 focus:bg-primary-light/30 focus:outline-none"
                        key={caseItem.id}
                        onClick={() => openCase(caseItem.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            openCase(caseItem.id)
                          }
                        }}
                        tabIndex="0"
                      >
                        <td className="px-6 py-5 font-heading text-sm font-extrabold text-primary sm:px-8">
                          {caseItem.number}
                        </td>
                        <td className="px-6 py-5 text-sm font-semibold text-neutral-800">
                          {caseItem.applicants}
                        </td>
                        <td className="px-6 py-5 text-sm text-neutral-600">{caseItem.dni}</td>
                        <td className="px-6 py-5">
                          <Badge variant={caseItem.variant}>{caseItem.status}</Badge>
                        </td>
                        <td className="px-6 py-5 text-sm text-neutral-600">{caseItem.entryDate}</td>
                        <td className="px-6 py-5 text-right sm:px-8">
                          <Link
                            aria-label={`Ver detalle de ${caseItem.number}`}
                            className="inline-grid h-10 w-10 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-primary hover:bg-primary-light hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary-light"
                            onClick={(event) => event.stopPropagation()}
                            to={`/admin/expedientes/${caseItem.id}`}
                          >
                            <Eye aria-hidden="true" className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {visibleCases.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <Search aria-hidden="true" className="mx-auto h-9 w-9 text-neutral-400" />
                  <p className="mt-4 font-bold text-neutral-800">No se encontraron expedientes</p>
                  <p className="mt-1 text-sm text-neutral-600">Pruebe con otros términos o filtros.</p>
                </div>
              )}

              <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-sm text-neutral-600">
                  Página <strong className="text-neutral-900">{safeCurrentPage}</strong> de {pageCount}
                </p>
                <nav aria-label="Paginación de expedientes" className="flex flex-wrap items-center gap-2">
                  <button
                    aria-label="Página anterior"
                    className="grid h-10 w-10 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    type="button"
                  >
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                  </button>
                  {pageNumbers.map((pageNumber) => (
                    <button
                      aria-current={pageNumber === safeCurrentPage ? 'page' : undefined}
                      className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-bold transition ${
                        pageNumber === safeCurrentPage
                          ? 'border-primary bg-primary text-white'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary'
                      }`}
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-bold text-neutral-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={safeCurrentPage === pageCount}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(page + 1, pageCount))
                    }
                    type="button"
                  >
                    Siguiente
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ExpedientesPage
