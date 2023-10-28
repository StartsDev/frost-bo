import { useEffect, useMemo, useState } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
//import { useFetcher } from "../../hooks/useFetcher";
import { ENDPOINT } from "../../config";
import type { Headquarter, Location } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";
import axios from "axios";
import { useModalCSV } from "../../hooks/useModalCSV";
import moment from "moment";
import ModalCSV from "../../components/modal/ModalCSV";
import Pagination from "../../utils/Pagination";

type Response = {
  headquarters?: Headquarter[];
  numItmes: number;
  currentPage: number;
  totalPages: number;
};

type ResponseItem = {
  headquarters?: Headquarter[];
  numItmes: number
}

function Squares() {
  const [data, setData] = useState<Response | null>(null);
  const [item, setItem] = useState<ResponseItem | null>(null);
  const locationsArray: Location[] = [];
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(5);

  //Pagination Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Response>(`${ENDPOINT.squares.list}?page=${currentPage}&pageSize=${pageSize}`);
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

  //Not paginated Data
  useEffect(() => {
    const fetchDataSingle = async () => {
      try {
        const response = await axios.get<Response>(ENDPOINT.squares.list);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataSingle();
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { openModal, closeModal, isOpen } = useModal();
  const { openModalCSV, closeModalCSV, isOpenCSV } = useModalCSV();

  const squarePreviewCSV = useMemo(() => {
    return item?.headquarters?.map((headSquare) => {
      return {
        nombre: capitalString(headSquare.headName),
        telefono: headSquare.phone,
        direccion: capitalString(headSquare.address),
        principal: headSquare.isPrincipal ? "Sí" : "No",
        fecha: moment(headSquare.createdAt).format('DD/MM/YYYY'),
      };
    });
  }, [item]);

  const squarePreview = useMemo(() => {
    return data?.headquarters?.map((headSquare) => {
      return {
        nombre: capitalString(headSquare.headName),
        telefono: headSquare.phone,
        direccion: capitalString(headSquare.address),
        principal: headSquare.isPrincipal ? "Sí" : "No",
        fecha: moment(headSquare.createdAt).format('DD/MM/YYYY'),
      };
    });
  }, [data]);


  const headers = ["Nombre", "Teléfono", "Dirección", "Principal", "Fecha"];

  const squareDetail = useMemo(() => {
    const square =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const phoneS: string = square?.telefono;

    const filteredClient = data?.headquarters?.filter(
      (headSquare) => headSquare.phone === phoneS
    );

    const mapObject = filteredClient?.map((headSquare) => {
      headSquare.locations?.map((location) => locationsArray.push(location));
      return {
        Nombre: capitalString(headSquare.headName),
        Teléfono: headSquare.phone,
        Dirección: capitalString(headSquare.address),
        Email: headSquare.email,
        Principal: headSquare.isPrincipal ? "Sí" : "No",
        Estado: headSquare.status ? "Activo" : "Inactivo",
        'Nombre Cliente': headSquare.Client?.contact
          ? capitalString(headSquare.Client.contact)
          : undefined,
        'Dirección Cliente': headSquare.Client?.address
          ? capitalString(headSquare.Client.address)
          : undefined,
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
          export csv <MdDescription />
        </button>
        {
          isOpenCSV ? (
            <ModalCSV
              onClose={closeModalCSV}
              title="Reporte Sedes CSV"
              itemsCSV={
                squarePreviewCSV === undefined ? [] : squarePreviewCSV
              }
              moduleName="sedes"
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
            items={squarePreview === undefined ? [] : squarePreview}
            actionItem={() => {
              openModal();
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>)}
      </View>
      {isOpen ? (
        <Modal
          data={squareDetail!}
          onClose={closeModal}
          title="Sede"
          locatTitle="Ubicaciones"
          locationArray={locationsArray}
        />
      ) : null}
    </div>
  );
}

export default Squares;
