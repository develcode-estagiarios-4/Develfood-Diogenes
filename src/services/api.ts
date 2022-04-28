import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: 'https://gorest.co.in',
});

export function useFetch<T = unknown>(url: string, options?: AxiosRequestConfig){
    const [data, setData] = useState<T | null>(null);
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

    // const handlerPost = () => {
    //   axios.post('http://172.22.19.94:3333',
    //     {
    //       "name":"Rafael blz",
    //       "email":"rafael.santos@teste.com.br",
    //       "gender": "male",
    //       "status": "Active"
    //     },
    //     {
    //       headers: {
    //         Authorization: "554ee3d08748731d8fa1949dfc561dc57ee741eeb82ec6ea429e30c675bab3a9"
    //       }
    //     }
    //   ).then((response) => console.log(response))
    //   }

    return { data, loading, error }
}