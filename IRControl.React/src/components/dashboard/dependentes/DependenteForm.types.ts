import type { DependenteRequest } from "@/types/dependente";

export type DialogMode = "create" | "edit" | "view";

export interface DependenteFormProps {
    mode: DialogMode;
    value: DependenteRequest;
    onChange: (value: DependenteRequest) => void;
}