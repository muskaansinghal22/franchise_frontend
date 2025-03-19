import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://franchisebackend-production-d8f2.up.railway.app'
});

// List of routes that don't need authentication
const publicRoutes = [
    '/api/franchise-login',
    '/api/create-franchise-user'
];

axiosInstance.interceptors.request.use(
    (config) => {
        // Don't add token for public routes
        if (!publicRoutes.includes(config.url)) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;