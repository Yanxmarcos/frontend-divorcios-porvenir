import { useMemo, useState } from 'react'
import { Download, FileBarChart2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDemo } from '../../context/DemoContext'

const safeCsv = (value) => {
  const text = String(value ?? '')
  const protectedText = /^[=+\-@]/.test(text) ? "'" + text : text
  return '"' + protectedText.replaceAll('"', '""') + '"'
}

export default function ReportesPage() {
  const { cases } = useDemo(); const [month, setMonth] = useState('2026-10'); const [type, setType] = useState('')
  const rows = useMemo(() => cases.flatMap((item) => item.resolutions.filter((r) => r.status === 'ISSUED').map((r) => ({ ...r, case: item, reference: item.officialReferences.find((ref) => ref.stage === r.type)?.number || 'Pendiente' }))).filter((row) => row.issuedOn.startsWith(month) && (!type || row.type === type)), [cases, month, type])
  const download = () => {
    const columns = [['Tipo', 'Resolución', 'Fecha emisión', 'Fecha notificación', 'Expediente', 'Solicitantes'], ...rows.map((r) => [r.type, r.number, r.issuedOn, r.notifiedOn, r.reference, r.case.spouses.map((p) => p.names).join(' y ')])]
    const csv = '\ufeff' + columns.map((row) => row.map(safeCsv).join(';')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'resoluciones-' + month + (type ? '-' + type : '') + '.csv'; anchor.click(); URL.revokeObjectURL(url)
  }
  return <div className="page-stack"><section className="report-hero"><div><p className="eyebrow">Reporte solicitado por el área legal</p><h2>Resoluciones emitidas</h2><p>El conteo usa la fecha de emisión. Los borradores quedan excluidos y la notificación se conserva como fecha separada.</p></div><div className="report-total"><FileBarChart2 /><strong>{rows.length}</strong><span>resoluciones</span></div></section><section className="panel"><div className="filters"><label>Periodo<input type="month" value={month} onChange={(e) => setMonth(e.target.value)} /></label><label>Tipo<select value={type} onChange={(e) => setType(e.target.value)}><option value="">SC y DU</option><option value="SC">Separación convencional</option><option value="DU">Divorcio ulterior</option></select></label><button className="btn btn-primary" disabled={!rows.length} onClick={download}><Download /> Exportar CSV</button></div><div className="table-wrap"><table><thead><tr><th>Tipo</th><th>Resolución</th><th>Emisión</th><th>Notificación</th><th>Expediente de etapa</th><th>Solicitantes</th></tr></thead><tbody>{rows.map((r) => <tr key={r.id}><td><span className="stage-label">{r.type}</span></td><td><strong>{r.number}</strong></td><td>{r.issuedOn}</td><td>{r.notifiedOn || 'Pendiente'}</td><td>{r.reference}</td><td><Link className="table-link" to={'/admin/expedientes/' + r.case.id}>{r.case.spouses.map((p) => p.names.replace('Persona Demo ', '')).join(' / ')}</Link></td></tr>)}{!rows.length && <tr><td colSpan="6"><div className="empty-table">No hay resoluciones emitidas para este filtro.</div></td></tr>}</tbody></table></div></section></div>
}
