import type { ReactNode } from 'react'

interface ScreenProps {
  leftClassName?: string
  rightClassName?: string
  formSide: 'left' | 'right'
  form: ReactNode
}

export const Screen = ({ leftClassName, rightClassName, formSide, form }: ScreenProps) => (
  <div className="screen">
    <div className={`screenLeft${leftClassName ? ` ${leftClassName}` : ''}`}>
      {formSide === 'left' ? form : null}
    </div>
    <div className={`screenRight${rightClassName ? ` ${rightClassName}` : ''}`}>
      {formSide === 'right' ? form : null}
    </div>
  </div>
)
