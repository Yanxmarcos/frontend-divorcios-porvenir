import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const auth = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [email, setEmail] = useState('abogada@demo.test'); const [password, setPassword] = useState('Municipal2026'); const [error, setError] = useState('')
  if (auth.session) return <Navigate replace to="/admin/dashboard" />
  const submit = (e) => { e.preventDefault(); const result = auth.login(email, password); if (result.ok) navigate(location.state?.from || '/admin/dashboard', { replace: true }); else setError(result.message) }
  return <main className="login-page"><section className="login-aside"><img src="/logo.svg" alt="Municipalidad Distrital de El Porvenir" /><p>Oficina de Asesoría Jurídica</p><h1>Gestión de separación y divorcio</h1><ul><li>Expedientes y documentos en un solo lugar</li><li>Audiencias y actuaciones trazables</li><li>Datos exclusivamente ficticios</li></ul></section><section className="login-panel"><form onSubmit={submit} className="login-card"><span className="login-icon"><LockKeyhole /></span><p className="eyebrow">Acceso interno</p><h2>Ingresar al panel</h2><p className="muted">Utilice las credenciales precargadas para recorrer la demostración.</p><label>Correo institucional<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></label><label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="btn btn-primary btn-block" type="submit"><ShieldCheck /> Ingresar a la demostración</button><p className="demo-credentials">abogada@demo.test · Municipal2026</p></form></section></main>
}
