import styles from "./login.module.css"
import Logo from "../../assets/logo.jpeg"
import { THEME } from "../../theme"

function Login() {
  return (
    <div
        className={styles.wrapper}
    >
        <img src={Logo} alt="logo" width={100} height={80}  />
        <h3 className={styles.title} >Iniciar Sesión</h3>
        <div className={styles.inputsContainer} >
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <button  style={{ backgroundColor: THEME.blue }} >Login</button>
        </div>
    </div>
  )
}

export default Login