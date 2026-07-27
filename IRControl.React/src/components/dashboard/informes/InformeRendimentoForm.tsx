import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import BadgeIcon from "@mui/icons-material/Badge";
import PaymentsIcon from "@mui/icons-material/Payments";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import SectionCard from "@/components/common/finance/SectionCard";
import CurrencyField from "@/components/common/form/CurrencyField";

import type {
    InformeRendimentoFormProps,
} from "./InformeRendimentoForm.types";

export default function InformeRendimentoForm({

    mode,
    value,
    onChange,

}: InformeRendimentoFormProps) {

    const readOnly = mode === "view";

    const update = (

        field: keyof typeof value,

        fieldValue: string | number,

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

                    <Grid size={{ xs: 12, md: 9 }}>

                        <TextField
                            fullWidth
                            label="Empresa"
                            value={value.empresa}
                            disabled={readOnly}
                            onChange={(e) =>
                                update(
                                    "empresa",
                                    e.target.value
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
                            onChange={(valor) =>
                                update(
                                    "salarioBruto",
                                    valor
                                )
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
                            onChange={(valor) =>
                                update("inss", valor)
                            }
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <CurrencyField
                            label="IRRF"
                            value={value.irrf}
                            disabled={readOnly}
                            onChange={(valor) =>
                                update("irrf", valor)
                            }
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <CurrencyField
                            label="Plano de Saúde"
                            value={value.planoSaude}
                            disabled={readOnly}
                            onChange={(valor) =>
                                update(
                                    "planoSaude",
                                    valor
                                )
                            }
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <CurrencyField
                            label="Previdência Privada"
                            value={value.previdenciaPrivada}
                            disabled={readOnly}
                            onChange={(valor) =>
                                update(
                                    "previdenciaPrivada",
                                    valor
                                )
                            }
                        />

                    </Grid>

                </Grid>

            </SectionCard>

        </Box>

    );

}