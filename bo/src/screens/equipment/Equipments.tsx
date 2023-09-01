import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import type { Equipment } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"


type Response = {
    equipments?: Equipment[]
}

function Equipments() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.equipment.list})

    const { 
        openModal,
        closeModal,
        isOpen
    } = useModal()
    
    const locationPreview = useMemo(() => {
        return data?.equipments?.map(equipment => {
            
            return {
                id: equipment.id,
                nombre: equipment.name,
                serial: equipment.serial,
                modelo: equipment.model
            }
            
        })

    }, [data])

    const headers = ["id","nombre", "serial", "modelo"]
    
    const squareDetail = useMemo(() => {
        const equitment = localStorage.getItem('item') === null 
                            ? {}
                            : JSON.parse(localStorage.getItem('item')!)

        const idS: string = equitment?.id
        
        const filteredClient = data?.equipments?.filter(equipment => equipment.id === idS)
        
        const mapObject = filteredClient?.map(equitment => {
            return {
                id: equitment.id,
                nombre: equitment.name,
                serial: equitment.serial,
                modelo: equitment.model,
                brand: equitment.brand,
                tipo: equitment.type
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

export default Equipments