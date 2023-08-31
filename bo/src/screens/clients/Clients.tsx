import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import { Client, Equipment, Headquarter } from "../../types"
import Loader from "../../components/Loader/Loader"

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

    
    const clientsPreview = data?.clients?.map(client => {

        const preview: Client = {
            address: client.address,
            businessName: client.businessName,
            city: client.city,
            contact: client.contact,
            email: client.email,
            nit: client.nit,
            phone: client.phone,
            id: client.id
        }
        
        return preview
        
    })

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
                        headers={["Name", "Email", "Phone", "Actions"]}
                        items={
                            clientsPreview === undefined ? [] : clientsPreview
                        }
                />
            }
        </View>
    </div>
  )
}

export default Clients