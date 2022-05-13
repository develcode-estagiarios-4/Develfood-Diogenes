import axios, {AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://develfood-3.herokuapp.com',
});

export const usePost = <T = unknown, TResponse = unknown>(url: string) => {
  const [data, setData] = useState<TResponse>({} as TResponse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  async function handlerPost(body: T, options?: AxiosRequestConfig) {
    try {
      setLoading(true);
      const response = await api.post(url, body, options);
      setData(response.data);
      console.log(response.data);
    } catch (erro: any) {
      setError(erro.response.data);
      console.log(erro.response.data);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, error, handlerPost};
};
