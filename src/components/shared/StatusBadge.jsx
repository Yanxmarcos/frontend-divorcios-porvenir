import { STATUS_META } from '../../domain/catalogs'

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] || { label: status, tone: 'neutral' }
  return <span className={`status-badge status-${meta.tone}`}><i aria-hidden="true" />{meta.label}</span>
}
