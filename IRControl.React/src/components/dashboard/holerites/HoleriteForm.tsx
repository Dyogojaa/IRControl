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
          backgroundColor: "grey.100",
        gap: 3,
        mt: 1,
    }}
>

            <SectionCard
                title="Dados Gerais"
                icon={<BadgeIcon />}
            >
                <Grid container spacing={2}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Mês"
                            type="number"
                            value={value.mes}
                            disabled={readOnly}
                            onChange={(e) =>
                                update(
                                    "mes",
                                    Number(e.target.value)
                                )
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Ano"
                            type="number"
                            value={value.ano}
                            disabled={readOnly}
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
                        <TextField
                            fullWidth
                            label="Salário Bruto"
                            type="number"
                            value={value.salarioBruto}
                            disabled={readOnly}
                            onChange={(e) =>
                                update(
                                    "salarioBruto",
                                    Number(e.target.value)
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
                    <TextField
                        fullWidth
                        label="INSS"
                        type="number"
                        value={value.inss}
                        disabled={readOnly}
                        onChange={(e) =>
                            update(
                                "inss",
                                Number(e.target.value)
                            )
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="IRRF"
                        type="number"
                        value={value.irrf}
                        disabled={readOnly}
                        onChange={(e) =>
                            update(
                                "irrf",
                                Number(e.target.value)
                            )
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Plano de Saúde"
                        type="number"
                        value={value.planoSaude}
                        disabled={readOnly}
                        onChange={(e) =>
                            update(
                                "planoSaude",
                                Number(e.target.value)
                            )
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Previdência Privada"
                        type="number"
                        value={value.previdenciaPrivada}
                        disabled={readOnly}
                        onChange={(e) =>
                            update(
                                "previdenciaPrivada",
                                Number(e.target.value)
                            )
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Outros Descontos"
                        type="number"
                        value={value.outrosDescontos}
                        disabled={readOnly}
                        onChange={(e) =>
                            update(
                                "outrosDescontos",
                                Number(e.target.value)
                            )
                        }
                    />
                </Grid>

            </Grid>
        </SectionCard>

        </Box>

    );

}