import api from "@/api/api";

import type {
    HoleriteResponse,
    HoleriteCreateRequest,
    HoleriteUpdateRequest,
    HoleriteFiltro,
} from "@/types/holerite";

class HoleriteService {

    async listar(
        filtro?: HoleriteFiltro
    ) {

        const response =
            await api.get<HoleriteResponse[]>(
                "/Holerite",
                {
                    params: filtro,
                }
            );

        return response.data;

    }

    async obter(id: number) {

        const response =
            await api.get<HoleriteResponse>(
                `/Holerite/${id}`
            );

        return response.data;

    }

    async criar(
        request: HoleriteCreateRequest
    ) {

        await api.post(
            "/Holerite",
            request
        );

    }

    async editar(
        request: HoleriteUpdateRequest
    ) {

        await api.put(
            `/Holerite/${request.id}`,
            request
        );

    }

    async excluir(id: number) {

        await api.delete(
            `/Holerite/${id}`
        );

    }

}

export default new HoleriteService();