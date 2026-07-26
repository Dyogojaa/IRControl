import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import InfoIcon from "@mui/icons-material/Info";
import Chip from "@mui/material/Chip";

import type { StatusChipProps } from "./StatusChip.types";

export default function StatusChip({
    status,
}: StatusChipProps) {

    const value = status.trim().toLowerCase();

    switch (value) {

        case "pronto":
        case "concluído":
        case "concluido":
        case "enviado":
            return (
                <Chip
                    color="success"
                    icon={<CheckCircleIcon />}
                    label={status}
                    size="small"
                />
            );

        case "pendente":
        case "processando":
            return (
                <Chip
                    color="warning"
                    icon={<HourglassEmptyIcon />}
                    label={status}
                    size="small"
                />
            );

        case "erro":
        case "falhou":
            return (
                <Chip
                    color="error"
                    icon={<ErrorIcon />}
                    label={status}
                    size="small"
                />
            );

        default:
            return (
                <Chip
                    color="default"
                    icon={<InfoIcon />}
                    label={status}
                    size="small"
                />
            );
    }
}