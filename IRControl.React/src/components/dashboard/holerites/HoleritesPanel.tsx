import Typography from "@mui/material/Typography";

import DashboardPanel from "../DashboardPanel";

interface HoleritesPanelProps {
    cadastrados: number;
}

export default function HoleritesPanel({
    cadastrados,
}: HoleritesPanelProps) {
    return (
        <DashboardPanel
            title="Holerites"
            subtitle="Documentos cadastrados"
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 700,
                }}
            >
                {cadastrados}
            </Typography>
        </DashboardPanel>
    );
}