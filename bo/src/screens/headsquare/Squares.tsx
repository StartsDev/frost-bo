import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import type { Headquarter } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"


type Response = {
    headquarters?: Headquarter[]
}

function Squares() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.squares.list})

    const { 
        openModal,
        closeModal,
        isOpen
    } = useModal()
    
    const squarePreview = useMemo(() => {
        return data?.headquarters?.map(headSquare => {
            
            return {
                id: headSquare.id,
                nombre: headSquare.headName,
                telefono: headSquare.phone,
                direccion: headSquare.address,
                principal: headSquare.isPrincipal ? "Sí" : "No"
            }
            
        })
    }, [data])
    const headers = ["id","Nombre", "Teléfono", "Dirección", "Principal"]

    
    const squareDetail = useMemo(() => {
        const square = localStorage.getItem('item') === null 
                       ? {}
                       : JSON.parse(localStorage.getItem('item')!)

        const idS: string = square?.id
        
        const filteredClient = data?.headquarters?.filter(headSquare => headSquare.id === idS)
        
        const mapObject = filteredClient?.map(headSquare => {
            return {
                id: headSquare.id,
                nombre: headSquare.headName,
                telefono: headSquare.phone,
                direccion: headSquare.address,
                email: headSquare.email,
                principal: headSquare.isPrincipal ? "Sí" : "No",
                estado: headSquare.status ? "Activo" : "Inactivo",
                nombreCliente: headSquare.Client?.contact,
                direccionCliente: headSquare.Client?.address
            }
        })

        return mapObject?.[0]

    }, [isOpen])


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
                        squarePreview === undefined ? [] : squarePreview
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

export default Squares