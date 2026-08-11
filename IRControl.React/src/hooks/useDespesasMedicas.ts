import { useCallback, useState } from "react";

import despesaMedicaService from "@/services/despesaMedicaService";

import type {
    DespesaMedica,
    DespesaMedicaRequest,
} from "@/types/despesaMedica";

import type {
    DespesaMedicaFiltro,
} from "@/services/despesaMedicaService";

export interface DespesaMedicaUpdateRequest
    extends DespesaMedicaRequest {

    id: number;

}

export function useDespesasMedicas() {

    const [despesasMedicas, setDespesasMedicas] =
        useState<DespesaMedica[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const listar = useCallback(async (
        filtro?: DespesaMedicaFiltro
    ) => {

        try {

            setLoading(true);

            setError(null);

            const dados =
                await despesaMedicaService.getAll(
                    filtro
                );

            setDespesasMedicas(dados);

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao carregar as despesas médicas."
            );

        }
        finally {

            setLoading(false);

        }

    }, []);

    const obter = useCallback(async (
        id: number
    ) => {

        try {

            setLoading(true);

            setError(null);

            return await despesaMedicaService.getById(
                id
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao localizar a despesa médica."
            );

            return null;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const criar = useCallback(async (
        request: DespesaMedicaRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await despesaMedicaService.create(
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao cadastrar a despesa médica."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const editar = useCallback(async (
        request: DespesaMedicaUpdateRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await despesaMedicaService.update(
                request.id,
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao editar a despesa médica."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const excluir = useCallback(async (
        id: number
    ) => {

        try {

            setLoading(true);

            setError(null);

            await despesaMedicaService.delete(
                id
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao excluir a despesa médica."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const atualizarLista = useCallback(async (
        filtro?: DespesaMedicaFiltro
    ) => {

        await listar(filtro);

    }, [listar]);

    const limparErro = () => {

        setError(null);

    };

    return {

        despesasMedicas,

        loading,

        error,

        listar,

        atualizarLista,

        obter,

        criar,

        editar,

        excluir,

        limparErro,

    };

}