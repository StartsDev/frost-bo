//import { useState } from "react";
import styles from "../../components/modal/modal.module.css";

interface FooterProps {
    data: Record<string, any>;
}

function FooterMaint({ data }): FooterProps {
/*     const [base64Image, setBase64Image] = useState('');
    const [convertedFile, setConvertedFile] = useState(''); */
    const keysPermitidas = [
        "Observaciones",
    ];
 /*    const filteredEntries = Object.entries(data).filter(([key]) => key === "Firma técnico" || key === "Firma cliente");

    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'imagen/png' });

    setConvertedFile(URL.createObjectURL(blob)); */

    return (
        <>
            <div>
                {
                    Object.entries(data).map(([key, value], index) => (
                        <div key={index} className={styles.modalItemFooter}>
                            {keysPermitidas.includes(key) ?
                                <>
                                    <div className={styles.modalItemKeyFoot}><div className={styles.footItemKey}>{key}: </div></div>
                                    <div>
                                        <textarea className={styles.modalItemValueFoot} rows="10" cols="128" disabled>{value}</textarea>
                                    </div>
                                </> : null
                            }
                        </div>
                    ))
                }
            </div>
      {/*       <div>
                <div className={styles.modalDetailSignGrid}>
                    {convertedFile && filteredEntries.map(([key, value], index) => value && setBase64Image(value)(
                            <div key={index} className={styles.modalItem}>
                                <div className={styles.modalItemKeyCont}><span className={styles.modalItemKey}>{key}: </span></div>
                                <div className={styles.modalItemValueSign}><span className={styles.modalItemValue}><img src={convertedFile} alt="Converted" /></span></div>
                            </div>
                        ))
                    }
                </div>
            </div> */}
        </>
    )
}


export default FooterMaint;