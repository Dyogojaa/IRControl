import type { DialogMode } from "@/hooks/useDependentes";
import type { DependenteRequest } from "@/types/dependente";

export interface DependenteFormProps {
    mode: DialogMode;
    value: DependenteRequest;
    onChange: (value: DependenteRequest) => void;
}