import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react';

const api = axios.create({
    baseURL: 'https://gorest.co.in'
})

export function useDelete<T = unknown>(url: string, body: T){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      async function fetchDelete() {
          try {
            await api.delete(url, body).then(
                response => setData(response.data)
              )
          } catch (erro) {
              setError(error)
          }finally{
            setLoading(false)
          }
      }
      fetchDelete()
    }, []);
    return { data, loading, error }
}