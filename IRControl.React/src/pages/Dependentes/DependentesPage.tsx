import { useEffect, useState } from "react";

import Box from "@mui/material/Box";

import ConfirmDialog from "@/components/common/ConfirmDialog/ConfirmDialog";
import FormDialog from "@/components/common/FormDialog";

import DependenteForm from "@/components/dashboard/dependentes/DependenteForm";
import DependentesTable from "@/components/dashboard/dependentes/DependentesTable";
import DependentesToolbar from "@/components/dashboard/dependentes/DependentesToolbar";

import { useDependentes } from "@/hooks/useDependentes";

import type {
    DependenteRequest,
} from "@/types/dependente";

type FormMode = "create" | "edit" | "view";

interface DependenteUpdateRequest extends DependenteRequest {
    id: number;
}

const emptyForm: DependenteRequest = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    parentesco: "",
};

export default function DependentesPage() {

    const {
        dependentes,
        loading,
        listar,
        criar,
        editar,
        excluir,
        obter,
    } = useDependentes();

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
        useState<DependenteRequest>(emptyForm);

    useEffect(() => {

        void listar({
            pesquisa,
        });

    }, [pesquisa, listar]);

    function novo() {

        setFormMode("create");

        setEditingId(null);

        setForm({
            ...emptyForm,
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
            nome: dados.nome,
            cpf: dados.cpf,
            dataNascimento:
                dados.dataNascimento.substring(0, 10),
            parentesco: dados.parentesco,
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
            nome: dados.nome,
            cpf: dados.cpf,
            dataNascimento:
                dados.dataNascimento.substring(0, 10),
            parentesco: dados.parentesco,
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

                const request: DependenteUpdateRequest = {

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
                    ? "Dependente cadastrado com sucesso."
                    : "Dependente atualizado com sucesso."
            );

            cancelarFormulario();

        }
        catch (error) {

            console.error(error);

            alert(
                "Erro ao salvar o dependente."
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
                "Dependente excluído com sucesso."
            );

            cancelarExclusao();

        }
        catch (error) {

            console.error(error);

            alert(
                "Erro ao excluir o dependente."
            );

        }

    }

    return (

        <Box sx={{ p: 3 }}>

            <DependentesToolbar
                pesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                onNovo={novo}
            />

            <DependentesTable
                dependentes={dependentes}
                loading={loading}
                onView={(item) =>
                    visualizarRegistro(item.id)
                }
                onEdit={(item) =>
                    editarRegistro(item.id)
                }
                onDelete={(item) =>
                    confirmarExclusao(item.id)
                }
            />

            <FormDialog
                open={openForm}
                title={
                    formMode === "create"
                        ? "Novo Dependente"
                        : formMode === "edit"
                            ? "Editar Dependente"
                            : "Visualizar Dependente"
                }
                loading={loading}
                mode={formMode}
                onClose={cancelarFormulario}
                onSave={salvarFormulario}
            >

                <DependenteForm
                    mode={formMode}
                    value={form}
                    onChange={setForm}
                />

            </FormDialog>

            <ConfirmDialog
                open={openDelete}
                loading={loading}
                title="Excluir Dependente"
                message="Deseja realmente excluir este dependente?"
                onCancel={cancelarExclusao}
                onConfirm={excluirRegistro}
            />

        </Box>

    );
}