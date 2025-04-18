import React, { useEffect, useMemo, useState } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { ENDPOINT } from "../../config";
import type { Maintenance } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import { useModalCSV } from "../../hooks/useModalCSV";
import Modal from "../../components/modal/Modal";
import ModalCSV from "../../components/modal/ModalCSV";
import moment from "moment";
import Pagination from "../../utils/Pagination";
import axios from "axios";
import { capitalString } from "../../utils/capitalizeStr";
import { padNumber } from "../../utils/helpers";

// Tipos para la respuesta del API
type Response = {
    maintenances?: Maintenance[];
    numItems: number;
    currentPage: number;
    totalPages: number;
};

type ResponseItem = {
    maintenances?: Maintenance[];
    numItems: number;
};

function Maintenances() {
    const [data, setData] = useState<Maintenance[] | null>(null);
    const [allData, setAllData] = useState<Maintenance[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(8);

    // Filtros para nombre, orden y fecha
    const [filterName, setFilterName] = useState<string>("");
    const [filterOrder, setFilterOrder] = useState<number | null>(null);
    const [filterDate, setFilterDate] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const hasDate = filterDate !== null && filterDate !== "" ? filterDate : null;
            let url = `${ENDPOINT.maintanance.list}?page=${hasDate ? 1 : currentPage}&pageSize=${hasDate ? 100 : 9}`;

            if (filterOrder !== null && filterOrder > 0) {
                url += `&order=${filterOrder}`;
            }
            if (filterName !== "") {
                url += `&name=${filterName}`;
            }
            if (hasDate) {
                url += `&date=${filterDate}`;
            }
            const response = await axios.get<Response>(url);
            const fetchedData = response.data.maintenances || [];

            setAllData(fetchedData);
            const filteredData = applyFilters(fetchedData);
            setData(filteredData);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchData();
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [filterName, filterOrder]);

    useEffect(() => {
        fetchData();
    }, [filterDate]);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    // Aplicar los filtros
    const applyFilters = (data: Maintenance[]) => {
        return data.filter((maintenance) => {
            const matchesName = maintenance.client.businessName
                .toLowerCase()
                .includes(filterName.toLowerCase());
            const matchesOrder = filterOrder
                ? maintenance.id === filterOrder
                : true;
            const matchesDate = filterDate
                ? moment(maintenance.service_date).isSame(
                    moment(filterDate),
                    "day"
                )
                : true;
            return matchesName && matchesOrder && matchesDate;
        });
    };

    // Manejador de cambio de página
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Reseteo de los filtros al recargar la página
    useEffect(() => {
        resetFilters();
    }, []);


    const maintenancePreview = useMemo(() => {
        return data?.map((maintenance) => ({
            id: padNumber(maintenance.id),
            cliente: capitalString(maintenance.client.businessName),
            hora: moment(maintenance.service_hour, "HH:mm").format("h:mm A"),
            fecha: moment(maintenance.service_date).format("DD/MM/YYYY"),
            tecnico: capitalString(maintenance.tech.techName),
        }));
    }, [data, currentPage, pageSize]);

    // Resetear los filtros y paginación
    const resetFilters = () => {
        setFilterName("");
        setFilterOrder(null);
        setFilterDate(null);

        setData(allData);
        setTotalPages(Math.ceil(allData?.length!! / pageSize || 1));
        setCurrentPage(1);
    };

    // Columnas de la tabla
    const headers = ["Orden Servicio", "Cliente", "Hora", "Fecha", "Técnico"];

    const { openModal, closeModal, isOpen } = useModal();
    const { openModalCSV, closeModalCSV, isOpenCSV } = useModalCSV();

    const maintenanceDetail = useMemo(() => {

        const current = localStorage.getItem('item') === null
            ? {}
            : JSON.parse(localStorage.getItem('item')!)

        const idS: string = current?.id

        const filteredMaintenance = data?.
            filter(maintenance => maintenance.id === Number(idS))

        const mapObject = filteredMaintenance?.map(maintenance => {
            return {
                "Orden de trabajo": padNumber(maintenance.id),
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
                "Presión de succión": maintenance.suction_pressure,
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
            {/* Filtros */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Orden de servicio"
                    value={filterOrder || ""}
                    onChange={(e) => setFilterOrder(Number(e.target.value))}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="text"
                    placeholder="Cliente"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    style={{ marginRight: "10px" }}
                />
                <input
                    type="date"
                    placeholder="Fecha"
                    value={filterDate || ""}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
                <button
                    onClick={resetFilters}
                    style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        backgroundColor: THEME.blue,
                        color: THEME.white,
                        borderRadius: 5,
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Resetear filtros
                </button>
            </div>

            {/* Modal CSV */}
            <Actions>
                <button
                    style={{
                        width: 130,
                        height: 30,
                        backgroundColor: THEME.black,
                        color: THEME.white,
                        border: "none",
                        borderRadius: 5,
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        openModalCSV();
                    }}
                >
                    Exportar a Excel <MdDescription />
                </button>
                {isOpenCSV && (
                    <ModalCSV
                        onClose={closeModalCSV}
                        title="Reporte Mantenimiento CSV"
                        itemsCSV={[]}
                        moduleName="mantenimiento"
                    />
                )}
            </Actions>
            {/* Tabla de mantenimiento */}
            <View>
                {loading ? (
                    <Loader />
                ) : data && data.length > 0 ? (
                    <>
                        <Table
                            headers={headers}
                            items={maintenancePreview || []}
                            actionItem={() => {
                                openModal();
                            }}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        No se encontraron datos
                    </div>
                )}
            </View>

            {/* Modal de detalles */}
            {isOpen && (
                <Modal
                    data={maintenanceDetail || {}}
                    onClose={closeModal}
                    title="Detalle del Mantenimiento"
                    image={""}
                    headArray={[]}
                    locationArray={[]}
                    equipmentArray={[]}
                />
            )}
        </div>
    );
}

export default Maintenances;