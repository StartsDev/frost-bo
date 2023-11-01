import React, { useEffect, useMemo, useState } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { Client, Equipment, Headquarter, Location } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";
import { ENDPOINT } from "../../config";
import axios from "axios";
import { useModalCSV } from "../../hooks/useModalCSV";
import ModalCSV from "../../components/modal/ModalCSV";
import Pagination from "../../utils/Pagination";
import moment from "moment";


type ClientResponse = Client & {
  equipments: Equipment[];
  headquarters: Headquarter[];
  locations: Location[];
  user_app?: any;
  createdAt:string;
};

type Response = {
  clients?: ClientResponse[];
  numItems?: number;
  currentPage: number;
  totalPages: number;
};

type ResponseItem = {
  clients?: ClientResponse[];
  numItmes: number
}

function Clients() {
  const headquartersArray: Headquarter[] = [];
  const locationsArray: Location[] = [];
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
        const response = await axios.get<Response>(`${ENDPOINT.clients.list}?page=${currentPage}&pageSize=${pageSize}`);
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

  //Data without pagination
  useEffect(() => {
    const fetchDataSingle = async () => {
        try {
            const response = await axios.get<Response>(ENDPOINT.clients.list);
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

  const clientsPreviewCSV = useMemo(() => {
    return item?.clients?.map((client) => {
      const preview: Client = {
        nit: client.nit,
        businessName: capitalString(client.businessName),
        contact: capitalString(client.contact),
        phone: client.phone,
        address: capitalString(client.address),
        city: capitalString(client.city),
        fecha: moment(client.createdAt).format('DD/MM/YYYY'),
        email: client.email,
      };

      return preview;
    });
  }, [item]);
  
  const clientsPreview = useMemo(() => {
    return data?.clients?.map((client) => {
      const preview: Client = {
        nit: client.nit,
        businessName: capitalString(client.businessName),
        contact: capitalString(client.contact),
        phone: client.phone,
        address: capitalString(client.address),
        city: capitalString(client.city),
        fecha: moment(client.createdAt).format('DD/MM/YYYY'),
        email: client.email,
      };

      return preview;
    });
  }, [data]);
  
  const clientDetail = useMemo(() => {
    const client =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const nitClient: string = client?.nit;

    const filteredClient = data?.clients?.filter(
      (client) => client.nit === nitClient
    );

    const mapObject = filteredClient?.map((client) => {
      client.headquarters?.map((head) => headquartersArray.push(head));
      client.locations?.map((location) => locationsArray.push(location));
      return {
        Nit: client.nit,
       'Razon Social': capitalString(client.businessName),
        Contacto: capitalString(client.contact),
        Teléfono: client.phone,
        Dirección: capitalString(client.address),
        Ciudad: capitalString(client.city),
        Email: client.email,
      };
    });
    return mapObject?.[0];
  }, [isOpen]);

  const headers = [
    "nit",
    "Razon Social",
    "contacto",
    "teléfono",
    "dirección",
    "ciudad",
    "fecha",
    "email",
  ];
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
                            title="Reporte Clientes CSV"
                            itemsCSV={
                              clientsPreviewCSV === undefined ? [] : clientsPreviewCSV
                            }
                            moduleName="clientes"
                        />
                    ) : null
                }
      </Actions>
      <View>
        {loading ? (
          <Loader />
        ) : (<>
          <Table
            headers={headers}
            items={clientsPreview === undefined ? [] : clientsPreview}
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
        )}
      </View>
      {isOpen ? (
        <Modal
          data={clientDetail === undefined ? {} : clientDetail}
          onClose={closeModal}
          title="Cliente"
          headTitle="Sedes"
          locatTitle="Ubicaciones"
          headArray={headquartersArray}
          locationArray={locationsArray}
        />
      ) : null}
    </div>
  );
}

export default Clients;
