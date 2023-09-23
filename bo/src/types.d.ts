/* eslint-disable @typescript-eslint/no-explicit-any */
export type Client = {
    id: string
    address: string
    businessName: string
    city: string
    contact: string
    email: string
    nit: string
    phone: string
    headquarters: Headquarter[]
    locations: Location[]
    equipments: Equipment[]
    user_app: UserApp
}

export type ClientResponse = {
    clients: Client[]
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
    id: string
    address: string
    headName: string
    email: string
    phone: string
    isPrincipal: boolean
    clientId: string
}

export type Location = {
    id: string
    locationName: string
    headquarterId: string
    description: string
    // headquarter?: Omit<Headquarter, "isPrincipal" | "address" | "email" | "phone">
    // client?: Omit<Client, "nit" | "address" | "email" | "phone" | "city" | "contact"> & UserApp
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

export type userResponse = {
    users: User[],
    numItmes: number
}

export type User = {
    id: string,
    numIdent: string,
    firstName: string,
    lastName: string,
    userName: string,
    image: string,
    email: string,
    phone: string,
    status: boolean,
    clientId: any,
    roleId: string,
    identId: string,
    Identification: {
        name: string
    }
    Role: {
        role: string
    }
}

export type Session = {
    msg: string
    token: string
    user: User
    success: boolean
}

export type Roles = {
    roles: Role[],
    success: boolean
}

export type Role = {
    role: string, 
    id: string
}
export type IdentificationResponse = {
    identifications: IndentificationType[],
    success: boolean
}

export type IndentificationType = {
    name: string, 
    id: string
}