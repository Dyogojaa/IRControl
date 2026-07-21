import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import SummaryCard from "@/components/dashboard/SummaryCard";

function DashboardPage() {
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
                        value={12}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Dependentes"
                        value={3}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Despesas Médicas"
                        value={5}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard
                        title="Auditoria"
                        value="OK"
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default DashboardPage;