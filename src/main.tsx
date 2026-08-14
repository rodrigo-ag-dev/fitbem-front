import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css'
import './styles/splash.css'
import './styles/app.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
