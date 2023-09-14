import { useMemo } from "react";
import Actions from "../../components/actions/Actions";
import View from "../../components/view/View";
import Table from "../../components/table/Table";
import { THEME } from "../../theme";
import { MdDescription } from "react-icons/md";
import { useFetcher } from "../../hooks/useFetcher";
import { ENDPOINT } from "../../config";
import { Client, Equipment, Headquarter } from "../../types";
import Loader from "../../components/Loader/Loader";
import { useModal } from "../../hooks/useModal";
import Modal from "../../components/modal/Modal";

type ClientResponse = Client & {
  equipments: Equipment[];
  headquaerters: Headquarter[];
  locations: Location[];
  user_app?: any;
};

type Response = {
  clients?: ClientResponse[];
  numItems?: number;
};

function Clients() {
  const { data, loading } = useFetcher<Response>({
    method: "GET",
    url: ENDPOINT.clients.list,
  });

  const { openModal, closeModal, isOpen } = useModal();

  const clientsPreview = useMemo(() => {
    return data?.clients?.map((client) => {
      const preview: Client = {
        nit: client.nit,
        businessName: client.businessName,
        contact: client.contact,
        phone: client.phone,
        address: client.address,
        city: client.city,
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
      return {
        nit: client.nit,
        negocio: client.businessName,
        contacto: client.contact,
        telefono: client.phone,
        direccion: client.address,
        ciudad: client.city,
        email: client.email,
      };
    });
    return mapObject?.[0];
  }, [isOpen]);

  const headers = [
    "nit",
    "negocio",
    "contacto",
    "telefono",
    "direccion",
    "ciudad",
    "email",
  ];

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
          exportar csv <MdDescription />
        </button>
      </Actions>
      <View>
        {loading ? (
          <Loader />
        ) : (
          <Table
            headers={headers}
            items={clientsPreview === undefined ? [] : clientsPreview}
            actionItem={() => {
              openModal();
            }}
          />
        )}
      </View>
      {isOpen ? (
        <Modal
          data={clientDetail === undefined ? {} : clientDetail}
          onClose={closeModal}
          title="Detalle del cliente"
        />
      ) : null}
    </div>
  );
}

export default Clients;
