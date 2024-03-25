import React, { useState, CSSProperties } from 'react';
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { SelectInput } from "../../components/input/SelectInput"
import { useFetcher } from "../../hooks/useFetcher"
import { Client, ClientResponse, EquiomentPayload, Equipment, Headquarter, Location} from "../../types"
import { Input } from "../../components/form/Input"
import formStyles from "../../components/form/form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../components/Loader/Loader"
import { THEME } from '../../theme';
import { EQUIPMENT_TYPES, EQUIPMENT_TYPES2 } from '../../helpers';
import axios from 'axios';

const fields:Fields[]= [
  {
    name: "name",
    type: "text",
    label: "Nombre del Equipo",
    placeholder: "Escribe el nombre del equipo"
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
  const { data: customerData, loading, fetchMemo } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
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
  const [equipmentListByType, setEquipmentListByType] = useState<Equipment[]>()
  
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

    if(e.target.name === 'type'){     
      // const equipmentDataBytype: Equipment[] = equipmentList?.filter(p => p.type === e.target.value) as never
      // setEquipmentListByType(equipmentDataBytype)
      setEquipment({
      ...equipment,
      type: e.target.value
      })
    }
    if(e.target.name === 'description') {
      const equipmentDataBytype: Equipment[] = equipmentList?.filter(p => p.description === e.target.value) as never
      setEquipmentListByType(equipmentDataBytype)
      setEquipment({
        ...equipment,
        description: e.target.value
        })
    }
    if(e.target.name === 'equipmentId') {
      const equipmentSelected: Equipment = customerSelected?.equipments.find(p => p.id === e.target.value) as never
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

  const sendData = async (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const {data} = await axios({
        method: isEditable ? "PATCH" : "POST",
        url: isEditable ? `${ENDPOINT.equipment.update}${equipment.id}`: `${ENDPOINT.equipment.add}`,
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem('key')!,
          "x-apikey": import.meta.env.VITE_X_API_KEY
        },
        data: JSON.stringify(equipment)
        })
        if(data.success) {
          toast.success(data.msg)
        } else {
          toast.error(data.msg)    
        }
    } catch (error) {
      console.log('error', error)
      toast.error(error.response.data.error)
    } finally {
      fetchMemo()
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
    }
  }

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
              isEditable ?
              
              <SelectInput
                  label="Tipo de equipo"
                  placeholder="Selecciona el tipo de equipo"
                  data={EQUIPMENT_TYPES2}
                  name="description"
                  handleChange={handleInputChange}
                  value="description"
                  property="name"
                />
                :
                <SelectInput
                  label="Tipo de Informe"
                  placeholder="Selecciona el tipo de informe a mostrar"
                  data={EQUIPMENT_TYPES}
                  name="type"
                  handleChange={handleInputChange}
                  value="name"
                  property="name"
                />
            }
            {
              isEditable &&
                <SelectInput
                  label="Equipo"
                  placeholder="Selecciona un equipo"
                  data={equipmentListByType as never}
                  name="equipmentId"
                  selected={false}
                  handleChange={handleInputChange}
                  value="id"
                  property="name"
                />

            }
          </div>
          {
            (equipment.type !== "" && equipment.id === "" || equipment.type !== "" && equipment.id !== "")  &&
            <form onSubmit={(e)=>sendData(e as never)} style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1rem 1rem', justifyContent: 'space-between', overflowY: "scroll",}}>
                {
                  !isEditable &&
                  <SelectInput
                    label="Tipo de equipo"
                    placeholder="Selecciona el tipo de equipo"
                    data={EQUIPMENT_TYPES2}
                    name="description"
                    handleChange={handleInputChange}
                    value="description"
                    property="name"
                  />
                }
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
                <Input
                  type='file'
                  label='Foto'
                  name='picture'
                  placeholder='Sube foto del equipo'
                  required={false}
                  value={equipment.image!}
                  // imageList={[equipment.image!]}
                  onChange={()=>console.log('test')}
                  dataName='picture'
                  endpoint={ENDPOINT.image.uploadWithEquipment}
                  id={equipment.id}
                />
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
          }
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
