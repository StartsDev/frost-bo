import { useState, CSSProperties } from 'react';
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { SelectInput } from "../../components/input/SelectInput"
import { useFetcher } from "../../hooks/useFetcher"
import { Client, ClientResponse, EquiomentPayload, Equipment, EquipmentRes, Headquarter, Location, MainResponse, Maintenance, userResponse } from "../../types"
import { Input } from "../../components/form/Input"
import formStyles from "../../components/form/form.module.css";
import style from './maintenance.module.css'
import inputStyle from '../../components/input/select.module.css'
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../components/Loader/Loader"
import { THEME } from '../../theme';


const fields:Fields[]= [
  {
    name: "name",
    type: "text",
    label: "Nombre del Equipo",
    placeholder: "Escribe el nombre del equipo"
  },
  {
    name: "description",
    type: "text",
    label: "Descripción del Equipo",
    placeholder: "Escriba una breve descripción del equipo"
  },
  {
    name: "serial",
    type: "text",
    label: "Serial del Equipo",
    placeholder: "Escriba el serial del equipo"
  },
  {
    name: "model",
    type: "text",
    label: "Modelo del Equipo",
    placeholder: "Escriba el modelo del equipo"
  },
  {
    name: "brand",
    type: "text",
    label: "Marca del Equipo",
    placeholder: "Escriba la marca del equipo"
  },
]


interface Props {
  isEditable: boolean
}

function AddEquipment({isEditable = false}: Props) {
  
  
  // const { data: equipToModify} = useFetcher<Equipment[]>({method: "GET", url: ENDPOINT.auth.users})
  const { data: customerData, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [equipment, setEquipment] = useState<EquiomentPayload>({
    id: '', 
    name: '',
    description: '',
    type: '',
    model: '',
    serial: '',
    brand: '',
    image: '',
    locationId: ''
  })
  const [customerSelected, setCustomerSelected] = useState<Client>()
  const [headQuarter, setHeadQuarter] = useState<Headquarter[]>()
  const [locationList, setLocationList] = useState<Location[]>()
  const [equipmentList, setEquipmentList] = useState<Equipment[]>()
  // const typesEquipoment = ['BOMBAS',"MINISPLIT, CENTRAL, PISOTECHO, CASSETTE", "TORRES" ]
  
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipment(prevEquip => ({
      ...prevEquip,
      [event.target.name]: event.target.value
    }));
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "businessName") {
      const customerSelected: Client = customerData?.clients.find((c: Client) => c.id === e.target.value) as never
      setCustomerSelected(customerSelected)
      setHeadQuarter(customerSelected.headquarters)
      // setEquipment({
      //   ...equipment,
      //   locationId: e.target.value
      // })
    }
    if(e.target.name === 'headId'){
      const locationsData: Location[] = customerSelected?.locations.filter(l => l.headquarterId === e.target.value) as never
      setLocationList(locationsData)
    }
    if(e.target.name === 'locationId') {
      const equipmentData: Equipment[] = customerSelected?.equipments.filter(p => p.locationId === e.target.value) as never
      setEquipmentList(equipmentData)
      setEquipment({
        ...equipment,
        locationId: e.target.value
      })
    }   
    if(e.target.name === 'equipmentId') {
      const equipmentSelected: Equipment = customerSelected?.equipments.find(p => p.id === e.target.value) as never
      // setEquipmentList(equipmentData)
      setEquipment({
        ...equipment,
        id: equipmentSelected.id,
        name: equipmentSelected.name,
        description: equipmentSelected.description,
        brand: equipmentSelected.brand,
        model: equipmentSelected.model,
        serial: equipmentSelected.serial,
        type: equipmentSelected.type,
        image: equipmentSelected.image,
      })
    }   
  }

  console.log(equipment);

  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(isEditable ? `${ENDPOINT.equipment.update}${equipment.id}`: `${ENDPOINT.equipment.add}`, {
      method: isEditable ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
      },
      body: JSON.stringify(equipment)
    }).then((res) => {
      if(!res.ok) {
        toast.error('El equipo no pudo ser creado, por favor consulte con el administrador')
      }
      return res.json()
    }).then((data) => {
      if(!data.success) {
        toast.error(data.msg)
      } else {
        toast.success(`El equipo ${equipment.name} ha sido ${isEditable ? 'modificado' : 'creado'} con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setEquipment({
        id: '',
        name: '',
        description: '',
        type: '',
        model: '',
        serial: '',
        brand: '',
        image: '',
        locationId: ''
      })
    })
  }


  // console.log(maintanance);

  return (
    <View>
    <ToastContainer />
      {
        isLoading || loading ? <Loader/> :
      <>
          <p style={componentStyles.description}>En este formulario podras {isEditable ? 'modificar' : 'crear'} todos los equipos asociados a cada cliente</p>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', paddingLeft: '1rem', marginBottom: 10}}>
            <SelectInput
              label="Empresa"
              placeholder="Selecciona una empresa"
              data={customerData?.clients as never}
              name="businessName"
              selected={false}
              handleChange={handleInputChange}
              value="id"
              property="businessName"
            />
            <SelectInput
              label="Sede"
              placeholder="Selecciona una sede"
              data={headQuarter as never}
              name="headId"
              selected={false}
              handleChange={handleInputChange}
              value="id"
              property="headName"
            />
            <SelectInput
              label="Ubicación"
              placeholder="Selecciona una ubicación"
              data={locationList as never}
              name="locationId"
              selected={false}
              handleChange={handleInputChange}
              value="id"
              property="locationName"
            />
            {
              isEditable &&
                <SelectInput
                  label="Equipo"
                  placeholder="Selecciona un equipo"
                  data={equipmentList as never}
                  name="equipmentId"
                  selected={false}
                  handleChange={handleInputChange}
                  value="id"
                  property="name"
                />

            }
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
                  disabled={isEditable ? field.disabled : false}
                  value={equipment[field.name]}
                />
              ))}
              {
                isEditable && equipment.id!.length > 0 &&
                <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                  <button type='submit'>{'Modificar Equipo'}</button>
                </div>
              }
              {
              !isEditable && equipment.locationId.length > 0 && 
                <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                  <button type='submit'>{'Crear Equipo'}</button>
                </div>
              }
          </form>
      </>
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

export default AddEquipment
