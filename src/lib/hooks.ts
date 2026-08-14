import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_BASE } from './api'
import type { ApiListItem, Option, Professional } from '../types'

export const useSelectOptions = (endpoint: string, mapOption: (item: ApiListItem) => Option) => {
  const { user } = useAuth()
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    if (!user) return

    let active = true
    fetch(`${API_BASE}${endpoint}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((resp) => resp.json())
      .then((json: { data?: ApiListItem[] }) => {
        if (active && json.data) setOptions(json.data.map(mapOption))
      })
      .catch(() => {})

    return () => {
      active = false
    }
    // mapOption is stable per call site; only refetch when the user/endpoint changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, endpoint])

  return options
}

export const useProfessionals = (endpoint: string) => {
  const { user } = useAuth()
  const [data, setData] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    let active = true
    setLoading(true)
    fetch(`${API_BASE}${endpoint}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((resp) => resp.json())
      .then((json: { data?: Professional[] }) => {
        if (active) setData(json.data ?? [])
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [user, endpoint])

  return { data, loading }
}
