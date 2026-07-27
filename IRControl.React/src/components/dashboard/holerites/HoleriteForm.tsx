import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BadgeIcon from "@mui/icons-material/Badge";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SectionCard from "@/components/common/finance/SectionCard";


import type {
    HoleriteFormProps,
} from "./HoleriteForm.types";
import { meses } from "@/config/meses";
import MenuItem from "@mui/material/MenuItem";
import CurrencyField from "@/components/common/form/CurrencyField";

export default function HoleriteForm({
    mode,
    value,
    onChange,
}: HoleriteFormProps) {

    const readOnly = mode === "view";

    const update = (
        field: keyof typeof value,
        fieldValue: number,
    ) => {

        onChange({
            ...value,
            [field]: fieldValue,
        });

    };

    return (

          <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "action.hover",
                gap: 2.5,
                mt: 0,
            }}
>

            <SectionCard
                title="Dados Gerais"
                icon={<BadgeIcon />}
            >
                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            select
                            fullWidth
                            label="Mês"
                            value={value.mes}
                            disabled={readOnly}
                            onChange={(e) =>
                                update(
                                    "mes",
                                    Number(e.target.value)
                                )
                            }
                        >
                            {meses.map((mes) => (
                                <MenuItem
                                    key={mes.value}
                                    value={mes.value}
                                >
                                    {mes.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid size={{ xs: 12, md: 2 }}>
                        <TextField
                            fullWidth
                            label="Ano"                            
                            type="number"
                            value={value.ano}
                            disabled={readOnly}
                            sx={{
                                "& input": {
                                    textAlign: "right",
                                },
                            }}
                            onChange={(e) =>
                                update(
                                    "ano",
                                    Number(e.target.value)
                                )
                            }
                        />
                    </Grid>

                </Grid>
            </SectionCard>

            <SectionCard
                title="Rendimentos"
                icon={<PaymentsIcon />}
            >
                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                        <CurrencyField
                        label="Salário Bruto"
                        value={value.salarioBruto}
                        disabled={readOnly}
                        onChange={(value) =>
                            update("salarioBruto", value)
                        }
                    />
                    </Grid>

                </Grid>
            </SectionCard>

            <SectionCard
            title="Descontos"
            icon={<ReceiptLongIcon />}
        >
            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 6 }}>
                    <CurrencyField
                        label="INSS"
                        value={value.inss}
                        disabled={readOnly}
                        onChange={(value) => update("inss", value)}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <CurrencyField
                        label="IRRF"
                        value={value.irrf}
                        disabled={readOnly}
                        onChange={(value) =>
                            update("irrf", value)
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <CurrencyField
                        label="Plano de Saúde"
                        value={value.planoSaude}
                        disabled={readOnly}
                        onChange={(value) =>
                            update("planoSaude", value)
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <CurrencyField
                        label="Previdência Privada"
                        value={value.previdenciaPrivada}
                        disabled={readOnly}
                        onChange={(value) =>
                            update("previdenciaPrivada", value)
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <CurrencyField
                        label="Outros Descontos"
                        value={value.outrosDescontos}
                        disabled={readOnly}
                        onChange={(value) =>
                            update("outrosDescontos", value)
                        }
                    />
                </Grid>

            </Grid>
        </SectionCard>

        </Box>

    );

}