export type Client = {
    address: string
    businessName: string
    city: string
    contact: string
    email: string
    id: string
    nit: string
    phone: string
}

export type Equipment = {
    id: string
    name: string
    deccription: string
    serial: string
    image: string
    model: string
    type: string
    brand: string
    location?: any
    client?: any
    headquarter?: any
}

export type Headquarter = {
    address: string
    headName: string
    email: string
    id: string
    phone: string
    isPrincipal: boolean,
    status?: boolean
    clientId?: string
    Client?: Client & {
        user_app?: UserApp[]
    }
}

export type Location = {
    id: string
    locationName: string
    headquarterId: string
    headquarter?: Omit<Headquarter, "isPrincipal" | "address" | "email" | "phone">
    client: Omit<Client, "nit" | "address" | "email" | "phone" | "city" | "contact"> & UserApp
}

export type UserApp = {
    user_id: string
    role_id: string
    role_name: string
}

export type Maintenance = {
    id: number
    activities: string,
    voltage_on_L1L2: number,
    voltage_on_L1L3: number,
    voltage_on_L2L3: number,
    voltage_control: number,
    suction_pressure: number,
    amp_engine_1: number,
    amp_engine_2: number,
    amp_engine_3: number,
    amp_engine_4: number,
    amp_engine_evap: number,
    compressor_1_amp_L1: number,
    compressor_1_amp_L2: number,
    compressor_1_amp_L3: number,
    compressor_2_amp_L1: number,
    compressor_2_amp_L2: number,
    compressor_2_amp_L3: number,
    supply_temp: number,
    return_temp: number,
    water_in_temp: number,
    water_out_temp: number,
    sprinkler_state: number,
    float_state: number,
    discharge_pressure: number,
    service_hour: string,
    service_date: string,
    customer_sign: any,
    tech_sign: any,
    photos: string[],
    tech?: any,
    customerId: string,
    observations: string,
    additional_remarks: any,
    status: string,
    equipmentId: string
    equipment?: any
    location?: any
    headquarter?: any
    client?: any
}