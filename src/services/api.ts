import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: 'https://api.github.com'
});

export function useApi<T = unknown>(url: string, options?: AxiosRequestConfig){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
      async function fetchData() {
          try {
            api.get(url, options).then(
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