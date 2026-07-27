import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

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

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                    borderTop: 1,
                    borderColor: "divider",
                    gap: 1.5,
                }}
            >

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClose}
                    disabled={loading}
                    startIcon={
                        isView
                            ? <CloseIcon />
                            : <ArrowBackIcon />
                    }
                    sx={{
                        minWidth: 130,
                    }}
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
                        startIcon={
                            !loading
                                ? <SaveIcon />
                                : undefined
                        }
                        sx={{
                            minWidth: 130,
                        }}
                    >
                        {loading ? (
                            <CircularProgress
                                size={20}
                                color="inherit"
                            />
                        ) : (
                            "Salvar"
                        )}
                    </Button>

                )}

            </DialogActions>

        </Dialog>

    );

}