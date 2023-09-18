import Title from "../title/Title";
import styles from "./modal.module.css";
import TableModalHead from "../../components/table/TableModalHead";
import TableModalLoc from "../../components/table/TableModalLoc";
import { Headquarter, Location } from "../../types";

interface ModalProps {
  data: Record<string, any>;
  onClose: () => void;
  title: string;
  headTitle: string;
  locatTitle: string;
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
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ color: "black" }}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Title title={title} />
        {/* Div grid para detalles del cliente */}
        <div className={styles.modalDetailClientGrid}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className={styles.modalItem}>
              <span className={styles.modalItemKey}>{key}: </span>
              <span className={styles.modalItemValue}>{value}</span>
            </div>
          ))}
        </div>
        {/* Div container para Sedes y Ubicaciones */}
        <div className={styles.modalContainerHeadLoc}>
          <div className={styles.itemHeadLoc}>
            <Title title={headTitle} />
            <div>
              <TableModalHead
                headers={headersHead}
                items={headArray === undefined ? [] : headArray}
              />
            </div>
          </div>
          <div className={styles.itemHeadLoc}>
            <Title title={locatTitle} />
            <div>
              <TableModalLoc
                headers={headersLocations}
                items={locationArray === undefined ? [] : locationArray}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
