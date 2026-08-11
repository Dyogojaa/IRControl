import api from "@/api/api";

import type {
    Dependente,
    DependenteRequest
} from "@/types/dependente";

export interface DependenteFiltro {

    pesquisa?: string;

}

const endpoint = "/Dependente";

export const dependenteService = {

    async getAll(
        filtro?: DependenteFiltro
    ): Promise<Dependente[]> {

        const response =
            await api.get<Dependente[]>(
                endpoint,
                {
                    params: filtro,
                }
            );

        return response.data;
    },

    async getById(
        id: number
    ): Promise<Dependente> {

        const response =
            await api.get<Dependente>(
                `${endpoint}/${id}`
            );

        return response.data;
    },

    async create(
        data: DependenteRequest
    ): Promise<void> {

        await api.post(
            endpoint,
            data
        );
    },

    async update(
        id: number,
        data: DependenteRequest
    ): Promise<void> {

        await api.put(
            `${endpoint}/${id}`,
            data
        );
    },

    async delete(
        id: number
    ): Promise<void> {

        await api.delete(
            `${endpoint}/${id}`
        );
    }
};