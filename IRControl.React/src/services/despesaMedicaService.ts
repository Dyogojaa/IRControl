import api from "@/api/axios";

import type {
    DespesaMedica,
    DespesaMedicaRequest,
} from "@/types/despesaMedica";

const baseUrl = "/DespesaMedica";

export const despesaMedicaService = {

    async getAll(): Promise<DespesaMedica[]> {

        const response = await api.get<DespesaMedica[]>(baseUrl);

        return response.data;

    },

    async getById(id: number): Promise<DespesaMedica> {

        const response = await api.get<DespesaMedica>(
            `${baseUrl}/${id}`
        );

        return response.data;

    },

    async create(
        request: DespesaMedicaRequest
    ): Promise<void> {

        await api.post(baseUrl, request);

    },

    async update(
        id: number,
        request: DespesaMedicaRequest
    ): Promise<void> {

        await api.put(
            `${baseUrl}/${id}`,
            request
        );

    },

    async delete(
        id: number
    ): Promise<void> {

        await api.delete(
            `${baseUrl}/${id}`
        );

    },

};

export default despesaMedicaService;