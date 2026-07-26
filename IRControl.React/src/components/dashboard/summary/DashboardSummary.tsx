import Grid from "@mui/material/Grid";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import SummaryCard from "./SummaryCard";

import type { DashboardResponse } from "@/types/dashboard";

interface DashboardSummaryProps {
    dashboard: DashboardResponse;
}

export default function DashboardSummary({
    dashboard,
}: DashboardSummaryProps) {
    return (
        <Grid
            container
            spacing={3}
            sx={{ mb: 5 }}
        >
            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                <SummaryCard
                    title="Holerites"
                    value={String(dashboard.holerites.cadastrados)}
                    subtitle="Documentos cadastrados"
                    icon={<DescriptionOutlinedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                <SummaryCard
                    title="Dependentes"
                    value={String(dashboard.dependentes.quantidade)}
                    subtitle="Pessoas vinculadas"
                    icon={<GroupsOutlinedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                <SummaryCard
                    title="Despesas Médicas"
                    value={String(dashboard.despesasMedicas.quantidade)}
                    subtitle="Lançamentos cadastrados"
                    icon={<LocalHospitalOutlinedIcon />}
                />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
                <SummaryCard
                    title="Auditoria"
                    value={
                        dashboard.auditoria.declaracaoApta
                            ? "OK"
                            : "Pendente"
                    }
                    subtitle="Situação da declaração"
                    icon={<VerifiedOutlinedIcon />}
                />
            </Grid>
        </Grid>
    );
}