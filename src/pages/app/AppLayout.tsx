import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { Logo } from '../../components/Logo'
import { UserMenu } from '../../components/UserMenu'

const navLinkClass = ({ isActive }: { isActive: boolean }) => `appNavLink${isActive ? ' appNavLinkSel' : ''}`
const iconLinkClass = ({ isActive }: { isActive: boolean }) => `appIconBtn${isActive ? ' appIconBtnSel' : ''}`

export const AppLayout = () => {
  const { user } = useAuth()
  const location = useLocation()
  const [hasUnread, setHasUnread] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    fetch(`${API_BASE}notification/count/${user.userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((resp) => resp.json())
      .then((json: { count?: number }) => setHasUnread(Boolean(json?.count && json.count > 0)))
      .catch(() => {})
  }, [user, location.pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  if (!user) return null

  return (
    <div className="appBody">
      <div className="appDetail">
        <div className="appTopbar">
          <NavLink to="/app" className="appBrand">
            <Logo withWordmark />
          </NavLink>

          <button
            type="button"
            className="appMenuToggle"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="appTopbarGroup">
            <div className={`appTopbarRight${menuOpen ? ' open' : ''}`}>
              <div className="appPillNav">
                <NavLink to="/app" end className={navLinkClass}>
                  Índices
                </NavLink>
                <NavLink to="/app/saude" className={navLinkClass}>
                  Saúde
                </NavLink>
                <NavLink to="/app/fitness" className={navLinkClass}>
                  Fitness
                </NavLink>
              </div>

              <div className="appIconGroup">
                <NavLink to="/app/notificacoes" className={iconLinkClass} data-tooltip="Notificações">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {hasUnread && <div className="notifyHealth" />}
                </NavLink>
              </div>
            </div>

            {/* Kept outside the collapsible mobile panel above so its popup never
                gets clipped by that panel's overflow:hidden/max-height, and so
                the account menu stays reachable without opening the hamburger. */}
            <UserMenu />
          </div>
        </div>

        <div className="appBase">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
