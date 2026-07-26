import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import DashboardHeader from "@/components/dashboard/header/DashboardHeader";
import DashboardSummary from "@/components/dashboard/summary/DashboardSummary";
import DashboardGrid from "@/components/dashboard/DashboardGrid";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
    const { dashboard, loading, error } = useDashboard(2026);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (
        <>
            <DashboardHeader />

            <DashboardSummary
                dashboard={dashboard}
            />

            <DashboardGrid
                dashboard={dashboard}
            />
        </>
    );
}