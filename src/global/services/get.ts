import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://0c71-164-163-142-68.ngrok.io',
});

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchData(onSuccess?: (response: T) => void) {
    try {
      setLoading(true);
      const response = await api.get(url, options);
      setData(response.data);
      response.data && onSuccess && onSuccess(response.data);
    } catch (erro) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return {data, loading, error, fetchData, setData};
}
