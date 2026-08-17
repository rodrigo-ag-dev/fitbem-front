import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { API_BASE, fetchWithTimeout } from '../lib/api'

export interface AuthUser {
  token: string
  name: string
  lastname: string
  phone: string
  gender: string
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

interface ProfileFields {
  name: string
  lastname: string
  phone: string
  gender: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<LoginResult>
  logout: () => void
  updateVitals: (weight: number, height: number) => void
  updateProfile: (fields: ProfileFields) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEYS = ['token', 'name', 'lastname', 'phone', 'gender', 'email', 'userID', 'weight', 'height', 'bmi'] as const

const readStoredUser = (): AuthUser | null => {
  const token = localStorage.getItem('token')
  if (!token) return null

  return {
    token,
    name: localStorage.getItem('name') ?? '',
    lastname: localStorage.getItem('lastname') ?? '',
    phone: localStorage.getItem('phone') ?? '',
    gender: localStorage.getItem('gender') ?? '',
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
  localStorage.setItem('lastname', user.lastname)
  localStorage.setItem('phone', user.phone)
  localStorage.setItem('gender', user.gender)
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
      lastname: data.reg.lastname ?? '',
      phone: data.reg.phone ?? '',
      gender: data.reg.gender ?? '',
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

  const updateVitals = useCallback((weight: number, height: number) => {
    setUser((prev) => {
      if (!prev) return prev
      const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2)
      const next: AuthUser = { ...prev, weight, height, bmi }
      persistUser(next)
      return next
    })
  }, [])

  const updateProfile = useCallback((fields: ProfileFields) => {
    setUser((prev) => {
      if (!prev) return prev
      const next: AuthUser = { ...prev, ...fields }
      persistUser(next)
      return next
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, updateVitals, updateProfile }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
