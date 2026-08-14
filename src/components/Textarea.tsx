import type { TextareaHTMLAttributes } from 'react'

export const Textarea = ({ className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={`inputField ${className}`.trim()} {...rest} />
)
