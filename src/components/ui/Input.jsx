export default function Input({ label, error, help, id, ...props }) {
  const inputId = id || props.name
  const describedBy = [help && inputId + '-help', error && inputId + '-error'].filter(Boolean).join(' ') || undefined
  return <label className="field" htmlFor={inputId}><span>{label}</span><input id={inputId} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />{help && <small id={inputId + '-help'}>{help}</small>}{error && <small id={inputId + '-error'} role="alert">{error}</small>}</label>
}
