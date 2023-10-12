import { useState } from "react"
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
                data={userToModify?.users as never}
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
                    disabled={isEditable ? field.disabled : false}
                    value={maintanance[field.name]}
                  />
                ))}
                <div className={formStyles.buttonContainer} style={{marginTop: 10}}>
                  <button type='submit'>{isEditable ? 'Modificar Mantenimiento' : 'Crear Mantenimiento'}</button>
                </div>
            </form>
              {
                maintanance.photos.length > 0 &&
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <SwiperComponent
                    images={maintanance.photos}
                  />
                </div>
              }
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
                  data={equipmentList as never}
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
                  data={userToModify?.users as never}
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
          }
        </>
      }
      </>
      }
    </View>
  )
}

export default AddMaintenance