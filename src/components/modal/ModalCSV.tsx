import { useState } from "react";
import Title from "../title/Title";
import styles from "./modal.module.css";
import moment from 'moment';

interface ModalProps {
    onClose: () => void;
    title: string;
    itemsCSV: any[] | [];
    moduleName: string;
}

function ModalCSV({ onClose, title, itemsCSV, moduleName }: ModalProps) {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const label: string = 'Exportar';

    // CSV Format
    const convertToCSV = (dataCSV): any => {
        const headers = Object.keys(dataCSV[0]);
        const rows = dataCSV.map((obj: any) => headers.map((header: any) => {
            const value = obj[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }));
        const headerRow = headers.join(',');
        const csvRows = [headerRow, ...rows.map((row: any) => row.join(','))];
        return csvRows.join('\n');
    }

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    //Export CSV
    const handleClickCSV = () => {
        if (startDate && endDate) {
                const filteredItems = itemsCSV?.filter(item => item.fecha >= moment(startDate).format('DD/MM/YYYY') && item.fecha <= moment(endDate).format('DD/MM/YYYY'));

                //Exportacion a Excel filtrado
                if (filteredItems && filteredItems.length > 0) {
                    const csvContent = convertToCSV(filteredItems);
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${moduleName}_fecha.xlsx`);
                    link.click();
                    setStartDate('');
                    setEndDate('');
                }

                if (filteredItems?.length === 0) {
                    alert('No hay registros en este rango...')
                }
        }

        //Not filter by date
        if (!startDate && !endDate) {
            //Exportacion a Excel
            const csvContent = convertToCSV(itemsCSV);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${moduleName}.xlsx`);
            link.click();
        }
        if (!startDate && endDate) {
            alert('Debe ingresar una fecha inicial...')
        }
        if (startDate && !endDate) {
            alert('Debe ingresar una fecha final...')
        }
    }

    return (
        <div className={styles.modalCSV}>
            <div className={styles.modalContentCSV} style={{ color: "black" }}>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
                <Title title={title} />

                <div className={styles.modalCSVcontainer}>
                    <div className={styles.itemCSV}>
                        <h5>*Si no escoge ninguna fecha el informe se exporta completo</h5>
                    </div>
                    <div className={styles.itemCSV}>
                        <form className={styles.itemCSVForm}>
                            <div>
                                <label htmlFor="startDate">Desde: </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className={styles.itemCSVInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">Hasta: </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    className={styles.itemCSVInput}
                                />
                            </div>
                            <div>
                                <button className={styles.itemCSVButton} type="button" onClick={handleClickCSV}>
                                    {label}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default ModalCSV;
