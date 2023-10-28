import styles from "./input.module.css"

interface Props {
    placeholder: string
    type: string 
    w?: number
    h?: number
    onChange: () => void
}

function Input({ onChange, placeholder,type,h = 40,w = 120 }: Props) {
  return (
    <input
        style={{
            width: w, height: h
        }}
        className={styles?.input}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
    />
  )
}

export default Input