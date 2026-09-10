import { Check, ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'

type SelectOption = {
  label: string
  value: string
}

type SelectDropdownProps = {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
}

function SelectDropdown({
  label,
  value,
  options,
  onChange,
  className = '',
}: SelectDropdownProps) {
  const getSelectedIndex = () => {
    const index = options.findIndex((option) => option.value === value)
    return index >= 0 ? index : 0
  }

  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(getSelectedIndex)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const openDropdown = () => {
    setActiveIndex(getSelectedIndex())
    setIsOpen(true)
  }

  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      openDropdown()
    }
  }

  const selectOption = (index: number) => {
    const option = options[index]

    if (!option) return

    onChange(option.value)
    setActiveIndex(index)
    setIsOpen(false)

    buttonRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()

        if (!isOpen) {
          openDropdown()
          return
        }

        setActiveIndex((current) =>
          current >= options.length - 1 ? 0 : current + 1,
        )
        break

      case 'ArrowUp':
        event.preventDefault()

        if (!isOpen) {
          openDropdown()
          return
        }

        setActiveIndex((current) =>
          current <= 0 ? options.length - 1 : current - 1,
        )
        break

      case 'Home':
        event.preventDefault()

        if (!isOpen) {
          openDropdown()
          return
        }

        setActiveIndex(0)
        break

      case 'End':
        event.preventDefault()

        if (!isOpen) {
          openDropdown()
          return
        }

        setActiveIndex(options.length - 1)
        break

      case 'Enter':
      case ' ':
        event.preventDefault()

        if (!isOpen) {
          openDropdown()
        } else {
          selectOption(activeIndex)
        }
        break

      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        break

      case 'Tab':
        setIsOpen(false)
        break

      default:
        break
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={`relative min-w-0 w-full ${className}`}
    >
      <span className="sr-only">{label}</span>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-between
          gap-3
          rounded-xl
          border
          border-gray-200
          bg-[#FAFAF8]
          px-4
          py-3
          text-left
          text-sm
          font-medium
          text-gray-700
          outline-none
          transition
          hover:border-gray-300
          focus:border-[#D9A514]
          focus:ring-4
          focus:ring-[#F5C542]/15
        "
      >
        <span className="min-w-0 truncate">
          {selectedOption?.label}
        </span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`
            shrink-0
            text-gray-500
            transition-transform
            duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+8px)]
            z-50
            w-full
            min-w-0
            max-w-full
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          <ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="max-h-64 overflow-y-auto p-1.5"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value
              const isActive = index === activeIndex

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                >
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectOption(index)}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      transition
                      ${
                        isActive
                          ? 'bg-[#FFF4C7] text-[#715A08]'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="min-w-0 truncate">
                      {option.label}
                    </span>

                    {isSelected && (
                      <Check
                        size={17}
                        aria-hidden="true"
                        className="shrink-0 text-[#B38708]"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SelectDropdown