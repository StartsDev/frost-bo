import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "./login.module.css"
import Logo from "../../assets/logo.jpeg"
import { THEME } from "../../theme"
import { ENDPOINT } from "../../config"
import { Session } from "../../types"

function Login() {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    numIdent: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const onSubmit = () => {
    
    setIsError(false)
    setIsLoading(true)

    fetch(`${ENDPOINT.auth.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    }).then((res) => {
      setIsLoading(true)
      if (res.ok) {
        return res.json()
      }
      if (res.status === 400) {
        setIsError(true)
      }
    })
    .then((data: Session) => {
      if (data.success === false) {
        setIsError(true)
      } else {
        localStorage.setItem("key", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("bo", { replace: true })
      }
    })
    .catch(() => {
      setIsError(true)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

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
              <input
                type="text"
                placeholder="Usuario"
                onChange={handleChange}
                name="numIdent"
                value={login.numIdent}
              />
              {
                isError && (
                  <p className={styles.error}>Usuario o contraseña incorrectos</p>
                )
              }
            </div>
            <div>
              <label>Contraseña</label>
              <input  
                type="password"
                placeholder="Contraseña"
                onChange={handleChange}
                name="password"
                value={login.password}
              />
            </div>
            <div>
              <p>¿Olvidaste tu contraseña?</p>
            </div>
            <button
              onClick={() => {
                setLogin({
                  numIdent: "",
                  password: "",
                })
                onSubmit()
              }} 
              style={{ backgroundColor: THEME.blue }}
              disabled={isLoading}
                
            >
              {isLoading ? "....." : "Ingresar"}
            </button>
        </div>
      </div>
    </section>
  )
}

export default Login