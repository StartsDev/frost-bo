import { useEffect, useMemo, useState } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { ENDPOINT } from "../../config";
import type { Location, Equipment } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";
import { uuidToShortenedInteger } from "../../utils/uuidToInt";
import axios from "axios";
import Pagination from "../../utils/Pagination";
import { useModalCSV } from "../../hooks/useModalCSV";
import ModalCSV from "../../components/modal/ModalCSV";
import moment from "moment";

type Response = {
  locations?: Location[];
  numItmes: number;
  currentPage: number;
  totalPages: number;
};

type ResponseItem = {
  locations?: Location[];
  numItmes: number
}

function Locations() {
  const [data, setData] = useState<Response | null>(null);
  const [item, setItem] = useState<ResponseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(8);
  const equipmentArray: Equipment[] = [];
  const locationArray: Location[] = [];

  //Pagination Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Response>(`${ENDPOINT.location.list}?page=${currentPage}&pageSize=${pageSize}`);
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
        const response = await axios.get<Response>(ENDPOINT.location.list);
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

  // location data report CSV not paginated
  const locationPreviewCSV = useMemo(() => {
    return item?.locations?.map((location) => {
      locationArray.push(location)
      return {
        id: uuidToShortenedInteger(location.id, 5),
        nombre: capitalString(location.locationName),
        negocio: location.client?.businessName
          ? capitalString(location.client.businessName)
          : undefined,
        sede: location.headquarter?.headName
          ? capitalString(location.headquarter.headName)
          : undefined,
        fecha: moment(location.createdAt).format('DD/MM/YYYY')
      };
    });
  }, [item]);

  // Location Data Table paginated
  const locationPreview = useMemo(() => {
    return data?.locations?.map((location) => {
      locationArray.push(location)
      return {
        id: uuidToShortenedInteger(location.id, 5),
        nombre: capitalString(location.locationName),
        negocio: location.client?.businessName
          ? capitalString(location.client.businessName)
          : undefined,
        sede: location.headquarter?.headName
          ? capitalString(location.headquarter.headName)
          : undefined,
        fecha: moment(location.createdAt).format('DD/MM/YYYY')
      };
    });
  }, [data]);

  //const locationPreviewFiltered =
  const headers = ["id", "ubicación", "sede", "negocio", "fecha"];

  const locationDetail = useMemo(() => {
    const locate =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const idS: number = locate?.id
    const filteredLocation = data?.locations?.filter(
      (location) => uuidToShortenedInteger(location.id, 5) === idS
    );

    const mapObject = filteredLocation?.map((location) => {
      location.equipments?.map((equipment) => equipmentArray.push(equipment));
      return {
        Ubicación: capitalString(location.locationName),
        Negocio: location.client?.businessName
          ? capitalString(location.client.businessName)
          : undefined,
        Sede: location.headquarter?.headName
          ? capitalString(location.headquarter.headName)
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
          Exportar CSV <MdDescription />
        </button>
        {
          isOpenCSV ? (
            <ModalCSV
              onClose={closeModalCSV}
              title="Reporte Ubicaciones CSV"
              itemsCSV={
                locationPreviewCSV === undefined ? [] : locationPreviewCSV
              }
              moduleName="ubicaciones"
            />
          ) : null
        }
      </Actions>
      <View>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Table
              headers={headers}
              items={locationPreview === undefined ? [] : locationPreview}
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
          data={locationDetail!}
          onClose={closeModal}
          title="Ubicación"
          equipmentTitle="Equipos"
          equipmentArray={equipmentArray}
        />
      ) : null}
    </div>
  );
}

export default Locations;
