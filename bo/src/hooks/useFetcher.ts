import { useEffect, useState } from 'react'

type Header = {
    [key: string]: string
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type FetcherParams<T> = {
    url: string
    method: Method
    body?: T
    headers?: Header
}

type ResponseFetcher<T> = {
    data: T | []
    loading: boolean
}

const getMethod = async (url: string, headers?: Header) => {
    const response = await fetch(url,  { headers })
    return response
}

const mutation = async <T>(url: string, body: T, method: Method, headers?: Header ) => {
    const response = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
    })
    return response
}

async function fetcher<T>({ url, method, body, headers }: FetcherParams<T>){

    try {
        
        if (method === 'GET') {
            const response = await getMethod(url, headers)
            return response.json()
        }

        const response = await mutation(url, body, method, headers)
        return response.json()

    } catch (error) {
        
    } 


}

export const useFetcher = <T>({ url, method, body = {}, headers = {} }: FetcherParams<any>): ResponseFetcher<T> => {
    
    const [data, setResponse] = useState<T | []>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
        setLoading(true)
        fetcher({ url, method, body, headers })
            .then(data => {
                setResponse(data)
            })
            .catch(() => {
                console.log('error')
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return {
        data,
        loading
    }
}