import React, { useState } from "react"
import moment from "moment"
import { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { SelectInput } from "../../components/input/SelectInput"
import { useFetcher } from "../../hooks/useFetcher"
import { Client, ClientResponse, Equipment, Headquarter, Location, userResponse } from "../../types"
import { Input } from "../../components/form/Input"
import formStyles from "../../components/form/form.module.css";
import style from './maintenance.module.css'
import inputStyle from '../../components/input/select.module.css'
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../components/Loader/Loader"
import { SwiperComponent } from "../../components/swiper/SwiperComponent"
import { EQUIPMENT_TYPES, minisplitParamters, bombasParameters, torresParameters, fieldsFixed, minisplitFields, bombasFields, torresFields } from '../../helpers';
import { ImageLoader } from "../../components/imageLoader/ImageLoader"


const INITIAL_STATE = {
  "id": "",
	"activities":"",
	"service_hour":"",
	"service_date":"",
	"customer_sign": "",
	"tech_sign":"",
	"photos":[],
	"observations":"",
  "additional_remarks": "",
  "customerId":"",
	"equipmentId":"",
  "businessName":"",
  "headQuarter":"",
  "location":"",
  "equipmentName":"",
  "techId":"",
  "techName": "",
  "type":"",
}

const imageList = [
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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'
]


interface Props {
  isEditable: boolean
}
function AddMaintenance({isEditable = false}: Props) {
  const { data: userToModify} = useFetcher<userResponse>({method: "GET", url: ENDPOINT.auth.users})
  const { data: customerData, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [maintanance, setMaintenance] = useState(INITIAL_STATE)
  const [fields, setFields] = useState<Fields[]>([])
  const [customerSelected, setCustomerSelected] = useState<Client>()
  const [headQuarter, setHeadQuarter] = useState<Headquarter[]>()
  const [locationList, setLocationList] = useState<Location[]>()
  const [equipmentList, setEquipmentList] = useState<Equipment[]>()  
  const [equipmentListByType, setEquipmentListBytype] = useState<Equipment[]>()  
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenance(prevMaint => ({
      ...prevMaint,
      [event.target.name]: event.target.value
    }));
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "businessName") {
      const customerSelected: Client = customerData?.clients.find((c: Client) => c.id === e.target.value) as never
      setCustomerSelected(customerSelected)
      setHeadQuarter(customerSelected.headquarters)
      setMaintenance({
        ...maintanance,
        customerId: e.target.value
      })
    }
    if(e.target.name === 'headId'){
      const locationsData: Location[] = customerSelected?.locations.filter(l => l.headquarterId === e.target.value) as never
      setLocationList(locationsData)
    }
    if(e.target.name === 'locationId') {
      const equipmentData: Equipment[] = customerSelected?.equipments.filter(p => p.locationId === e.target.value) as never
      setEquipmentList(equipmentData)
      setMaintenance({
        ...maintanance,
        location: e.target.value
      })
    }
    if(e.target.name === 'type'){
      const equipmentByType: Equipment[]= equipmentList?.filter((equip) => equip.type === e.target.value) as never
      console.log(equipmentByType)
      if(e.target.value === EQUIPMENT_TYPES[0].name){
        setEquipmentListBytype(equipmentByType)
        setFields([...fieldsFixed, ...minisplitFields])
        setMaintenance({
          ...maintanance,
          ...minisplitParamters,
          type: e.target.value
        })
      }
      if(e.target.value === EQUIPMENT_TYPES[1].name){
        setEquipmentListBytype(equipmentByType)
        setFields([...fieldsFixed, ...bombasFields])
        setMaintenance({
          ...maintanance,
          ...bombasParameters,
          type: e.target.value
        })
      }
      if(e.target.value === EQUIPMENT_TYPES[2].name){
        setEquipmentListBytype(equipmentByType)
        setFields([...fieldsFixed, ...torresFields])
        setMaintenance({
          ...maintanance,
          ...torresParameters,
          type: e.target.value
        })
      }
    }
    if(e.target.name === 'equipmentId' ){
      const equipmentFound: Equipment = equipmentList?.find(equip => equip.id === e.target.value) as never
      console.log(equipmentFound);
      setMaintenance({
        ...maintanance,
        equipmentId: e.target.value
      })
    }    
    if(e.target.name === 'techId' ){
      setMaintenance({
        ...maintanance,
        techId: e.target.value
      })
    }    
  }


  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(isEditable ? `${ENDPOINT.maintanance.update}${maintanance.id}` : `${ENDPOINT.maintanance.add}` , {
      method: isEditable ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!,
        "x-apikey": import.meta.env.VITE_X_API_KEY
      },
      body: JSON.stringify(maintanance)
    }).then((res) => {
      if(!res.ok) {
        toast.error('El servicio no pudo ser creado, por favor consulte con el administrador')
      }
      return res.json()
    }).then((data) => {
      if(!data.success) {
        toast.error(data.msg)
      } else {
        toast.success(`El servicio con OT ${data.ot} ha sido ${isEditable ? 'modificado' : 'creado'} con exito`)
      }
    }).catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
      setMaintenance(INITIAL_STATE)
    })
  }

  const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(`${ENDPOINT.maintanance.byId}${maintanance.id}`)
    .then(res => {
      if(!res.ok) {
        toast.error('Hubo un error')
      }
      return res.json()
    })
    .then((data: MainResponse) => {
      if(!data.succes) {
        toast.error('Hubo un error')
      } else {
        if(EQUIPMENT_TYPES[0].name.toLowerCase().includes(data.maintenance.Equipment.type.toLowerCase().trim())) {
          setFields([...fieldsFixed, ...minisplitFields])
        }
        if(data.maintenance.Equipment.type === EQUIPMENT_TYPES[1].name){
          setFields([...fieldsFixed, ...bombasFields])
        }
        if(data.maintenance.Equipment.type === EQUIPMENT_TYPES[2].name){
          setFields([...fieldsFixed, ...torresFields])
        }
        setMaintenance({
          id: data.maintenance.id,
          activities:data.maintenance.activities,
          voltage_on_L1L2: data.maintenance.voltage_on_L1L2,
          voltage_on_L1L3: data.maintenance.voltage_on_L1L3,
          voltage_on_L2L3: data.maintenance.voltage_on_L2L3,
          voltage_control: data.maintenance.voltage_control,
          suction_pressure: data.maintenance.suction_pressure,
          amp_engine_1: data.maintenance.amp_engine_1,
          amp_engine_2: data.maintenance.amp_engine_2,
          amp_engine_3: data.maintenance.amp_engine_3,
          amp_engine_4: data.maintenance.amp_engine_4,
          amp_engine_evap: data.maintenance.amp_engine_evap,
          compressor_1_amp_L1: data.maintenance.compressor_1_amp_L1,
          compressor_1_amp_L2: data.maintenance.compressor_1_amp_L2,
          compressor_1_amp_L3: data.maintenance.compressor_1_amp_L3,
          compressor_2_amp_L1: data.maintenance.compressor_2_amp_L1,
          compressor_2_amp_L2: data.maintenance.compressor_2_amp_L2,
          compressor_2_amp_L3: data.maintenance.compressor_2_amp_L3,
          supply_temp: data.maintenance.supply_temp,
          return_temp: data.maintenance.return_temp,
          ater_in_temp: data.maintenance.water_in_temp,
          water_out_temp: data.maintenance.water_out_temp,
          sprinkler_state: data.maintenance.sprinkler_state,
          float_state: data.maintenance.float_state,
          discharge_pressure: data.maintenance.discharge_pressure,
          service_hour:data.maintenance.service_hour,
          service_date: moment(data.maintenance.service_date).format('YYYY-MM-DD'),
          customer_sign: "",
          tech_sign:"",
          photos:data.maintenance.photos,
          observations:data.maintenance.observations,
          customerId: data.maintenance.customerId,
          equipmentId: data.maintenance.equipmentId,
          techId: data.maintenance?.tech?.techId,
          techName: data.maintenance?.tech?.techName,
          businessName: data.maintenance?.Equipment?.Location?.Headquarter?.Client?.businessName,
          headQuarter: data.maintenance?.Equipment?.Location?.Headquarter?.headName,
          location: data.maintenance?.Equipment?.Location?.locationName,
          equipmentName: data.maintenance?.Equipment?.name,
          additional_remarks: "",
          type: data.maintenance?.Equipment?.type?.trim()
        })
      }
    })
    .catch(() => {
      console.log('error')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  // console.log(maintanance)
  const userByRole = {users: userToModify?.users.filter(e => e.Role.role === 'Tecnico')}
  console.log(userToModify)
  console.log(userByRole)

  return (
    <View>
    <ToastContainer />
      {
        isLoading || loading ? <Loader/> :
      <>
      {
        isEditable && 
        <>
          <div style={{width: '100%', height: 270, overflowY: "scroll"}}>
            <form action="" style={{display: 'flex', flexDirection: 'column',padding: '1rem'}} onSubmit={(e)=>onSearch(e as never)}>
              <label htmlFor="" className={inputStyle.labelStyle}>Buscar por Orden de Trabajo</label>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <input type="text" value ={maintanance.id} className={inputStyle.formInput} style={{width: 180, marginRight: 20, padding: 5}}onChange={(e) => setMaintenance({...maintanance, id: e.target.value})} />
                <div className={formStyles.buttonContainer}>
                  <button type="submit">buscar</button>
                </div>
              </div>
            </form>
            <section className={style.sectionContainer}>
              <div className={style.inputContainer}>
                <label htmlFor="" className={style.labelHeader}>Empresa:</label>
                <span className={style.text}>{maintanance.businessName}</span>
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="" className={style.labelHeader}>Sede:</label>
                <span className={style.text}>{maintanance.headQuarter}</span>
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="" className={style.labelHeader}>Ubicacion:</label>
                <span className={style.text}>{maintanance.location}</span>
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="" className={style.labelHeader}>Equipo:</label>
                <span className={style.text}>{maintanance.equipmentName}</span>
              </div>
              <SelectInput
                label="Tecnico"
                placeholder="Selecciona un tecnico"
                data={userByRole?.users as never}
                name="techId"
                selectedValue={maintanance?.techName?.split(" ")[0]}
                handleChange={handleInputChange}
                value="id"
                property="firstName"
              />
            </section>
          </div>
          {
            maintanance.service_date.length > 0 &&
            <>
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
                    imageList={maintanance.photos}
                    disabled={isEditable ? field.disabled : false}
                    id={maintanance.id}
                    isEditable={true}
                    value={maintanance[field.name]}
                  />
                ))}
                <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                  <button type='submit'>{isEditable ? 'Modificar Mantenimiento' : 'Crear Mantenimiento'}</button>
                </div>
            </form>
            </>
          }
        </>     
      }
      {
        !isEditable &&
        <>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', flexWrap: 'wrap', paddingLeft: '1rem', marginBottom: 10}}>
            <SelectInput
              label="Empresa"
              placeholder="Selecciona una empresa"
              data={customerData?.clients as never}
              name="businessName"
              handleChange={handleInputChange}
              value="id"
              property="businessName"
            />
            <SelectInput
              label="Sede"
              placeholder="Selecciona una sede"
              data={headQuarter as never}
              name="headId"
              handleChange={handleInputChange}
              value="id"
              property="headName"
            />
            <SelectInput
              label="Ubicación"
              placeholder="Selecciona una ubicación"
              data={locationList as never}
              name="locationId"
              handleChange={handleInputChange}
              value="id"
              property="locationName"
            />
            {
              maintanance.location !== "" &&
              <SelectInput
                label="Tipo"
                placeholder="Selecciona el tipo de equipo"
                data={EQUIPMENT_TYPES}
                name="type"
                handleChange={handleInputChange}
                value="id"
                property="name"
              />
            }
            {
              maintanance.type !== "" && equipmentListByType!.length > 0 &&
              <>
                <SelectInput
                  label="Equipo"
                  placeholder={"Selecciona un equipo"}
                  data={equipmentListByType as never}
                  name="equipmentId"
                  handleChange={handleInputChange}
                  value="id"
                  property="name"
                />
              </>
            }
                <SelectInput
                  label="Tecnico"
                  placeholder="Selecciona un tecnico"
                  data={userByRole?.users as never}
                  name="techId"
                  handleChange={handleInputChange}
                  value="id"
                  property="firstName"
                />
          </div>
          {maintanance.type !== "" && equipmentListByType?.length === 0 &&
          <div className={style.textInformation}>
            <span style={{color: 'grey', fontSize: 18}}>No hay equipos creados del tipo seleccionado</span>
          </div>
          }
          {
            maintanance.equipmentId.length > 0 && maintanance.techId.length > 0 &&
            <>
              <form onSubmit={(e)=>sendData(e as never)} style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', padding: '1rem 1rem', justifyContent: 'space-between', overflowY: "scroll",}}>
                  {fields.length > 0 && fields.map((field)=> (
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
                      value={maintanance[field.name]}
                    />
                  ))}
                  <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                    <button type='submit'>{isEditable ? 'Modificar Mantenimiento' : 'Crear Mantenimiento'}</button>
                  </div>
              </form>
            </>
          }
        </>
      }
      {/* <ImageLoader
        imageList={imageList}
      /> */}
      </>
      }
      
    </View>
  )
}

export default AddMaintenance