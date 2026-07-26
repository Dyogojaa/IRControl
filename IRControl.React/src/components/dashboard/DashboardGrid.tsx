import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { DashboardResponse } from "@/types/dashboard";

interface DashboardGridProps {
    dashboard: DashboardResponse;
}

export default function DashboardGrid({
    dashboard,
}: DashboardGridProps) {

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        height: 250,
                    }}
                >
                    <Typography variant="h6">
                        Holerites
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Total cadastrados:
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mt: 2,
                        }}
                    >
                        {dashboard.holerites.cadastrados}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        height: 250,
                    }}
                >
                    <Typography variant="h6">
                        Dependentes
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Pessoas cadastradas
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mt: 2,
                        }}
                    >
                        {dashboard.dependentes.quantidade}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        height: 250,
                    }}
                >
                    <Typography variant="h6">
                        Despesas Médicas
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Total informado
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mt: 2,
                        }}
                    >
                        {dashboard.despesasMedicas.quantidade}
                    </Typography>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        height: 250,
                    }}
                >
                    <Typography variant="h6">
                        Auditoria
                    </Typography>

                    <Box
                        sx={{
                            mt: 4,
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: dashboard.auditoria.declaracaoApta
                                    ? "success.main"
                                    : "warning.main",
                            }}
                        >
                            {dashboard.auditoria.declaracaoApta
                                ? "Declaração Apta"
                                : "Pendências"}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            {dashboard.auditoria.declaracaoApta
                                ? "Nenhuma inconsistência encontrada."
                                : "Existem itens aguardando análise."}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}