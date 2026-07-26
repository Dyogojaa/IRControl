import Typography from "@mui/material/Typography";
import type { MoneyDisplayProps } from "./MoneyDisplay.types";

export default function MoneyDisplay({
    value,
    variant = "body1",
    color = "text.primary",
    bold = false,
    showZero = true,
    negativeInRed = true,
}: MoneyDisplayProps) {

    if (!showZero && value === 0) {
        return (
            <Typography
                variant={variant}
                sx={{
                    color,
                    fontWeight: bold ? 700 : 400,
                }}
            >
                -
            </Typography>
        );
    }

    const formattedValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <Typography
            variant={variant}
            sx={{
                color: negativeInRed && value < 0
                    ? "error.main"
                    : color,
                fontWeight: bold ? 700 : 400,
            }}
        >
            {formattedValue}
        </Typography>
    );
}