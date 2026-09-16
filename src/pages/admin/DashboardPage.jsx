import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FolderOpen,
  Search,
  Video,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminHeader from '../../components/layout/AdminHeader.jsx'
import AdminSidebar from '../../components/layout/AdminSidebar.jsx'
import Badge from '../../components/ui/Badge.jsx'

const statistics = [
  {
    label: 'Expedientes activos',
    value: 47,
    badge: 'Activos',
    variant: 'danger',
    icon: FolderOpen,
    iconStyle: 'bg-primary-light text-primary',
  },
  {
    label: 'En revisión',
    value: 12,
    badge: 'Pendientes',
    variant: 'warning',
    icon: Search,
    iconStyle: 'bg-accent-light text-accent',
  },
  {
    label: 'Audiencias programadas',
    value: 8,
    badge: 'Agendadas',
    variant: 'success',
    icon: CalendarDays,
    iconStyle: 'bg-green-100 text-leaf',
  },
  {
    label: 'Concluidos este mes',
    value: 23,
    badge: 'Finalizados',
    variant: 'info',
    icon: CheckCircle2,
    iconStyle: 'bg-blue-100 text-blue-700',
  },
]

const monthlyData = [
  { month: 'Ene', value: 18 },
  { month: 'Feb', value: 26 },
  { month: 'Mar', value: 22 },
  { month: 'Abr', value: 34 },
  { month: 'May', value: 29 },
  { month: 'Jun', value: 38 },
]

const recentCases = [
  {
    number: 'EXP2026-00147',
    applicants: 'Ana Torres / Luis Mendoza',
    status: 'En revisión',
    variant: 'warning',
    date: '09/09/2026',
  },
  {
    number: 'EXP2026-00146',
    applicants: 'Rosa Salazar / Marco Ruiz',
    status: 'Pre-registrado',
    variant: 'danger',
    date: '08/09/2026',
  },
  {
    number: 'EXP2026-00145',
    applicants: 'Julia Castro / Pedro León',
    status: 'En Audiencia',
    variant: 'warning',
    date: '08/09/2026',
  },
  {
    number: 'EXP2026-00144',
    applicants: 'Carla Vega / Diego Ramos',
    status: 'Concluido',
    variant: 'success',
    date: '07/09/2026',
  },
  {
    number: 'EXP2026-00143',
    applicants: 'María Rojas / José Flores',
    status: 'Observado',
    variant: 'danger',
    date: '06/09/2026',
  },
]

const upcomingHearings = [
  {
    date: '10 Sep 2026',
    time: '09:00 AM',
    names: 'Ana Torres y Luis Mendoza',
    modality: 'Presencial',
    tomorrow: true,
  },
  {
    date: '12 Sep 2026',
    time: '10:30 AM',
    names: 'Julia Castro y Pedro León',
    modality: 'Virtual',
    tomorrow: false,
  },
  {
    date: '15 Sep 2026',
    time: '03:00 PM',
    names: 'Rosa Salazar y Marco Ruiz',
    modality: 'Presencial',
    tomorrow: false,
  },
]

function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader title="Resumen general" />

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
                Buenos días, Dra. María
              </h2>
              <p className="mt-2 text-neutral-600">
                Este es el estado actual de los trámites de divorcio municipal.
              </p>
            </div>

            <section aria-label="Estadísticas principales" className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {statistics.map(({ badge, icon: Icon, iconStyle, label, value, variant }) => (
                <article
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  key={label}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${iconStyle}`}>
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <Badge variant={variant}>{badge}</Badge>
                  </div>
                  <p className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-neutral-900">
                    {value}
                  </p>
                  <h3 className="mt-2 text-sm font-bold leading-5 text-neutral-600">{label}</h3>
                </article>
              ))}
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900">Expedientes por mes</h2>
                  <p className="mt-1 text-sm text-neutral-600">Solicitudes registradas durante 2026</p>
                </div>

                <div
                  aria-label="Gráfico de expedientes mensuales"
                  className="relative mt-8 h-72 border-b border-l border-neutral-200 pl-4"
                  role="img"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex h-full flex-col justify-between pb-8">
                    {[40, 30, 20, 10].map((value) => (
                      <div className="flex items-center gap-2" key={value}>
                        <span className="w-6 text-right text-[10px] font-semibold text-neutral-400">{value}</span>
                        <span className="h-px flex-1 bg-neutral-100" />
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 flex h-full items-end justify-around gap-3 px-4 pt-5 sm:gap-6 sm:px-8">
                    {monthlyData.map(({ month, value }) => (
                      <div className="flex h-full flex-1 flex-col items-center justify-end" key={month}>
                        <span className="mb-2 text-xs font-bold text-neutral-600">{value}</span>
                        <div className="flex h-[calc(100%-3.5rem)] w-full items-end justify-center">
                          <div
                            aria-label={`${month}: ${value} expedientes`}
                            className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-primary-dark to-primary shadow-sm transition-all duration-500 hover:brightness-110"
                            style={{ height: `${(value / 40) * 100}%` }}
                          />
                        </div>
                        <span className="mt-3 text-xs font-bold text-neutral-600 sm:text-sm">{month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-neutral-900">Próximas audiencias</h2>
                    <p className="mt-1 text-sm text-neutral-600">Agenda programada</p>
                  </div>
                  <CalendarDays aria-hidden="true" className="h-6 w-6 text-primary" />
                </div>

                <div className="mt-6 space-y-4">
                  {upcomingHearings.map((hearing) => {
                    const ModalityIcon = hearing.modality === 'Virtual' ? Video : Building2

                    return (
                      <article
                        className={`rounded-xl border p-4 ${
                          hearing.tomorrow
                            ? 'border-accent/40 bg-accent-light/60'
                            : 'border-neutral-200 bg-neutral-50'
                        }`}
                        key={`${hearing.date}-${hearing.time}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                            <CalendarDays aria-hidden="true" className="h-4 w-4 text-primary" />
                            {hearing.date}
                          </div>
                          {hearing.tomorrow && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-white">
                              <AlertTriangle aria-hidden="true" className="h-3.5 w-3.5" />
                              Mañana
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-sm font-bold leading-5 text-neutral-800">{hearing.names}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-neutral-600">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 aria-hidden="true" className="h-4 w-4" />
                            {hearing.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <ModalityIcon aria-hidden="true" className="h-4 w-4" />
                            {hearing.modality}
                          </span>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            </div>

            <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <h2 className="text-xl font-extrabold text-neutral-900">Últimos expedientes</h2>
                  <p className="mt-1 text-sm text-neutral-600">Solicitudes actualizadas recientemente</p>
                </div>
                <Link
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-dark"
                  to="/admin/expedientes"
                >
                  Ver todos
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead className="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    <tr>
                      <th className="px-6 py-4 sm:px-8">N° Expediente</th>
                      <th className="px-6 py-4">Solicitantes</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Fecha</th>
                      <th className="px-6 py-4 text-right sm:px-8">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {recentCases.map((caseItem) => (
                      <tr className="transition-colors hover:bg-neutral-50" key={caseItem.number}>
                        <td className="px-6 py-4 font-heading text-sm font-extrabold text-primary sm:px-8">
                          {caseItem.number}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-neutral-800">
                          {caseItem.applicants}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={caseItem.variant}>{caseItem.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">{caseItem.date}</td>
                        <td className="px-6 py-4 text-right sm:px-8">
                          <Link
                            aria-label={`Ver ${caseItem.number}`}
                            className="inline-grid h-10 w-10 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:border-primary hover:bg-primary-light hover:text-primary"
                            to="/admin/expedientes"
                          >
                            <Eye aria-hidden="true" className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
