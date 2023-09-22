import { useMemo } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { useFetcher } from "../../hooks/useFetcher";
import { ENDPOINT } from "../../config";
import type { Headquarter } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";
import { capitalString } from "../../utils/capitalizeStr";

type Response = {
  headquarters?: Headquarter[];
};

function Squares() {
  const { data, loading } = useFetcher<Response>({
    method: "GET",
    url: ENDPOINT.squares.list,
  });

  const { openModal, closeModal, isOpen } = useModal();

  const squarePreview = useMemo(() => {
    return data?.headquarters?.map((headSquare) => {
      return {
        nanme: capitalString(headSquare.headName),
        phone: headSquare.phone,
        address: capitalString(headSquare.address),
        isPrincipal: headSquare.isPrincipal ? "Sí" : "No",
      };
    });
  }, [data]);
  const headers = ["Nombre", "Teléfono", "Dirección", "Principal"];

  const squareDetail = useMemo(() => {
    const square =
      localStorage.getItem("item") === null
        ? {}
        : JSON.parse(localStorage.getItem("item")!);

    const phoneS: string = square?.phone;

    const filteredClient = data?.headquarters?.filter(
      (headSquare) => headSquare.phone === phoneS
    );

    const mapObject = filteredClient?.map((headSquare) => {
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
            items={squarePreview === undefined ? [] : squarePreview}
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
          title="Sede"
          headTitle="Ubicaciones"
        />
      ) : null}
    </div>
  );
}

export default Squares;
