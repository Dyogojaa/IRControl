import api from "@/api/api";

import type {
    InformeRendimentoResponse,
    InformeRendimentoCreateRequest,
    InformeRendimentoUpdateRequest,
    InformeRendimentoFiltro,
} from "@/types/informeRendimento";

const endpoint = "/InformeRendimento";

const InformeRendimentoService = {

    async listar(
        filtro?: InformeRendimentoFiltro
    ): Promise<InformeRendimentoResponse[]> {

        const response =
            await api.get<InformeRendimentoResponse[]>(
                endpoint,
                {
                    params: filtro,
                }
            );

        return response.data;
    },

    async obter(
        id: number
    ): Promise<InformeRendimentoResponse> {

        const response =
            await api.get<InformeRendimentoResponse>(
                `${endpoint}/${id}`
            );

        return response.data;
    },

    async criar(
        request: InformeRendimentoCreateRequest
    ): Promise<void> {

        await api.post(
            endpoint,
            request
        );
    },

    async editar(
        request: InformeRendimentoUpdateRequest
    ): Promise<void> {

        await api.put(
            `${endpoint}/${request.id}`,
            request
        );
    },

    async excluir(
        id: number
    ): Promise<void> {

        await api.delete(
            `${endpoint}/${id}`
        );
    },

};

export default InformeRendimentoService;