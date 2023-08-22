import { useEffect, useState } from 'react'
import { ENDPOINT } from '../config'

export const useGetClients = () => {
    
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
        setLoading(true)

        fetch(ENDPOINT.clients.list)
            .then(response => response.json())
            .then(data => {
                setClients(data?.clients)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return {
        clients,
        loading
    }
}