// services/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
    baseURL: "http://localhost:8000/api", // schimbă dacă e emulator
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔥 REQUEST INTERCEPTOR (setează token automat)
API.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// 🔥 RESPONSE INTERCEPTOR (auto refresh)
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refresh = await AsyncStorage.getItem("refresh");

                const res = await axios.post(
                    "http://localhost:8000/api/token/refresh/",
                    { refresh }
                );

                const newAccess = res.data.access;

                await AsyncStorage.setItem("access", newAccess);

                API.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${newAccess}`;

                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccess}`;

                return API(originalRequest);
            } catch (refreshError) {
                await AsyncStorage.removeItem("access");
                await AsyncStorage.removeItem("refresh");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
