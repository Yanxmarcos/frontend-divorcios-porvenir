import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardPenLine,
  Clock3,
  FileCheck,
  FileSearch,
  FileText,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react'
import PublicFooter from '../../components/layout/PublicFooter'
import PublicNavbar from '../../components/layout/PublicNavbar'

const processSteps = [
  {
    number: '01',
    title: 'Pre-registro en línea',
    description: 'Suba sus documentos desde casa',
    icon: Upload,
  },
  {
    number: '02',
    title: 'Audiencia de ratificación',
    description: 'En un plazo de 15 días',
    icon: Users,
  },
  {
    number: '03',
    title: 'Resolución final',
    description: 'En 3 meses obtiene la disolución',
    icon: FileCheck,
  },
]

const questions = [
  {
    key: 'hijos',
    label: '¿Cuántos hijos tienen?',
    options: [
      { label: '0', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3 o más', value: 3 },
    ],
  },
  {
    key: 'bienes',
    label: '¿Tienen bienes en común?',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
  {
    key: 'exterior',
    label: '¿Uno de los cónyuges está fuera del país?',
    options: [
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' },
    ],
  },
]

const baseRequirements = [
  'Solicitud de separación convencional',
  'Copia del DNI de ambos cónyuges',
  'Acta de matrimonio',
  'Declaración jurada del último domicilio conyugal',
]

const essentialRequirements = [
  'Mínimo 2 años de casados',
  'Matrimonio realizado en El Porvenir o último domicilio conyugal en el distrito',
  'Ambos cónyuges de acuerdo con el divorcio',
]

const quickAccesses = [
  {
    title: 'Iniciar pre-registro',
    description: 'Registre su solicitud y cargue sus documentos.',
    href: '/pre-registro',
    icon: ClipboardPenLine,
  },
  {
    title: 'Consulta de expediente',
    description: 'Revise el estado de su trámite con su DNI.',
    href: '/consulta-estado',
    icon: FileSearch,
  },
  {
    title: 'Requisitos del trámite',
    description: 'Conozca los documentos según su situación.',
    href: '#requisitos',
    icon: FileText,
  },
  {
    title: 'Transparencia',
    description: 'Acceda al portal institucional municipal.',
    href: 'https://muniporvenir.gob.pe/',
    icon: ShieldCheck,
  },
]

function LandingPage() {
  const [answers, setAnswers] = useState({
    hijos: null,
    bienes: null,
    exterior: null,
  })
  const [showRequirements, setShowRequirements] = useState(false)

  const formIsComplete = Object.values(answers).every(
    (answer) => answer !== null,
  )

  const requirements = [...baseRequirements]

  if (answers.bienes === 'no') {
    requirements.push('Declaración jurada de no tener bienes')
  }

  if (answers.hijos > 0) {
    requirements.push(
      'Acta de nacimiento de cada hijo',
      'Acta de conciliación sobre alimentos, tenencia y régimen de visitas, o sentencia judicial',
    )
  }

  if (answers.bienes === 'si') {
    requirements.push('Acuerdo notarial de separación de bienes')
  }

  if (answers.exterior === 'si') {
    requirements.push('Poder especial para apoderado')
  }

  const selectAnswer = (question, value) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question]: value,
    }))
    setShowRequirements(false)
  }

  const handleRequirementsSubmit = (event) => {
    event.preventDefault()
    if (formIsComplete) setShowRequirements(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <main>
        <section className="border-b border-neutral-200 bg-neutral-50" id="tramite">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[1.35fr_0.65fr] lg:px-12 lg:py-20">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Divorcio Municipal de Mutuo Acuerdo
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                Inicie su solicitud de separación convencional y divorcio ulterior
                desde casa. Un proceso orientado por la Municipalidad Distrital
                de El Porvenir.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                  href="/pre-registro"
                >
                  Iniciar mi trámite
                  <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 text-base font-bold text-primary transition-colors hover:bg-primary-light focus:outline-none focus:ring-4 focus:ring-primary-light"
                  href="/consulta-estado"
                >
                  <Search aria-hidden="true" className="h-5 w-5" />
                  Consultar estado
                </a>
              </div>
            </div>

            <aside className="border-t-4 border-accent bg-primary p-7 text-white shadow-md sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5">
                  <img alt="Escudo municipal" className="h-full w-full object-contain" src="/logo.svg" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-primary-light">Oficina de Divorcios</p>
                  <p className="mt-1 font-heading text-lg font-extrabold">Atención y orientación</p>
                </div>
              </div>
              <p className="mt-7 text-base leading-7 text-white/85">
                El trámite puede concluir en aproximadamente 3 meses cuando se
                cumplen los requisitos y existe acuerdo entre ambos cónyuges.
              </p>
              <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white underline decoration-primary-light underline-offset-4 hover:text-primary-light" href="#requisitos">
                Revisar requisitos indispensables <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-white py-10" id="accesos">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary">Servicios digitales</p>
                <h2 className="mt-1 text-2xl font-extrabold text-neutral-900">Accesos rápidos</h2>
              </div>
              <a className="text-sm font-bold text-primary hover:text-primary-dark" href="https://muniporvenir.gob.pe/">Ir al portal municipal →</a>
            </div>
            <div className="mt-6 grid border-l border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
              {quickAccesses.map(({ title, description, href, icon: Icon }) => (
                <a className="group border-b border-r border-neutral-200 bg-white p-5 transition-colors hover:bg-primary-light focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary-light" href={href} key={title}>
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-neutral-100 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-base font-extrabold text-neutral-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Un proceso sencillo
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Cómo funciona?
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Complete su solicitud digital y avance con acompañamiento municipal
              en cada etapa.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {processSteps.map(
              ({ icon: Icon, number, title, description }) => (
                <article
                  className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-light hover:shadow-md"
                  key={number}
                >
                  <span className="absolute right-5 top-3 font-heading text-6xl font-extrabold text-neutral-100 transition-colors group-hover:text-primary-light">
                    {number}
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-md shadow-primary/20">
                    <Icon aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-7 text-xl font-bold text-neutral-900">
                    {title}
                  </h3>
                  <p className="relative mt-3 leading-7 text-neutral-600">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20 lg:py-24" id="requisitos">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Lista personalizada
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              ¿Qué documentos necesita?
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Responda estas tres preguntas para conocer los documentos que
              corresponden a su situación.
            </p>
          </div>

          <form
            className="mt-12 rounded-2xl border border-neutral-200 bg-white p-5 shadow-md sm:p-8 lg:p-10"
            onSubmit={handleRequirementsSubmit}
          >
            <div className="grid gap-5 lg:grid-cols-3">
              {questions.map((question, questionIndex) => (
                <fieldset
                  className="rounded-xl border border-neutral-200 p-5 transition-colors hover:border-neutral-400"
                  key={question.key}
                >
                  <legend className="px-1 text-base font-bold leading-6 text-neutral-900">
                    <span className="mr-2 text-primary">{questionIndex + 1}.</span>
                    {question.label}
                  </legend>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {question.options.map((option) => {
                      const isSelected = answers[question.key] === option.value

                      return (
                        <button
                          aria-pressed={isSelected}
                          className={`min-h-11 rounded-lg border px-3 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-light ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-sm'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:bg-primary-light hover:text-primary-dark'
                          }`}
                          key={option.label}
                          onClick={() =>
                            selectAnswer(question.key, option.value)
                          }
                          type="button"
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-bold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:shadow-none disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary-light"
                disabled={!formIsComplete}
                type="submit"
              >
                Ver requisitos
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
              {!formIsComplete && (
                <p className="mt-3 text-center text-sm text-neutral-600">
                  Seleccione una opción en cada pregunta para continuar.
                </p>
              )}
            </div>
          </form>

          <div aria-live="polite">
            {showRequirements && (
              <div className="requirements-fade-in mt-8 overflow-hidden rounded-2xl border border-primary-light bg-white shadow-md">
                <div className="bg-primary px-6 py-5 text-white sm:px-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
                    <div>
                      <h3 className="text-xl font-bold">Sus requisitos</h3>
                      <p className="mt-1 text-sm text-white/80">
                        Prepare documentos legibles y vigentes.
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
                  {requirements.map((requirement) => (
                    <li
                      className="flex items-start gap-3 rounded-xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-800"
                      key={requirement}
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green-100 text-leaf">
                        <Check aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Antes de iniciar
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Requisitos indispensables
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {essentialRequirements.map((requirement) => (
              <div
                className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                key={requirement}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-light text-accent">
                  <AlertTriangle aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="pt-1 text-sm font-semibold leading-6 text-neutral-800">
                  {requirement}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl border-l-4 border-accent bg-white p-6 shadow-sm sm:p-7">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 shrink-0 text-accent"
            />
            <div>
              <h3 className="font-bold text-neutral-900">Importante</h3>
              <p className="mt-2 leading-7 text-neutral-600">
                Si tienen discrepancias, custodia de hijos en conflicto o
                repartición de bienes sin acuerdo, deben acudir al Poder Judicial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" id="contacto">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Atención presencial
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Estamos para orientarle
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-neutral-600">
                Si necesita ayuda antes de iniciar, puede acercarse a la sede
                central de la municipalidad.
              </p>

              <dl className="mt-9 space-y-6">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-neutral-900">Dirección</dt>
                    <dd className="mt-1 text-sm leading-6 text-neutral-600">
                      Av. Sánchez Carrión N.º 500, El Porvenir, Trujillo
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                    <Clock3 aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-neutral-900">Horario de atención</dt>
                    <dd className="mt-1 text-sm leading-6 text-neutral-600">
                      Lunes a viernes, 8:00 AM - 4:30 PM
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                    <Phone aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-sm font-bold text-neutral-900">Teléfono</dt>
                    <dd className="mt-1 text-sm leading-6 text-neutral-600">
                      044 - 400503
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="min-h-80 overflow-hidden bg-neutral-200 lg:min-h-full">
              <iframe
                allowFullScreen
                aria-label="Mapa de ubicación de la Municipalidad Distrital de El Porvenir"
                className="block h-full min-h-80 w-full border-0 lg:min-h-full"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.2879659304945!2d-79.00420802511441!3d-8.085492491942874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad16123275b6c7%3A0x257e2666ca524ead!2sMunicipalidad%20de%20El%20Porvenir!5e1!3m2!1ses-419!2spe!4v1789022017851!5m2!1ses-419!2spe"
                title="Ubicación de la Municipalidad Distrital de El Porvenir"
              />
            </div>
          </div>
        </div>
      </section>

      </main>
      <PublicFooter />
    </div>
  )
}

export default LandingPage
