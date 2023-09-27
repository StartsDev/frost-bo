import Title from "../title/Title";
import styles from "./modal.module.css";
import TableModalHead from "../../components/table/TableModalHead";
import TableModalLoc from "../../components/table/TableModalLoc";
import { Headquarter, Location } from "../../types";
import { useModal } from "../../hooks/useModal";

interface ModalProps {
  data: Record<string, any>;
  onClose: () => void;
  title: string;
  headTitle?: string;
  locatTitle?: string;
  headArray: Headquarter[];
  locationArray: Location[];
}

function Modal({
  data,
  onClose,
  title,
  headTitle,
  locatTitle,
  headArray,
  locationArray,
}: ModalProps) {
  const headersHead = ["Nombre"];
  const headersLocations = ["Nombre"];
  const { openModal, closeModal, isOpen } = useModal();
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ color: "black" }}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Title title={title} />
        {/* Div grid para detalles del cliente */}
        <div className={styles.modalDetailClientGrid}>
          {
          Object.entries(data).map(([key, value],index) =>(
            <div key={index} className={styles.modalItem}>
              <div className={styles.modalItemKeyCont}><span className={styles.modalItemKey}>{key}: </span></div>
              <div className={styles.modalItemValueCont}><span className={styles.modalItemValue}>{value}</span></div>
            </div>
          ))
          }
        </div>

        {/* Div container para Sedes y Ubicaciones */}
        <div className={styles.modalContainerHeadLoc}>
          <div className={styles.itemHeadLoc}>
            <Title title={headTitle} />
            <div>
              <TableModalHead
                headers={headersHead}
                items={headArray === undefined ? [] : headArray}
                title={headTitle}
                actionItem={() => {
                  openModal();
                }}
              />
            </div>
          </div>
          <div className={styles.itemHeadLoc}>
            {locatTitle && (
              <>
                <Title title={locatTitle} />
                <div>
                  <TableModalLoc
                    headers={headersLocations}
                    items={locationArray === undefined ? [] : locationArray}
                    title={locatTitle}
                    itemsH={headArray === undefined ? [] : headArray}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
