import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import wallpaper from '../../assets/images/wallpaper.jpg'

const links = [
  { to: '/sobre', label: 'Sobre Nós' },
  { to: '/contato', label: 'Contato' },
  { to: '/cadastro', label: 'Cadastro' },
  { to: '/login', label: 'Login' },
]

export const SplashLayout = () => {
  const location = useLocation()
  const isSlogan = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="splashBody">
      <div className="splashMenu">
        <NavLink to="/" className="splashLogo" aria-label="Fit Bem" />
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
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `splashOption${isActive ? ' splashOptionSelected' : ''}`}
            >
              <p>{link.label}</p>
            </NavLink>
          ))}
        </div>
      </div>
      <div
        className="splashDetail"
        style={
          isSlogan
            ? { backgroundImage: `url(${wallpaper})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
            : undefined
        }
      >
        <Outlet />
      </div>
    </div>
  )
}
