import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { Logo } from '../../components/Logo'
import iconIndex from '../../assets/images/index.png'
import iconHealth from '../../assets/images/health.png'
import iconFitness from '../../assets/images/fitness.png'
import iconPerson from '../../assets/images/person.png'
import iconNotify from '../../assets/images/notify.png'
import iconExit from '../../assets/images/exit.png'

const menuLinkClass = ({ isActive }: { isActive: boolean }) => `iconButton${isActive ? ' iconButtonSel' : ''}`

export const AppLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [hasUnread, setHasUnread] = useState(false)

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

  const handleExit = () => {
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) logout()
    })
  }

  if (!user) return null

  return (
    <div className="appBody">
      <div className="appDetail">
        <div className="appLeft">
          <div className="appLeftLogo">
            <Logo variant="white" size={26} />
          </div>
          <div className="menuDivisor" />
          <NavLink to="/app" end className={menuLinkClass} data-tooltip="Índices">
            <img src={iconIndex} alt="Índices" />
          </NavLink>
          <NavLink to="/app/saude" className={menuLinkClass} data-tooltip="Saúde">
            <img src={iconHealth} alt="Saúde" />
          </NavLink>
          <NavLink to="/app/fitness" className={menuLinkClass} data-tooltip="Fitness">
            <img src={iconFitness} alt="Fitness" />
          </NavLink>
          <NavLink to="/app/dados" className={menuLinkClass} data-tooltip="Meus dados">
            <img src={iconPerson} alt="Meus dados" />
          </NavLink>
          <NavLink to="/app/notificacoes" id="btnNotify" className={menuLinkClass} data-tooltip="Notificações">
            <img src={iconNotify} alt="Notificações" />
            {hasUnread && <div className="notifyHealth" />}
          </NavLink>
          <div className="menuDivisor" />
          <button type="button" className="iconButton" data-tooltip="Sair" onClick={handleExit}>
            <img src={iconExit} alt="Sair" />
          </button>
        </div>
        <div className="appBase">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
