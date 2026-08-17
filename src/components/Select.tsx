import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import type { Option } from '../types'
import { colorFor, initialsFor } from '../lib/textColor'

interface SelectProps {
  options: Option[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

export const Select = ({ options, value, defaultValue, onChange, className = '', disabled }: SelectProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? (options[0] ? String(options[0].value) : ''))
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const currentValue = value !== undefined ? value : internalValue
  const selected = options.find((option) => String(option.value) === String(currentValue))

  useEffect(() => {
    if (!open) return
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const idx = options.findIndex((option) => String(option.value) === String(currentValue))
    setActiveIndex(idx >= 0 ? idx : 0)
    // only sync the highlighted option when the dropdown transitions to open
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const selectOption = (option: Option) => {
    const nextValue = String(option.value)
    if (value === undefined) setInternalValue(nextValue)
    onChange?.(nextValue)
    setOpen(false)
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false)
  }

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (disabled) return
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((idx) => Math.min(idx + 1, options.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((idx) => Math.max(idx - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const option = options[activeIndex]
      if (option) selectOption(option)
    }
  }

  return (
    <div className={`iconSelect ${className}`.trim()} data-open={open} ref={rootRef} onBlur={handleBlur}>
      <button
        type="button"
        className="iconSelectTrigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        {selected ? (
          <span
            className="iconSelectAvatar"
            style={{ backgroundColor: colorFor(selected.text).bg, color: colorFor(selected.text).fg }}
          >
            {initialsFor(selected.text)}
          </span>
        ) : (
          <span className="iconSelectAvatar iconSelectAvatarEmpty" />
        )}
        <span className="iconSelectLabel">{selected ? selected.text : ''}</span>
        <svg className="iconSelectChevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul className="iconSelectDropdown" role="listbox" id={listId} tabIndex={-1} onKeyDown={handleListKeyDown}>
          {options.length === 0 && <li className="iconSelectEmpty">Nenhuma opção</li>}
          {options.map((option, index) => {
            const isSelected = String(option.value) === String(currentValue)
            const color = colorFor(option.text)
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-active={index === activeIndex}
                  className="iconSelectOption"
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  <span className="iconSelectOptionAvatar" style={{ backgroundColor: color.bg, color: color.fg }}>
                    {initialsFor(option.text)}
                  </span>
                  <span className="iconSelectOptionLabel">{option.text}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
