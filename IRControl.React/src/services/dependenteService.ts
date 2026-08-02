import api from "@/api/api";

import type {
    Dependente,
    DependenteRequest
} from "@/types/dependente";

const endpoint = "/Dependente";

export const dependenteService = {
    async getAll(): Promise<Dependente[]> {
        const response = await api.get<Dependente[]>(endpoint);
        return response.data;
    },

    async getById(id: number): Promise<Dependente> {
        const response = await api.get<Dependente>(`${endpoint}/${id}`);
        return response.data;
    },

    async create(data: DependenteRequest): Promise<void> {
        const response = await api.post(endpoint, data);
        return response.data;
    },

    async update(id: number, data: DependenteRequest): Promise<void> {
        const response = await api.put(`${endpoint}/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        const response = await api.delete(`${endpoint}/${id}`);
        return response.data;
    }
};