import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import SummaryCard from "@/components/dashboard/SummaryCard";
import { useDashboard } from "@/hooks/useDashboard";

function DashboardPage() {
    const { dashboard, loading, error } = useDashboard(2026);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!dashboard) {
        return null;
    }

    return (
        <>
            <Typography
                variant="h4"
                sx={{ mb: 4 }}
            >
                Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Holerites"
                        value={dashboard.holerites.cadastrados}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Dependentes"
                        value={dashboard.dependentes.quantidade}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Despesas Médicas"
                        value={dashboard.despesasMedicas.quantidade}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Auditoria"
                        value={dashboard.auditoria.declaracaoApta ? "OK" : "Pendente"}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardPage;