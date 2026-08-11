import { useCallback, useState } from "react";

import { dependenteService } from "@/services/dependenteService";

import type {
    Dependente,
    DependenteRequest,
} from "@/types/dependente";

import type {
    DependenteFiltro,
} from "@/services/dependenteService";

export interface DependenteUpdateRequest
    extends DependenteRequest {
    id: number;
}

export function useDependentes() {

    const [dependentes, setDependentes] =
        useState<Dependente[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const listar = useCallback(async (
        filtro?: DependenteFiltro
    ) => {

        try {

            setLoading(true);

            setError(null);

            const dados =
                await dependenteService.getAll(
                    filtro
                );

            setDependentes(dados);

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao carregar os dependentes."
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

            return await dependenteService.getById(id);

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao localizar o dependente."
            );

            return null;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const criar = useCallback(async (
        request: DependenteRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await dependenteService.create(
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao cadastrar o dependente."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const editar = useCallback(async (
        request: DependenteUpdateRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            await dependenteService.update(
                request.id,
                request
            );

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao editar o dependente."
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

            await dependenteService.delete(id);

        }
        catch (err) {

            console.error(err);

            setError(
                "Erro ao excluir o dependente."
            );

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const atualizarLista = useCallback(async (
        filtro?: DependenteFiltro
    ) => {

        await listar(filtro);

    }, [listar]);

    const limparErro = () => {

        setError(null);

    };

    return {

        dependentes,

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