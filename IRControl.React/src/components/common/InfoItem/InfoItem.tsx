import { Stack, Typography } from "@mui/material";
import type { InfoItemProps } from "./InfoItem.types";

export default function InfoItem({
    label,
    value,
}: InfoItemProps) {
    return (
        <Stack spacing={0.5}>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography variant="body1">
                {value}
            </Typography>
        </Stack>
    );
}