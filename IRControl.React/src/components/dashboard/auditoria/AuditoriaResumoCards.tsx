import Grid from "@mui/material/Grid";

import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import SummaryCard from "@/components/dashboard/summary/SummaryCard";

interface Props {

    erros: number;

    alertas: number;

    informacoes: number;

}

export default function AuditoriaResumoCards({

    erros,

    alertas,

    informacoes,

}: Props) {

    return (

        <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
        >

            <Grid size={{ xs: 12, md: 4 }}>

                <SummaryCard
                    title="Erros"
                    value={erros}
                    icon={<ErrorIcon />}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <SummaryCard
                    title="Alertas"
                    value={alertas}
                    icon={<WarningAmberIcon />}
                />

            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>

                <SummaryCard
                    title="Informações"
                    value={informacoes}
                    icon={<InfoOutlinedIcon />}
                />

            </Grid>

        </Grid>

    );

}