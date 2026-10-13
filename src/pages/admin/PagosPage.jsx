import { Link } from 'react-router-dom'
import { CircleDollarSign } from 'lucide-react'
import { useDemo } from '../../context/DemoContext'
import { formatMoney } from '../../domain/catalogs'

export default function PagosPage() {
  const demo = useDemo(); const rows = demo.cases.flatMap((item) => item.payments.map((p) => ({ ...p, case: item })))
  return <section className="panel"><div className="panel-heading"><div><p className="eyebrow">Validación local</p><h2>Comprobantes de pago</h2></div><span className="counter">{rows.filter((p) => p.status === 'PENDING').length} pendientes</span></div><div className="table-wrap"><table><thead><tr><th>Recibo</th><th>Expediente</th><th>Fecha</th><th>Importe</th><th>Asignación</th><th>Estado</th><th /></tr></thead><tbody>{rows.map((p) => <tr key={p.id}><td><strong>{p.receiptNumber}</strong></td><td><Link className="table-link" to={'/admin/expedientes/' + p.case.id}>{p.case.trackingCode}</Link></td><td>{p.paidOn}</td><td>{formatMoney(p.totalMinor)}</td><td>SC {formatMoney(p.allocatedSC)}<br />DU {formatMoney(p.allocatedDU)}</td><td>{p.status}</td><td>{p.status === 'PENDING' ? <div className="row-actions"><button onClick={() => demo.reviewPayment(p.case.id, p.id, 'APPROVED')}>Validar</button><button onClick={() => demo.reviewPayment(p.case.id, p.id, 'OBSERVED')}>Observar</button></div> : <Link to={'/admin/expedientes/' + p.case.id}>Ver caso</Link>}</td></tr>)}{!rows.length && <tr><td colSpan="7"><div className="empty-table"><CircleDollarSign /> No hay comprobantes registrados.</div></td></tr>}</tbody></table></div></section>
}
