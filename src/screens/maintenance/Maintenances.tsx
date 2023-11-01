import React, { useEffect, useMemo, useState } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { ENDPOINT } from "../../config"
import type { Maintenance } from "../../types"
import Loader from "../../components/Loader/Loader"
import { useModal } from "../../hooks/useModal"
import { useModalCSV } from "../../hooks/useModalCSV"
import Modal from "../../components/modal/Modal"
import ModalCSV from "../../components/modal/ModalCSV"
import moment from "moment";
import Pagination from "../../utils/Pagination"
import axios from "axios"
import { capitalString } from "../../utils/capitalizeStr";


// Create new modal csv call API without pagination and generate csv file with filters date
type Response = {
    maintenances?: Maintenance[]
    numItmes: number
    currentPage: number
    totalPages: number
}

type ResponseItem = {
    maintenances?: Maintenance[]
    numItmes: number
}

function Maintenances() {
    const [data, setData] = useState<Response | null>(null);
    const [item, setItem] = useState<ResponseItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setpageSize] = useState(8);

    //Pagination Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Response>(`${ENDPOINT.maintanance.list}?page=${currentPage}&pageSize=${pageSize}`);
                setData(response.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, pageSize]);

    useEffect(()=>{
        const fetchDataSingle = async () => {
            try{
                const response = await axios.get<Response>(ENDPOINT.maintanance.list);
                setItem(response.data)
            }catch(error){
                console.error('Error fetching data:', error);
            }finally {
                setLoading(false);
            }
        }
        fetchDataSingle();
    },[])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const {
        openModal,
        closeModal,
        isOpen
    } = useModal()

    const {
        openModalCSV,
        closeModalCSV,
        isOpenCSV
    } = useModalCSV()

    // Maintenance data report CSV not paginated
    const maintenancePreviewCSV = useMemo(() => {
        return item?.maintenances?.map(maintenance => {
            return {
                id: maintenance.id,
                cliente: capitalString(maintenance.client.businessName),
                hora: moment(maintenance.service_hour, 'HH:mm').format('h:mm A'),
                fecha: moment(maintenance.service_date).format('DD/MM/YYYY'),
                tecnico: capitalString(maintenance.tech.techName),
            }
        })

    }, [item])
    
    // Maintenance Data Table paginated
    const maintenancePreview = useMemo(() => {
        return data?.maintenances?.map(maintenance => {
            return {
                id: maintenance.id,
                cliente: capitalString(maintenance.client.businessName),
                hora: moment(maintenance.service_hour, 'HH:mm').format('h:mm A'),
                fecha: moment(maintenance.service_date).format('DD/MM/YYYY'),
                tecnico: capitalString(maintenance.tech.techName),
            }
        })

    }, [data])
    
    const headers = ["orden servicio", "cliente", "hora", "fecha", "técnico"]

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
                Estado: maintenance.status,
                Actividades: maintenance.activities,
                "Voltaje en L1L2": maintenance.voltage_on_L1L2,
                "Voltaje en L1L3": maintenance.voltage_on_L1L3,
                "Voltaje en L2L3": maintenance.voltage_on_L2L3,
                "Amp motor 1": maintenance.amp_engine_1,
                "Amp motor 2": maintenance.amp_engine_2,
                "Amp motor 3": maintenance.amp_engine_3,
                "Amp motor 4": maintenance.amp_engine_4,
                "Control de voltaje": maintenance.voltage_control,
                "Amp motor evap": maintenance.amp_engine_evap,
                "Compresor 1 amp L1": maintenance.compressor_1_amp_L1,
                "Compresor 1 amp L2": maintenance.compressor_1_amp_L2,
                "Compresor 1 amp L3": maintenance.compressor_1_amp_L3,
                "Compresor 2 amp L1": maintenance.compressor_2_amp_L1,
                "Compresor 2 amp L2": maintenance.compressor_2_amp_L2,
                "Compresor 2 amp L3": maintenance.compressor_2_amp_L3,
                "Temperatura de suministro": maintenance.supply_temp,
                "Temperatura de retorno": maintenance.return_temp,
                "Temperatura del agua": maintenance.water_in_temp,
                "Temperatura agua salida": maintenance.water_out_temp,
                "Estado del rociador": maintenance.sprinkler_state,
                "Estado flotador": maintenance.float_state,
                "Descarga de presión": maintenance.discharge_pressure,
                "Descripción de la ubicación": maintenance?.location?.description,
                Cliente: capitalString(maintenance?.client?.businessName),
                Nit: maintenance?.client?.nit,
                "Dirección del cliente": maintenance?.client?.address,
                "Contacto cliente": `${maintenance?.client?.contact} - mail: ${maintenance?.client?.email} - tel: ${maintenance?.client?.phone}`,
                "Ciudad": maintenance?.client?.city,
                Técnico: capitalString(maintenance?.tech?.techName),
                "Hora Servicio": moment(maintenance.service_hour, 'HH:mm').format('h:mm A'),
                "Fecha Servicio": moment(maintenance.service_date).format('DD/MM/YYYY'),
                Sede: capitalString(maintenance?.headquarter?.headName),
                Ubicación: maintenance?.location?.locationName,
                Equipo: maintenance?.equipment?.name,
                Descripcion: maintenance?.equipment?.description,
                "Serial y Modelo": `${maintenance?.equipment?.serial} - ${maintenance?.equipment?.model}`,
                Tipo: capitalString(maintenance?.equipment?.type),
                Marca: maintenance?.equipment?.brand,
                Observaciones: maintenance.observations,
                "Firma técnico": maintenance.tech_sign,
                "Firma cliente": maintenance.customer_sign,
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
                        justifyContent: "space-evenly",
                        cursor: "pointer"
                    }}
                    // onClick={handleClickCSV}
                    onClick={() => {
                        openModalCSV()
                    }}
                >
                    Exportar CSV <MdDescription />
                </button>
                {
                    isOpenCSV ? (
                        <ModalCSV
                            onClose={closeModalCSV}
                            title="Reporte Mantenimiento CSV"
                            itemsCSV={
                                maintenancePreviewCSV === undefined ? [] : maintenancePreviewCSV
                            }
                            moduleName="mantenimiento"
                        />
                    ) : null
                }
            </Actions>
            <View>
                {
                    loading
                        ? <Loader />
                        : <><Table
                            headers={headers}
                            items={
                                maintenancePreview === undefined ? [] : maintenancePreview
                            }
                            actionItem={() => {
                                openModal()
                            }}
                        />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
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