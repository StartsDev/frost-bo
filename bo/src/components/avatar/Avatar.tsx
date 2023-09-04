import styles from "./avatar.module.css"
import avatarimg from "../../assets/user.png"
import { THEME } from "../../theme"

function Avatar({ image = ""}: { image?: string }) {
  return (
    <div
        style={{ backgroundColor: THEME.blue }}
        className={styles?.wrapper}
    >
        <img 
          src={
            image === "" ? avatarimg : image 
          } 
          alt="avatar user"  
          className={styles?.img}
        />
    </div>
  )
}

export default Avatar