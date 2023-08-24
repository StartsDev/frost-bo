import styles from "./avatar.module.css"
import avatarimg from "../../assets/user.png"
import { THEME } from "../../theme"

function Avatar() {
  return (
    <div
        style={{ backgroundColor: THEME.blue }}
        className={styles?.wrapper}
    >
        <img src={avatarimg} alt="avatar user"  className={styles?.img} />
    </div>
  )
}

export default Avatar