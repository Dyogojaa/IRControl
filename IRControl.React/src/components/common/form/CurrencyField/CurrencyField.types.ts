export interface CurrencyFieldProps {
    label: string;
    value: number;
    disabled?: boolean;
    fullWidth?: boolean;
    onChange: (value: number) => void;
}