import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  Globe2,
  Home,
  IdCard,
  Landmark,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  UploadCloud,
  UserRound,
} from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import ProgressBar from '../../components/ui/ProgressBar.jsx'
import Stepper from '../../components/ui/Stepper.jsx'

const steps = [
  'Verificación de identidad',
  'Datos del matrimonio',
  'Información condicional',
  'Documentos requeridos',
  'Confirmación',
]

const formSchema = z
  .object({
    dni: z.string().regex(/^\d{8}$/, 'Ingrese un DNI válido de 8 dígitos.'),
    nombres: z.string().trim().min(3, 'Ingrese los nombres completos.'),
    fechaMatrimonio: z.string().min(1, 'Seleccione la fecha de matrimonio.'),
    lugarMatrimonio: z.string().min(1, 'Seleccione el lugar del matrimonio.'),
    direccion: z
      .string()
      .trim()
      .min(5, 'Ingrese la dirección del último domicilio conyugal.'),
    hijos: z.coerce.number().min(0).max(4),
    nombresHijos: z.string().optional(),
    bienes: z.boolean(),
    tipoBienes: z.string().optional(),
    exterior: z.boolean(),
    apoderado: z.string().optional(),
    veracidad: z.boolean(),
  })
  .superRefine((data, context) => {
    if (data.hijos > 0 && !data.nombresHijos?.trim()) {
      context.addIssue({
        code: 'custom',
        message: 'Ingrese los nombres de los hijos.',
        path: ['nombresHijos'],
      })
    }

    if (data.bienes && !data.tipoBienes?.trim()) {
      context.addIssue({
        code: 'custom',
        message: 'Indique el tipo de bienes en común.',
        path: ['tipoBienes'],
      })
    }

    if (data.exterior && !data.apoderado?.trim()) {
      context.addIssue({
        code: 'custom',
        message: 'Ingrese el nombre del apoderado.',
        path: ['apoderado'],
      })
    }

    if (!data.veracidad) {
      context.addIssue({
        code: 'custom',
        message: 'Debe aceptar la declaración para enviar la solicitud.',
        path: ['veracidad'],
      })
    }
  })

const inputClassName =
  'min-h-13 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light sm:text-lg'

const labelClassName = 'mb-2 block text-sm font-bold text-neutral-800'

const fieldIconClassName =
  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400'

const baseDocuments = [
  { id: 'solicitud', name: 'Solicitud de separación convencional' },
  { id: 'dni-ambos', name: 'Copia del DNI de ambos cónyuges' },
  { id: 'acta-matrimonio', name: 'Acta de matrimonio' },
  {
    id: 'domicilio-conyugal',
    name: 'Declaración jurada del último domicilio conyugal',
  },
]

function calculateYearsMarried(dateValue) {
  if (!dateValue) return null

  const marriageDate = new Date(`${dateValue}T00:00:00`)
  const today = new Date()
  let years = today.getFullYear() - marriageDate.getFullYear()
  const monthDifference = today.getMonth() - marriageDate.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < marriageDate.getDate())
  ) {
    years -= 1
  }

  return Math.max(years, 0)
}

function PreRegistroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [identityStatus, setIdentityStatus] = useState(null)
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [fileErrors, setFileErrors] = useState({})
  const [trackingNumber, setTrackingNumber] = useState('')

  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      dni: '',
      nombres: '',
      fechaMatrimonio: '',
      lugarMatrimonio: '',
      direccion: '',
      hijos: 0,
      nombresHijos: '',
      bienes: false,
      tipoBienes: '',
      exterior: false,
      apoderado: '',
      veracidad: false,
    },
    resolver: zodResolver(formSchema),
  })

  const [dni, marriageDate, childrenCount, hasSharedAssets, spouseAbroad] =
    useWatch({
      control,
      name: ['dni', 'fechaMatrimonio', 'hijos', 'bienes', 'exterior'],
    })
  const yearsMarried = calculateYearsMarried(marriageDate)

  const requiredDocuments = useMemo(() => {
    const documents = [...baseDocuments]

    if (childrenCount > 0) {
      documents.push(
        {
          id: 'actas-hijos',
          name: 'Acta de nacimiento de cada hijo',
        },
        {
          id: 'acuerdo-hijos',
          name: 'Acta de conciliación o sentencia sobre alimentos, tenencia y visitas',
        },
      )
    }

    if (hasSharedAssets) {
      documents.push({
        id: 'separacion-bienes',
        name: 'Acuerdo notarial de separación de bienes',
      })
    } else {
      documents.push({
        id: 'sin-bienes',
        name: 'Declaración jurada de no tener bienes',
      })
    }

    if (spouseAbroad) {
      documents.push({
        id: 'poder-especial',
        name: 'Poder especial para apoderado',
      })
    }

    return documents
  }, [childrenCount, hasSharedAssets, spouseAbroad])

  const dniRegistration = register('dni')
  const maximumMarriageDate = new Date().toISOString().split('T')[0]

  const lookupIdentity = async () => {
    const dniIsValid = await trigger('dni')
    if (!dniIsValid) return

    setIsLookingUp(true)
    setIdentityStatus(null)
    await new Promise((resolve) => setTimeout(resolve, 650))

    if (getValues('dni') === '12345678') {
      setValue('nombres', 'JUAN PÉREZ GARCÍA', { shouldValidate: true })
      setIdentityStatus('verified')
    } else {
      setValue('nombres', '')
      clearErrors('nombres')
      setIdentityStatus('manual')
    }

    setIsLookingUp(false)
  }

  const validateCurrentStep = async () => {
    if (currentStep === 1) {
      if (!identityStatus) {
        setError('dni', {
          message: 'Presione Continuar para consultar el DNI.',
          type: 'manual',
        })
        return false
      }

      return trigger(['dni', 'nombres'])
    }

    if (currentStep === 2) {
      const fieldsAreValid = await trigger([
        'fechaMatrimonio',
        'lugarMatrimonio',
        'direccion',
      ])

      if (!fieldsAreValid) return false

      if (yearsMarried !== null && yearsMarried < 2) {
        setError('fechaMatrimonio', {
          message: 'Se requiere un mínimo de 2 años de matrimonio.',
          type: 'manual',
        })
        return false
      }

      return true
    }

    if (currentStep === 3) {
      return trigger([
        'hijos',
        'nombresHijos',
        'bienes',
        'tipoBienes',
        'exterior',
        'apoderado',
      ])
    }

    if (currentStep === 4) {
      const allDocumentsAreUploaded = requiredDocuments.every(
        (document) => uploadedFiles[document.id],
      )

      if (!allDocumentsAreUploaded) {
        setFileErrors((currentErrors) => ({
          ...currentErrors,
          form: 'Debe subir todos los documentos requeridos para continuar.',
        }))
      }

      return allDocumentsAreUploaded
    }

    return true
  }

  const goToNextStep = async () => {
    const stepIsValid = await validateCurrentStep()
    if (!stepIsValid) return

    setCurrentStep((step) => Math.min(step + 1, steps.length))
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1))
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  const handleFileChange = (documentId, event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const extensionIsValid = /\.(pdf|jpe?g|png)$/i.test(file.name)

    if (!extensionIsValid) {
      setFileErrors((currentErrors) => ({
        ...currentErrors,
        [documentId]: 'Formato no permitido. Use PDF, JPG, JPEG o PNG.',
      }))
      event.target.value = ''
      return
    }

    setUploadedFiles((currentFiles) => ({
      ...currentFiles,
      [documentId]: file,
    }))
    setFileErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[documentId]
      delete nextErrors.form
      return nextErrors
    })
  }

  const submitApplication = () => {
    setTrackingNumber('EXP2026-48271')
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  if (trackingNumber) {
    return (
      <main className="grid min-h-[100svh] place-items-center bg-neutral-50 px-5 py-12">
        <div className="success-pop-in w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-7 text-center shadow-xl sm:p-12">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-100 text-leaf ring-8 ring-green-50">
            <CheckCircle2 aria-hidden="true" className="h-12 w-12" />
          </span>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-leaf">
            Registro completado
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-neutral-900 sm:text-4xl">
            Su solicitud fue registrada
          </h1>
          <p className="mt-5 leading-7 text-neutral-600">
            Guarde este número para consultar el estado de su trámite.
          </p>
          <div className="mt-7 rounded-2xl border border-primary-light bg-primary-light/50 p-5">
            <span className="block text-sm font-semibold text-primary-dark">
              Número de seguimiento
            </span>
            <strong className="mt-2 block font-heading text-2xl tracking-wider text-primary sm:text-3xl">
              {trackingNumber}
            </strong>
          </div>
          <p className="mx-auto mt-7 max-w-lg text-sm leading-6 text-neutral-600">
            Le notificaremos por correo y teléfono cuando su expediente esté en
            revisión.
          </p>
          <Link
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-xl bg-primary px-7 py-3 font-bold text-white transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
            to="/"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 transition hover:text-primary"
            to="/"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            Volver al inicio
          </Link>
          <span className="hidden text-sm font-semibold text-neutral-600 sm:block">
            Municipalidad Distrital de El Porvenir
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Solicitud digital
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Pre-registro de divorcio municipal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-neutral-600">
            Complete cada paso con información clara y documentos legibles.
          </p>
        </div>

        <div className="mt-9 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
          <Stepper currentStep={currentStep} steps={steps} />
          <div className="mt-7 md:mt-8">
            <ProgressBar current={currentStep} total={steps.length} />
          </div>
        </div>

        <form
          className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-md sm:p-8 lg:p-10"
          onSubmit={handleSubmit(submitApplication)}
        >
          {currentStep === 1 && (
            <section aria-labelledby="identity-title" className="wizard-panel-in">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                  <IdCard aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900" id="identity-title">
                    Verificación de identidad
                  </h2>
                  <p className="mt-2 leading-7 text-neutral-600">
                    Ingrese su DNI para consultar los datos del solicitante.
                  </p>
                </div>
              </div>

              <div className="mt-8 max-w-xl">
                <label className={labelClassName} htmlFor="dni">
                  Número de DNI
                </label>
                <div className="relative">
                  <IdCard aria-hidden="true" className={fieldIconClassName} />
                  <input
                    {...dniRegistration}
                    autoComplete="off"
                    className={`${inputClassName} pl-12 text-xl font-bold tracking-[0.18em]`}
                    id="dni"
                    inputMode="numeric"
                    maxLength="8"
                    onChange={(event) => {
                      dniRegistration.onChange(event)
                      setIdentityStatus(null)
                      setValue('nombres', '')
                    }}
                    placeholder="12345678"
                  />
                </div>
                {errors.dni && (
                  <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                    {errors.dni.message}
                  </p>
                )}
                <button
                  className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                  disabled={isLookingUp || dni.length !== 8}
                  onClick={lookupIdentity}
                  type="button"
                >
                  {isLookingUp ? (
                    <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  )}
                  {isLookingUp ? 'Consultando...' : 'Continuar'}
                </button>
              </div>

              {identityStatus && (
                <div className="wizard-panel-in mt-7 max-w-2xl">
                  <div
                    className={`flex items-start gap-3 rounded-xl border p-4 ${
                      identityStatus === 'verified'
                        ? 'border-green-200 bg-green-50 text-green-800'
                        : 'border-accent/30 bg-accent-light text-neutral-800'
                    }`}
                    role="status"
                  >
                    {identityStatus === 'verified' ? (
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                    ) : (
                      <UserRound aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    )}
                    <p className="text-sm font-semibold leading-6">
                      {identityStatus === 'verified'
                        ? 'DNI verificado correctamente'
                        : 'No se encontraron datos, continúe manualmente'}
                    </p>
                  </div>

                  <div className="mt-5">
                    <label className={labelClassName} htmlFor="nombres">
                      Nombres completos
                    </label>
                    <div className="relative">
                      <UserRound aria-hidden="true" className={fieldIconClassName} />
                      <input
                        {...register('nombres')}
                        className={`${inputClassName} pl-12`}
                        id="nombres"
                        placeholder="Ingrese sus nombres y apellidos"
                        readOnly={identityStatus === 'verified'}
                      />
                    </div>
                    {errors.nombres && (
                      <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                        {errors.nombres.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {currentStep === 2 && (
            <section aria-labelledby="marriage-title" className="wizard-panel-in">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                  <CalendarDays aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900" id="marriage-title">
                    Datos del matrimonio
                  </h2>
                  <p className="mt-2 leading-7 text-neutral-600">
                    Indique cuándo y dónde se celebró el matrimonio.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="fechaMatrimonio">
                    Fecha de matrimonio
                  </label>
                  <div className="relative">
                    <CalendarDays aria-hidden="true" className={fieldIconClassName} />
                    <input
                      {...register('fechaMatrimonio')}
                      className={`${inputClassName} pl-12`}
                      id="fechaMatrimonio"
                      max={maximumMarriageDate}
                      type="date"
                    />
                  </div>
                  {errors.fechaMatrimonio && (
                    <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                      {errors.fechaMatrimonio.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName} htmlFor="lugarMatrimonio">
                    Lugar de matrimonio
                  </label>
                  <div className="relative">
                    <MapPin aria-hidden="true" className={fieldIconClassName} />
                    <select
                      {...register('lugarMatrimonio')}
                      className={`${inputClassName} pl-12`}
                      id="lugarMatrimonio"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="El Porvenir">El Porvenir</option>
                      <option value="Otro distrito">Otro distrito</option>
                    </select>
                  </div>
                  {errors.lugarMatrimonio && (
                    <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                      {errors.lugarMatrimonio.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClassName} htmlFor="yearsMarried">
                    Años de casados
                  </label>
                  <div className="relative">
                    <BadgeCheck aria-hidden="true" className={fieldIconClassName} />
                    <input
                      className={`${inputClassName} pl-12 font-bold`}
                      id="yearsMarried"
                      readOnly
                      value={yearsMarried ?? ''}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    Se calcula automáticamente desde la fecha indicada.
                  </p>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="direccion">
                    Último domicilio conyugal
                  </label>
                  <div className="relative">
                    <Home aria-hidden="true" className={fieldIconClassName} />
                    <input
                      {...register('direccion')}
                      className={`${inputClassName} pl-12`}
                      id="direccion"
                      placeholder="Av., calle, número y distrito"
                    />
                  </div>
                  {errors.direccion && (
                    <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                      {errors.direccion.message}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section aria-labelledby="conditional-title" className="wizard-panel-in">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                  <ShieldCheck aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900" id="conditional-title">
                    Información condicional
                  </h2>
                  <p className="mt-2 leading-7 text-neutral-600">
                    Sus respuestas determinarán los documentos necesarios.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-5">
                  <Baby aria-hidden="true" className="h-6 w-6 text-primary" />
                  <label className={`${labelClassName} mt-4`} htmlFor="hijos">
                    Cantidad de hijos
                  </label>
                  <select
                    {...register('hijos', { valueAsNumber: true })}
                    className={inputClassName}
                    id="hijos"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4 o más</option>
                  </select>
                </div>

                <div className="rounded-xl border border-neutral-200 p-5">
                  <Landmark aria-hidden="true" className="h-6 w-6 text-primary" />
                  <p className="mt-4 text-sm font-bold text-neutral-800">
                    ¿Tienen bienes en común?
                  </p>
                  <button
                    aria-checked={hasSharedAssets}
                    className="mt-5 flex min-h-13 w-full items-center justify-between rounded-xl bg-neutral-100 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-primary-light"
                    onClick={() =>
                      setValue('bienes', !hasSharedAssets, { shouldValidate: true })
                    }
                    role="switch"
                    type="button"
                  >
                    <span className="font-semibold text-neutral-800">
                      {hasSharedAssets ? 'Sí' : 'No'}
                    </span>
                    <span
                      className={`relative h-8 w-14 rounded-full transition-colors ${
                        hasSharedAssets ? 'bg-primary' : 'bg-neutral-400'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                          hasSharedAssets ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </span>
                  </button>
                </div>

                <div className="rounded-xl border border-neutral-200 p-5">
                  <Globe2 aria-hidden="true" className="h-6 w-6 text-primary" />
                  <p className="mt-4 text-sm font-bold text-neutral-800">
                    ¿Cónyuge fuera del país?
                  </p>
                  <button
                    aria-checked={spouseAbroad}
                    className="mt-5 flex min-h-13 w-full items-center justify-between rounded-xl bg-neutral-100 px-4 py-2 focus:outline-none focus:ring-4 focus:ring-primary-light"
                    onClick={() =>
                      setValue('exterior', !spouseAbroad, { shouldValidate: true })
                    }
                    role="switch"
                    type="button"
                  >
                    <span className="font-semibold text-neutral-800">
                      {spouseAbroad ? 'Sí' : 'No'}
                    </span>
                    <span
                      className={`relative h-8 w-14 rounded-full transition-colors ${
                        spouseAbroad ? 'bg-primary' : 'bg-neutral-400'
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                          spouseAbroad ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {childrenCount > 0 && (
                  <div className="wizard-panel-in md:col-span-2">
                    <label className={labelClassName} htmlFor="nombresHijos">
                      Nombres completos de los hijos
                    </label>
                    <div className="relative">
                      <Baby aria-hidden="true" className={fieldIconClassName} />
                      <textarea
                        {...register('nombresHijos')}
                        className={`${inputClassName} min-h-28 pl-12`}
                        id="nombresHijos"
                        placeholder="Ingrese un nombre por línea"
                      />
                    </div>
                    {errors.nombresHijos && (
                      <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                        {errors.nombresHijos.message}
                      </p>
                    )}
                  </div>
                )}

                {hasSharedAssets && (
                  <div className="wizard-panel-in">
                    <label className={labelClassName} htmlFor="tipoBienes">
                      Tipo de bienes
                    </label>
                    <div className="relative">
                      <Landmark aria-hidden="true" className={fieldIconClassName} />
                      <input
                        {...register('tipoBienes')}
                        className={`${inputClassName} pl-12`}
                        id="tipoBienes"
                        placeholder="Ej.: inmueble, vehículo"
                      />
                    </div>
                    {errors.tipoBienes && (
                      <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                        {errors.tipoBienes.message}
                      </p>
                    )}
                  </div>
                )}

                {spouseAbroad && (
                  <div className="wizard-panel-in">
                    <label className={labelClassName} htmlFor="apoderado">
                      Nombre del apoderado
                    </label>
                    <div className="relative">
                      <UserRound aria-hidden="true" className={fieldIconClassName} />
                      <input
                        {...register('apoderado')}
                        className={`${inputClassName} pl-12`}
                        id="apoderado"
                        placeholder="Nombres y apellidos"
                      />
                    </div>
                    {errors.apoderado && (
                      <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                        {errors.apoderado.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section aria-labelledby="documents-title" className="wizard-panel-in">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                  <FileText aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900" id="documents-title">
                    Documentos requeridos
                  </h2>
                  <p className="mt-2 leading-7 text-neutral-600">
                    Formatos permitidos: PDF, JPG, JPEG y PNG.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {requiredDocuments.map((document) => {
                  const uploadedFile = uploadedFiles[document.id]

                  return (
                    <div
                      className="rounded-xl border border-neutral-200 p-5 transition-colors hover:border-primary-light"
                      key={document.id}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex min-w-0 items-start gap-3">
                          <span
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                              uploadedFile
                                ? 'bg-green-100 text-leaf'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {uploadedFile ? (
                              <Check aria-hidden="true" className="h-5 w-5" />
                            ) : (
                              <FileText aria-hidden="true" className="h-5 w-5" />
                            )}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold leading-6 text-neutral-900">
                              {document.name}
                            </p>
                            {uploadedFile && (
                              <p className="mt-1 truncate text-sm font-semibold text-leaf">
                                {uploadedFile.name}
                              </p>
                            )}
                          </div>
                        </div>

                        <label
                          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white focus-within:ring-4 focus-within:ring-primary-light"
                          htmlFor={`document-${document.id}`}
                        >
                          <UploadCloud aria-hidden="true" className="h-5 w-5" />
                          {uploadedFile ? 'Reemplazar' : 'Subir archivo'}
                          <input
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="sr-only"
                            id={`document-${document.id}`}
                            onChange={(event) => handleFileChange(document.id, event)}
                            type="file"
                          />
                        </label>
                      </div>
                      {fileErrors[document.id] && (
                        <p className="mt-3 text-sm font-semibold text-primary" role="alert">
                          {fileErrors[document.id]}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              {fileErrors.form && (
                <p
                  className="mt-5 rounded-xl bg-primary-light p-4 text-sm font-semibold text-primary-dark"
                  role="alert"
                >
                  {fileErrors.form}
                </p>
              )}
            </section>
          )}

          {currentStep === 5 && (
            <section aria-labelledby="confirmation-title" className="wizard-panel-in">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                  <FileCheck2 aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900" id="confirmation-title">
                    Confirmación
                  </h2>
                  <p className="mt-2 leading-7 text-neutral-600">
                    Revise la información antes de enviar su solicitud.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-xl bg-neutral-50 p-5">
                  <h3 className="font-bold text-neutral-900">Identidad</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-600">DNI</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">{getValues('dni')}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-600">Nombres</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {getValues('nombres')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl bg-neutral-50 p-5">
                  <h3 className="font-bold text-neutral-900">Matrimonio</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-600">Fecha y antigüedad</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {getValues('fechaMatrimonio')} · {yearsMarried} años
                      </dd>
                    </div>
                    <div>
                      <dt className="text-neutral-600">Lugar</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {getValues('lugarMatrimonio')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-neutral-600">Último domicilio</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {getValues('direccion')}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl bg-neutral-50 p-5">
                  <h3 className="font-bold text-neutral-900">Información familiar</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-neutral-600">Hijos</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {childrenCount === 4 ? '4 o más' : childrenCount}
                      </dd>
                    </div>
                    {childrenCount > 0 && (
                      <div>
                        <dt className="text-neutral-600">Nombres de los hijos</dt>
                        <dd className="mt-1 whitespace-pre-line font-semibold text-neutral-900">
                          {getValues('nombresHijos')}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-neutral-600">Bienes en común</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {hasSharedAssets ? `Sí · ${getValues('tipoBienes')}` : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-neutral-600">Cónyuge fuera del país</dt>
                      <dd className="mt-1 font-semibold text-neutral-900">
                        {spouseAbroad ? `Sí · Apoderado: ${getValues('apoderado')}` : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl bg-neutral-50 p-5">
                  <h3 className="font-bold text-neutral-900">Documentos</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {requiredDocuments.map((document) => (
                      <li className="flex items-start gap-2" key={document.id}>
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-leaf"
                        />
                        <span className="min-w-0 truncate font-semibold text-neutral-800">
                          {uploadedFiles[document.id]?.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-5 transition hover:border-primary-light">
                <input
                  {...register('veracidad')}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                  type="checkbox"
                />
                <span className="text-sm font-semibold leading-6 text-neutral-800">
                  Declaro que la información es veraz
                </span>
              </label>
              {errors.veracidad && (
                <p className="mt-2 text-sm font-semibold text-primary" role="alert">
                  {errors.veracidad.message}
                </p>
              )}
            </section>
          )}

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-7 sm:flex-row sm:justify-between">
            {currentStep > 1 ? (
              <button
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 font-bold text-neutral-800 transition hover:border-neutral-400 hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-neutral-200"
                onClick={goToPreviousStep}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="h-5 w-5" />
                Anterior
              </button>
            ) : (
              <span />
            )}

            {currentStep < steps.length ? (
              <button
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-bold text-white shadow-sm transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                onClick={goToNextStep}
                type="button"
              >
                Siguiente
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </button>
            ) : (
              <button
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary-light"
                type="submit"
              >
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                Enviar solicitud
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}

export default PreRegistroPage
