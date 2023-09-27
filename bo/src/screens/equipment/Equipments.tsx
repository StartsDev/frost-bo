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


type Response = {
    equipments?: Equipment[]
}

function Equipments() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.equipment.list})

    const equipmentPreview = useMemo(() => {
        return data?.equipments?.map(equipment => {
            
            return {
                serial: equipment.serial,
                nombre: equipment.name,
                modelo: equipment.model,
                tipo: equipment.type,
                marca: equipment.brand
            }
            
        })

    }, [data])

    const headers = ["serial", "nombre", "modelo" ,"tipo", "marca"]
    
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
                        equipmentPreview === undefined ? [] : equipmentPreview
                    }
                />
            }
        </View>
    </div>
  )
}


export default Equipments