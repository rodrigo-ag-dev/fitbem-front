import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from '../lib/api'
import { colorFor, initialsFor } from '../lib/textColor'

const Avatar = ({ photoMissing, photoUrl, name, onError }: { photoMissing: boolean; photoUrl: string; name: string; onError?: () => void }) => {
  if (!photoMissing) {
    return <img className="userMenuAvatarImg" src={photoUrl} alt="" onError={onError} />
  }
  const color = colorFor(name)
  return (
    <span className="userMenuAvatarInitials" style={{ backgroundColor: color.bg, color: color.fg }}>
      {initialsFor(name)}
    </span>
  )
}

export const UserMenu = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [photoMissing, setPhotoMissing] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  if (!user) return null

  const fullName = `${user.name} ${user.lastname}`.trim() || user.name
  const photoUrl = `${API_BASE}user/${user.userId}/photo`

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const handleGoToProfile = () => {
    setOpen(false)
    navigate('/app/dados')
  }

  const handleLogout = () => {
    setOpen(false)
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

  return (
    <div className="userMenu" ref={rootRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="userMenuTrigger"
        data-tooltip="Minha conta"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar photoMissing={photoMissing} photoUrl={photoUrl} name={fullName} onError={() => setPhotoMissing(true)} />
      </button>

      {open && (
        <div className="userMenuDropdown" role="menu">
          <div className="userMenuDropdownHeader">
            <Avatar photoMissing={photoMissing} photoUrl={photoUrl} name={fullName} />
            <div className="userMenuDropdownIdentity">
              <span className="userMenuDropdownName">{fullName}</span>
              <span className="userMenuDropdownEmail">{user.email}</span>
            </div>
          </div>

          <div className="userMenuDropdownDivider" />

          <button type="button" role="menuitem" className="userMenuDropdownItem" onClick={handleGoToProfile}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Meus dados
          </button>

          <button type="button" role="menuitem" className="userMenuDropdownItem userMenuDropdownItemDanger" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sair
          </button>
        </div>
      )}
    </div>
  )
}
