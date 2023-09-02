import { useState, useMemo } from "react"
import Form from "../../components/form/Form"
import View from "../../components/view/View"
import { ENDPOINT } from "../../config"

const fields = [
  {
    name: "activity",
    type: "text",
    label: "Actividad",
    placeholder: "Actividad"
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
    label: "Amp 1",
    placeholder: "Amp 1"
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp 2",
    placeholder: "Amp 2"
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp 3",
    placeholder: "Amp 3"
  },
  {
    name: "amp_engine_4",
    type: "number",
    label: "Amp 4",
    placeholder: "Amp 4"
  },
  {
    name: "amp_engine_evap",
    type: "number",
    label: "Amp Evap",
    placeholder: "Amp Evap"
  },
  {
    name: "compressor_1_amp_L1",
    type: "number",
    label: "Amp 1 L1",
    placeholder: "Amp 1 L1"
  },
  {
    name: "compressor_1_amp_L2",
    type: "number",
    label: "Amp 1 L2",
    placeholder: "Amp 1 L2"
  },
  {
    name: "compressor_1_amp_L3",
    type: "number",
    label: "Amp 1 L3",
    placeholder: "Amp 1 L3"
  },
  {
    name: "compressor_2_amp_L1",
    type: "number",
    label: "Amp 2 L1",
    placeholder: "Amp 2 L1"
  },
  {
    name: "compressor_2_amp_L2",
    type: "number",
    label: "Amp 2 L2",
    placeholder: "Amp 2 L2"
  },
  {
    name: "compressor_2_amp_L3",
    type: "number",
    label: "Amp 2 L3",
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
    label: "Estado de bomba",
    placeholder: "Estado de bomba"
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión de descarga",
    placeholder: "Presión de descarga"
  },
  {
    name: "service_hour",
    type: "text",
    label: "Hora de servicio",
    placeholder: "Hora de servicio"
  },
  {
    name: "service_date",
    type: "date",
    label: "Fecha de servicio",
    placeholder: "Fecha de servicio"
  },
  {
    name: "customer_sign",
    type: "text",
    label: "Firma del cliente",
    placeholder: "Firma del cliente"
  },
  {
    name: "tech_sign",
    type: "text",
    label: "Firma del técnico",
    placeholder: "Firma del técnico"
  },
  {
    name: "photos",
    type: "file",
    label: "Fotos",
    placeholder: "Fotos"
  },
  {
    name: "observations",
    type: "text",
    label: "Observaciones",
    placeholder: "Observaciones"
  },
  {
    name: "additional_remarks",
    type: "text",
    label: "Observaciones adicionales",
    placeholder: "Observaciones adicionales"
  },
  {
    name: "status",
    type: "text",
    label: "Estado",
    placeholder: "Estado"
  }
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
  "customerId":"",
	"photos":[],
	"observations":"",
  "additional_remarks": "",
	"equipmentId":""
}

function AddMaintenance() {

  const [maintanance, setMaintenance] = useState(INITIAL_STATE)

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenance({...maintanance, [event.target.name]: event.target.value})
  }

  const fieldsWithEvent = useMemo(() => {
    
    const addEvent = fields.map(field => ({
      ...field,
      onChange: handleChange
    }))

    return addEvent
  }, [])

  const sendData = () => {
    fetch(`${ENDPOINT.maintanance.add}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maintanance)
    }).then(() => {
      setIsLoading(true)
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
        <Form
            fields={fieldsWithEvent}
            action={() => {
              sendData()
            }}
            btnText="Crear cliente"
        />
        <p>{isLoading ? "Cargando..." : ""}</p>
    </View>
  )
}

export default AddMaintenance