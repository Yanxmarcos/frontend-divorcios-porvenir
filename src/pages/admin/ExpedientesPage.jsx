import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, Plus, Search } from 'lucide-react'
import { useDemo } from '../../context/DemoContext'
import { STATUS_META } from '../../domain/catalogs'
import StatusBadge from '../../components/shared/StatusBadge'

export default function ExpedientesPage() {
  const { cases } = useDemo()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const status = params.get('status') || ''
  const filtered = useMemo(() => cases.filter((item) => {
    const haystack = [item.trackingCode, ...item.officialReferences.map((r) => r.number), ...item.spouses.flatMap((p) => [p.names, p.documentNumber])].join(' ').toLowerCase()
    const statusMatch = !status || (status === 'revision' ? ['SUBMITTED', 'PRECHECK', 'LEGAL_REVIEW', 'DU_REVIEW'].includes(item.status) : item.status === status)
    return haystack.includes(query.toLowerCase()) && statusMatch
  }), [cases, query, status])
  const changeStatus = (event) => {
    const next = new URLSearchParams(params)
    if (event.target.value) next.set('status', event.target.value)
    else next.delete('status')
    setParams(next)
  }
  return <div className="page-stack">
    <div className="page-actions"><p className="muted">{filtered.length} de {cases.length} expedientes</p><Link to="/pre-registro" className="btn btn-primary"><Plus /> Registrar expediente</Link></div>
    <section className="panel">
      <div className="filters"><label className="search-field"><Search /><span className="sr-only">Buscar</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Código, número, DNI o nombre" /></label><label className="select-field"><Filter /><span className="sr-only">Filtrar por estado</span><select value={status} onChange={changeStatus}><option value="">Todos los estados</option><option value="revision">Pendientes de revisión</option>{Object.entries(STATUS_META).map(([value, meta]) => <option key={value} value={value}>{meta.label}</option>)}</select></label></div>
      <div className="table-wrap"><table><thead><tr><th>Código interno</th><th>Número municipal</th><th>Solicitantes</th><th>Etapa</th><th>Estado</th><th>Responsable</th><th /></tr></thead><tbody>
        {filtered.map((item) => <tr key={item.id}><td><strong>{item.trackingCode}</strong><small>Rev. {item.revision}</small></td><td>{item.officialReferences.find((r) => r.stage === item.stage)?.number || 'Pendiente'}</td><td>{item.spouses.map((p) => <span className="person-line" key={p.id}>{p.names.replace('Persona Demo ', '')}<small>DNI {p.documentNumber}</small></span>)}</td><td><span className="stage-label">{item.stage}</span></td><td><StatusBadge status={item.status} /></td><td>{item.assignedTo}</td><td><Link className="btn btn-secondary btn-small" to={'/admin/expedientes/' + item.id}>Revisar</Link></td></tr>)}
        {filtered.length === 0 && <tr><td colSpan="7"><div className="empty-table">No se encontraron expedientes con esos criterios.</div></td></tr>}
      </tbody></table></div>
    </section>
  </div>
}
