export default function Button({ variant = 'primary', size = '', className = '', type = 'button', ...props }) {
  return <button type={type} className={['btn', 'btn-' + variant, size && 'btn-' + size, className].filter(Boolean).join(' ')} {...props} />
}
