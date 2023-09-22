/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, CSSProperties } from 'react';
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { useFetcher } from "../../hooks/useFetcher";
import styles from './headQuarters.module.css'
import { THEME } from '../../theme';
import { showError } from '../../helpers';
import Loader from '../../components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClientResponse } from '../../types';

const fields = [
  {
    name: "headName",
    type: "text",
    label: "Nombre de la sede",
    placeholder: "Ingrese nombre de la Sede"
  },
  {
    name: "address",
    type: "text",
    label: "Dirección de la sede",
    placeholder: "Ingrese dirección de la sede"
  },
  {
    name: "email",
    type: "email",
    label: "Email sede",
    placeholder: "Ingrese email de la sede"
  },
  {
    name: "phone",
    type: "number",
    label: "Teléfono sede",
    placeholder: "Ingrese teléfono de la sede"
  }
];

function AddHeadSquare() {

  const [square, setSquare] = useState({
    headName: "",
    address: "",
    email: "",
    phone: "",
    clientId: ""
  })
  
  const { data, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [isLoading, setIsLoading] = useState(loading)


  const nameChange = (info: string) => {
    switch (info) {
      case 'headName':
        return 'Nombre de la sede';    
      case 'address':
        return 'Dirección de la sede';        
      case 'email':
        return 'Email de la sede';    
      case 'phone':
        return 'Teléfono de la sede';    
      default:
        break;
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSquare(prevHeadQuarter => ({
      ...prevHeadQuarter,
      [event.target.name]: event.target.value
    }));
  }

  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

  const sendData = () => {
    setIsLoading(true)
    fetch(`${ENDPOINT.squares.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(square)
    }).then((res) => {
      if(!res.ok) {
        toast.error('La sede no pudo ser creado, por favor consulte con el administrador')
      } else {
        toast.success(`La sede ${square.headName} ha sido creado con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setSquare({
        address: "",
        email: "",
        headName: "",
        phone: "",
        clientId: ""
      })
    })
  }

  return (
    <View>
      <ToastContainer />
      { isLoading ? <Loader/> :
        <>
          <p style={componentStyles.description}>En esta sección podra crear una sede asociada a un cliente para la operacion de los mantenimientos</p>
          <div className={styles.selectContainer} style={{marginLeft: 33}}>
            <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
            <select name="clientId" id="" className={styles.formInput} onChange={(e)=> handleChange(e as never)}>
              <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
              {data?.clients?.map((client: any, index: any) =>(
                <option key={index} value={client.id}>{client.businessName}</option>
              ))}
              
            </select>
          </div>
          {
            square.clientId.length === 0 
            ? 
            <p style={componentStyles.description}>Estimado Administrador, por favor seleccione un cliente a quien asociarle una sede</p>
            :
            <>
              <Form
                  fields={fieldsWithEvent}
                  action={() => sendData()}
                  btnText="Crear sede"
                  error={showError(square, nameChange)}
              />
              {showError(square, nameChange)}
            </>
          }
        </>
      }
    </View>
  )
}


export default AddHeadSquare


interface ComponentStyles {
  description: CSSProperties;
}

const componentStyles: ComponentStyles = {
  description: {
    width:"100%",
    marginLeft:30,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    color: THEME.secondary
  }
}