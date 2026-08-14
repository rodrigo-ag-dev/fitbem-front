import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = '', style, type = 'text', ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      className={`inputField ${className}`.trim()}
      style={
        icon
          ? {
              paddingRight: 15,
              backgroundImage: `url("${icon}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundColor: 'var(--input-bgcolor)',
              backgroundOrigin: 'content-box',
              backgroundSize: '32px',
              ...style,
            }
          : style
      }
      {...rest}
    />
  ),
)

Input.displayName = 'Input'
