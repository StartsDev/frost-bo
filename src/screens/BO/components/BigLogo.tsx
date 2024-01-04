import styles from "./bigLogo.module.css"
import logoimg from "../../../assets/logo.png"
import { THEME } from "../../../theme"
import React from "react";

function BigLogo() {
    return(
        <div
         style={{ backgroundColor: THEME.white }}
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

export default BigLogo;