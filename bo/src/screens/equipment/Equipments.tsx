import { useEffect, useMemo, useState } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import { ENDPOINT } from "../../config"
import type { Equipment } from "../../types"
import Loader from "../../components/Loader/Loader"
import axios from "axios"
import { useModalCSV } from "../../hooks/useModalCSV"
import moment from "moment"
import { useModal } from "../../hooks/useModal"
import { capitalString } from "../../utils/capitalizeStr"
import Pagination from "../../utils/Pagination"
import ModalCSV from "../../components/modal/ModalCSV"
import Modal from "../../components/modal/Modal"


type Response = {
    equipments?: Equipment[]
    numItmes: number;
    currentPage: number;
    totalPages: number;
}

type ResponseItem = {
    equipments?: Equipment[]
    numItmes: number
}

function Equipments() {
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
                const response = await axios.get<Response>(`${ENDPOINT.equipment.list}?page=${currentPage}&pageSize=${pageSize}`);
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

    useEffect(() => {
        const fetchDataSingle = async () => {
            try {
                const response = await axios.get<Response>(ENDPOINT.equipment.list);
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataSingle();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const { openModal, closeModal, isOpen } = useModal();
    const { openModalCSV, closeModalCSV, isOpenCSV } = useModalCSV();

    const equipmentPreviewCSV = useMemo(() => {
        return item?.equipments?.map(equipment => {
            return {
                serial: equipment.serial,
                nombre: capitalString(equipment.name),
                modelo: equipment.model,
                tipo: capitalString(equipment.type),
                marca: capitalString(equipment.brand),
                fecha: moment(equipment.createdAt).format('DD/MM/YYYY')
            }

        })

    }, [item])

    const equipmentPreview = useMemo(() => {
        return data?.equipments?.map(equipment => {

            return {
                serial: equipment.serial,
                nombre: capitalString(equipment.name),
                modelo: equipment.model,
                tipo: capitalString(equipment.type),
                marca: capitalString(equipment.brand),
                fecha: moment(equipment.createdAt).format('DD/MM/YYYY')
            }

        })

    }, [data])

    const headers = ["serial", "nombre", "modelo", "tipo", "marca", "fecha"]

    const equipmentDetail = useMemo(() => {
        const locate =
            localStorage.getItem("item") === null
                ? {}
                : JSON.parse(localStorage.getItem("item")!);

        const serialS: string = locate?.serial;

        const filteredEquipment = data?.equipments?.filter(
            (equipment) => equipment.serial === serialS
        );

        const mapObject = filteredEquipment?.map((equipment) => {
            //location.equipments?.map((equipment) => equipmentArray.push(equipment));
            return {
                Serial: capitalString(equipment.serial),
                Nombre: equipment.name
                    ? capitalString(equipment.name)
                    : undefined,
                Modelo: equipment.model
                    ? capitalString(equipment.model)
                    : undefined,
                Tipo: capitalString(equipment.type),
                Marca: capitalString(equipment.brand)
            };
        });
        return mapObject?.[0];
    }, [isOpen]);

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
                            title="Reporte Equipos CSV"
                            itemsCSV={
                                equipmentPreviewCSV === undefined ? [] : equipmentPreviewCSV
                            }
                            moduleName="equipos"
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
                                equipmentPreview === undefined ? [] : equipmentPreview
                            }
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
                }
            </View>
            {isOpen ? (
                <Modal
                    data={equipmentDetail!}
                    onClose={closeModal}
                    title="Equipo"
                />
            ) : null}
        </div>
    )
}


export default Equipments