import styles from "./logo.module.css"
import logoimg from "../../assets/logo.jpeg"
import { THEME } from "../../theme"

function Logo({ image = ""}: { image?: string }) {
  return (
    <div
        style={{ backgroundColor: THEME.blue }}
        className={styles?.wrapper}
    >
        <img 
          src={
            image === "" ? logoimg : image 
          } 
          alt="logo"  
          className={styles?.img}
        />
    </div>
  )
}

export default Logo