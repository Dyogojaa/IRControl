import type { ReactNode } from "react";

export type FormDialogMode =
    | "create"
    | "edit"
    | "view";

export interface FormDialogProps {

    open: boolean;

    title: string;

    loading?: boolean;

    mode?: FormDialogMode;

    children: ReactNode;

    onClose: () => void;

    onSave: () => void;

}