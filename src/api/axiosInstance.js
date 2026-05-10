import axios from "axios";
import { getErrorMessage } from "../utils/errorResolver";
import { store } from "../app/store";
import { setMaintenanceMode } from "../features/appSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 50000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        return { ...response, success: true };
    },
    async (error) => {
        console.log("interceptor fired.........")
        const originalRequest = error.config;
        console.info(error.response?.status)
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.info("Refreshing token............");

            if (!isRefreshing) {
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    const storedRefreshToken = localStorage.getItem("refreshToken");

                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/auth/refreshtoken`,
                        { refreshToken: storedRefreshToken }
                    );

                    const newToken = data.accessToken;
                    const newRefreshToken = data.refreshToken;

                    localStorage.setItem("token", newToken);
                    localStorage.setItem("refreshToken", newRefreshToken);
                    
                    isRefreshing = false;
                    onRefreshed(newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    console.info("------------------------")
                    console.info(refreshError)
                    isRefreshing = false;
                    localStorage.clear();

                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(getErrorMessage(refreshError));
                }
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((newToken) => {
                    originalRequest._retry = true;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        if (!error.response) {

            if (originalRequest.url.includes("/status")) {
                return Promise.reject("WS_PREFLIGHT_FAILED");
            }

            console.log("Backend unreachable, locking frontend");
            store.dispatch(setMaintenanceMode(false));



            return Promise.reject("SERVER_OFFLINE");
        }

        const message = getErrorMessage(error);
        return Promise.reject(message);
    }
);

export default axiosInstance;