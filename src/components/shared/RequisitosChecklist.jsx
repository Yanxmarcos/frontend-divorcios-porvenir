import { CheckCircle2, Circle } from 'lucide-react'

export default function RequisitosChecklist({ requirements, documents = [] }) {
  return <ul className="requirements-checklist">{requirements.map((requirement) => { const complete = documents.some((document) => document.requirementCode === requirement.code); return <li key={requirement.code}>{complete ? <CheckCircle2 /> : <Circle />}<span><strong>{requirement.title}</strong><small>{complete ? 'Archivo cargado' : 'Pendiente'}</small></span></li> })}</ul>
}
