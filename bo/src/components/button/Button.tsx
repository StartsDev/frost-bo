import styles from "./button.module.css"
import { THEME } from "../../theme"

interface Props {
    text: string
    w?: number
    h?: number
    action: () => void
}

function Button({ text, action, w = 100, h = 40 }: Props) {
  return (
    <button
        className={styles?.button}
        style={{width: w, height: h, backgroundColor: THEME.blue, color: THEME.white}}
        onClick={action}
    >
        {text}
    </button>
  )
}

export default Button