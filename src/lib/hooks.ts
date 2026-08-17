import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useMessage } from '../context/MessageContext'
import { API_BASE, fetchWithTimeout } from './api'
import type { ApiListItem, HistoryEntry, Option, Professional } from '../types'

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

export const useAddWeightEntry = () => {
  const { user, updateVitals } = useAuth()
  const showMessage = useMessage()
  const [saving, setSaving] = useState(false)

  const addWeight = useCallback(
    async (weight: number, height: number): Promise<HistoryEntry | null> => {
      if (!user) return null
      const day = new Date().toISOString()
      setSaving(true)
      try {
        const resp = await fetchWithTimeout(`${API_BASE}history/${user.userId}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ weight, height, day }),
        })

        if (!resp || resp.status >= 400) {
          showMessage('Não foi possível registrar o peso agora. Tente novamente mais tarde.', 'error')
          return null
        }

        updateVitals(weight, height)
        showMessage('Peso registrado com sucesso.', 'success')
        return { weight, height, day }
      } finally {
        setSaving(false)
      }
    },
    [user, updateVitals, showMessage],
  )

  return { addWeight, saving }
}
