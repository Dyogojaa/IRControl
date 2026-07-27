import type { DespesaMedicaRequest } from "@/types/despesaMedica";

export interface DependenteOption {

    id: number;

    nome: string;

}

export interface DespesaMedicaFormProps {

    value: DespesaMedicaRequest;

    mode: "create" | "edit" | "view";

    dependentes: DependenteOption[];

    onChange: (
        value: DespesaMedicaRequest
    ) => void;

}