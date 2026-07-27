import TextField from "@mui/material/TextField";

import type { NumberFieldProps } from "./NumberField.types";

export default function NumberField({
    value,
    onChange,
    allowNegative = false,
    size = "small",
    fullWidth = true,
    sx,
    slotProps,
    ...props
}: NumberFieldProps) {

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {

        const text = event.target.value;

        if (text === "") {

            onChange(0);
            return;

        }

        const number = Number(text);

        if (Number.isNaN(number)) {
            return;
        }

        if (!allowNegative && number < 0) {
            return;
        }

        onChange(number);

    };

    return (

        <TextField
            {...props}
            type="number"
            value={value}
            size={size}
            fullWidth={fullWidth}
            onChange={handleChange}
            slotProps={{
                ...slotProps,
                htmlInput: {
                    inputMode: "decimal",
                    ...(slotProps?.htmlInput ?? {}),
                },
            }}
            sx={{
                "& input[type=number]::-webkit-outer-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                },

                "& input[type=number]::-webkit-inner-spin-button": {
                    WebkitAppearance: "none",
                    margin: 0,
                },

                "& input[type=number]": {
                    MozAppearance: "textfield",
                },

                "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                },

                ...sx,
            }}
        />

    );

}