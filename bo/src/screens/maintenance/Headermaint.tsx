import styles from "../../components/modal/modal.module.css";

interface HeaderProps {
    data: Record<string, any>;
    title: string;
  }

function Headmaint({data, title}):HeaderProps{
    return (
        <div>
        {
         Object.entries(data).map(([key, value],index) =>(
            <div key={index} className={styles.modalItemHeader}>
                {key==="Cliente" || key==="Estado" || key==="Sede" || key ==="Nit" || key ==="Ciudad" || key==="Contacto cliente" || key==="Nº Orden" || key ==="Tipo" || key ==="Marca" || key==="Serial y Modelo" || key==="Ubicacion"?<>
              <div className={styles.modalItemKeyHead}><span className={styles.ItemKey}>{key}: </span></div>
              <div className={styles.modalItemValueHead}><span className={styles.ItemValue}>{value}</span></div></>:null
                }
            </div>
        ))
        }
        </div>
    )
}


export default Headmaint;