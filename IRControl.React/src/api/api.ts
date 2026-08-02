import axios from "axios";

import { env } from "@/config/env";
import authStorage from "@/services/authStorage";

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: 30000
});

api.interceptors.request.use(config => {

    const token = authStorage.getToken();

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export default api;