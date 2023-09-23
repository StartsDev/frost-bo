import { useState, useMemo } from "react"
import Form, { Fields } from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"
import { SelectInput } from "../../components/input/SelectInput"
import { useFetcher } from "../../hooks/useFetcher"
import { Client, ClientResponse, Equipment, Headquarter, Location, userResponse } from "../../types"
import { Input } from "../../components/form/Input"
import formStyles from "../../components/form/form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../../components/Loader/Loader"

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
    name: "activity",
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
}


interface Props {
  isEditable: boolean
}

function AddMaintenance({isEditable}: Props) {
  
  
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

  console.log(maintanance);

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


  return (
    <View>
    <ToastContainer />
      {
        isLoading || loading ? <Loader/> :
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
    </View>
  )
}

export default AddMaintenance