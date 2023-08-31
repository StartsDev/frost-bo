import styles from "./login.module.css"
import Logo from "../../assets/logo.jpeg"
import { THEME } from "../../theme"

function Login() {
  return (
    <section
      className={styles.login}
    >
      <div
        className={styles.wrapper}
      >
        <img src={Logo} alt="logo" width={100} height={80}  />
        <h3 className={styles.title} >Bienvenido</h3>
        <div className={styles.inputsContainer} >
            <div>
              <label>Usuario</label>
              <input type="text" placeholder="Usuario" />
            </div>
            <div>
              <label>Contraseña</label>
              <input type="password" placeholder="Contraseña" />
            </div>
            <div>
              <p>¿Olvidaste tu contraseña?</p>
            </div>
            <button  style={{ backgroundColor: THEME.blue }} >Login</button>
        </div>
      </div>
    </section>
  )
}

export default Login