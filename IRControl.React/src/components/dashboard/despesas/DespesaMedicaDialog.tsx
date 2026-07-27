import FormDialog from "@/components/common/FormDialog";

import DespesaMedicaForm from "./DespesaMedicaForm";

import type {
    DependenteOption,    
} from "./DespesaMedicaForm.types";

import type { DespesaMedicaRequest } from "@/types/despesaMedica";

interface Props {

    open: boolean;

    mode: "create" | "edit";

    loading?: boolean;

    value: DespesaMedicaRequest;

    dependentes: DependenteOption[];

    onClose: () => void;

    onSave: () => void;

    onChange: (
        value: DespesaMedicaRequest
    ) => void;

}

export default function DespesaMedicaDialog({

    open,

    mode,

    loading = false,

    value,

    dependentes,

    onClose,

    onSave,

    onChange,

}: Props) {

    return (

        <FormDialog
            open={open}
            title={
                mode === "create"
                    ? "Nova Despesa Médica"
                    : "Editar Despesa Médica"
            }
            loading={loading}
            onClose={onClose}
            onSave={onSave}            
        >

            <DespesaMedicaForm
                mode={mode}
                value={value}
                dependentes={dependentes}
                onChange={onChange}
            />

        </FormDialog>

    );

}