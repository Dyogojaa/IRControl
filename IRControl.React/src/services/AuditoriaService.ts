import api from "@/api/axios";

import type {
    AuditoriaResponse,
    AuditoriaItem,
    AuditoriaResumo,
} from "@/types/auditoria";

class AuditoriaService {

    async listar(ano: number) {

        const response =
            await api.get<AuditoriaResponse>(
                `/Auditoria/${ano}`
            );

        return response.data;

    }

    async resumo(ano: number) {

        const response =
            await api.get<AuditoriaResumo>(
                `/Auditoria/${ano}/resumo`
            );

        return response.data;

    }

    async erros(ano: number) {

        const response =
            await api.get<AuditoriaItem[]>(
                `/Auditoria/${ano}/erros`
            );

        return response.data;

    }

    async alertas(ano: number) {

        const response =
            await api.get<AuditoriaItem[]>(
                `/Auditoria/${ano}/alertas`
            );

        return response.data;

    }

}

export default new AuditoriaService();