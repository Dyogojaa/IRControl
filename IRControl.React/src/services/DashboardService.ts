import api from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import type { DashboardResponse } from "@/types/dashboard";

class DashboardService {
    public async getDashboard(ano: number): Promise<DashboardResponse> {
        const response = await api.get<DashboardResponse>(
            `${endpoints.dashboard}/${ano}`
        );

        return response.data;
    }
}

export default new DashboardService();