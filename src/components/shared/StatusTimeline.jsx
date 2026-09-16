import { ArrowRight, Check, Circle } from 'lucide-react'

const statusStyles = {
  complete: {
    container: 'bg-green-100 text-leaf ring-green-200',
    line: 'bg-green-200',
    Icon: Check,
  },
  current: {
    container: 'bg-accent-light text-accent ring-amber-200',
    line: 'bg-neutral-200',
    Icon: ArrowRight,
  },
  pending: {
    container: 'bg-white text-neutral-400 ring-neutral-200',
    line: 'bg-neutral-200',
    Icon: Circle,
  },
}

function StatusTimeline({ items }) {
  return (
    <ol aria-label="Historial del expediente" className="space-y-0">
      {items.map((item, index) => {
        const style = statusStyles[item.status] ?? statusStyles.pending
        const Icon = style.Icon
        const isLast = index === items.length - 1

        return (
          <li
            aria-current={item.status === 'current' ? 'step' : undefined}
            className="relative flex gap-4 pb-7 last:pb-0"
            key={`${item.date}-${item.description}`}
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${style.line}`}
              />
            )}
            <span
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 ring-inset ${style.container}`}
            >
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0 pt-0.5">
              <p
                className={`text-sm font-bold ${
                  item.status === 'pending' ? 'text-neutral-600' : 'text-neutral-900'
                }`}
              >
                {item.date}
              </p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                {item.description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default StatusTimeline
