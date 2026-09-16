function ProgressBar({ current, label = 'Paso', total }) {
  const safeTotal = Math.max(total, 1)
  const percentage = Math.min(Math.max((current / safeTotal) * 100, 0), 100)

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
        <span className="text-neutral-800">
          {label} {current} de {total}
        </span>
        <span className="text-primary">{Math.round(percentage)}%</span>
      </div>
      <div
        aria-label={`Progreso: ${label.toLowerCase()} ${current} de ${total}`}
        aria-valuemax={total}
        aria-valuemin="1"
        aria-valuenow={current}
        className="h-2.5 overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
