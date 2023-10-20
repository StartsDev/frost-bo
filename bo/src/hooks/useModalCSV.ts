import { useState } from "react"

export const useModalCSV = () => {
    
    const [isOpenCSV, setIsOpenCSV] = useState<boolean>(false)
    
    const openModalCSV = () => setIsOpenCSV(true)
    const closeModalCSV = () => setIsOpenCSV(false)

    return { isOpenCSV, openModalCSV, closeModalCSV }
    
}