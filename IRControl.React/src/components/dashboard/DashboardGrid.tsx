import Grid from "@mui/material/Grid";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AssessmentIcon from "@mui/icons-material/Assessment";

import DashboardCard from "./DashboardCard";

function DashboardGrid() {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <DashboardCard
                    title="Holerites"
                    value={12}
                    subtitle="Importados"
                    icon={<DescriptionIcon fontSize="inherit" />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <DashboardCard
                    title="Dependentes"
                    value={3}
                    subtitle="Cadastrados"
                    icon={<PeopleIcon fontSize="inherit" />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <DashboardCard
                    title="Despesas"
                    value={15}
                    subtitle="Lançadas"
                    icon={<MedicalServicesIcon fontSize="inherit" />}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <DashboardCard
                    title="Declaração"
                    value="2026"
                    subtitle="Exercício"
                    icon={<AssessmentIcon fontSize="inherit" />}
                />
            </Grid>
        </Grid>
    );
}

export default DashboardGrid;