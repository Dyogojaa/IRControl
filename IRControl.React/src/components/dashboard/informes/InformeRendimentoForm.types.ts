import type {
    InformeRendimentoCreateRequest,
} from "@/types/informeRendimento";

export interface InformeRendimentoFormProps {

    mode: "create" | "edit" | "view";

    value: InformeRendimentoCreateRequest;

    onChange: (
        value: InformeRendimentoCreateRequest
    ) => void;

}