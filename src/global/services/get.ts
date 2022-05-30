import axios, {AxiosRequestConfig} from 'axios';
import {useEffect, useState} from 'react';

const api = axios.create({
  baseURL: 'https://develfood-3.herokuapp.com',
});

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(url, options);
        setData(response.data);
        console.log(response.data);
      } catch (erro) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {data, loading, error};
}
