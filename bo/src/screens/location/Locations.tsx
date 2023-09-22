import { useMemo } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { useFetcher } from "../../hooks/useFetcher";
import { ENDPOINT } from "../../config";
import type { Location } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";

type Response = {
  locations?: Location[];
};

function Locations() {
  const { data, loading } = useFetcher<Response>({
    method: "GET",
    url: ENDPOINT.location.list,
  });

  const { openModal, closeModal, isOpen } = useModal();

  const locationPreview = useMemo(() => {
    return data?.locations?.map((location) => {
      return {
        id: location.id,
        nombre: capitalString(location.locationName),
        negocio: location.client?.businessName
        ? capitalString(location.client.businessName)
        : undefined,
        sede: location.headquarter?.headName
          ? capitalString(location.headquarter.headName)
          : undefined,
      };
    });
  }, [data]);
  //const locationPreviewFiltered =
  const headers = ["ubicación", "sede", "negocio"];

  const squareDetail = useMemo(() => {
    const locate =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const idS: string = locate?.nombre;

    const filteredClient = data?.locations?.filter(
      (location) => location.locationName === idS
    );
    const mapObject = filteredClient?.map((location) => {
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
  console.log('SQUARE', squareDetail)
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
          }}
        >
          export csv <MdDescription />
        </button>
      </Actions>
      <View>
        {loading ? (
          <Loader />
        ) : (
          <Table
            headers={headers}
            items={
              locationPreview === undefined
                ? []
                : locationPreview.map((loc) => {
                    return {
                      nombre: loc.nombre,
                      sede: loc.sede,
                      negocio: loc.negocio,
                    };
                  })
            }
            actionItem={() => {
              openModal();
            }}
          />
        )}
      </View>
      {isOpen ? (
        <Modal
          data={squareDetail!}
          onClose={closeModal}
          title="Ubicación"
          headTitle="Equipos"
        />
      ) : null}
    </div>
  );
}

export default Locations;
