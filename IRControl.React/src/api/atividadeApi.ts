import api from "@/api/api";
import type { Atividade } from "@/types/atividade";

export async function obterAtividades(
    quantidade = 10
): Promise<Atividade[]> {

    const { data } = await api.get<Atividade[]>(
        "/atividades",
        {
            params: {
                quantidade
            }
        }
    );

    return data;

}