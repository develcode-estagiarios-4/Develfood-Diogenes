import axios, {AxiosRequestConfig} from 'axios';
import {useEffect, useState} from 'react';

const api = axios.create({
  baseURL: 'https://gorest.co.in',
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
