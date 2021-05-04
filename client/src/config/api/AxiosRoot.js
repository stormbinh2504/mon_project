import axios from 'axios';
import AxiosConfig from '../constant/AxiosConfig';

const AxiosRoot = axios.create({
    baseURL: AxiosConfig.BaseURL,
});

AxiosRoot.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = AxiosConfig.HeaderType + ' ' + token;
    }
    return config;
});

export default AxiosRoot;
