import React from "react";
import styles from "../../components/modal/modal.module.css";


const imgStyle = {
    width: '50px',
    height: '50px',
}

interface FooterProps {
    data: Record<string, any>;
}

const FooterMaint = ({ data }): FooterProps => {
    const keysPermitidas = ["Observaciones", "Firma técnico", "Firma cliente"];

    return (<>
        {
            Object.entries(data).map(([key, value], index) => (
                <div key={index} className={styles.modalItemFooter}>
                    {
                        keysPermitidas.includes(key) &&
                        <>
                            {
                                key === "Observaciones" ? <>
                                    <div className={styles.modalItemKeyFoot}><div className={styles.footItemKey}>{key}: </div></div>
                                    <div>
                                        <textarea className={styles.modalItemValueFoot} rows="10" cols="128" disabled>{value}</textarea>
                                    </div>
                                </> :
                                    <>
                                        <div className={styles.modalItemKeyFoot}><div className={styles.footItemKey}>{key}: </div></div>
                                        {
                                            value ? <div className={styles.modalItemSign}>
                                                <div>
                                                    <img src={value} style={imgStyle} alt="firma" />
                                                </div>
                                            </div> : <div>No hay firma</div>
                                        }
                                    </>
                            }
                        </>
                    }
                </div>
            ))
        }
    </>)

}

export default FooterMaint;