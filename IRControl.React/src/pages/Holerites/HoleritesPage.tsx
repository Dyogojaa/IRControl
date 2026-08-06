import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import ConfirmDialog from "@/components/common/ConfirmDialog/ConfirmDialog";
import FormDialog from "@/components/common/FormDialog";

import HoleriteForm from "@/components/dashboard/holerites/HoleriteForm";
import HoleritesTable from "@/components/dashboard/holerites/HoleritesTable";
import HoleritesToolbar from "@/components/dashboard/holerites/HoleritesToolbar";

import { useHolerites } from "@/hooks/useHolerites";

import type {
    HoleriteCreateRequest,
    HoleriteUpdateRequest,
} from "@/types/holerite";

type FormMode = "create" | "edit" | "view";


export default function HoleritesPage() {

    const {
        holerites,
        loading,
        listar,
        criar,
        editar,
        excluir,
        obter,
    } = useHolerites();

    const [openForm, setOpenForm] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [selectedId, setSelectedId] =
        useState<number | null>(null);

    const [formMode, setFormMode] =
        useState<FormMode>("create");

    const [pesquisa, setPesquisa] =  useState("");        

    const [form, setForm] =
        useState<HoleriteCreateRequest>({
            mes: 1,
            ano: new Date().getFullYear(),
            salarioBruto: 0,
            inss: 0,
            irrf: 0,
            planoSaude: 0,
            previdenciaPrivada: 0,
            outrosDescontos: 0,
        });

    function novo() {

        setFormMode("create");

        setEditingId(null);

        setForm({
            mes: 1,
            ano: new Date().getFullYear(),
            salarioBruto: 0,
            inss: 0,
            irrf: 0,
            planoSaude: 0,
            previdenciaPrivada: 0,
            outrosDescontos: 0,
        });

        setOpenForm(true);

    }

    async function editarRegistro(id: number) {

        const dados = await obter(id);

        if (!dados)
            return;

        setFormMode("edit");

        setEditingId(id);

        setForm({
            mes: dados.mes,
            ano: dados.ano,
            salarioBruto: dados.salarioBruto,
            inss: dados.inss,
            irrf: dados.irrf,
            planoSaude: dados.planoSaude,
            previdenciaPrivada: dados.previdenciaPrivada,
            outrosDescontos: dados.outrosDescontos,
        });

        setOpenForm(true);

    }

    async function visualizarRegistro(id: number) {

        const dados = await obter(id);

        if (!dados)
            return;

        setFormMode("view");

        setEditingId(id);

        setForm({
            mes: dados.mes,
            ano: dados.ano,
            salarioBruto: dados.salarioBruto,
            inss: dados.inss,
            irrf: dados.irrf,
            planoSaude: dados.planoSaude,
            previdenciaPrivada: dados.previdenciaPrivada,
            outrosDescontos: dados.outrosDescontos,
        });

        setOpenForm(true);

    }

    function cancelarFormulario() {

        setOpenForm(false);

        setEditingId(null);

        setFormMode("create");

    }

    async function salvarFormulario() {

        if (formMode === "view") {

            cancelarFormulario();

            return;

        }

        try {

            if (editingId === null) {

                await criar(form);

            }
            else {

                const request: HoleriteUpdateRequest = {

                    id: editingId,

                    ...form,

                };

                await editar(request);

            }

            await listar({
                pesquisa
            });

            alert(
                editingId === null
                    ? "Holerite cadastrado com sucesso."
                    : "Holerite atualizado com sucesso."
            );

            cancelarFormulario();

        }
        catch (error) {

            console.error(error);

            alert("Erro ao salvar o holerite.");

        }

    }
	    function confirmarExclusao(id: number) {

        setSelectedId(id);

        setOpenDelete(true);

    }

    function cancelarExclusao() {

        setSelectedId(null);

        setOpenDelete(false);

    }

    async function excluirRegistro() {

        if (selectedId === null)
            return;

        try {

            await excluir(selectedId);

            await listar({
                pesquisa
            });



            alert("Holerite excluído com sucesso.");

            cancelarExclusao();

        }
        catch (error) {

            console.error(error);

            alert("Erro ao excluir o holerite.");

        }

    }

    useEffect(() => {

        void listar({
            pesquisa
        });

    }, [pesquisa, listar]);

    return (

        <Box sx={{ p: 3 }}>

            <HoleritesToolbar
                pesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                onNovo={novo}
            />

            <HoleritesTable
                data={holerites}
                loading={loading}
                onVisualizar={visualizarRegistro}
                onEditar={editarRegistro}
                onExcluir={confirmarExclusao}
            />

            <FormDialog
                open={openForm}
                title={
                    formMode === "create"
                        ? "Novo Holerite"
                        : formMode === "edit"
                            ? "Editar Holerite"
                            : "Visualizar Holerite"
                }
                loading={loading}
                mode={formMode}
                onClose={cancelarFormulario}
                onSave={salvarFormulario}
            >

                <HoleriteForm
                    mode={formMode}
                    value={form}
                    onChange={setForm}
                />

            </FormDialog>

            <ConfirmDialog
                open={openDelete}
                loading={loading}
                title="Excluir Holerite"
                message="Deseja realmente excluir este holerite?"
                onCancel={cancelarExclusao}
                onConfirm={excluirRegistro}
            />

        </Box>

    );

}