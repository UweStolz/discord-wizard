import axios, { AxiosRequestConfig } from 'axios';

export async function GET(url: string, options: AxiosRequestConfig | undefined): Promise<any|null> {
    let data = null;
    const response = await axios.get(url, options)
    if (response.status == 200) {
        data = response.data;
    }
    return data;
}