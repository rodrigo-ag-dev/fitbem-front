import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { API_BASE, fetchWithTimeout } from '../lib/api'

export interface AuthUser {
  token: string
  name: string
  email: string
  userId: string
  weight: number
  height: number
  bmi: string
}

interface LoginResult {
  ok: boolean
  error?: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEYS = ['token', 'name', 'email', 'userID', 'weight', 'height', 'bmi'] as const

const readStoredUser = (): AuthUser | null => {
  const token = localStorage.getItem('token')
  if (!token) return null

  return {
    token,
    name: localStorage.getItem('name') ?? '',
    email: localStorage.getItem('email') ?? '',
    userId: localStorage.getItem('userID') ?? '',
    weight: Number(localStorage.getItem('weight') ?? 0),
    height: Number(localStorage.getItem('height') ?? 0),
    bmi: localStorage.getItem('bmi') ?? '0.00',
  }
}

const persistUser = (user: AuthUser) => {
  localStorage.setItem('token', user.token)
  localStorage.setItem('name', user.name)
  localStorage.setItem('email', user.email)
  localStorage.setItem('userID', user.userId)
  localStorage.setItem('weight', String(user.weight))
  localStorage.setItem('height', String(user.height))
  localStorage.setItem('bmi', user.bmi)
}

const clearStoredUser = () => {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser)

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    const resp = await fetchWithTimeout(`${API_BASE}session`, {
      method: 'POST',
      headers: { email, password },
    })

    if (!resp) {
      return { ok: false, error: 'Erro de conexão.\nTente novamente mais tarde!' }
    }

    const data = await resp.json()
    if (resp.status >= 400) {
      return { ok: false, error: data.error ?? 'Erro ao autenticar' }
    }

    if (!data?.token) {
      return { ok: false, error: 'Erro ao autenticar' }
    }

    const weight = Number(data.reg.weight)
    const height = Number(data.reg.height)
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2)

    const nextUser: AuthUser = {
      token: data.token,
      name: data.reg.name,
      email: data.reg.email,
      userId: data.reg.id,
      weight,
      height,
      bmi,
    }

    persistUser(nextUser)
    setUser(nextUser)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    clearStoredUser()
    setUser(null)
  }, [])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
