import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: 'https://viacep.com.br',
});

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig){
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      async function fetchData() {
          try {
            await api.get(url, options).then(
                response => setData(response.data)
              )
          } catch (erro) {
              setError(error)
          }finally{
            setLoading(false)
          }
      }
      fetchData()
    }, []);
    return { data, loading, error }
}