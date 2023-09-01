import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import { Client, Equipment, Headquarter } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"

type ClientResponse = Client & { 
    equipments: Equipment[]
    headquaerters: Headquarter[]
    locations: Location[]
    user_app?: any 
}

type Response = {
    clients?: ClientResponse[]
    numItems?: number
}

function Clients() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.clients.list})

    const { 
        openModal,
        closeModal,
        isOpen
    } = useModal()
    
    const clientsPreview = useMemo(() => {
        return data?.clients?.map(client => {

            const preview: Client = {
                id: client.id,
                phone: client.phone,
                address: client.address,
                city: client.city,
                businessName: client.businessName,
                nit: client.nit,
                contact: client.contact,
                email: client.email
            }
            
            return preview
            
        })
    }, [data])

    const clientDetail = useMemo(() => {
        const client = localStorage.getItem('item') === null 
                       ? {}
                       : JSON.parse(localStorage.getItem('item')!)

        const idClient: string = client?.id
        
        const filteredClient = data?.clients?.filter(client => client.id === idClient)
        
        const mapObject = filteredClient?.map(client => {
            return {
                id: client.id,
                telefono: client.phone,
                direccion: client.address,
                ciudad: client.city,
                negocio: client.businessName,
                nit: client.nit,
                contacto: client.contact,
                email: client.email
            }
        })

        return mapObject?.[0]

    }, [isOpen])

    const headers = ["id", "telefono", "direccion", "ciudad", "negocio", "nit", "contacto", "email"]

  return (
    <div>
        <Actions>
            <button
                style={{
                    width: 120,
                    height: 30,
                    backgroundColor: THEME.black,
                    color: THEME.white,
                    border: "none",
                    borderRadius: 5,
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly"
                }}
            >
                export csv <MdDescription />
            </button>
        </Actions>
        <View>
            {
                loading 
                ? <Loader />
                : <Table 
                    headers={headers}
                    items={
                        clientsPreview === undefined ? [] : clientsPreview
                    }
                    actionItem={() => {
                        console.log("action")
                        openModal()
                    }}
                />
            }
        </View>
        {
            isOpen ? (
                <Modal
                    data={clientDetail === undefined ? {} : clientDetail}
                    onClose={closeModal}
                    title="Detalle del cliente"
                />
            ) : null
        }
    </div>
  )
}

export default Clients