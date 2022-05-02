import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react';

const api = axios.create({
    baseURL: 'https://gorest.co.in'
})

export const useDelete= <T = unknown, TResponse = unknown>(url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<TResponse>({} as TResponse);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null | unknown>(null)

    async function handlerDelete(){
            try {
                setLoading(true)
                const response = await api.delete(url, options)
                setData(response.data)
            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }

    return{data, loading, error, handlerDelete}
}

// export const useDelete= async(url: string, options?: AxiosRequestConfig) => {
//     try {
//         const response = await api.delete(url, options)
//         return response
//     } catch (error) {
//         console.log(error)
//     }finally{

//     }
// }