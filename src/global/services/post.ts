import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {useState} from 'react';

const api = axios.create({
  baseURL: 'https://develfood-3.herokuapp.com',
});

export const usePost = <T = unknown, TResponse = unknown>(url: string) => {
  const [data, setData] = useState<TResponse>({} as TResponse);
  const [loading, setLoading] = useState(false);

  async function handlerPost(
    body: T,
    onError: (error: AxiosError<any, any>) => void,
    onSuccess?: (response: TResponse) => void,
    options?: AxiosRequestConfig,
  ) {
    try {
      setLoading(true);
      const response = await api.post(url, body, options);
      setData(response.data);
      response.data && onSuccess && onSuccess(response.data);
    } catch (error: AxiosError<any, any> | any) {
      error && onError(error);
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, handlerPost};
};
