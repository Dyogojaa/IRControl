import { useCallback, useEffect, useState } from "react";

import HoleriteService from "@/services/HoleriteService";

import type {
    HoleriteCreateRequest,
    HoleriteResponse,
    HoleriteUpdateRequest,
} from "@/types/holerite";

export function useHolerites() {

    const [holerites, setHolerites] = useState<HoleriteResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const listar = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const dados = await HoleriteService.listar();
            console.log("Service retornou:", dados);

            setHolerites(dados);

        }
        catch (err) {

            console.error(err);

            setError("Erro ao carregar os holerites.");

        }
        finally {

            setLoading(false);

        }

    }, []);

    const obter = useCallback(async (id: number) => {

        try {

            setLoading(true);

            setError(null);

            return await HoleriteService.obter(id);

        }
        catch (err) {

            console.error(err);

            setError("Erro ao localizar o holerite.");

            return null;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const criar = useCallback(async (

    request: HoleriteCreateRequest

    ) => {

        try {

            setLoading(true);

            setError(null);

            await HoleriteService.criar(request);

        }
        catch (err) {

            console.error(err);

            setError("Erro ao cadastrar o holerite.");

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const editar = useCallback(async (

    request: HoleriteUpdateRequest

    ) => {

        try {

            setLoading(true);

            setError(null);

            await HoleriteService.editar(request);

        }
        catch (err) {

            console.error(err);

            setError("Erro ao editar o holerite.");

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

            await HoleriteService.excluir(id);

        }
        catch (err) {

            console.error(err);

            setError("Erro ao excluir o holerite.");

            throw err;

        }
        finally {

            setLoading(false);

        }

    }, []);

    const atualizarLista = useCallback(async () => {

        await listar();

    }, [listar]);

    const limparErro = () => {

        setError(null);

    };

    useEffect(() => {

        void listar();

    }, [listar]);

    return {

        holerites,

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