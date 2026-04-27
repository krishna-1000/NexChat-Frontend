import axios from "axios";
import { getErrorMessage } from "../utils/errorResolver";
import { store } from "../app/store";
import { setMaintenanceMode } from "../features/appSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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

axiosInstance.interceptors.response.use(
    (response) => {
        return {
            ...response,
            success: true
        };
    },
    (error) => {

        if (!error.response) {
            console.log("backend unreachable ,Locking frontend")
            store.dispatch(setMaintenanceMode(false));
            localStorage.clear();
            return Promise.reject("SERVER_OFFLINE");

        }

        if (error.response?.status == 401 ) {
            localStorage.clear();
            window.location.href = '/login'
        }
        const message = getErrorMessage(error);
        return Promise.reject(message);
    }
)