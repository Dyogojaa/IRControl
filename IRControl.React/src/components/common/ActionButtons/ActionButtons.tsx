import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { ActionButtonsProps } from "./ActionButtons.types";



export default function ActionButtons({
    onView,
    onEdit,
    onDelete,
}: ActionButtonsProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 0.5,
            }}
        >
            <Tooltip title="Visualizar">
                <IconButton
                    size="small"
                    onClick={onView}
                >
                    <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Editar">
                <IconButton
                    size="small"
                    onClick={onEdit}
                >
                    <EditOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Excluir">
                <IconButton
                    size="small"
                    color="error"
                    onClick={onDelete}
                >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}