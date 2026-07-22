import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import DashboardService from "@/services/DashboardService";

import type { DashboardResponse } from "@/types/dashboard";

export const useDashboard = (ano: number) => {
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await DashboardService.getDashboard(ano);

            setDashboard(response);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.group("Erro ao carregar Dashboard");
                console.error("Status:", err.response?.status);
                console.error("URL:", err.config?.url);
                console.error("Método:", err.config?.method);
                console.error("Mensagem:", err.message);
                console.error("Response:", err.response?.data);
                console.groupEnd();

                setError(
                    err.response?.data?.message ??
                    err.response?.data ??
                    err.message ??
                    "Erro ao carregar Dashboard."
                );
            } else {
                console.error("Erro inesperado:", err);

                setError("Erro inesperado ao carregar Dashboard.");
            }
        } finally {
            setLoading(false);
        }
    }, [ano]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    return {
        dashboard,
        loading,
        error,
        reload: loadDashboard,
    };
};