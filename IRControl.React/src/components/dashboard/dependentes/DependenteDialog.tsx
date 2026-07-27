import { useEffect, useState } from "react";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import DependenteForm from "./DependenteForm";

import type { DialogMode } from "@/hooks/useDependentes";
import type {
    Dependente,
    DependenteRequest,
} from "@/types/dependente";

interface Props {
    open: boolean;
    mode: DialogMode;

    dependente?: Dependente | null;

    onClose: () => void;

    onSave: (value: DependenteRequest) => Promise<void>;
}

const emptyForm: DependenteRequest = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    parentesco: "",
};

export default function DependenteDialog({
    open,
    mode,
    dependente,
    onClose,
    onSave,
}: Props) {

    const [form, setForm] =
        useState<DependenteRequest>(emptyForm);

    useEffect(() => {

        if (dependente) {

            setForm({
                nome: dependente.nome,
                cpf: dependente.cpf,
                dataNascimento:
                    dependente.dataNascimento.substring(0, 10),
                parentesco: dependente.parentesco,
            });

            return;
        }

        setForm(emptyForm);

    }, [dependente]);

    async function handleSave() {
        await onSave(form);
    }

    const title =
        mode === "create"
            ? "Novo Dependente"
            : mode === "edit"
            ? "Editar Dependente"
            : "Visualizar Dependente";

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent dividers>

                <DependenteForm
                    mode={mode}
                    value={form}
                    onChange={setForm}
                />

            </DialogContent>

            <DialogActions>

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onClose}
                >
                    {mode === "view"
                        ? "Fechar"
                        : "Cancelar"}
                </Button>

                {mode !== "view" && (

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                    >
                        Salvar
                    </Button>

                )}

            </DialogActions>

        </Dialog>

    );

}