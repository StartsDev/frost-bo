import React, { CSSProperties } from 'react'
import formStyles from './form.module.css'

interface Props {
  name: string
  type: string
  value: string
  placeholder: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  required?: boolean
  styleInput?: CSSProperties
  rowStyle?: CSSProperties
  disabled?: boolean
}

export const Input = ({name, type, value, label, placeholder, required = true, styleInput, rowStyle, disabled=false, onChange}: Props) => {
  return (
    <div className={formStyles.formRow} style={rowStyle}>
      <label htmlFor={name} className={formStyles?.formLabel} style={styleInput}>{label}</label>
        <input
          className={formStyles?.formInput}
          value={value}
          style={styleInput}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
    </div>
  )
}
