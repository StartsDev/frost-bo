import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import type { Location } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"


type Response = {
    locations?: Location[]
}

function Locations() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.location.list})

    const { 
        openModal,
        closeModal,
        isOpen
    } = useModal()
    
    const locationPreview = useMemo(() => {
        return data?.locations?.map(location => {
            
            return {
                id: location.id,
                nombre: location.locationName,
                sede: location.headquarter?.headName,
                negocion: location.client?.businessName,
            }
            
        })

    }, [data])

    const headers = ["id","ubicación", "sede", "negocio"]

    
    const squareDetail = useMemo(() => {
        const locate = localStorage.getItem('item') === null 
                            ? {}
                            : JSON.parse(localStorage.getItem('item')!)

        const idS: string = locate?.id
        
        const filteredClient = data?.locations?.filter(location => location.id === idS)
        
        const mapObject = filteredClient?.map(location => {
            return {
                id: location.id,
                ubicacion: location.locationName,
                sede: location.headquarter?.headName,
                negocio: location.client?.businessName,
            }
        })

        return mapObject?.[0]

    }, [isOpen])

    console.log(data)


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
                        locationPreview === undefined ? [] : locationPreview
                    }
                    actionItem={() => {
                        openModal()
                    }}
                />
            }
        </View>
        {
            isOpen ? (
                <Modal
                    data={squareDetail!}
                    onClose={closeModal}
                    title="Detalle de sede"
                />
            ) : null
        }
    </div>
  )
}

export default Locations