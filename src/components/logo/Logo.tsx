import styles from "./logo.module.css"
import logoimg from "../../assets/logo.png"
import { THEME } from "../../theme"
import React from "react"

function Logo({ image = ""}: { image: string }) {
  return (
    <div
        style={{ backgroundColor: THEME.blue }}
        className={styles?.wrapper}
    >
        <img 
          src={
            logoimg 
          } 
          alt="logo"  
          className={styles?.img}
        />
    </div>
  )
}

export default Logo