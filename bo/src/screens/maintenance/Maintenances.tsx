import { useMemo } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { useFetcher } from "../../hooks/useFetcher"
import { ENDPOINT } from "../../config"
import type { Maintenance } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import Modal from "../../components/modal/Modal"
import moment from "moment";


type Response = {
    maintenances?: Maintenance[]
    numItmes: number
}

function Maintenances() {

    const { 
        data,
        loading
    } = useFetcher<Response>({method: "GET", url: ENDPOINT.maintanance.list})

    const { 
        openModal,
        closeModal,
        isOpen
    } = useModal()
    
    const maintenancePreview = useMemo(() => {
        return data?.maintenances?.map(maintenance => {
            
            return {
                id: maintenance.id,
                cliente: maintenance.client.businessName,
                hora : maintenance.service_hour,
                fecha : maintenance.service_date,
                tecnico : maintenance.tech.techName,
            }
            
        })

    }, [data])

    const headers = ["orden servicio","cliente", "hora", "fecha", "técnico"]
    
    const maintenanceDetail = useMemo(() => {

        const current = localStorage.getItem('item') === null 
                            ? {}
                            : JSON.parse(localStorage.getItem('item')!)

        const idS: string = current?.id
        
        const filteredMaintenance = data?.maintenances?.
                                        filter(maintenance => maintenance.id === Number(idS))
        
        const mapObject = filteredMaintenance?.map(maintenance => {
            return {
                "Nº Orden": `MTO-${maintenance.id}`,
                Estado : maintenance.status,
                Actividades: maintenance.activities,
                "voltaje on L1L2": maintenance.voltage_on_L1L2,
                "voltaje on L1L3": maintenance.voltage_on_L1L3,
                "voltaje on L2L3": maintenance.voltage_on_L2L3,
                "amp engine 1": maintenance.amp_engine_1,
                "amp engine 2": maintenance.amp_engine_2,
                "amp engine 3": maintenance.amp_engine_3,
                "amp engine 4": maintenance.amp_engine_4,
                "voltaje control": maintenance.voltage_control,
                "amp engine evap": maintenance.amp_engine_evap,
                "compressor 1 amp L1": maintenance.compressor_1_amp_L1,
                "compressor 1 amp L2": maintenance.compressor_1_amp_L2,
                "compressor 1 amp L3": maintenance.compressor_1_amp_L3,
                "compressor 2 amp L1": maintenance.compressor_2_amp_L1,
                "compressor 2 amp L2": maintenance.compressor_2_amp_L2,
                "compressor 2 amp L3": maintenance.compressor_2_amp_L3,
                "supply temp": maintenance.supply_temp,
                "return temp": maintenance.return_temp,
                "water in temp": maintenance.water_in_temp,
                "water out temp": maintenance.water_out_temp,
                "sprinkler state": maintenance.sprinkler_state,
                "float state": maintenance.float_state,
                "discharge pressure": maintenance.discharge_pressure,
                "descripcion de la ubicacion": maintenance?.location?.description,
                Cliente: maintenance?.client?.businessName,
                Nit: maintenance?.client?.nit,
                "Direcion del cliente": maintenance?.client?.address,
                "Contacto cliente": `${maintenance?.client?.contact} - mail: ${maintenance?.client?.email} - tel: ${maintenance?.client?.phone}`,
                "Ciudad": maintenance?.client?.city,
                Técnico: maintenance?.tech?.techName,
                "Hora Servicio": maintenance.service_hour,
                "Fecha Servicio": moment(maintenance.service_date).format('DD/MM/YYYY'),
                Sede: maintenance?.headquarter?.headName,
                Ubicación: maintenance?.location?.locationName,
                Equipo: maintenance?.equipment?.name,
                Descripcion: maintenance?.equipment?.description,
                "Serial y Modelo": `${maintenance?.equipment?.serial} - ${maintenance?.equipment?.model}`,
                Tipo: maintenance?.equipment?.type,
                Marca: maintenance?.equipment?.brand,
                Observaciones: maintenance.observations,
                "Firma técnico":maintenance.tech_sign,
                "Firma cliente":maintenance.customer_sign, 
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
                        maintenancePreview === undefined ? [] : maintenancePreview
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
                    data={maintenanceDetail!}
                    onClose={closeModal}
                    title="Mantenimiento"
                />
            ) : null
        }
    </div>
  )
}

export default Maintenances