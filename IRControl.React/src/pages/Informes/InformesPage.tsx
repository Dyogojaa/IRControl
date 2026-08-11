import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import ConfirmDialog from "@/components/common/ConfirmDialog/ConfirmDialog";
import FormDialog from "@/components/common/FormDialog";

import InformeRendimentoForm
    from "@/components/dashboard/informes/InformeRendimentoForm";

import InformesTable
    from "@/components/dashboard/informes/InformesTable";

import InformesToolbar
    from "@/components/dashboard/informes/InformesToolbar";

import {
    useInformesRendimentos,
} from "@/hooks/useInformesRendimentos";

import type {
    InformeRendimentoCreateRequest,
    InformeRendimentoUpdateRequest,
} from "@/types/informeRendimento";

type FormMode = "create" | "edit" | "view";

export default function InformesPage() {

    const {
        informes,
        loading,
        listar,
        criar,
        editar,
        excluir,
        obter,
    } = useInformesRendimentos();

    const [openForm, setOpenForm] =
        useState(false);

    const [openDelete, setOpenDelete] =
        useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [selectedId, setSelectedId] =
        useState<number | null>(null);

    const [formMode, setFormMode] =
        useState<FormMode>("create");

    const [pesquisa, setPesquisa] =
        useState("");

    const [form, setForm] =
        useState<InformeRendimentoCreateRequest>({
            ano: new Date().getFullYear(),
            empresa: "",
            salarioBruto: 0,
            inss: 0,
            irrf: 0,
            planoSaude: 0,
            previdenciaPrivada: 0,
        });

    useEffect(() => {

        void listar({
            pesquisa,
        });

    }, [pesquisa, listar]);

    function novo() {

        setFormMode("create");

        setEditingId(null);

        setForm({
            ano: new Date().getFullYear(),
            empresa: "",
            salarioBruto: 0,
            inss: 0,
            irrf: 0,
            planoSaude: 0,
            previdenciaPrivada: 0,
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
            ano: dados.ano,
            empresa: dados.empresa,
            salarioBruto: dados.salarioBruto,
            inss: dados.inss,
            irrf: dados.irrf,
            planoSaude: dados.planoSaude,
            previdenciaPrivada:
                dados.previdenciaPrivada,
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
            ano: dados.ano,
            empresa: dados.empresa,
            salarioBruto: dados.salarioBruto,
            inss: dados.inss,
            irrf: dados.irrf,
            planoSaude: dados.planoSaude,
            previdenciaPrivada:
                dados.previdenciaPrivada,
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

                const request:
                    InformeRendimentoUpdateRequest = {

                    id: editingId,

                    ...form,

                };

                await editar(request);

            }

            await listar({
                pesquisa,
            });

            alert(
                editingId === null
                    ? "Informe cadastrado com sucesso."
                    : "Informe atualizado com sucesso."
            );

            cancelarFormulario();

        }
        catch (error) {

            console.error(error);

            alert(
                "Erro ao salvar o informe."
            );

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
                pesquisa,
            });

            alert(
                "Informe excluído com sucesso."
            );

            cancelarExclusao();

        }
        catch (error) {

            console.error(error);

            alert(
                "Erro ao excluir o informe."
            );

        }

    }

    return (

        <Box sx={{ p: 3 }}>

            <InformesToolbar
                pesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                onNovo={novo}
            />

            <InformesTable
                data={informes}
                loading={loading}
                onVisualizar={visualizarRegistro}
                onEditar={editarRegistro}
                onExcluir={confirmarExclusao}
            />

            <FormDialog
                open={openForm}
                title={
                    formMode === "create"
                        ? "Novo Informe"
                        : formMode === "edit"
                            ? "Editar Informe"
                            : "Visualizar Informe"
                }
                loading={loading}
                mode={formMode}
                onClose={cancelarFormulario}
                onSave={salvarFormulario}
            >

                <InformeRendimentoForm
                    mode={formMode}
                    value={form}
                    onChange={setForm}
                />

            </FormDialog>

            <ConfirmDialog
                open={openDelete}
                loading={loading}
                title="Excluir Informe"
                message="Deseja realmente excluir este informe?"
                onCancel={cancelarExclusao}
                onConfirm={excluirRegistro}
            />

        </Box>

    );

}