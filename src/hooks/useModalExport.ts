import { useState } from "react"

export const useModalCSVExport = () => {
    
    const [isOpenCSVExport, setIsOpenCSVExport] = useState<boolean>(false)
    
    const openModalCSVExport = () => setIsOpenCSVExport(true)
    const closeModalCSVExport = () => setIsOpenCSVExport(false)

    return { isOpenCSVExport, openModalCSVExport, closeModalCSVExport }
    
}