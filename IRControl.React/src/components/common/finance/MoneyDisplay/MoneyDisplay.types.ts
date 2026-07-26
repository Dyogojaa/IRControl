import type { TypographyProps } from "@mui/material/Typography";

export interface MoneyDisplayProps {

    value: number;

    variant?: TypographyProps["variant"];

    color?: string;

    bold?: boolean;

    showZero?: boolean;

    negativeInRed?: boolean;

}