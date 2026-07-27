import Chip from "@mui/material/Chip";

interface SeverityChipProps {

    severity: number;

    label: string;

}

export default function SeverityChip({

    severity,

    label,

}: SeverityChipProps) {

    switch (severity) {

        case 0:

            return (
                <Chip
                    label={label}
                    color="info"
                    size="small"
                    variant="filled"
                />
            );

        case 1:

            return (
                <Chip
                    label={label}
                    color="warning"
                    size="small"
                    variant="filled"
                />
            );

        case 2:

            return (
                <Chip
                    label={label}
                    color="error"
                    size="small"
                    variant="filled"
                />
            );

        default:

            return (
                <Chip
                    label={label}
                    size="small"
                    variant="outlined"
                />
            );

    }

}