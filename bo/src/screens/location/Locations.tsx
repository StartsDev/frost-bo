import { useMemo } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { useFetcher } from "../../hooks/useFetcher";
import { ENDPOINT } from "../../config";
import type { Location, Equipment } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";

type Response = {
  locations?: Location[];
};

function Locations() {
  const equipmentArray: Equipment[] = [];
  const locationArray : Location [] =[];
  const { data, loading } = useFetcher<Response>({
    method: "GET",
    url: ENDPOINT.location.list,
  });

  const { openModal, closeModal, isOpen } = useModal();  
  const locationPreview = useMemo(() => {
    return data?.locations?.map((location,index) => {
      locationArray.push(location)
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
  const copiaArray = locationPreview?.slice();
  //const locationPreviewFiltered =
  const headers = ["registro", "ubicación", "sede", "negocio"];

  const locationDetail = useMemo(() => {
    const locate =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const idS: string = locate?.id;

    const filteredLocation = data?.locations?.filter(
      (location) => location.id === idS
    );
    //console.log(filteredLocation)
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
          }}
        >
          export csv <MdDescription />
        </button>
      </Actions>
      <View>
        {loading ? (
          <Loader />
        ) : (
          <>
          {console.log(locationPreview)}
          <Table
            headers={headers}
            items={locationPreview === undefined?[] : locationPreview}
            actionItem={() => {
              openModal();
            }}
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
          equipmentArray = {equipmentArray}
        />
      ) : null}
    </div>
  );
}

export default Locations;
