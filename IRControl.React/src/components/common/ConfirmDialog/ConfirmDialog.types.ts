export interface ConfirmDialogProps {
    open: boolean;
    loading?: boolean;

    title: string;
    message: string;

    onCancel: () => void;
    onConfirm: () => void;
}