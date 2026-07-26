import type {
    HoleriteCreateRequest,
} from "@/types/holerite";

export type HoleriteFormMode =
    | "create"
    | "edit"
    | "view";

export interface HoleriteFormProps {

    mode: HoleriteFormMode;

    value: HoleriteCreateRequest;

    onChange: (
        value: HoleriteCreateRequest
    ) => void;

}