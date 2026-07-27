import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

import type { CurrencyFieldProps } from "./CurrencyField.types";

export default function CurrencyField({
    label,
    value,
    disabled = false,
    fullWidth = true,
    onChange,
}: CurrencyFieldProps) {
    return (
        <NumericFormat
            value={value}
            customInput={TextField}
            label={label}
            fullWidth={fullWidth}
            disabled={disabled}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            prefix="R$ "
            valueIsNumericString={false}
            onValueChange={(values) => {
                onChange(values.floatValue ?? 0);
            }}
            slotProps={{
                htmlInput: {
                    style: {
                        textAlign: "right",
                    },
                },
            }}
        />
    );
}