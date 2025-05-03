import axios, { AxiosInstance } from 'axios';
import { env } from '@/config/env.js';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://suggestions.dadata.ru',
});

export const fetchDadata = async (query: string) => {
  const { data } = await axiosInstance.post(
    'suggestions/api/4_1/rs/suggest/address',
    { query },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${env.DADATA_TOKEN}`,
      },
    },
  );

  return data;
};
