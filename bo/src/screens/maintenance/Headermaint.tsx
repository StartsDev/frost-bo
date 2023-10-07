import styles from "../../components/modal/modal.module.css";

interface HeaderProps {
  data: Record<string, any>;
  title: string;
}

function Headmaint({ data }): HeaderProps {
  const keysPermitidas = [
    "Cliente",
    "Estado",
    "Sede",
    "Nit",
    "Ciudad",
    "Contacto cliente",
    "Nº Orden",
    "Tipo",
    "Marca",
    "Serial y Modelo",
    "Ubicación",
    "Equipo",
    "Técnico",
    "Direcion del cliente",
    "Fecha Servicio",
    "Hora Servicio",
  ];
  return (
    <div>
      {
        Object.entries(data).map(([key, value], index) => (
          <div key={index} className={styles.modalItemHeader}>
            {keysPermitidas.includes(key) ? <>
              <div className={styles.modalItemKeyHead}><div className={styles.ItemKey}>{key}: </div></div>
              <div className={styles.modalItemValueHead}><div className={styles.ItemValue}>{value}</div></div></> : null
            }
          </div>
        ))
      }
    </div>
  )
}


export default Headmaint;