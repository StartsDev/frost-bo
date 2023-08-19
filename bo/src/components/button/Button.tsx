import styles from "./button.module.css"
import { THEME } from "../../theme"

interface Props {
    text: string
    w?: number
    h?: number
    action?: () => void | undefined
    bg?: 'primary' | 'secondary',
}

function Button({ text, action, w = 100, h = 40, bg}: Props) {
  return (
    <button
        className={styles?.button}
        style={{
          width: w, 
          height: h, 
          backgroundColor: bg === 'primary' ? THEME.blue : THEME.white, 
          color: bg === 'primary' ? THEME.white : THEME.blue
        }}
        onClick={action}
    >
        {text}
    </button>
  )
}

export default Button