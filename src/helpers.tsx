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
  voltage_on_L1L2: '0',
  voltage_on_L1L3 : '0',
  voltage_on_L2L3 : '0',
  voltage_control: '0',
  supply_temp: '0',
  return_temp: '0',
  suction_pressure: '0',
  discharge_pressure : '0',
  amp_engine_1 : '0',
  amp_engine_2 : '0',
  amp_engine_3 : '0',
  amp_engine_4 : '0',
  amp_engine_evap : '0',
  compressor_1_amp_L1 : '0',
  compressor_1_amp_L2 : '0',
  compressor_1_amp_L3 : '0',
  compressor_2_amp_L1 : '0',
  compressor_2_amp_L2 : '0',
  compressor_2_amp_L3 : '0',
}

export const torresParameters = {
  amp_engine_1 : '0',
  amp_engine_2 : '0',
  amp_engine_3 : '0',
  suction_pressure: '0',
  discharge_pressure : '0',
  voltage_on_L1L2: '0',
  voltage_on_L1L3 : '0',
  voltage_on_L2L3 : '0',
  sprinkler_state: '0',
  float_state: '0',
  water_in_temp: '0',
  water_out_temp: '0',
}

export const bombasParameters = {
  amp_engine_1 : '0',
  amp_engine_2 : '0',
  amp_engine_3 : '0',
  suction_pressure: '0',
  discharge_pressure : '0',
  voltage_on_L1L2: '0',
  voltage_on_L1L3 : '0',
  voltage_on_L2L3 : '0',
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
    name: "photos",
    type: "file",
    label: "Fotos del servicio",
    rowStyle: {width: '100%',height: 300, marginTop: 0, marginBottom: 10},
    style: {height: 10}
    // placeholder: "Hora de servicio"
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
    required:false,
    rowStyle: {width: '100%', height: 100, marginTop: 10, marginBottom: 10},
    style: {height: 100}
  },
]

export const minisplitFields = [
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2",
    required:false
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3",
    required:false
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3",
    required:false
  },
  {
    name: "voltage_control",
    type: "number",
    label: "Voltaje Control",
    placeholder: "Voltaje Control",
    required:false
  },
  {
    name: "supply_temp",
    type: "number",
    label: "Temp. Suministros",
    placeholder: "Temperatura de suministro",
    required:false
  },
  {
    name: "return_temp",
    type: "number",
    label: "Temp. Retorno",
    placeholder: "Temperatura de retorno",
    required:false
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion",
    required:false
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga",
    required:false
  },
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1",
    required:false
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2",
    required:false
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3",
    required:false
  },
  {
    name: "amp_engine_4",
    type: "number",
    label: "Amp. Motor 4",
    placeholder: "Amp 4",
    required:false
  },
  {
    name: "amp_engine_evap",
    type: "number",
    label: "Amp. Motor Evaporador",
    placeholder: "Amp Evap",
    required:false
  },
  {
    name: "compressor_1_amp_L1",
    type: "number",
    label: "Compresor 1 Amp. L1",
    placeholder: "Amp 1 L1",
    required:false
  },
  {
    name: "compressor_1_amp_L2",
    type: "number",
    label: "Compresor 1 Amp. L2",
    placeholder: "Amp 1 L2",
    required:false
  },
  {
    name: "compressor_1_amp_L3",
    type: "number",
    label: "Compresor 1 Amp. L3",
    placeholder: "Amp 1 L3",
    required:false
  },
  {
    name: "compressor_2_amp_L1",
    type: "number",
    label: "Compresor 2 Amp. L1",
    placeholder: "Amp 2 L1",
    required:false
  },
  {
    name: "compressor_2_amp_L2",
    type: "number",
    label: "Compresor 2 Amp. L2",
    placeholder: "Amp 2 L2",
    required:false
  },
  {
    name: "compressor_2_amp_L3",
    type: "number",
    label: "Compresor 2 Amp. L3",
    placeholder: "Amp 2 L3",
    required:false
  } 
]

export const torresFields = [
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1",
    required:false
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2",
    required:false
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3",
    required:false
  },
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2",
    required:false
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3",
    required:false
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3",
    required:false
  }, 
  {
    name: "water_in_temp",
    type: "number",
    label: "Temp. Entrada Agua",
    placeholder: "Temperatura de entrada de agua",
    required:false
  },
  {
    name: "water_out_temp",
    type: "number",
    label: "Temp. Salida Agua",
    placeholder: "Temperatura de salida de agua",
    required:false
  },
  {
    name: "sprinkler_state",
    type: "number",
    label: "Estado Rociador",
    placeholder: "Estado de Rociador",
    required:false
  },
  {
    name: "float_state",
    type: "number",
    label: "Estado Flotador",
    placeholder: "Estado de Flotador",
    required:false
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion",
    required:false
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga",
    required:false
  },
  
]
export const bombasFields = [
  {
    name: "voltage_on_L1L2",
    type: "number",
    label: "Voltaje Ent L1L2",
    placeholder: "Voltaje L1L2",
    required:false
  },
  {
    name: "voltage_on_L1L3",
    type: "number",
    label: "Voltaje Ent L1L3",
    placeholder: "Voltaje L1L3",
    required:false
  },
  {
    name: "voltage_on_L2L3",
    type: "number",
    label: "Voltaje Ent L2L3",
    placeholder: "Voltaje L2L3",
    required:false
  },
  {
    name: "amp_engine_1",
    type: "number",
    label: "Amp. Motor 1",
    placeholder: "Amp 1",
    required:false
  },
  {
    name: "amp_engine_2",
    type: "number",
    label: "Amp. Motor 2",
    placeholder: "Amp 2",
    required:false
  },
  {
    name: "amp_engine_3",
    type: "number",
    label: "Amp. Motor 3",
    placeholder: "Amp 3",
    required:false
  },
  {
    name: "suction_pressure",
    type: "number",
    label: "Presión Succión",
    placeholder: "Presión de succion",
    required:false
  },
  {
    name: "discharge_pressure",
    type: "number",
    label: "Presión Descarga",
    placeholder: "Presión de descarga",
    required:false
  },
  
]

