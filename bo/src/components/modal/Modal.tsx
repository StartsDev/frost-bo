import Title from "../title/Title";
import styles from "./modal.module.css";
import TableModalHead from "../../components/table/TableModalHead";
import TableModalLoc from "../../components/table/TableModalLoc";
import TableModalEquipment from "../../components/table/TableModalEquipment";
import { Headquarter, Location, Equipment } from "../../types";
import Headmaint from "../../screens/maintenance/Headermaint";
import { useModal } from "../../hooks/useModal";



interface ModalProps {
  data: Record<string, any>;
  onClose: () => void;
  title: string;
  headTitle?: string;
  locatTitle?: string;
  equipmentTitle?: string;
  headArray: Headquarter[];
  locationArray: Location[];
  equipmentArray: Equipment[];
}

function Modal({
  data,
  onClose,
  title,
  headTitle,
  locatTitle,
  equipmentTitle,
  headArray,
  locationArray,
  equipmentArray,
}: ModalProps) {
  const headersHead = ["Nombre"];
  const headersLocations = ["Nombre"];
  const headersEquipments = ["Serial", "Nombre", "Modelo", "Tipo", "Marca"];
  //const { openModal, closeModal, isOpen } = useModal();

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ overflowY: "scroll", color: "black" }}>

        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <Title title={title} />

        {title === "Mantenimiento" ?
          <>
            <Headmaint data={data} title={title} />
            {/* Div grid para detalles del mantenimiento */}
            <div className={styles.modalDetailClientGrid}>
              {
                Object.entries(data).filter(([key]) => key !== "Actividades" && key !== "Estado" && key !== "Cliente" && key !== "Sede" && key !== "Nit" && key !== "Ciudad" && key !== "Contacto cliente" && key !== "Nº Orden" && key !== "Tipo" && key !== "Marca" && key !== "Serial y Modelo" && key !== "Ubicacion")
                  .map(([key, value], index) => (
                    <div key={index} className={styles.modalItem}>
                      <div className={styles.modalItemKeyCont}><span className={styles.modalItemKey}>{key}: </span></div>
                      <div className={styles.modalItemValueCont}><span className={styles.modalItemValue}>{value}</span></div>
                    </div>
                  ))
              }
            </div>
          </> :
          <div>
             {/* Detalles */}
            <div className={styles.modalDetailClientGrid}>
              {
                Object.entries(data).map(([key, value], index) => (
                  <div key={index} className={styles.modalItem}>
                    <div className={styles.modalItemKeyCont}><span className={styles.modalItemKey}>{key}: </span></div>
                    <div className={styles.modalItemValueCont}><span className={styles.modalItemValue}>{value}</span></div>
                  </div>
                ))
              }
            </div>

            {/* Div container para Sedes y Ubicaciones */}
            <div className={styles.modalContainerHeadLoc}>

              {/* Tabla Equipos */}
              {equipmentTitle &&
                (
                  <div className={styles.itemHeadLoc}>
                    <Title title={equipmentTitle} />
                    <div>
                      <TableModalEquipment
                        headers={headersEquipments}
                        items={equipmentArray === undefined ? [] : equipmentArray}
                        title={equipmentTitle}
                      />
                    </div>
                  </div>
                )
              }

              {/* Tabla Sedes */}
              {headTitle && (
                <div className={styles.itemHeadLoc}>
                  <Title title={headTitle} />
                  <div>
                    <TableModalHead
                      headers={headersHead}
                      items={headArray === undefined ? [] : headArray}
                      title={headTitle}
                    />
                  </div>
                </div>
              )}

              {/* Tabla Ubicaciones */}
              {locatTitle && (
                <div className={styles.itemHeadLoc}>
                  <Title title={locatTitle} />
                  <div>
                    <TableModalLoc
                      headers={headersLocations}
                      items={locationArray === undefined ? [] : locationArray}
                      title={locatTitle}
                      itemsH={headArray === undefined ? [] : headArray}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>}
      </div>
    </div >
  );
}

export default Modal;
