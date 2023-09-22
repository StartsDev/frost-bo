import { useState, useMemo, CSSProperties } from 'react';
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { useFetcher } from "../../hooks/useFetcher";
import { Client, ClientResponse, Headquarter } from "../../types";
import { THEME } from '../../theme';
import Loader from '../../components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showError } from '../../helpers';
import styles from './location.module.css'

const fields = [
  {
    name: "locationName",
    type: "text",
    label: "Nombre de ubicación",
    placeholder: "Ingrese el nombre que tendra la ubicación"
  },
  {
    name: "description",
    type: "text",
    label: "Descripción de la ubicación",
    placeholder: "Ingrese una breve descripción de la ubicación"
  }
];

function AddLocation() {

  const { data, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [location, setLocation] = useState({
    locationName:"",
    description:"",
    headquarterId:"",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [customerHeadquarter, setCustomerHeadquarter] = useState<Headquarter[]>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(prevLocation => ({
      ...prevLocation,
      [event.target.name]: event.target.value
    }));
  }

  const getHeadQuarterCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customer: Client = data?.clients.find((client: Client) => client.id === e.target.value )
    setCustomerHeadquarter(customer.headquarters)
  }



  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

console.log(location);

  const nameChange = (info: string) => {
    switch (info) {
      case 'locationName':
        return 'Nombre de la ubicación';    
      case 'description':
        return 'Descripción de la ubicación';           
      default:
        break;
    }
  }

  const sendData = () => {
    setIsLoading(true)
    fetch(`${ENDPOINT.location.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(location)
    }).then((res) => {
      if(!res.ok) {
        toast.error('La ubicación no pudo ser creada, por favor consulte con el administrador')
      } else {
        toast.success(`La ubicación ${location.locationName} ha sido creada con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setLocation({
        locationName: "",
        description: "",
        headquarterId: "",
      })
    })
  }

  return (
    <View>
      <ToastContainer />
      { isLoading ? <Loader/> :
        <>
          <p style={componentStyles.description}>En esta sección podra crear una ubicación correspondientes a una sede del cliente</p>
          <div className={styles.selectContainer} style={{marginLeft: 33}}>
            <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
            <select name="clientId" id="" className={styles.formInput} onChange={(e)=> {getHeadQuarterCustomer(e as never)}}>
              <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
              {data?.clients?.map((client: Client, index: number) =>(
                <option key={index} value={client.id}>{client.businessName}</option>
              ))}
              
            </select>
          </div>
          {
            customerHeadquarter && customerHeadquarter?.length > 0 &&
            <div className={styles.selectContainer} style={{marginLeft: 33, marginTop: 20}}>
              <label htmlFor="" className={styles.labelStyle}>Seleccione una sede</label>
              <select name="headquarterId" id="" className={styles.formInput} onChange={(e)=> handleChange(e as never)}>
                <option value="" style={{color: 'grey'}}>Escoja una sede</option>
                {customerHeadquarter?.map((headQuarter: Headquarter, index: number) =>(
                  <option key={index} value={headQuarter.id}>{headQuarter.headName}</option>
                ))}
                
              </select>
            </div>  
          }
          {
            customerHeadquarter?.length === 0 && 
            <p style={{...componentStyles.description, color: THEME.red}}>El cliente seleccionado no tiene sedes creadas, por favor cree una sede para este cliente</p>
          }
          {
            customerHeadquarter?.length === 0 ? null :
            
            location.headquarterId.length === 0
            ? 
            <p style={componentStyles.description}>Estimado Administrador, por favor seleccione una sede al cual asociar la ubicación</p>
            :
            <>
              <Form
                  fields={fieldsWithEvent}
                  action={() => sendData()}
                  btnText="Crear ubicación"
                  error={showError(location, nameChange)}
              />
              {showError(location, nameChange)}
            </>
          }
        </>
      }
    </View>
  )
}

export default AddLocation

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