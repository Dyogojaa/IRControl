import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import type { FormDialogProps } from "./FormDialog.types";

export default function FormDialog({
    open,
    title,
    loading = false,
    mode = "create",
    children,
    onClose,
    onSave,
}: FormDialogProps) {

    const isView = mode === "view";

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            disablePortal
        >

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent dividers>

                {children}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    {isView
                        ? "Fechar"
                        : "Cancelar"}
                </Button>

                {!isView && (

                    <Button
                        variant="contained"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading
                            ? <CircularProgress size={20} />
                            : "Salvar"}
                    </Button>

                )}

            </DialogActions>

        </Dialog>

    );

}