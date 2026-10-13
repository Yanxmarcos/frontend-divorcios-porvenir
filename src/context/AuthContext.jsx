/* eslint-disable react/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const SESSION_KEY = 'divorcio-demo-session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)) } catch { return null }
  })
  const value = useMemo(() => ({
    session,
    login(email, password) {
      if (email !== 'abogada@demo.test' || password !== 'Municipal2026') return { ok: false, message: 'Credenciales de demostración incorrectas.' }
      const next = { id: 'user-demo-legal', name: 'Dra. María García', role: 'Abogada responsable' }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
      setSession(next)
      return { ok: true }
    },
    logout() { sessionStorage.removeItem(SESSION_KEY); setSession(null) },
  }), [session])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
