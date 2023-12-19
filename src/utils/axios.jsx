// src/utils/axios.js
import axios from 'axios';
import { logout, updateAccessToken } from '../store/authSlice';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8099/api/',
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // 리프레시 토큰 요청을 이미 시도했는지, 그리고 원본 요청이 리프레시 토큰 요청이 아닌지 확인
        if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('token/refresh')) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await axiosInstance.post('token/refresh');
                const newAccessToken = refreshResponse.data.accessToken;
                store.dispatch(updateAccessToken(newAccessToken));
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
