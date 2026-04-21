import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance;


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)