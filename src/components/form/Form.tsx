import {CSSProperties } from 'react'
import styles from "./form.module.css";

export interface Fields {
  name: string
  type: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string
  placeholder?: string
  value?: string
  style?: CSSProperties
  styleInput?: CSSProperties
  rowStyle?: CSSProperties
  required?: boolean
  disabled?: boolean
}

type Props = {
  fields: Fields[]
  action: () => void
  btnText: string
  error?: boolean | unknown
}

function Form({ fields, action, btnText, error = false }: Props){
  return (
    <div
        className={styles?.container}
        style={{
            width: "100%",
            height: "100%",
            padding: "1rem 1rem",
            overflowY: "scroll",
        }}
    >
      {fields.map((field, index) => (
        <div key={index} className={styles?.formRow} style={field.style}>
          <label htmlFor={field.name} className={styles?.formLabel}>{field.label}</label>
          <input
            className={styles?.formInput}
            value={field.value}
            type={field.type}
            name={field.name}
            onChange={field.onChange}
            placeholder={field.placeholder}
            required={false}
          />
        </div>
      ))}
      {
        error ? null :
        <div className={styles?.buttonContainer}>
          <button onClick={action}>{btnText}</button>
        </div>
      }
    </div>
  );
}

export default Form;
