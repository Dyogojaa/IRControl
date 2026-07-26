import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import type { ConfirmDialogProps } from "./ConfirmDialog.types";

export default function ConfirmDialog({
    open,
    loading = false,
    title,
    message,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            disablePortal
        >
            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

                <Typography>
                    {message}
                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancelar
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading
                        ? <CircularProgress size={20} />
                        : "Excluir"}
                </Button>

            </DialogActions>

        </Dialog>
    );
}