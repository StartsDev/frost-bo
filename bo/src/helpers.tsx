/* eslint-disable @typescript-eslint/no-explicit-any */
export const showError = (obj: any, nameChanger: Function) => {
  const keys = Object.keys(obj)
  for(const field of keys) {
    if(obj[field] === ''){
      return true && (
        <p style={{color: 'red', width: '100%', marginLeft: 30, marginBottom: 20, marginTop: 20}}>
        {`El campo ${nameChanger(field)} no puede estar vacio`}
      </p>
      )
    }
  }
  return false
}

export const EQUIPMENT_TYPES = [{name: 'MINISPLIT, CENTRAL, PISOTECHO, CASSETTE'}, {name: 'BOMBAS'}, {name: 'TORRES'} ]

export  const minisplitParamters = {
  voltage_on_L1L2: '',
  voltage_on_L1L3 : '',
  voltage_on_L2L3 : '',
  voltage_control: '',
  supply_temp: '',
  return_temp: '',
  suction_pressure: '',
  discharge_pressure : '',
  amp_engine_1 : '',
  amp_engine_2 : '',
  amp_engine_3 : '',
  amp_engine_4 : '',
  amp_engine_evap : '',
  compressor_1_amp_L1 : '',
  compressor_1_amp_L2 : '',
  compressor_1_amp_L3 : '',
  compressor_2_amp_L1 : '',
  compressor_2_amp_L2 : '',
  compressor_2_amp_L3 : '',
}

export const torresParameters = {
  amp_engine_1 : '',
  amp_engine_2 : '',
  amp_engine_3 : '',
  suction_pressure: '',
  discharge_pressure : '',
  voltage_on_L1L2: '',
  voltage_on_L1L3 : '',
  voltage_on_L2L3 : '',
  sprinkler_state: '',
  float_state: '',
  water_in_temp: '',
  water_out_temp: '',
}

export const bombasParameters = {
  amp_engine_1 : '',
  amp_engine_2 : '',
  amp_engine_3 : '',
  suction_pressure: '',
  discharge_pressure : '',
  voltage_on_L1L2: '',
  voltage_on_L1L3 : '',
  voltage_on_L2L3 : '',
}

export const fieldsFixed = [
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
    name: "observations",
    type: "text",
    label: "Observaciones",
    placeholder: "Observaciones",
    rowStyle: {width: '100%', height: 100, marginTop: 10, marginBottom: 10},
    style: {height: 100}
  },
]

export const minisplitFields = [
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2"
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3"
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3"
  },
  {
    name: "voltage_control",
    type: "number",
    label: "Voltaje Control",
    placeholder: "Voltaje Control"
  },
  {
    name: "supply_temp",
    type: "number",
    label: "Temp. Suministros",
    placeholder: "Temperatura de suministro"
  },
  {
    name: "return_temp",
    type: "number",
    label: "Temp. Retorno",
    placeholder: "Temperatura de retorno"
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion"
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga"
  },
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1"
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2"
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3"
  },
  {
    name: "amp_engine_4",
    type: "number",
    label: "Amp. Motor 4",
    placeholder: "Amp 4"
  },
  {
    name: "amp_engine_evap",
    type: "number",
    label: "Amp. Motor Evaporador",
    placeholder: "Amp Evap"
  },
  {
    name: "compressor_1_amp_L1",
    type: "number",
    label: "Compresor 1 Amp. L1",
    placeholder: "Amp 1 L1"
  },
  {
    name: "compressor_1_amp_L2",
    type: "number",
    label: "Compresor 1 Amp. L2",
    placeholder: "Amp 1 L2"
  },
  {
    name: "compressor_1_amp_L3",
    type: "number",
    label: "Compresor 1 Amp. L3",
    placeholder: "Amp 1 L3"
  },
  {
    name: "compressor_2_amp_L1",
    type: "number",
    label: "Compresor 2 Amp. L1",
    placeholder: "Amp 2 L1"
  },
  {
    name: "compressor_2_amp_L2",
    type: "number",
    label: "Compresor 2 Amp. L2",
    placeholder: "Amp 2 L2"
  },
  {
    name: "compressor_2_amp_L3",
    type: "number",
    label: "Compresor 2 Amp. L3",
    placeholder: "Amp 2 L3"
  } 
]

export const torresFields = [
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1"
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2"
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3"
  },
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2"
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3"
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3"
  }, 
  {
    name: "water_in_temp",
    type: "number",
    label: "Temp. Entrada Agua",
    placeholder: "Temperatura de entrada de agua"
  },
  {
    name: "water_out_temp",
    type: "number",
    label: "Temp. Salida Agua",
    placeholder: "Temperatura de salida de agua"
  },
  {
    name: "sprinkler_state",
    type: "number",
    label: "Estado Rociador",
    placeholder: "Estado de Rociador"
  },
  {
    name: "float_state",
    type: "number",
    label: "Estado Flotador",
    placeholder: "Estado de Flotador"
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion"
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga"
  },
  
]
export const bombasFields = [
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2"
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3"
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3"
  },
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1"
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2"
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3"
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion"
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga"
  },
  
]

