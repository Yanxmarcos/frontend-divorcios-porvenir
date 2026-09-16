import { Check } from 'lucide-react'

function Stepper({ currentStep, steps }) {
  return (
    <ol aria-label="Pasos del prerregistro" className="flex w-full items-start">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCurrent = stepNumber === currentStep
        const isComplete = stepNumber < currentStep

        return (
          <li className="relative flex min-w-0 flex-1 flex-col items-center" key={step}>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-5 h-0.5 w-full transition-colors ${
                  isComplete ? 'bg-primary' : 'bg-neutral-200'
                }`}
              />
            )}
            <span
              aria-current={isCurrent ? 'step' : undefined}
              className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold transition-all sm:h-11 sm:w-11 ${
                isCurrent
                  ? 'border-primary bg-primary text-white shadow-md shadow-primary/25 ring-4 ring-primary-light'
                  : isComplete
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-neutral-200 bg-white text-neutral-400'
              }`}
            >
              {isComplete ? <Check aria-hidden="true" className="h-5 w-5" /> : stepNumber}
            </span>
            <span
              className={`mt-3 hidden max-w-32 text-center text-xs font-semibold leading-4 md:block ${
                isCurrent ? 'text-primary' : 'text-neutral-600'
              }`}
            >
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export default Stepper
