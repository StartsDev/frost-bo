import React, { useEffect, useMemo, useState } from "react"
import Actions from "../../components/actions/Actions"
import View from "../../components/view/View"
import Table from "../../components/table/Table"
import { THEME } from "../../theme"
import { MdDescription } from "react-icons/md"
import type { User } from "../../types"
import Loader from "../../components/Loader/Loader"
import axios from "axios"
import { ENDPOINT } from "../../config"
import { useModalCSV } from "../../hooks/useModalCSV"
import ModalCSV from "../../components/modal/ModalCSV"
import Pagination from "../../utils/Pagination"
import moment from "moment"
import { capitalString } from "../../utils/capitalizeStr"

type Response = {
    users?: User[]
    numItmes: number;
    currentPage: number;
    totalPages: number;
}

type ResponseItem = {
    users?: User[]
    numItmes: number
}

function Users() {
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
                const response = await axios.get<Response>(`${ENDPOINT.auth.users}?page=${currentPage}&pageSize=${pageSize}`);
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
                const response = await axios.get<Response>(ENDPOINT.auth.users);
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
    const { openModalCSV, closeModalCSV, isOpenCSV } = useModalCSV();

    const userPreviewCSV = useMemo(() => {
        return item?.users?.map(user => {
            return {
                documento: user.numIdent,
                tipo: capitalString(user.Identification.name),
                nombre: capitalString(`${user.firstName} ${user.lastName}`),
                email: user.email,
                phone: user.phone,
                rol: user.Role.role,
                fecha: moment(user.createdAt).format('DD/MM/YYYY')
            }
        })
        
    }, [item])

    const userPreview = useMemo(() => {
        return data?.users?.map(user => {
            return {
                documento: user.numIdent,
                tipo: capitalString(user.Identification.name),
                nombre: capitalString(`${user.firstName} ${user.lastName}`),
                email: user.email,
                phone: user.phone,
                rol: user.Role.role,
                fecha: moment(user.createdAt).format('DD/MM/YYYY')
            }
        })

    }, [data])

    const headers = ["documento", "tipo", "nombre", "email", "teléfono", "rol", "fecha"]

    return (
        <div>
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
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        openModalCSV()
                    }}
                >
                    Exportar a Excel <MdDescription />
                </button>
                {
                    isOpenCSV ? (
                        <ModalCSV
                            onClose={closeModalCSV}
                            title="Reporte Usuarios CSV"
                            itemsCSV={
                                userPreviewCSV === undefined ? [] : userPreviewCSV
                            }
                            moduleName="usuarios"
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
                                userPreview === undefined ? [] : userPreview
                            }
                        />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                }
            </View>
        </div>
    )
}


export default Users