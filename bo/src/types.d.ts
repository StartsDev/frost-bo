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
    isPrincipal: boolean
}

export type Location = {
    id: string
    locationName: string
}