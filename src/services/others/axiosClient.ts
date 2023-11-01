import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// server baseUrl
const baseUrl = `${process.env.REACT_APP_BASE_URL_SYNC}`;

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
