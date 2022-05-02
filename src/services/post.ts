import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react';

const api = axios.create({
    baseURL: 'https://gorest.co.in'
})

export const usePost= <T = unknown, TResponse = unknown>(url: string, body: T, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<TResponse>({} as TResponse);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null | unknown>(null)

    async function handlerPost(){
            try {
                setLoading(true)
                const response = await api.post(url, body, options)
                setData(response.data)
            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }

    return{data, loading, error, handlerPost}
}