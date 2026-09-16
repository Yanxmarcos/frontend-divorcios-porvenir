import { useState } from 'react'
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    navigate('/admin/dashboard')
  }

  return (
    <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-neutral-900 px-5 py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/35 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-dark via-primary to-accent" />

      <section className="wizard-panel-in relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/30 sm:p-9">
        <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border-4 border-primary bg-primary-light p-1.5 shadow-md">
          <img
            alt="Escudo de la Municipalidad Distrital de El Porvenir"
            className="h-full w-full object-contain"
            src="/logo.svg"
          />
        </div>

        <div className="mt-7 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Acceso institucional
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
            Panel Administrativo
          </h1>
          <p className="mt-2 text-base font-semibold text-neutral-600">
            Oficina de Divorcios
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="admin-email">
              Correo institucional
            </label>
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              />
              <input
                autoComplete="email"
                className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-4 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light"
                id="admin-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nombre@muniporvenir.gob.pe"
                required
                type="email"
                value={email}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-neutral-800" htmlFor="admin-password">
              Contraseña
            </label>
            <div className="relative">
              <LockKeyhole
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
              />
              <input
                autoComplete="current-password"
                className="min-h-13 w-full rounded-xl border border-neutral-200 bg-white py-3 pl-12 pr-13 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary-light"
                id="admin-password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingrese su contraseña"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <button
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Eye aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:cursor-wait disabled:opacity-75 disabled:hover:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary-light"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
            ) : (
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            )}
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-semibold text-neutral-400">
          <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
          Solo personal autorizado
        </p>
      </section>
    </main>
  )
}

export default LoginPage
