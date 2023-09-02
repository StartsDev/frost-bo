import Title from '../title/Title';
import styles from './modal.module.css';

interface ModalProps {
  data: Record<string, any>
  onClose: () => void
  title: string
}

function Modal({ data, onClose, title }: ModalProps){
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{overflowY: "scroll"}} >
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Title title={title} />
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={styles.modalItem}>
            <span className={styles.modalItemKey}>{key}: </span>
            <span className={styles.modalItemValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;