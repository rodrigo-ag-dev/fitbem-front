import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { MessageProvider } from './context/MessageContext'
import { SplashLayout } from './pages/splash/SplashLayout'
import { Slogan } from './pages/splash/Slogan'
import { About } from './pages/splash/About'
import { Contact } from './pages/splash/Contact'
import { Register } from './pages/splash/Register'
import { Login } from './pages/splash/Login'
import { AppLayout } from './pages/app/AppLayout'
import { Dashboard } from './pages/app/Dashboard'
import { Health } from './pages/app/Health'
import { Fitness } from './pages/app/Fitness'
import { Notify } from './pages/app/Notify'
import { Person } from './pages/app/Person'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

const RootRedirect = () => {
  const { user } = useAuth()
  return user ? <Navigate to="/app" replace /> : <Slogan />
}

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashLayout />}>
              <Route index element={<RootRedirect />} />
              <Route path="sobre" element={<About />} />
              <Route path="contato" element={<Contact />} />
              <Route path="cadastro" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="saude" element={<Health />} />
              <Route path="fitness" element={<Fitness />} />
              <Route path="notificacoes" element={<Notify />} />
              <Route path="dados" element={<Person />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MessageProvider>
    </AuthProvider>
  )
}

export default App
