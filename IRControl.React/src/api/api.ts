import axios from "axios";

import { env } from "@/config/env";
import authStorage from "@/services/authStorage";

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 30000,
});

api.interceptors.request.use(
    (config) => {

        const token =
            authStorage.getToken();

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },
    (error) => {

        return Promise.reject(error);

    }
);

api.interceptors.response.use(
    (response) => {

        return response;

    },
    (error) => {

        if (error.response?.status === 401) {

            authStorage.clear();

            const currentPath =
                window.location.pathname;

            if (currentPath !== "/login") {

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }
);

export default api;