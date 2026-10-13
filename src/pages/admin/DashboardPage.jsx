import { CalendarClock, CircleAlert, FileCheck2, FolderKanban, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'
import StatusBadge from '../../components/shared/StatusBadge'

export default function DashboardPage() {
  const { cases, ready } = useDemo()
  if (!ready) return <div className="panel loading">Cargando información…</div>
  const cards = [
    { label: 'Pendientes de revisión', value: cases.filter((c) => ['SUBMITTED', 'PRECHECK', 'LEGAL_REVIEW', 'DU_REVIEW'].includes(c.status)).length, icon: FolderKanban, query: 'revision' },
    { label: 'Con observaciones', value: cases.filter((c) => c.status === 'OBSERVED').length, icon: CircleAlert, query: 'OBSERVED' },
    { label: 'Audiencias próximas', value: cases.flatMap((c) => c.hearings.filter((h) => h.status === 'SCHEDULED')).length, icon: CalendarClock, path: '/admin/audiencias' },
    { label: 'DU disponibles', value: cases.filter((c) => c.status === 'DU_AVAILABLE').length, icon: FileCheck2, query: 'DU_AVAILABLE' },
  ]
  const pending = cases.filter((c) => !['DIVORCED', 'CLOSED'].includes(c.status)).slice(0, 6)
  const hearings = cases.flatMap((c) => c.hearings.map((h) => ({ ...h, case: c }))).filter((h) => h.status === 'SCHEDULED').sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  return <div className="page-stack"><div className="metric-grid">{cards.map(({ label, value, icon: Icon, query, path }) => <Link key={label} className="metric-card" to={path || `/admin/expedientes?status=${query}`}><span><Icon /></span><div><strong>{value}</strong><p>{label}</p></div><ArrowRight /></Link>)}</div><div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Cola de trabajo</p><h2>Expedientes que requieren atención</h2></div><Link to="/admin/expedientes">Ver bandeja</Link></div><div className="table-wrap"><table><thead><tr><th>Expediente</th><th>Solicitantes</th><th>Etapa</th><th>Estado</th><th>Ingreso</th></tr></thead><tbody>{pending.map((item) => <tr key={item.id}><td><Link className="table-link" to={`/admin/expedientes/${item.id}`}>{item.trackingCode}</Link></td><td>{item.spouses.map((p) => p.names.replace('Persona Demo ', '')).join(' / ')}</td><td>{item.stage}</td><td><StatusBadge status={item.status} /></td><td>{item.submittedAt}</td></tr>)}</tbody></table></div></section><aside className="panel"><div className="panel-heading"><div><p className="eyebrow">Agenda</p><h2>Próximas audiencias</h2></div><Link to="/admin/audiencias">Abrir agenda</Link></div>{hearings.length ? <div className="agenda-list">{hearings.map((h) => <Link to={`/admin/expedientes/${h.case.id}`} key={h.id}><time>{new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(h.startsAt))}</time><strong>{h.case.spouses.map((p) => p.names.replace('Persona Demo ', '')).join(' y ')}</strong><span>{h.location}</span></Link>)}</div> : <p className="empty-inline">No hay audiencias próximas.</p>}</aside></div></div>
}
