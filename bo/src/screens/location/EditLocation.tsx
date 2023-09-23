import { useState, useMemo, CSSProperties } from 'react';
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { useFetcher } from "../../hooks/useFetcher";
import { ToastContainer, toast } from 'react-toastify';
import styles from '../headsquare/headQuarters.module.css'
import formStyles from "../../components/form/form.module.css";
import { Input } from "../../components/form/Input";
import Loader from "../../components/Loader/Loader";
import { THEME } from '../../theme';
import { Client, ClientResponse, Headquarter, Location } from '../../types';

const fields: Fields[] = [
  {
    name: "locationName",
    type: "text",
    label: "Nombre de la ubicación",
    placeholder: "Nombre ubicación"
  },
  {
    name: "description",
    type: "text",
    label: "Descripción",
    placeholder: "ingrese una breve descripción",
    required: false

  }
];

function EditLocation() {

  const { data, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [headQuarterList, setHeadQuarterList] = useState<Headquarter[]>([])
  const [locationList, setLocationList] = useState<Location[]>([])
  const [customerSelected, setCustomerSelected] = useState<Client>()
  const [location, setLocation] = useState({
    locationName:"",
    id:"",
    headquarterId:"",
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(prevLocation => ({
      ...prevLocation,
      [event.target.name]: event.target.value
    }));
  }

  const handleChangeInputCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.name === 'clientId'){
      console.log('entre primer input');
      const customerToEdit:Client = data?.clients.find(client => client.id === event.target.value) as never
      setCustomerSelected(customerToEdit)
      setHeadQuarterList(customerToEdit.headquarters)
      // setLocationList(customerToEdit.locations)
    }
    if(event.target.name === 'id'){
      const locationsData: Location[] = customerSelected?.locations.filter(e => e.headquarterId === event.target.value) as never
      setLocationList(locationsData)
      setLocation({
        ...location,
        headquarterId: event.target.value
      })
    }
    if(event.target.name === 'locationName') {
      const locationSelected: Location =  customerSelected?.locations.find((e: Location) => e.locationName === event.target.value) as never
      setLocation(locationSelected)
    }
  }

  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(`${ENDPOINT.location.update}${location.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(location)
    }).then((res) => {
      if(!res.ok) {
        toast.error('La ubicación no pudo ser modificada, por favor consulte con el administrador')
      }
      return res.json()
    }).then((data) => {
      if(!data.success) {
        toast.error(data.msg)
      } else {
        toast.success(`La ubicación ${location.locationName} ha sido modificada con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setLocation({
        id: "",
        headquarterId: "",
        locationName: "",
        description: '',
      })
    })
  }

  return (
    <View>
        <ToastContainer />
        {
          isLoading || loading ? <Loader/> :
          <>
            <p style={componentStyles.description}>En este formulario podra modificar los datos de una ubicación, para tal fin debe seleccionar un cliente y una de sus sedes</p>
            <div className={styles.selectContainer} style={{marginLeft: 33}}>
              <label htmlFor="" className={styles.labelStyle}>Seleccione el cliente</label>
              <select name="clientId" id="" className={styles.formInput} onChange={(e)=> handleChangeInputCustomer(e as never)}>
                <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
                {data?.clients?.map((client: Client, index: number) =>(
                  <option key={index} value={client.id}>{client.businessName}</option>
                ))}
                
              </select>
            </div>
            {
              <div className={styles.selectContainer} style={{marginLeft: 33}}>
                <label htmlFor="" className={styles.labelStyle}>Seleccione una sede</label>
                <select name="id" id="" className={styles.formInput} onChange={(e)=> handleChangeInputCustomer(e as never)}>
                  <option value="" style={{color: 'grey'}}>Seleccione un cliente</option>
                  {headQuarterList.map((e: Headquarter, index: number) =>(
                    <option key={index} value={e.id}>{e.headName}</option>
                  ))}
                  
                </select>
              </div>
            }
            {
              location.headquarterId.length > 0  && locationList.length > 0 &&
              <>
                <div className={styles.selectContainer} style={{marginLeft: 33, marginTop: 10}}>
                  <label htmlFor="" className={styles.labelStyle}>Seleccione la sede a modificar </label>
                  <select name="locationName" id="" className={styles.formInput} onChange={(e) => handleChangeInputCustomer(e as never)}>
                      <option value='' style={{color: 'grey'}}>Seleccione una sede</option>
                      {locationList?.map((e: Location, index: number) =>(
                        <option key={index} value={e.locationName}>{e.locationName}</option>
                      ))}
                      
                  </select>
                </div>
                <form onSubmit={(e)=>sendData(e as never)} style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1rem 1rem', justifyContent: 'space-between', overflowY: "scroll",}}>
                  {fields.map((field)=> (
                    <Input
                      key={field.name} 
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder ?? ''}
                      onChange={handleChange}
                      required={field.required}
                      styleInput={field.style}
                      rowStyle={field.rowStyle}
                      value={location[field.name]}
                    />
                  ))}
                  <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                    <button type='submit'>Modificar cliente</button>
                  </div>
                </form>
              </>
              
            }
          </>
        }
        {location.headquarterId.length > 0  && locationList.length === 0 && 
          // isLoading || loading ? <Loader/> : 
          <p style={componentStyles.description}>Estimado Administrador, el cliente no tiene ubicaciones creadas</p>
          
        }
    </View>
  )
}

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

export default EditLocation