import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  caption: string
  className?: string
}

export const Button = ({ caption, className = 'splashOption', ...rest }: ButtonProps) => (
  <button type="button" className={className} {...rest}>
    <p>{caption}</p>
  </button>
)
