'use client'

import React, { useState } from 'react'

interface AnimatedInputProps {
  type: string
  name: string
  label: string
  required?: boolean
  textarea?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const AnimatedInput = ({
  type,
  name,
  label,
  required = false,
  textarea = false,
  value,
  onChange
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const InputComponent = textarea ? 'textarea' as const : 'input' as const

  return (
    <div className="relative group mb-6">
      <InputComponent
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={textarea ? 4 : undefined}
        className={`
          peer w-full bg-transparent border-b-2 border-gray-300 py-2 px-1
          transition-all duration-300 ease-in-out
          placeholder-transparent
          focus:outline-none focus:border-primary
          ${textarea ? 'resize-none' : ''}
        `}
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-1 transition-all duration-300 ease-in-out
          ${isFocused || value
            ? '-top-6 text-sm text-primary'
            : 'top-2 text-gray-500'
          }
          peer-focus:-top-6 peer-focus:text-sm peer-focus:text-primary
          cursor-text
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 origin-center group-hover:scale-x-100" />
    </div>
  )
}

export default AnimatedInput 