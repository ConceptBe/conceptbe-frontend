import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// const API_PREFIX = '/api';
// const BASE_URL = `url${API_PREFIX}`;
const BASE_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;
axiosInstance.interceptors.response.use((res) => res.data);

// Authorization 헤더에 토큰을 넣어준다.
axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
