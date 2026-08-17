import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

interface ToastMessage {
  id: number
  text: string
  type: string
}

type ShowMessage = (text: string, type?: string) => void

const MessageContext = createContext<ShowMessage | null>(null)

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }, [])

  const showMessage = useCallback<ShowMessage>((text, type = 'error') => {
    const id = ++nextId.current
    setMessages((prev) => [...prev, { id, text, type }])
    setTimeout(() => dismiss(id), 3500)
  }, [dismiss])

  return (
    <MessageContext.Provider value={showMessage}>
      {children}
      {messages.map((message) => (
        <div key={message.id} className={`toast ${message.type}`}>
          <strong>{message.type === 'success' ? 'Pronto!' : 'Aviso!'}</strong>
          <p>{message.text}</p>
          <span className="closebtn" onClick={() => dismiss(message.id)}>X</span>
        </div>
      ))}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  const ctx = useContext(MessageContext)
  if (!ctx) throw new Error('useMessage must be used within MessageProvider')
  return ctx
}
