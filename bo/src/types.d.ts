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
    deccription: string
    brand: string
    image: string
    model: string
    name: string
    serial: string
    type: string
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