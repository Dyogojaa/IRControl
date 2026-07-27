import BadgeIcon from "@mui/icons-material/Badge";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import SectionCard from "@/components/common/finance/SectionCard";

import type { DependenteFormProps } from "./DependenteForm.types";

const parentescos = [
    "Cônjuge",
    "Companheiro(a)",
    "Filho(a)",
    "Enteado(a)",
    "Pai",
    "Mãe",
    "Avô",
    "Avó",
    "Outro",
];

export default function DependenteForm({
    mode,
    value,
    onChange,
}: DependenteFormProps) {

    const readOnly = mode === "view";

    const update = (
        field: keyof typeof value,
        fieldValue: string,
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
                title="Dados do Dependente"
                icon={<BadgeIcon />}
            >

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Nome"
                            value={value.nome}
                            disabled={readOnly}
                            onChange={(e) =>
                                update("nome", e.target.value)
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <TextField
                            fullWidth
                            label="CPF"
                            value={value.cpf}
                            disabled={readOnly}
                            slotProps={{
                                htmlInput: {
                                    maxLength: 14,
                                },
                            }}
                            onChange={(e) =>
                                update("cpf", e.target.value)
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextField
                            fullWidth
                            label="Data de Nascimento"
                            type="date"
                            value={value.dataNascimento}
                            disabled={readOnly}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            onChange={(e) =>
                                update("dataNascimento", e.target.value)
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            select
                            fullWidth
                            label="Parentesco"
                            value={value.parentesco}
                            disabled={readOnly}
                            onChange={(e) =>
                                update("parentesco", e.target.value)
                            }
                        >
                            {parentescos.map((item) => (
                                <MenuItem
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                </Grid>

            </SectionCard>

            <SectionCard
                title="Informações"
                icon={<FamilyRestroomIcon />}
            >

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            disabled
                            label="Observação"
                            value="Os dependentes cadastrados serão considerados para o cálculo das informações utilizadas na declaração do Imposto de Renda."
                        />
                    </Grid>

                </Grid>

            </SectionCard>

        </Box>

    );

}