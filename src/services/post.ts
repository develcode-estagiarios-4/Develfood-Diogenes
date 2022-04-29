import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react';

const api = axios.create({
    baseURL: 'https://gorest.co.in'
})

export const usePost= <T = unknown>(url: string, body: T, options?: AxiosRequestConfig) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null | unknown>(null)

    async function handlerPost(){
            try {
                const response = await api.post(url, body, options)
                console.log(response.data)
                setData(response.data)
            } catch (error) {
                setError(error)
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

    return{data, loading, error, handlerPost}
}