import styles from "./avatar.module.css"
import { THEME } from "../../theme"
import { useState } from 'react';
import { PhotoSelector } from "../photoSelector/PhotoSelector";

interface Props {
  id: string
  userProfileImage: string
}

function Avatar({id, userProfileImage}: Props) {
  const [menu, setMenu] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string>(userProfileImage)

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("key")
    window.location.reload()
  }

  return (
    <>
    <div
        style={{ backgroundColor: THEME.blue }}
        className={styles?.wrapper}
    >
        <img 
          src={
            profilePicture === "" ? userProfileImage : profilePicture 
          } 
          alt="avatar user"  
          className={styles?.img}
          onClick={()=> setMenu(!menu)}
        />
    </div>
    <div className={`${styles.menuElement} ${menu ? styles.visible : ''}`}>
      <div className={styles.logoutButton} >
        {/* <span className={styles.optionMenu}>Cambiar foto de perfil</span> */}
        <PhotoSelector setImage={setProfilePicture} setMenu={setMenu} id={id}/>
        <span className={styles.optionMenu} onClick={()=> logout()}>Cerrar Sesión</span>
      </div>
    </div>
    </>
  )
}

export default Avatar