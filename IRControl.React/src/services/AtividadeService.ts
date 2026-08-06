import api from "@/api/api";

import type { Atividade } from "@/types/atividade";

class AtividadeService {

    async listar(quantidade = 3) {

        const response =
            await api.get<Atividade[]>(
                "/Atividades",
                {
                    params: {
                        quantidade
                    }
                }
            );

        return response.data;

    }

}

export default new AtividadeService();