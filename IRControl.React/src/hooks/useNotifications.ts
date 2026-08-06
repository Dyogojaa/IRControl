import { useEffect, useState } from "react";

import DashboardService from "@/services/DashboardService";

import type { Pendencia } from "@/types/dashboard";

export function useNotifications() {

    const [notifications, setNotifications] =
        useState<Pendencia[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function carregar() {

            try {

                const dashboard =
                    await DashboardService.getDashboard(
                        new Date().getFullYear()
                    );

                setNotifications(
                    dashboard.pendencias ?? []
                );

            }
            catch (error) {

                console.error(error);

                setNotifications([]);

            }
            finally {

                setLoading(false);

            }

        }

        carregar();

    }, []);

    return {
        notifications,
        loading
    };

}