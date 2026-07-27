import { useMemo, useState } from "react";

import Box from "@mui/material/Box";

import ConfirmDialog from "@/components/common/ConfirmDialog/ConfirmDialog";
import FormDialog from "@/components/common/FormDialog";

import DespesaMedicaForm from "@/components/dashboard/despesas/DespesaMedicaForm";
import DespesasMedicasTable from "@/components/dashboard/despesas/DespesasMedicasTable";
import DespesasMedicasToolbar from "@/components/dashboard/despesas/DespesasMedicasToolbar";


import { useDependentes } from "@/hooks/useDependentes";
import {
    useDespesasMedicas,
    type DespesaMedicaUpdateRequest,
} from "@/hooks/useDespesasMedicas";

import type {
    DespesaMedica,
    DespesaMedicaRequest,
} from "@/types/despesaMedica";

type FormMode = "create" | "edit" | "view";

const emptyForm: DespesaMedicaRequest = {

    dataDespesa: "",

    dependenteId: 0,

    medicoClinica: "",

    cpfCnpj: "",

    especialidade: "",

    valor: 0,

    valorReembolsado: 0,

    observacao: "",

};

export default function DespesasMedicasPage() {

    const {
        dependentes,
    } = useDependentes();

    const {
        despesasMedicas,
        loading,
        listar,
        criar,
        editar,
        excluir,
        obter,
    } = useDespesasMedicas();

    const dependentesOptions = useMemo(
        () =>
            dependentes.map((d) => ({
                id: d.id,
                nome: d.nome,
            })),
        [dependentes]
    );

    const [openForm, setOpenForm] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [selectedId, setSelectedId] =
        useState<number | null>(null);

    const [formMode, setFormMode] =
        useState<FormMode>("create");

    const [form, setForm] =
        useState<DespesaMedicaRequest>(emptyForm);

    function novo() {

        setFormMode("create");

        setEditingId(null);

        setForm(emptyForm);

        setOpenForm(true);

    }

    async function editarRegistro(id: number) {

        const dados = await obter(id);

        if (!dados)
            return;

        setFormMode("edit");

        setEditingId(id);

        setForm({

            dataDespesa:
                dados.dataDespesa.substring(0, 10),

            dependenteId:
                dados.dependenteId,

            medicoClinica:
                dados.medicoClinica,

            cpfCnpj:
                dados.cpfCnpj,

            especialidade:
                dados.especialidade,

            valor:
                dados.valor,

            valorReembolsado:
                dados.valorReembolsado,

            observacao:
                dados.observacao,

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

            dataDespesa:
                dados.dataDespesa.substring(0, 10),

            dependenteId:
                dados.dependenteId,

            medicoClinica:
                dados.medicoClinica,

            cpfCnpj:
                dados.cpfCnpj,

            especialidade:
                dados.especialidade,

            valor:
                dados.valor,

            valorReembolsado:
                dados.valorReembolsado,

            observacao:
                dados.observacao,

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

            } else {

                const request: DespesaMedicaUpdateRequest = {

                    id: editingId,

                    ...form,

                };

                await editar(request);

            }

            await listar();

            alert(
                editingId === null
                    ? "Despesa médica cadastrada com sucesso."
                    : "Despesa médica atualizada com sucesso."
            );

            cancelarFormulario();

        }
        catch (error) {

            console.error(error);

            alert("Erro ao salvar a despesa médica.");

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

            await listar();

            alert(
                "Despesa médica excluída com sucesso."
            );

            cancelarExclusao();

        }
        catch (error) {

            console.error(error);

            alert(
                "Erro ao excluir a despesa médica."
            );

        }

    }

    return (

        <Box sx={{ p: 3 }}>

            <DespesasMedicasToolbar
                onNovo={novo}
            />

            <DespesasMedicasTable
                despesasMedicas={despesasMedicas}
                loading={loading}
                onView={(item: DespesaMedica) =>
                    visualizarRegistro(item.id)
                }
                onEdit={(item: DespesaMedica) =>
                    editarRegistro(item.id)
                }
                onDelete={(item: DespesaMedica) =>
                    confirmarExclusao(item.id)
                }
            />

            <FormDialog
                open={openForm}
                title={
                    formMode === "create"
                        ? "Nova Despesa Médica"
                        : formMode === "edit"
                            ? "Editar Despesa Médica"
                            : "Visualizar Despesa Médica"
                }
                loading={loading}
                mode={formMode}
                onClose={cancelarFormulario}
                onSave={salvarFormulario}
            >

                <DespesaMedicaForm
                    mode={formMode}
                    value={form}
                    dependentes={dependentesOptions}
                    onChange={setForm}
                />

            </FormDialog>

            <ConfirmDialog
                open={openDelete}
                loading={loading}
                title="Excluir Despesa Médica"
                message="Deseja realmente excluir esta despesa médica?"
                onCancel={cancelarExclusao}
                onConfirm={excluirRegistro}
            />

        </Box>

    );

}