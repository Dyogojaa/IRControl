import type { ChangeEvent } from "react";

import {
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import type {
    DependenteOption,
    DespesaMedicaFormProps,
} from "./DespesaMedicaForm.types";

function calcularDedutivel(
    valor: number,
    reembolso: number
): number {

    return Math.max(valor - reembolso, 0);

}

export default function DespesaMedicaForm({

    mode,

    value,

    dependentes,

    onChange,

}: DespesaMedicaFormProps) {

    const readOnly = mode === "view";

    const alterarCampo = <K extends keyof typeof value>(
        campo: K,
        valor: (typeof value)[K]
    ) => {

        if (readOnly)
            return;

        onChange({
            ...value,
            [campo]: valor,
        });

    };

    const alterarNumero =
        (campo: "valor" | "valorReembolsado") =>
        (event: ChangeEvent<HTMLInputElement>) => {

            if (readOnly)
                return;

            const numero =
                Number(event.target.value.replace(",", ".")) || 0;

            onChange({
                ...value,
                [campo]: numero,
            });

        };

    const valorDedutivel = calcularDedutivel(
        value.valor,
        value.valorReembolsado
    );

    return (

        <Grid
            container
            spacing={2}
        >

            <Grid size={{ xs: 12, md: 4 }}>

                <TextField
                    label="Data da Despesa"
                    type="date"
                    fullWidth
                    disabled={readOnly}
                    value={value.dataDespesa}
                    onChange={(e) =>
                        alterarCampo(
                            "dataDespesa",
                            e.target.value
                        )
                    }
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>

                <TextField
                    select
                    fullWidth
                    label="Dependente"
                    disabled={readOnly}
                    value={value.dependenteId}
                    onChange={(e) =>
                        alterarCampo(
                            "dependenteId",
                            Number(e.target.value)
                        )
                    }
                >

                    {dependentes.map((dependente: DependenteOption) => (

                        <MenuItem
                            key={dependente.id}
                            value={dependente.id}
                        >
                            {dependente.nome}
                        </MenuItem>

                    ))}

                </TextField>

            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>

                <TextField
                    label="Médico / Clínica"
                    fullWidth
                    disabled={readOnly}
                    value={value.medicoClinica}
                    onChange={(e) =>
                        alterarCampo(
                            "medicoClinica",
                            e.target.value
                        )
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <TextField
                    label="CPF/CNPJ"
                    fullWidth
                    disabled={readOnly}
                    value={value.cpfCnpj}
                    onChange={(e) =>
                        alterarCampo(
                            "cpfCnpj",
                            e.target.value
                        )
                    }
                />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <TextField
                    label="Especialidade"
                    fullWidth
                    disabled={readOnly}
                    value={value.especialidade}
                    onChange={(e) =>
                        alterarCampo(
                            "especialidade",
                            e.target.value
                        )
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <TextField
                    label="Valor"
                    type="number"
                    fullWidth
                    disabled={readOnly}
                    value={value.valor}
                    onChange={alterarNumero("valor")}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <TextField
                    label="Valor Reembolsado"
                    type="number"
                    fullWidth
                    disabled={readOnly}
                    value={value.valorReembolsado}
                    onChange={alterarNumero("valorReembolsado")}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <TextField
                    label="Valor Dedutível"
                    fullWidth
                    disabled
                    value={valorDedutivel.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />

            </Grid>

            <Grid size={{ xs: 12 }}>

                <TextField
                    label="Observação"
                    fullWidth
                    multiline
                    minRows={4}
                    disabled={readOnly}
                    value={value.observacao}
                    onChange={(e) =>
                        alterarCampo(
                            "observacao",
                            e.target.value
                        )
                    }
                />

            </Grid>

        </Grid>

    );

}