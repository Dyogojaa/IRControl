import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import DashboardPanel from "@/components/dashboard/panels/DashboardPanel";
import MoneyDisplay from "@/components/common/finance/MoneyDisplay/MoneyDisplay";



import type { DashboardResponse } from "@/types/dashboard";

interface Props {
    dashboard: DashboardResponse;
}

interface FinancialComparisonRowProps {
    title: string;
    holerite: number;
    informe: number;
}

function FinancialComparisonRow({
    title,
    holerite,
    informe,
}: FinancialComparisonRowProps) {

    const conferido = holerite === informe;

    return (

        <Box>

            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 600,
                    mb: 1,
                }}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: .5,
                }}
            >
                <Typography variant="body2">
                    Holerites
                </Typography>

                <MoneyDisplay value={holerite} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <Typography variant="body2">
                    Informe
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >

                    <MoneyDisplay value={informe} />

                    {conferido ? (
                        <CheckCircleIcon
                            color="success"
                            fontSize="small"
                        />
                    ) : (
                        <ErrorIcon
                            color="error"
                            fontSize="small"
                        />
                    )}

                </Box>

            </Box>

        </Box>

    );

}

export default function FinancialSummaryPanel({
    dashboard,
}: Props) {

    const comparativos = [

        {
            title: "Salário Bruto",
            holerite: dashboard.holerites.salarioBruto,
            informe: dashboard.informe.salarioBruto,
        },

        {
            title: "INSS",
            holerite: dashboard.holerites.inss,
            informe: dashboard.informe.inss,
        },

        {
            title: "IRRF",
            holerite: dashboard.holerites.irrf,
            informe: dashboard.informe.irrf,
        },

    ];

    return (

        <DashboardPanel
            title="Resumo Financeiro"
            subtitle="Conferência entre Holerites e Informe."
        >

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >

                {comparativos.map((item) => (

                    <Box key={item.title}>

                        <FinancialComparisonRow
                            title={item.title}
                            holerite={item.holerite}
                            informe={item.informe}
                        />

                        {item.title !== "IRRF" && (
                            <Divider sx={{ mt: 3 }} />
                        )}

                    </Box>

                ))}

            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
                variant="subtitle2"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                }}
            >
                Despesas Médicas
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                }}
            >
                <Typography variant="body2">
                    Valor Total
                </Typography>

                <MoneyDisplay
                    value={dashboard.despesasMedicas.valorTotal}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                }}
            >
                <Typography variant="body2">
                    Reembolsado
                </Typography>

                <MoneyDisplay
                    value={dashboard.despesasMedicas.valorReembolsado}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="body2">
                    Dedutível
                </Typography>

                <MoneyDisplay
                    value={dashboard.despesasMedicas.valorDedutivel}
                />
            </Box>

        </DashboardPanel>

    );

}