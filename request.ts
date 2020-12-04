/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function GET(url: string, options: AxiosRequestConfig | undefined): Promise<any|null> {
  let data = null;
  let response: AxiosResponse<any>|null = null;
  try {
    response = await axios.get(url, options);
  } catch (err) {
    // Ignore error
    console.error(err);
  }
  if (response?.status === 200) {
    data = response.data;
  }
  return data;
}

export async function POST(url: string, options: AxiosRequestConfig | undefined): Promise<any | null> {
  //
}
