import type { TextFieldProps } from "@mui/material/TextField";

export interface NumberFieldProps
    extends Omit<
        TextFieldProps,
        "type" | "value" | "onChange"
    > {

    value: number;

    onChange: (value: number) => void;

    allowNegative?: boolean;

}