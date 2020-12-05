/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from './logger';

type RequestType = 'GET' | 'POST';

function getResponseData(response: AxiosResponse<any>): AxiosResponse<any>|null {
  let data: AxiosResponse<any>|null = null;
  if (response?.status === 200) {
    data = response.data;
  }
  return data;
}

async function GET(url: string, options: AxiosRequestConfig | undefined): Promise<any|null> {
  const response = await axios.get(url, options);
  return getResponseData(response);
}

async function POST(url: string, options: AxiosRequestConfig | undefined): Promise<any | null> {
  const response = await axios.post(url, options);
  return getResponseData(response);
}

export default async function request(type: RequestType, url: string, options: AxiosRequestConfig | undefined = undefined): Promise<any | null> {
  let response: AxiosResponse<any>|null = null;
  try {
    switch (type) {
      case 'GET':
        response = await GET(url, options);
        break;
      case 'POST':
        response = await POST(url, options);
        break;
      default:
        logger.warn('No matching request method found!');
        break;
    }
  } catch (err) {
    logger.error('An error ocurred while making a request!');
    logger.error(err);
  }
  return response;
}
