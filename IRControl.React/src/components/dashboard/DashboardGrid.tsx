import Grid from "@mui/material/Grid";

import DeclarationStatusPanel from "./panels/DeclarationStatusPanel";
import FinancialSummaryPanel from "./panels/FinancialSummaryPanel";
import RecentActivities from "./RecentActivities";

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

            <Grid size={{ xs: 12, lg: 7 }}>
                <DeclarationStatusPanel
                    dashboard={dashboard}
                />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
                <FinancialSummaryPanel
                    dashboard={dashboard}
                />
            </Grid>

            <Grid size={12}>
                <RecentActivities />
            </Grid>

        </Grid>

    );

}