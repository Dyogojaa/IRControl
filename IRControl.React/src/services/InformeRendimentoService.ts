import api from "@/api/api";

import type {

    InformeRendimentoResponse,

    InformeRendimentoCreateRequest,

    InformeRendimentoUpdateRequest,

} from "@/types/informeRendimento";

class InformeRendimentoService {

    async listar() {

        const response =
            await api.get<InformeRendimentoResponse[]>(
                "/InformeRendimento"
            );

        return response.data;

    }

    async obter(id: number) {

        const response =
            await api.get<InformeRendimentoResponse>(
                `/InformeRendimento/${id}`
            );

        return response.data;

    }

    async criar(
        request: InformeRendimentoCreateRequest
    ) {

        await api.post(
            "/InformeRendimento",
            request
        );

    }

    async editar(
        request: InformeRendimentoUpdateRequest
    ) {

        await api.put(
            `/InformeRendimento/${request.id}`,
            request
        );

    }

    async excluir(id: number) {

        await api.delete(
            `/InformeRendimento/${id}`
        );

    }

    async conferencia(ano: number) {

        const response =
            await api.get(
                `/InformeRendimento/conferencia/${ano}`
            );

        return response.data;

    }

}

export default new InformeRendimentoService();