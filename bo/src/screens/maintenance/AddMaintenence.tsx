import { useState, useMemo } from "react"
import Form, { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { SelectInput } from "../../components/input/SelectInput"
import { useFetcher } from "../../hooks/useFetcher"
import { Client, ClientResponse, Equipment, Headquarter, Location, MainResponse, Maintenance, userResponse } from "../../types"
import { Input } from "../../components/form/Input"
import formStyles from "../../components/form/form.module.css";
import style from './maintenance.module.css'
import inputStyle from '../../components/input/select.module.css'
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../components/Loader/Loader"
import { SwiperComponent } from "../../components/swiper/SwiperComponent"


const fields:Fields[]= [
  {
    name: "service_date",
    type: "date",
    label: "Fecha de servicio",
    placeholder: "Fecha de servicio"
  },
  {
    name: "service_hour",
    type: "time",
    label: "Hora de servicio",
    placeholder: "Hora de servicio"
  },
  {
    name: "activities",
    type: "textArea",
    label: "Actividades ejecutadas",
    placeholder: "Describa las actividades ejecutadas en el mantenimiento",
    rowStyle: {width: '100%',height: 100, marginTop: 10, marginBottom: 10},
    style: {height: 100}
  },
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje L1L2",
    placeholder: "Voltaje L1L2"
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje L1L3",
    placeholder: "Voltaje L1L3"
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje L2L3",
    placeholder: "Voltaje L2L3"
  },
  {
    name: "voltage_control",
    type: "number",
    label: "Voltaje Control",
    placeholder: "Voltaje Control"
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión de succion",
    placeholder: "Presión de succion"
  },
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amperaje 1",
    placeholder: "Amp 1"
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amperaje 2",
    placeholder: "Amp 2"
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amperaje 3",
    placeholder: "Amp 3"
  },
  {
    name: "amp_engine_4",
    type: "number",
    label: "Amperaje 4",
    placeholder: "Amp 4"
  },
  {
    name: "amp_engine_evap",
    type: "number",
    label: "Amperaje Evaporador",
    placeholder: "Amp Evap"
  },
  {
    name: "compressor_1_amp_L1",
    type: "number",
    label: "Amperaje Motor 1 L1",
    placeholder: "Amp 1 L1"
  },
  {
    name: "compressor_1_amp_L2",
    type: "number",
    label: "Amperaje Motor 1 L2",
    placeholder: "Amp 1 L2"
  },
  {
    name: "compressor_1_amp_L3",
    type: "number",
    label: "Amperaje Motor 1 L3",
    placeholder: "Amp 1 L3"
  },
  {
    name: "compressor_2_amp_L1",
    type: "number",
    label: "Amperaje Motor 2 L1",
    placeholder: "Amp 2 L1"
  },
  {
    name: "compressor_2_amp_L2",
    type: "number",
    label: "Amperaje Motor 2 L2",
    placeholder: "Amp 2 L2"
  },
  {
    name: "compressor_2_amp_L3",
    type: "number",
    label: "Amperaje Motor 2 L3",
    placeholder: "Amp 2 L3"
  }, 
  {
    name: "supply_temp",
    type: "number",
    label: "Temperatura de suministro",
    placeholder: "Temperatura de suministro"
  },
  {
    name: "return_temp",
    type: "number",
    label: "Temperatura de retorno",
    placeholder: "Temperatura de retorno"
  },
  {
    name: "water_in_temp",
    type: "number",
    label: "Temperatura de entrada de agua",
    placeholder: "Temperatura de entrada de agua"
  },
  {
    name: "water_out_temp",
    type: "number",
    label: "Temperatura de salida de agua",
    placeholder: "Temperatura de salida de agua"
  },
  {
    name: "sprinkler_state",
    type: "number",
    label: "Estado de bomba",
    placeholder: "Estado de bomba"
  },
  {
    name: "float_state",
    type: "number",
    label: "Estado de flotador",
    placeholder: "Estado de bomba"
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión de descarga",
    placeholder: "Presión de descarga"
  },
  {
    name: "observations",
    type: "text",
    label: "Observaciones",
    placeholder: "Observaciones",
    rowStyle: {width: '100%', height: 100, marginTop: 10, marginBottom: 10},
    style: {height: 100}
  },
]

const INITIAL_STATE = {
  "id": "",
	"activities":"",
	"voltage_on_L1L2":0,
	"voltage_on_L1L3":0,
	"voltage_on_L2L3":0,
  "voltage_control":0,
	"suction_pressure":0,
	"amp_engine_1":0,
	"amp_engine_2":0,
	"amp_engine_3":0,
  "amp_engine_4":0,
  "amp_engine_evap":0,
  "compressor_1_amp_L1":0,
  "compressor_1_amp_L2":0,
  "compressor_1_amp_L3":0,
  "compressor_2_amp_L1":0,
  "compressor_2_amp_L2":0,
  "compressor_2_amp_L3":0,
  "supply_temp":0,
  "return_temp":0,
  "ater_in_temp":0,
  "water_out_temp":0,
  "sprinkler_state":0,
  "float_state":0,
	"discharge_pressure":0,
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
  "techName":"",
}


interface Props {
  isEditable: boolean
}

function AddMaintenance({isEditable = false}: Props) {
  
  
  const { data: userToModify} = useFetcher<userResponse>({method: "GET", url: ENDPOINT.auth.users})
  const { data: customerData, loading } = useFetcher<ClientResponse>({method: "GET", url: ENDPOINT.clients.list})
  const [maintanance, setMaintenance] = useState(INITIAL_STATE)
  const [customerSelected, setCustomerSelected] = useState<Client>()
  const [headQuarter, setHeadQuarter] = useState<Headquarter[]>()
  const [locationList, setLocationList] = useState<Location[]>()
  const [equipmentList, setEquipmentList] = useState<Equipment[]>()
  const typesEquipoment = ['BOMBAS',"MINISPLIT, CENTRAL, PISOTECHO, CASSETTE", "TORRES" ]
  
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
    }
    if(e.target.name === 'equipmentId' ){
      const equipmentFound: Equipment = equipmentList?.find(equip => equip.id === e.target.value) as never
      console.log(equipmentFound);
      setMaintenance({
        ...maintanance,
        equipmentId: e.target.value
      })
    }    
  }

  const sendData = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    fetch(`${ENDPOINT.maintanance.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem('key')!
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
        toast.success(`El servicio con OT ${data.ot} ha sido creado con exito`)
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
        // setMaintenance(data.maintenance)
        console.log(data);
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
          service_date: data.maintenance.service_hour,
          customer_sign: "",
          tech_sign:"",
          photos:data.maintenance.photos,
          observations:data.maintenance.observations,
          customerId: data.maintenance.customerId,
          equipmentId: data.maintenance.equipmentId,
          businessName: data.maintenance?.Equipment?.Location?.Headquarter?.Client?.businessName,
          headQuarter: data.maintenance?.Equipment?.Location?.Headquarter?.headName,
          location: data.maintenance?.Equipment?.Location?.locationName,
          equipmentName: data.maintenance?.Equipment?.name,
          techName: data.tech?.techName,
          additional_remarks: ""
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

  // console.log(maintanance);

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
                name="firstName"
                selected={maintanance.techName !== '' ? true : false}
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
            <SelectInput
              label="Tecnico"
              placeholder="Selecciona un tecnico"
              data={userToModify?.users as never}
              name="firstName"
              selected={false}
              handleChange={handleInputChange}
              value="id"
              property="firstName"
            />
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
    </View>
  )
}

export default AddMaintenance