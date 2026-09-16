const variants = {
  danger: 'bg-primary-light text-primary-dark ring-red-200',
  info: 'bg-blue-100 text-blue-800 ring-blue-200',
  neutral: 'bg-neutral-100 text-neutral-800 ring-neutral-200',
  success: 'bg-green-100 text-leaf ring-green-200',
  warning: 'bg-accent-light text-amber-800 ring-amber-200',
}

function Badge({ children, variant = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset ${variants[variant] ?? variants.neutral}`}
    >
      {children}
    </span>
  )
}

export default Badge
