import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/v1/';

const axios = Axios.create({
    withCredentials: true
});

export const httpService = {
    get<T>(endpoint: string, data?: any): Promise<T> {
        return ajax<T>(endpoint, 'GET', data);
    },
    post<T>(endpoint: string, data?: any): Promise<T> {
        return ajax<T>(endpoint, 'POST', data);
    },
    put<T>(endpoint: string, data?: any): Promise<T> {
        return ajax<T>(endpoint, 'PUT', data);
    },
    delete<T>(endpoint: string, data?: any): Promise<T> {
        return ajax<T>(endpoint, 'DELETE', data);
    }
};

async function ajax<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data: any = null): Promise<T> {
    try {
        const config: AxiosRequestConfig = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        };

        const res: AxiosResponse<T> = await axios(config);
        return res.data;
    } catch (err) {
        if (Axios.isAxiosError(err)) {
            console.log(`Had issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data);
            console.dir(err);
            if (err.response && err.response.status === 401) {
                sessionStorage.clear();
                window.location.assign('/');
            }
            throw err;
        } else {
            console.error('An unexpected error occurred:', err);
            throw new Error('An unexpected error occurred');
        }
    }
}
