import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from "./pagination.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    const handlePrev = () => {
        onPageChange(currentPage - 1);
    };

    return (
        <div className={styles.buttonsContainer}>
            {currentPage === 1 && <> <div className={styles.item}>
                <span><p className={styles.textItem}> {currentPage} de {totalPages} </p></span>
            </div>
                <div className={styles.item}>
                    <button className={styles.buttonItem} onClick={handleNext} disabled={currentPage === totalPages}><FaChevronRight /></button>
                </div></>}
            {currentPage === totalPages && <>
                <div className={styles.item}>
                    <button className={styles.buttonItem} onClick={handlePrev} disabled={currentPage === 1}><FaChevronLeft /></button>
                </div>
                <div className={styles.item}>
                    <span><p className={styles.textItem}> {currentPage} de {totalPages} </p></span>
                </div>
            </>}
            {currentPage > 1 && currentPage !== totalPages && <>
                <div className={styles.item}>
                    <button className={styles.buttonItem} onClick={handlePrev} disabled={currentPage === 1}><FaChevronLeft /></button>
                </div>
                <div className={styles.item}>
                    <span><p className={styles.textItem}> {currentPage} de {totalPages} </p></span>
                </div>
                <div className={styles.item}>
                    <button className={styles.buttonItem} onClick={handleNext} disabled={currentPage === totalPages}><FaChevronRight /></button>
                </div>
            </>}
        </div>
    );
};

export default Pagination;