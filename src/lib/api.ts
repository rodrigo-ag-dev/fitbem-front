export const API_BASE = 'https://czwfn73q-5037.brs.devtunnels.ms/api/'

interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number
}

export const fetchWithTimeout = async (resource: string, options: FetchWithTimeoutOptions = {}) => {
  const { timeout = 8000, ...rest } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  try {
    return await fetch(resource, { ...rest, signal: controller.signal })
  } catch {
    return null
  } finally {
    clearTimeout(id)
  }
}
