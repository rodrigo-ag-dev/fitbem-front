export interface Professional {
  description: string
  city: string
  whatsapp: string
  specialty: string
  category: string
}

export interface HistoryEntry {
  weight: number
  height: number
  day: string
}

export interface NotificationEntry {
  id: number
  type: number
  message: string
  day: string
  status: number
}

export interface Option {
  value: string | number
  text: string
}

export interface ApiListItem {
  id?: number
  description?: string
  state?: string
}
