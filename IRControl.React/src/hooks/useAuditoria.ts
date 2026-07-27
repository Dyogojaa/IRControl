import { useCallback, useState } from "react";

import AuditoriaService
    from "@/services/AuditoriaService";

import type {
    AuditoriaResponse,
} from "@/types/auditoria";

export function useAuditoria() {

    const [auditoria, setAuditoria] =
        useState<AuditoriaResponse | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const carregar = useCallback(

        async (ano: number) => {

            try {

                setLoading(true);

                setError(null);

                const dados =
                    await AuditoriaService.listar(ano);

                setAuditoria(dados);

            }
            catch (err) {

                console.error(err);

                setError(
                    "Erro ao executar a auditoria."
                );

            }
            finally {

                setLoading(false);

            }

        },

        []

    );

    const limparErro = () => {

        setError(null);

    };

    return {

        auditoria,

        loading,

        error,

        carregar,

        limparErro,

    };

}