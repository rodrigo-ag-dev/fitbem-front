import type { ReactNode } from 'react'
import { Logo } from './Logo'

interface FormScreenProps {
  title: string
  texts?: ReactNode[]
  children: ReactNode
}

export const FormScreen = ({ title, texts = [], children }: FormScreenProps) => (
  <div>
    <div className="screenTop">
      <Logo size={52} variant="white" />
      <p className="title">{title}</p>
      {texts.map((text, index) => (
        <p className="text" key={index}>
          {text}
        </p>
      ))}
    </div>
    <div className="screenBottom">{children}</div>
  </div>
)
