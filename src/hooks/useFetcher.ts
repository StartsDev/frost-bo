import { useEffect, useState, useCallback } from 'react'

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
    data?: T | null | undefined
    loading: boolean
    mutation?: (url: string, body: T, method: Method, headers?: Header) => void | undefined
}

const getMethod = async (url: string, headers?: Header) => {
    const response = await fetch(url,  { headers })
    return response
}

const mutation = async <T>(url: string, body: T, method: Method, headers?: Header ) => {
    await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
    })
}

async function fetcher<T>({ url, method, body, headers }: FetcherParams<T>){

    try {
        
        if (method === 'GET') {
            const response = await getMethod(url, headers)
            return response.json()
        }

        await mutation(url, body, method, headers)

    } catch (error) {
        
    } 


}

export const useFetcher = <T>({ url, method, body = {}, headers = {} }: FetcherParams<any>): ResponseFetcher<T> => {
    
    const [data, setResponse] = useState<T | null | undefined>(null)
    const [loading, setLoading] = useState(false)
    
    const fetchMemo = useCallback(async () => {
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

    const mutationFetcher = (url: string, body: T, method: Method, headers?: Header): void => {
        mutation(url, body, method, headers)
            .then(data => {
                console.log(data)
                setLoading(true)
            })
            .catch(() => {
                console.log('error')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        
        fetchMemo()

    }, [method === "GET"])

    return {
        data: (data === undefined || data === null) ? null : data,
        loading,
        mutation: method !== "GET" ? mutationFetcher : undefined
    }
}