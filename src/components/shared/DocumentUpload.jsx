import { Check, FileUp } from 'lucide-react'

export default function DocumentUpload({ label, file, onChange, accept = '.pdf,.jpg,.jpeg,.png', maxBytes = 10 * 1024 * 1024 }) {
  const choose = (event) => {
    const selected = event.target.files?.[0]
    if (!selected) return
    onChange(selected.size <= maxBytes ? selected : null, selected.size <= maxBytes ? '' : 'El archivo supera el límite permitido.')
  }
  return <label className={file ? 'document-upload uploaded' : 'document-upload'}><span>{file ? <Check /> : <FileUp />}</span><span><strong>{label}</strong><small>{file?.name || 'Seleccionar archivo'}</small></span><input className="sr-only" type="file" accept={accept} onChange={choose} /></label>
}
