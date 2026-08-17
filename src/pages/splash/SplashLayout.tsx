import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Logo } from '../../components/Logo'

const links = [
  { to: '/sobre', label: 'Sobre Nós' },
  { to: '/contato', label: 'Contato' },
  { to: '/login', label: 'Login' },
]

export const SplashLayout = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="splashBody">
      <div className="splashMenu">
        <NavLink to="/" className="splashLogoLink" aria-label="Fit Bem">
          <Logo withWordmark />
        </NavLink>
        <button
          type="button"
          className="splashMenuToggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`splashOptions${menuOpen ? ' open' : ''}`}>
          <div className="splashPillNav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `splashOption${isActive ? ' splashOptionSelected' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <NavLink to="/cadastro" className="splashCta">
            Cadastre-se
          </NavLink>
        </div>
      </div>
      <div className="splashDetail">
        <Outlet />
      </div>
    </div>
  )
}
