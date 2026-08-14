import type { SelectHTMLAttributes } from 'react'
import type { Option } from '../types'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
}

export const Select = ({ options, className = '', ...rest }: SelectProps) => (
  <select className={`comboField ${className}`.trim()} {...rest}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </select>
)
