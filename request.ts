/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from './logger';

type RequestType = 'GET' | 'POST';

async function GET(url: string, options: AxiosRequestConfig | undefined): Promise<any|null> {
  let data = null;
  let response: AxiosResponse<any>|null = null;
  try {
    response = await axios.get(url, options);
  } catch (err) {
    // Ignore error
    logger.error(err);
  }
  if (response?.status === 200) {
    data = response.data;
  }
  return data;
}

async function POST(url: string, options: AxiosRequestConfig | undefined): Promise<any | null> {
  //
}

export default async function request(type: RequestType, url: string, options: AxiosRequestConfig | undefined = undefined): Promise<any|null> {
  let response: AxiosResponse<any>|null = null;
  switch (type) {
    case 'GET':
      response = await GET(url, options);
      break;
    case 'POST':
      response = await POST(url, options);
      break;
    default:
      break;
  }
  return response;
}
