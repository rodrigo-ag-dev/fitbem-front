import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE } from '../../lib/api'
import { FormatDate } from '../../lib/format'
import { Spinner } from '../../components/Spinner'
import messageIcon from '../../assets/images/message.png'
import readyIcon from '../../assets/images/ready.png'
import type { NotificationEntry } from '../../types'

const typeLabel = (type: number) => {
  if (type === 1) return 'Dica do dia'
  if (type === 2) return 'Lembrete'
  if (type === 3) return 'Aviso'
  return ''
}

interface NotificationRowProps {
  item: NotificationEntry
  selected: boolean
  onSelect: () => void
}

const NotificationRow = ({ item, selected, onSelect }: NotificationRowProps) => {
  const noRead = item.status === 0 && !selected
  const className = [
    'notifyRegister',
    noRead ? 'notifyRegisterNoRead' : '',
    selected ? 'notifyRegisterSelected' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className} onClick={onSelect}>
      <div className="notifyLeftRegister">
        <img className="notifyIcon" src={messageIcon} alt="" />
        <p className="notifyUser">Fit Bem</p>
        <p className="notifyDay">{FormatDate(item.day).substring(0, 5)}</p>
        <img
          className="notifyReady"
          src={readyIcon}
          alt=""
          style={item.status === 1 ? { visibility: 'visible' } : undefined}
        />
      </div>
      <div className="notifyRightRegister">
        <p className="notifyType">{typeLabel(item.type)}</p>
        <p className="notifyMessage">{item.message}</p>
      </div>
    </div>
  )
}

export const Notify = () => {
  const { user } = useAuth()
  const [items, setItems] = useState<NotificationEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!user) return
    fetch(`${API_BASE}notification/${user.userId}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((resp) => resp.json())
      .then((json: { data?: NotificationEntry[] }) => setItems(json.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  const handleSelect = (item: NotificationEntry) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setSelectedId(item.id)

    if (item.status === 0 && user) {
      timerRef.current = setTimeout(() => {
        fetch(`${API_BASE}notification/${item.id}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
        })
          .then((resp) => resp.json())
          .then(() => {
            setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, status: 1 } : n)))
          })
          .catch(() => {})
      }, 5000)
    }
  }

  if (!user) return null

  return (
    <div className="appCenter" style={{ justifyContent: loading ? 'center' : 'flex-start' }}>
      {loading && <Spinner />}
      {!loading &&
        items.map((item) => (
          <NotificationRow
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={() => handleSelect(item)}
          />
        ))}
    </div>
  )
}
