import { useCallback, useState } from "react";

import InformeRendimentoService
    from "@/services/InformeRendimentoService";

import type {
    InformeRendimentoResponse,
    InformeRendimentoCreateRequest,
    InformeRendimentoUpdateRequest,
    InformeRendimentoFiltro,
} from "@/types/informeRendimento";

export function useInformesRendimentos() {

    const [informes, setInformes] =
        useState<InformeRendimentoResponse[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const listar = useCallback(async (
        filtro?: InformeRendimentoFiltro
    ) => {

        try {

            setLoading(true);

            setError(null);

            const dados =
                await InformeRendimentoService.listar(
                    filtro
                );

            setInformes(dados);

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao carregar os informes."
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

            return await InformeRendimentoService.obter(
                id
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao localizar o informe."
            );

            return null;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const criar = useCallback(async (
        request: InformeRendimentoCreateRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await InformeRendimentoService.criar(
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao cadastrar o informe."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const editar = useCallback(async (
        request: InformeRendimentoUpdateRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await InformeRendimentoService.editar(
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao editar o informe."
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

            await InformeRendimentoService.excluir(
                id
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao excluir o informe."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const atualizarLista = useCallback(async (
        filtro?: InformeRendimentoFiltro
    ) => {

        await listar(filtro);

    }, [listar]);

    const limparErro = () => {

        setError(null);

    };

    return {

        informes,

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