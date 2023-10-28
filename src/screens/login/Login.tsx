import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "./login.module.css"
import Logo from "../../assets/logo.jpeg"
import { THEME } from '../../theme';
import { ENDPOINT } from "../../config"
import { Session } from "../../types"
import Loader from "../../components/Loader/Loader";


function Login() {

  const navigate = useNavigate()

  const [login, setLogin] = useState({
    numIdent: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState({
    numIdent: '',
    password: ''
  })

  const onSubmit = () => {

    if(login.numIdent === '' || login.password === ''){
      // setIsError(true)
      setErrorMessage({
        numIdent: 'Este campo no puede estar vacio',
        password: 'Este campo no puede estar vacio'
      })
      return
    }
    
    setIsError(false)
    setIsLoading(true)
    setErrorMessage({numIdent: '', password: ''})

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
    <>
    
      <section
        className={styles.login}
      >
        {isLoading ? <div className={styles.loaderContainer}><Loader/></div> :
        <div
          className={styles.wrapper}
        >
          <img src={Logo} alt="logo" width={100} height={80}  />
          <h3 className={styles.title} style={{color: THEME.primary}}>Bienvenido</h3>
          <div className={styles.inputsContainer} >
              <div>
                <label>Identificación</label>
                <input
                  type="text"
                  placeholder="Numero de identificación"
                  onChange={handleChange}
                  name="numIdent"
                  value={login.numIdent}
                />
                {
                errorMessage.numIdent.length > 0 && (
                      <p className={styles.error} style={{fontSize: 12}}>{errorMessage.numIdent}</p>
                  )
                }
                {
                  isError && (
                    <p className={styles.error} style={{fontSize: 12}}>Usuario o contraseña incorrectos</p> 
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
                {
                  errorMessage.password && (
                    <p className={styles.error} style={{fontSize: 12}}>{errorMessage.password}</p>
                  )
                }
              </div>
              <div>
                <p style={{fontSize: 12}}>¿Olvidaste tu contraseña?</p>
              </div>
              <button
                onClick={() => {
                  // setLogin({
                  //   numIdent: "",
                  //   password: "",
                  // })
                  onSubmit()
                }} 
                style={{ backgroundColor: THEME.blue }}
                disabled={isLoading}
                  
              >
                {isLoading ? "....." : "Ingresar"}
              </button>
          </div>
        </div>
        }
      </section>
    </>
  )
}

export default Login