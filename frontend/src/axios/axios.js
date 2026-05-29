import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config?.url?.includes("/user/login");
        const isPasswordChange = error.config?.url?.includes("/profile/password");
        const isResetPassword = error.config?.url?.includes("/user/reset-password");
        const isForgotPassword = error.config?.url?.includes("/user/forgot-password");

        if (error.response?.status === 401 && !isLoginRequest && !isPasswordChange && !isResetPassword && !isForgotPassword) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;