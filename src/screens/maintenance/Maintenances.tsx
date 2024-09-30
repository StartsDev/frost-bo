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
    const [pageSize] = useState(8); // Tamaño de la página fijo para simplicidad

    // Filtros para nombre, orden y fecha
    const [filterName, setFilterName] = useState<string>("");
    const [filterOrder, setFilterOrder] = useState<number | null>(null);
    const [filterDate, setFilterDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Response>(
                    `${ENDPOINT.maintanance.list}`
                );
                const fetchedData = response.data.maintenances || [];
                setAllData(fetchedData);
                setData(fetchedData); // Establece los datos originales aquí
                setTotalPages(Math.ceil(fetchedData.length / pageSize));
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const handleApplyFilters = () => {
        const filteredData = applyFilters(allData || []);
        setData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / pageSize));
        setCurrentPage(1);
    };

    const maintenancePreview = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const paginatedData = data?.slice(start, end);
        return paginatedData?.map((maintenance) => ({
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
                    onClick={handleApplyFilters}
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
                    Aplicar filtros
                </button>

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
                    data={{}}
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
